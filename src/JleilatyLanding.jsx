import React from 'react'
import { Link } from 'react-router-dom'

export default function JleilatyLanding() {
  return (
    <div className="min-h-screen text-white grid place-items-center p-10" style={{ background: 'linear-gradient(180deg, #050807, #0a0f0e)' }}>
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl font-extrabold">JLEILATY ELECTROPLATING</h1>
        <p className="opacity-80 mt-3">Landing + تسجيل دخول + الاستشارات</p>
        <div className="mt-6 flex gap-3 justify-center">
          <Link to="/consultations" className="rounded-full bg-emerald-500/90 hover:bg-emerald-400 text-black px-5 py-2 font-semibold">الاستشارات</Link>
          <Link to="/login" className="rounded-full border border-white/15 px-5 py-2">دخول</Link>
          <Link to="/register" className="rounded-full border border-white/15 px-5 py-2">إنشاء حساب</Link>
        </div>
      </div>
    </div>
  )
}
