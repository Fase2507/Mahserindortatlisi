"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, ArrowLeft, Check, Trash2 } from "lucide-react"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// ─── TYPES ────────────────────────────────────────────────────────────────────
type PillColor = "red" | "blue"
type Dir = "bottom" | "top" | "left" | "right"
interface Member { name: string; uni: string; dept: string; grade: string }
// ─── FINAL HAND SYNERGY (Anatomically Correct) ─────────────────────────────────────────────────────────────
// function HandSynergy({ count }: { count: number }) {
//   const hands = [
//     { name: "hand1", color: "#50E3C2", delay: 0, start: { x: 0, y: 0 }, end: { x: 0, y: 12 }, rotate: -45 },
//     { name: "hand2", color: "#F5A623", delay: 0.06, start: { x: 60, y: -60 }, end: { x: -20, y: 20 }, rotate: 45 },
//     { name: "hand3", color: "#FF5F5F", delay: 0.12, start: { x: 0, y: 0 }, end: { x: 0, y: -2 }, rotate: 135 },
//     { name: "hand4", color: "#4A90E2", delay: 0.18, start: { x: 0, y: 0 }, end: { x: 32, y: 0 }, rotate: 225 },
//   ]

//   function SolidHandSilhouette({ color }: { color: string }) {
//     // Profesyonel el anatomisi: Bilekten parmak uçlarına daralan ve 
//     // parmak boğumları belirgin olan temiz bir SVG yolu.
//     return (
//       <path
//         d="M25,100 C25,105 30,110 35,110 L65,110 C70,110 75,105 75,100 C75,90 70,80 65,75 L65,25 C65,18 58,18 58,25 L58,70 L52,15 C52,8 45,8 45,15 L45,70 L38,20 C38,13 31,13 31,20 L31,70 L25,30 C25,23 18,23 18,30 L18,80 C18,90 20,95 25,100 Z M65,75 L85,65 C92,62 95,68 90,75 L70,95"
//         fill={color}
//         stroke="none"
//         strokeLinejoin="round"
//         strokeLinecap="round"
//         transform="translate(-50, -60) scale(1.2)" 
//       />
//     );
//   }

//   return (
//     <div className="relative w-40 h-40 flex items-center justify-center shrink-0" aria-hidden>
//       <svg viewBox="0 0 200 200" width="160" height="160" xmlns="http://www.w3.org/2000/svg">
//         <defs>
//           <filter id="hand-shadow" x="-50%" y="-50%" width="200%" height="200%">
//             <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="rgba(0,0,0,0.15)" />
//           </filter>
//           <mask id="center-mask">
//             <rect x="0" y="0" width="200" height="200" fill="white" />
//             <circle cx="100" cy="100" r="26" fill="black" />
//           </mask>
//         </defs>

//         {hands.slice(0, count).map((h) => (
//           <motion.g
//             key={h.name}
//             initial={{ opacity: 0, x: h.start.x, y: h.start.y }}
//             animate={{ opacity: 1, x: h.end.x, y: h.end.y }}
//             transition={{ type: "spring", stiffness: 280, damping: 26, delay: h.delay }}
//             style={{ transformOrigin: "100px 100px" }}
//             filter="url(#hand-shadow)"
//           >
//             <g transform={`rotate(${h.rotate}, 100, 100) translate(100, 100)`}>
//               <SolidHandSilhouette color={h.color} />
//             </g>
//           </motion.g>
//         ))}

//         <circle cx="100" cy="100" r="28" fill="transparent" filter="url(#hand-shadow)" />
//         <text
//           x="100" y="108"
//           textAnchor="middle"
//           dominantBaseline="middle"
//           style={{ fontSize: 32, fontWeight: 900, fill: "#0f172a" }}
//         >
//           {count}
//         </text>
//       </svg>
//     </div>
//   )
// }


function HandSynergy({ count }: { count: number }) {
  const hands = [
    { id: "h1", color: "#50E3C2", dark: "#3CBDA2", delay: 0, rotate: -45, end: { x: 30, y: 32 } },
    { id: "h2", color: "#F5A623", dark: "#D68A1B", delay: 0.06, rotate: 45, end: { x: -30, y: 30 } },
    { id: "h3", color: "#FF5F5F", dark: "#E04D4D", delay: 0.12, rotate: 135, end: { x: -30, y: -2 } },
    { id: "h4", color: "#4A90E2", dark: "#357ABD", delay: 0.18, rotate: 225, end: { x: 42, y: -10 } },
  ];

  function AnatomicalHand({ color, dark, id }: { color: string, dark: string, id: string }) {
    return (
      <g transform="translate(-50, -65) scale(1.1)">
        <defs>
          <linearGradient id={`grad-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} />
            <stop offset="100%" stopColor={dark} />
          </linearGradient>
        </defs>

        {/* Yeni Anatomik El Silüeti: Dar Bilek, Geniş Avuç ve Kademeli Parmaklar */}
        <path
          d="M40,125 L60,125 
             C62,110 75,100 75,85 
             L88,78 C95,74 98,82 92,88 
             L75,105 
             C75,95 72,80 72,75 L72,25 C72,18 63,18 63,25 L63,70 
             L56,15 C56,8 47,8 47,15 L47,70 
             L39,20 C39,13 30,13 30,20 L30,70 
             L22,35 C22,28 14,28 14,35 L14,80 
             C14,95 25,110 40,125 Z"
          fill={`url(#grad-${id})`}
        />

        {/* Eklem ve Avuç İçi Detayları (Hafif Gölgeler) */}
        <g stroke={dark} strokeWidth="0.8" opacity="0.3" fill="none" strokeLinecap="round">
          {/* Parmak boğum çizgileri */}
          <path d="M30,50 L39,50" />
          <path d="M47,45 L56,45" />
          <path d="M63,55 L72,55" />
          {/* Avuç içi "Hayat Çizgisi" dokunuşu */}
          <path d="M40,105 C45,95 60,90 70,100" />
        </g>

        {/* Üstten Gelen Işık Vurgusu (Highlights) */}
        <path
          d="M18,60 C18,45 22,35 22,35"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.2"
        />
      </g>
    );
  }

  return (
    <div className="relative w-48 h-48 flex items-center justify-center">
      <svg viewBox="0 0 200 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="soft-shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="5" stdDeviation="6" floodColor="black" floodOpacity="0.15" />
          </filter>
        </defs>

        {hands.slice(0, count).map((h) => (
          <motion.g
            key={h.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, x: h.end.x, y: h.end.y }}
            transition={{ type: "spring", stiffness: 100, damping: 15, delay: h.delay }}
            style={{ transformOrigin: "100px 100px" }}
            filter="url(#soft-shadow)"
          >
            <g transform={`rotate(${h.rotate}, 100, 100) translate(100, 100)`}>
              <AnatomicalHand color={h.color} dark={h.dark} id={h.id} />
            </g>
          </motion.g>
        ))}

        
      </svg>
    </div>
  );
}


// ─── PILL ─────────────────────────────────────────────────────────────────────
function Pill({ color, selected, dimmed, onClick, topLabel, bottomLabel }: {
  color: PillColor; selected: boolean; dimmed: boolean; onClick: () => void
  topLabel: string; bottomLabel: string
}) {
  const r      = color === "red"
  const g1     = r ? "#3d0808" : "#080e2e"
  const g2     = r ? "#dc2626" : "#2563eb"
  const glow   = r ? "rgba(220,38,38,0.5)" : "rgba(37,99,235,0.5)"
  const accent = r ? "#ef4444" : "#3b82f6"

  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:16 }}>
      <motion.button onClick={onClick}
        animate={{
          scale: selected ? 1.06 : dimmed ? 0.84 : 1,
          filter: dimmed ? "grayscale(70%) brightness(0.5)" : "none",
          boxShadow: selected ? `0 28px 56px -6px ${glow}` : `0 6px 24px -8px ${glow}`,
        }}
        whileHover={!dimmed ? { scale: selected ? 1.09 : 1.05 } : {}}
        transition={{ type: "spring", stiffness: 320, damping: 24 }}
        style={{ width:52, height:148, borderRadius:999, overflow:"hidden", cursor:"pointer",
          background:`linear-gradient(170deg, ${g1} 0%, ${g2} 50%, ${g1} 100%)`,
          border:"none", padding:0, position:"relative" }}
      >
        {/* gloss */}
        <div style={{ position:"absolute", top:12, bottom:12, left:7, width:6, borderRadius:99,
          background:"linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)" }} />
        {/* seam */}
        <div style={{ position:"absolute", top:"50%", left:0, right:0, height:1, backgroundColor:"rgba(0,0,0,0.2)" }} />
        {/* rim */}
        <div style={{ position:"absolute", inset:0, borderRadius:999,
          boxShadow:"inset 0 0 0 1px rgba(255,255,255,0.08)" }} />
        {/* pulse */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity:0, scale:1 }}
              animate={{ opacity:[0.35,0], scale:[1,1.8] }}
              transition={{ duration:1.6, repeat:Infinity, ease:"easeOut" }}
              style={{ position:"absolute", inset:0, borderRadius:999,
                background:`radial-gradient(circle, ${glow} 0%, transparent 65%)` }}
            />
          )}
        </AnimatePresence>
      </motion.button>

      <motion.div animate={{ opacity: selected ? 1 : dimmed ? 0.15 : 0.55 }} transition={{ duration:0.25 }}
        style={{ textAlign:"center" }}>
        <p style={{ fontSize:12, fontWeight:700, letterSpacing:"0.16em", textTransform:"uppercase",
          color: accent, margin:0 }}>{topLabel}</p>
        <p style={{ fontSize:11, color:"#64748b", marginTop:3, fontWeight:500 }}>{bottomLabel}</p>
      </motion.div>
    </div>
  )
}

// ─── PROGRESS BAR ─────────────────────────────────────────────────────────────
function ProgressBar({ step, total }: { step: number; total: number }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:6, width:"100%" }}>
      {Array.from({length:total}).map((_,i) => (
        <div key={i} style={{ flex:1, height:3, borderRadius:99,
          backgroundColor: i < step ? "#0f172a" : "#e2e8f0",
          transition:"background-color 0.4s" }} />
      ))}
      <span style={{ fontSize:11, fontWeight:700, color:"#94a3b8", whiteSpace:"nowrap", marginLeft:4 }}>
        {step}/{total}
      </span>
    </div>
  )
}

// ─── FORM PRIMITIVES ──────────────────────────────────────────────────────────
const fieldBase: React.CSSProperties = {
  width:"100%", border:"1px solid #e2e8f0", borderRadius:12,
  padding:"12px 16px", fontSize:14, color:"#0f172a", backgroundColor:"#ffffff",
  outline:"none", fontFamily:"inherit", boxSizing:"border-box", transition:"border-color 0.15s",
}

function FInput(p: React.InputHTMLAttributes<HTMLInputElement>) {
  const [focus, setFocus] = useState(false)
  return <input {...p}
    style={{ ...fieldBase, borderColor: focus ? "#0f172a" : "#e2e8f0", boxShadow: focus ? "0 0 0 3px rgba(15,23,42,0.06)" : "none" }}
    onFocus={e => { setFocus(true); p.onFocus?.(e) }}
    onBlur={e => { setFocus(false); p.onBlur?.(e) }}
  />
}
function FSelect(p: React.SelectHTMLAttributes<HTMLSelectElement>) {
  const [focus, setFocus] = useState(false)
  return <select {...p}
    style={{ ...fieldBase, borderColor: focus ? "#0f172a" : "#e2e8f0", boxShadow: focus ? "0 0 0 3px rgba(15,23,42,0.06)" : "none", appearance:"none", cursor:"pointer" }}
    onFocus={e => { setFocus(true); p.onFocus?.(e) }}
    onBlur={e => { setFocus(false); p.onBlur?.(e) }}
  />
}
function FTextarea(p: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const [focus, setFocus] = useState(false)
  return <textarea {...p}
    style={{ ...fieldBase, borderColor: focus ? "#0f172a" : "#e2e8f0", boxShadow: focus ? "0 0 0 3px rgba(15,23,42,0.06)" : "none", resize:"none" }}
    onFocus={e => { setFocus(true); p.onFocus?.(e) }}
    onBlur={e => { setFocus(false); p.onBlur?.(e) }}
  />
}

function FL({ children, hint }: { children: React.ReactNode; hint?: string }) {
  return (
    <div style={{ display:"flex", alignItems:"baseline", gap:6, marginBottom:6 }}>
      <span style={{ fontSize:11, fontWeight:700, letterSpacing:"0.16em", textTransform:"uppercase", color:"#64748b" }}>
        {children}
      </span>
      {hint && <span style={{ fontSize:11, color:"#94a3b8", fontWeight:400 }}>{hint}</span>}
    </div>
  )
}

function FormRow({ children }: { children: React.ReactNode }) {
  return <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>{children}</div>
}

function FormGroup({ children }: { children: React.ReactNode }) {
  return <div style={{ display:"flex", flexDirection:"column" }}>{children}</div>
}

// ─── SECTION CARD ─────────────────────────────────────────────────────────────
function SCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ backgroundColor:"#ffffff", border:"1px solid #e2e8f0", borderRadius:20, overflow:"hidden" }}>
      <div style={{ padding:"14px 24px", borderBottom:"1px solid #f1f5f9" }}>
        <span style={{ fontSize:10, fontWeight:700, letterSpacing:"0.22em", textTransform:"uppercase", color:"#94a3b8" }}>
          {title}
        </span>
      </div>
      <div style={{ padding:24, display:"flex", flexDirection:"column", gap:20 }}>
        {children}
      </div>
    </div>
  )
}

// ─── STEP TITLE ───────────────────────────────────────────────────────────────
function StepTitle({ badge, badgeColor, title, sub }: { badge:string; badgeColor:string; title:string; sub:string }) {
  return (
    <div style={{ marginBottom:28 }}>
      <p style={{ fontSize:10, fontWeight:700, letterSpacing:"0.44em", textTransform:"uppercase",
        color:badgeColor, margin:"0 0 8px" }}>{badge}</p>
      <h2 style={{ fontSize:30, fontWeight:800, color:"#0f172a", letterSpacing:"-0.025em", margin:"0 0 6px", lineHeight:1.1 }}>
        {title}
      </h2>
      <p style={{ fontSize:14, color:"#64748b", margin:0 }}>{sub}</p>
    </div>
  )
}

// ─── NEXT BUTTON ──────────────────────────────────────────────────────────────
function NextBtn({ label="Sonraki Adım", onClick, type="button", disabled=false }: {
  label?: string; onClick?: () => void; type?: "button"|"submit"; disabled?: boolean
}) {
  return (
    <motion.button type={type} onClick={onClick} disabled={disabled}
      whileHover={!disabled ? {scale:1.005} : {}} whileTap={!disabled ? {scale:0.995} : {}}
      style={{
        width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between",
        padding:"16px 20px", backgroundColor: disabled ? "#e2e8f0" : "#0f172a",
        color: disabled ? "#94a3b8" : "#ffffff", border:"none", borderRadius:14,
        fontSize:12, fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase",
        cursor: disabled ? "not-allowed" : "pointer", fontFamily:"inherit",
        boxShadow: disabled ? "none" : "0 4px 24px rgba(15,23,42,0.18)",
        transition:"background-color 0.2s",
      }}
    >
      <span>{label}</span>
      <div style={{ width:36, height:36, borderRadius:10, backgroundColor:"rgba(255,255,255,0.12)",
        display:"flex", alignItems:"center", justifyContent:"center" }}>
        <ArrowRight size={16} strokeWidth={2.5} />
      </div>
    </motion.button>
  )
}

// ─── RADIO OPTION ─────────────────────────────────────────────────────────────
function RadioOpt({ label, icon, checked, onChange }: {
  label: string; icon?: string; checked: boolean; onChange: () => void
}) {
  return (
    <label style={{
      display:"flex", alignItems:"center", gap:12,
      padding:"13px 16px", borderRadius:12, cursor:"pointer",
      border: `1.5px solid ${checked ? "#0f172a" : "#e2e8f0"}`,
      backgroundColor: checked ? "#0f172a" : "#fafafa",
      color: checked ? "#ffffff" : "#475569",
      transition:"all 0.15s", userSelect:"none",
    }}>
      <input type="radio" style={{display:"none"}} checked={checked} onChange={onChange} />
      <div style={{ width:16, height:16, borderRadius:"50%", border:`2px solid ${checked ? "white" : "#cbd5e1"}`,
        display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
        {checked && <div style={{width:6,height:6,borderRadius:"50%",backgroundColor:"white"}} />}
      </div>
      {icon && <span style={{fontSize:16}}>{icon}</span>}
      <span style={{fontSize:14, fontWeight:500}}>{label}</span>
    </label>
  )
}

// ─── CHECKBOX OPTION ──────────────────────────────────────────────────────────
function CheckOpt({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label style={{
      display:"flex", alignItems:"center", gap:10,
      padding:"11px 14px", borderRadius:12, cursor:"pointer",
      border:`1.5px solid ${checked ? "#0f172a" : "#e2e8f0"}`,
      backgroundColor: checked ? "#0f172a" : "#fafafa",
      color: checked ? "#ffffff" : "#475569",
      transition:"all 0.15s", userSelect:"none",
    }}>
      <input type="checkbox" style={{display:"none"}} checked={checked} onChange={onChange} />
      <div style={{ width:16, height:16, borderRadius:4, border:`2px solid ${checked ? "white" : "#cbd5e1"}`,
        display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
        {checked && <Check size={9} strokeWidth={3} color="white" />}
      </div>
      <span style={{fontSize:13, fontWeight:500}}>{label}</span>
    </label>
  )
}

// ─── YES / NO ─────────────────────────────────────────────────────────────────
function YesNo({ value, onChange }: { value: string; onChange: (v:string) => void }) {
  return (
    <div style={{display:"flex", gap:8}}>
      {["Evet","Hayır"].map(o => (
        <RadioOpt key={o} label={o} checked={value===o} onChange={() => onChange(o)} />
      ))}
    </div>
  )
}

// ─── AGREE CHECKBOX ───────────────────────────────────────────────────────────
function AgreeBox({ checked, onChange, children }: {
  checked: boolean; onChange: () => void; children: React.ReactNode
}) {
  return (
    <label style={{
      display:"flex", alignItems:"flex-start", gap:12,
      padding:"14px 16px", borderRadius:12, cursor:"pointer",
      border:`1.5px solid ${checked ? "#334155" : "#e2e8f0"}`,
      backgroundColor: checked ? "#f8fafc" : "#ffffff",
      transition:"all 0.15s", userSelect:"none",
    }}>
      <input type="checkbox" style={{display:"none"}} checked={checked} onChange={onChange} />
      <div style={{ width:18, height:18, borderRadius:5, marginTop:1, flexShrink:0,
        border:`2px solid ${checked ? "#0f172a" : "#cbd5e1"}`,
        backgroundColor: checked ? "#0f172a" : "white",
        display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.15s" }}>
        {checked && <Check size={10} strokeWidth={3} color="white" />}
      </div>
      <span style={{fontSize:14, color:"#334155", lineHeight:1.5}}>{children}</span>
    </label>
  )
}

// ─── MEMBER CARD ──────────────────────────────────────────────────────────────
function MCard({ idx, m, onChange, canRemove, onRemove, captainEmail, setCaptainEmail, captainPhone, setCaptainPhone, errors }: {
  idx:number; m:Member; onChange:(f:keyof Member,v:string)=>void; canRemove:boolean; onRemove:()=>void
  captainEmail?:string; setCaptainEmail?:(v:string)=>void; captainPhone?:string; setCaptainPhone?:(v:string)=>void
  errors?: Record<string,string>
}) {
  const cap = idx === 0
  return (
    <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-6}}
      transition={{duration:0.2}}
      style={{ border:"1px solid #e2e8f0", borderRadius:16, overflow:"hidden" }}
    >
      {/* Header */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
        padding:"12px 18px", backgroundColor: cap ? "#0f172a" : "#f8fafc",
        borderBottom:`1px solid ${cap ? "transparent" : "#f1f5f9"}` }}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{ width:22, height:22, borderRadius:"50%", backgroundColor: cap ? "white" : "#e2e8f0",
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:10, fontWeight:900, color: cap ? "#0f172a" : "#64748b" }}>{idx+1}</div>
          <span style={{ fontSize:11, fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase",
            color: cap ? "white" : "#64748b" }}>{cap ? "Takım Kaptanı" : `${idx+1}. Üye`}</span>
        </div>
        {canRemove && (
          <button type="button" onClick={onRemove} style={{ width:26, height:26, borderRadius:8,
            backgroundColor:"rgba(239,68,68,0.1)", border:"none", cursor:"pointer",
            display:"flex", alignItems:"center", justifyContent:"center", color:"#ef4444" }}>
            <Trash2 size={12} />
          </button>
        )}
      </div>

      {/* Body */}
      <div style={{ padding:20, backgroundColor:"white", display:"flex", flexDirection:"column", gap:16 }}>
        <FormRow>
          <FormGroup>
            <FL>Ad Soyad</FL>
            <FInput required placeholder="Ada Öztürk" value={m.name} onChange={e => onChange("name", e.target.value)} />
          </FormGroup>
          <FormGroup>
            <FL>Üniversite</FL>
            <FInput required placeholder="İTÜ" value={m.uni} onChange={e => onChange("uni", e.target.value)} />
          </FormGroup>
        </FormRow>
        <FormRow>
          <FormGroup>
            <FL>Fakülte / Bölüm</FL>
            <FInput required placeholder="Bilgisayar Müh." value={m.dept} onChange={e => onChange("dept", e.target.value)} />
          </FormGroup>
          <FormGroup>
            <FL>Sınıf</FL>
            <FSelect required value={m.grade} onChange={e => onChange("grade", e.target.value)}>
              <option value="">Seçiniz</option>
              {["Hazırlık","1","2","3","4","Lisansüstü"].map(g => (
                <option key={g} value={g}>{g === "Hazırlık" || g === "Lisansüstü" ? g : `${g}. Sınıf`}</option>
              ))}
            </FSelect>
          </FormGroup>
        </FormRow>
        {cap && (
          <FormRow>
            <FormGroup>
              <FL>E-posta</FL>
              <FInput required type="email" placeholder="ada@mail.com"
                value={captainEmail||""} onChange={e=>setCaptainEmail?.(e.target.value)} />
              {errors?.captainEmail && <span style={{fontSize:11,color:"#dc2626",marginTop:3}}>{errors.captainEmail}</span>}
            </FormGroup>
            <FormGroup>
              <FL>Telefon</FL>
              <FInput required type="tel" placeholder="05XX XXX XX XX"
                value={captainPhone||""} onChange={e=>setCaptainPhone?.(e.target.value)} />
              {errors?.captainPhone && <span style={{fontSize:11,color:"#dc2626",marginTop:3}}>{errors.captainPhone}</span>}
            </FormGroup>
          </FormRow>
        )}
      </div>
    </motion.div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
//  PAGE
// ═══════════════════════════════════════════════════════════════════════════════
export default function BasvuruPage() {
  const [pill, setPill] = useState<PillColor|null>(null)
  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)
  const [sending, setSending] = useState(false)
  const [submitError, setSubmitError] = useState<string|null>(null)

  const [teamName, setTeamName] = useState("")
  const [members, setMembers]   = useState<Member[]>([
    {name:"",uni:"",dept:"",grade:""},
    {name:"",uni:"",dept:"",grade:""},
    {name:"",uni:"",dept:"",grade:""},
  ])

  const [captainEmail, setCaptainEmail] = useState("")
  const [captainPhone, setCaptainPhone] = useState("")
  const [validationErrors, setValidationErrors] = useState<Record<string,string>>({})

  const [problem,     setProblem]     = useState("")
  const [motivation,  setMotivation]  = useState("")
  const [approach,    setApproach]    = useState("")
  const [skills,      setSkills]      = useState<string[]>([])
  const [tech,        setTech]        = useState("")
  const [can48,       setCan48]       = useState("")
  const [canFace,     setCanFace]     = useState("")
  const [ag1,setAg1]  = useState(false)
  const [ag2,setAg2]  = useState(false)
  const [ag3,setAg3]  = useState(false)
  const [prevExp,     setPrevExp]     = useState("")
  const [mentor,      setMentor]      = useState("")
  const [note,        setNote]        = useState("")

  const setCount = (n: number) => {
    if (n > members.length) setMembers([...members, ...Array(n-members.length).fill({name:"",uni:"",dept:"",grade:""})])
    else setMembers(members.slice(0,n))
  }
  const updateM = (i:number, f:keyof Member, v:string) => {
    const m=[...members]; m[i]={...m[i],[f]:v}; setMembers(m)
  }
  const toggleSkill = (s:string) => setSkills(p => p.includes(s)?p.filter(x=>x!==s):[...p,s])

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const phoneRe = /^(\+90|0)?5[0-9]{9}$/

  const validateStep1 = () => {
    const errs: Record<string,string> = {}
    if (pill === "red") {
      if (!teamName.trim()) errs.teamName = "Takım adı boş olamaz."
      members.forEach((m, i) => {
        if (!m.name.trim()) errs[`name_${i}`] = `${i+1}. üye adı boş olamaz.`
        if (!m.uni.trim())  errs[`uni_${i}`]  = `${i+1}. üye üniversitesi boş olamaz.`
        if (!m.dept.trim()) errs[`dept_${i}`] = `${i+1}. üye bölümü boş olamaz.`
        if (!m.grade)       errs[`grade_${i}`]= `${i+1}. üye sınıfı seçilmeli.`
      })
    } else {
      if (!members[0]?.name.trim()) errs.name_0 = "Ad soyad boş olamaz."
      if (!members[0]?.uni.trim())  errs.uni_0  = "Üniversite boş olamaz."
      if (!members[0]?.dept.trim()) errs.dept_0 = "Bölüm boş olamaz."
      if (!members[0]?.grade)       errs.grade_0= "Sınıf seçilmeli."
    }
    if (!emailRe.test(captainEmail)) errs.captainEmail = "Geçerli bir e-posta adresi girin."
    if (!phoneRe.test(captainPhone.replace(/\s/g,""))) errs.captainPhone = "Geçerli bir numara girin. (05XXXXXXXXX)"
    setValidationErrors(errs)
    return Object.keys(errs).length === 0
  }

  const validateStep2 = () => {
    const errs: Record<string,string> = {}
    if (!problem.trim())    errs.problem    = "Problem açıklaması boş olamaz."
    if (!motivation.trim()) errs.motivation = "Motivasyon boş olamaz."
    if (!approach.trim())   errs.approach   = "Yaklaşım boş olamaz."
    setValidationErrors(errs)
    return Object.keys(errs).length === 0
  }

  const validate = () => {
    const errs: Record<string,string> = {}
    setValidationErrors(errs)
    return true
  }

  const SKILLS = ["Yapay Zeka / ML","Veri Analizi","Web Geliştirme","Mobil Uygulama","Siber Güvenlik","UI / UX Tasarım","Hiçbiri"]

  const wrap: React.CSSProperties = {
    fontFamily:"'DM Sans','Helvetica Neue',sans-serif",
    minHeight:"calc(100dvh - 64px)",
    backgroundColor:"#f1f5f9",
    position:"relative",
  }

  return (
    <div style={wrap}>

      <AnimatePresence mode="wait">

        {/* ══ STEP 0: SEÇİM ══ */}
        {step===0 && !done && (
          <motion.div key="s0"
            initial={{opacity:0}} animate={{opacity:1}}
            exit={{opacity:0, y:-16, filter:"blur(6px)"}}
            transition={{duration:0.4, ease:[0.22,1,0.36,1]}}
            style={{minHeight:"calc(100dvh - 64px)", display:"flex", flexDirection:"column"}}
          >
            {/* Top text */}
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center", padding:"72px 24px 0" }}>
              <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.08}}
                style={{ fontSize:10, fontWeight:700, letterSpacing:"0.5em", textTransform:"uppercase",
                  color:"#94a3b8", marginBottom:16 }}>
                Hackathon 2026 · Başvuru
              </motion.p>
              <motion.h1 initial={{opacity:0,y:-8}} animate={{opacity:1,y:0}} transition={{delay:0.14}}
                style={{ fontSize:"clamp(40px,6vw,64px)", fontWeight:800, color:"#0f172a",
                  letterSpacing:"-0.035em", lineHeight:1.05, margin:0 }}>
                Seçimini yap.
              </motion.h1>
              <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.22}}
                style={{ fontSize:15, color:"#64748b", marginTop:12, maxWidth:300, lineHeight:1.6 }}>
                Hazır ekibinle mi geliyorsun, yoksa yeni bir ekip mi kuruyorsun?
              </motion.p>
            </div>

            {/* Pills */}
            <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:36 }}>
              <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.26}}
                style={{ display:"flex", alignItems:"flex-end", justifyContent:"center", gap:"clamp(64px,8vw,128px)" }}>
                <Pill color="red" selected={pill==="red"} dimmed={pill==="blue"}
                  onClick={() => setPill("red")} topLabel="Takımım Var" bottomLabel="Ekibimle geliyorum" />
                <Pill color="blue" selected={pill==="blue"} dimmed={pill==="red"}
                  onClick={() => setPill("blue")} topLabel="Ekip Arıyorum" bottomLabel="Beni takımla" />
              </motion.div>

              {/* CTA */}
              <div style={{ height:72, display:"flex", alignItems:"center", justifyContent:"center", position:"relative" }}>
                {/* Hint — pill seçilmeden */}
                <motion.p
                  animate={{ opacity: pill ? 0 : 0.38, scale: pill ? 0.9 : 1 }}
                  transition={{ duration:0.25 }}
                  style={{
                    position:"absolute",
                    fontSize:11, color:"#64748b",
                    letterSpacing:"0.3em", textTransform:"uppercase", fontWeight:600,
                    margin:0, pointerEvents:"none", userSelect:"none",
                    whiteSpace:"nowrap",
                  }}
                >← seçim yap →</motion.p>

                {/* Devam Et butonu */}
                <motion.button
                  animate={{
                    opacity: pill ? 1 : 0,
                    scale: pill ? 1 : 0.88,
                    y: pill ? 0 : 10,
                    pointerEvents: pill ? "auto" : "none",
                  }}
                  transition={{ duration:0.35, ease:[0.22,1,0.36,1] }}
                  onClick={() => pill && setStep(1)}
                  style={{
                    display:"flex", alignItems:"center", gap:18,
                    padding:"14px 20px 14px 28px",
                    backgroundColor:"#0f172a",
                    color:"white", border:"none", borderRadius:16,
                    fontSize:13, fontWeight:700, letterSpacing:"0.16em",
                    textTransform:"uppercase", cursor:"pointer", fontFamily:"inherit",
                    boxShadow:"0 8px 32px rgba(15,23,42,0.22)",
                    position:"relative",
                  }}
                >
                  <span>Devam Et</span>
                  <div style={{
                    width:36, height:36, borderRadius:10,
                    backgroundColor:"rgba(255,255,255,0.12)",
                    display:"flex", alignItems:"center", justifyContent:"center",
                  }}>
                    <ArrowRight size={16} strokeWidth={2.5} />
                  </div>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ══ FORM STEPS ══ */}
        {step>0 && !done && (
          <motion.div key={`f${step}`}
            initial={{opacity:0,x:24}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-16}}
            transition={{duration:0.38, ease:[0.22,1,0.36,1]}}
            style={{ minHeight:"calc(100dvh - 64px)", display:"flex", flexDirection:"column",
              alignItems:"center", padding:"40px 16px 120px" }}
          >
            {/* Back + progress */}
            <div style={{ width:"100%", maxWidth:680, marginBottom:32, display:"flex", flexDirection:"column", gap:20 }}>
              <button type="button" onClick={() => step===1 ? setStep(0) : setStep(s=>s-1)}
                style={{ display:"flex", alignItems:"center", gap:8, fontSize:11, fontWeight:700,
                  letterSpacing:"0.2em", textTransform:"uppercase", color:"#94a3b8",
                  background:"none", border:"none", cursor:"pointer", fontFamily:"inherit", padding:0 }}>
                <ArrowLeft size={13} strokeWidth={2.5} /> Geri
              </button>
              <ProgressBar step={step} total={4} />
            </div>

            <form onSubmit={async (e) => {
              e.preventDefault()
              if (!validate()) return
              setSending(true)
              setSubmitError(null)
              try {
                const payload = {
                  pill_type: pill,
                  team_name: teamName || null,
                  member_count: members.length,
                  captain_email: captainEmail,
                  captain_phone: captainPhone,
                  members: members.map((m, i) => ({
                    index: i,
                    name: m.name,
                    university: m.uni,
                    department: m.dept,
                    grade: m.grade,
                  })),
                  problem: problem || null,
                  motivation: motivation || null,
                  approach: approach || null,
                  skills: skills.length > 0 ? skills : null,
                  tech_stack: tech || null,
                  can_attend_48h: can48 === "Evet" ? true : can48 === "Hayır" ? false : null,
                  can_attend_physical: canFace === "Evet" ? true : canFace === "Hayır" ? false : null,
                  prev_hackathon_exp: prevExp === "Evet" ? true : prevExp === "Hayır" ? false : null,
                  wants_mentorship: mentor === "Evet" ? true : mentor === "Hayır" ? false : null,
                  note: note || null,
                }
                const { error } = await supabase.from("applications").insert(payload)
                if (error) throw error
                setDone(true)
              } catch (err: unknown) {
                console.error("Supabase error:", JSON.stringify(err))
                let msg = "Bir hata oluştu, lütfen tekrar deneyin."
                if (err && typeof err === "object") {
                  const e = err as Record<string, unknown>
                  if (typeof e.message === "string") msg = e.message
                  else if (typeof e.code === "string") msg = `Hata kodu: ${e.code} — ${e.details ?? e.hint ?? ""}`
                } else if (typeof err === "string") {
                  msg = err
                }
                setSubmitError(msg)
              } finally {
                setSending(false)
              }
            }}
              style={{ width:"100%", maxWidth:680, display:"flex", flexDirection:"column", gap:14 }}>

              {/* ─── STEP 1 ─── */}
              {step===1 && (<>
                <StepTitle badge="Adım 1 / 4" badgeColor="#ef4444"
                  title={pill==="blue" ? "Kişisel Bilgilerin" : "Takım Bilgileri"}
                  sub={pill==="blue" ? "Seni doğru ekiple eşleştirelim." : "Ekibinin temel bilgilerini ve üyelerini gir."} />

                {pill === "red" ? (<>
                  <SCard title="Takım">
                    <FormGroup>
                      <FL>Takım Adı</FL>
                      <FInput required placeholder="Mahşerin Dört Atlısı" value={teamName} onChange={e=>{setTeamName(e.target.value); setValidationErrors(p=>({...p,teamName:""}))}} />
                    {validationErrors.teamName && <span style={{fontSize:11,color:"#dc2626",marginTop:3}}>{validationErrors.teamName}</span>}
                    </FormGroup>
                    <div>
                      <FL>Takım Büyüklüğü</FL>
                      <div style={{display:"flex", alignItems:"center", gap:16}}>
                        <div style={{display:"flex", gap:8, flex:1}}>
                          {[2,3,4].map(n => (
                            <button key={n} type="button" onClick={() => setCount(n)}
                              style={{
                                flex:1, padding:"11px 0", borderRadius:12, fontSize:14, fontWeight:700,
                                border: members.length===n ? "1.5px solid #0f172a" : "1.5px solid #e2e8f0",
                                backgroundColor: members.length===n ? "#0f172a" : "#fafafa",
                                color: members.length===n ? "white" : "#94a3b8",
                                cursor:"pointer", fontFamily:"inherit",
                                boxShadow: members.length===n ? "0 4px 6px rgba(15,23,42,0.18)" : "none",
                                transition:"all 0.15s",
                              }}>{n} Kişi</button>
                          ))}
                        </div>
                        <HandSynergy count={members.length} />
                      </div>
                    </div>
                  </SCard>
                  <SCard title="Takım Üyeleri">
                    <p style={{fontSize:12,color:"#94a3b8",margin:0}}>İlk kişi otomatik olarak takım kaptanıdır.</p>
                    <AnimatePresence>
                      {members.map((m,i) => (
                        <MCard key={i} idx={i} m={m} onChange={(f,v)=>updateM(i,f,v)}
                          canRemove={i>=3} onRemove={()=>setMembers(members.filter((_,j)=>j!==i))}
                          captainEmail={captainEmail} setCaptainEmail={setCaptainEmail}
                          captainPhone={captainPhone} setCaptainPhone={setCaptainPhone}
                          errors={validationErrors} />
                      ))}
                    </AnimatePresence>
                  </SCard>
                </>) : (<>
                  <SCard title="Kişisel Bilgiler">
                    <FormRow>
                      <FormGroup>
                        <FL>Ad Soyad</FL>
                        <FInput required placeholder="Ada Öztürk" value={members[0]?.name||""} onChange={e=>updateM(0,"name",e.target.value)} />
                      </FormGroup>
                      <FormGroup>
                        <FL>Üniversite</FL>
                        <FInput required placeholder="İTÜ" value={members[0]?.uni||""} onChange={e=>updateM(0,"uni",e.target.value)} />
                      </FormGroup>
                    </FormRow>
                    <FormRow>
                      <FormGroup>
                        <FL>Fakülte / Bölüm</FL>
                        <FInput required placeholder="Bilgisayar Müh." value={members[0]?.dept||""} onChange={e=>updateM(0,"dept",e.target.value)} />
                      </FormGroup>
                      <FormGroup>
                        <FL>Sınıf</FL>
                        <FSelect required value={members[0]?.grade||""} onChange={e=>updateM(0,"grade",e.target.value)}>
                          <option value="">Seçiniz</option>
                          {["Hazırlık","1","2","3","4","Lisansüstü"].map(g=>(
                            <option key={g} value={g}>{g==="Hazırlık"||g==="Lisansüstü"?g:`${g}. Sınıf`}</option>
                          ))}
                        </FSelect>
                      </FormGroup>
                    </FormRow>
                    <FormRow>
                      <FormGroup>
                        <FL>E-posta</FL>
                        <FInput required type="email" placeholder="ada@mail.com"
                          value={captainEmail} onChange={e=>setCaptainEmail(e.target.value)} />
                        {validationErrors.captainEmail && <span style={{fontSize:11,color:"#dc2626",marginTop:3}}>{validationErrors.captainEmail}</span>}
                      </FormGroup>
                      <FormGroup>
                        <FL>Telefon</FL>
                        <FInput required type="tel" placeholder="05XX XXX XX XX"
                          value={captainPhone} onChange={e=>setCaptainPhone(e.target.value)} />
                        {validationErrors.captainPhone && <span style={{fontSize:11,color:"#dc2626",marginTop:3}}>{validationErrors.captainPhone}</span>}
                      </FormGroup>
                    </FormRow>
                  </SCard>
                  <SCard title="Hangi Rolde Ekip Arıyorsun?">
                    <p style={{fontSize:12,color:"#94a3b8",margin:0}}>Seni uygun takımla eşleştirmek için hangi alanda katkı sunabileceğini seç.</p>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                      {["Frontend","Backend","Mobil","Yapay Zeka / ML","Veri Analizi","UI / UX Tasarım","Siber Güvenlik","Full Stack"].map(role=>(
                        <CheckOpt key={role} label={role}
                          checked={skills.includes(role)} onChange={()=>toggleSkill(role)} />
                      ))}
                    </div>
                  </SCard>
                </>)}

                <NextBtn onClick={()=>{ if(validateStep1()) setStep(2) }} />
              </>)}

              {/* ─── STEP 2 ─── */}
              {step===2 && (<>
                <StepTitle badge="Adım 2 / 4" badgeColor="#3b82f6" title="Proje Fikri"
                  sub="Bitmiş fikir beklenmez — sadece yönelim yeter." />

                <SCard title="Proje Ön Taslak">
                  <FormGroup>
                    <FL hint="En fazla 500 karakter">Çözmek istediğiniz problem</FL>
                    <FTextarea required rows={3} maxLength={500} value={problem} onChange={e=>{setProblem(e.target.value); setValidationErrors(p=>({...p,problem:""}))}}
                      placeholder="Çözmek istediğiniz problemi kısaca açıklayın." />
                    <div style={{display:"flex",justifyContent:"space-between",marginTop:3}}>
                      {validationErrors.problem ? <span style={{fontSize:11,color:"#dc2626"}}>{validationErrors.problem}</span> : <span/>}
                      <span style={{fontSize:11,color:"#cbd5e1"}}>{problem.length}/500</span>
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <FL>Motivasyonunuz</FL>
                    <FTextarea required rows={3} value={motivation} onChange={e=>{setMotivation(e.target.value); setValidationErrors(p=>({...p,motivation:""}))}}
                      placeholder="Bu probleme neden çözüm üretmek istiyorsunuz?" />
                    {validationErrors.motivation && <span style={{fontSize:11,color:"#dc2626",marginTop:3}}>{validationErrors.motivation}</span>}
                  </FormGroup>
                  <FormGroup>
                    <FL hint="algoritma, sistem, arayüz vb.">Temel yaklaşım</FL>
                    <FTextarea required rows={3} value={approach} onChange={e=>{setApproach(e.target.value); setValidationErrors(p=>({...p,approach:""}))}}
                      placeholder="Çözümün temel yaklaşımını kısaca anlatın." />
                    {validationErrors.approach && <span style={{fontSize:11,color:"#dc2626",marginTop:3}}>{validationErrors.approach}</span>}
                  </FormGroup>
                </SCard>

                <NextBtn onClick={()=>{ if(validateStep2()) setStep(3) }} />
              </>)}

              {/* ─── STEP 3 ─── */}
              {step===3 && (<>
                <StepTitle badge="Adım 3 / 4" badgeColor="#10b981" title="Teknik & Uygunluk"
                  sub="Takımının yetkinlikleri ve katılım durumunuz." />

                <SCard title="Teknik Yeterlilik">
                  <FormGroup>
                    <FL hint="birden fazla seçilebilir">Deneyim alanlarınız</FL>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                      {SKILLS.map(s => (
                        <CheckOpt key={s} label={s} checked={skills.includes(s)} onChange={()=>toggleSkill(s)} />
                      ))}
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <FL hint="dil, framework, araç">Kullanmayı düşündüğünüz teknolojiler</FL>
                    <FTextarea rows={2} value={tech} onChange={e=>setTech(e.target.value)}
                      placeholder="Python, React, TensorFlow, Figma..." />
                  </FormGroup>
                </SCard>

                <SCard title="Hackathon Uygunluğu">
                  <FormGroup>
                    <FL>48 saat boyunca aktif katılım sağlayabilir misiniz?</FL>
                    <YesNo value={can48} onChange={setCan48} />
                  </FormGroup>
                  <FormGroup>
                    <FL>Takımınızın tamamı yüz yüze katılım sağlayabilecek mi?</FL>
                    <YesNo value={canFace} onChange={setCanFace} />
                  </FormGroup>
                </SCard>

                <NextBtn onClick={()=>setStep(4)} />
              </>)}

              {/* ─── STEP 4 ─── */}
              {step===4 && (<>
                <StepTitle badge="Adım 4 / 4" badgeColor="#8b5cf6" title="Onay & Taahhütler"
                  sub="Son adım. Taahhütleri onayla ve gönder." />

                <SCard title="Zorunlu Onaylar">
                  {[
                    {v:ag1,s:setAg1,t:"Yemin ederim."},
                    {v:ag2,s:setAg2,t:"Yemin ederim."},
                    {v:ag3,s:setAg3,t:"Yemin ederim."},
                  ].map((a,i) => (
                    <AgreeBox key={i} checked={a.v} onChange={()=>a.s(!a.v)}>{a.t}</AgreeBox>
                  ))}
                </SCard>

                <SCard title="Opsiyonel">
                  <FormGroup>
                    <FL>Daha önce hackathon / yarışma deneyiminiz var mı?</FL>
                    <YesNo value={prevExp} onChange={setPrevExp} />
                  </FormGroup>
                  <FormGroup>
                    <FL>Mentorluk almak ister misiniz?</FL>
                    <YesNo value={mentor} onChange={setMentor} />
                  </FormGroup>
                  <FormGroup>
                    <FL>Bize iletmek istediğiniz bir not var mı?</FL>
                    <FTextarea rows={3} value={note} onChange={e=>setNote(e.target.value)}
                      placeholder="Etkinlikle ilgili düşünceleriniz..." />
                  </FormGroup>
                </SCard>

                {submitError && (
                  <div style={{padding:"14px 16px", backgroundColor:"#fef2f2", border:"1px solid #fecaca",
                    borderRadius:12, fontSize:13, color:"#dc2626"}}>
                    ⚠️ {submitError}
                  </div>
                )}
                <NextBtn type="submit" label={sending ? "Gönderiliyor..." : "Başvuruyu Gönder"}
                  disabled={!ag1||!ag2||!ag3||sending} />
              </>)}

            </form>
          </motion.div>
        )}

        {/* ══ SUCCESS ══ */}
        {done && (
          <motion.div key="done"
            initial={{opacity:0,scale:0.96}} animate={{opacity:1,scale:1}}
            transition={{duration:0.45, ease:[0.22,1,0.36,1]}}
            style={{ minHeight:"calc(100dvh - 64px)", display:"flex", flexDirection:"column",
              alignItems:"center", justifyContent:"center", textAlign:"center", padding:"0 24px" }}
          >
            <div style={{position:"relative", marginBottom:40}}>
              {[0,1,2].map(i => (
                <motion.div key={i}
                  initial={{scale:0.5,opacity:0.4}} animate={{scale:2.2+i*0.9,opacity:0}}
                  transition={{duration:2.2,delay:i*0.3,repeat:Infinity,ease:"easeOut"}}
                  style={{position:"absolute",inset:0,borderRadius:"50%",backgroundColor:"#bbf7d0"}} />
              ))}
              <div style={{ position:"relative", width:88, height:88, borderRadius:"50%",
                backgroundColor:"#f0fdf4", border:"2px solid #bbf7d0",
                display:"flex", alignItems:"center", justifyContent:"center" }}>
                <Check size={36} color="#22c55e" strokeWidth={2} />
              </div>
            </div>
            <p style={{fontSize:10,fontWeight:700,letterSpacing:"0.44em",textTransform:"uppercase",color:"#22c55e",marginBottom:12}}>
              Başvuru Alındı
            </p>
            <h2 style={{fontSize:34,fontWeight:800,color:"#0f172a",letterSpacing:"-0.03em",marginBottom:12}}>
              Harika bir adım attın.
            </h2>
            <p style={{fontSize:15,color:"#64748b",maxWidth:320,lineHeight:1.7,marginBottom:40}}>
              {teamName ? `"${teamName}" ekibi` : "Başvurunuz"} başarıyla alındı. Ekibimiz en kısa sürede geri dönecek.
            </p>
            <button onClick={() => {setStep(0);setPill(null);setDone(false)}}
              style={{ padding:"12px 32px", borderRadius:99, backgroundColor:"#f1f5f9",
                color:"#475569", border:"none", cursor:"pointer", fontFamily:"inherit",
                fontSize:11, fontWeight:700, letterSpacing:"0.2em", textTransform:"uppercase" }}>
              Ana Sayfaya Dön
            </button>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  )
}