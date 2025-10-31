import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext.jsx"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from "../firebase"

export default function Register() {
  const { signup } = useAuth()
  const nav = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [err, setErr] = useState("")

  const submit = async (e) => {
    e.preventDefault()
    setErr("")
    try {
      await signup(email, password)
      nav("/consultations", { replace: true })
    } catch (e) { setErr(e.message) }
  }

  const handleGoogleSignup = async () => {
    setErr("")
    try {
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider) // أول مرة = إنشاء، لاحقًا = دخول
      nav("/consultations", { replace: true })
    } catch (e) { setErr("تعذّر التسجيل عبر Google") }
  }

  return (
    <div className="min-h-screen grid place-items-center p-6">
      <form onSubmit={submit} className="w-full max-w-md space-y-3 rounded-2xl border border-white/10 bg-white/5 p-6">
        <h1 className="text-2xl font-bold text-center">إنشاء حساب</h1>
        {err && <div className="text-red-300 text-sm">{err}</div>}
        <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="البريد الإلكتروني" className="px-4 py-3 rounded-xl bg-black/30 border border-white/10 w-full" required/>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="كلمة المرور" className="px-4 py-3 rounded-xl bg-black/30 border border-white/10 w-full" required/>
        <button className="w-full rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black px-5 py-3 font-bold">تسجيل</button>

        <div className="text-center text-sm opacity-75">أو</div>

        <button type="button" onClick={handleGoogleSignup} className="w-full rounded-xl bg-white text-black px-5 py-3 font-bold flex items-center justify-center gap-2 hover:bg-gray-100">
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
          إنشاء/تسجيل عبر Google
        </button>

        <div className="text-sm flex justify-between">
          <Link to="/login" className="underline">عندي حساب</Link>
          <Link to="/" className="underline">الرئيسية</Link>
        </div>
      </form>
    </div>
  )
}
