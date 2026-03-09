"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

function useCountdown(target: Date) {
  const [t, setT] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const calc = () => {
      const diff = target.getTime() - Date.now()
      if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
      return {
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      }
    }

    setT(calc())
    const id = setInterval(() => setT(calc()), 1000)
    return () => clearInterval(id)
  }, [target])

  return t
}

function Marquee({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const text = (items.join("  —  ") + "  —  ").toUpperCase()
  const repeated = text.repeat(6)
  return (
    <div style={{ overflow: "hidden", whiteSpace: "nowrap" }}>
      <style>{`
        @keyframes mq { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        @keyframes mq-r { from { transform: translateX(-50%) } to { transform: translateX(0) } }
        @keyframes shine { to { background-position: 200% center } }
      `}</style>
      <span style={{
        display: "inline-block",
        animation: `${reverse ? "mq-r" : "mq"} 40s linear infinite`,
        fontFamily: "'DM Mono', monospace",
        fontSize: 12,
        letterSpacing: "0.08em",
        color: reverse ? "#94a3b8" : "#fff",
        fontWeight: 500,
      }}>{repeated}</span>
    </div>
  )
}

const themes = [
  { id: "01", title: "Endüstri & Vaka Analizi", desc: "Gerçek iş problemlerine yazılım tabanlı çözümler", accent: "#2563eb" },
  { id: "02", title: "Sağlıkta Yapay Zeka", desc: "Etik kurallara uygun sağlık odaklı AI çözümleri", accent: "#0ea5e9" },
  { id: "03", title: "Veri Bilimi", desc: "Analiz, modelleme, tahminleme ve içgörü üretimi", accent: "#6366f1" },
  { id: "04", title: "Siber Güvenlik – CTF", desc: "Zafiyet analizi, exploit ve teknik raporlama", accent: "#ec4899" },
  { id: "05", title: "Web Tasarım & UX", desc: "İşlevsel ve estetik kullanıcı deneyimi tasarımı", accent: "#10b981" },
]

export default function HomePage() {
  const cd = useCountdown(new Date("2026-04-25T09:00:00"))
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <div style={{ background: "#fff", fontFamily: "'Inter', sans-serif" }}>

      {/* TOP BAND */}
      <div style={{ background: "#1d4ed8", padding: "10px 0" }}>
        <Marquee items={["48 Saatlik Hackathon", "25–26 Nisan 2026", "Düzce Üniversitesi Teknopark", "ÜNİDES Destekli", "5 Kategori", "Ücretsiz Katılım", "Mentor Desteği"]} />
      </div>

      {/* HERO */}
      <section style={{ background: "#fff", paddingTop: 100, paddingBottom: 100, paddingLeft: 24, paddingRight: 24, position: "relative", overflow: "hidden" }}>
        {/* Subtle dot grid */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "radial-gradient(#e2e8f0 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          opacity: 0.7,
        }} />
        {/* Blue glow top right */}
        <div style={{ position: "absolute", top: -100, right: -100, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto" }}>
          {/* Eyebrow */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 100, padding: "6px 16px", marginBottom: 32 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#2563eb", animation: "pulse 2s infinite" }} />
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#1d4ed8", letterSpacing: "0.05em" }}>
              ÜNİDES Destekli · 25–26 Nisan 2026
            </span>
            <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
          </div>

          {/* Heading */}
          <h1 style={{
            fontFamily: "'Cal Sans', 'Inter', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(3rem, 8vw, 6.5rem)",
            lineHeight: 1.0,
            letterSpacing: "-0.03em",
            color: "#0f172a",
            margin: "0 0 24px",
            maxWidth: 900,
          }}>
            Geleceği{" "}
            <span style={{
              background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 40%, #60a5fa 100%)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "shine 4s linear infinite",
            }}>
              48 Saatte
            </span>
            {" "}Kodla.
          </h1>

          <p style={{ fontSize: 18, color: "#64748b", maxWidth: 520, lineHeight: 1.75, margin: "0 0 40px" }}>
            Düzce Üniversitesi Teknopark'ta 5 kategoride gerçek problemlere çözüm üret.
            Mentor desteği al, ağını genişlet, ödüller kazan.
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 80 }}>
            <Link href="/basvuru" style={{
              padding: "15px 36px", borderRadius: 10, fontWeight: 700, fontSize: 15,
              background: "#1d4ed8", color: "#fff", textDecoration: "none",
              boxShadow: "0 4px 24px rgba(29,78,216,0.3)",
            }}>
              Hemen Başvur →
            </Link>
            <Link href="/hakkinda" style={{
              padding: "15px 36px", borderRadius: 10, fontWeight: 700, fontSize: 15,
              background: "#fff", color: "#0f172a", textDecoration: "none",
              border: "1.5px solid #e2e8f0",
            }}>
              Detayları Gör
            </Link>
          </div>

          {/* Stats row */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 0, borderTop: "1px solid #f1f5f9", paddingTop: 40 }}>
            {[
              { n: "48", label: "Saat Kesintisiz" },
              { n: "5", label: "Kategori" },
              { n: "2–4", label: "Kişi / Takım" },
              { n: "%100", label: "Ücretsiz" },
              { n: "4", label: "Düzenleyici Topluluk" },
            ].map((s, i) => (
              <div key={i} style={{ paddingRight: 48, marginRight: 0 }}>
                <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 26, fontWeight: 700, color: "#1d4ed8", lineHeight: 1, margin: 0 }}>{s.n}</p>
                <p style={{ fontSize: 13, color: "#94a3b8", marginTop: 4 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MARQUEE 2 — muted */}
      <div style={{ borderTop: "1px solid #f1f5f9", borderBottom: "1px solid #f1f5f9", padding: "13px 0", background: "#f8fafc" }}>
        <Marquee items={["Endüstri & Vaka Analizi", "Sağlıkta Yapay Zeka", "Veri Bilimi", "Siber Güvenlik CTF", "Web Tasarım & UX"]} reverse />
      </div>

      {/* COUNTDOWN */}
      <section style={{ background: "#0f172a", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#60a5fa", letterSpacing: "0.15em", marginBottom: 8 }}>ETKİNLİĞE KALAN SÜRE</p>
          <p style={{ fontSize: 13, color: "#334155", marginBottom: 40 }}>25 Nisan 2026, 09:00</p>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            {[
              { v: cd.days, l: "GÜN" },
              { v: cd.hours, l: "SAAT" },
              { v: cd.minutes, l: "DAKİKA" },
              { v: cd.seconds, l: "SANİYE" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "clamp(2rem, 5vw, 3.5rem)",
                    fontWeight: 700,
                    color: "#f8fafc",
                    background: "#1e293b",
                    border: "1px solid #334155",
                    borderRadius: 12,
                    padding: "14px 20px",
                    lineHeight: 1,
                    minWidth: 88,
                  }}>
                    {String(item.v).padStart(2, "0")}
                  </div>
                  <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "#475569", marginTop: 8, letterSpacing: "0.12em" }}>{item.l}</p>
                </div>
                {i < 3 && <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 28, color: "#334155", marginBottom: 24 }}>:</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KATEGORİLER */}
      <section style={{ padding: "100px 24px", background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 56, flexWrap: "wrap", gap: 16 }}>
            <div>
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#2563eb", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>Kategoriler</p>
              <h2 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "#0f172a", lineHeight: 1.15, letterSpacing: "-0.02em", margin: 0 }}>
                Hangi alanda<br />üreteceksin?
              </h2>
            </div>
            <Link href="/hakkinda" style={{ fontSize: 14, color: "#2563eb", textDecoration: "none", fontWeight: 600 }}>Tüm detaylar →</Link>
          </div>

          <div>
            {themes.map((t, i) => (
              <div
                key={i}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "24px 0",
                  borderTop: "1px solid #f1f5f9",
                  transition: "all 0.15s",
                  cursor: "default",
                  paddingLeft: hovered === i ? 16 : 0,
                  borderLeft: hovered === i ? `3px solid ${t.accent}` : "3px solid transparent",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#cbd5e1", minWidth: 24 }}>{t.id}</span>
                  <span style={{ fontWeight: 700, fontSize: "clamp(1rem, 2vw, 1.2rem)", color: hovered === i ? "#0f172a" : "#475569", transition: "color 0.15s" }}>
                    {t.title}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                  {hovered === i && (
                    <span style={{ fontSize: 13, color: "#64748b", maxWidth: 300, textAlign: "right" }}>{t.desc}</span>
                  )}
                  <span style={{ fontSize: 18, color: hovered === i ? t.accent : "#e2e8f0", transition: "color 0.15s", fontWeight: 700 }}>→</span>
                </div>
              </div>
            ))}
            <div style={{ borderTop: "1px solid #f1f5f9" }} />
          </div>
        </div>
      </section>

      {/* BİLGİ BANDI */}
      <section style={{ background: "#f8fafc", borderTop: "1px solid #f1f5f9", borderBottom: "1px solid #f1f5f9", padding: "56px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 40 }}>
          {[
            { label: "Format", value: "48 Saat Kesintisiz" },
            { label: "Tarih", value: "25–26 Nisan 2026" },
            { label: "Yer", value: "Düzce Üni. Teknopark" },
            { label: "Takım", value: "2–4 Kişi" },
            { label: "Katılım", value: "Ücretsiz" },
          ].map((item, i) => (
            <div key={i}>
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#94a3b8", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>{item.label}</p>
              <p style={{ fontWeight: 600, fontSize: 15, color: "#0f172a" }}>{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "120px 24px", background: "#fff", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", bottom: -200, right: -200, width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(37,99,235,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#2563eb", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 20 }}>Hazır mısın?</p>
          <h2 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: "clamp(2.2rem, 5vw, 4.5rem)", color: "#0f172a", lineHeight: 1.05, letterSpacing: "-0.03em", margin: "0 0 20px" }}>
            Takımını kur,<br />yerinizi ayırtın.
          </h2>
          <p style={{ fontSize: 16, color: "#64748b", margin: "0 auto 44px", maxWidth: 400, lineHeight: 1.7 }}>
            Başvuru tamamen ücretsiz. 2–4 kişilik takımlar katılabilir.
          </p>
          <Link href="/basvuru" style={{
            display: "inline-block", padding: "18px 56px", borderRadius: 12,
            fontWeight: 800, fontSize: 16,
            background: "#1d4ed8", color: "#fff", textDecoration: "none",
            boxShadow: "0 8px 32px rgba(29,78,216,0.25)",
          }}>
            Başvuruyu Tamamla →
          </Link>
        </div>
      </section>

    </div>
  )
}