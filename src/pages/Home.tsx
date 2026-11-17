import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

import {
  motion,
  useInView,
  useReducedMotion,
} from 'framer-motion';

import {
  ArrowRight,
  Download,
  Sparkles,
  Code2,
  Server,
  Database,
  PenTool,
  Layout,
  GitBranch,
  Github,
  Mail,
  ExternalLink,
  CheckCircle2,
  Layers,
  Globe,
  Terminal,
  Figma,
  ChevronDown,
  Briefcase,
  GraduationCap,
  Monitor,
  ShieldCheck,
  MousePointer2,
} from 'lucide-react';

import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

import profilePhoto from '../assets/myprofessional_pic.jpeg';

/* =========================================================
   CV CONFIGURATION
========================================================= */

const CV_PATH = '/mycv.pdf';

const CV_DOWNLOAD_NAME = 'Diyana_De_Silva_CV.pdf';

/* =========================================================
   TYPES
========================================================= */

type Colors = {
  dark: boolean;
  title: string;
  body: string;
  muted: string;
  surface: string;
  icon: string;
  secondary: string;
  separator: string;
};

/* =========================================================
   ANIMATION CONFIGURATION
========================================================= */

const fade = {
  hidden: {
    opacity: 0,
    y: 26,
  },

  show: {
    opacity: 1,
    y: 0,
  },
};

const stagger = {
  hidden: {},

  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

/* =========================================================
   LIGHT AND DARK MODE
========================================================= */

function useColors(): Colors {
  const { theme } = useTheme();

  const dark = theme === 'dark';

  return {
    dark,

    title: dark
      ? 'text-white'
      : 'text-slate-900',

    body: dark
      ? 'text-slate-100'
      : 'text-slate-700',

    muted: dark
      ? 'text-slate-300'
      : 'text-slate-600',

    surface: dark
      ? `
        border-sky-300/25
        bg-gradient-to-br
        from-[#2e5685]/90
        to-[#203f69]/95
        shadow-[0_18px_45px_rgba(6,24,52,0.24)]
        hover:border-cyan-300/60
        hover:shadow-[0_25px_55px_rgba(34,157,230,0.18)]
      `
      : `
        border-blue-200
        bg-gradient-to-br
        from-white
        to-[#eaf5ff]
        shadow-[0_15px_40px_rgba(38,92,163,0.11)]
        hover:border-sky-400
        hover:shadow-[0_22px_50px_rgba(42,111,200,0.19)]
      `,

    icon: dark
      ? `
        bg-cyan-300/15
        text-cyan-200
        ring-1
        ring-cyan-300/20
      `
      : `
        bg-blue-100
        text-blue-700
        ring-1
        ring-blue-200
      `,

    secondary: dark
      ? `
        border-white/25
        bg-white/10
        text-white
        hover:bg-white/20
      `
      : `
        border-blue-200
        bg-white
        text-blue-900
        hover:bg-blue-50
      `,

    separator: dark
      ? 'border-white/15'
      : 'border-blue-100',
  };
}

/* =========================================================
   BLUE CURSOR SPARKLE ANIMATION
========================================================= */

function CursorSparkles({
  dark,
}: {
  dark: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const reduced = useReducedMotion();

  useEffect(() => {
    if (
      reduced ||
      !window.matchMedia('(pointer: fine)').matches
    ) {
      return;
    }

    const canvas = canvasRef.current;

    const ctx = canvas?.getContext('2d');

    if (!canvas || !ctx) return;

    type Particle = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      radius: number;
    };

    const particles: Particle[] = [];

    let raf = 0;
    let lastSpawn = 0;
    let lastFrame = performance.now();
    let active = true;

    const resize = () => {
      const ratio = Math.min(
        window.devicePixelRatio || 1,
        2
      );

      canvas.width = Math.round(
        window.innerWidth * ratio
      );

      canvas.height = Math.round(
        window.innerHeight * ratio
      );

      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      ctx.setTransform(
        ratio,
        0,
        0,
        ratio,
        0,
        0
      );
    };

    const move = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;

      const now = performance.now();

      if (now - lastSpawn < 25) return;

      lastSpawn = now;

      for (let i = 0; i < 3; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.25 + Math.random() * 0.85;
        const life = 450 + Math.random() * 400;

        particles.push({
          x:
            event.clientX +
            (Math.random() - 0.5) * 10,

          y:
            event.clientY +
            (Math.random() - 0.5) * 10,

          vx: Math.cos(angle) * speed,

          vy: Math.sin(angle) * speed - 0.3,

          life,
          maxLife: life,

          radius: 1 + Math.random() * 2.4,
        });
      }

      if (particles.length > 90) {
        particles.splice(
          0,
          particles.length - 90
        );
      }
    };

    const render = (now: number) => {
      if (!active) return;

      const delta = Math.min(
        now - lastFrame,
        40
      );

      lastFrame = now;

      ctx.clearRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight
      );

      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];

        particle.life -= delta;

        if (particle.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        particle.x += (particle.vx * delta) / 16;
        particle.y += (particle.vy * delta) / 16;

        const opacity =
          particle.life / particle.maxLife;

        ctx.globalAlpha =
          opacity * (dark ? 0.95 : 0.8);

        ctx.fillStyle = dark
          ? '#67e8f9'
          : '#2563eb';

        ctx.shadowColor = dark
          ? '#38bdf8'
          : '#60a5fa';

        ctx.shadowBlur = 10;

        ctx.beginPath();

        ctx.arc(
          particle.x,
          particle.y,
          Math.max(0.1, particle.radius * opacity),
          0,
          Math.PI * 2
        );

        ctx.fill();
      }

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      raf = requestAnimationFrame(render);
    };

    resize();

    window.addEventListener('resize', resize);

    window.addEventListener(
      'pointermove',
      move,
      { passive: true }
    );

    raf = requestAnimationFrame(render);

    return () => {
      active = false;

      cancelAnimationFrame(raf);

      window.removeEventListener('resize', resize);

      window.removeEventListener(
        'pointermove',
        move
      );
    };
  }, [dark, reduced]);

  if (reduced) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50"
    />
  );
}

/* =========================================================
   ANIMATED BACKGROUND
========================================================= */

function Background({
  dark,
}: {
  dark: boolean;
}) {
  const reduced = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div
        className={`absolute inset-0 ${
          dark
            ? 'bg-gradient-to-br from-[#193a63] via-[#1d4671] to-[#122d50]'
            : 'bg-gradient-to-br from-[#f4f9ff] via-[#e9f3ff] to-[#deedff]'
        }`}
      />

      <motion.div
        className={`absolute -left-40 -top-32 h-[540px] w-[540px] rounded-full blur-[110px] ${
          dark
            ? 'bg-blue-400/15'
            : 'bg-blue-300/35'
        }`}
        animate={
          reduced
            ? undefined
            : {
                x: [0, 40, 0],
                y: [0, -30, 0],
              }
        }
        transition={{
          duration: 19,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className={`absolute right-[-160px] top-[18%] h-[600px] w-[600px] rounded-full blur-[120px] ${
          dark
            ? 'bg-cyan-400/10'
            : 'bg-cyan-300/30'
        }`}
        animate={
          reduced
            ? undefined
            : {
                x: [0, -35, 0],
                y: [0, 45, 0],
              }
        }
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div
        className="
          absolute inset-0 opacity-[0.035]
          [background-image:linear-gradient(#3b82f6_1px,transparent_1px),linear-gradient(90deg,#3b82f6_1px,transparent_1px)]
          [background-size:68px_68px]
        "
      />
    </div>
  );
}

/* =========================================================
   SECTION HEADING
========================================================= */

function Heading({
  eyebrow,
  first,
  accent,
  description,
  c,
}: {
  eyebrow: string;
  first: string;
  accent: string;
  description: string;
  c: Colors;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{
        once: true,
        amount: 0.2,
      }}
      variants={stagger}
      className="mb-12 text-center"
    >
      <motion.span
        variants={fade}
        className={`mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold sm:text-base ${
          c.dark
            ? 'border-cyan-300/25 bg-cyan-300/10 text-cyan-200'
            : 'border-blue-200 bg-blue-100 text-blue-700'
        }`}
      >
        <Sparkles size={16} />
        {eyebrow}
      </motion.span>

      <motion.h2
        variants={fade}
        className={`text-4xl font-extrabold tracking-tight sm:text-5xl ${c.title}`}
      >
        {first}{' '}

        <span
          className="
            bg-gradient-to-r
            from-blue-500
            via-sky-400
            to-cyan-500
            bg-clip-text
            text-transparent
          "
        >
          {accent}
        </span>
      </motion.h2>

      <motion.p
        variants={fade}
        className={`mx-auto mt-5 max-w-3xl text-lg leading-relaxed sm:text-xl ${c.muted}`}
      >
        {description}
      </motion.p>
    </motion.div>
  );
}

/* =========================================================
   ANIMATED COUNTER
========================================================= */

function useCounter(
  target: number,
  active: boolean
) {
  const [number, setNumber] = useState(0);

  const reduced = useReducedMotion();

  useEffect(() => {
    if (!active) return;

    if (reduced) {
      setNumber(target);
      return;
    }

    let frame = 0;
    let start: number | null = null;

    const tick = (time: number) => {
      if (start === null) {
        start = time;
      }

      const progress = Math.min(
        (time - start) / 1250,
        1
      );

      setNumber(
        Math.round(
          target *
            (1 - (1 - progress) ** 3)
        )
      );

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
    };
  }, [target, active, reduced]);

  return number;
}

/* =========================================================
   PROFESSIONAL STATISTICS CARD
========================================================= */

function StatCard({
  icon,
  value,
  label,
  index,
  c,
}: {
  icon: ReactNode;
  value: number;
  label: string;
  index: number;
  c: Colors;
}) {
  const ref = useRef<HTMLElement>(null);

  const visible = useInView(ref, {
    once: true,
    amount: 0.3,
  });

  const count = useCounter(value, visible);

  const reduced = useReducedMotion();

  return (
    <motion.article
      ref={ref}
      initial={{
        opacity: 0,
        y: 24,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{ once: true }}
      transition={{
        duration: reduced ? 0 : 0.55,
        delay: reduced ? 0 : index * 0.09,
      }}
      whileHover={
        reduced
          ? undefined
          : {
              y: -8,
              scale: 1.02,
            }
      }
      className={`group relative overflow-hidden rounded-3xl border px-4 py-8 text-center transition-[border-color,box-shadow] duration-300 sm:px-6 sm:py-9 ${c.surface}`}
    >
      <div
        className="
          absolute inset-x-8 top-0 h-[3px]
          bg-gradient-to-r
          from-transparent via-cyan-400 to-transparent
        "
      />

      <div
        className="
          pointer-events-none
          absolute -right-12 -top-12
          h-36 w-36 rounded-full
          bg-cyan-300/10 blur-2xl
          transition-transform duration-500
          group-hover:scale-150
        "
      />

      <div
        className={`relative mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 ${c.icon}`}
      >
        {icon}
      </div>

      <div
        className={`relative text-4xl font-extrabold sm:text-[43px] ${c.title}`}
      >
        {count}+
      </div>

      <p
        className={`relative mt-2 text-base font-semibold sm:text-lg ${c.muted}`}
      >
        {label}
      </p>
    </motion.article>
  );
}

/* =========================================================
   ABOUT FEATURE ITEM
========================================================= */

function Feature({
  icon,
  title,
  description,
  c,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  c: Colors;
}) {
  return (
    <div
      className={`group flex items-start gap-4 rounded-2xl border p-4 transition-colors duration-300 ${
        c.dark
          ? 'border-white/10 bg-white/[0.045] hover:bg-white/[0.09]'
          : 'border-blue-100 bg-blue-50/70 hover:bg-blue-100/70'
      }`}
    >
      <span
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${c.icon}`}
      >
        {icon}
      </span>

      <div>
        <h4 className={`text-lg font-bold ${c.title}`}>
          {title}
        </h4>

        <p
          className={`mt-1 text-base leading-relaxed ${c.muted}`}
        >
          {description}
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   ABOUT CARD
========================================================= */

function AboutCard({
  icon,
  title,
  summary,
  children,
  c,
  delay = 0,
}: {
  icon: ReactNode;
  title: string;
  summary: string;
  children: ReactNode;
  c: Colors;
  delay?: number;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 26,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: reduced ? 0 : 0.55,
        delay: reduced ? 0 : delay,
      }}
      whileHover={
        reduced
          ? undefined
          : { y: -5 }
      }
      className={`relative overflow-hidden rounded-3xl border p-6 transition-[border-color,box-shadow] duration-300 sm:p-8 ${c.surface}`}
    >
      <div
        className="
          absolute left-0 top-0 h-1 w-full
          bg-gradient-to-r
          from-blue-500 via-cyan-400 to-transparent
          opacity-70
        "
      />

      <div className="mb-5 flex items-center gap-4">
        <span
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${c.icon}`}
        >
          {icon}
        </span>

        <h3
          className={`text-2xl font-bold sm:text-[27px] ${c.title}`}
        >
          {title}
        </h3>
      </div>

      <p
        className={`mb-6 text-base leading-[1.85] sm:text-lg ${c.body}`}
      >
        {summary}
      </p>

      <div className="space-y-3">
        {children}
      </div>
    </motion.article>
  );
}

/* =========================================================
   TECH STACK CARD
========================================================= */

function TechCard({
  icon,
  title,
  subtitle,
  skills,
  index,
  c,
}: {
  icon: ReactNode;
  title: string;
  subtitle: string;
  skills: string[];
  index: number;
  c: Colors;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 26,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: reduced ? 0 : 0.55,
        delay: reduced ? 0 : index * 0.08,
      }}
      whileHover={
        reduced
          ? undefined
          : { y: -6 }
      }
      className={`group relative overflow-hidden rounded-3xl border p-7 transition-[border-color,box-shadow] duration-300 sm:p-8 ${c.surface}`}
    >
      <div
        className="
          pointer-events-none
          absolute -right-16 -top-16
          h-48 w-48 rounded-full
          bg-blue-400/10 blur-3xl
          transition-transform duration-500
          group-hover:scale-125
        "
      />

      <div className="relative mb-6 flex items-center gap-4">
        <span
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${c.icon}`}
        >
          {icon}
        </span>

        <div>
          <h3
            className={`text-2xl font-bold ${c.title}`}
          >
            {title}
          </h3>

          <p
            className={`mt-1 text-sm sm:text-base ${c.muted}`}
          >
            {subtitle}
          </p>
        </div>
      </div>

      <div
        className={`relative mb-6 border-t ${c.separator}`}
      />

      <div className="relative flex flex-wrap gap-3">
        {skills.map((skill) => (
          <span
            key={skill}
            className={`rounded-xl border px-4 py-2.5 text-base font-semibold transition-colors duration-300 ${
              c.dark
                ? 'border-sky-300/20 bg-[#183c65]/70 text-sky-100 group-hover:border-sky-300/35'
                : 'border-blue-200 bg-white text-blue-800 group-hover:border-sky-300'
            }`}
          >
            {skill}
          </span>
        ))}
      </div>

      <div
        className={`relative mt-7 flex items-center gap-2 text-sm font-medium ${
          c.dark
            ? 'text-cyan-200'
            : 'text-blue-700'
        }`}
      >
        <CheckCircle2 size={17} />
        Technologies & tools
      </div>
    </motion.article>
  );
}

/* =========================================================
   PROFESSIONAL PROFILE PHOTO
========================================================= */

function ProfilePhoto({
  c,
}: {
  c: Colors;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: 30,
        scale: 0.96,
      }}
      animate={{
        opacity: 1,
        x: 0,
        scale: 1,
      }}
      transition={{
        duration: reduced ? 0 : 0.85,
      }}
      className="
        relative mx-auto flex w-full
        max-w-[550px] items-center
        justify-center px-5 py-9
      "
    >
      <motion.div
        className={`pointer-events-none absolute inset-[13%] rounded-full blur-[80px] ${
          c.dark
            ? 'bg-cyan-300/25'
            : 'bg-sky-400/25'
        }`}
        animate={
          reduced
            ? undefined
            : {
                scale: [1, 1.1, 1],
              }
        }
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        aria-hidden="true"
        className={`pointer-events-none absolute aspect-square w-[94%] rounded-full border border-dashed ${
          c.dark
            ? 'border-cyan-200/25'
            : 'border-blue-400/30'
        }`}
        animate={
          reduced
            ? undefined
            : {
                rotate: 360,
              }
        }
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      <motion.div
        className="
          relative z-10 w-[91%]
          max-w-[465px]
          rounded-[34px]
          bg-gradient-to-br
          from-blue-300 via-cyan-300 to-blue-600
          p-[5px]
          shadow-[0_28px_75px_rgba(8,35,78,0.28)]
        "
        animate={
          reduced
            ? undefined
            : {
                y: [0, -9, 0],
              }
        }
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <div
          className="
            relative aspect-[4/5]
            overflow-hidden rounded-[29px]
            bg-[#b7c9dc]
          "
        >
          <img
            src={profilePhoto}
            alt="Kodni Diyana professional portrait"
            loading="eager"
            className="
              h-full w-full object-cover object-center
            "
          />

          <div
            className="
              pointer-events-none
              absolute inset-x-0 bottom-0 h-20
              bg-gradient-to-t
              from-[#163e67]/20 to-transparent
            "
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

/* =========================================================
   TECH STACK DATA
========================================================= */

const techGroups = [
  {
    icon: <Layout size={25} />,

    title: 'Frontend',

    subtitle: 'Interfaces & user experiences',

    skills: [
      'React.js',
      'TypeScript',
      'Tailwind CSS',
      'Next.js',
    ],
  },

  {
    icon: <Server size={25} />,

    title: 'Backend',

    subtitle: 'APIs & application logic',

    skills: [
      'Node.js',
      'Spring Boot',
      'Express.js',
      'REST APIs',
    ],
  },

  {
    icon: <Database size={25} />,

    title: 'Database',

    subtitle: 'Data storage & management',

    skills: [
      'MongoDB',
      'MySQL',
    ],
  },

  {
    icon: <Terminal size={25} />,

    title: 'Development Tools',

    subtitle: 'Workflow & collaboration',

    skills: [
      'Git & GitHub',
      'VS Code',
      'Postman',
    ],
  },
];

/* =========================================================
   MAIN HOME PAGE
========================================================= */

export function Home() {
  const c = useColors();

  const reduced = useReducedMotion();

  return (
    <main
      className={`relative isolate min-h-screen overflow-hidden transition-colors duration-500 ${
        c.dark
          ? 'bg-[#193a63]'
          : 'bg-[#f4f9ff]'
      }`}
    >
      {/* Background */}

      <Background dark={c.dark} />

      {/* Cursor Sparkles */}

      <CursorSparkles dark={c.dark} />

      <div className="relative z-10">

        {/* =====================================================
            HERO SECTION
        ===================================================== */}

        <section
          className="
            relative flex min-h-[82vh]
            items-center py-16 lg:py-20
          "
        >
          <div
            className="
              mx-auto w-full max-w-[1400px]
              px-5 sm:px-8 lg:px-12 xl:px-16
            "
          >
            <div
              className="
                grid items-center gap-10
                lg:grid-cols-[1.14fr_1fr]
                lg:gap-14
              "
            >
              {/* LEFT INTRODUCTION */}

              <motion.div
                variants={stagger}
                initial="hidden"
                animate="show"
                className="
                  order-2 text-center
                  lg:order-1 lg:text-left
                "
              >
                {/* Availability Badge */}

                <motion.div variants={fade}>
                  <span
                    className={`mb-7 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold sm:text-base ${
                      c.dark
                        ? 'border-cyan-200/25 bg-cyan-300/10 text-cyan-100'
                        : 'border-blue-200 bg-white/80 text-blue-800'
                    }`}
                  >
                    <span
                      className="
                        h-2.5 w-2.5 rounded-full
                        bg-emerald-400
                      "
                    />

                    Available for Opportunities

                    <Sparkles size={15} />
                  </span>
                </motion.div>

                {/* Hello */}

                <motion.p
                  variants={fade}
                  className={`mb-3 text-xl font-semibold sm:text-2xl ${
                    c.dark
                      ? 'text-blue-200'
                      : 'text-blue-700'
                  }`}
                >
                  Hello, I'm
                </motion.p>

                {/* Name */}

                <motion.h1
                  variants={fade}
                  className={`mb-6 whitespace-nowrap text-[clamp(1.8rem,4.5vw,4.4rem)] font-extrabold leading-tight tracking-tight ${c.title}`}
                >
                  Kodni{' '}

                  <span
                    className="
                      bg-gradient-to-r
                      from-blue-500
                      via-sky-400
                      to-cyan-500
                      bg-clip-text
                      text-transparent
                    "
                  >
                    Diyana
                  </span>
                </motion.h1>

                {/* Profession */}

                <motion.p
                  variants={fade}
                  className={`mb-5 text-lg font-bold sm:text-xl xl:text-2xl ${c.title}`}
                >
                  Full Stack Developer{' '}

                  <span className="px-1 text-cyan-500">
                    |
                  </span>{' '}

                  UI/UX Enthusiast
                </motion.p>

                {/* Description */}

                <motion.p
                  variants={fade}
                  className={`mx-auto mb-9 max-w-[610px] text-lg leading-[1.85] sm:text-xl lg:mx-0 ${c.muted}`}
                >
                  I enjoy building beautiful,
                  functional, and user-friendly
                  digital experiences. With a
                  passion for modern web development
                  and creative design, I transform
                  ideas into responsive applications
                  and meaningful digital solutions.
                </motion.p>

                {/* =================================================
                    HERO BUTTONS
                ================================================= */}

                <motion.div
                  variants={fade}
                  className="
                    mb-8 flex flex-col items-center
                    justify-center gap-4
                    sm:flex-row lg:justify-start
                  "
                >
                  {/* View Projects */}

                  <Link
                    to="/projects"
                    className="
                      group inline-flex w-full
                      items-center justify-center gap-2
                      rounded-xl
                      bg-gradient-to-r
                      from-blue-600 to-cyan-500
                      px-7 py-4
                      text-base font-bold text-white
                      shadow-lg shadow-blue-500/25
                      transition-all
                      hover:-translate-y-1
                      hover:shadow-blue-500/40
                      sm:w-auto
                    "
                  >
                    View My Projects

                    <ArrowRight
                      size={19}
                      className="
                        transition-transform
                        group-hover:translate-x-1
                      "
                    />
                  </Link>

                  {/* ===============================================
                      UPDATED CV DOWNLOAD BUTTON

                      This downloads the PDF directly rather than
                      relying on the browser's PDF preview.

                      Required:
                      public/mycv.pdf
                  =============================================== */}

                  <a
  href={CV_PATH}
  download={CV_DOWNLOAD_NAME}
  type="application/pdf"
  aria-label="Download Kodni Diyana CV as PDF"
  className={`group inline-flex w-full items-center justify-center gap-2 rounded-xl border px-7 py-4 text-base font-bold transition-all hover:-translate-y-1 sm:w-auto ${c.secondary}`}
>
  <Download size={19} />
  Download CV
</a>
                </motion.div>

                {/* Quick Highlights */}

                <motion.div
                  variants={fade}
                  className={`flex flex-wrap justify-center gap-x-6 gap-y-3 text-base lg:justify-start ${c.muted}`}
                >
                  {[
                    'Responsive Design',
                    'Modern Technologies',
                    'Creative Solutions',
                  ].map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center gap-2"
                    >
                      <CheckCircle2
                        size={17}
                        className="text-emerald-500"
                      />

                      {item}
                    </span>
                  ))}
                </motion.div>
              </motion.div>

              {/* RIGHT PROFILE PHOTO */}

              <div className="order-1 lg:order-2">
                <ProfilePhoto c={c} />
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}

          <motion.a
            href="#statistics"
            aria-label="Scroll to portfolio statistics"
            className={`absolute bottom-0 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-xs font-semibold uppercase tracking-[0.2em] lg:flex ${c.muted}`}
            animate={
              reduced
                ? undefined
                : {
                    y: [0, 7, 0],
                  }
            }
            transition={{
              duration: 2.2,
              repeat: Infinity,
            }}
          >
            Scroll down

            <ChevronDown size={20} />
          </motion.a>
        </section>

        {/* =====================================================
            STATISTICS SECTION
        ===================================================== */}

        <section
          id="statistics"
          className="scroll-mt-24 py-12 sm:py-16"
        >
          <div
            className="
              mx-auto max-w-7xl
              px-5 sm:px-8 lg:px-12
            "
          >
            <div
              className="
                grid grid-cols-2 gap-4
                sm:gap-6 lg:grid-cols-4
              "
            >
              <StatCard
                icon={<Code2 size={29} />}
                value={2}
                label="Years of Experience"
                index={0}
                c={c}
              />

              <StatCard
                icon={<GitBranch size={29} />}
                value={10}
                label="Projects Completed"
                index={1}
                c={c}
              />

              <StatCard
                icon={<Server size={29} />}
                value={20}
                label="Technologies Mastered"
                index={2}
                c={c}
              />

              <StatCard
                icon={<Github size={29} />}
                value={100}
                label="GitHub Contributions"
                index={3}
                c={c}
              />
            </div>
          </div>
        </section>

        {/* =====================================================
            ABOUT ME SECTION
        ===================================================== */}

        <section
          id="about"
          className="scroll-mt-24 py-20 sm:py-28"
        >
          <div
            className="
              mx-auto max-w-7xl
              px-5 sm:px-8 lg:px-12
            "
          >
            <Heading
              eyebrow="Get to Know Me"
              first="About"
              accent="Me"
              description="Passionate about building meaningful digital experiences through technology, creativity, and user-centered design."
              c={c}
            />

            <div
              className="
                grid items-stretch gap-7
                lg:grid-cols-2
              "
            >
              {/* Technical Background */}

              <AboutCard
                icon={<GraduationCap size={27} />}
                title="Technical Background"
                summary="I'm pursuing a Bachelor's degree in Information Technology and building a strong foundation in software development, modern web technologies, and user interface design."
                c={c}
              >
                <Feature
                  icon={<Code2 size={21} />}
                  title="Frontend"
                  description="HTML, CSS, JavaScript, React, and modern frameworks."
                  c={c}
                />

                <Feature
                  icon={<Server size={21} />}
                  title="Backend"
                  description="REST APIs and server-side application development."
                  c={c}
                />

                <Feature
                  icon={<Database size={21} />}
                  title="Database"
                  description="Database design and management using MySQL and MongoDB."
                  c={c}
                />
              </AboutCard>

              {/* What I Do */}

              <AboutCard
                icon={<Briefcase size={27} />}
                title="What I Do"
                summary="I combine development and design to create responsive, reliable, and intuitive digital solutions."
                c={c}
                delay={0.1}
              >
                <Feature
                  icon={<Monitor size={21} />}
                  title="Frontend Development"
                  description="Responsive, accessible user interfaces with reusable code."
                  c={c}
                />

                <Feature
                  icon={<PenTool size={21} />}
                  title="UI/UX Design"
                  description="Clean, attractive interfaces that prioritize usability."
                  c={c}
                />

                <Feature
                  icon={<Server size={21} />}
                  title="Backend Development"
                  description="API integration and application services."
                  c={c}
                />

                <Feature
                  icon={<Database size={21} />}
                  title="Database Management"
                  description="Data organization, queries, and application data."
                  c={c}
                />
              </AboutCard>
            </div>

            {/* About Button */}

            <div className="mt-12 text-center">
              <Link
                to="/about"
                className={`group inline-flex items-center gap-2 rounded-xl border px-7 py-3.5 text-base font-bold transition-all hover:-translate-y-1 ${c.secondary}`}
              >
                More About Me

                <ArrowRight
                  size={18}
                  className="
                    transition-transform
                    group-hover:translate-x-1
                  "
                />
              </Link>
            </div>
          </div>
        </section>

        {/* =====================================================
            TECH STACK SECTION
        ===================================================== */}

        <section
          id="skills"
          className={`scroll-mt-24 py-20 sm:py-28 ${
            c.dark
              ? 'bg-[#0d2846]/20'
              : 'bg-white/30'
          }`}
        >
          <div
            className="
              mx-auto max-w-7xl
              px-5 sm:px-8 lg:px-12
            "
          >
            <Heading
              eyebrow="My Technical Skills"
              first="Tech"
              accent="Stack"
              description="Technologies, frameworks, databases, and development tools I use to bring digital ideas to life."
              c={c}
            />

            {/* Four Card Grid */}

            <div
              className="
                grid gap-7
                lg:grid-cols-2
              "
            >
              {techGroups.map((group, index) => (
                <TechCard
                  key={group.title}
                  {...group}
                  index={index}
                  c={c}
                />
              ))}
            </div>

            {/* Technology Highlights */}

            <div
              className="
                mt-12 flex flex-wrap
                justify-center gap-3
              "
            >
              {[
                {
                  icon: <Code2 size={18} />,
                  label: 'Clean Code',
                },
                {
                  icon: <Globe size={18} />,
                  label: 'Responsive Web',
                },
                {
                  icon: <Layers size={18} />,
                  label: 'Modern Frameworks',
                },
                {
                  icon: <Figma size={18} />,
                  label: 'UI/UX Design',
                },
                {
                  icon: <ShieldCheck size={18} />,
                  label: 'User-Centered',
                },
                {
                  icon: <MousePointer2 size={18} />,
                  label: 'Interactive UI',
                },
              ].map((item) => (
                <span
                  key={item.label}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-base font-medium ${
                    c.dark
                      ? 'border-white/20 bg-white/10 text-slate-200'
                      : 'border-blue-200 bg-white/80 text-slate-700'
                  }`}
                >
                  <span
                    className={
                      c.dark
                        ? 'text-cyan-200'
                        : 'text-blue-700'
                    }
                  >
                    {item.icon}
                  </span>

                  {item.label}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            CONTACT SECTION
        ===================================================== */}

        <section className="py-20 sm:py-28">
          <div
            className="
              mx-auto max-w-5xl
              px-5 sm:px-8
            "
          >
            <motion.div
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{
                duration: reduced ? 0 : 0.65,
              }}
              className={`relative overflow-hidden rounded-[32px] border px-6 py-16 text-center shadow-xl sm:px-12 sm:py-20 ${
                c.dark
                  ? 'border-cyan-200/25 bg-gradient-to-br from-[#2c5c90] to-[#173a62]'
                  : 'border-blue-200 bg-gradient-to-br from-white via-[#eaf5ff] to-[#d5eaff]'
              }`}
            >
              {/* Decorative Glows */}

              <div
                className="
                  pointer-events-none absolute
                  -left-20 -top-24 h-64 w-64
                  rounded-full bg-cyan-400/15 blur-3xl
                "
              />

              <div
                className="
                  pointer-events-none absolute
                  -bottom-24 -right-20 h-64 w-64
                  rounded-full bg-blue-400/15 blur-3xl
                "
              />

              <div className="relative">
                {/* Contact Icon */}

                <span
                  className={`mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl ${c.icon}`}
                >
                  <Mail size={30} />
                </span>

                {/* Small Title */}

                <p
                  className={`mb-3 text-base font-bold uppercase tracking-[0.15em] ${
                    c.dark
                      ? 'text-cyan-200'
                      : 'text-blue-700'
                  }`}
                >
                  Let's Connect
                </p>

                {/* Heading */}

                <h2
                  className={`mb-5 text-4xl font-extrabold sm:text-5xl ${c.title}`}
                >
                  Have a Project in Mind?
                </h2>

                {/* Description */}

                <p
                  className={`mx-auto mb-9 max-w-2xl text-lg leading-relaxed sm:text-xl ${c.muted}`}
                >
                  I'm always interested in new ideas,
                  collaborations, and meaningful
                  digital projects. Let's build
                  something great together.
                </p>

                {/* Contact Buttons */}

                <div
                  className="
                    flex flex-col justify-center
                    gap-4 sm:flex-row
                  "
                >
                  <Link
                    to="/contact"
                    className="
                      group inline-flex items-center
                      justify-center gap-2 rounded-xl
                      bg-gradient-to-r
                      from-blue-600 to-cyan-500
                      px-8 py-4
                      text-base font-bold text-white
                      shadow-lg transition-all
                      hover:-translate-y-1
                    "
                  >
                    <Mail size={19} />

                    Contact Me

                    <ArrowRight
                      size={18}
                      className="
                        transition-transform
                        group-hover:translate-x-1
                      "
                    />
                  </Link>

                  <Link
                    to="/projects"
                    className={`inline-flex items-center justify-center gap-2 rounded-xl border px-8 py-4 text-base font-bold transition-all hover:-translate-y-1 ${c.secondary}`}
                  >
                    Explore My Work

                    <ExternalLink size={18} />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

      </div>
    </main>
  );
}

export default Home;