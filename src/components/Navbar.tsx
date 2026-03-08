"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

const links = [
  { href: "/hakkinda", label: "Hakkında" },
  { href: "/program", label: "Program" },
  { href: "/juri", label: "Jüri & Sponsorlar" },
  { href: "/sss", label: "SSS" },
]

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 50, width: "100%",
      background: "rgba(255,255,255,0.9)",
      backdropFilter: "blur(12px)",
      borderBottom: "1px solid #f1f5f9",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>

        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: 17, color: "#0f172a", letterSpacing: "-0.02em" }}>
            HACK<span style={{ color: "#1d4ed8" }}>ATHON</span>
          </span>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#2563eb", background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 6, padding: "2px 7px" }}>
            2026
          </span>
        </Link>

        <nav style={{ display: "flex", alignItems: "center", gap: 4 }} className="hidden-mobile">
          {links.map(l => (
            <Link key={l.href} href={l.href} style={{
              padding: "7px 14px", borderRadius: 8, fontSize: 14, fontWeight: 500, textDecoration: "none",
              color: pathname === l.href ? "#0f172a" : "#64748b",
              background: pathname === l.href ? "#f1f5f9" : "transparent",
            }}>
              {l.label}
            </Link>
          ))}
          <Link href="/basvuru" style={{
            marginLeft: 8, padding: "9px 22px", borderRadius: 8, fontSize: 14, fontWeight: 700,
            background: "#1d4ed8", color: "#fff", textDecoration: "none",
            boxShadow: "0 2px 12px rgba(29,78,216,0.2)",
          }}>
            Başvur
          </Link>
        </nav>

        <button
          onClick={() => setOpen(!open)}
          style={{ background: "none", border: "none", cursor: "pointer", padding: 8, color: "#64748b" }}
          className="show-mobile"
        >
          {open
            ? <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            : <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          }
        </button>
      </div>

      {open && (
        <div style={{ background: "#fff", borderTop: "1px solid #f1f5f9", padding: "12px 24px 20px", display: "flex", flexDirection: "column", gap: 2 }}>
          {links.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} style={{ padding: "10px 12px", borderRadius: 8, fontSize: 14, fontWeight: 500, color: "#475569", textDecoration: "none" }}>
              {l.label}
            </Link>
          ))}
          <Link href="/basvuru" onClick={() => setOpen(false)} style={{ marginTop: 8, padding: "12px", borderRadius: 8, fontSize: 14, fontWeight: 700, background: "#1d4ed8", color: "#fff", textDecoration: "none", textAlign: "center" }}>
            Başvur
          </Link>
        </div>
      )}

      <style>{`
        @media (min-width: 768px) { .hidden-mobile { display: flex !important; } .show-mobile { display: none !important; } }
        @media (max-width: 767px) { .hidden-mobile { display: none !important; } .show-mobile { display: block !important; } }
      `}</style>
    </header>
  )
}