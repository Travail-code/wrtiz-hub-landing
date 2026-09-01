import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Download,
  Github,
  MessageCircle,
  ShieldCheck,
  Zap,
  Cpu,
  Layers,
  Eye,
  Wand2,
  Rocket,
  Twitter,
} from "lucide-react";

import { ParticleGrid } from "@/components/writz/background";
import { CustomCursor } from "@/components/writz/cursor";
import { Reveal, WordReveal, Typewriter } from "@/components/writz/atoms";
import { useCountUp } from "@/hooks/use-reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Writz Hub — Script premium pour executors Roblox" },
      {
        name: "description",
        content:
          "Writz Hub : script dark premium, ultra rapide et compatible Xeno, Solara, Delta et plus. Interface glass, mises à jour continues, téléchargement instantané.",
      },
      { property: "og:title", content: "Writz Hub — Script premium pour executors" },
      {
        property: "og:description",
        content:
          "Interface glass, performances natives et compatibilité multi-executors. Téléchargez Writz Hub gratuitement.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  component: WritzHub,
});

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
];

const FEATURES = [
  {
    icon: Zap,
    title: "Exécution instantanée",
    text: "Injection en moins de 300 ms, aucune latence perceptible en jeu.",
  },
  {
    icon: ShieldCheck,
    title: "Bypass sécurisé",
    text: "Protection anti-détection maintenue à chaque mise à jour serveur.",
  },
  {
    icon: Layers,
    title: "Hub multi-scripts",
    text: "Des dizaines de modules organisés par jeu, chargés à la demande.",
  },
  {
    icon: Cpu,
    title: "Ultra léger",
    text: "Moins de 4 Mo en mémoire, zéro dépendance externe requise.",
  },
  {
    icon: Wand2,
    title: "UI personnalisable",
    text: "Thèmes, raccourcis clavier et disposition entièrement modulables.",
  },
  {
    icon: Rocket,
    title: "Mises à jour auto",
    text: "Le hub se synchronise en arrière-plan, toujours à jour.",
  },
];

const STATS = [
  { value: 128000, suffix: "+", label: "Téléchargements" },
  { value: 42, suffix: "", label: "Scripts intégrés" },
  { value: 99.8, suffix: "%", label: "Uptime des serveurs" },
  { value: 24, suffix: "/7", label: "Support Discord" },
];

function WritzHub() {
  return (
    <div className="relative min-h-screen overflow-x-hidden text-foreground">
      <ParticleGrid />
      <CustomCursor />
      <Nav />
      <main>
        <Hero />
        <ExecutorMarquee />
        <Features />
        <Stats />
        <Showcase />
      </main>
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-5 sm:flex sm:justify-between">
        <a href="#top" className="flex min-w-0 items-center gap-2.5">
          <Logo />
          <span className="truncate text-sm font-semibold tracking-[0.22em] uppercase">
            Writz Hub
          </span>
        </a>
        <nav className="flex shrink-0 items-center gap-6 text-xs tracking-widest text-muted-foreground uppercase">
          <a href="#features" className="hidden transition-colors hover:text-foreground sm:block">
            Fonctions
          </a>
          <a href="#showcase" className="hidden transition-colors hover:text-foreground sm:block">
            Aperçu
          </a>
          <a
            href="#download"
            className="rounded-full border border-white/15 px-4 py-2 transition-colors hover:border-white/40 hover:text-foreground"
          >
            Télécharger
          </a>
        </nav>
      </div>
    </header>
  );
}

function Logo() {
  return (
    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-white/15 bg-white/5 text-[13px] font-bold">
      W
    </span>
  );
}

function CtaButton({ label = "Télécharger" }: { label?: string }) {
  const ref = useRef<HTMLAnchorElement | null>(null);

  const ripple = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const span = document.createElement("span");
    const size = Math.max(rect.width, rect.height) * 2.2;
    span.className = "wz-ripple";
    span.style.width = `${size}px`;
    span.style.height = `${size}px`;
    span.style.left = `${e.clientX - rect.left}px`;
    span.style.top = `${e.clientY - rect.top}px`;
    el.appendChild(span);
    setTimeout(() => span.remove(), 700);
  };

  return (
    <a
      ref={ref}
      id="download"
      href="#download"
      onClick={ripple}
      className="wz-cta inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-sm font-semibold tracking-wide text-foreground"
    >
      <Download className="h-4 w-4" />
      {label}
    </a>
  );
}

function Hero() {
  return (
    <section id="top" className="relative px-5 pt-40 pb-24 sm:pt-52 sm:pb-32">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-1.5 text-[11px] tracking-[0.25em] text-muted-foreground uppercase">
            <Eye className="h-3 w-3" /> v3.2 — Undetected
          </span>
        </Reveal>

        <WordReveal
          as="h1"
          text="Writz Hub"
          delay={120}
          step={0}
          className="mt-8 text-6xl font-bold tracking-tight sm:text-8xl"
        />

        <Reveal delay={320}>
          <p className="mt-6 text-base text-muted-foreground sm:text-lg">
            Le hub de scripts pensé pour{" "}
            <Typewriter
              className="font-semibold text-foreground"
              words={["la vitesse.", "la discrétion.", "tous les executors.", "les pros."]}
            />
          </p>
        </Reveal>

        <Reveal delay={460}>
          <div className="mt-12 flex justify-center">
            <CtaButton />
          </div>
          <p className="mt-5 text-xs tracking-widest text-muted-foreground/70 uppercase">
            Gratuit · Sans clé · 4 Mo
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function ExecutorMarquee() {
  const items = [...EXECUTORS, ...EXECUTORS];
  return (
    <section className="border-y border-white/8 bg-white/[0.02] py-6">
      <div className="wz-marquee wz-fade-x overflow-hidden">
        <div className="wz-marquee-track">
          {items.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="flex items-center gap-3 px-8 text-sm tracking-[0.2em] whitespace-nowrap text-muted-foreground uppercase"
            >
              <span className="h-1 w-1 rounded-full bg-white/40" />
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section id="features" className="px-5 py-28 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <WordReveal
          text="Tout ce qu'un hub devrait être"
          className="max-w-2xl text-3xl font-semibold tracking-tight sm:text-5xl"
        />
        <Reveal delay={200}>
          <p className="mt-5 max-w-xl text-sm text-muted-foreground sm:text-base">
            Une base native optimisée, une interface glass discrète et des modules maintenus
            quotidiennement.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 90}>
              <article className="wz-glass group h-full rounded-2xl p-7">
                <f.icon className="h-5 w-5 text-muted-foreground transition-all duration-500 group-hover:scale-110 group-hover:text-foreground" />
                <h3 className="mt-6 text-lg font-semibold">{f.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{f.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatItem({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { ref, value: current } = useCountUp(value);
  const decimals = value % 1 !== 0 ? 1 : 0;
  return (
    <div ref={ref} className="wz-glass rounded-2xl px-6 py-10 text-center">
      <div className="text-4xl font-bold tracking-tight tabular-nums sm:text-5xl">
        {current.toLocaleString("fr-FR", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })}
        {suffix}
      </div>
      <div className="mt-3 text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
        {label}
      </div>
    </div>
  );
}

function Stats() {
  return (
    <section className="px-5 pb-28 sm:pb-36">
      <div className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((s) => (
          <StatItem key={s.label} {...s} />
        ))}
      </div>
    </section>
  );
}

function Showcase() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [offset, setOffset] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onScroll = () => {
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      setOffset((progress - 0.5) * 60);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -py * 10, y: px * 12 });
  };

  return (
    <section id="showcase" className="px-5 pb-28 sm:pb-36">
      <div ref={wrapRef} className="mx-auto max-w-5xl text-center">
        <WordReveal
          text="Une interface qui reste hors de vue"
          className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight sm:text-5xl"
        />

        <Reveal delay={200}>
          <div
            className="mt-16 [perspective:1200px]"
            style={{ transform: `translateY(${offset}px)` }}
          >
            <div
              data-cursor="hover"
              onMouseMove={onMove}
              onMouseLeave={() => setTilt({ x: 0, y: 0 })}
              className="wz-tilt wz-glass mx-auto overflow-hidden rounded-3xl p-3 text-left"
              style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
            >
              <div className="rounded-2xl border border-white/8 bg-[#0d0d0d]">
                <div className="flex items-center gap-2 border-b border-white/8 px-4 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                  <span className="ml-3 text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
                    writz_hub.lua
                  </span>
                </div>
                <div className="grid gap-4 p-5 sm:grid-cols-[180px_minmax(0,1fr)]">
                  <aside className="space-y-1.5">
                    {["Auto Farm", "Combat", "ESP / Visuals", "Teleport", "Misc", "Settings"].map(
                      (item, i) => (
                        <div
                          key={item}
                          className={`rounded-lg px-3 py-2 text-xs transition-colors ${
                            i === 0
                              ? "bg-white/10 text-foreground"
                              : "text-muted-foreground hover:bg-white/5"
                          }`}
                        >
                          {item}
                        </div>
                      ),
                    )}
                  </aside>
                  <div className="space-y-3">
                    {[
                      ["Auto Collect", "ON"],
                      ["Kill Aura", "ON"],
                      ["Player ESP", "OFF"],
                      ["Server Hop", "AUTO"],
                    ].map(([k, v]) => (
                      <div
                        key={k}
                        className="flex items-center justify-between rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3"
                      >
                        <span className="text-xs text-muted-foreground">{k}</span>
                        <span className="rounded-full border border-white/15 px-2.5 py-0.5 text-[10px] tracking-widest">
                          {v}
                        </span>
                      </div>
                    ))}
                    <pre className="overflow-x-auto rounded-xl border border-white/8 bg-black/50 p-4 font-mono text-[11px] leading-relaxed text-muted-foreground">
                      {`loadstring(game:HttpGet(
  "https://writzhub.gg/loader.lua"
))()`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/8 px-5 py-14">
      <div className="mx-auto grid max-w-6xl gap-8 sm:flex sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-2.5">
          <Logo />
          <span className="truncate text-sm font-semibold tracking-[0.22em] uppercase">
            Writz Hub
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {[
            { icon: MessageCircle, label: "Discord", href: "#" },
            { icon: Github, label: "GitHub", href: "#" },
            { icon: Twitter, label: "X", href: "#" },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="inline-flex items-center gap-2 rounded-full border border-white/12 px-4 py-2 text-xs tracking-widest text-muted-foreground uppercase transition-all duration-500 hover:border-white/35 hover:text-foreground"
            >
              <l.icon className="h-3.5 w-3.5" />
              {l.label}
            </a>
          ))}
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-6xl text-[11px] text-muted-foreground/60">
        © {new Date().getFullYear()} Writz Hub. Projet non affilié à Roblox Corporation.
      </p>
    </footer>
  );
}
