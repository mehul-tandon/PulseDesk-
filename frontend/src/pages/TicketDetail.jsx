import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { api, clearToken } from '../api/client'

const STATUS_COLORS = {
  open: 'bg-blue-100 text-blue-800',
  pending: 'bg-yellow-100 text-yellow-800',
  resolved: 'bg-green-100 text-green-800',
  closed: 'bg-gray-100 text-gray-800',
}

export default function TicketDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [ticket, setTicket] = useState(null)
  const [loading, setLoading] = useState(true)
  const [comment, setComment] = useState('')
  const [isInternal, setIsInternal] = useState(false)
  const [posting, setPosting] = useState(false)

  useEffect(() => {
    api.getTicket(id).then(setTicket).catch(console.error).finally(() => setLoading(false))
  }, [id])

  const handleLogout = async () => {
    try { await api.logout() } catch {}
    clearToken()
    navigate('/login')
  }

  const handleAddComment = async (e) => {
    e.preventDefault()
    if (!comment.trim()) return
    setPosting(true)
    try {
      await api.addComment(id, { body: comment, is_internal: isInternal })
      setComment('')
      setIsInternal(false)
      const updated = await api.getTicket(id)
      setTicket(updated)
    } catch (err) {
      console.error('Failed to post comment', err)
    } finally {
      setPosting(false)
    }
  }

  const handleStatusChange = async (newStatus) => {
    try {
      await api.updateTicket(id, { status: newStatus })
      setTicket({ ...ticket, status: newStatus })
    } catch (err) {
      console.error('Failed to update ticket', err)
    }
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading...</div>
  if (!ticket) return <div className="min-h-screen flex items-center justify-center text-gray-500">Ticket not found</div>

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-gray-500 hover:text-gray-900 text-sm">← Back</Link>
          <h1 className="text-xl font-bold text-gray-900">PulseDesk</h1>
        </div>
        <button onClick={handleLogout} className="text-sm text-gray-500 hover:text-gray-900">Logout</button>
      </header>

      <main className="max-w-4xl mx-auto p-6">
        {/* Ticket Info */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">{ticket.subject}</h2>
            <span className={`px-2 py-1 rounded text-xs font-medium ${STATUS_COLORS[ticket.status] || ''}`}>
              {ticket.status}
            </span>
          </div>
          <p className="text-gray-600 mb-4 whitespace-pre-wrap">{ticket.description}</p>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <span>Priority: <strong className="text-gray-700">{ticket.priority}</strong></span>
            <span>Requester: <strong className="text-gray-700">{ticket.requester?.name || '—'}</strong></span>
            <span>Assigned: <strong className="text-gray-700">{ticket.assignee?.name || 'Unassigned'}</strong></span>
          </div>
          <div className="mt-4 flex gap-2">
            {['open', 'pending', 'resolved', 'closed'].map((s) => (
              <button
                key={s}
                onClick={() => handleStatusChange(s)}
                className={`px-3 py-1 rounded text-xs font-medium ${
                  ticket.status === s ? STATUS_COLORS[s] : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Comments */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-md font-semibold mb-4">Comments ({ticket.comments?.length || 0})</h3>
          
          {ticket.comments?.length === 0 && (
            <p className="text-gray-400 text-sm mb-4">No comments yet.</p>
          )}

          <div className="space-y-4 mb-6">
            {ticket.comments?.map((c) => (
              <div key={c.id} className={`border-l-4 pl-4 ${c.is_internal ? 'border-yellow-400 bg-yellow-50' : 'border-blue-400'}`}>
                <div className="flex items-center gap-2 mb-1">
                  <strong className="text-sm text-gray-900">{c.author?.name || 'Unknown'}</strong>
                  {c.is_internal && (
                    <span className="px-2 py-0.5 rounded text-xs bg-yellow-200 text-yellow-800">Internal</span>
                  )}
                  <span className="text-xs text-gray-400">
                    {new Date(c.created_at).toLocaleString()}
                  </span>
                </div>
                <p className="text-sm text-gray-600 whitespace-pre-wrap">{c.body}</p>
              </div>
            ))}
          </div>

          {/* Add Comment */}
          <form onSubmit={handleAddComment} className="border-t border-gray-200 pt-4">
            <textarea
              placeholder="Write a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
            />
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={isInternal}
                  onChange={(e) => setIsInternal(e.target.checked)}
                  className="rounded"
                />
                Internal note
              </label>
              <button
                type="submit"
                disabled={posting || !comment.trim()}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 text-sm font-medium"
              >
                {posting ? 'Posting...' : 'Post Comment'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
