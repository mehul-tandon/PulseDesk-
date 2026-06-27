import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api, clearToken } from '../api/client'

const STATUS_COLORS = {
  open: 'bg-blue-100 text-blue-800',
  pending: 'bg-yellow-100 text-yellow-800',
  resolved: 'bg-green-100 text-green-800',
  closed: 'bg-gray-100 text-gray-800',
}

const PRIORITY_COLORS = {
  low: 'bg-gray-100 text-gray-600',
  normal: 'bg-blue-100 text-blue-600',
  high: 'bg-orange-100 text-orange-600',
  urgent: 'bg-red-100 text-red-600',
}

export default function Dashboard() {
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const navigate = useNavigate()

  const loadTickets = async () => {
    try {
      const data = await api.getTickets()
      setTickets(data)
    } catch (err) {
      console.error('Failed to load tickets', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadTickets() }, [])

  const handleLogout = async () => {
    try { await api.logout() } catch {}
    clearToken()
    navigate('/login')
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">PulseDesk</h1>
        <button onClick={handleLogout} className="text-sm text-gray-500 hover:text-gray-900">
          Logout
        </button>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Tickets</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm font-medium"
          >
            New Ticket
          </button>
        </div>

        {/* New Ticket Form */}
        {showForm && (
          <NewTicketForm onCreated={() => { setShowForm(false); loadTickets() }} />
        )}

        {/* Ticket List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Subject</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Priority</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Requester</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {tickets.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                    No tickets yet. Create one!
                  </td>
                </tr>
              ) : (
                tickets.map((ticket) => (
                  <tr key={ticket.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <Link to={`/tickets/${ticket.id}`} className="text-blue-600 hover:underline font-medium">
                        {ticket.subject}
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${STATUS_COLORS[ticket.status] || ''}`}>
                        {ticket.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${PRIORITY_COLORS[ticket.priority] || ''}`}>
                        {ticket.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {ticket.requester?.name || '—'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}

function NewTicketForm({ onCreated }) {
  const [subject, setSubject] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('normal')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await api.createTicket({ subject, description, priority })
      onCreated()
    } catch (err) {
      setError(err.message || 'Failed to create ticket')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h3 className="text-md font-semibold mb-4">Create New Ticket</h3>
      {error && <div className="mb-3 text-red-600 text-sm">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="low">Low</option>
          <option value="normal">Normal</option>
          <option value="high">High</option>
          <option value="urgent">Urgent</option>
        </select>
        <button type="submit" disabled={loading} className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 text-sm font-medium">
          {loading ? 'Creating...' : 'Create Ticket'}
        </button>
      </form>
    </div>
  )
}
