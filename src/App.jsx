import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext.jsx'
import JleilatyLanding from './JleilatyLanding.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Reset from './pages/Reset.jsx'
import Consultations from './pages/Consultations.jsx'
import AdminConsultations from './pages/AdminConsultations.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<JleilatyLanding />} />
          <Route path="/consultations" element={<Consultations />} />
          <Route path="/admin" element={<AdminConsultations />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
