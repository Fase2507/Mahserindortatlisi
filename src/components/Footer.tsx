import Link from "next/link"

export default function Footer() {
  return (
    <footer style={{ background: "#0f172a", borderTop: "1px solid #1e293b" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 24px 40px", display: "flex", flexDirection: "column", gap: 48 }}>
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 40 }}>
          <div style={{ maxWidth: 300 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: 16, color: "#f8fafc", letterSpacing: "-0.02em" }}>
                HACK<span style={{ color: "#60a5fa" }}>ATHON</span>
              </span>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#60a5fa", background: "#1e3a5f", border: "1px solid #1d4ed844", borderRadius: 6, padding: "2px 7px" }}>2026</span>
            </div>
            <p style={{ fontSize: 13, color: "#475569", lineHeight: 1.7, margin: 0 }}>
              48 saatlik çok temalı yazılım hackathonu.<br />
              Düzce Üniversitesi Teknopark.
            </p>
            <p style={{ fontSize: 12, color: "#334155", marginTop: 12 }}>
              Diagnosticode · Kalitet · BM Topluluğu · YB Topluluğu
            </p>
          </div>

          <nav style={{ display: "flex", gap: 48, flexWrap: "wrap" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#334155", letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 4px" }}>Etkinlik</p>
              {[{ href: "/hakkinda", label: "Hakkında" }, { href: "/program", label: "Program" }, { href: "/juri", label: "Jüri" }, { href: "/sponsorlar", label: "Sponsorlar" }].map(l => (
                <Link key={l.href} href={l.href} style={{ fontSize: 14, color: "#475569", textDecoration: "none" }}>{l.label}</Link>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#334155", letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 4px" }}>Katılım</p>
              {[{ href: "/sss", label: "SSS" }, { href: "/basvuru", label: "Başvuru" }].map(l => (
                <Link key={l.href} href={l.href} style={{ fontSize: 14, color: "#475569", textDecoration: "none" }}>{l.href === "/basvuru" ? <strong style={{ color: "#60a5fa" }}>{l.label}</strong> : l.label}</Link>
              ))}
            </div>
          </nav>
        </div>

        <div style={{ borderTop: "1px solid #1e293b", paddingTop: 24, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
          <p style={{ fontSize: 12, color: "#334155", margin: 0 }}>© 2026 Hackathon. ÜNİDES Destekli.</p>
          <p style={{ fontSize: 12, color: "#334155", margin: 0 }}>25–26 Nisan 2026 · Düzce Üniversitesi Teknopark</p>
        </div>
      </div>
    </footer>
  )
}