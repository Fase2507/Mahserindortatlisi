"use client" 

import Link from "next/link"
import { MapPin, Heart } from "lucide-react"

export default function Footer() {
  return (
    <footer style={{
      background: "#0a1321",
      color: "#e2e8f0",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Subtle tech grid background */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: "linear-gradient(rgba(29,78,216,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(29,78,216,0.035) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "90px 32px 50px", position: "relative" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "60px 40px" }}>
          
          {/* BRAND COLUMN */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 900,
                fontSize: 26,
                letterSpacing: "-0.04em",
                background: "linear-gradient(90deg, #f8fafc, #60a5fa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                HACK<span style={{ color: "#60a5fa" }}>ATHON</span>
              </span>
              <span style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 12,
                padding: "4px 10px",
                background: "rgba(96,165,250,0.1)",
                border: "1px solid rgba(96,165,250,0.3)",
                borderRadius: 6,
                color: "#60a5fa",
              }}>2026</span>
            </div>
            
            <p style={{ fontSize: 15, lineHeight: 1.8, color: "#94a3b8", maxWidth: 320 }}>
              Türkiye'nin en iddialı ulusal yazılım hackathonu.<br />
              Gerçek sorunlar. Gerçek kod. Gerçek zafer.
            </p>

            <div style={{ marginTop: 32, display: "flex", alignItems: "center", gap: 8, color: "#64748b", fontSize: 13 }}>
              <MapPin size={17} />
              Düzce Üniversitesi Teknopark
            </div>
          </div>

          {/* ETKİNLİK */}
          <div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#60a5fa", letterSpacing: "2px", marginBottom: 20, textTransform: "uppercase" }}>
              Etkinlik
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { label: "Hakkında", href: "/hakkinda" },
                { label: "Program", href: "/program" },
                { label: "Jüri", href: "/juri" },
                { label: "Sponsorlar", href: "/sponsorlar" },
              ].map(l => (
                <Link key={l.href} href={l.href} style={{ color: "#cbd5e1", fontSize: 15, textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.color = "#60a5fa"}
                  onMouseLeave={e => e.currentTarget.style.color = "#cbd5e1"}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* KATILIM */}
          <div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#60a5fa", letterSpacing: "2px", marginBottom: 20, textTransform: "uppercase" }}>
              Katılım
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { label: "Sık Sorulan Sorular", href: "/sss" },
                { label: "Başvuru Yap", href: "/basvuru", special: true },
              ].map(l => (
                <Link 
                  key={l.href} 
                  href={l.href} 
                  style={{ 
                    color: l.special ? "#60a5fa" : "#cbd5e1", 
                    fontSize: 15, 
                    fontWeight: l.special ? 600 : 400,
                    textDecoration: "none",
                    transition: "all 0.2s" 
                  }}
                  onMouseEnter={e => { e.currentTarget.style.letterSpacing = "0.02em"; e.currentTarget.style.transform = "translateX(4px)" }}
                  onMouseLeave={e => { e.currentTarget.style.letterSpacing = "0"; e.currentTarget.style.transform = "translateX(0)" }}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* DESTEK & SOSYAL */}
          <div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#60a5fa", letterSpacing: "2px", marginBottom: 20, textTransform: "uppercase" }}>
              Destekleyenler
            </div>
            <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.7, marginBottom: 28 }}>
              Diagnosticode • Kalitet • BM Topluluğu • YB Topluluğu<br />
              <span style={{ color: "#94a3b8" }}>ve ÜNİDES</span>
            </p>

            <div style={{ display: "flex", gap: 20 }}>
              {["X", "Discord", "Instagram", "LinkedIn"].map((platform) => (
                <a
                  key={platform}
                  href="#"
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 12,
                    background: "rgba(96,165,250,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#60a5fa",
                    fontSize: 18,
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(96,165,250,0.2)"
                    e.currentTarget.style.transform = "scale(1.15) rotate(8deg)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(96,165,250,0.08)"
                    e.currentTarget.style.transform = "scale(1)"
                  }}
                >
                  {platform[0]}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div style={{
          marginTop: 90,
          paddingTop: 32,
          borderTop: "1px solid rgba(29,78,216,0.15)",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 16,
          fontSize: 13,
          color: "#64748b",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            © 2026 Ulusal Yazılım Hackathonu • 
            <span style={{ color: "#475569" }}>Tüm hakları saklıdır.</span>
          </div>
          
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            25 — 26 Nisan 2026 • Düzce Üniversitesi Teknopark
            <Heart size={15} style={{ color: "#ef4444", marginLeft: 4 }} />
          </div>
        </div>
      </div>
    </footer>
  )
}