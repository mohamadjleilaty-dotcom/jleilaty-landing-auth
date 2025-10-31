import React, { useEffect, useState } from "react"
import { useAuth } from "../contexts/AuthContext.jsx"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { db } from "../firebase"
import { addDoc, collection, serverTimestamp, query, where, orderBy, onSnapshot } from "firebase/firestore"

const DRAFT_KEY = "consultation_draft"

export default function Consultations() {
  const { user } = useAuth()
  const nav = useNavigate()
  const loc = useLocation()
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [duration, setDuration] = useState(30)
  const [error, setError] = useState("")
  const [list, setList] = useState([])

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(DRAFT_KEY) || "null")
    if (saved) { setTitle(saved.title||""); setBody(saved.body||""); setDuration(saved.duration||30) }
  }, [])
  useEffect(() => {
    localStorage.setItem(DRAFT_KEY, JSON.stringify({ title, body, duration }))
  }, [title, body, duration])

  useEffect(() => {
    if (!user || !db) { setList([]); return }
    const q = query(collection(db,"consultations"), where("uid","==",user.uid), orderBy("createdAt","desc"))
    const unsub = onSnapshot(q, snap => setList(snap.docs.map(d=>({id:d.id, ...d.data()}))))
    return () => unsub()
  }, [user])

  const submit = async (e) => {
    e.preventDefault(); setError("")
    if (!user) { nav("/login", { state: { from: loc } }); return }
    if (!db) { setError("Database disabled. عدّل .env.local وفعّل Firestore."); return }
    try {
      await addDoc(collection(db,"consultations"), {
        uid: user.uid, title, body,
        durationMinutes: Number(duration)||30,
        createdAt: serverTimestamp(), status: "new"
      })
      localStorage.removeItem(DRAFT_KEY)
      setTitle(""); setBody(""); setDuration(30)
      alert("تم إرسال طلب الاستشارة ✅")
    } catch (err) { console.error(err); setError("تعذر الحفظ.") }
  }

  return (
    <div className="min-h-screen max-w-5xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-black">الاستشارات</h1>
        <p className="opacity-80 mt-1">نقدّم استشارات تقنية في الطلاء الكهربائي. اكتب طلبك وسنعود إليك بمواعيد وتكلفة.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><div className="font-semibold">كيف تعمل الجلسة؟</div><div className="text-sm opacity-80 mt-1">نراجع المشكلة ونقترح حلًا وخطة متابعة.</div></div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><div className="font-semibold">المدّة والتكلفة؟</div><div className="text-sm opacity-80 mt-1">عادة 30–60 دقيقة—نؤكد بعد الاطلاع.</div></div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><div className="font-semibold">كيفية الحجز؟</div><div className="text-sm opacity-80 mt-1">أرسل الطلب وسنقترح مواعيد متاحة.</div></div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <h2 className="font-semibold mb-2">طلب استشارة</h2>
        {!user && <div className="mb-3 text-sm opacity-80">يمكنك كتابة الطلب الآن. عند الضغط على <b>إرسال</b> سنطلب تسجيل الدخول/إنشاء حساب.</div>}
        {error && <div className="text-red-300 text-sm mb-2">{error}</div>}
        <form onSubmit={submit} className="grid gap-3">
          <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="العنوان" className="px-4 py-3 rounded-xl bg-black/30 border border-white/10" required />
          <textarea rows="5" value={body} onChange={e=>setBody(e.target.value)} placeholder="وصف المشكلة/الهدف" className="px-4 py-3 rounded-xl bg-black/30 border border-white/10" required />
          <div className="grid md:grid-cols-2 gap-3">
            <input type="number" min="15" max="240" step="15" value={duration} onChange={e=>setDuration(e.target.value)} placeholder="المدّة (دقائق)" className="px-4 py-3 rounded-xl bg-black/30 border border-white/10" />
            <div className="text-sm opacity-75 grid items-center">أمثلة: 30 / 45 / 60 دقيقة</div>
          </div>
          <button className="rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black px-5 py-3 font-bold">إرسال</button>
        </form>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 mt-6">
        <h2 className="font-semibold mb-2">سجلّي</h2>
        {!user ? <div className="text-sm opacity-75">سجّل الدخول لعرض سجلك.</div> : (
          <div className="space-y-2">
            {list.length === 0 && <div className="text-sm opacity-70">لا توجد استشارات بعد.</div>}
            {list.map(row => (
              <div key={row.id} className="p-3 rounded-lg border border-white/10 bg-black/20">
                <div className="font-semibold">{row.title}</div>
                <div className="text-sm opacity-80 mt-1">{row.body}</div>
                <div className="text-xs opacity-70 mt-2">المدّة: {row.durationMinutes||30} — الحالة: {row.status||"new"} — {row.createdAt?.toDate ? row.createdAt.toDate().toLocaleString() : "…"}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 text-sm opacity-80"><Link to="/" className="underline">العودة للرئيسية</Link></div>
    </div>
  )
}
