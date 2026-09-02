import { useEffect, useRef, useState } from 'react'
import { Github, MessageCircle, ShieldCheck, Zap, Cpu, Layers, Eye, Wand2, Rocket, Twitter } from 'lucide-react'
import { ParticleGrid } from './components/writz/background'
import { CustomCursor } from './components/writz/cursor'
import { Reveal, WordReveal, Typewriter } from './components/writz/atoms'

const EXECUTORS = [
  "Xeno",
  "Solara", 
  "Delta",
  "Wave",
  "Codex",
  "Fluxus",
  "Arceus X",
  "Cryptic",
  "Volcano",
  "Swift",
]

const FEATURES = [
  {
    icon: Zap,
    title: "Instant execution",
    text: "Sub-300 ms injection concept with no perceivable latency in-session.",
  },
  {
    icon: ShieldCheck,
    title: "Secure by design", 
    text: "A protection layer imagined to stay maintained with every release.",
  },
  {
    icon: Layers,
    title: "Multi-script hub",
    text: "Dozens of modules organised per game and loaded on demand.",
  },
  {
    icon: Cpu,
    title: "Ultra lightweight",
    text: "Under 4 MB in memory, with zero external dependency required.",
  },
  {
    icon: Wand2,
    title: "Custom interface",
    text: "Themes, keyboard shortcuts and layout are fully modular.",
  },
  {
    icon: Rocket,
    title: "Auto updates",
    text: "The hub syncs in the background and always stays current.",
  },
]

const STATS = [
  { value: 128000, suffix: "+", label: "Community members" },
  { value: 42, suffix: "", label: "Built-in scripts" },
  { value: 99.8, suffix: "%", label: "Concept uptime" },
]

function useCountUp(target: number, duration = 2000) {
  const [value, setValue] = useState(0)
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.4 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!inView) return
    const startTime = performance.now()
    const animate = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setValue(Math.floor(target * easeOutQuart))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [inView, target, duration])

  return { ref, value }
}

function FeatureCard({ icon: Icon, title, text }: { icon: any, title: string, text: string }) {
  return (
    <Reveal>
      <div className="glass-border glass rounded-xl p-6 hover:bg-white/10 transition-all group">
        <div className="mb-4">
          <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
            <Icon className="w-5 h-5 text-white" />
          </div>
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        <p className="text-white/60 text-sm">{text}</p>
      </div>
    </Reveal>
  )
}

function StatCard({ value, suffix, label }: { value: number, suffix: string, label: string }) {
  const { ref, value: count } = useCountUp(value)
  
  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl font-bold text-white stat-number">
        {count}{suffix}
      </div>
      <div className="text-white/60 text-sm mt-1">{label}</div>
    </div>
  )
}

function ExecutorWindow() {
  const [selected, setSelected] = useState(EXECUTORS[0])

  return (
    <div className="executor-window rounded-xl overflow-hidden w-full max-w-md">
      <div className="executor-title-bar flex items-center gap-2 px-3 py-2">
        <div className="flex gap-1.5">
          <div className="executor-title-bar-dot bg-red-500" />
          <div className="executor-title-bar-dot bg-yellow-500" />
          <div className="executor-title-bar-dot bg-green-500" />
        </div>
        <div className="executor-title flex-1 text-center text-xs text-white/60">
          Writz Hub - Script Loader
        </div>
      </div>
      <div className="executor-content">
        <div className="executor-line">
          <span className="executor-label">Executor:</span>
          <select 
            className="executor-value bg-transparent border-none outline-none text-white"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            {EXECUTORS.map(name => (
              <option key={name} value={name} className="bg-black text-white">{name}</option>
            ))}
          </select>
        </div>
        <div className="executor-line">
          <span className="executor-label">Status:</span>
          <span className="executor-value text-green-400">Injected</span>
        </div>
        <div className="executor-line">
          <span className="executor-label">Key:</span>
          <span className="executor-value">WRTZ-{Math.random().toString(36).slice(2, 10).toUpperCase()}</span>
        </div>
        <div className="executor-line">
          <span className="executor-label">Version:</span>
          <span className="executor-value">v2.1.0-beta</span>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ParticleGrid />
      <CustomCursor />
      
      <div className="relative z-10">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">W</span>
              </div>
              <span className="text-xl font-bold text-white">Writz Hub</span>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-white/70 hover:text-white transition-colors text-sm">Features</a>
              <a href="#executors" className="text-white/70 hover:text-white transition-colors text-sm">Executors</a>
              <a href="#stats" className="text-white/70 hover:text-white transition-colors text-sm">Stats</a>
            </nav>
            <div className="flex items-center gap-4">
              <a href="https://github.com" target="_blank" className="text-white/70 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" className="text-white/70 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </header>

        {/* Hero */}
        <section className="min-h-screen flex items-center justify-center px-6 pt-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6">
              <span className="inline-block px-4 py-1 bg-white/10 rounded-full text-white/70 text-sm border border-white/20">
                Next Generation Scripting
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              <WordReveal text="Writz Hub" />
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-2xl mx-auto">
              <Typewriter text="A premium script hub experience. Fast, compatible and beautifully crafted." />
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white font-medium hover:from-purple-700 hover:to-blue-700 transition-all pulse-glow">
                Get Started
              </button>
              <button className="px-8 py-3 border border-white/20 rounded-lg text-white font-medium hover:bg-white/10 transition-all">
                Learn More
              </button>
            </div>
            <ExecutorWindow />
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1 bg-white/10 rounded-full text-white/70 text-sm border border-white/20 mb-4">
                Features
              </span>
              <h2 className="text-4xl font-bold text-white mb-4">
                Why Choose <WordReveal text="Writz Hub" />
              </h2>
              <p className="text-white/60 max-w-2xl mx-auto">
                Everything you need for the ultimate scripting experience
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {FEATURES.map((feature, i) => (
                <FeatureCard key={i} {...feature} />
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section id="stats" className="py-20 px-6 border-t border-white/10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1 bg-white/10 rounded-full text-white/70 text-sm border border-white/20 mb-4">
              Statistics
            </span>
            <h2 className="text-4xl font-bold text-white mb-4">
              By The Numbers
            </h2>
            <p className="text-white/60 mb-12 max-w-2xl mx-auto">
              Track our growth and community impact
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {STATS.map((stat, i) => (
                <StatCard key={i} {...stat} />
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 border-t border-white/10">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">W</span>
                </div>
                <span className="text-xl font-bold text-white">Writz Hub</span>
              </div>
              <div className="flex items-center gap-6">
                <a href="#" className="text-white/70 hover:text-white transition-colors text-sm">Docs</a>
                <a href="#" className="text-white/70 hover:text-white transition-colors text-sm">Community</a>
                <a href="#" className="text-white/70 hover:text-white transition-colors text-sm">Support</a>
              </div>
            </div>
            <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-white/60 text-sm">
                © 2024 Writz Hub. All rights reserved.
              </p>
              <div className="flex items-center gap-4">
                <a href="https://github.com" target="_blank" className="text-white/70 hover:text-white transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href="https://twitter.com" target="_blank" className="text-white/70 hover:text-white transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App
