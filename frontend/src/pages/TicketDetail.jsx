import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api';
import { ArrowLeft, Send } from 'lucide-react';

export default function TicketDetail() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [isInternal, setIsInternal] = useState(false);

  useEffect(() => {
    fetchTicket();
  }, [id]);

  const fetchTicket = async () => {
    try {
      const response = await api.get(`/tickets/${id}`);
      setTicket(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const submitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      await api.post(`/tickets/${id}/comments`, {
        body: newComment,
        is_internal: isInternal
      });
      setNewComment('');
      setIsInternal(false);
      fetchTicket();
    } catch (err) {
      console.error(err);
    }
  };

  if (!ticket) return <div className="p-8 text-center text-gray-500">Loading ticket...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Link to="/dashboard" className="inline-flex items-center text-blue-600 hover:underline mb-6">
          <ArrowLeft size={16} className="mr-1" /> Back to Dashboard
        </Link>
        
        <div className="bg-white shadow rounded-lg overflow-hidden mb-6">
          <div className="px-6 py-5 border-b border-gray-200">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-2xl font-bold text-gray-900">{ticket.subject}</h2>
              <span className={`px-3 py-1 inline-flex text-sm font-semibold rounded-full ${ticket.status === 'open' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                {ticket.status}
              </span>
            </div>
            <p className="text-sm text-gray-500">
              Ticket #{ticket.id} • Opened by <span className="font-medium text-gray-900">{ticket.requester?.name}</span> • Priority: <span className="capitalize">{ticket.priority}</span>
            </p>
          </div>
          <div className="px-6 py-5 bg-gray-50 border-b border-gray-200">
            <p className="text-gray-800 whitespace-pre-wrap">{ticket.description}</p>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <h3 className="text-lg font-bold text-gray-900">Conversation</h3>
          {ticket.comments?.map(comment => (
            <div key={comment.id} className={`p-4 rounded-lg shadow-sm border ${comment.is_internal ? 'bg-yellow-50 border-yellow-200' : 'bg-white border-gray-200'}`}>
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-gray-800">{comment.author?.name}</span>
                {comment.is_internal && <span className="text-xs font-bold text-yellow-700 bg-yellow-200 px-2 py-0.5 rounded">INTERNAL NOTE</span>}
              </div>
              <p className="text-gray-700 whitespace-pre-wrap">{comment.body}</p>
            </div>
          ))}
          {ticket.comments?.length === 0 && <p className="text-gray-500 italic">No comments yet.</p>}
        </div>

        <div className="bg-white shadow rounded-lg p-6 border border-gray-200">
          <form onSubmit={submitComment}>
            <label className="block text-sm font-medium text-gray-700 mb-2">Add a comment</label>
            <textarea
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
              rows="4"
              placeholder="Type your reply here..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            ></textarea>
            
            <div className="flex justify-between items-center">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  className="rounded text-blue-600 focus:ring-blue-500"
                  checked={isInternal}
                  onChange={(e) => setIsInternal(e.target.checked)}
                />
                <span className="text-sm text-gray-700">Internal Note</span>
              </label>
              
              <button type="submit" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition">
                <Send size={16} className="mr-2" /> Send Reply
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
