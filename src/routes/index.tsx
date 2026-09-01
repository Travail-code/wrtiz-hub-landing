import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
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
      { title: "Writz Hub — Premium Script Hub Concept" },
      {
        name: "description",
        content:
          "Writz Hub is a dark premium script hub concept: glass interface, executor-style mockups and a fictional loader preview. Visual showcase only.",
      },
      { property: "og:title", content: "Writz Hub — Premium Script Hub Concept" },
      {
        property: "og:description",
        content:
          "A dark premium concept landing page: glass UI, animated stats and a stylised fictional executor window.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap",
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
];

const STATS = [
  { value: 128000, suffix: "+", label: "Community members" },
  { value: 42, suffix: "", label: "Built-in scripts" },
  { value: 99.8, suffix: "%", label: "Concept uptime" },
  { value: 24, suffix: "/7", label: "Discord support" },
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
            Features
          </a>
          <a href="#showcase" className="hidden transition-colors hover:text-foreground sm:block">
            Showcase
          </a>
          <a
            href="#loader"
            className="rounded-full border border-white/15 px-4 py-2 transition-colors hover:border-white/40 hover:text-foreground"
          >
            Preview
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

/* ---------- Fictional loader window (visual mockup only) ---------- */

const CODE_LINES: ReactNode[][] = [
  [
    <span key="c" className="text-white/35 italic">
      -- writz hub · fictional loader preview
    </span>,
  ],
  [
    <span key="c" className="text-white/35 italic">
      -- visual mockup, not a working script
    </span>,
  ],
  [],
  [
    <span key="k" className="text-white/90">
      local
    </span>,
    <span key="v" className="text-white/70">
      {" "}
      Writz{" "}
    </span>,
    <span key="e" className="text-white/40">
      ={" "}
    </span>,
    <span key="f" className="text-white">
      require
    </span>,
    <span key="p" className="text-white/40">
      (
    </span>,
    <span key="s" className="text-white/55">
      "writz.core"
    </span>,
    <span key="p2" className="text-white/40">
      )
    </span>,
  ],
  [],
  [
    <span key="v" className="text-white/70">
      Writz
    </span>,
    <span key="d" className="text-white/40">
      :
    </span>,
    <span key="f" className="text-white">
      init
    </span>,
    <span key="p" className="text-white/40">
      {"({"}
    </span>,
  ],
  [
    <span key="k" className="pl-4 text-white/60">
      theme
    </span>,
    <span key="e" className="text-white/40">
      {" "}
      ={" "}
    </span>,
    <span key="s" className="text-white/55">
      "midnight"
    </span>,
    <span key="c" className="text-white/40">
      ,
    </span>,
  ],
  [
    <span key="k" className="pl-4 text-white/60">
      modules
    </span>,
    <span key="e" className="text-white/40">
      {" "}
      = {"{ "}
    </span>,
    <span key="s" className="text-white/55">
      "visuals"
    </span>,
    <span key="c1" className="text-white/40">
      ,{" "}
    </span>,
    <span key="s2" className="text-white/55">
      "combat"
    </span>,
    <span key="c2" className="text-white/40">
      {" }"},
    </span>,
  ],
  [
    <span key="k" className="pl-4 text-white/60">
      stealth
    </span>,
    <span key="e" className="text-white/40">
      {" "}
      ={" "}
    </span>,
    <span key="b" className="text-white/90">
      true
    </span>,
    <span key="c" className="text-white/40">
      ,
    </span>,
  ],
  [
    <span key="p" className="text-white/40">
      {"})"}
    </span>,
  ],
  [],
  [
    <span key="v" className="text-white/70">
      Writz
    </span>,
    <span key="d" className="text-white/40">
      :
    </span>,
    <span key="f" className="text-white">
      mount
    </span>,
    <span key="p" className="text-white/40">
      (
    </span>,
    <span key="s" className="text-white/55">
      "hub"
    </span>,
    <span key="p2" className="text-white/40">
      )
    </span>,
    <span key="c" className="text-white/35 italic">
      {"  "}-- renders the panel
    </span>,
  ],
];

function LoaderWindow() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(0);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -py * 5, y: px * 6 });
  };

  return (
    <div id="loader" className="mx-auto max-w-2xl [perspective:1200px]">
      <div
        data-cursor="hover"
        onMouseMove={onMove}
        onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        className="wz-tilt wz-glass overflow-hidden rounded-2xl p-2 text-left"
        style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
      >
        <div className="overflow-hidden rounded-xl border border-white/8 bg-[#0c0c0c]">
          <div className="flex items-center gap-2 border-b border-white/8 px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
            <div className="ml-4 flex gap-1.5">
              {["loader.lua", "config.lua"].map((tab, i) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`rounded-md px-2.5 py-1 font-mono text-[11px] transition-colors duration-300 ${
                    active === i
                      ? "bg-white/10 text-foreground"
                      : "text-muted-foreground hover:bg-white/5"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="wz-code overflow-x-auto px-4 py-5 font-mono text-[12.5px] leading-[1.85] sm:text-[13.5px]">
            {CODE_LINES.map((line, i) => (
              <div key={i} className="group/line flex gap-4 rounded px-1 hover:bg-white/[0.03]">
                <span className="w-5 shrink-0 text-right text-white/20 tabular-nums select-none">
                  {i + 1}
                </span>
                <code className="whitespace-pre">
                  {line.length ? line : "\u00A0"}
                  {i === CODE_LINES.length - 1 && <span className="wz-caret ml-1 align-middle" />}
                </code>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/8 px-4 py-2.5 font-mono text-[10.5px] tracking-widest text-muted-foreground uppercase">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-white/60" />
              Concept build · v3.2
            </span>
            <span>Lua · UTF-8 · Ln 13</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="top" className="relative px-5 pt-36 pb-24 sm:pt-48 sm:pb-32">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-1.5 text-[11px] tracking-[0.25em] text-muted-foreground uppercase">
            <Eye className="h-3 w-3" /> v3.2 — Concept preview
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
            A script hub interface built for{" "}
            <Typewriter
              className="font-semibold text-foreground"
              words={["speed.", "stealth.", "every executor.", "power users."]}
            />
          </p>
        </Reveal>

        <Reveal delay={460}>
          <div className="mt-14">
            <LoaderWindow />
          </div>
          <p className="mt-5 text-xs tracking-widest text-muted-foreground/70 uppercase">
            Fictional loader · visual mockup only
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
          text="Everything a hub should be"
          className="max-w-2xl text-3xl font-semibold tracking-tight sm:text-5xl"
        />
        <Reveal delay={200}>
          <p className="mt-5 max-w-xl text-sm text-muted-foreground sm:text-base">
            A lean core, a discreet glass interface and modules imagined to be maintained every
            single day.
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
        {current.toLocaleString("en-US", {
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
          text="An interface that stays out of sight"
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
                  <span className="ml-3 font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
                    writz_hub.panel
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
                    <div className="rounded-xl border border-white/8 bg-black/50 p-4 font-mono text-[11px] leading-relaxed">
                      <div className="text-white/35 italic">-- session log (mockup)</div>
                      <div className="text-white/70">
                        <span className="text-white/90">[core]</span> modules loaded — 42
                      </div>
                      <div className="text-white/70">
                        <span className="text-white/90">[ui]</span> panel mounted
                      </div>
                    </div>
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
        © {new Date().getFullYear()} Writz Hub. Concept project, not affiliated with any game or
        platform.
      </p>
    </footer>
  );
}
