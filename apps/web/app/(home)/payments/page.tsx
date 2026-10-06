'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/components/AuthProvider'
import api from '@/lib/api'

export default function PaymentsPage() {
  const { user } = useAuth()
  const [tab, setTab] = useState<'send' | 'request' | 'history'>('send')
  const [receiver, setReceiver] = useState('')
  const [amount, setAmount] = useState('')
  const [note, setNote] = useState('')
  const [upiId, setUpiId] = useState('')
  const [balance, setBalance] = useState(5000)
  const [history, setHistory] = useState<any[]>([])
  const [razorpayLoaded, setRazorpayLoaded] = useState(false)

  useEffect(() => {
    if (!(window as any).Razorpay) {
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload = () => setRazorpayLoaded(true)
      document.body.appendChild(script)
    } else {
      setRazorpayLoaded(true)
    }

    api.get('/payments/upi/profile').then(r => {
      if (r.data?.data) { setUpiId(r.data.data.upi_id); setBalance(r.data.data.balance || 0); return }
      throw new Error()
    }).catch(() => {
      setUpiId(`${user?.username || 'user'}@vaanjay`)
    })

    api.get('/payments/upi/history').then(r => {
      if (r.data?.data?.length) { setHistory(r.data.data); return }
      throw new Error()
    }).catch(() => {
      try {
        const raw = localStorage.getItem('vaanjay_payment_history')
        if (raw) setHistory(JSON.parse(raw))
      } catch {}
    })
  }, [user])

  const saveHistory = (txn: any) => {
    const updated = [txn, ...history]
    setHistory(updated)
    localStorage.setItem('vaanjay_payment_history', JSON.stringify(updated))
  }

  const makePayment = () => {
    if (!amount || !receiver || !razorpayLoaded) return
    const amt = parseFloat(amount)
    if (isNaN(amt) || amt <= 0) return

    api.post('/payments/upi/send', { to: receiver, amount: amt, note }).catch(() => {})

    const options = {
      key: 'rzp_test_VAANJAY_MOCK',
      amount: amt * 100,
      currency: 'INR',
      name: 'VAANJAY',
      description: `Payment to ${receiver}`,
      prefill: { contact: user?.phone_number, email: user?.email },
      handler: (response: any) => {
        const txn = {
          id: response.razorpay_payment_id || 'txn_' + Date.now(),
          type: 'send', to: receiver, amount: amt, note, status: 'success',
          created_at: new Date().toISOString(),
        }
        saveHistory(txn)
        setBalance(prev => prev - amt)
        setAmount(''); setReceiver(''); setNote('')
        alert('Payment successful!')
      },
      modal: { ondismiss: () => {} },
    }
    const rzp = new (window as any).Razorpay(options)
    rzp.open()
  }

  const requestMoney = () => {
    if (!amount || !receiver) return
    const txn = { id: 'req_' + Date.now(), type: 'request', from: receiver, amount: parseFloat(amount), status: 'pending', created_at: new Date().toISOString() }
    saveHistory(txn)
    api.post('/payments/upi/request', { from: receiver, amount: parseFloat(amount) }).catch(() => {})
    setAmount(''); setReceiver('')
    alert('Money request sent!')
  }

  return (
    <div className="min-h-screen bg-white max-w-lg mx-auto">
      <div className="p-4 border-b border-border">
        <h1 className="text-xl font-bold text-text-primary">Payments</h1>
      </div>

      <div className="p-4 bg-gradient-to-br from-primary to-blue-500 text-white">
        <p className="text-xs opacity-80">Available Balance</p>
        <p className="text-3xl font-bold mt-1">Rs {balance.toFixed(2)}</p>
        <p className="text-xs opacity-60 mt-1">{upiId}</p>
      </div>

      <div className="flex gap-2 p-4 border-b border-border">
        {(['send', 'request', 'history'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${tab === t ? 'bg-primary text-white' : 'bg-surface-secondary text-text-secondary hover:bg-surface-hover'}`}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      <div className="p-4 space-y-4">
        {tab === 'send' && (
          <>
            <div>
              <label className="text-xs text-text-secondary font-medium">Send to</label>
              <input value={receiver} onChange={e => setReceiver(e.target.value)}
                placeholder="Username or phone number"
                className="w-full mt-1 px-4 py-3 bg-surface-secondary border border-border rounded-lg text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="text-xs text-text-secondary font-medium">Amount</label>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-2xl font-bold text-primary">Rs</span>
                <input value={amount} onChange={e => setAmount(e.target.value)}
                  placeholder="0.00" type="number"
                  className="flex-1 px-4 py-3 bg-surface-secondary border border-border rounded-lg text-2xl font-bold text-text-primary placeholder-text-muted focus:outline-none focus:border-primary" />
              </div>
            </div>
            <div>
              <label className="text-xs text-text-secondary font-medium">Note (optional)</label>
              <input value={note} onChange={e => setNote(e.target.value)}
                placeholder="What is this for?"
                className="w-full mt-1 px-4 py-3 bg-surface-secondary border border-border rounded-lg text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-primary" />
            </div>
            <button onClick={makePayment} disabled={!amount || !receiver || !razorpayLoaded}
              className="w-full py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark text-sm disabled:opacity-50">
              {razorpayLoaded ? `Pay Rs ${parseFloat(amount || '0').toFixed(2)}` : 'Loading...'}
            </button>
            <button className="w-full py-3 border border-border text-text-primary rounded-lg font-semibold hover:bg-surface-hover text-sm">
              Scan UPI QR Code
            </button>
          </>
        )}

        {tab === 'request' && (
          <>
            <p className="text-sm text-text-secondary">Request money from another VAANJAY user</p>
            <div>
              <label className="text-xs text-text-secondary font-medium">Request from</label>
              <input value={receiver} onChange={e => setReceiver(e.target.value)}
                placeholder="Username or phone number"
                className="w-full mt-1 px-4 py-3 bg-surface-secondary border border-border rounded-lg text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="text-xs text-text-secondary font-medium">Amount</label>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-2xl font-bold text-primary">Rs</span>
                <input value={amount} onChange={e => setAmount(e.target.value)}
                  placeholder="0.00" type="number"
                  className="flex-1 px-4 py-3 bg-surface-secondary border border-border rounded-lg text-2xl font-bold text-text-primary placeholder-text-muted focus:outline-none focus:border-primary" />
              </div>
            </div>
            <button onClick={requestMoney} disabled={!amount || !receiver}
              className="w-full py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark text-sm disabled:opacity-50">
              Request Money
            </button>
          </>
        )}

        {tab === 'history' && (
          <>
            {history.length === 0 ? (
              <div className="text-center py-20 text-text-secondary">
                <p className="text-sm">No transactions yet</p>
              </div>
            ) : (
              <div className="space-y-2">
                {history.map((txn: any) => (
                  <div key={txn.id} className="flex items-center justify-between px-4 py-3 bg-surface-secondary rounded-lg border border-border">
                    <div>
                      <p className="text-sm text-text-primary font-medium">
                        {txn.type === 'send' ? 'Sent to' : 'Request from'} @{txn.to || txn.from}
                      </p>
                      <p className="text-xs text-text-muted">{txn.note || txn.type} &middot; {new Date(txn.created_at).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-semibold ${txn.type === 'send' ? 'text-red-500' : 'text-green-500'}`}>
                        {txn.type === 'send' ? '-' : '+'}Rs {txn.amount?.toFixed(2)}
                      </p>
                      <p className={`text-[10px] font-medium ${txn.status === 'success' ? 'text-green-500' : txn.status === 'pending' ? 'text-yellow-500' : 'text-red-500'}`}>
                        {txn.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
