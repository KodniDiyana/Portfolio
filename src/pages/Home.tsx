import { motion, useInView } from 'framer-motion';
import {
  ArrowRight,
  Download,
  Sparkles,
  Code2,
  Server,
  Database as DbIcon,
  PenTool,
  Layout,
  GitBranch,
  Github,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { useEffect, useRef, useState } from 'react';

/*──────────────── Cursor Sparkles (canvas particle trail) ────────────────*/
const CursorSparkles = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    let raf = 0;
    let running = true;

    const setSize = () => {
      const dpr = Math.max(1, window.devicePixelRatio || 1);
      const { innerWidth: w, innerHeight: h } = window;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    setSize();
    window.addEventListener('resize', setSize);

    type P = {
      x: number; y: number; vx: number; vy: number;
      life: number; alpha: number; size: number; hue: number;
    };
    const particles: P[] = [];

    const spawn = (x: number, y: number, n = 10) => {
      for (let i = 0; i < n; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.6 + Math.random() * 1.2;
        particles.push({
          x, y,
          vx: Math.cos(angle) * speed * 0.8,
          vy: Math.sin(angle) * speed * 0.8 - 0.6,
          life: 900 + Math.random() * 500,
          alpha: 1,
          size: 1.5 + Math.random() * 2.5,
          hue: 205 + Math.random() * 40, // blue → cyan
        });
      }
    };

    const onMove = (e: MouseEvent) => {
      spawn(e.clientX, e.clientY, 10);
    };
    window.addEventListener('mousemove', onMove);

    let prev = performance.now();
    const loop = (t: number) => {
      if (!running) return;
      const dt = t - prev;
      prev = t;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life -= dt;
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.01;            // gentle gravity
        p.alpha = Math.max(0, p.life / 1000);

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.shadowColor = `hsla(${p.hue},100%,60%,${0.8 * p.alpha})`;
        ctx.shadowBlur = 12;

        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
        grd.addColorStop(0, `hsla(${p.hue},100%,70%,1)`);
        grd.addColorStop(1, `hsla(${p.hue},100%,50%,0)`);
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', setSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-30 pointer-events-none"
      aria-hidden="true"
    />
  );
};

/*──────────────── Brand Icons (tiny inline SVGs) ────────────────*/
const BrandIcon = ({ name, className = 'h-4 w-4' }: { name: string; className?: string }) => {
  switch (name) {
    // ==== Frontend ====
    case 'react':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-label="React">
          <g fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="2.2" />
            <ellipse cx="12" cy="12" rx="10" ry="4.6" transform="rotate(60 12 12)" />
            <ellipse cx="12" cy="12" rx="10" ry="4.6" transform="rotate(-60 12 12)" />
            <ellipse cx="12" cy="12" rx="10" ry="4.6" />
          </g>
        </svg>
      );
    case 'ts':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-label="TypeScript">
          <rect x="2" y="3" width="20" height="18" rx="2" className="fill-current opacity-15" />
          <path d="M6 9h5M8.5 9v7M14 9h6m-3 0v7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case 'tailwind':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-label="Tailwind">
          <path
            d="M12 6c-3 0-4 2-5 3 1-1 2-1 3 0 1 1 2 1 3 1 3 0 4-2 5-3-1 1-2 1-3 0-1-1-2-1-3-1Zm-5 9c1-1 2-1 3 0 1 1 2 1 3 1 3 0 4-2 5-3-1 1-2 1-3 0-1-1-2-1-3-1-3 0-4 2-5 3Z"
            fill="currentColor"
          />
        </svg>
      );
    case 'next':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-label="Next.js">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" fill="none" />
          <path d="M7 9h5m-5 3h3m4-1 4 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );

    // ==== Backend ====
    case 'node':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-label="Node.js">
          <path d="M12 2 3 7v10l9 5 9-5V7l-9-5Z" fill="currentColor" className="opacity-15" />
          <path d="M12 3.6 4.8 7.6v8.8L12 20.4l7.2-4V7.6L12 3.6Z" stroke="currentColor" strokeWidth="1.4" fill="none" />
          <path d="M8 12c0 1.7 1.3 3 3 3h2v-2h-2a1 1 0 1 1 0-2h3V9h-3c-1.7 0-3 1.3-3 3Z" fill="currentColor" />
        </svg>
      );
    case 'spring':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-label="Spring Boot">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" fill="none" />
          <path d="M7 15c2 2 8 2 10-3 0 0-2 1-4 0-2-.9-3.5-3-6-2 0 2 .5 3.3 0 5Z" fill="currentColor" />
          <circle cx="12" cy="12" r="1.2" fill="currentColor" />
        </svg>
      );
    case 'express':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-label="Express.js">
          <path d="M5 9v6m0 0 3-4m-3 4-3-4M13 9l3 6m0 0 3-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case 'rest':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-label="REST APIs">
          <rect x="3" y="6" width="7" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" fill="none" />
          <rect x="14" y="6" width="7" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" fill="none" />
          <path d="M10 12h4" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );

    // ==== Databases ====
    case 'mongodb':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-label="MongoDB">
          <path d="M12 3s-1 2-1 5 1.2 7.5 1 9.5c-.2 2-1 3-1 3s3-1 3-6.5S12 3 12 3Z" fill="currentColor" />
          <path d="M12 2v6" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      );
    case 'postgres':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-label="PostgreSQL">
          <rect x="4" y="5" width="16" height="10" rx="3" stroke="currentColor" strokeWidth="1.6" fill="none" />
          <path d="M8 15v1.5A2.5 2.5 0 0 0 10.5 19H13.5A2.5 2.5 0 0 0 16 16.5V15" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
    case 'mysql':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-label="MySQL">
          <ellipse cx="12" cy="7" rx="7" ry="3.5" stroke="currentColor" strokeWidth="1.6" fill="none" />
          <path d="M5 7v6c0 1.9 3.1 3.5 7 3.5s7-1.6 7-3.5V7" stroke="currentColor" strokeWidth="1.6" fill="none" />
        </svg>
      );
    case 'redis':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-label="Redis">
          <path d="M4 9 12 6l8 3-8 3-8-3Z" className="fill-current opacity-20" />
          <path d="M4 12l8 3 8-3M4 9l8 3 8-3" stroke="currentColor" strokeWidth="1.4" fill="none" />
        </svg>
      );

    // ==== Tools ====
    case 'git':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-label="Git & GitHub">
          <path d="M4 12 12 4l8 8-8 8-8-8Z" stroke="currentColor" strokeWidth="1.6" fill="none" />
          <circle cx="12" cy="8.5" r="1.3" fill="currentColor" />
          <circle cx="12" cy="12" r="1.3" fill="currentColor" />
          <circle cx="12" cy="15.5" r="1.3" fill="currentColor" />
          <path d="M12 8.5v7" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      );
    case 'docker':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-label="Docker">
          <rect x="3" y="11" width="4" height="3" rx="0.5" className="fill-current opacity-20" />
          <rect x="7.5" y="8" width="4" height="3" rx="0.5" className="fill-current opacity-20" />
          <rect x="12" y="11" width="4" height="3" rx="0.5" className="fill-current opacity-20" />
          <rect x="7.5" y="11" width="4" height="3" rx="0.5" className="fill-current opacity-20" />
          <path d="M2.5 15.5c1 2.5 3.5 4 7.5 4h3.5c6 0 6.5-3 7-4.5-1 .5-2 .2-3-.7-1 1.2-2.4 1.2-3.5.7H8" stroke="currentColor" strokeWidth="1.4" fill="none" />
        </svg>
      );
    case 'vscode':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-label="VS Code">
          <path d="M15 4 6 12l9 8 3-1V5l-3-1Z" stroke="currentColor" strokeWidth="1.6" fill="none" />
          <path d="m6 12 6 5V7l-6 5Z" className="fill-current opacity-20" />
        </svg>
      );
    case 'postman':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-label="Postman">
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6" fill="none" />
          <path d="M8.5 12h7M12 8.5v7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );

    default:
      return <span className={className} />;
  }
};

/*──────────── Count-up hook ───────────*/
const useCountUp = (target: number, active: boolean, duration = 900) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf = 0;
    let start: number | null = null;
    const step = (t: number) => {
      if (start === null) start = t;
      const p = Math.min((t - start) / duration, 1);
      setValue(Math.round(target * (p < 0.7 ? p / 0.7 : 1 - (1 - p) * 0.3)));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, active, duration]);
  return value;
};

/*──────────── Animated “hook” bar (overshoot → settle) ───────────*/
const AnimatedBar = ({ percent, active }: { percent: number; active: boolean }) => (
  <motion.div
    className="h-full rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-500 group-hover:shadow-[0_0_18px_rgba(34,211,238,0.45)]"
    initial={{ width: '0%' }}
    animate={active ? { width: [`0%`, `${percent + 8}%`, `${percent}%`] } : { width: '0%' }}
    transition={{ duration: 1.2, times: [0, 0.7, 1], ease: ['easeOut', 'easeInOut'] }}
  />
);

/*──────────── One skill row (with hover glow + count-up) ───────────*/
const SkillRow = ({
  label,
  percent,
  icon,
}: {
  label: string;
  percent: number;
  icon: React.ReactNode;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const value = useCountUp(percent, inView);

  return (
    <motion.div
      ref={ref}
      className="group relative space-y-2 rounded-lg p-2 -m-2"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.4 }}
    >
      <div className="pointer-events-none absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-white/0 via-white/5 to-white/0" />
      <div className="flex items-center justify-between text-sm relative">
        <div className="flex items-center gap-2 text-muted-foreground">
          <span className="text-primary">{icon}</span>
          <span className="font-medium text-foreground">{label}</span>
        </div>
        <span className="tabular-nums text-foreground/80">{value}%</span>
      </div>
      <div className="h-2 rounded-full bg-white/10 overflow-hidden relative">
        <AnimatedBar percent={percent} active={inView} />
      </div>
    </motion.div>
  );
};

export function Home() {
  // ===== Helpers for tilt + shine =====
  const applyTilt = (e: React.MouseEvent<HTMLDivElement>, cardRef: React.RefObject<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = e.clientX - r.left;
    const py = e.clientY - r.top;
    const cx = r.width / 2;
    const cy = r.height / 2;
    const rotateX = ((py - cy) / 20) * -1;
    const rotateY = ((px - cx) / 20);
    el.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  };

  const resetTilt = (cardRef: React.RefObject<HTMLDivElement>) => {
    const el = cardRef.current;
    if (el) el.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
  };

  const applyShine = (
    e: React.MouseEvent<HTMLDivElement>,
    cardRef: React.RefObject<HTMLDivElement>,
    shineRef: React.RefObject<HTMLDivElement>
  ) => {
    const card = cardRef.current, shine = shineRef.current;
    if (!card || !shine) return;
    const r = card.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const xp = (x / r.width) * 100;
    const yp = (y / r.height) * 100;

    shine.style.background = `
      radial-gradient(200px 200px at ${xp}% ${yp}%, rgba(255,255,255,0.25), rgba(255,255,255,0) 70%),
      linear-gradient(120deg, rgba(255,255,255,0.12), rgba(255,255,255,0))
    `;
    shine.style.opacity = '1';
  };

  const hideShine = (shineRef: React.RefObject<HTMLDivElement>) => {
    const shine = shineRef.current;
    if (shine) shine.style.opacity = '0';
  };

  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const shine1Ref = useRef<HTMLDivElement>(null);
  const shine2Ref = useRef<HTMLDivElement>(null);

  // Frontend / Backend tilt + shine
  const feRef = useRef<HTMLDivElement>(null);
  const beRef = useRef<HTMLDivElement>(null);
  const shineFeRef = useRef<HTMLDivElement>(null);
  const shineBeRef = useRef<HTMLDivElement>(null);

  // Database / Tools tilt + shine
  const dbRef = useRef<HTMLDivElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);
  const shineDbRef = useRef<HTMLDivElement>(null);
  const shineToolsRef = useRef<HTMLDivElement>(null);

  // ===== Small StatCard (first-image design) =====
  const StatCard = ({
    icon,
    target,
    label,
    delay = 0,
  }: {
    icon: React.ReactNode;
    target: number;
    label: string;
    delay?: number;
  }) => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, amount: 0.5 });
    const value = useCountUp(target, inView, 1000);

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5 }}
        className="relative overflow-hidden rounded-2xl px-6 py-8 bg-gradient-to-b from-white/8 to-white/[0.03] border border-white/10 backdrop-blur-xl
                   shadow-[0_10px_40px_rgba(0,0,0,0.25)] hover:shadow-[0_18px_60px_rgba(59,130,246,0.25)]
                   flex flex-col items-center text-center"
      >
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(120px_80px_at_50%_0%,rgba(255,255,255,0.12),transparent)]" />
        <div className="mb-4 text-primary">{icon}</div>
        <div className="text-4xl font-extrabold tracking-tight text-foreground">
          {value}
          <span>+</span>
        </div>
        <div className="mt-2 text-sm text-muted-foreground">{label}</div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* sparkle layer */}
      <CursorSparkles />

      <div className="max-w-5xl mx-auto text-center">
        {/* ===== HERO (DISPLAY) ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-8"
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Available for opportunities</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            Hello, I'm{' '}
            <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-500 bg-clip-text text-transparent">
              Kodni Diyana
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-xl sm:text-2xl text-muted-foreground mb-4"
          >
            Full Stack Developer & UI/UX Enthusiast
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-12"
          >
            Crafting beautiful, functional web experiences with modern technologies.
            Passionate about creating intuitive interfaces and scalable solutions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/projects">
              <Button size="lg" className="group">
                View Projects
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
         <a
  href="/Kodni_Diyana_Final_CV.pdf"
  target="_blank"
  rel="noopener noreferrer"
>
  <Button size="lg" variant="outline" className="group">
    <Download className="mr-2 w-4 h-4 group-hover:translate-y-1 transition-transform" />
    Download CV
  </Button>
</a>
          </motion.div>
        </motion.div>

        {/* ===== STATS — first image design ===== */}
        <section className="mt-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard icon={<Code2 className="h-6 w-6" />} target={2} label="Years of Experience" />
            <StatCard icon={<GitBranch className="h-6 w-6" />} target={10} label="Projects Completed" delay={0.05} />
            <StatCard icon={<Server className="h-6 w-6" />} target={20} label="Technologies Mastered" delay={0.1} />
            <StatCard icon={<Github className="h-6 w-6" />} target={300} label="GitHub Contributions" delay={0.15} />
          </div>
        </section>

        {/* ===== ABOUT ME (glass cards with tilt + shine) ===== */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="mt-24 text-left"
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold text-center mb-4">About Me</h2>
          <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-12">
            Passionate software engineer with a growing focus on modern web technologies and user-centered design.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1 */}
            <div
              ref={card1Ref}
              onMouseMove={(e) => { applyTilt(e, card1Ref); applyShine(e, card1Ref, shine1Ref); }}
              onMouseLeave={() => { resetTilt(card1Ref); hideShine(shine1Ref); }}
              className="transition-transform duration-300 transform-gpu relative overflow-hidden rounded-2xl p-6 sm:p-8
              bg-[radial-gradient(ellipse_at_top,_rgba(59,130,246,0.15),transparent_60%)]
              bg-gradient-to-b from-white/10 to-white/[0.04] border border-white/10 backdrop-blur-xl
              shadow-[0_10px_40px_rgba(0,0,0,0.25)] hover:shadow-[0_20px_60px_rgba(59,130,246,0.25)]"
            >
              {/* Shine layer */}
              <div
                ref={shine1Ref}
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-150 rounded-2xl mix-blend-screen"
                style={{ background: 'none' }}
              />
              <h3 className="text-2xl font-semibold mb-4">Technical Background</h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Currently pursuing a Bachelor’s degree in Computer Science (2<sup>nd</sup> year, 2<sup>nd</sup> semester).
                Building foundations in programming and web technologies while practicing with{' '}
                <strong>C++, PHP, HTML, CSS,</strong> and <strong>JavaScript</strong>.
              </p>
              <ul className="mt-6 space-y-3 text-sm sm:text-base">
                <li className="flex items-start gap-3">
                  <Code2 className="mt-0.5 h-5 w-5 text-primary" />
                  <span>Front-end foundations with semantic HTML5 and modern CSS.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Server className="mt-0.5 h-5 w-5 text-primary" />
                  <span>Intro to back-end concepts using Node.js & PHP.</span>
                </li>
                <li className="flex items-start gap-3">
                  <DbIcon className="mt-0.5 h-5 w-5 text-primary" />
                  <span>Basic database design and SQL with MySQL.</span>
                </li>
              </ul>
            </div>

            {/* Card 2 */}
            <div
              ref={card2Ref}
              onMouseMove={(e) => { applyTilt(e, card2Ref); applyShine(e, card2Ref, shine2Ref); }}
              onMouseLeave={() => { resetTilt(card2Ref); hideShine(shine2Ref); }}
              className="transition-transform duration-300 transform-gpu relative overflow-hidden rounded-2xl p-6 sm:p-8
              bg-[radial-gradient(ellipse_at_top,_rgba(59,130,246,0.15),transparent_60%)]
              bg-gradient-to-b from-white/10 to-white/[0.04] border border-white/10 backdrop-blur-xl
              shadow-[0_10px_40px_rgba(0,0,0,0.25)] hover:shadow-[0_20px_60px_rgba(59,130,246,0.25)]"
            >
              {/* Shine layer */}
              <div
                ref={shine2Ref}
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-150 rounded-2xl mix-blend-screen"
                style={{ background: 'none' }}
              />
              <h3 className="text-2xl font-semibold mb-4">What I Do</h3>
              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <Layout className="mt-0.5 h-5 w-5 text-primary" />
                  <div>
                    <p className="font-semibold">Frontend Development</p>
                    <p className="text-sm text-muted-foreground">
                      Building responsive, accessible UIs with HTML, CSS and JavaScript.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <PenTool className="mt-0.5 h-5 w-5 text-primary" />
                  <div>
                    <p className="font-semibold">UI/UX Design</p>
                    <p className="text-sm text-muted-foreground">
                      Designing clean, user-focused layouts with wireframes and mockups.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Server className="mt-0.5 h-5 w-5 text-primary" />
                  <div>
                    <p className="font-semibold">Backend Basics</p>
                    <p className="text-sm text-muted-foreground">
                      Learning RESTful API logic with Node.js & PHP.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <DbIcon className="mt-0.5 h-5 w-5 text-primary" />
                  <div>
                    <p className="font-semibold">Database Design</p>
                    <p className="text-sm text-muted-foreground">
                      Practicing SQL schema design and database structure with MySQL.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ===== TECH STACK ===== */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mt-24"
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold text-center mb-3">Tech Stack</h2>
          <p className="text-center text-muted-foreground mb-12">
            Technologies and tools I work with
          </p>

          {/* Frontend / Backend — with tilt + shine */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            {/* Frontend */}
            <div
              ref={feRef}
              onMouseMove={(e) => { applyTilt(e, feRef); applyShine(e, feRef, shineFeRef); }}
              onMouseLeave={() => { resetTilt(feRef); hideShine(shineFeRef); }}
              className="transition-transform duration-300 transform-gpu relative overflow-hidden rounded-2xl p-6 sm:p-8 bg-gradient-to-b from-white/10 to-white/[0.04] border border-white/10 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.25)] hover:shadow-[0_20px_60px_rgba(34,211,238,0.25)]"
            >
              <div
                ref={shineFeRef}
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-150 rounded-2xl mix-blend-screen"
                style={{ background: 'none' }}
              />
              <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <Code2 className="h-5 w-5 text-primary" />
                  <h3 className="text-2xl font-semibold">Frontend</h3>
                </div>
                <div className="space-y-5">
                  <SkillRow label="React.js" percent={90} icon={<BrandIcon name="react" />} />
                  <SkillRow label="TypeScript" percent={85} icon={<BrandIcon name="ts" />} />
                  <SkillRow label="Tailwind CSS" percent={90} icon={<BrandIcon name="tailwind" />} />
                  <SkillRow label="Next.js" percent={80} icon={<BrandIcon name="next" />} />
                </div>
              </div>
            </div>

            {/* Backend */}
            <div
              ref={beRef}
              onMouseMove={(e) => { applyTilt(e, beRef); applyShine(e, beRef, shineBeRef); }}
              onMouseLeave={() => { resetTilt(beRef); hideShine(shineBeRef); }}
              className="transition-transform duration-300 transform-gpu relative overflow-hidden rounded-2xl p-6 sm:p-8 bg-gradient-to-b from-white/10 to-white/[0.04] border border-white/10 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.25)] hover:shadow-[0_20px_60px_rgba(34,211,238,0.25)]"
            >
              <div
                ref={shineBeRef}
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-150 rounded-2xl mix-blend-screen"
                style={{ background: 'none' }}
              />
              <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-teal-500/10 blur-3xl" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <Server className="h-5 w-5 text-primary" />
                  <h3 className="text-2xl font-semibold">Backend</h3>
                </div>
                <div className="space-y-5">
                  <SkillRow label="Node.js" percent={85} icon={<BrandIcon name="node" />} />
                  <SkillRow label="Spring Boot" percent={80} icon={<BrandIcon name="spring" />} />
                  <SkillRow label="Express.js" percent={85} icon={<BrandIcon name="express" />} />
                  <SkillRow label="REST APIs" percent={90} icon={<BrandIcon name="rest" />} />
                </div>
              </div>
            </div>
          </div>

          {/* Database / Tools — with tilt + shine */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mt-10">
            {/* Database */}
            <div
              ref={dbRef}
              onMouseMove={(e) => { applyTilt(e, dbRef); applyShine(e, dbRef, shineDbRef); }}
              onMouseLeave={() => { resetTilt(dbRef); hideShine(shineDbRef); }}
              className="transition-transform duration-300 transform-gpu relative overflow-hidden rounded-2xl p-6 sm:p-8
              bg-gradient-to-b from-white/10 to-white/[0.04] border border-white/10 backdrop-blur-xl
              shadow-[0_10px_40px_rgba(0,0,0,0.25)] hover:shadow-[0_20px_60px_rgba(34,211,238,0.25)]"
            >
              <div
                ref={shineDbRef}
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-150 rounded-2xl mix-blend-screen"
                style={{ background: 'none' }}
              />
              <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <DbIcon className="h-5 w-5 text-primary" />
                  <h3 className="text-2xl font-semibold">Database</h3>
                </div>

                <div className="space-y-5">
                  <SkillRow label="MongoDB" percent={85} icon={<BrandIcon name="mongodb" />} />
                  <SkillRow label="PostgreSQL" percent={60} icon={<BrandIcon name="postgres" />} />
                  <SkillRow label="MySQL" percent={75} icon={<BrandIcon name="mysql" />} />
                  <SkillRow label="Redis" percent={70} icon={<BrandIcon name="redis" />} />
                </div>
              </div>
            </div>

            {/* Tools */}
            <div
              ref={toolsRef}
              onMouseMove={(e) => { applyTilt(e, toolsRef); applyShine(e, toolsRef, shineToolsRef); }}
              onMouseLeave={() => { resetTilt(toolsRef); hideShine(shineToolsRef); }}
              className="transition-transform duration-300 transform-gpu relative overflow-hidden rounded-2xl p-6 sm:p-8
              bg-gradient-to-b from-white/10 to-white/[0.04] border border-white/10 backdrop-blur-xl
              shadow-[0_10px_40px_rgba(0,0,0,0.25)] hover:shadow-[0_20px_60px_rgba(34,211,238,0.25)]"
            >
              <div
                ref={shineToolsRef}
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-150 rounded-2xl mix-blend-screen"
                style={{ background: 'none' }}
              />
              <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <Code2 className="h-5 w-5 text-primary" />
                  <h3 className="text-2xl font-semibold">Tools</h3>
                </div>

                <div className="space-y-5">
                  <SkillRow label="Git & GitHub" percent={90} icon={<BrandIcon name="git" />} />
                  <SkillRow label="Docker" percent={60} icon={<BrandIcon name="docker" />} />
                  <SkillRow label="VS Code" percent={95} icon={<BrandIcon name="vscode" />} />
                  <SkillRow label="Postman" percent={85} icon={<BrandIcon name="postman" />} />
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
