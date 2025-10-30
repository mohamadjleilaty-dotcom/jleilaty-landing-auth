import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.jsx'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '../firebase'

export default function Login() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')
  const nav = useNavigate()
  const loc = useLocation()
  const from = loc.state?.from?.pathname || '/consultations'

  const submit = async (e) => {
    e.preventDefault()
    setErr('')
    try {
      await login(email, password)
      nav(from, { replace: true })
    } catch (e) {
      setErr(e.message)
    }
  }

  const handleGoogleLogin = async () => {
    setErr('')
    try {
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
      nav(from, { replace: true })
    } catch (e) {
      console.error(e)
      setErr('حدث خطأ أثناء تسجيل الدخول عبر Google')
    }
  }

  return (
    <div className="min-h-screen grid place-items-center p-6">
      <form onSubmit={submit} className="w-full max-w-md space-y-3 rounded-2xl border border-white/10 bg-white/5 p-6">
        <h1 className="text-2xl font-bold text-center">تسجيل الدخول</h1>
        {err && <div className="text-red-300 text-sm">{err}</div>}
        <input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="البريد الإلكتروني" className="px-4 py-3 rounded-xl bg-black/30 border border-white/10 w-full" required />
        <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="كلمة المرور" className="px-4 py-3 rounded-xl bg-black/30 border border-white/10 w-full" required />
        <button className="w-full rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black px-5 py-3 font-bold">دخول</button>

        <button type="button" onClick={handleGoogleLogin} className="w-full rounded-xl bg-white text-black px-5 py-3 font-bold flex items-center justify-center gap-2 hover:bg-gray-100">
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
          تسجيل الدخول عبر Google
        </button>

        <div className="text-sm flex justify-between">
          <Link to="/register" className="underline">حساب جديد</Link>
          <Link to="/reset" className="underline">نسيت كلمة المرور؟</Link>
        </div>
        <Link to="/" className="block text-center text-xs opacity-75 underline">العودة للرئيسية</Link>
      </form>
    </div>
  )
}
