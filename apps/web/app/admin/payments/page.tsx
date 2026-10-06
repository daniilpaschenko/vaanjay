'use client'

import { useState, useEffect } from 'react'
import api from '@/lib/api'

export default function AdminPaymentsPage() {
  const [transactions, setTransactions] = useState<any[]>([])
  const [stats, setStats] = useState({ total_revenue: 0, total_transactions: 0, pending_count: 0 })

  useEffect(() => {
    api.get('/admin/analytics/payments').then(r => setStats(r.data.data || {})).catch(() => {})
    api.get('/admin/payments?limit=50').then(r => setTransactions(r.data.data || [])).catch(() => {})
  }, [])

  const flagTransaction = async (id: string) => {
    await api.put(`/admin/payments/${id}/flag`, { flagged: true })
  }

  return (
    <div>
      <h1 className="text-xl font-bold text-text-primary mb-6">Payments</h1>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-border p-4">
          <p className="text-xs text-text-secondary uppercase tracking-wide">Total Revenue</p>
          <p className="text-2xl font-bold text-text-primary mt-1">Rs {stats.total_revenue?.toLocaleString() || '0'}</p>
        </div>
        <div className="bg-white rounded-lg border border-border p-4">
          <p className="text-xs text-text-secondary uppercase tracking-wide">Transactions</p>
          <p className="text-2xl font-bold text-text-primary mt-1">{stats.total_transactions || '0'}</p>
        </div>
        <div className="bg-white rounded-lg border border-border p-4">
          <p className="text-xs text-text-secondary uppercase tracking-wide">Pending</p>
          <p className="text-2xl font-bold text-text-primary mt-1">{stats.pending_count || '0'}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-text-secondary">
              <th className="text-left p-3 font-medium">Sender</th>
              <th className="text-left p-3 font-medium">Receiver</th>
              <th className="text-right p-3 font-medium">Amount</th>
              <th className="text-left p-3 font-medium">Status</th>
              <th className="text-center p-3 font-medium">Date</th>
              <th className="text-center p-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx: any) => (
              <tr key={tx.id} className="border-b border-border/50 hover:bg-surface-hover">
                <td className="p-3 text-text-secondary">{tx.sender_id?.slice(0, 8)}</td>
                <td className="p-3 text-text-secondary">{tx.receiver_id?.slice(0, 8)}</td>
                <td className="p-3 text-right text-text-primary font-medium">Rs {tx.amount}</td>
                <td className="p-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${tx.status === 'completed' ? 'bg-green-50 text-success border border-green-200' : 'bg-amber-50 text-warning border border-amber-200'}`}>
                    {tx.status}
                  </span>
                </td>
                <td className="p-3 text-center text-text-secondary text-xs">{new Date(tx.created_at).toLocaleDateString()}</td>
                <td className="p-3 text-center">
                  <button onClick={() => flagTransaction(tx.id)} className="px-2 py-1 text-xs bg-red-50 text-error rounded border border-red-200">Flag</button>
                </td>
              </tr>
            ))}
            {transactions.length === 0 && (
              <tr><td colSpan={6} className="p-8 text-center text-text-secondary text-sm">No transactions found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
