import React, { useEffect, useMemo, useState } from "react"
import { useAuth } from "../contexts/AuthContext.jsx"
import { db } from "../firebase"
import { collection, onSnapshot, orderBy, query } from "firebase/firestore"

const ADMIN_EMAILS = ["mohamadjleilaty@gmail.com"] // عدّلها لإيميلك

export default function AdminConsultations() {
  const { user } = useAuth()
  const [rows, setRows] = useState([])

  const isAdmin = useMemo(() => !!user && ADMIN_EMAILS.includes(user.email || ""), [user])

  useEffect(() => {
    if (!isAdmin || !db) return
    const q = query(collection(db, "consultations"), orderBy("createdAt", "desc"))
    const unsub = onSnapshot(q, snap => setRows(snap.docs.map(d => ({ id: d.id, ...d.data() }))))
    return () => unsub()
  }, [isAdmin])

  const exportCSV = () => {
    const header = ["id","uid","title","body","durationMinutes","status","createdAt"]
    const lines = [header.join(",")]
    rows.forEach(r => {
      const dt = r.createdAt?.toDate ? r.createdAt.toDate().toISOString() : ""
      const safe = s => `"${String(s||"").replace(/"/g,'""')}"`
      lines.push([r.id, r.uid, safe(r.title), safe(r.body), r.durationMinutes||"", r.status||"", dt].join(","))
    })
    const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `consultations_${new Date().toISOString().slice(0,10)}.csv`
    document.body.appendChild(a); a.click(); a.remove()
    URL.revokeObjectURL(url)
  }

  if (!user) return <div className="p-6">سجّل الدخول للمتابعة.</div>
  if (!isAdmin) return <div className="p-6">ليس لديك صلاحية الوصول.</div>

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-black">لوحة الاستشارات (أدمن)</h1>
        <button onClick={exportCSV} className="rounded-xl bg-emerald-500 text-black px-4 py-2 font-bold hover:bg-emerald-400">تصدير CSV</button>
      </div>

      <div className="mt-6 overflow-auto rounded-2xl border border-white/10">
        <table className="w-full text-sm">
          <thead className="bg-white/10">
            <tr>
              <th className="px-3 py-2 text-left">التاريخ</th>
              <th className="px-3 py-2 text-left">المستخدم</th>
              <th className="px-3 py-2 text-left">العنوان</th>
              <th className="px-3 py-2 text-left">النص</th>
              <th className="px-3 py-2 text-left">المدّة</th>
              <th className="px-3 py-2 text-left">الحالة</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.id} className="border-t border-white/10">
                <td className="px-3 py-2">{r.createdAt?.toDate ? r.createdAt.toDate().toLocaleString() : "…"}</td>
                <td className="px-3 py-2">{r.uid}</td>
                <td className="px-3 py-2 font-semibold">{r.title}</td>
                <td className="px-3 py-2 opacity-80">{r.body}</td>
                <td className="px-3 py-2">{r.durationMinutes||""}</td>
                <td className="px-3 py-2">{r.status||"new"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
