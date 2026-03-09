"use client"

import { useEffect, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { fetchApplications } from "./actions"
import {
  Users, User, X, ChevronRight, RefreshCw,
  Lock, LogOut, Search, CheckCircle, Clock,
  ChevronDown, ChevronUp
} from "lucide-react"

// ─── TYPES ────────────────────────────────────────────────────────────────────
interface MemberRow {
  index: number
  name: string
  university: string
  department: string
  grade: string
}

interface Application {
  id: string
  created_at: string
  pill_type: "red" | "blue" | null
  team_name: string | null
  member_count: number | null
  captain_email: string | null
  captain_phone: string | null
  members: MemberRow[] | null
  problem: string | null
  motivation: string | null
  approach: string | null
  skills: string[] | null
  tech_stack: string | null
  can_attend_48h: boolean | null
  can_attend_physical: boolean | null
  prev_hackathon_exp: boolean | null
  wants_mentorship: boolean | null
  note: string | null
}

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const fmt = (d: string) =>
  new Date(d).toLocaleString("tr-TR", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  })

const bool = (v: boolean | null) =>
  v === null ? "—" : v ? "Evet" : "Hayır"

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const T = {
  bg:      "#0c111b",
  surface: "#111827",
  border:  "#1e2d3d",
  border2: "#243447",
  text:    "#f0f4f8",
  muted:   "#4a6480",
  subtle:  "#1a2535",
  accent:  "#3b82f6",
  accentD: "#1d4ed8",
  red:     "#ef4444",
  green:   "#22c55e",
  font:    "'DM Sans', 'Helvetica Neue', sans-serif",
  mono:    "'DM Mono', 'Fira Code', monospace",
}

// ─── BADGE ────────────────────────────────────────────────────────────────────
function Badge({ type }: { type: "red" | "blue" | null }) {
  const isRed = type === "red"
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      padding: "3px 10px", borderRadius: 99, fontSize: 11, fontWeight: 700,
      letterSpacing: "0.1em", textTransform: "uppercase",
      backgroundColor: isRed ? "rgba(239,68,68,0.12)" : "rgba(59,130,246,0.12)",
      color: isRed ? "#f87171" : "#60a5fa",
      border: `1px solid ${isRed ? "rgba(239,68,68,0.25)" : "rgba(59,130,246,0.25)"}`,
    }}>
      <span style={{
        width: 5, height: 5, borderRadius: "50%",
        backgroundColor: isRed ? "#ef4444" : "#3b82f6",
      }} />
      {isRed ? "Takım" : "Bireysel"}
    </span>
  )
}

// ─── FIELD ROW ────────────────────────────────────────────────────────────────
function FieldRow({ label, value, mono }: { label: string; value: React.ReactNode; mono?: boolean }) {
  return (
    <div style={{
      display: "grid", gridTemplateColumns: "160px 1fr",
      gap: 16, padding: "11px 0",
      borderBottom: `1px solid ${T.border}`,
    }}>
      <span style={{
        fontSize: 11, fontWeight: 700, letterSpacing: "0.15em",
        textTransform: "uppercase", color: T.muted, paddingTop: 1,
      }}>{label}</span>
      <span style={{
        fontSize: 13, color: T.text, lineHeight: 1.6,
        fontFamily: mono ? T.mono : T.font,
      }}>{value ?? "—"}</span>
    </div>
  )
}

// ─── SECTION ──────────────────────────────────────────────────────────────────
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <p style={{
        fontSize: 10, fontWeight: 700, letterSpacing: "0.3em",
        textTransform: "uppercase", color: T.accent,
        margin: "0 0 12px", display: "flex", alignItems: "center", gap: 8,
      }}>
        <span style={{ flex: 1, height: 1, backgroundColor: T.border, display: "block" }} />
        {title}
        <span style={{ flex: 1, height: 1, backgroundColor: T.border, display: "block" }} />
      </p>
      <div style={{ backgroundColor: T.surface, border: `1px solid ${T.border}`, borderRadius: 14, padding: "4px 20px" }}>
        {children}
      </div>
    </div>
  )
}

// ─── DETAIL PANEL ─────────────────────────────────────────────────────────────
function DetailPanel({ app, onClose }: { app: Application; onClose: () => void }) {
  return (
    <motion.div
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ type: "spring", stiffness: 340, damping: 36 }}
      style={{
        position: "fixed", top: 0, right: 0, bottom: 0,
        width: "min(580px, 100vw)",
        backgroundColor: T.bg,
        borderLeft: `1px solid ${T.border2}`,
        zIndex: 100,
        display: "flex", flexDirection: "column",
        fontFamily: T.font,
        boxShadow: "-24px 0 80px rgba(0,0,0,0.6)",
      }}
    >
      {/* Panel header */}
      <div style={{
        padding: "20px 24px",
        borderBottom: `1px solid ${T.border}`,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexShrink: 0,
      }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <Badge type={app.pill_type} />
          <h2 style={{
            fontSize: 18, fontWeight: 800, color: T.text,
            margin: 0, letterSpacing: "-0.02em",
          }}>
            {app.team_name || (app.members?.[0]?.name) || "İsimsiz"}
          </h2>
          <span style={{ fontSize: 11, color: T.muted, fontFamily: T.mono }}>
            {fmt(app.created_at)}
          </span>
        </div>
        <button onClick={onClose} style={{
          width: 36, height: 36, borderRadius: 10,
          backgroundColor: T.subtle, border: `1px solid ${T.border}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", color: T.muted,
        }}>
          <X size={16} />
        </button>
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: "auto", padding: "24px", scrollbarWidth: "thin",
        scrollbarColor: `${T.border} transparent` }}>

        {/* Takım / Kişi */}
        <Section title={app.pill_type === "red" ? "Takım Bilgileri" : "Kişisel Bilgiler"}>
          {app.pill_type === "red" && (
            <FieldRow label="Takım Adı" value={app.team_name} />
          )}
          <FieldRow label="E-posta" value={
            <a href={`mailto:${app.captain_email}`} style={{ color: T.accent, textDecoration: "none" }}>
              {app.captain_email}
            </a>
          } />
          <FieldRow label="Telefon" value={app.captain_phone} mono />
          {app.pill_type === "red" && (
            <FieldRow label="Üye Sayısı" value={`${app.member_count} kişi`} />
          )}
        </Section>

        {/* Üyeler */}
        {app.members && app.members.length > 0 && (
          <Section title="Üyeler">
            {app.members.map((m, i) => (
              <div key={i} style={{
                padding: "12px 0",
                borderBottom: i < (app.members?.length ?? 0) - 1 ? `1px solid ${T.border}` : "none",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                  <div style={{
                    width: 22, height: 22, borderRadius: "50%",
                    backgroundColor: i === 0 ? T.accent : T.subtle,
                    border: `1px solid ${i === 0 ? T.accent : T.border}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 10, fontWeight: 900, color: i === 0 ? "white" : T.muted,
                    flexShrink: 0,
                  }}>{i + 1}</div>
                  <span style={{ fontSize: 14, fontWeight: 700, color: T.text }}>
                    {m.name}
                    {i === 0 && <span style={{ fontSize: 10, color: T.accent, marginLeft: 8, fontWeight: 600, letterSpacing: "0.1em" }}>KAPTAN</span>}
                  </span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px 16px", marginLeft: 32 }}>
                  <span style={{ fontSize: 12, color: T.muted }}>{m.university}</span>
                  <span style={{ fontSize: 12, color: T.muted }}>{m.department} · {m.grade}. Sınıf</span>
                </div>
              </div>
            ))}
          </Section>
        )}

        {/* Proje */}
        <Section title="Proje Fikri">
          <FieldRow label="Problem" value={app.problem} />
          <FieldRow label="Motivasyon" value={app.motivation} />
          <FieldRow label="Yaklaşım" value={app.approach} />
        </Section>

        {/* Teknik */}
        <Section title="Teknik & Uygunluk">
          <FieldRow label="Deneyim" value={
            app.skills && app.skills.length > 0
              ? <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {app.skills.map(s => (
                    <span key={s} style={{
                      padding: "2px 10px", borderRadius: 99, fontSize: 11, fontWeight: 600,
                      backgroundColor: T.subtle, color: T.text,
                      border: `1px solid ${T.border2}`,
                    }}>{s}</span>
                  ))}
                </div>
              : "—"
          } />
          <FieldRow label="Teknolojiler" value={app.tech_stack} />
          <FieldRow label="48 saat" value={bool(app.can_attend_48h)} />
          <FieldRow label="Yüz yüze" value={bool(app.can_attend_physical)} />
        </Section>

        {/* Opsiyonel */}
        <Section title="Opsiyonel">
          <FieldRow label="Önceki deneyim" value={bool(app.prev_hackathon_exp)} />
          <FieldRow label="Mentorluk" value={bool(app.wants_mentorship)} />
          {app.note && <FieldRow label="Not" value={app.note} />}
        </Section>

      </div>
    </motion.div>
  )
}

// ─── TABLE ROW ────────────────────────────────────────────────────────────────
function AppRow({ app, rank, onClick, isSelected }: {
  app: Application; rank: number; onClick: () => void; isSelected: boolean
}) {
  return (
    <motion.tr
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: rank * 0.03 }}
      onClick={onClick}
      style={{
        cursor: "pointer",
        backgroundColor: isSelected ? "rgba(59,130,246,0.06)" : "transparent",
        transition: "background-color 0.15s",
      }}
      onMouseEnter={e => { if (!isSelected) (e.currentTarget as HTMLElement).style.backgroundColor = T.subtle }}
      onMouseLeave={e => { if (!isSelected) (e.currentTarget as HTMLElement).style.backgroundColor = "transparent" }}
    >
      <td style={{ ...td, width: 44, color: T.muted, fontFamily: T.mono, fontSize: 11 }}>
        {String(rank).padStart(2, "0")}
      </td>
      <td style={td}>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: T.text }}>
            {app.team_name || app.members?.[0]?.name || "—"}
          </span>
          <span style={{ fontSize: 11, color: T.muted, fontFamily: T.mono }}>
            {app.captain_email}
          </span>
        </div>
      </td>
      <td style={td}><Badge type={app.pill_type} /></td>
      <td style={{ ...td, textAlign: "center" }}>
        <span style={{ fontSize: 13, color: T.text, fontFamily: T.mono }}>
          {app.member_count ?? 1}
        </span>
      </td>
      <td style={{ ...td, color: T.muted, fontSize: 12, fontFamily: T.mono }}>
        {fmt(app.created_at)}
      </td>
      <td style={{ ...td, textAlign: "right" }}>
        <ChevronRight size={14} color={isSelected ? T.accent : T.muted} />
      </td>
    </motion.tr>
  )
}

const td: React.CSSProperties = {
  padding: "14px 16px",
  borderBottom: `1px solid ${T.border}`,
  verticalAlign: "middle",
}
const th: React.CSSProperties = {
  padding: "10px 16px",
  textAlign: "left" as const,
  fontSize: 10, fontWeight: 700,
  letterSpacing: "0.2em", textTransform: "uppercase" as const,
  color: T.muted,
  borderBottom: `1px solid ${T.border2}`,
  whiteSpace: "nowrap" as const,
}

// ═══════════════════════════════════════════════════════════════════════════════
//  PAGE
// ═══════════════════════════════════════════════════════════════════════════════
export default function AdminPage() {
  const [authed, setAuthed]           = useState(false)
  const [passInput, setPassInput]     = useState("")
  const [passError, setPassError]     = useState("")
  const [apps, setApps]               = useState<Application[]>([])
  const [loading, setLoading]         = useState(false)
  const [selected, setSelected]       = useState<Application | null>(null)
  const [search, setSearch]           = useState("")
  const [filter, setFilter]           = useState<"all" | "red" | "blue">("all")
  const [sortDir, setSortDir]         = useState<"desc" | "asc">("desc")

  const fetchApps = useCallback(async () => {
    setLoading(true)
    try {
      const data = await fetchApplications(sortDir)
      setApps((data ?? []) as Application[])
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e)
      console.error("Fetch error:", msg)
      alert("Veri çekme hatası: " + msg)
    } finally {
      setLoading(false)
    }
  }, [sortDir])

  useEffect(() => { if (authed) fetchApps() }, [authed, fetchApps])

  const handleLogin = () => {
    if (passInput === process.env.NEXT_PUBLIC_ADMIN_PASS) {
      setAuthed(true)
    } else {
      setPassError("Hatalı şifre.")
      setPassInput("")
    }
  }

  const filtered = apps.filter(a => {
    if (filter === "red" && a.pill_type !== "red") return false
    if (filter === "blue" && a.pill_type !== "blue") return false
    const q = search.toLowerCase()
    if (!q) return true
    return (
      a.team_name?.toLowerCase().includes(q) ||
      a.captain_email?.toLowerCase().includes(q) ||
      a.members?.some(m => m.name.toLowerCase().includes(q))
    )
  })

  const redCount  = apps.filter(a => a.pill_type === "red").length
  const blueCount = apps.filter(a => a.pill_type === "blue").length

  // ── LOGIN ──
  if (!authed) {
    return (
      <div style={{
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        backgroundColor: T.bg, fontFamily: T.font,
      }}>
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{
            width: 360,
            backgroundColor: T.surface,
            border: `1px solid ${T.border2}`,
            borderRadius: 20,
            padding: "36px 32px",
          }}
        >
          <div style={{ marginBottom: 28, display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 12,
              backgroundColor: "rgba(59,130,246,0.12)",
              border: `1px solid rgba(59,130,246,0.25)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              marginBottom: 8,
            }}>
              <Lock size={18} color={T.accent} />
            </div>
            <h1 style={{ fontSize: 20, fontWeight: 800, color: T.text, margin: 0, letterSpacing: "-0.02em" }}>
              Admin Girişi
            </h1>
            <p style={{ fontSize: 13, color: T.muted, margin: 0 }}>
              Başvuruları görüntülemek için şifreyi girin.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <input
              type="password"
              placeholder="Şifre"
              value={passInput}
              onChange={e => { setPassInput(e.target.value); setPassError("") }}
              onKeyDown={e => e.key === "Enter" && handleLogin()}
              autoFocus
              style={{
                width: "100%", padding: "12px 16px", borderRadius: 12,
                border: `1.5px solid ${passError ? "#ef4444" : T.border2}`,
                backgroundColor: T.bg, color: T.text, fontSize: 14,
                fontFamily: T.font, outline: "none", boxSizing: "border-box",
                transition: "border-color 0.15s",
              }}
            />
            {passError && (
              <span style={{ fontSize: 12, color: "#f87171" }}>{passError}</span>
            )}
            <button
              onClick={handleLogin}
              style={{
                padding: "12px", borderRadius: 12, border: "none",
                backgroundColor: T.accent, color: "white",
                fontSize: 13, fontWeight: 700, letterSpacing: "0.1em",
                textTransform: "uppercase", cursor: "pointer",
                fontFamily: T.font, transition: "background-color 0.15s",
              }}
            >
              Giriş Yap
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  // ── DASHBOARD ──
  return (
    <div style={{
      minHeight: "100vh", backgroundColor: T.bg, fontFamily: T.font, color: T.text,
    }}>
      {/* Top bar */}
      <div style={{
        position: "sticky", top: 0, zIndex: 50,
        backgroundColor: "rgba(12,17,27,0.92)",
        backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${T.border}`,
        padding: "0 32px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: 60,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontSize: 14, fontWeight: 800, color: T.text, letterSpacing: "-0.02em" }}>
            HACK<span style={{ color: T.accent }}>ATHON</span>
          </span>
          <span style={{
            fontSize: 10, color: T.accent, backgroundColor: "rgba(59,130,246,0.1)",
            border: `1px solid rgba(59,130,246,0.2)`, borderRadius: 6,
            padding: "2px 8px", fontFamily: T.mono,
          }}>ADMIN</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={fetchApps} disabled={loading}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "7px 14px", borderRadius: 8,
              backgroundColor: T.subtle, border: `1px solid ${T.border}`,
              color: T.muted, fontSize: 12, fontWeight: 600,
              cursor: "pointer", fontFamily: T.font,
            }}>
            <RefreshCw size={13} style={{ animation: loading ? "spin 1s linear infinite" : "none" }} />
            Yenile
          </button>
          <button onClick={() => setAuthed(false)}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "7px 14px", borderRadius: 8,
              backgroundColor: T.subtle, border: `1px solid ${T.border}`,
              color: T.muted, fontSize: 12, fontWeight: 600,
              cursor: "pointer", fontFamily: T.font,
            }}>
            <LogOut size={13} />
            Çıkış
          </button>
        </div>
      </div>

      <div style={{ padding: "32px", maxWidth: 1200, margin: "0 auto" }}>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 32 }}>
          {[
            { label: "Toplam Başvuru", value: apps.length, icon: <CheckCircle size={16} />, color: T.green },
            { label: "Takım Başvurusu", value: redCount, icon: <Users size={16} />, color: "#f87171" },
            { label: "Bireysel Başvuru", value: blueCount, icon: <User size={16} />, color: "#60a5fa" },
          ].map(s => (
            <div key={s.label} style={{
              backgroundColor: T.surface, border: `1px solid ${T.border}`,
              borderRadius: 16, padding: "20px 24px",
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <div>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase",
                  color: T.muted, margin: "0 0 6px" }}>{s.label}</p>
                <p style={{ fontSize: 32, fontWeight: 800, color: T.text, margin: 0,
                  fontFamily: T.mono, letterSpacing: "-0.03em" }}>{s.value}</p>
              </div>
              <div style={{
                width: 40, height: 40, borderRadius: 12,
                backgroundColor: `${s.color}18`,
                border: `1px solid ${s.color}30`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: s.color,
              }}>{s.icon}</div>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div style={{
          display: "flex", alignItems: "center", gap: 12, marginBottom: 16,
          flexWrap: "wrap",
        }}>
          {/* Search */}
          <div style={{
            flex: 1, minWidth: 220,
            display: "flex", alignItems: "center", gap: 10,
            backgroundColor: T.surface, border: `1px solid ${T.border2}`,
            borderRadius: 10, padding: "9px 14px",
          }}>
            <Search size={14} color={T.muted} />
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Takım adı, e-posta veya isim ara..."
              style={{
                flex: 1, background: "none", border: "none", outline: "none",
                color: T.text, fontSize: 13, fontFamily: T.font,
              }}
            />
          </div>

          {/* Filter tabs */}
          <div style={{
            display: "flex", gap: 4,
            backgroundColor: T.surface, border: `1px solid ${T.border}`,
            borderRadius: 10, padding: 4,
          }}>
            {(["all", "red", "blue"] as const).map(f => (
              <button key={f} onClick={() => setFilter(f)}
                style={{
                  padding: "6px 14px", borderRadius: 7, border: "none",
                  fontSize: 12, fontWeight: 700, cursor: "pointer",
                  fontFamily: T.font, letterSpacing: "0.05em",
                  backgroundColor: filter === f ? T.border2 : "transparent",
                  color: filter === f ? T.text : T.muted,
                  transition: "all 0.15s",
                }}>
                {f === "all" ? "Tümü" : f === "red" ? "Takım" : "Bireysel"}
              </button>
            ))}
          </div>

          {/* Sort */}
          <button onClick={() => setSortDir(d => d === "desc" ? "asc" : "desc")}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "8px 14px", borderRadius: 10,
              backgroundColor: T.surface, border: `1px solid ${T.border}`,
              color: T.muted, fontSize: 12, fontWeight: 600,
              cursor: "pointer", fontFamily: T.font,
            }}>
            {sortDir === "desc" ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
            {sortDir === "desc" ? "Yeniden eskiye" : "Eskiden yeniye"}
          </button>
        </div>

        {/* Table */}
        <div style={{
          backgroundColor: T.surface,
          border: `1px solid ${T.border}`,
          borderRadius: 16, overflow: "hidden",
        }}>
          {loading ? (
            <div style={{ padding: "64px 0", display: "flex", flexDirection: "column",
              alignItems: "center", gap: 12, color: T.muted }}>
              <Clock size={24} style={{ animation: "spin 1.2s linear infinite" }} />
              <span style={{ fontSize: 13 }}>Yükleniyor...</span>
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ padding: "64px 0", display: "flex", flexDirection: "column",
              alignItems: "center", gap: 8, color: T.muted }}>
              <span style={{ fontSize: 13 }}>Başvuru bulunamadı.</span>
            </div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: T.bg }}>
                  <th style={{ ...th, width: 44 }}>#</th>
                  <th style={th}>Başvuru Sahibi</th>
                  <th style={th}>Tür</th>
                  <th style={{ ...th, textAlign: "center" }}>Uye</th>
                  <th style={th}>Tarih</th>
                  <th style={{ ...th, width: 32 }} />
                </tr>
              </thead>
              <tbody>
                {filtered.map((app, i) => (
                  <AppRow key={app.id} app={app} rank={i + 1}
                    isSelected={selected?.id === app.id}
                    onClick={() => setSelected(s => s?.id === app.id ? null : app)}
                  />
                ))}
              </tbody>
            </table>
          )}
        </div>

        {filtered.length > 0 && (
          <p style={{ fontSize: 12, color: T.muted, marginTop: 12, textAlign: "right" }}>
            {filtered.length} başvuru gösteriliyor
          </p>
        )}
      </div>

      {/* Detail panel */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              style={{
                position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.5)",
                zIndex: 99, backdropFilter: "blur(2px)",
              }}
            />
            <DetailPanel app={selected} onClose={() => setSelected(null)} />
          </>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }
        ::-webkit-scrollbar { width: 6px }
        ::-webkit-scrollbar-track { background: transparent }
        ::-webkit-scrollbar-thumb { background: ${T.border2}; border-radius: 99px }
      `}</style>
    </div>
  )
}