import { useEffect, useMemo, useRef, useState } from 'react';

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from 'framer-motion';

import {
  ArrowUpRight,
  CheckCircle2,
  Code2,
  ExternalLink,
  Eye,
  Filter,
  FolderGit2,
  Github,
  Globe,
  Layers,
  Mail,
  Smartphone,
  Sparkles,
  X,
} from 'lucide-react';

import { Link } from 'react-router-dom';

import { useTheme } from '../contexts/ThemeContext';

/* =========================================================
   PROJECT IMAGES
========================================================= */

import paddyImage from '../assets/paddy.jpg';
import whaleImage from '../assets/whale.jpg';
import internImage from '../assets/intern.jpg';
import smartCampusImage from '../assets/smartCampus.jpg';
import historiaImage from '../assets/historia.png';
import ecommerceImage from '../assets/ecommerce.png';

/* =========================================================
   TYPES
========================================================= */

type ProjectCategory = 'web' | 'mobile' | 'ai';

type FilterCategory = 'all' | ProjectCategory;

type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: ProjectCategory;
  github: string;
  demo?: string;
  featured?: boolean;
  completed: boolean;
  highlights: string[];
  imageFit?: 'contain' | 'cover';
};

/* =========================================================
   FILTER CATEGORIES
========================================================= */

const categories: FilterCategory[] = [
  'all',
  'web',
  'mobile',
  'ai',
];

const categoryLabels: Record<FilterCategory, string> = {
  all: 'All Projects',
  web: 'Web Apps',
  mobile: 'Mobile Apps',
  ai: 'AI Projects',
};

/* =========================================================
   PROJECT DATA
========================================================= */

const projectsData: Project[] = [
  /* =====================================================
     1. SHOPEASE E-COMMERCE PLATFORM
  ===================================================== */

  {
    id: 'ecommerce',

    title: 'ShopEase – E-Commerce Platform',

    description:
      'A full-stack e-commerce platform featuring product browsing, shopping cart management, secure checkout, payment processing, order management, delivery tracking, and customer dashboards.',

    image: ecommerceImage,

    imageFit: 'contain',

    tags: [
      'React.js',
      'Laravel',
      'PHP',
      'MySQL',
      'Sanctum',
      'REST API',
    ],

    category: 'web',

    github:
      'https://github.com/Rashini0926/ecommerce-platform',

    featured: true,

    completed: true,

    highlights: [
      'Product & Category Browsing',
      'Shopping Cart Management',
      'Checkout & Payments',
      'Order Processing',
      'Delivery Processing & Tracking',
      'Wishlist & User Dashboard',
    ],
  },

  /* =====================================================
     2. HISTORIA MOBILE APPLICATION
  ===================================================== */

  {
    id: 'historia',

    title: 'HISTORIA – Historical Travel Mobile App',

    description:
      'A mobile application for discovering Sri Lankan historical places, planning personalized tours, sharing travel experiences, and connecting with fellow travelers.',

    image: historiaImage,

    imageFit: 'contain',

    tags: [
      'Flutter',
      'Dart',
      'Spring Boot',
      'PostgreSQL',
      'REST API',
      'JWT',
    ],

    category: 'mobile',

    github:
      'https://github.com/Anuradha-dol/it3060-hci-historia-mobile-app-group82',

    featured: true,

    completed: true,

    highlights: [
      'Historical Discovery',
      'Personalized Tour Planning',
      'Community Feed',
      'Travel Buddy Matching',
      'Local Guide Booking',
    ],
  },

  /* =====================================================
     3. GOLDEN GRAIN MILL
  ===================================================== */

  {
    id: 'golden-grain',

    title: 'Golden Grain Mill – Management System',

    description:
      'A full-stack management platform for Sri Lanka’s rice and paddy industry, featuring inventory, suppliers, invoices, payments, and analytics.',

    image: paddyImage,

    imageFit: 'cover',

    tags: [
      'Spring Boot',
      'React',
      'MySQL',
      'Stripe',
      'JWT',
    ],

    category: 'web',

    github:
      'https://github.com/kiruluchamika/Golden-Grain-Mill-ITP-Project',

    completed: true,

    highlights: [
      'Invoice Management',
      'Payment Management',
      'Inventory Tracking',
      'Supplier Management',
    ],
  },

  /* =====================================================
     4. WHALE WATCHING MOBILE APPLICATION
  ===================================================== */

  {
    id: 'whale-app',

    title: 'Whale Watching – Mobile App',

    description:
      'An Android mobile application for exploring whale-watching tours, viewing schedules, booking tickets, and accessing weather information.',

    image: whaleImage,

    imageFit: 'cover',

    tags: [
      'Android',
      'Kotlin',
      'Firebase',
    ],

    category: 'mobile',

    github:
      'https://github.com/KodniDiyana/Whale_Watching_MobileApp',

    completed: true,

    highlights: [
      'Tour Booking',
      'Tour Schedules',
      'Weather Integration',
    ],
  },

  /* =====================================================
     5. INTERNSHIP MANAGEMENT SYSTEM
  ===================================================== */

  {
    id: 'internship-system',

    title: 'Internship Management System',

    description:
      'A full-stack internship management platform developed using the MERN stack and microservices architecture.',

    image: internImage,

    imageFit: 'cover',

    tags: [
      'MongoDB Atlas',
      'Express.js',
      'React.js',
      'Node.js',
      'Tailwind CSS',
      'JWT',
    ],

    category: 'web',

    github:
      'https://github.com/Upeksha0721/INTURN_HUB',

    completed: true,

    highlights: [
      'Internship Management',
      'MERN Stack',
      'Microservices Architecture',
    ],
  },

  /* =====================================================
     6. SMART CAMPUS MANAGEMENT SYSTEM
  ===================================================== */

  {
    id: 'smart-campus',

    title: 'Smart Campus Management System',

    description:
      'A university facility and asset management system developed using React, Spring Boot, MySQL, and RESTful API integration.',

    image: smartCampusImage,

    imageFit: 'cover',

    tags: [
      'Java',
      'Spring Boot',
      'React.js',
      'MySQL',
      'REST API',
      'Postman',
    ],

    category: 'web',

    github:
      'https://github.com/Upeksha0721/Upeksha0721-it3030-paf-2026-smart-campus-group_WE_315_2.2',

    completed: true,

    highlights: [
      'Facility Management',
      'Asset Management',
      'REST API Integration',
    ],
  },
];

/* =========================================================
   BLUE CURSOR SPARKLE TRAIL

   Same style as the Home page:
   - Blue and cyan glowing particles
   - Smooth fading
   - Mouse movement tracking
   - No interference with clicks
   - Disabled for reduced motion and touch devices
========================================================= */

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  radius: number;
  color: string;
};

function CursorSparkles({
  dark,
}: {
  dark: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    if (!window.matchMedia('(pointer: fine)').matches) {
      return;
    }

    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    const particles: Particle[] = [];

    let animationFrame = 0;
    let lastSpawn = 0;
    let lastFrame = performance.now();
    let active = true;

    const colors = dark
      ? ['#38bdf8', '#67e8f9', '#60a5fa', '#a5f3fc']
      : ['#2563eb', '#3b82f6', '#0ea5e9', '#38bdf8'];

    /* -----------------------------------------
       RESIZE CANVAS
    ----------------------------------------- */

    const resizeCanvas = () => {
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

    /* -----------------------------------------
       GENERATE PARTICLES
    ----------------------------------------- */

    const createParticle = (
      x: number,
      y: number
    ) => {
      const angle =
        Math.random() * Math.PI * 2;

      const speed =
        0.3 + Math.random() * 1.2;

      const life =
        450 + Math.random() * 420;

      return {
        x: x + (Math.random() - 0.5) * 12,
        y: y + (Math.random() - 0.5) * 12,

        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.35,

        life,
        maxLife: life,

        radius: 1 + Math.random() * 2.6,

        color:
          colors[
            Math.floor(Math.random() * colors.length)
          ],
      };
    };

    /* -----------------------------------------
       MOUSE MOVEMENT
    ----------------------------------------- */

    const handlePointerMove = (
      event: PointerEvent
    ) => {
      if (
        event.pointerType === 'touch' ||
        event.pointerType === 'pen'
      ) {
        return;
      }

      const now = performance.now();

      if (now - lastSpawn < 22) return;

      lastSpawn = now;

      for (let i = 0; i < 4; i++) {
        particles.push(
          createParticle(
            event.clientX,
            event.clientY
          )
        );
      }

      if (particles.length > 120) {
        particles.splice(
          0,
          particles.length - 120
        );
      }
    };

    /* -----------------------------------------
       DRAW ANIMATED PARTICLES
    ----------------------------------------- */

    const animate = (now: number) => {
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

      for (
        let i = particles.length - 1;
        i >= 0;
        i--
      ) {
        const particle = particles[i];

        particle.life -= delta;

        if (particle.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        particle.x +=
          (particle.vx * delta) / 16;

        particle.y +=
          (particle.vy * delta) / 16;

        const opacity =
          particle.life / particle.maxLife;

        ctx.globalAlpha =
          opacity * (dark ? 0.95 : 0.85);

        ctx.fillStyle = particle.color;

        ctx.shadowColor = particle.color;
        ctx.shadowBlur = 12;

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

      animationFrame =
        requestAnimationFrame(animate);
    };

    /* -----------------------------------------
       EVENT LISTENERS
    ----------------------------------------- */

    resizeCanvas();

    window.addEventListener(
      'resize',
      resizeCanvas
    );

    window.addEventListener(
      'pointermove',
      handlePointerMove,
      { passive: true }
    );

    animationFrame =
      requestAnimationFrame(animate);

    /* -----------------------------------------
       CLEANUP
    ----------------------------------------- */

    return () => {
      active = false;

      cancelAnimationFrame(animationFrame);

      window.removeEventListener(
        'resize',
        resizeCanvas
      );

      window.removeEventListener(
        'pointermove',
        handlePointerMove
      );
    };
  }, [dark, reducedMotion]);

  if (reducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="
        pointer-events-none
        fixed
        inset-0
        z-[90]
      "
    />
  );
}

/* =========================================================
   CATEGORY ICON
========================================================= */

function CategoryIcon({
  category,
}: {
  category: ProjectCategory;
}) {
  if (category === 'web') {
    return <Globe size={14} />;
  }

  if (category === 'mobile') {
    return <Smartphone size={14} />;
  }

  return <Sparkles size={14} />;
}

/* =========================================================
   ANIMATED BACKGROUND

   Matches Home page colors
========================================================= */

function ProjectsBackground({
  dark,
}: {
  dark: boolean;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="
        pointer-events-none
        absolute
        inset-0
        overflow-hidden
      "
    >
      {/* MAIN BACKGROUND */}

      <div
        className={
          dark
            ? `
              absolute inset-0
              bg-gradient-to-br
              from-[#193a63]
              via-[#1d4671]
              to-[#122d50]
            `
            : `
              absolute inset-0
              bg-gradient-to-br
              from-[#f4f9ff]
              via-[#e9f3ff]
              to-[#deedff]
            `
        }
      />

      {/* LEFT ANIMATED GLOW */}

      <motion.div
        className={`
          absolute
          -left-40
          -top-40
          h-[550px]
          w-[550px]
          rounded-full
          blur-[110px]

          ${
            dark
              ? 'bg-blue-400/15'
              : 'bg-blue-300/35'
          }
        `}
        animate={
          reducedMotion
            ? undefined
            : {
                x: [0, 45, 0],
                y: [0, -35, 0],
                scale: [1, 1.1, 1],
              }
        }
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* RIGHT ANIMATED GLOW */}

      <motion.div
        className={`
          absolute
          -right-40
          top-[20%]
          h-[600px]
          w-[600px]
          rounded-full
          blur-[120px]

          ${
            dark
              ? 'bg-cyan-400/10'
              : 'bg-cyan-300/30'
          }
        `}
        animate={
          reducedMotion
            ? undefined
            : {
                x: [0, -40, 0],
                y: [0, 35, 0],
              }
        }
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* SUBTLE GRID */}

      <div
        className="
          absolute
          inset-0
          opacity-[0.035]

          [background-image:linear-gradient(#3b82f6_1px,transparent_1px),linear-gradient(90deg,#3b82f6_1px,transparent_1px)]

          [background-size:68px_68px]
        "
      />
    </div>
  );
}

/* =========================================================
   PROJECT IMAGE COMPONENT

   Important:
   - HISTORIA image is never cropped
   - E-commerce image is never cropped
   - Clicking opens the full-size preview
========================================================= */

function ProjectImage({
  project,
  index,
  dark,
  onPreview,
}: {
  project: Project;
  index: number;
  dark: boolean;
  onPreview: (project: Project) => void;
}) {
  const contained =
    project.imageFit === 'contain';

  return (
    <button
      type="button"
      onClick={() => onPreview(project)}
      aria-label={`Preview ${project.title}`}
      className={`
        group/image
        relative
        block
        aspect-[16/9]
        w-full
        overflow-hidden

        focus-visible:outline
        focus-visible:outline-2
        focus-visible:outline-cyan-400

        ${
          contained
            ? 'bg-[#f2f6ff]'
            : dark
              ? 'bg-[#173a60]'
              : 'bg-blue-50'
        }
      `}
    >
      <img
        src={project.image}
        alt={`${project.title} preview`}
        loading={index < 3 ? 'eager' : 'lazy'}
        className={`
          h-full
          w-full
          object-center

          ${
            contained
              ? 'object-contain'
              : `
                object-cover
                transition-transform
                duration-700
                group-hover/image:scale-105
              `
          }
        `}
      />

      {/* IMAGE PREVIEW ICON */}

      <span
        className="
          absolute
          bottom-3
          right-3
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-full
          border
          border-white/30
          bg-[#102a4e]/85
          text-white
          opacity-0
          transition-opacity
          duration-300
          group-hover/image:opacity-100
          group-focus-visible/image:opacity-100
        "
      >
        <Eye size={17} />
      </span>
    </button>
  );
}

/* =========================================================
   PROJECT CARD
========================================================= */

interface ProjectCardProps {
  project: Project;
  index: number;
  dark: boolean;
  onPreview: (project: Project) => void;
}

function ProjectCard({
  project,
  index,
  dark,
  onPreview,
}: ProjectCardProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.article
      layout
      initial={{
        opacity: 0,
        y: 25,
        scale: 0.98,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        y: -15,
      }}
      transition={{
        duration: reducedMotion ? 0 : 0.45,
        delay: reducedMotion ? 0 : index * 0.06,
      }}
      whileHover={
        reducedMotion
          ? undefined
          : {
              y: -6,
            }
      }
      className={`
        group
        relative
        flex
        h-full
        min-w-0
        flex-col
        overflow-hidden
        rounded-[22px]
        border

        transition-[border-color,box-shadow]
        duration-300

        ${
          dark
            ? `
              border-blue-200/20

              bg-gradient-to-br
              from-[#2b5484]/95
              to-[#1d3b63]/95

              shadow-[0_15px_35px_rgba(5,20,45,0.20)]

              hover:border-cyan-300/55

              hover:shadow-[0_22px_50px_rgba(20,130,220,0.18)]
            `
            : `
              border-blue-200

              bg-gradient-to-br
              from-white
              to-[#edf6ff]

              shadow-[0_12px_30px_rgba(40,95,170,0.10)]

              hover:border-blue-400

              hover:shadow-[0_20px_45px_rgba(40,105,190,0.17)]
            `
        }
      `}
    >
      {/* ==========================================
          PROJECT IMAGE
      ========================================== */}

      <ProjectImage
        project={project}
        index={index}
        dark={dark}
        onPreview={onPreview}
      />

      {/* ==========================================
          PROJECT BADGES
      ========================================== */}

      <div
        className="
          flex
          flex-wrap
          items-center
          gap-2
          px-5
          pt-4
        "
      >
        {/* CATEGORY BADGE */}

        <span
          className={`
            inline-flex
            items-center
            gap-1.5
            rounded-full
            border
            px-2.5
            py-1
            text-[11px]
            font-semibold

            ${
              dark
                ? `
                  border-blue-300/25
                  bg-[#173a60]
                  text-sky-100
                `
                : `
                  border-blue-200
                  bg-blue-50
                  text-blue-700
                `
            }
          `}
        >
          <CategoryIcon category={project.category} />

          {project.category === 'mobile'
            ? 'Mobile App'
            : project.category === 'web'
              ? 'Web Application'
              : 'AI Project'}
        </span>

        {/* FEATURED BADGE */}

        {project.featured && (
          <span
            className="
              inline-flex
              items-center
              gap-1
              rounded-full
              bg-gradient-to-r
              from-blue-600
              to-cyan-500
              px-2.5
              py-1
              text-[11px]
              font-semibold
              text-white
            "
          >
            <Sparkles size={12} />

            Featured
          </span>
        )}

        {/* COMPLETED BADGE */}

        {project.completed && (
          <span
            className={`
              inline-flex
              items-center
              gap-1
              rounded-full
              border
              px-2.5
              py-1
              text-[11px]
              font-semibold

              ${
                dark
                  ? `
                    border-emerald-400/25
                    bg-emerald-400/10
                    text-emerald-200
                  `
                  : `
                    border-emerald-200
                    bg-emerald-50
                    text-emerald-700
                  `
              }
            `}
          >
            <CheckCircle2 size={12} />

            Completed
          </span>
        )}
      </div>

      {/* ==========================================
          CARD CONTENT
      ========================================== */}

      <div
        className="
          flex
          flex-1
          flex-col
          px-5
          pb-5
          pt-3
        "
      >
        {/* PROJECT TITLE */}

        <h3
          className={`
            mb-2
            text-lg
            font-bold
            leading-snug
            sm:text-xl

            ${
              dark
                ? 'text-white'
                : 'text-slate-900'
            }
          `}
        >
          {project.title}
        </h3>

        {/* PROJECT DESCRIPTION */}

        <p
          className={`
            mb-4
            line-clamp-3
            text-sm
            leading-[1.65]
            sm:text-[15px]

            ${
              dark
                ? 'text-slate-200'
                : 'text-slate-600'
            }
          `}
        >
          {project.description}
        </p>

        {/* ==========================================
            TECHNOLOGY BADGES
        ========================================== */}

        <div className="mb-4 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className={`
                rounded-md
                border
                px-2.5
                py-1
                text-[11px]
                font-semibold

                ${
                  dark
                    ? `
                      border-sky-300/20
                      bg-[#183b63]/80
                      text-sky-100
                    `
                    : `
                      border-blue-200
                      bg-blue-50
                      text-blue-800
                    `
                }
              `}
            >
              {tag}
            </span>
          ))}

          {project.tags.length > 4 && (
            <span
              title={project.tags.slice(4).join(', ')}
              className={`
                rounded-md
                border
                px-2.5
                py-1
                text-[11px]
                font-semibold

                ${
                  dark
                    ? `
                      border-white/15
                      bg-white/10
                      text-slate-200
                    `
                    : `
                      border-blue-200
                      bg-blue-100
                      text-blue-700
                    `
                }
              `}
            >
              +{project.tags.length - 4}
            </span>
          )}
        </div>

        {/* ==========================================
            KEY FEATURES

            IMPORTANT UPDATE:
            Show ALL features instead of only 2.
        ========================================== */}

        <div className="mb-4">
          <p
            className={`
              mb-2
              text-xs
              font-bold
              uppercase
              tracking-wider

              ${
                dark
                  ? 'text-cyan-200'
                  : 'text-blue-700'
              }
            `}
          >
            Key Features
          </p>

          <div
            className="
              flex
              flex-wrap
              gap-x-3
              gap-y-2
            "
          >
            {project.highlights.map((highlight) => (
              <span
                key={highlight}
                className={`
                  inline-flex
                  items-start
                  gap-1.5
                  text-xs
                  leading-relaxed

                  ${
                    dark
                      ? 'text-slate-300'
                      : 'text-slate-600'
                  }
                `}
              >
                <CheckCircle2
                  size={13}
                  className="
                    mt-0.5
                    shrink-0
                    text-cyan-400
                  "
                />

                {highlight}
              </span>
            ))}
          </div>
        </div>

        {/* ==========================================
            GITHUB AND DEMO BUTTONS
        ========================================== */}

        <div className="mt-auto flex gap-2">
          {/* GITHUB BUTTON */}

          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className={`
              group/link
              inline-flex
              flex-1
              items-center
              justify-center
              gap-2
              rounded-lg
              border
              px-4
              py-2.5
              text-sm
              font-semibold
              transition-all
              duration-300

              ${
                dark
                  ? `
                    border-white/25
                    bg-white/[0.08]
                    text-white

                    hover:border-cyan-300/50
                    hover:bg-white/[0.15]
                  `
                  : `
                    border-blue-200
                    bg-white
                    text-blue-900

                    hover:border-blue-400
                    hover:bg-blue-50
                  `
              }
            `}
          >
            <Github size={17} />

            View Code

            <ArrowUpRight
              size={15}
              className="
                transition-transform
                group-hover/link:translate-x-0.5
                group-hover/link:-translate-y-0.5
              "
            />
          </a>

          {/* DEMO BUTTON */}

          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex
                flex-1
                items-center
                justify-center
                gap-2
                rounded-lg
                bg-gradient-to-r
                from-blue-600
                to-cyan-500
                px-4
                py-2.5
                text-sm
                font-semibold
                text-white
                transition-all
                duration-300
                hover:shadow-lg
                hover:shadow-blue-500/30
              "
            >
              <ExternalLink size={16} />

              Live Demo
            </a>
          )}
        </div>
      </div>

      {/* ==========================================
          BOTTOM HOVER ACCENT
      ========================================== */}

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
    </motion.article>
  );
}

/* =========================================================
   MAIN PROJECTS PAGE
========================================================= */

export function Projects() {
  /* =====================================================
     THEME
  ===================================================== */

  const { theme } = useTheme();

  const dark = theme === 'dark';

  const reducedMotion = useReducedMotion();

  /* =====================================================
     STATE
  ===================================================== */

  const [selectedCategory, setSelectedCategory] =
    useState<FilterCategory>('all');

  const [preview, setPreview] =
    useState<Project | null>(null);

  /* =====================================================
     FILTER PROJECTS
  ===================================================== */

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'all') {
      return projectsData;
    }

    return projectsData.filter(
      (project) =>
        project.category === selectedCategory
    );
  }, [selectedCategory]);

  /* =====================================================
     PROJECT COUNTS
  ===================================================== */

  const webProjects = projectsData.filter(
    (project) => project.category === 'web'
  ).length;

  const mobileProjects = projectsData.filter(
    (project) => project.category === 'mobile'
  ).length;

  /* =====================================================
     CLOSE PREVIEW WITH ESCAPE
  ===================================================== */

  useEffect(() => {
    if (!preview) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setPreview(null);
      }
    };

    window.addEventListener(
      'keydown',
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        'keydown',
        handleKeyDown
      );
    };
  }, [preview]);

  /* =====================================================
     PAGE RETURN
  ===================================================== */

  return (
    <main
      className={`
        relative
        isolate
        min-h-screen
        overflow-hidden
        transition-colors
        duration-500

        ${
          dark
            ? 'bg-[#193a63]'
            : 'bg-[#f4f9ff]'
        }
      `}
    >
      {/* BACKGROUND */}

      <ProjectsBackground dark={dark} />

      {/* BLUE CURSOR SPARKLE TRAIL */}

      <CursorSparkles dark={dark} />

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-7xl
          px-5
          pb-20
          pt-20
          sm:px-8
          lg:px-12
        "
      >
        {/* =================================================
            PAGE HEADER
        ================================================= */}

        <motion.header
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: reducedMotion ? 0 : 0.6,
          }}
          className="mb-10 text-center"
        >
          {/* SMALL HEADER BADGE */}

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
                  ? `
                    border-cyan-300/25
                    bg-cyan-300/10
                    text-cyan-200
                  `
                  : `
                    border-blue-200
                    bg-blue-100
                    text-blue-700
                  `
              }
            `}
          >
            <Sparkles size={16} />

            My Portfolio Projects
          </span>

          {/* MAIN HEADING */}

          <h1
            className={`
              mb-4
              text-4xl
              font-extrabold
              tracking-tight
              sm:text-5xl

              ${
                dark
                  ? 'text-white'
                  : 'text-slate-900'
              }
            `}
          >
            Featured{' '}

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
              Projects
            </span>
          </h1>

          {/* HEADER DESCRIPTION */}

          <p
            className={`
              mx-auto
              max-w-2xl
              text-base
              leading-relaxed
              sm:text-lg

              ${
                dark
                  ? 'text-slate-300'
                  : 'text-slate-600'
              }
            `}
          >
            A collection of academic and development
            projects showcasing my experience in
            web and mobile application development.
          </p>

          {/* =============================================
              PROJECT STATISTICS
          ============================================= */}

          <div
            className="
              mt-7
              flex
              flex-wrap
              items-center
              justify-center
              gap-3
            "
          >
            {[
              {
                icon: <FolderGit2 size={17} />,
                value: projectsData.length,
                label: 'Projects',
              },

              {
                icon: <Globe size={17} />,
                value: webProjects,
                label: 'Web Apps',
              },

              {
                icon: <Smartphone size={17} />,
                value: mobileProjects,
                label: 'Mobile Apps',
              },
            ].map((item) => (
              <motion.div
                key={item.label}
                whileHover={
                  reducedMotion
                    ? undefined
                    : {
                        y: -4,
                        scale: 1.03,
                      }
                }
                className={`
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  px-4
                  py-2.5
                  transition-colors
                  duration-300

                  ${
                    dark
                      ? `
                        border-blue-200/20
                        bg-white/[0.08]
                        text-white
                        hover:border-cyan-300/40
                      `
                      : `
                        border-blue-200
                        bg-white/85
                        text-slate-800
                        hover:border-blue-400
                      `
                  }
                `}
              >
                <span
                  className={
                    dark
                      ? 'text-cyan-300'
                      : 'text-blue-600'
                  }
                >
                  {item.icon}
                </span>

                <span className="font-bold">
                  {item.value}
                </span>

                <span className="text-sm">
                  {item.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.header>

        {/* =================================================
            CATEGORY FILTERS
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.1,
            duration: reducedMotion ? 0 : 0.45,
          }}
          className="
            mb-9
            flex
            flex-wrap
            items-center
            justify-center
            gap-2.5
          "
        >
          {/* FILTER ICON */}

          <div
            className={`
              mr-1
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-lg
              border

              ${
                dark
                  ? `
                    border-white/20
                    bg-white/[0.07]
                    text-cyan-300
                  `
                  : `
                    border-blue-200
                    bg-white
                    text-blue-700
                  `
              }
            `}
          >
            <Filter size={18} />
          </div>

          {/* FILTER BUTTONS */}

          {categories.map((category) => {
            const active =
              selectedCategory === category;

            return (
              <motion.button
                key={category}
                type="button"
                onClick={() =>
                  setSelectedCategory(category)
                }
                aria-pressed={active}
                whileHover={
                  reducedMotion
                    ? undefined
                    : {
                        y: -2,
                      }
                }
                whileTap={
                  reducedMotion
                    ? undefined
                    : {
                        scale: 0.97,
                      }
                }
                className={`
                  rounded-lg
                  border
                  px-4
                  py-2.5
                  text-sm
                  font-semibold
                  transition-colors
                  duration-300

                  ${
                    active
                      ? `
                        border-blue-500
                        bg-gradient-to-r
                        from-blue-600
                        to-cyan-500
                        text-white
                        shadow-md
                        shadow-blue-500/20
                      `
                      : dark
                        ? `
                          border-blue-200/20
                          bg-white/[0.07]
                          text-slate-200

                          hover:border-cyan-300/40
                          hover:bg-white/[0.12]
                        `
                        : `
                          border-blue-200
                          bg-white
                          text-slate-700

                          hover:border-blue-400
                          hover:bg-blue-50
                        `
                  }
                `}
              >
                {categoryLabels[category]}
              </motion.button>
            );
          })}
        </motion.div>

        {/* =================================================
            PROJECT GRID
        ================================================= */}

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -15,
            }}
            transition={{
              duration: reducedMotion ? 0 : 0.3,
            }}
          >
            {filteredProjects.length > 0 ? (
              <div
                className="
                  grid
                  grid-cols-1
                  items-stretch
                  gap-6
                  md:grid-cols-2
                  xl:grid-cols-3
                "
              >
                {filteredProjects.map(
                  (project, index) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      index={index}
                      dark={dark}
                      onPreview={setPreview}
                    />
                  )
                )}
              </div>
            ) : (
              /* ==========================================
                  EMPTY STATE
              ========================================== */

              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.95,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                className={`
                  mx-auto
                  max-w-xl
                  rounded-2xl
                  border
                  px-6
                  py-12
                  text-center

                  ${
                    dark
                      ? `
                        border-blue-200/20
                        bg-white/[0.07]
                      `
                      : `
                        border-blue-200
                        bg-white/80
                      `
                  }
                `}
              >
                <Layers
                  size={36}
                  className="
                    mx-auto
                    mb-4
                    text-cyan-400
                  "
                />

                <h3
                  className={`
                    mb-3
                    text-2xl
                    font-bold

                    ${
                      dark
                        ? 'text-white'
                        : 'text-slate-900'
                    }
                  `}
                >
                  No Projects Yet
                </h3>

                <p
                  className={`
                    mb-6
                    text-base

                    ${
                      dark
                        ? 'text-slate-300'
                        : 'text-slate-600'
                    }
                  `}
                >
                  There are currently no projects
                  in this category.
                </p>

                <button
                  type="button"
                  onClick={() =>
                    setSelectedCategory('all')
                  }
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-lg
                    bg-gradient-to-r
                    from-blue-600
                    to-cyan-500
                    px-5
                    py-2.5
                    font-semibold
                    text-white
                  "
                >
                  <Code2 size={17} />

                  View All Projects
                </button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* =================================================
            CONTACT CALL-TO-ACTION
        ================================================= */}

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
          }}
          transition={{
            duration: reducedMotion ? 0 : 0.6,
          }}
          className={`
            relative
            mt-16
            overflow-hidden
            rounded-[25px]
            border
            px-6
            py-11
            text-center
            sm:px-10

            ${
              dark
                ? `
                  border-cyan-300/20

                  bg-gradient-to-r
                  from-[#2b5688]
                  to-[#1a3c65]
                `
                : `
                  border-blue-200

                  bg-gradient-to-r
                  from-white
                  to-[#dceeff]
                `
            }
          `}
        >
          {/* BACKGROUND GLOW */}

          <div
            className="
              pointer-events-none
              absolute
              -right-20
              -top-20
              h-64
              w-64
              rounded-full
              bg-cyan-400/15
              blur-3xl
            "
          />

          <div className="relative z-10">
            {/* SMALL HEADING */}

            <span
              className={`
                mb-3
                inline-flex
                items-center
                gap-2
                text-sm
                font-bold
                uppercase
                tracking-wide

                ${
                  dark
                    ? 'text-cyan-200'
                    : 'text-blue-700'
                }
              `}
            >
              <Sparkles size={16} />

              Let's Collaborate
            </span>

            {/* MAIN HEADING */}

            <h2
              className={`
                mb-3
                text-3xl
                font-extrabold
                sm:text-4xl

                ${
                  dark
                    ? 'text-white'
                    : 'text-slate-900'
                }
              `}
            >
              Interested in My Work?
            </h2>

            {/* DESCRIPTION */}

            <p
              className={`
                mx-auto
                mb-7
                max-w-2xl
                text-base
                leading-relaxed
                sm:text-lg

                ${
                  dark
                    ? 'text-slate-300'
                    : 'text-slate-600'
                }
              `}
            >
              I enjoy building meaningful digital
              solutions and collaborating on
              creative projects.
            </p>

            {/* CONTACT BUTTON */}

            <Link
              to="/contact"
              className="
                group
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-gradient-to-r
                from-blue-600
                to-cyan-500
                px-7
                py-3.5
                text-base
                font-bold
                text-white
                shadow-lg
                shadow-blue-500/20
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-blue-500/40
              "
            >
              <Mail size={18} />

              Contact Me

              <ArrowUpRight
                size={18}
                className="
                  transition-transform
                  group-hover:translate-x-1
                  group-hover:-translate-y-1
                "
              />
            </Link>
          </div>
        </motion.section>
      </div>

      {/* =====================================================
          FULL-SIZE IMAGE PREVIEW MODAL
      ===================================================== */}

      <AnimatePresence>
        {preview && (
          <motion.div
            key="project-preview"
            role="dialog"
            aria-modal="true"
            aria-label={`${preview.title} image preview`}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={() =>
              setPreview(null)
            }
            className="
              fixed
              inset-0
              z-[100]
              flex
              items-center
              justify-center
              bg-slate-950/90
              p-4
              backdrop-blur-sm
              sm:p-8
            "
          >
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 20,
                scale: 0.96,
              }}
              onClick={(event) =>
                event.stopPropagation()
              }
              className="
                relative
                max-h-full
                w-full
                max-w-6xl
                overflow-hidden
                rounded-2xl
                border
                border-white/20
                bg-[#142b4a]
                p-3
                shadow-2xl
                sm:p-4
              "
            >
              {/* CLOSE BUTTON */}

              <button
                type="button"
                aria-label="Close image preview"
                onClick={() =>
                  setPreview(null)
                }
                className="
                  absolute
                  right-4
                  top-4
                  z-10
                  rounded-full
                  bg-slate-950/80
                  p-2
                  text-white
                  transition-colors
                  hover:bg-blue-600
                "
              >
                <X size={20} />
              </button>

              {/* FULL-SIZE IMAGE */}

              <img
                src={preview.image}
                alt={`${preview.title} enlarged preview`}
                className="
                  max-h-[78vh]
                  w-full
                  object-contain
                "
              />

              {/* PROJECT TITLE */}

              <p
                className="
                  mt-3
                  text-center
                  text-sm
                  font-semibold
                  text-slate-200
                "
              >
                {preview.title}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default Projects;