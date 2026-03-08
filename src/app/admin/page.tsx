"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"

// Şimdilik basit client-side kontrol, ilerleyen adımda middleware ile güçlendirilebilir.

const ADMIN_PASS = process.env.NEXT_PUBLIC_ADMIN_PASS || "hackathon2026"

export default function AdminPage() {
  const [auth, setAuth] = useState(false)
  const [input, setInput] = useState("")
  const [error, setError] = useState("")
  const [rows, setRows] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  async function login() {
    if (input === ADMIN_PASS) {
      setAuth(true)
      setError("")
      fetchData()
    } else {
      setError("Şifre yanlış.")
    }
  }

  async function fetchData() {
    setLoading(true)
    const { data, error } = await supabase
      .from("basvurular")
      .select("*")
      .order("created_at", { ascending: false })
    if (!error && data) setRows(data)
    setLoading(false)
  }

  if (!auth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 w-full max-w-sm">
          <h1 className="text-xl font-black text-gray-900 mb-6">Admin Paneli</h1>
          <input
            type="password"
            placeholder="Şifre"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && login()}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-gray-900 mb-3"
          />
          {error && <p className="text-xs text-red-500 mb-3">{error}</p>}
          <button
            onClick={login}
            className="w-full py-2.5 bg-gray-900 text-white rounded-xl text-sm font-semibold hover:bg-gray-700 transition-colors"
          >
            Giriş
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-black text-gray-900">Başvurular ({rows.length})</h1>
        <button
          onClick={fetchData}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors"
        >
          Yenile
        </button>
      </div>

      {loading ? (
        <p className="text-gray-400 text-sm">Yükleniyor...</p>
      ) : rows.length === 0 ? (
        <p className="text-gray-400 text-sm">Henüz başvuru yok.</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-gray-100">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {["Ad Soyad", "E-posta", "Üniversite", "Takım Adı", "Üye Sayısı", "Tarih"].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 bg-white">
              {rows.map(r => (
                <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-900">{r.ad_soyad}</td>
                  <td className="px-4 py-3 text-gray-500">{r.eposta}</td>
                  <td className="px-4 py-3 text-gray-500">{r.universite}</td>
                  <td className="px-4 py-3 text-gray-500">{r.takim_adi}</td>
                  <td className="px-4 py-3 text-gray-500">{r.takim_uyeleri?.length ?? "-"}</td>
                  <td className="px-4 py-3 text-gray-400 text-xs">
                    {new Date(r.created_at).toLocaleDateString("tr-TR")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}