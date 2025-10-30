import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext.jsx'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LogOut, LogIn } from 'lucide-react'
import { db } from '../firebase'
import { addDoc, collection, serverTimestamp, query, where, orderBy, onSnapshot } from 'firebase/firestore'

const DRAFT_KEY = 'consultation_draft'

export default function Consultations() {
  const { user, logout } = useAuth()
  const nav = useNavigate()
  const loc = useLocation()
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [duration, setDuration] = useState(30)
  const [error, setError] = useState('')
  const [list, setList] = useState([])

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(DRAFT_KEY) || 'null')
    if (saved) { setTitle(saved.title||''); setBody(saved.body||''); setDuration(saved.duration||30) }
  }, [])
  useEffect(() => {
    localStorage.setItem(DRAFT_KEY, JSON.stringify({ title, body, duration }))
  }, [title, body, duration])

  useEffect(() => {
    if (!user || !db) { setList([]); return }
    const q = query(collection(db, 'consultations'), where('uid', '==', user.uid), orderBy('createdAt', 'desc'))
    const unsub = onSnapshot(q, snap => setList(snap.docs.map(d => ({ id: d.id, ...d.data() }))))
    return () => unsub()
  }, [user])

  const submit = async (e) => {
    e.preventDefault(); setError('')
    if (!user) { nav('/login', { state: { from: loc } }); return }
    if (!db) { setError('لم يتم تفعيل قاعدة البيانات. عدّل .env.local وفعّل Firestore.'); return }
    try {
      await addDoc(collection(db, 'consultations'), {
        uid: user.uid,
        title, body,
        durationMinutes: Number(duration) || 30,
        createdAt: serverTimestamp(),
        status: 'new',
      })
      localStorage.removeItem(DRAFT_KEY)
      setTitle(''); setBody(''); setDuration(30)
      alert('تم إرسال طلب الاستشارة وحفظه ✅')
    } catch (err) {
      console.error(err)
      setError('تعذر الحفظ. تحقق من الإعدادات.')
    }
  }

  return (
    <div className="min-h-screen max-w-3xl mx-auto p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">قسم الاستشارات</h1>
        <div className="flex items-center gap-3 text-sm">
          {user ? (
            <>
              <span className="opacity-80">مرحبًا، {user.displayName || user.email}</span>
              <button onClick={logout} className="inline-flex items-center gap-1 rounded-full border border-white/15 px-3 py-1 hover:bg-white/5"><LogOut className="w-4 h-4" /> خروج</button>
            </>
          ) : (
            <Link to="/login" state={{ from: loc }} className="inline-flex items-center gap-1 rounded-full border border-white/15 px-3 py-1 hover:bg-white/5"><LogIn className="w-4 h-4" /> دخول</Link>
          )}
        </div>
      </div>

      <div className="mt-6 grid gap-4">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <h2 className="font-semibold mb-2">إنشاء طلب استشارة</h2>
          {!user && <div className="mb-3 text-sm opacity-80">يمكنك كتابة الطلب الآن. عند الضغط على <b>إرسال</b> سنطلب منك تسجيل الدخول/إنشاء حساب ثم نرجعك هنا تلقائيًا.</div>}
          {error && <div className="text-red-300 text-sm mb-2">{error}</div>}
          <form onSubmit={submit} className="grid gap-3">
            <input placeholder="عنوان الاستشارة" className="px-4 py-3 rounded-xl bg-black/30 border border-white/10" value={title} onChange={e=>setTitle(e.target.value)} required />
            <textarea rows="5" placeholder="وصف مختصر للمشكلة أو الحاجة" className="px-4 py-3 rounded-xl bg-black/30 border border-white/10" value={body} onChange={e=>setBody(e.target.value)} required />
            <div className="grid grid-cols-2 gap-3">
              <input type="number" min="15" max="240" step="15" placeholder="مدة الاستشارة (دقائق)" className="px-4 py-3 rounded-xl bg-black/30 border border-white/10" value={duration} onChange={e=>setDuration(e.target.value)} />
              <div className="text-sm opacity-75 grid items-center">مثال: 30 أو 45 أو 60 دقيقة — سنؤكد الموعد بعد المراجعة</div>
            </div>
            <button className="rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black px-5 py-3 font-bold">إرسال</button>
          </form>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <h2 className="font-semibold mb-2">سجل الاستشارات</h2>
          {!user ? (
            <div className="text-sm opacity-75">سجّل الدخول لعرض سجل طلباتك السابقة.</div>
          ) : (
            <div className="space-y-2">
              {list.length === 0 && <div className="text-sm opacity-70">لا توجد استشارات بعد.</div>}
              {list.map(row => (
                <div key={row.id} className="p-3 rounded-lg border border-white/10 bg-black/20">
                  <div className="font-semibold">{row.title}</div>
                  <div className="text-sm opacity-80 mt-1">{row.body}</div>
                  <div className="text-xs opacity-70 mt-2">المدة: {row.durationMinutes||30} دقيقة — الحالة: {row.status||'new'} — التاريخ: {row.createdAt?.toDate ? row.createdAt.toDate().toLocaleString() : '...'}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <Link to="/" className="text-sm underline opacity-80">العودة إلى الرئيسية</Link>
      </div>
    </div>
  )
}
