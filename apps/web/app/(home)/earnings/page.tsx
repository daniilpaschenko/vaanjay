'use client'

import { useState } from 'react'
import { useAuth } from '@/components/AuthProvider'
import { useI18n } from '@/hooks/useI18n'
import { addXP } from '@/lib/gamification'
import api from '@/lib/api'

const SUBSCRIPTION_PRICES = [49, 99, 199, 499]

export default function EarningsPage() {
  const { user } = useAuth()
  const { t, isTamil } = useI18n()
  const [tab, setTab] = useState<'overview' | 'subscriptions' | 'deals' | 'analytics'>('overview')
  const [price, setPrice] = useState(99)
  const [subscribers, setSubscribers] = useState<any[]>(() => {
    try { return JSON.parse(localStorage.getItem('vaanjay_subscribers_' + user?.username) || '[]') } catch { return [] }
  })
  const [deals, setDeals] = useState<any[]>(() => {
    try { return JSON.parse(localStorage.getItem('vaanjay_brand_deals') || '[]') } catch { return [] }
  })
  const [earnings, setEarnings] = useState(() => {
    try { return JSON.parse(localStorage.getItem('vaanjay_earnings_' + user?.username) || '{"total":0,"month":0}') } catch { return { total: 0, month: 0 } }
  })
  const [showTipping, setShowTipping] = useState(false)
  const [tipAmount, setTipAmount] = useState(50)
  const [showSubscribeModal, setShowSubscribeModal] = useState(false)

  const savePrice = () => {
    localStorage.setItem('vaanjay_sub_price_' + user?.username, String(price))
    alert(isTamil ? 'விலை சேமிக்கப்பட்டது!' : 'Price saved!')
  }

  const subscribe = () => {
    const razorpayLoaded = !!(window as any).Razorpay
    if (!razorpayLoaded) {
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      document.body.appendChild(script)
      alert(isTamil ? 'Razorpay ஏற்றுகிறது... மீண்டும் முயற்சிக்கவும்' : 'Loading Razorpay... try again')
      return
    }
    const options = {
      key: 'rzp_test_VAANJAY_MOCK',
      amount: price * 100,
      currency: 'INR',
      name: 'VAANJAY',
      description: `Subscription to @${user?.username}`,
      handler: (response: any) => {
        const sub = { id: 'sub_' + Date.now(), user: user?.username, amount: price, date: new Date().toISOString(), payment_id: response.razorpay_payment_id }
        const updated = [sub, ...subscribers]
        setSubscribers(updated)
        localStorage.setItem('vaanjay_subscribers_' + user?.username, JSON.stringify(updated))
        const newEarnings = { total: earnings.total + price, month: earnings.month + price }
        setEarnings(newEarnings)
        localStorage.setItem('vaanjay_earnings_' + user?.username, JSON.stringify(newEarnings))
        if (user?.username) addXP(user.username, 50, 'supporter')
        api.post('/payments/upi/send', { to: user?.username, amount: price, note: 'Subscription' }).catch(() => {})
        alert(isTamil ? 'சந்தா வெற்றி!' : 'Subscription successful!')
        setShowSubscribeModal(false)
      },
    }
    const rzp = new (window as any).Razorpay(options)
    rzp.open()
  }

  const sendTip = () => {
    if (!user?.username) return
    const razorpayLoaded = !!(window as any).Razorpay
    if (!razorpayLoaded) {
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      document.body.appendChild(script)
      return
    }
    const options = {
      key: 'rzp_test_VAANJAY_MOCK',
      amount: tipAmount * 100,
      currency: 'INR',
      name: 'VAANJAY',
      description: `Tip to @${user?.username}`,
      handler: (response: any) => {
        const newEarnings = { total: earnings.total + tipAmount, month: earnings.month + tipAmount }
        setEarnings(newEarnings)
        localStorage.setItem('vaanjay_earnings_' + user?.username, JSON.stringify(newEarnings))
        api.post('/payments/upi/send', { to: user?.username, amount: tipAmount, note: 'Tip' }).catch(() => {})
        alert(`Tip of Rs ${tipAmount} sent!`)
        setShowTipping(false)
      },
    }
    const rzp = new (window as any).Razorpay(options)
    rzp.open()
  }

  return (
    <div className="pb-8">
      <div className="px-4 py-3 border-b border-border">
        <h1 className="text-lg font-bold text-text-primary">{isTamil ? 'வருவாய்' : 'Creator Earnings'}</h1>
      </div>

      <div className="flex border-b border-border">
        {(['overview', 'subscriptions', 'deals', 'analytics'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`flex-1 py-3 text-xs font-medium text-center border-b-2 transition-colors ${
              tab === t ? 'border-primary text-primary' : 'border-transparent text-text-secondary'
            }`}>
            {t === 'overview' ? (isTamil ? 'கண்ணோட்டம்' : 'Overview')
              : t === 'subscriptions' ? (isTamil ? 'சந்தாக்கள்' : 'Subscriptions')
              : t === 'deals' ? (isTamil ? 'பிராண்ட் ஒப்பந்தங்கள்' : 'Brand Deals')
              : (isTamil ? 'பகுப்பாய்வு' : 'Analytics')}
          </button>
        ))}
      </div>

      {tab === 'overview' && (
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-surface-secondary rounded-xl p-4">
              <p className="text-xs text-text-muted">{isTamil ? 'மொத்த வருவாய்' : 'Total Earnings'}</p>
              <p className="text-2xl font-bold text-text-primary mt-1">Rs {earnings.total}</p>
            </div>
            <div className="bg-surface-secondary rounded-xl p-4">
              <p className="text-xs text-text-muted">{isTamil ? 'சந்தாதாரர்கள்' : 'Subscribers'}</p>
              <p className="text-2xl font-bold text-text-primary mt-1">{subscribers.length}</p>
            </div>
            <div className="bg-surface-secondary rounded-xl p-4">
              <p className="text-xs text-text-muted">{isTamil ? 'இந்த மாதம்' : 'This Month'}</p>
              <p className="text-2xl font-bold text-text-primary mt-1">Rs {earnings.month}</p>
            </div>
            <div className="bg-surface-secondary rounded-xl p-4">
              <p className="text-xs text-text-muted">{isTamil ? 'செயலில் உள்ள ஒப்பந்தங்கள்' : 'Active Deals'}</p>
              <p className="text-2xl font-bold text-text-primary mt-1">{deals.length}</p>
            </div>
          </div>

          <button onClick={() => setShowTipping(!showTipping)}
            className="w-full py-3 bg-primary/10 text-primary rounded-xl text-sm font-semibold hover:bg-primary/20 transition-colors">
            {isTamil ? 'Tip பெறு' : 'Accept Tips'}
          </button>

          {showTipping && (
            <div className="bg-surface-secondary rounded-xl p-4 space-y-3">
              <p className="text-sm font-semibold text-text-primary">{isTamil ? 'Tip தொகையை தேர்ந்தெடுக்கவும்' : 'Select Tip Amount'}</p>
              <div className="flex gap-2">
                {[20, 50, 100, 200].map(amt => (
                  <button key={amt} onClick={() => setTipAmount(amt)}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${tipAmount === amt ? 'bg-primary text-white' : 'bg-white border border-border text-text-primary hover:border-primary'}`}>
                    Rs {amt}
                  </button>
                ))}
              </div>
              <button onClick={sendTip} className="w-full py-2 bg-primary text-white rounded-lg text-sm font-semibold">
                {isTamil ? 'Tip அனுப்பு' : 'Send Tip'} Rs {tipAmount}
              </button>
            </div>
          )}

          <div className="bg-surface-secondary rounded-xl p-4">
            <h3 className="text-sm font-semibold text-text-primary mb-2">{isTamil ? 'வரவிருக்கும் செலுத்துதல்கள்' : 'Payouts'}</h3>
            <p className="text-xs text-text-muted">{isTamil ? 'இன்னும் செலுத்துதல்கள் எதுவும் இல்லை' : 'No payouts yet'}</p>
            <button className="mt-3 px-4 py-2 bg-primary text-white rounded-lg text-xs font-semibold">
              {isTamil ? 'பணம் எடுக்க' : 'Withdraw'}
            </button>
          </div>
        </div>
      )}

      {tab === 'subscriptions' && (
        <div className="p-4 space-y-4">
          <div className="bg-surface-secondary rounded-xl p-4">
            <h3 className="text-sm font-semibold text-text-primary mb-1">{isTamil ? 'சந்தா விலை' : 'Subscription Price'}</h3>
            <div className="flex gap-2 mt-2">
              {SUBSCRIPTION_PRICES.map(p => (
                <button key={p} onClick={() => setPrice(p)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${price === p ? 'bg-primary text-white' : 'bg-white border border-border text-text-primary hover:border-primary'}`}>
                  Rs {p}
                </button>
              ))}
            </div>
            <button onClick={savePrice} className="mt-3 px-4 py-2 bg-primary text-white rounded-lg text-xs font-semibold">
              {isTamil ? 'சேமி' : 'Save'}
            </button>
          </div>

          <button onClick={() => setShowSubscribeModal(true)}
            className="w-full py-3 bg-primary text-white rounded-xl text-sm font-semibold">
            {isTamil ? 'சந்தா எடுக்க' : 'Subscribe'} (Rs {price}/{isTamil ? 'மாதம்' : 'month'})
          </button>

          <div className="bg-surface-secondary rounded-xl p-4">
            <h3 className="text-sm font-semibold text-text-primary mb-1">{isTamil ? 'சமீபத்திய சந்தாதாரர்கள்' : 'Recent Subscribers'}</h3>
            {subscribers.length === 0 ? (
              <p className="text-xs text-text-muted">{isTamil ? 'இன்னும் சந்தாதாரர்கள் இல்லை' : 'No subscribers yet'}</p>
            ) : (
              <div className="space-y-2 mt-2">
                {subscribers.map((s: any) => (
                  <div key={s.id} className="flex items-center justify-between text-xs">
                    <span className="text-text-primary">@{s.user} - Rs {s.amount}</span>
                    <span className="text-text-muted">{new Date(s.date).toLocaleDateString()}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {showSubscribeModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowSubscribeModal(false)}>
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-text-primary mb-2">{isTamil ? 'சந்தாவை உறுதிப்படுத்து' : 'Confirm Subscription'}</h3>
            <p className="text-sm text-text-muted mb-4">
              {isTamil ? `Rs ${price}/மாதம் - @${user?.username} க்கு` : `Rs ${price}/month to @${user?.username}`}
            </p>
            <div className="flex gap-3">
              <button onClick={() => setShowSubscribeModal(false)}
                className="flex-1 py-2 border border-border text-text-primary rounded-lg text-sm font-medium">{isTamil ? 'ரத்து' : 'Cancel'}</button>
              <button onClick={subscribe}
                className="flex-1 py-2 bg-primary text-white rounded-lg text-sm font-medium">
                {isTamil ? `Rs ${price} செலுத்து` : `Pay Rs ${price}`}
              </button>
            </div>
          </div>
        </div>
      )}

      {tab === 'deals' && (
        <div className="p-4 space-y-4">
          <div className="bg-surface-secondary rounded-xl p-4">
            <h3 className="text-sm font-semibold text-text-primary mb-1">{isTamil ? 'பிராண்ட் ஒப்பந்தங்கள்' : 'Brand Deals'}</h3>
            <p className="text-xs text-text-muted">{isTamil ? 'இன்னும் ஒப்பந்தங்கள் எதுவும் இல்லை' : 'No brand deals yet'}</p>
            <button className="mt-3 px-4 py-2 border border-primary text-primary rounded-lg text-xs font-semibold hover:bg-primary/5">
              {isTamil ? 'பிராண்டுகளுடன் இணைய' : 'Connect with Brands'}
            </button>
          </div>

          <div className="bg-surface-secondary rounded-xl p-4">
            <h3 className="text-sm font-semibold text-text-primary mb-2">{isTamil ? 'கிடைக்கும் பிராண்ட் ஒப்பந்தங்கள்' : 'Available Brand Deals'}</h3>
            {[
              { brand: 'Tamil Fashion Co', budget: 'Rs 5,000', desc: 'Promote our traditional wear collection', category: 'Fashion' },
              { brand: 'Madurai Kitchen', budget: 'Rs 3,000', desc: 'Review our new spice range', category: 'Food' },
              { brand: 'Chennai Tech', budget: 'Rs 8,000', desc: 'Create a video about our app', category: 'Tech' },
            ].map((deal, i) => (
              <div key={i} className="border border-border rounded-lg p-3 mb-2 last:mb-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-text-primary">{deal.brand}</span>
                  <span className="text-xs text-primary font-medium">{deal.budget}</span>
                </div>
                <p className="text-xs text-text-muted">{deal.desc}</p>
                <span className="text-[10px] text-text-muted mt-1 inline-block">{deal.category}</span>
                <button className="mt-2 w-full py-1.5 bg-primary/10 text-primary rounded-lg text-xs font-semibold hover:bg-primary/20"
                  onClick={() => {
                    const updated = [...deals, { id: 'deal_' + Date.now(), ...deal, creator: user?.username, status: 'applied', date: new Date().toISOString() }]
                    setDeals(updated)
                    localStorage.setItem('vaanjay_brand_deals', JSON.stringify(updated))
                    alert('Applied to ' + deal.brand)
                  }}>{isTamil ? 'விண்ணப்பி' : 'Apply'}</button>
              </div>
            ))}
          </div>

          {deals.length > 0 && (
            <div className="bg-surface-secondary rounded-xl p-4">
              <h3 className="text-sm font-semibold text-text-primary mb-2">{isTamil ? 'எனது ஒப்பந்தங்கள்' : 'My Deals'}</h3>
              {deals.map((d: any) => (
                <div key={d.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div>
                    <p className="text-sm text-text-primary">{d.brand}</p>
                    <p className="text-xs text-text-muted">{d.status}</p>
                  </div>
                  <span className="text-xs font-medium text-primary">{d.budget}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {tab === 'analytics' && (
        <div className="p-4 space-y-4">
          <div className="bg-surface-secondary rounded-xl p-4">
            <h3 className="text-sm font-semibold text-text-primary mb-3">{isTamil ? 'பின்பற்றுபவர்கள்' : 'Followers'}</h3>
            <div className="h-24 flex items-end gap-1">
              {[40, 55, 48, 72, 65, 80, 95].map((v, i) => (
                <div key={i} className="flex-1 bg-primary/30 rounded-t-sm" style={{ height: v + '%' }} />
              ))}
            </div>
            <div className="flex justify-between text-[10px] text-text-muted mt-1">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
          </div>

          <div className="bg-surface-secondary rounded-xl p-4">
            <h3 className="text-sm font-semibold text-text-primary mb-3">{isTamil ? 'இடுகை ஈடுபாடு' : 'Post Engagement'}</h3>
            <div className="h-24 flex items-end gap-1">
              {[30, 45, 60, 40, 75, 50, 65].map((v, i) => (
                <div key={i} className="flex-1 bg-green-400/40 rounded-t-sm" style={{ height: v + '%' }} />
              ))}
            </div>
            <div className="flex justify-between text-[10px] text-text-muted mt-1">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
          </div>

          <div className="bg-surface-secondary rounded-xl p-4">
            <h3 className="text-sm font-semibold text-text-primary mb-3">{isTamil ? 'வருவாய் போக்கு' : 'Earnings Trend'}</h3>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-text-muted">{isTamil ? 'இந்த வாரம்' : 'This Week'}</span>
              <span className="text-sm font-bold text-primary">Rs {earnings.month > 0 ? Math.round(earnings.month / 4) : 0}</span>
            </div>
            <div className="h-24 flex items-end gap-1">
              {[20, 35, 50, 30, 60, 45, 55].map((v, i) => (
                <div key={i} className="flex-1 bg-primary rounded-t-sm" style={{ height: v + '%' }} />
              ))}
            </div>
            <div className="flex justify-between text-[10px] text-text-muted mt-1">
              <span>W1</span><span>W2</span><span>W3</span><span>W4</span><span>W5</span><span>W6</span><span>W7</span>
            </div>
          </div>

          <div className="bg-surface-secondary rounded-xl p-4">
            <h3 className="text-sm font-semibold text-text-primary mb-2">{isTamil ? 'சிறந்த உள்ளடக்கம்' : 'Top Content'}</h3>
            <div className="space-y-2">
              {[{ label: 'Post reach', value: '1,234' }, { label: 'Profile visits', value: '567' }, { label: 'Mentions', value: '89' }].map(item => (
                <div key={item.label} className="flex items-center justify-between text-xs">
                  <span className="text-text-muted">{item.label}</span>
                  <span className="text-text-primary font-semibold">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
