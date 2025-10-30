import React from 'react'
import { useAuth } from '../contexts/AuthContext.jsx'
import { Link } from 'react-router-dom'
import { LogOut } from 'lucide-react'

export default function Consultations() {
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen max-w-3xl mx-auto p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">قسم الاستشارات</h1>
        <div className="flex items-center gap-3 text-sm">
          <span className="opacity-80">مرحبًا، {user?.displayName || user?.email}</span>
          <button onClick={logout} className="inline-flex items-center gap-1 rounded-full border border-white/15 px-3 py-1 hover:bg-white/5">
            <LogOut className="w-4 h-4" /> خروج
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-4">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <h2 className="font-semibold mb-2">إنشاء طلب استشارة</h2>
          <form onSubmit={(e)=>{e.preventDefault(); alert('تم إرسال طلب الاستشارة (Placeholder).')}} className="grid gap-3">
            <input placeholder="عنوان الاستشارة" className="px-4 py-3 rounded-xl bg-black/30 border border-white/10" required />
            <textarea rows="5" placeholder="وصف مختصر للمشكلة أو الحاجة" className="px-4 py-3 rounded-xl bg-black/30 border border-white/10" required />
            <button className="rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black px-5 py-3 font-bold">إرسال</button>
          </form>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <h2 className="font-semibold mb-2">سجل الاستشارات</h2>
          <div className="text-sm opacity-75">سيظهر هنا قائمة طلباتك السابقة (Placeholder). يمكننا ربطه لاحقًا بـ Firestore.</div>
        </div>
        <Link to="/" className="text-sm underline opacity-80">العودة إلى الرئيسية</Link>
      </div>
    </div>
  )
}
