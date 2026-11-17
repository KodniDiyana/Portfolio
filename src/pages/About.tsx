import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

import {
  Briefcase,
  GraduationCap,
  Award,
  Users,
  Target,
  Heart,
  Code2,
  Database,
  Palette,
  Wrench,
  Sparkles,
  MapPin,
  Mail,
  ShieldCheck,
  BookOpen,
  Laptop,
  Globe,
  ArrowUpRight,
} from 'lucide-react';

import { useTheme } from '../contexts/ThemeContext';
import profilePhoto from '../assets/myprofessional_pic.jpeg';

/* =========================================================
   MY JOURNEY DATA
========================================================= */

const timeline = [
  {
    year: '2027',
    title: 'Expected Graduation & IT Career',
    company:
      'Sri Lanka Institute of Information Technology (SLIIT)',
    description:
      'Expected to complete my B.Sc. (Hons) in Information Technology and pursue a professional career in the IT industry, continuing to grow as a skilled software developer.',
    icon: GraduationCap,
    status: 'Future Goal',
  },
  {
    year: '2026',
    title: 'Full-Stack Web Developer Internship',
    company: 'ITX Digital Service (Pvt) Ltd',
    description:
      'Gained practical industry experience as a Full-Stack Web Developer Intern, strengthening my knowledge of frontend and backend development, database integration, and real-world web application development.',
    icon: Briefcase,
    status: 'Internship',
  },
  {
    year: '2025',
    title: 'Academic Projects & Development',
    company:
      'Sri Lanka Institute of Information Technology (SLIIT)',
    description:
      'Developed practical software development skills through academic projects, including the Golden Grain Mill Management System using React, Spring Boot, and MySQL.',
    icon: Code2,
    status: 'Academic Projects',
  },
  {
    year: '2024',
    title: 'Learning & Technical Foundation',
    company:
      'Sri Lanka Institute of Information Technology (SLIIT)',
    description:
      'Started exploring programming, web development, UI/UX design, and software engineering fundamentals while building a foundation in information technology.',
    icon: BookOpen,
    status: 'Foundation',
  },
];

/* =========================================================
   SKILLS & TECHNOLOGIES
========================================================= */

const skills = [
  {
    title: 'Frontend Development',
    icon: Code2,
    items: [
      'React.js',
      'TypeScript',
      'JavaScript',
      'Tailwind CSS',
      'HTML',
      'CSS',
    ],
  },
  {
    title: 'Backend Development',
    icon: Database,
    items: [
      'Spring Boot',
      'Node.js',
      'Express.js',
      'REST APIs',
      'Laravel',
    ],
  },
  {
    title: 'UI/UX Design',
    icon: Palette,
    items: [
      'Figma',
      'Wireframing',
      'Prototyping',
      'Responsive Design',
    ],
  },
  {
    title: 'Development Tools',
    icon: Wrench,
    items: [
      'Git & GitHub',
      'MySQL',
      'Postman',
      'VS Code',
      'Selenium',
    ],
  },
];

/* =========================================================
   CORE VALUES
========================================================= */

const values = [
  {
    icon: Target,
    title: 'Goal-Oriented',
    description:
      'Focused on achieving goals and delivering practical and meaningful solutions.',
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description:
      'Enjoy working with teams, sharing ideas, and contributing to successful projects.',
  },
  {
    icon: Award,
    title: 'Quality Development',
    description:
      'Committed to developing reliable, maintainable, and user-friendly web applications.',
  },
  {
    icon: Heart,
    title: 'Continuous Learning',
    description:
      'Passionate about learning modern technologies and continuously improving my development skills.',
  },
];

/* =========================================================
   PROFESSIONAL STRENGTHS

   Self-assessed levels for visual presentation.
========================================================= */

const strengths = [
  { name: 'Web Development', level: 90 },
  { name: 'Problem Solving', level: 85 },
  { name: 'Team Collaboration', level: 90 },
  { name: 'Continuous Learning', level: 95 },
];

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
      size: number;
    };

    const particles: Particle[] = [];

    let frame = 0;
    let lastTime = 0;
    let previousFrame = performance.now();

    /* Resize Canvas */

    const resize = () => {
      const ratio = Math.min(
        window.devicePixelRatio || 1,
        2
      );

      canvas.width = window.innerWidth * ratio;
      canvas.height = window.innerHeight * ratio;

      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    /* Generate Particles */

    const move = (event: PointerEvent) => {
      if (
        event.pointerType === 'touch' ||
        event.pointerType === 'pen'
      ) {
        return;
      }

      const now = performance.now();

      if (now - lastTime < 25) return;

      lastTime = now;

      for (let i = 0; i < 3; i++) {
        particles.push({
          x:
            event.clientX +
            (Math.random() - 0.5) * 10,
          y:
            event.clientY +
            (Math.random() - 0.5) * 10,
          vx: (Math.random() - 0.5) * 1.8,
          vy: (Math.random() - 0.5) * 1.8,
          life: 1,
          size: Math.random() * 2 + 1,
        });
      }

      if (particles.length > 80) {
        particles.splice(
          0,
          particles.length - 80
        );
      }
    };

    /* Draw Animation */

    const draw = (now: number) => {
      const delta = Math.min(
        (now - previousFrame) / 16.67,
        2.5
      );

      previousFrame = now;

      ctx.clearRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight
      );

      particles.forEach((particle) => {
        particle.x += particle.vx * delta;
        particle.y += particle.vy * delta;
        particle.life -= 0.025 * delta;

        ctx.globalAlpha = Math.max(
          particle.life,
          0
        );

        ctx.fillStyle = dark
          ? '#67e8f9'
          : '#2563eb';

        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 10;

        ctx.beginPath();

        ctx.arc(
          particle.x,
          particle.y,
          particle.size,
          0,
          Math.PI * 2
        );

        ctx.fill();
      });

      for (
        let i = particles.length - 1;
        i >= 0;
        i--
      ) {
        if (particles[i].life <= 0) {
          particles.splice(i, 1);
        }
      }

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      frame = requestAnimationFrame(draw);
    };

    resize();

    window.addEventListener('resize', resize);

    window.addEventListener(
      'pointermove',
      move,
      { passive: true }
    );

    frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);

      window.removeEventListener(
        'resize',
        resize
      );

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
      className="
        pointer-events-none
        fixed
        inset-0
        z-50
      "
    />
  );
}

/* =========================================================
   MAIN ABOUT PAGE
========================================================= */

export function About() {
  const { theme } = useTheme();

  const dark = theme === 'dark';
  const reduced = useReducedMotion();

  /* =====================================================
     THEME STYLES
  ===================================================== */

  const heading = dark
    ? 'text-white'
    : 'text-slate-900';

  const text = dark
    ? 'text-slate-200'
    : 'text-slate-700';

  const muted = dark
    ? 'text-slate-300'
    : 'text-slate-600';

  const card = dark
    ? `
      bg-gradient-to-br
      from-[#2b5484]/95
      to-[#1d3b63]/95
      border-blue-200/20
    `
    : `
      bg-white/90
      border-blue-200
    `;

  const smallCard = dark
    ? `
      bg-white/[0.07]
      border-blue-200/15
    `
    : `
      bg-blue-50/80
      border-blue-100
    `;

  const iconStyle = dark
    ? `
      bg-cyan-300/15
      text-cyan-200
    `
    : `
      bg-blue-100
      text-blue-700
    `;

  /* =====================================================
     PAGE
  ===================================================== */

  return (
    <main
      className={`
        relative
        min-h-screen
        overflow-hidden
        transition-colors
        duration-500

        ${
          dark
            ? 'bg-gradient-to-br from-[#193a63] via-[#1d4671] to-[#122d50]'
            : 'bg-gradient-to-br from-[#f4f9ff] via-[#e9f3ff] to-[#deedff]'
        }
      `}
    >
      {/* BLUE CURSOR SPARKLES */}

      <CursorSparkles dark={dark} />

      {/* BACKGROUND DECORATION */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          overflow-hidden
        "
      >
        <div
          className="
            absolute
            -left-32
            -top-32
            h-96
            w-96
            rounded-full
            bg-blue-400/10
            blur-3xl
          "
        />

        <div
          className="
            absolute
            right-0
            top-1/3
            h-96
            w-96
            rounded-full
            bg-cyan-400/10
            blur-3xl
          "
        />
      </div>

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-6xl
          px-5
          pb-20
          pt-20
          sm:px-8
        "
      >
        {/* =====================================================
            ABOUT PAGE HEADER
        ===================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: reduced ? 0 : 0.6,
          }}
          className="mb-12 text-center"
        >
          {/* SMALL BADGE */}

          <span
            className={`
              mb-5
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              px-4
              py-2
              text-sm
              font-semibold

              ${
                dark
                  ? 'border-cyan-300/25 bg-cyan-300/10 text-cyan-200'
                  : 'border-blue-200 bg-blue-100 text-blue-700'
              }
            `}
          >
            <Sparkles size={16} />

            Get to Know Me
          </span>

          {/* HEADING */}

          <h1
            className={`
              mb-4
              text-4xl
              font-extrabold
              sm:text-5xl

              ${heading}
            `}
          >
            About{' '}

            <span
              className="
                bg-gradient-to-r
                from-blue-500
                to-cyan-400
                bg-clip-text
                text-transparent
              "
            >
              Me
            </span>
          </h1>

          {/* DESCRIPTION */}

          <p
            className={`
              mx-auto
              max-w-2xl
              text-lg
              leading-relaxed

              ${muted}
            `}
          >
            An Information Technology undergraduate
            and aspiring Full-Stack Developer,
            passionate about building modern,
            responsive, and user-friendly
            web applications.
          </p>
        </motion.div>

        {/* =====================================================
            JOURNEY AND SKILLS
        ===================================================== */}

        <div
          className="
            mb-14
            grid
            items-start
            gap-6
            lg:grid-cols-2
          "
        >
          {/* =================================================
              LEFT COLUMN - MY JOURNEY
          ================================================= */}

          <motion.section
            initial={{
              opacity: 0,
              x: -20,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: reduced ? 0 : 0.5,
            }}
            className={`
              rounded-3xl
              border
              p-6
              shadow-xl
              sm:p-7

              ${card}
            `}
          >
            {/* SECTION HEADER */}

            <div className="mb-8">
              <h2
                className={`
                  text-2xl
                  font-bold

                  ${heading}
                `}
              >
                My Journey
              </h2>

              <p
                className={`
                  mt-2
                  text-sm

                  ${muted}
                `}
              >
                Education, internship experience
                & future career goals
              </p>
            </div>

            {/* TIMELINE */}

            <div className="relative space-y-7">
              {/* TIMELINE LINE */}

              <div
                className="
                  absolute
                  bottom-8
                  left-[19px]
                  top-5
                  w-px
                  bg-cyan-400/35
                "
              />

              {timeline.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.year}
                    initial={{
                      opacity: 0,
                      y: 15,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{ once: true }}
                    transition={{
                      duration: reduced ? 0 : 0.45,
                      delay: reduced
                        ? 0
                        : index * 0.07,
                    }}
                    className="
                      relative
                      flex
                      gap-4
                    "
                  >
                    {/* YEAR ICON */}

                    <div
                      className={`
                        relative
                        z-10
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl

                        ${iconStyle}
                      `}
                    >
                      <Icon size={20} />
                    </div>

                    {/* CONTENT */}

                    <div className="min-w-0 flex-1 pb-1">
                      {/* YEAR AND STATUS */}

                      <div
                        className="
                          mb-2
                          flex
                          flex-wrap
                          items-center
                          gap-2
                        "
                      >
                        <span
                          className={`
                            text-sm
                            font-bold

                            ${
                              dark
                                ? 'text-cyan-300'
                                : 'text-blue-700'
                            }
                          `}
                        >
                          {item.year}
                        </span>

                        <span
                          className={`
                            rounded-full
                            px-2.5
                            py-1
                            text-[11px]
                            font-medium

                            ${
                              dark
                                ? 'bg-white/10 text-slate-200'
                                : 'bg-blue-100 text-blue-700'
                            }
                          `}
                        >
                          {item.status}
                        </span>
                      </div>

                      {/* TITLE */}

                      <h3
                        className={`
                          mb-1
                          text-base
                          font-bold
                          leading-snug
                          sm:text-lg

                          ${heading}
                        `}
                      >
                        {item.title}
                      </h3>

                      {/* COMPANY */}

                      <p
                        className={`
                          mb-2
                          text-xs
                          font-medium
                          sm:text-sm

                          ${muted}
                        `}
                      >
                        {item.company}
                      </p>

                      {/* DESCRIPTION */}

                      <p
                        className={`
                          text-sm
                          leading-relaxed

                          ${text}
                        `}
                      >
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>

          {/* =================================================
              RIGHT COLUMN
          ================================================= */}

          <div className="space-y-6">
            {/* =============================================
                SKILLS & TECHNOLOGIES
            ============================================= */}

            <motion.section
              initial={{
                opacity: 0,
                x: 20,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{ once: true }}
              transition={{
                duration: reduced ? 0 : 0.5,
              }}
              className={`
                rounded-3xl
                border
                p-6
                shadow-xl
                sm:p-7

                ${card}
              `}
            >
              {/* HEADER */}

              <div className="mb-6">
                <h2
                  className={`
                    text-2xl
                    font-bold

                    ${heading}
                  `}
                >
                  Skills & Technologies
                </h2>

                <p
                  className={`
                    mt-2
                    text-sm

                    ${muted}
                  `}
                >
                  Technologies and development
                  tools I work with
                </p>
              </div>

              {/* SKILL GROUPS */}

              <div className="space-y-5">
                {skills.map((group) => {
                  const Icon = group.icon;

                  return (
                    <div key={group.title}>
                      {/* GROUP TITLE */}

                      <div
                        className="
                          mb-3
                          flex
                          items-center
                          gap-2
                        "
                      >
                        <Icon
                          size={18}
                          className={
                            dark
                              ? 'text-cyan-400'
                              : 'text-blue-600'
                          }
                        />

                        <h3
                          className={`
                            text-sm
                            font-bold
                            sm:text-base

                            ${heading}
                          `}
                        >
                          {group.title}
                        </h3>
                      </div>

                      {/* TECHNOLOGY BADGES */}

                      <div className="flex flex-wrap gap-2">
                        {group.items.map((skill) => (
                          <motion.span
                            key={skill}
                            whileHover={
                              reduced
                                ? undefined
                                : {
                                    y: -3,
                                    scale: 1.03,
                                  }
                            }
                            className={`
                              rounded-lg
                              border
                              px-3
                              py-2
                              text-xs
                              font-semibold
                              transition-colors
                              sm:text-sm

                              ${
                                dark
                                  ? `
                                    border-cyan-300/20
                                    bg-[#15375e]/80
                                    text-sky-100
                                    hover:border-cyan-300/50
                                  `
                                  : `
                                    border-blue-200
                                    bg-blue-50
                                    text-blue-800
                                    hover:border-blue-400
                                  `
                              }
                            `}
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.section>

            {/* =================================================
                WHO I AM - NEW COMPACT PROFESSIONAL DESIGN

                Only this card's internal layout is redesigned.
            ================================================= */}

            <motion.section
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{
                duration: reduced ? 0 : 0.5,
              }}
              className={`
                group
                relative
                overflow-hidden
                rounded-3xl
                border
                p-6
                shadow-xl
                transition-[border-color,box-shadow]
                duration-300
                sm:p-7

                ${card}

                ${
                  dark
                    ? 'hover:border-cyan-300/40'
                    : 'hover:border-blue-400'
                }
              `}
            >
              {/* SOFT DECORATIVE GLOW */}

              <div
                className="
                  pointer-events-none
                  absolute
                  -right-16
                  -top-16
                  h-44
                  w-44
                  rounded-full
                  bg-cyan-400/10
                  blur-3xl
                "
              />

              <div className="relative z-10">
                {/* CARD HEADING */}

                <div className="mb-6">
                  <h2
                    className={`
                      text-2xl
                      font-bold

                      ${heading}
                    `}
                  >
                    Who I Am
                  </h2>

                  <p
                    className={`
                      mt-1
                      text-sm

                      ${muted}
                    `}
                  >
                    A little more about me
                  </p>
                </div>

                {/* ==========================================
                    PROFILE HEADER
                ========================================== */}

                <div
                  className="
                    flex
                    flex-col
                    items-center
                    gap-5
                    sm:flex-row
                    sm:items-center
                  "
                >
                  {/* PROFESSIONAL PHOTO */}

                  <motion.div
                    whileHover={
                      reduced
                        ? undefined
                        : {
                            scale: 1.04,
                          }
                    }
                    transition={{
                      duration: 0.3,
                    }}
                    className="
                      relative
                      h-36
                      w-32
                      shrink-0
                      overflow-hidden
                      rounded-2xl
                      border-[3px]
                      border-cyan-300/50
                      bg-blue-100
                      shadow-lg
                      shadow-blue-500/20
                    "
                  >
                    <img
                      src={profilePhoto}
                      alt="Kodni Diyana professional portrait"
                      loading="lazy"
                      className="
                        h-full
                        w-full
                        object-cover
                        object-center
                      "
                    />
                  </motion.div>

                  {/* NAME AND PROFESSION */}

                  <div
                    className="
                      min-w-0
                      flex-1
                      text-center
                      sm:text-left
                    "
                  >
                    <h3
                      className={`
                        text-xl
                        font-extrabold
                        sm:text-2xl

                        ${heading}
                      `}
                    >
                      Kodni Diyana
                    </h3>

                    <p
                      className={`
                        mt-1
                        text-sm
                        font-bold

                        ${
                          dark
                            ? 'text-cyan-300'
                            : 'text-blue-700'
                        }
                      `}
                    >
                      Full-Stack Web Developer
                    </p>

                    <p
                      className={`
                        mt-1
                        text-xs
                        font-medium

                        ${muted}
                      `}
                    >
                      IT Undergraduate at SLIIT
                    </p>

                    {/* SHORT PROFESSIONAL DESCRIPTION */}

                    <p
                      className={`
                        mt-3
                        text-sm
                        leading-relaxed

                        ${text}
                      `}
                    >
                      Passionate about building
                      responsive, functional,
                      and user-friendly web
                      applications using modern
                      frontend and backend
                      technologies.
                    </p>
                  </div>
                </div>

                {/* DIVIDER */}

                <div
                  className={`
                    my-6
                    border-t

                    ${
                      dark
                        ? 'border-white/15'
                        : 'border-blue-200'
                    }
                  `}
                />

                {/* ==========================================
                    COMPACT INFORMATION GRID

                    Mobile: 1 column
                    Desktop: 2 columns
                ========================================== */}

                <div
                  className="
                    grid
                    grid-cols-1
                    gap-3
                    sm:grid-cols-2
                  "
                >
                  {/* LOCATION */}

                  <div
                    className={`
                      flex
                      min-w-0
                      items-start
                      gap-3
                      rounded-xl
                      border
                      p-3
                      transition-colors
                      duration-300

                      ${smallCard}
                    `}
                  >
                    <div
                      className={`
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-lg

                        ${iconStyle}
                      `}
                    >
                      <MapPin size={18} />
                    </div>

                    <div className="min-w-0">
                      <p
                        className={`
                          text-xs

                          ${muted}
                        `}
                      >
                        Location
                      </p>

                      <p
                        className={`
                          mt-1
                          text-sm
                          font-semibold

                          ${heading}
                        `}
                      >
                        Matara, Sri Lanka
                      </p>
                    </div>
                  </div>

                  {/* INTERNSHIP EXPERIENCE */}

                  <div
                    className={`
                      flex
                      min-w-0
                      items-start
                      gap-3
                      rounded-xl
                      border
                      p-3
                      transition-colors
                      duration-300

                      ${smallCard}
                    `}
                  >
                    <div
                      className={`
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-lg

                        ${iconStyle}
                      `}
                    >
                      <Briefcase size={18} />
                    </div>

                    <div className="min-w-0">
                      <p
                        className={`
                          text-xs

                          ${muted}
                        `}
                      >
                        Internship
                      </p>

                      <p
                        className={`
                          mt-1
                          text-sm
                          font-semibold
                          leading-snug

                          ${heading}
                        `}
                      >
                        Full-Stack Web Developer
                      </p>

                      <p
                        className={`
                          mt-1
                          text-xs
                          leading-relaxed

                          ${muted}
                        `}
                      >
                        ITX Digital Service (Pvt) Ltd
                      </p>
                    </div>
                  </div>

                  {/* SPECIALIZATION */}

                  <div
                    className={`
                      flex
                      min-w-0
                      items-start
                      gap-3
                      rounded-xl
                      border
                      p-3
                      transition-colors
                      duration-300

                      ${smallCard}
                    `}
                  >
                    <div
                      className={`
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-lg

                        ${iconStyle}
                      `}
                    >
                      <Globe size={18} />
                    </div>

                    <div className="min-w-0">
                      <p
                        className={`
                          text-xs

                          ${muted}
                        `}
                      >
                        Specialization
                      </p>

                      <p
                        className={`
                          mt-1
                          text-sm
                          font-semibold
                          leading-snug

                          ${heading}
                        `}
                      >
                        Full-Stack Web Development
                      </p>
                    </div>
                  </div>

                  {/* EMAIL */}

                  <div
                    className={`
                      flex
                      min-w-0
                      items-start
                      gap-3
                      rounded-xl
                      border
                      p-3
                      transition-colors
                      duration-300

                      ${smallCard}
                    `}
                  >
                    <div
                      className={`
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-lg

                        ${iconStyle}
                      `}
                    >
                      <Mail size={18} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p
                        className={`
                          text-xs

                          ${muted}
                        `}
                      >
                        Email
                      </p>

                      <a
                        href="mailto:kodnidiyanadesilva123@gmail.com"
                        className={`
                          group/email
                          mt-1
                          inline-flex
                          max-w-full
                          items-center
                          gap-1
                          text-xs
                          font-semibold
                          leading-relaxed
                          transition-colors
                          hover:text-cyan-400

                          ${heading}
                        `}
                      >
                        <span
                          className="
                            min-w-0
                            break-all
                          "
                        >
                          kodnidiyanadesilva123@gmail.com
                        </span>

                        <ArrowUpRight
                          size={14}
                          className="
                            shrink-0
                            transition-transform
                            group-hover/email:translate-x-0.5
                            group-hover/email:-translate-y-0.5
                          "
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* SUBTLE BOTTOM HOVER ACCENT */}

              <div
                className="
                  absolute
                  bottom-0
                  left-0
                  h-[3px]
                  w-0
                  bg-gradient-to-r
                  from-blue-500
                  via-cyan-400
                  to-teal-400
                  transition-all
                  duration-500
                  group-hover:w-full
                "
              />
            </motion.section>
          </div>
        </div>

        {/* =====================================================
            CORE VALUES SECTION
        ===================================================== */}

        <section className="mb-14">
          {/* SECTION HEADING */}

          <h2
            className={`
              mb-8
              text-center
              text-3xl
              font-extrabold

              ${heading}
            `}
          >
            Core{' '}

            <span className="text-cyan-400">
              Values
            </span>
          </h2>

          {/* CORE VALUES GRID */}

          <div
            className="
              grid
              gap-5
              sm:grid-cols-2
              lg:grid-cols-4
            "
          >
            {values.map((value, index) => {
              const Icon = value.icon;

              return (
                <motion.div
                  key={value.title}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{ once: true }}
                  transition={{
                    duration: reduced ? 0 : 0.5,
                    delay: reduced
                      ? 0
                      : index * 0.08,
                  }}
                  whileHover={
                    reduced
                      ? undefined
                      : {
                          y: -6,
                        }
                  }
                  className={`
                    group
                    rounded-2xl
                    border
                    p-6
                    text-center
                    shadow-lg
                    transition-[border-color,box-shadow]
                    duration-300
                    hover:shadow-xl

                    ${card}
                  `}
                >
                  {/* VALUE ICON */}

                  <div
                    className={`
                      mx-auto
                      mb-4
                      flex
                      h-14
                      w-14
                      items-center
                      justify-center
                      rounded-xl
                      transition-transform
                      duration-300
                      group-hover:scale-110

                      ${iconStyle}
                    `}
                  >
                    <Icon size={25} />
                  </div>

                  {/* TITLE */}

                  <h3
                    className={`
                      mb-2
                      text-lg
                      font-bold

                      ${heading}
                    `}
                  >
                    {value.title}
                  </h3>

                  {/* DESCRIPTION */}

                  <p
                    className={`
                      text-sm
                      leading-relaxed

                      ${muted}
                    `}
                  >
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* =====================================================
            PROFESSIONAL STRENGTHS
            ANIMATED PROGRESS BARS
        ===================================================== */}

        <motion.section
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: reduced ? 0 : 0.6,
          }}
          className={`
            rounded-3xl
            border
            p-6
            shadow-xl
            sm:p-8

            ${card}
          `}
        >
          {/* SECTION HEADER */}

          <div className="mb-8 flex items-center gap-4">
            <div
              className={`
                flex
                h-12
                w-12
                shrink-0
                items-center
                justify-center
                rounded-xl

                ${iconStyle}
              `}
            >
              <ShieldCheck size={25} />
            </div>

            <div>
              <h2
                className={`
                  text-2xl
                  font-bold

                  ${heading}
                `}
              >
                Professional Strengths
              </h2>

              <p
                className={`
                  mt-1
                  text-sm

                  ${muted}
                `}
              >
                Self-assessed skills developed
                through learning and practical
                experience
              </p>
            </div>
          </div>

          {/* PROGRESS BARS GRID */}

          <div
            className="
              grid
              gap-x-10
              gap-y-7
              sm:grid-cols-2
            "
          >
            {strengths.map((strength, index) => (
              <motion.div
                key={strength.name}
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  duration: reduced ? 0 : 0.5,
                  delay: reduced
                    ? 0
                    : index * 0.1,
                }}
                className="group"
              >
                {/* SKILL TITLE */}

                <div
                  className="
                    mb-3
                    flex
                    items-center
                    justify-between
                    gap-3
                  "
                >
                  <span
                    className={`
                      text-sm
                      font-semibold
                      sm:text-base

                      ${heading}
                    `}
                  >
                    {strength.name}
                  </span>

                  {/* PERCENTAGE */}

                  <span
                    className={`
                      text-sm
                      font-bold

                      ${
                        dark
                          ? 'text-cyan-300'
                          : 'text-blue-700'
                      }
                    `}
                  >
                    {strength.level}%
                  </span>
                </div>

                {/* PROGRESS TRACK */}

                <div
                  className={`
                    h-3.5
                    overflow-hidden
                    rounded-full

                    ${
                      dark
                        ? 'bg-[#102746]'
                        : 'bg-blue-100'
                    }
                  `}
                >
                  {/* PROGRESS FILL */}

                  <motion.div
                    initial={{
                      width: 0,
                    }}
                    whileInView={{
                      width: `${strength.level}%`,
                    }}
                    viewport={{ once: true }}
                    transition={{
                      duration: reduced ? 0 : 1.4,
                      delay: reduced
                        ? 0
                        : index * 0.12,
                      ease: 'easeOut',
                    }}
                    className="
                      relative
                      h-full
                      overflow-hidden
                      rounded-full
                      bg-gradient-to-r
                      from-blue-600
                      via-sky-400
                      to-cyan-400
                      shadow-[0_0_12px_rgba(34,211,238,0.35)]
                    "
                  >
                    {/* SHIMMER ANIMATION */}

                    {!reduced && (
                      <motion.div
                        className="
                          absolute
                          inset-0
                          bg-gradient-to-r
                          from-transparent
                          via-white/35
                          to-transparent
                        "
                        animate={{
                          x: ['-100%', '100%'],
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          repeatDelay: 1.5,
                          ease: 'linear',
                        }}
                      />
                    )}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* BOTTOM NOTE */}

          <div
            className={`
              mt-8
              flex
              items-start
              gap-3
              rounded-xl
              border
              p-4

              ${
                dark
                  ? 'border-cyan-300/20 bg-cyan-300/[0.06]'
                  : 'border-blue-200 bg-blue-50'
              }
            `}
          >
            <Laptop
              size={20}
              className={`
                mt-0.5
                shrink-0

                ${
                  dark
                    ? 'text-cyan-300'
                    : 'text-blue-600'
                }
              `}
            />

            <p
              className={`
                text-sm
                leading-relaxed

                ${muted}
              `}
            >
              My internship experience in
              full-stack web development
              strengthened my practical skills
              in building web applications,
              solving technical problems,
              and collaborating with others.
            </p>
          </div>
        </motion.section>
      </div>
    </main>
  );
}

export default About;