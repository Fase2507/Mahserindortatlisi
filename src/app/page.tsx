"use client"

import Link from "next/link"
import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { ArrowRight, Calendar, MapPin, Users, Zap } from "lucide-react"

// ─── HOOKS ─────────────────────────────────────────────────────────────────
function useCountdown(target: Date) {
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
  const [t, setT] = useState(calc)
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000)
    return () => clearInterval(id)
  }, [target])
  return t
}

// ─── COMPONENTS ────────────────────────────────────────────────────────────
function FlipNumber({ val, label }: { val: number; label: string }) {
  const formatted = String(val).padStart(2, "0")
  return (
    <div className="flex flex-col items-center">
      <div className="relative overflow-hidden bg-white border border-slate-200 shadow-sm rounded-2xl w-16 h-20 md:w-20 md:h-24 flex items-center justify-center">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={formatted}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="font-mono text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tighter"
          >
            {formatted}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="font-mono text-[10px] md:text-xs font-bold text-slate-400 mt-3 tracking-widest uppercase">
        {label}
      </span>
    </div>
  )
}

function AnimatedStat({ value, label }: { value: string; label: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, type: "spring" }}
      className="flex flex-col items-center justify-center gap-2 p-6"
    >
      <span className="font-mono text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tighter">
        {value}
      </span>
      <span className="text-sm font-semibold text-slate-500 uppercase tracking-wide">{label}</span>
    </motion.div>
  )
}

// ─── PAGE ──────────────────────────────────────────────────────────────────
export default function HomePage() {
  const targetDate = new Date("2026-04-25T09:00:00")
  const cd = useCountdown(targetDate)

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-200 selection:text-blue-900 flex flex-col overflow-x-hidden">
      
      {/* HERO SECTION (CENTER ALIGNED) */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-32 px-6 flex flex-col items-center justify-center text-center overflow-hidden">
        
        {/* AMBIENT BACKGROUND */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:40px_40px] opacity-40 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,black_40%,transparent_100%)]" />
          <div className="absolute top-[20%] w-[600px] h-[600px] bg-blue-400/15 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center">
          
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-3 bg-white border border-slate-200 rounded-full px-5 py-2 mb-8 shadow-sm"
          >
            <span className="relative flex size-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full size-2.5 bg-blue-500"></span>
            </span>
            <span className="font-mono text-xs font-bold text-slate-600 tracking-widest uppercase">
              Ulusal Hackathon 2026
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 tracking-tight leading-[1.05] mb-8"
          >
            Geleceği <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
              48 Saatte
            </span> Kodla.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed mb-12"
          >
            Sürdürülebilir enerji alanında gerçek problemlere teknolojik çözümler üret. Takımını kur, kodla ve büyük ödülleri kazan.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <Link
              href="/basvuru"
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm tracking-wide shadow-xl hover:bg-slate-800 transition-all hover:scale-105 active:scale-95"
            >
              Hemen Başvur
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/hakkinda"
              className="w-full sm:w-auto flex items-center justify-center px-10 py-4 bg-white text-slate-700 rounded-2xl font-bold text-sm tracking-wide border border-slate-200 shadow-sm hover:bg-slate-50 transition-all hover:scale-105 active:scale-95"
            >
              Detayları İncele
            </Link>
          </motion.div>
        </div>

        {/* HORIZONTAL WIDGET (COUNTDOWN) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, type: "spring", bounce: 0.4 }}
          className="relative z-10 mt-20 md:mt-24 w-full max-w-3xl mx-auto"
        >
          <div className="bg-white/60 backdrop-blur-2xl border border-slate-200/80 p-6 md:p-8 rounded-[2rem] shadow-2xl shadow-slate-200/50 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4">
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <div className="flex items-center gap-2 text-blue-600 mb-2">
                <Zap className="size-5" />
                <span className="font-mono text-sm font-bold tracking-widest uppercase">Canlı</span>
              </div>
              <span className="text-slate-500 font-medium">Etkinliğe kalan süre</span>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
              <FlipNumber val={cd.days} label="Gün" />
              <span className="font-mono text-3xl text-slate-300 pb-6">:</span>
              <FlipNumber val={cd.hours} label="Saat" />
              <span className="font-mono text-3xl text-slate-300 pb-6">:</span>
              <FlipNumber val={cd.minutes} label="Dk" />
              <span className="font-mono text-3xl text-slate-300 pb-6">:</span>
              <FlipNumber val={cd.seconds} label="Sn" />
            </div>
          </div>
        </motion.div>
      </section>

      {/* STATS GRID */}
      <section className="bg-white border-y border-slate-200 py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-slate-100">
          <AnimatedStat value="48h" label="Kesintisiz Maraton" />
          <AnimatedStat value="113K₺" label="Proje Bütçesi" />
          <AnimatedStat value="2-4" label="Kişilik Ekipler" />
          <AnimatedStat value="%100" label="Ücretsiz" />
        </div>
      </section>

      {/* BENTO INFO */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Sıradan bir yarışma değil.</h2>
            <p className="mt-4 text-slate-500 font-medium">Ürün geliştirme simülasyonuna hoş geldin.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-1 md:col-span-2 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all">
              <Calendar className="size-8 text-blue-500 mb-6" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">25-26 Nisan 2026</h3>
              <p className="text-slate-500 leading-relaxed font-medium">Etkinlik tam 48 saat sürecek. Gece kodlama seansları, mentor destekleri ve kod dondurma aşamalarıyla gerçek bir maraton.</p>
            </div>
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all">
              <MapPin className="size-8 text-indigo-500 mb-6" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">Lokasyon</h3>
              <p className="text-slate-500 leading-relaxed font-medium">Düzce Üni. Teknopark. Kesintisiz internet ve dinlenme alanları.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}