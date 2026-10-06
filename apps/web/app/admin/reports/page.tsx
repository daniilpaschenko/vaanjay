'use client'

import { useState, useEffect } from 'react'
import api from '@/lib/api'

export default function AdminReportsPage() {
  const [reports, setReports] = useState<any[]>([])
  const [statusFilter, setStatusFilter] = useState('pending')
  const [message, setMessage] = useState('')

  useEffect(() => {
    api.get(`/admin/reports?status=${statusFilter}`).then(r => {
      if (r.data?.data?.length) { setReports(r.data.data); return }
      throw new Error()
    }).catch(() => {
      try {
        const raw = localStorage.getItem('vaanjay_reports')
        if (raw) {
          const all = JSON.parse(raw)
          const filtered = statusFilter === 'all' ? all : all.filter((r: any) => r.status === statusFilter)
          setReports(filtered)
        }
      } catch {}
    })
  }, [statusFilter])

  const saveReports = (updated: any[]) => {
    localStorage.setItem('vaanjay_reports', JSON.stringify(updated))
    setReports(prev => prev.map(r => {
      const u = updated.find((x: any) => x.id === r.id)
      return u || r
    }))
  }

  const takeAction = (id: string, action: string) => {
    try {
      const raw = localStorage.getItem('vaanjay_reports')
      if (!raw) return
      const all = JSON.parse(raw)
      const updated = all.map((r: any) =>
        r.id === id ? { ...r, status: 'action_taken', action, actioned_at: new Date().toISOString() } : r
      )
      localStorage.setItem('vaanjay_reports', JSON.stringify(updated))
      setReports(prev => prev.filter(r => r.id !== id))
      setMessage(`Action "${action}" taken on report`)
      setTimeout(() => setMessage(''), 3000)
    } catch {}
  }

  const assignReport = (id: string) => {
    const staff = prompt('Assign to admin staff username:')
    if (!staff || !staff.trim()) return
    try {
      const raw = localStorage.getItem('vaanjay_reports')
      if (!raw) return
      const all = JSON.parse(raw)
      const updated = all.map((r: any) =>
        r.id === id ? { ...r, assigned_to: staff.trim(), status: 'reviewed' } : r
      )
      localStorage.setItem('vaanjay_reports', JSON.stringify(updated))
      const reloaded = statusFilter === 'all' ? updated : updated.filter((r: any) => r.status === statusFilter)
      setReports(reloaded)
      setMessage(`Report assigned to @${staff.trim()}`)
      setTimeout(() => setMessage(''), 3000)
    } catch {}
  }

  const reportSample = (action: string) => {
    const existing = JSON.parse(localStorage.getItem('vaanjay_reports') || '[]')
    const report = {
      id: 'report_' + Date.now(),
      reason: action === 'spam' ? 'Spam content' : action === 'abuse' ? 'Harassment / Abuse' : 'Inappropriate content',
      target_id: 'post_' + Date.now(), target_type: 'post',
      reporter_id: 'user_' + Date.now(), status: 'pending',
      created_at: new Date().toISOString(),
    }
    existing.push(report)
    localStorage.setItem('vaanjay_reports', JSON.stringify(existing))
    setReports(prev => [...prev, report])
    setMessage('Test report added')
    setTimeout(() => setMessage(''), 3000)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-text-primary">Reports ({reports.length})</h1>
        <div className="flex items-center gap-2">
          <div className="flex gap-2">
            {(['pending', 'reviewed', 'action_taken', 'all'] as const).map(s => (
              <button key={s} onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium ${statusFilter === s ? 'bg-primary text-white' : 'bg-surface-secondary text-text-secondary hover:bg-surface-hover'}`}>
                {s.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </button>
            ))}
          </div>
          <div className="w-px h-6 bg-border mx-1" />
          <button onClick={() => reportSample('spam')} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-amber-50 text-amber-600 border border-amber-200 hover:bg-amber-100">+ Add Test Report</button>
        </div>
      </div>

      {message && (
        <div className="mb-4 px-4 py-2.5 bg-primary/5 border border-primary/20 rounded-lg text-sm text-primary font-medium">{message}</div>
      )}

      <div className="bg-white rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-text-secondary">
                <th className="text-left p-3 font-medium">Reason</th>
                <th className="text-left p-3 font-medium">Target</th>
                <th className="text-left p-3 font-medium">Reporter</th>
                <th className="text-left p-3 font-medium">Type</th>
                <th className="text-center p-3 font-medium">Assigned</th>
                <th className="text-center p-3 font-medium">Date</th>
                <th className="text-center p-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report: any) => (
                <tr key={report.id} className={`border-b border-border/50 hover:bg-surface-hover ${report.assigned_to ? 'bg-primary/5' : ''}`}>
                  <td className="p-3 text-text-primary">{report.reason}</td>
                  <td className="p-3 text-text-secondary text-xs">{report.target_id?.slice(0, 12)}...</td>
                  <td className="p-3 text-text-secondary text-xs">@{report.reporter_id?.slice(0, 8)}</td>
                  <td className="p-3 text-text-secondary capitalize">{report.target_type}</td>
                  <td className="p-3 text-center">
                    {report.assigned_to ? (
                      <span className="px-2 py-0.5 bg-primary/10 text-primary rounded text-xs font-medium">@{report.assigned_to}</span>
                    ) : (
                      <span className="text-xs text-text-muted">-</span>
                    )}
                  </td>
                  <td className="p-3 text-center text-text-secondary text-xs">
                    {report.created_at ? new Date(report.created_at).toLocaleDateString() : '-'}
                  </td>
                  <td className="p-3 text-center">
                    <div className="flex gap-1 justify-center flex-wrap">
                      <button onClick={() => assignReport(report.id)} className="px-2 py-1 text-xs bg-surface-secondary text-text-secondary rounded border border-border font-medium hover:bg-surface-hover" title="Assign to staff">Assign</button>
                      <button onClick={() => takeAction(report.id, 'warn')} className="px-2 py-1 text-xs bg-amber-50 text-amber-600 rounded border border-amber-200 font-medium">Warn</button>
                      <button onClick={() => takeAction(report.id, 'delete')} className="px-2 py-1 text-xs bg-red-50 text-error rounded border border-red-200 font-medium">Delete</button>
                      <button onClick={() => takeAction(report.id, 'dismiss')} className="px-2 py-1 text-xs bg-green-50 text-success rounded border border-green-200 font-medium">Dismiss</button>
                    </div>
                  </td>
                </tr>
              ))}
              {reports.length === 0 && (
                <tr><td colSpan={7} className="p-8 text-center text-text-secondary text-sm">No reports found. Click "+ Add Test Report" to create one for testing.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
