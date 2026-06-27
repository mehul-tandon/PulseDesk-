import { Routes, Route, Navigate } from 'react-router-dom'
import { isAuthenticated } from './api/client'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import TicketDetail from './pages/TicketDetail'

function Protected({ children }) {
  return isAuthenticated() ? children : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Protected><Dashboard /></Protected>} />
      <Route path="/tickets/:id" element={<Protected><TicketDetail /></Protected>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
