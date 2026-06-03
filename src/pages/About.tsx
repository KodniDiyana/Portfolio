import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Briefcase, GraduationCap, Award, Users, Target, Heart } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';

/* ───────────── Shared easing (replaces "easeOut" string) ───────────── */
const DEFAULT_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ───────────── Existing Data (UNCHANGED) ───────────── */
const timeline = [
  {
    year: '2026',
    title: '🚀 Aspiring Full-Stack & UI/UX Developer',
    company: 'Sri Lanka Institute of Information Technology.',
    description: 'Preparing to begin an internship in UI/UX design and software development.',
    icon: Briefcase,
  },
  {
    year: '2027',
    title: '🎓B.Sc (Hons) Information Technology',
    company: 'Sri Lanka Institute of Information Technology',
    description: 'Graduate with honors, specialized in IT Specialization.',
    icon: GraduationCap,
  },
  {
    year: '2024',
    title: '💻 Independent Learning & Projects',
    company: 'Sri Lanka Institute of Information Technology.',
    description:
      'Started exploring software design and development through online platforms.\nLearned the basics of UI/UX design tools and web technologies.',
    icon: Briefcase,
  },

  {
    year: '2025',
    title: '💻Highlighted projects',
    company: 'Sri Lanka Institute of Information Technology.',
    description: 'Golden Grain Mill (Spring Boot + React + MySQL) web technologies.',
    icon: Briefcase,
  },
];

const values = [
  { icon: Target, title: 'Goal-Oriented', description: 'Focused on delivering measurable results and exceeding expectations.' },
  { icon: Users, title: 'Collaborative', description: 'Strong believer in teamwork and open communication.' },
  { icon: Award, title: 'Excellence', description: 'Committed to quality code and best practices in every project.' },
  { icon: Heart, title: 'Passionate', description: 'Genuinely love what I do and continuously learning new technologies.' },
];

const metrics = [
  { label: 'Client Satisfaction', value: 98, color: 'bg-blue-500' },
  { label: 'Code Quality', value: 95, color: 'bg-cyan-500' },
  { label: 'Project Delivery', value: 100, color: 'bg-teal-500' },
  { label: 'Team Collaboration', value: 96, color: 'bg-green-500' },
];

/* ───────────── NEW: Skills data ───────────── */
type Skill = { label: string; level: number };
const skillsFrontend: Skill[] = [
  { label: 'React', level: 92 },
  { label: 'TypeScript', level: 88 },
  { label: 'Tailwind', level: 90 },
  { label: 'Framer Motion', level: 82 },
  { label: 'Next.js', level: 70 },
];

const skillsBackend: Skill[] = [
  { label: 'Node.js', level: 80 },
  { label: 'Express', level: 78 },
  { label: 'Spring Boot', level: 72 },
  { label: 'REST APIs', level: 86 },
  { label: 'JWT/Auth', level: 75 },
];

const skillsData: { title: string; items: Skill[] }[] = [
  { title: 'Frontend', items: skillsFrontend },
  { title: 'Backend', items: skillsBackend },
  {
    title: 'Design',
    items: [
      { label: 'Figma', level: 85 },
      { label: 'UI/UX', level: 83 },
      { label: 'Wireframing', level: 82 },
      { label: 'Prototyping', level: 80 },
    ],
  },
  {
    title: 'Tools',
    items: [
      { label: 'Git', level: 86 },
      { label: 'MySQL', level: 78 },
      { label: 'Postman', level: 84 },
      { label: 'Vite', level: 76 },
    ],
  },
];

/* ───────────── Small UI helpers / hooks ───────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { delay, duration: 0.6, ease: DEFAULT_EASE },
});

function useCursorGlow() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const r = useSpring(140, { stiffness: 200, damping: 30 });
  const glow = useTransform([x, y, r], ([mx, my, rad]) => {
    return `radial-gradient(${rad}px ${rad}px at ${mx}px ${my}px, rgba(var(--primary-rgb,59,130,246),0.22), transparent 60%)`;
  });
  const onMouseMove = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };
  return { glow, onMouseMove };
}

function CountUp({
  to,
  start = 0,
  duration = 900,
  className = '',
}: {
  to: number;
  start?: number;
  duration?: number;
  className?: string;
}) {
  const [n, setN] = useState(start);
  const ref = useRef<number>(start);
  useEffect(() => {
    const t0 = performance.now();
    let raf: number;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = Math.round(start + (to - start) * eased);
      if (val !== ref.current) {
        ref.current = val;
        setN(val);
      }
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, start, duration]);
  return <span className={className}>{n}%</span>;
}

/* Decorative floating blur */
function FloatingBlob({ delay = 0, className = '' }: { delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 0.55, scale: 1 }}
      transition={{ delay, duration: 1.2, ease: DEFAULT_EASE }}
      className={`pointer-events-none absolute blur-3xl ${className}`}
    />
  );
}

/* NEW: Skill chip with tiny progress ring */
function SkillChip({ label, level }: Skill) {
  const r = 11;
  const C = 2 * Math.PI * r;
  const offset = C - (C * level) / 100;

  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.02 }}
      className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 py-1.5 backdrop-blur-sm shadow-sm"
    >
      <span className="text-primary shrink-0">
        <svg width="26" height="26" viewBox="0 0 26 26">
          <circle cx="13" cy="13" r={r} stroke="currentColor" strokeOpacity="0.15" strokeWidth="3" fill="none" />
          <motion.circle
            cx="13"
            cy="13"
            r={r}
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            strokeDasharray={C}
            initial={{ strokeDashoffset: C }}
            whileInView={{ strokeDashoffset: offset }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1 }}
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span className="text-sm">{label}</span>
      <span className="text-xs text-muted-foreground">{level}%</span>
    </motion.div>
  );
}

/* ───────────── Enhanced About Page ───────────── */
export function About() {
  const { glow, onMouseMove } = useCursorGlow();

  // Parallax for hero header
  const y = useMotionValue(0);
  const ySlow = useTransform(y, [0, 200], [0, -18]);
  const ySlower = useTransform(y, [0, 200], [0, -36]);

  useEffect(() => {
    const onScroll = () => y.set(window.scrollY);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [y]);

  const intro = useMemo(
    () => [
      'A passionate developer dedicated to creating exceptional digital experiences',
      'through innovative solutions and clean, maintainable code.',
    ],
    []
  );

  return (
    <div className="relative min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden" onMouseMove={onMouseMove}>
      {/* Cursor-follow glow + grid */}
      <motion.div style={{ background: glow as any }} className="pointer-events-none absolute inset-0" />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(120,120,120,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,120,120,0.06)_1px,transparent_1px)] bg-[size:24px_24px]"
        aria-hidden
      />

      {/* Blobs */}
      <FloatingBlob className="top-[-80px] -left-20 w-[380px] h-[380px] rounded-full bg-primary/20" />
      <FloatingBlob delay={0.2} className="bottom-[-60px] -right-24 w-[420px] h-[420px] rounded-full bg-emerald-400/20" />

      <div className="relative max-w-6xl mx-auto">
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <motion.h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4" style={{ y: ySlow }}>
            About Me
          </motion.h1>

          <motion.p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed" style={{ y: ySlower }}>
            {intro.map((line, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 * i }}
                className="block"
              >
                {line}
              </motion.span>
            ))}
          </motion.p>

          <motion.div {...fadeUp(0.35)}>
            <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-primary/40" />
          </motion.div>
        </motion.div>

        {/* Two-column: Timeline (left) • Skills + Profile (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
          {/* Timeline */}
          <motion.div {...fadeUp(0.1)}>
            <Card className="border border-transparent bg-gradient-to-b from-background to-background/60 backdrop-blur">
              <CardHeader className="relative">
                <CardTitle className="flex items-center gap-2">
                  <span>My Journey</span>
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 250, damping: 14 }}
                    className="inline-block h-2 w-2 rounded-full bg-primary"
                  />
                </CardTitle>
                <CardDescription>Professional experience and educational background</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <div className="absolute left-[30px] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent" />
                  <div className="space-y-8">
                    {timeline.map((item, index) => (
                      <motion.div
                        key={`${item.year}-${index}`}
                        initial={{ opacity: 0, x: -16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ delay: 0.05 * index, duration: 0.5, ease: DEFAULT_EASE }}
                        className="flex gap-4"
                      >
                        <div className="flex flex-col items-center">
                          <motion.div
                            whileHover={{ rotate: 5, scale: 1.05 }}
                            className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary shadow-sm"
                          >
                            <item.icon className="w-5 h-5" />
                          </motion.div>
                          {index < timeline.length - 1 && <div className="w-0.5 h-full bg-border mt-2" />}
                        </div>
                        <div className="flex-1 pb-8">
                          <div className="text-sm text-muted-foreground mb-1">{item.year}</div>
                          <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                          <div className="text-sm text-muted-foreground mb-2">{item.company}</div>
                          <p className="text-sm whitespace-pre-line">{item.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right: Skills + Profile */}
          <div className="flex flex-col gap-6">
            {/* Skills Cloud */}
            <motion.div {...fadeUp(0.15)}>
              <Card className="border border-border/60 bg-background/60 backdrop-blur">
                <CardHeader>
                  <CardTitle>Skills & Technologies</CardTitle>
                  <CardDescription>Animated chips with proficiency rings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  {skillsData.map((group) => (
                    <div key={group.title}>
                      <div className="mb-3 text-sm font-medium opacity-80">{group.title}</div>
                      <div className="flex flex-wrap gap-2">
                        {group.items.map((s, i) => (
                          <SkillChip key={`${group.title}-${s.label}-${i}`} label={s.label} level={s.level} />
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Profile / Brand Card — CTA row removed */}
            <motion.div {...fadeUp(0.25)}>
              <Card className="relative overflow-hidden border border-border/60 bg-gradient-to-b from-background to-background/60 backdrop-blur">
                <span className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
                <CardHeader>
                  <CardTitle>Who I Am</CardTitle>
                  <CardDescription>Quick snapshot & contact</CardDescription>
                </CardHeader>
                <CardContent className="flex items-start gap-4">
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    className="relative"
                  >
                    <div className="relative h-20 w-20 rounded-full bg-gradient-to-br from-primary/30 to-emerald-400/30 flex items-center justify-center ring-2 ring-primary/30">
                      <span className="text-xl font-semibold">KD</span>
                      <motion.span
                        className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-primary"
                        animate={{ y: [0, -3, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                      />
                      <motion.span
                        className="absolute -bottom-1 -left-1 h-2.5 w-2.5 rounded-full bg-emerald-400"
                        animate={{ y: [0, 3, 0] }}
                        transition={{ repeat: Infinity, duration: 2.2 }}
                      />
                    </div>
                  </motion.div>

                  <div className="flex-1">
                    <ul className="text-sm leading-6 text-muted-foreground">
                      <li>
                        <span className="text-foreground">📍</span> Matara,Sri Lanka
                      </li>
                      <li>
                        <span className="text-foreground">💼</span> IT Undergraduate @ SLIIT
                      </li>
                      <li>
                        <span className="text-foreground">🎯</span> Focus: Frontend, UI/UX, Full-Stack
                      </li>
                      <li>
                        <span className="text-foreground">🌱</span> Learning: Next.js, Animations
                      </li>
                      <li>
                        <span className="text-foreground">✉️</span> kodnidiyanadesilva123@gmail.com
                      </li>
                    </ul>
                    {/* CTA buttons removed as requested */}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Core Values */}
        <motion.div {...fadeUp(0.2)} className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: 0.05 * index, duration: 0.45, ease: DEFAULT_EASE }}
                whileHover={{ y: -4, rotate: 0.2 }}
              >
                <Card className="relative overflow-hidden text-center h-full group border border-border/60">
                  <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(600px_200px_at_50%_-20%,rgba(255,255,255,0.18),transparent)]" />
                  <CardContent className="pt-6">
                    <div className="flex justify-center mb-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <value.icon className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <h3 className="font-semibold mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Performance Metrics */}
        <motion.div {...fadeUp(0.3)}>
          <h2 className="text-2xl font-bold mb-6 text-center">Performance Metrics</h2>
          <Card className="border border-transparent bg-gradient-to-b from-background to-background/60 backdrop-blur">
            <CardContent className="pt-6">
              <div className="space-y-6">
                {metrics.map((metric, index) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, x: -14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ delay: 0.05 * index, duration: 0.4, ease: DEFAULT_EASE }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{metric.label}</span>
                      <CountUp to={metric.value} className="text-sm font-bold" />
                    </div>
                    <div className="h-3 bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${metric.value}%` }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ delay: 0.15 + index * 0.05, duration: 1, ease: DEFAULT_EASE }}
                        className={`h-full ${metric.color} rounded-full`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
