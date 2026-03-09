"use client"

import Link from "next/link"
import { useEffect, useState, useRef, useCallback } from "react"
import { motion, useInView, useMotionValue, useSpring, AnimatePresence } from "framer-motion"
import { ArrowRight, MapPin, ArrowUpRight, Terminal } from "lucide-react"

// PARTICLES KISMI
function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return
    const ctx = canvas.getContext("2d"); if (!ctx) return
    let w = canvas.offsetWidth, h = canvas.offsetHeight
    canvas.width = w; canvas.height = h
    const pts = Array.from({ length: 50 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 1.6 + 0.4,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      o: Math.random() * 0.35 + 0.07,
    }))
    let raf: number
    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y
        const d = Math.sqrt(dx*dx + dy*dy)
        if (d < 110) {
          ctx.beginPath()
          ctx.strokeStyle = `rgba(29,78,216,${0.055*(1-d/110)})`
          ctx.lineWidth = 0.7
          ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y)
          ctx.stroke()
        }
      }
      pts.forEach(p => {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2)
        ctx.fillStyle = `rgba(29,78,216,${p.o})`; ctx.fill()
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1
      })
      raf = requestAnimationFrame(draw)
    }
    draw()
    const onResize = () => {
      const oldW = w, oldH = h
      w = canvas.offsetWidth; h = canvas.offsetHeight
      canvas.width = w; canvas.height = h
      // partikülleri boyutlara oranla
      pts.forEach(p => {
        p.x = (p.x / oldW) * w
        p.y = (p.y / oldH) * h
      })
    }
    window.addEventListener("resize", onResize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize) }
  }, [])
  return <canvas ref={canvasRef} style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none", zIndex:0 }} />
}

// 3D FLOATING CODE BLOCKS — mouse parallax efektleri
const CODE_TOKENS = [
  { text: "git commit",   x: "2%",   y: "8%",  z: 40,  rotate: -6,  color: "#1d4ed8", side: "left"  },
  { text: "// hack it",   x: "30%",   y: "82%", z: 35,  rotate: -8,  color: "#d97706", side: "left"  },
  { text: "&&",           x: "52%",   y: "65%", z: 30,  rotate: 10,  color: "#059669", side: "left"  },
  { text: "function()",   x: "92%",  y: "52%", z: 80,  rotate: -5,  color: "#7c3aed", side: "right" },
  { text: "{ }",          x: "88%",  y: "24%", z: 70,  rotate: 15,  color: "#7c3aed", side: "right" },
  { text: "push origin",  x: "72%",  y: "88%", z: 35,  rotate: -4,  color: "#0891b2", side: "right" },
  { text: "48:00:00",     x: "52%",  y: "12%", z: 50,  rotate: -3,  color: "#ef4444", side: "right" },
  { text: "return win",   x: "52%",  y: "44%", z: 55,  rotate: 6,   color: "#059669", side: "right" },
]

function FloatingCodeBlocks({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  return (
    <div style={{ position:"absolute", inset:0, pointerEvents:"none", zIndex:1, overflow:"hidden" }}>
      {CODE_TOKENS.map((t, i) => {
        const depth = t.z / 100
        const offsetX = (mouseX - 0.5) * depth * -22
        const offsetY = (mouseY - 0.5) * depth * -14
        const isLeft = t.side === "left"
        return (
          <motion.div
            key={i}
            animate={{ x: offsetX, y: offsetY }}
            transition={{ type:"spring", stiffness: 55, damping: 22, mass: 1 + depth }}
            style={{
              position: "absolute",
              left: t.x, top: t.y,
              fontFamily: "'DM Mono', monospace",
              fontSize: isLeft ? 10 : 11,
              fontWeight: 600,
              color: t.color,
              backgroundColor: t.color + "0b",
              border: `1px solid ${t.color}1a`,
              padding: "4px 9px", borderRadius: 6,
              letterSpacing: "0.04em",
              transform: `rotate(${t.rotate}deg)`,
              opacity: isLeft ? 0.35 : 0.6,
              userSelect: "none",
            }}
          >{t.text}</motion.div>
        )
      })}
    </div>
  )
}

// GLITCH TEXT Bozulan yazı efekti
function GlitchText({ text, className, style }: { text: string; className?: string; style?: React.CSSProperties }) {
  const [glitching, setGlitching] = useState(false)
  const [glitchFrame, setGlitchFrame] = useState(text)

  useEffect(() => {
    const chars = "!<>-_\\/[]{}—=+*^?#@$%"
    let timeout: ReturnType<typeof setTimeout>
    let interval: ReturnType<typeof setInterval>
    const trigger = () => {
      setGlitching(true)
      let iter = 0
      interval = setInterval(() => {
        setGlitchFrame(text.split("").map((c, idx) => {
          if (idx < iter) return text[idx]
          return c === " " ? " " : chars[Math.floor(Math.random() * chars.length)]
        }).join(""))
        iter += 0.4
        if (iter >= text.length) {
          setGlitchFrame(text)
          setGlitching(false)
          clearInterval(interval)
        }
      }, 30)
      timeout = setTimeout(() => { clearInterval(interval); setGlitchFrame(text); setGlitching(false) }, 1400)
    }
    trigger()
    const id = setInterval(trigger, 4200)
    return () => { clearInterval(id); clearInterval(interval); clearTimeout(timeout) }
  }, [text])

  return (
    <span className={className} style={{ ...style, position:"relative" }}>
      {glitchFrame}
      {glitching && (
        <>
          <span aria-hidden style={{
            position:"absolute", top:0, left:0, width:"100%",
            color: "#ef4444", opacity: 0.35,
            clipPath: "polygon(0 30%, 100% 30%, 100% 50%, 0 50%)",
            transform: "translateX(-2px)",
            fontFamily: "inherit", fontSize:"inherit", fontWeight:"inherit",
          }}>{glitchFrame}</span>
          <span aria-hidden style={{
            position:"absolute", top:0, left:0, width:"100%",
            color: "#1d4ed8", opacity: 0.35,
            clipPath: "polygon(0 60%, 100% 60%, 100% 75%, 0 75%)",
            transform: "translateX(2px)",
            fontFamily: "inherit", fontSize:"inherit", fontWeight:"inherit",
          }}>{glitchFrame}</span>
        </>
      )}
    </span>
  )
}

// MAGNETIC BUTTON
function MagneticButton({ children, href, style: extStyle }: { children: React.ReactNode; href: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 18 })
  const sy = useSpring(y, { stiffness: 200, damping: 18 })

  const onMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current; if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    x.set((e.clientX - cx) * 0.38)
    y.set((e.clientY - cy) * 0.38)
  }, [x, y])

  const onLeave = useCallback(() => { x.set(0); y.set(0) }, [x, y])

  return (
    <motion.a
      ref={ref} href={href}
      style={{ ...extStyle, x: sx, y: sy, display:"inline-flex", textDecoration:"none" }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.a>
  )
}

// TERMINAL ANIMATION
const TERMINAL_LINES = [
  { type: "cmd",  text: "npm run hackathon --team=4" },
  { type: "out",  text: "> Loading challenges..." },
  { type: "out",  text: "> 4 categories detected ✓" },
  { type: "cmd",  text: "git init my-winning-project" },
  { type: "out",  text: "Initialized empty Git repository" },
  { type: "cmd",  text: 'git commit -m "48h: lets go"' },
  { type: "out",  text: "[main] 1 file changed, ∞ ideas" },
  { type: "cmd",  text: "npm run submit --prize=113k" },
  { type: "success", text: "!!! Submission accepted. Good luck." },
]

function TerminalBlock() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, margin: "-80px" })
  const [visibleLines, setVisibleLines] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [typing, setTyping] = useState(false)

  // inView değiştiğinde animasyonu sıfırla
  useEffect(() => {
    if (inView) {
      setVisibleLines(0)
      setCurrentText("")
      setTyping(false)
    }
  }, [inView])

  useEffect(() => {
    if (!inView) return
    let lineIdx = 0
    let charIdx = 0
    let timeout: ReturnType<typeof setTimeout>

    const typeNext = () => {
      if (lineIdx >= TERMINAL_LINES.length) return
      const line = TERMINAL_LINES[lineIdx]
      if (line.type === "out" || line.type === "success") {
        setVisibleLines(l => l + 1)
        lineIdx++
        timeout = setTimeout(typeNext, 340)
        return
      }
      setTyping(true)
      setCurrentText("")
      charIdx = 0
      const typeChar = () => {
        charIdx++
        setCurrentText(line.text.slice(0, charIdx))
        if (charIdx < line.text.length) {
          timeout = setTimeout(typeChar, 38)
        } else {
          setTyping(false)
          setVisibleLines(l => l + 1)
          lineIdx++
          timeout = setTimeout(typeNext, 420)
        }
      }
      timeout = setTimeout(typeChar, 280)
    }

    timeout = setTimeout(typeNext, 600)
    return () => clearTimeout(timeout)
  }, [inView])

  return (
    <div ref={ref} style={{
      backgroundColor: "#0f172a",
      borderRadius: 16,
      border: "1px solid #1e293b",
      overflow: "hidden",
      boxShadow: "0 24px 64px rgba(15,23,42,0.25)",
      fontFamily: "'DM Mono', monospace",
    }}>
      {/* Title bar */}
      <div style={{
        padding: "12px 16px",
        backgroundColor: "#1e293b",
        display: "flex", alignItems: "center", gap: 8,
        borderBottom: "1px solid #334155",
      }}>
        <div style={{ display:"flex", gap:6 }}>
          {["#ef4444","#f59e0b","#22c55e"].map((c,i) => (
            <div key={i} style={{ width:10, height:10, borderRadius:"50%", backgroundColor:c, opacity:0.8 }} />
          ))}
        </div>
        <span style={{ fontSize:11, color:"#475569", marginLeft:8, letterSpacing:"0.05em" }}>
          hackathon — bash — 80×24
        </span>
      </div>
      {/* Body */}
      <div style={{ padding:"24px", minHeight:240, display:"flex", flexDirection:"column", gap:6 }}>
        {TERMINAL_LINES.slice(0, visibleLines).map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity:0, x: -6 }}
            animate={{ opacity:1, x: 0 }}
            transition={{ duration:0.2 }}
            style={{ display:"flex", alignItems:"baseline", gap:8 }}
          >
            {line.type === "cmd" && (
              <span style={{ color:"#22c55e", fontSize:12 }}>$</span>
            )}
            {line.type === "out" && (
              <span style={{ color:"#334155", fontSize:12 }}>›</span>
            )}
            {line.type === "success" && (
              <span style={{ fontSize:12 }}>›</span>
            )}
            <span style={{
              fontSize: 12,
              color: line.type === "cmd" ? "#e2e8f0"
                   : line.type === "success" ? "#22c55e"
                   : "#475569",
              letterSpacing: "0.02em",
            }}>{line.text}</span>
          </motion.div>
        ))}
        {/* Currently typing line */}
        {visibleLines < TERMINAL_LINES.length && (
          <div style={{ display:"flex", alignItems:"baseline", gap:8 }}>
            <span style={{ color:"#22c55e", fontSize:12 }}>$</span>
            <span style={{ fontSize:12, color:"#e2e8f0", letterSpacing:"0.02em" }}>
              {currentText}
              <motion.span
                animate={{ opacity:[1,0,1] }}
                transition={{ duration:0.8, repeat:Infinity }}
                style={{ display:"inline-block", width:7, height:13, backgroundColor:"#22c55e", verticalAlign:"middle", marginLeft:2, borderRadius:1 }}
              />
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

// GERİ SAYIM
function useCountdown(target: Date) {
  const calc = () => {
    const diff = target.getTime() - Date.now()
    if (diff <= 0) return { days:0, hours:0, minutes:0, seconds:0 }
    return {
      days:    Math.floor(diff / 86400000),
      hours:   Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    }
  }

  // Avoid hydration mismatch by rendering a deterministic value on the server,
  // then updating on the client once we can read the correct time.
  const [t, setT] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    setT(calc())
    const id = setInterval(() => setT(calc()), 1000)
    return () => clearInterval(id)
  }, [target])

  return t
}

function FlipUnit({ val, label }: { val: number; label: string }) {
  const s = String(val).padStart(2, "0")
  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:8 }}>
      <div style={{
        position:"relative", width:86, height:96,
        backgroundColor:"#ffffff",
        border:"1.5px solid #e2e8f0", borderRadius:14, overflow:"hidden",
        display:"flex", alignItems:"center", justifyContent:"center",
        boxShadow:"0 8px 28px rgba(15,23,42,0.08)",
      }}>
        <div style={{ position:"absolute", top:0, left:0, right:0, height:"50%", background:"linear-gradient(to bottom,rgba(241,245,249,0.5),transparent)", zIndex:2, pointerEvents:"none" }} />
        <div style={{ position:"absolute", top:"50%", left:12, right:12, height:1, backgroundColor:"#e2e8f0", zIndex:3 }} />
        <AnimatePresence mode="popLayout">
          <motion.span key={s}
            initial={{ y:28, opacity:0, scale:0.9 }}
            animate={{ y:0, opacity:1, scale:1 }}
            exit={{ y:-28, opacity:0, scale:0.9 }}
            transition={{ type:"spring", stiffness:380, damping:30 }}
            style={{ fontSize:42, fontWeight:800, color:"#0f172a", letterSpacing:"-0.05em", lineHeight:1, position:"relative", zIndex:1, fontVariantNumeric:"tabular-nums" }}
          >{s}</motion.span>
        </AnimatePresence>
      </div>
      <span style={{ fontSize:9, fontWeight:600, letterSpacing:"0.2em", textTransform:"uppercase", color:"#94a3b8" }}>{label}</span>
    </div>
  )
}

// TILT CARD
function TiltCard({ children, style: extStyle }: { children: React.ReactNode; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0, gx: 50, gy: 50 })
  const [hov, setHov] = useState(false)

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    setTilt({ x: (y - 0.5) * -16, y: (x - 0.5) * 16, gx: x * 100, gy: y * 100 })
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => { setTilt({ x:0, y:0, gx:50, gy:50 }); setHov(false) }}
      style={{
        ...extStyle,
        transform: hov
          ? `perspective(700px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.02)`
          : "perspective(700px) rotateX(0deg) rotateY(0deg) scale(1)",
        transition: hov ? "transform 0.08s" : "transform 0.45s cubic-bezier(0.22,1,0.36,1)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Glare */}
      {hov && (
        <div style={{
          position:"absolute", inset:0, zIndex:10, pointerEvents:"none",
          background: `radial-gradient(circle at ${tilt.gx}% ${tilt.gy}%, rgba(255,255,255,0.12) 0%, transparent 60%)`,
          borderRadius:"inherit",
        }} />
      )}
      {children}
    </div>
  )
}

// ANIMATED NUMBER
function AnimNumber({ to, suffix="" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once:true, margin:"-40px" })
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!inView) return
    let cur = 0; const step = to / 50
    const id = setInterval(() => {
      cur += step
      if (cur >= to) { setVal(to); clearInterval(id) } else setVal(Math.floor(cur))
    }, 18)
    return () => clearInterval(id)
  }, [inView, to])
  return <span ref={ref}>{val}{suffix}</span>
}

// SAYFA
export default function HomePage() {
  const target = new Date("2026-04-25T09:00:00")
  const cd = useCountdown(target)
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 })

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMouse({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    })
  }, [])

  return (
    <div style={{ fontFamily:"'DM Sans','Helvetica Neue',sans-serif", backgroundColor:"#f8fafc", color:"#0f172a", overflowX:"hidden" }}>

      {/* HERO */}
      <section
        data-hero  // mobil medya sorgusu
        onMouseMove={onMouseMove}
        style={{
          minHeight:"calc(100dvh - 64px)",
          position:"relative",
          display:"grid",
          gridTemplateColumns:"1fr 1fr",
          overflow:"hidden",
        }}
      >
        <Particles />
        <FloatingCodeBlocks mouseX={mouse.x} mouseY={mouse.y} />

        {/* SOL */}
        <div style={{
          position:"relative", zIndex:2,
          display:"flex", flexDirection:"column", justifyContent:"center",
          padding:"80px 48px 80px 64px",
          borderRight:"1px solid #e2e8f0",
        }}>
          <motion.div
            initial={{ opacity:0, x:-16 }}
            animate={{ opacity:1, x:0 }}
            transition={{ duration:0.5, delay:0.1 }}
            style={{ display:"inline-flex", alignItems:"center", gap:8, marginBottom:40 }}
          >
            <div style={{ width:28, height:2, backgroundColor:"#1d4ed8" }} />
            <span style={{ fontSize:11, fontWeight:700, letterSpacing:"0.22em", textTransform:"uppercase", color:"#1d4ed8" }}>
              Ulusal Yazılım Hackathonu
            </span>
          </motion.div>

          {/* Glitch headline */}
          <div style={{ overflow:"hidden", marginBottom:4, paddingBottom:6 }}>
            <motion.div
              initial={{ y:"100%" }} animate={{ y:0 }}
              transition={{ duration:0.75, delay:0.18, ease:[0.22,1,0.36,1] }}
            >
              <GlitchText text="Geleceği" style={{
                fontSize:"clamp(54px,6.5vw,90px)", fontWeight:900,
                letterSpacing:"-0.04em", lineHeight:1.05, color:"#0f172a", display:"block",
              }} />
            </motion.div>
          </div>
          <div style={{ overflow:"hidden", marginBottom:4 }}>
            <motion.h1
              initial={{ y:"100%" }} animate={{ y:0 }}
              transition={{ duration:0.75, delay:0.26, ease:[0.22,1,0.36,1] }}
              style={{
                fontSize:"clamp(54px,6.5vw,90px)", fontWeight:900,
                letterSpacing:"-0.04em", lineHeight:1.0, margin:0,
                color:"transparent",
                WebkitTextStroke:"2.5px #1d4ed8",
                fontFamily: "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
              }}
            >
              48 saatte
            </motion.h1>
          </div>
          <div style={{ overflow:"hidden", marginBottom:40 }}>
            <motion.h1
              initial={{ y:"100%" }} animate={{ y:0 }}
              transition={{ duration:0.75, delay:0.34, ease:[0.22,1,0.36,1] }}
              style={{
                fontSize:"clamp(54px,6.5vw,90px)", fontWeight:900,
                letterSpacing:"-0.04em", lineHeight:1.0, margin:0, color:"#0f172a",
              }}
            >kodla.</motion.h1>
          </div>

          <motion.p
            initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:0.55, delay:0.46 }}
            style={{ fontSize:16, color:"#64748b", lineHeight:1.75, maxWidth:380, marginBottom:44 }}
          >
            Gerçek problemlere, gerçek çözümler. Takımını kur,
            kodla, büyük ödülleri kazan. Tamamen ücretsiz.
          </motion.p>

          <motion.div
            initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:0.45, delay:0.56 }}
            style={{ display:"flex", gap:14, alignItems:"center" }}
          >
            <MagneticButton href="/basvuru" style={{
              alignItems:"center", gap:10,
              padding:"14px 28px", borderRadius:12,
              backgroundColor:"#0f172a", color:"white",
              fontSize:14, fontWeight:700,
              boxShadow:"0 4px 20px rgba(15,23,42,0.2)",
            }}>
              Hemen Başvur
              <div style={{
                width:24, height:24, borderRadius:6,
                backgroundColor:"rgba(255,255,255,0.15)",
                display:"flex", alignItems:"center", justifyContent:"center",
              }}>
                <ArrowRight size={12} strokeWidth={2.5} />
              </div>
            </MagneticButton>

            <motion.a href="/hakkinda"
              style={{
                display:"inline-flex", alignItems:"center", gap:6,
                fontSize:14, fontWeight:600, color:"#64748b", textDecoration:"none",
              }}
              whileHover={{ color:"#0f172a", x: 2 }}
              transition={{ duration:0.15 }}
            >
              Detaylar <ArrowUpRight size={14} strokeWidth={2} />
            </motion.a>
          </motion.div>

          {/* Konum yazısı */}
          <motion.div
            className="location-text"
            initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.9 }}
            style={{ position:"absolute", bottom:36, left:64, display:"flex", alignItems:"center", gap:6 }}
          >
            <MapPin size={13} color="#94a3b8" />
            <span style={{ fontSize:12, color:"#94a3b8", fontWeight:500 }}>
              Düzce Üniversitesi Teknopark · 25–26 Nisan 2026
            </span>
          </motion.div>
        </div>

        {/* SAĞ */}
        <div style={{
          position:"relative", zIndex:2,
          display:"flex", flexDirection:"column",
          justifyContent:"center", alignItems:"center",
          padding:"80px 48px",
          backgroundColor:"rgba(255,255,255,0.45)",
        }}>
          {/* Arkaplan 48H - mobilde gizlenecek */}
          <div className="desktop-only-48h" style={{
            position:"absolute", top:"50%", left:"50%",
            transform:"translate(-50%,-50%)",
            fontSize:"clamp(110px,16vw,210px)",
            fontWeight:900, letterSpacing:"-0.06em",
            color:"rgba(226,232,240,0.45)",
            lineHeight:1, userSelect:"none", pointerEvents:"none",
            zIndex:0, whiteSpace:"nowrap",
          }}>48H</div>

          <div style={{ position:"relative", zIndex:1, textAlign:"center" }}>
            <motion.div
              initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }}
              transition={{ delay:0.3 }}
              style={{
                display:"inline-flex", alignItems:"center", gap:8,
                padding:"6px 16px", borderRadius:99,
                backgroundColor:"#eff6ff", border:"1px solid #bfdbfe",
                marginBottom:36,
              }}
            >
              <motion.span
                animate={{ opacity:[1,0.3,1], boxShadow:["0 0 6px rgba(29,78,216,0.6)","0 0 2px rgba(29,78,216,0.2)","0 0 6px rgba(29,78,216,0.6)"] }}
                transition={{ duration:1.8, repeat:Infinity }}
                style={{ width:6, height:6, borderRadius:"50%", backgroundColor:"#1d4ed8", display:"inline-block" }}
              />
              <span style={{ fontSize:11, fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", color:"#1d4ed8" }}>
                Etkinliğe Kalan
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity:0, scale:0.94 }} animate={{ opacity:1, scale:1 }}
              transition={{ duration:0.6, delay:0.42, ease:[0.22,1,0.36,1] }}
              style={{
                display:"grid",
                gridTemplateColumns:"1fr auto 1fr auto 1fr auto 1fr",
                alignItems:"center", gap:"0 6px",
                marginBottom:36,
              }}
            >
              <FlipUnit val={cd.days}    label="Gün" />
              <span style={{ fontSize:32, fontWeight:200, color:"#cbd5e1", paddingBottom:24, lineHeight:1 }}>:</span>
              <FlipUnit val={cd.hours}   label="Saat" />
              <span style={{ fontSize:32, fontWeight:200, color:"#cbd5e1", paddingBottom:24, lineHeight:1 }}>:</span>
              <FlipUnit val={cd.minutes} label="Dakika" />
              <span style={{ fontSize:32, fontWeight:200, color:"#cbd5e1", paddingBottom:24, lineHeight:1 }}>:</span>
              <FlipUnit val={cd.seconds} label="Saniye" />
            </motion.div>

            <motion.div
              initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }}
              transition={{ delay:0.62 }}
              style={{
                display:"flex", gap:0,
                border:"1px solid #e2e8f0", borderRadius:14,
                overflow:"hidden", backgroundColor:"#ffffff",
              }}
            >
              {[{ val:"48s", label:"Süre" },{ val:"2–4", label:"Kişi" },{ val:"%100", label:"Ücretsiz" }].map((item,i) => (
                <div key={i} style={{
                  flex:1, padding:"14px 18px", textAlign:"center",
                  borderRight: i < 2 ? "1px solid #e2e8f0" : "none",
                }}>
                  <div style={{ fontSize:18, fontWeight:800, color:"#0f172a", letterSpacing:"-0.03em" }}>{item.val}</div>
                  <div style={{ fontSize:10, color:"#94a3b8", fontWeight:500, marginTop:2, letterSpacing:"0.08em" }}>{item.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

      </section>

      {/* FEATURES — Tilt Cards */}
      <section style={{
        backgroundColor:"#ffffff",
        borderTop:"1px solid #e2e8f0",
        borderBottom:"1px solid #e2e8f0",
      }}>
        <div style={{ maxWidth:1120, margin:"0 auto", padding:"100px 32px" }}>
          <motion.div
            initial={{ opacity:0, y:14 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }}
            transition={{ duration:0.5 }}
            style={{ display:"flex", alignItems:"baseline", gap:20, marginBottom:16 }}
          >
            <h2 style={{ fontSize:"clamp(28px,4vw,44px)", fontWeight:900, letterSpacing:"-0.03em", color:"#0f172a", margin:0 }}>
              Sadece bir yarışma değil.
            </h2>
            <div style={{ flex:1, height:2, backgroundColor:"#f1f5f9" }} />
          </motion.div>
          <motion.p
            initial={{ opacity:0, y:10 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }}
            transition={{ duration:0.5, delay:0.08 }}
            style={{ fontSize:15, color:"#64748b", marginBottom:52, maxWidth:480 }}
          >
            48 saat boyunca gerçek bir ürün geliştirme süreci yaşayacaksın.
          </motion.p>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:14 }}>
            {[
              { num:"01", title:"48 Saatlik Maraton",   body:"Gece yarısı oturumları, mentor desteği, kod dondurma. Gerçek simülasyon.", accent:"#1d4ed8" },
              { num:"02", title:"2–4 Kişilik Ekipler",  body:"Kendi ekibinle gel ya da sistemimizle yeni biriyle tanış.", accent:"#0891b2" },
              { num:"03", title:"Mentor Desteği",        body:"Sektör deneyimli mentorlar etkinlik boyunca her adımda yanında.", accent:"#7c3aed" },
              { num:"04", title:"113K₺ Proje Bütçesi",  body:"Nakit değil — fikrinizi gerçeğe dönüştürmek için somut başlangıç.", accent:"#059669" },
            ].map((f, i) => (
              <motion.div
                key={f.num}
                initial={{ opacity:0, y:20 }}
                whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }}
                transition={{ duration:0.55, delay:i*0.08, ease:[0.22,1,0.36,1] }}
              >
                <TiltCard style={{
                  padding:"28px", borderRadius:16,
                  border:`1.5px solid #e2e8f0`,
                  backgroundColor:"#ffffff",
                  display:"flex", flexDirection:"column", gap:14,
                  cursor:"default",
                  boxShadow:"0 1px 4px rgba(15,23,42,0.04)",
                }}>
                  <div style={{
                    width:36, height:36, borderRadius:10,
                    backgroundColor:f.accent+"12",
                    display:"flex", alignItems:"center", justifyContent:"center",
                  }}>
                    <span style={{ fontSize:13, fontWeight:800, color:f.accent }}>{f.num}</span>
                  </div>
                  <h3 style={{ fontSize:16, fontWeight:800, color:"#0f172a", letterSpacing:"-0.02em", margin:0 }}>{f.title}</h3>
                  <p style={{ fontSize:14, color:"#64748b", lineHeight:1.7, margin:0 }}>{f.body}</p>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TERMINAL + STATS */}
      <section style={{ padding:"100px 32px", maxWidth:1120, margin:"0 auto" }}>
        <div style={{
          display:"grid", gridTemplateColumns:"1fr 1fr",
          gap:48, alignItems:"center",
        }}>
          {/* Sol: Terminal */}
          <motion.div
            initial={{ opacity:0, x:-24 }}
            whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true, margin:"-60px" }}
            transition={{ duration:0.65, ease:[0.22,1,0.36,1] }}
          >
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:20 }}>
              <Terminal size={15} color="#1d4ed8" />
              <span style={{ fontSize:11, fontWeight:700, letterSpacing:"0.22em", textTransform:"uppercase", color:"#1d4ed8" }}>
                Dev ortamı hazır
              </span>
            </div>
            <h2 style={{ fontSize:"clamp(22px,3vw,34px)", fontWeight:900, letterSpacing:"-0.03em", color:"#0f172a", margin:"0 0 12px" }}>
              Kodu açtığın andan
              <br />itibaren yarış başlar.
            </h2>
            <p style={{ fontSize:14, color:"#64748b", lineHeight:1.75, margin:"0 0 32px", maxWidth:360 }}>
              Hackathon sabahı laptop'ını açıyorsun, repo hazır, challenge açıklandı.
              48 saatin var.
            </p>
            <TerminalBlock />
          </motion.div>

          {/* Sağ: Stats */}
          <motion.div
            initial={{ opacity:0, x:24 }}
            whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true, margin:"-60px" }}
            transition={{ duration:0.65, ease:[0.22,1,0.36,1] }}
            style={{ display:"flex", flexDirection:"column", gap:16 }}
          >
            {[
              { num:48,  suffix:"s",  label:"Kesintisiz Maraton",  sub:"Cuma akşamı başlar, Pazar sabahı biter.", color:"#1d4ed8" },
              { num:113, suffix:"K₺", label:"Proje Bütçesi",       sub:"Kazananlar gerçek kaynak alır.", color:"#059669" },
              { num:100, suffix:"%",  label:"Ücretsiz Katılım",    sub:"Yemek, konaklama, internet dahil.", color:"#7c3aed" },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity:0, y:16 }}
                whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }}
                transition={{ duration:0.5, delay:i*0.1, ease:[0.22,1,0.36,1] }}
                style={{
                  padding:"24px 28px", borderRadius:16,
                  border:"1px solid #e2e8f0",
                  backgroundColor:"#ffffff",
                  display:"flex", alignItems:"center", gap:20,
                  boxShadow:"0 1px 4px rgba(15,23,42,0.04)",
                }}
              >
                <div style={{ flexShrink:0 }}>
                  <div style={{
                    width:48, height:48, borderRadius:12,
                    backgroundColor:s.color+"10",
                    display:"flex", alignItems:"center", justifyContent:"center",
                  }}>
                    <span style={{ fontSize:18, fontWeight:900, color:s.color, letterSpacing:"-0.03em" }}>
                      <AnimNumber to={s.num} suffix={s.suffix} />
                    </span>
                  </div>
                </div>
                <div>
                  <div style={{ fontSize:15, fontWeight:800, color:"#0f172a", letterSpacing:"-0.01em" }}>{s.label}</div>
                  <div style={{ fontSize:12, color:"#94a3b8", marginTop:2 }}>{s.sub}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding:"0 32px 100px", maxWidth:1120, margin:"0 auto" }}>
        <motion.div
          initial={{ opacity:0, y:24 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, margin:"-60px" }}
          transition={{ duration:0.65, ease:[0.22,1,0.36,1] }}
          style={{
            borderRadius:24, backgroundColor:"#0f172a",
            padding:"clamp(40px,5vw,64px) clamp(32px,5vw,64px)",
            display:"flex", justifyContent:"space-between", alignItems:"center",
            gap:32, flexWrap:"wrap", position:"relative", overflow:"hidden",
          }}
        >
          <div style={{ position:"absolute", right:-60, top:-60, width:380, height:380, borderRadius:"50%", background:"radial-gradient(circle,rgba(29,78,216,0.22) 0%,transparent 60%)", pointerEvents:"none" }} />
          <div style={{ position:"absolute", right:140, bottom:-50, width:180, height:180, borderRadius:"50%", background:"radial-gradient(circle,rgba(99,102,241,0.15) 0%,transparent 60%)", pointerEvents:"none" }} />

          <div style={{ position:"relative" }}>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:"0.2em", textTransform:"uppercase", color:"#60a5fa", marginBottom:14 }}>
              Son Başvuru · 20 Nisan 2026
            </div>
            <h2 style={{ fontSize:"clamp(24px,3.5vw,40px)", fontWeight:900, letterSpacing:"-0.03em", color:"#f8fafc", margin:"0 0 12px", lineHeight:1.1 }}>
              Takımını kur,<br />tarihe geç.
            </h2>
            <div style={{ display:"flex", alignItems:"center", gap:6 }}>
              <MapPin size={13} color="#475569" />
              <span style={{ fontSize:13, color:"#475569" }}>Düzce Üniversitesi Teknopark · 25–26 Nisan 2026</span>
            </div>
          </div>

          <div style={{ display:"flex", flexDirection:"column", gap:10, flexShrink:0, position:"relative" }}>
            <MagneticButton href="/basvuru" style={{
              alignItems:"center", justifyContent:"center", gap:10,
              padding:"15px 32px", borderRadius:12,
              backgroundColor:"#1d4ed8", color:"white",
              fontSize:15, fontWeight:700,
              boxShadow:"0 0 40px rgba(29,78,216,0.4)",
              whiteSpace:"nowrap",
            }}>
              Hemen Başvur <ArrowRight size={15} strokeWidth={2.5} />
            </MagneticButton>
            <Link href="/program" style={{
              display:"flex", alignItems:"center", justifyContent:"center",
              padding:"13px 32px", borderRadius:12,
              border:"1px solid rgba(255,255,255,0.1)",
              backgroundColor:"rgba(255,255,255,0.04)",
              color:"rgba(248,250,252,0.5)",
              textDecoration:"none", fontSize:13, fontWeight:600, whiteSpace:"nowrap",
            }}>
              Programı İncele
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Global Stiller */}
      <style>{`
        * { box-sizing:border-box; }
        ::selection { background:#bfdbfe; color:#1e3a8a; }

        @media (max-width:768px) {
          section[data-hero] {
            grid-template-columns:1fr !important;
          }
          /* konum yazısı mobilde sola yaslan */
          .location-text {
            left: 16px !important;
            bottom: 16px !important;
          }
          /* arkaplandaki 48H yazısını gizle */
          .desktop-only-48h {
            display: none !important;
          }
        }
      `}</style>
    </div>
  )
}