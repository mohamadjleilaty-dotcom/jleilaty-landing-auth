import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext.jsx'
import JleilatyLanding from './JleilatyLanding.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Reset from './pages/Reset.jsx'
import Consultations from './pages/Consultations.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<JleilatyLanding />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />
          {/* Public page; requires sign-in only on submit */}
          <Route path="/consultations" element={<Consultations />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
