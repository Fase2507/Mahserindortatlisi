"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight } from "lucide-react"

const links = [
  { href: "/hakkinda", label: "Hakkında" },
  { href: "/program", label: "Program" },
  { href: "/juri", label: "Jüri" },
  { href: "/sponsorlar", label: "Sponsorlar" },
  { href: "/sss", label: "SSS" },
]

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -120, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        width: "100%",
        background: scrolled 
          ? "rgba(248, 250, 252, 0.96)" 
          : "rgba(255, 255, 255, 0.92)",
        backdropFilter: "blur(20px)",
        borderBottom: scrolled 
          ? "1px solid rgba(29, 78, 216, 0.15)" 
          : "1px solid transparent",
        boxShadow: scrolled 
          ? "0 10px 30px -10px rgba(15, 23, 42, 0.1)" 
          : "none",
        transition: "all 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", height: 80, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        
        {/* LOGO - Premium + subtle hover glitch */}
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 14, position: "relative" }}>
          <motion.div
            whileHover={{ scale: 1.03 }}
            style={{ display: "flex", alignItems: "center", gap: 12 }}
          >
            <span style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontWeight: 900,
              fontSize: 23,
              letterSpacing: "-0.04em",
              background: "linear-gradient(90deg, #0f172a, #1d4ed8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              HACK<span style={{ color: "#1d4ed8" }}>ATHON</span>
            </span>
            <div style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 11,
              fontWeight: 600,
              color: "#1d4ed8",
              background: "#eff6ff",
              border: "1px solid #bfdbfe",
              borderRadius: 6,
              padding: "4px 9px",
              letterSpacing: "0.08em",
              boxShadow: "0 2px 8px rgba(29,78,216,0.15)",
            }}>
              2026
            </div>
          </motion.div>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-2">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              style={{
                padding: "10px 20px",
                borderRadius: 12,
                fontSize: 14.5,
                fontWeight: 500,
                color: pathname === l.href ? "#1d4ed8" : "#475569",
                textDecoration: "none",
                position: "relative",
                transition: "all 0.3s cubic-bezier(0.23, 1, 0.32, 1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#1d4ed8"
                e.currentTarget.style.transform = "translateY(-1px)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = pathname === l.href ? "#1d4ed8" : "#475569"
                e.currentTarget.style.transform = "translateY(0)"
              }}
            >
              {l.label}
              {pathname === l.href && (
                <motion.div
                  layoutId="activeNav"
                  style={{
                    position: "absolute",
                    bottom: 6,
                    left: 20,
                    right: 20,
                    height: 2,
                    background: "linear-gradient(to right, #1d4ed8, #60a5fa)",
                    borderRadius: 999,
                  }}
                />
              )}
            </Link>
          ))}

          {/* BAŞVUR BUTTON */}
          <Link
            href="/basvuru"
            style={{
              marginLeft: 16,
              padding: "13px 32px",
              borderRadius: 14,
              fontSize: 15,
              fontWeight: 700,
              color: "#ffffff",
              background: "linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)",
              textDecoration: "none",
              boxShadow: "0 8px 32px rgba(29, 78, 216, 0.35)",
              display: "flex",
              alignItems: "center",
              gap: 10,
              transition: "all 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
              position: "relative",
              overflow: "hidden",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px) scale(1.03)"
              e.currentTarget.style.boxShadow = "0 20px 40px rgba(29, 78, 216, 0.45)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)"
              e.currentTarget.style.boxShadow = "0 8px 32px rgba(29, 78, 216, 0.35)"
            }}
          >
            Hemen Başvur
            <ArrowRight size={18} strokeWidth={2.75} />
            <div style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(120deg, transparent, rgba(255,255,255,0.4), transparent)",
              transform: "translateX(-120%)",
              transition: "transform 0.7s",
            }} className="shine" />
          </Link>
        </nav>

        {/* MOBILE HAMBURGER */}
        <button
          onClick={() => setOpen(!open)}
          style={{
            display: "none",
            background: "none",
            border: "none",
            width: 44,
            height: 44,
            alignItems: "center",
            justifyContent: "center",
            color: "#475569",
            zIndex: 110,
          }}
          className="md:hidden"
        >
          <div style={{ position: "relative", width: 24, height: 18 }}>
            <motion.div
              animate={{ rotate: open ? 45 : 0, y: open ? 6 : 0 }}
              style={{ position: "absolute", height: 2, background: "#0f172a", width: "100%", borderRadius: 2 }}
            />
            <motion.div
              animate={{ opacity: open ? 0 : 1 }}
              style={{ position: "absolute", height: 2, background: "#0f172a", width: "100%", top: 8, borderRadius: 2 }}
            />
            <motion.div
              animate={{ rotate: open ? -45 : 0, y: open ? -6 : 0 }}
              style={{ position: "absolute", height: 2, background: "#0f172a", width: "100%", top: 16, borderRadius: 2 }}
            />
          </div>
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              background: "rgba(255,255,255,0.98)",
              backdropFilter: "blur(20px)",
              borderTop: "1px solid #e2e8f0",
              overflow: "hidden",
            }}
            className="md:hidden"
          >
            <div style={{ padding: "20px 32px 40px", display: "flex", flexDirection: "column", gap: 8 }}>
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  style={{
                    padding: "16px 20px",
                    fontSize: 16,
                    fontWeight: 500,
                    color: pathname === l.href ? "#1d4ed8" : "#334155",
                    borderRadius: 12,
                    background: pathname === l.href ? "rgba(29,78,216,0.08)" : "transparent",
                  }}
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href="/basvuru"
                onClick={() => setOpen(false)}
                style={{
                  marginTop: 12,
                  padding: "18px",
                  background: "linear-gradient(135deg, #1d4ed8, #3b82f6)",
                  color: "#fff",
                  borderRadius: 14,
                  fontWeight: 700,
                  fontSize: 16,
                  textAlign: "center",
                  boxShadow: "0 10px 30px rgba(29,78,216,0.3)",
                }}
              >
                Hemen Başvur →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 768px) {
          button.md\\:hidden { display: none; }
          nav { display: flex; }
        }
        @media (max-width: 767px) {
          button.md\\:hidden { display: flex; }
        }
        .shine:hover { transform: translateX(300%) !important; }
      `}</style>
    </motion.header>
  )
}