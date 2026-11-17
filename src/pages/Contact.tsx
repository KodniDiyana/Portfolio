import {
  useEffect,
  useRef,
  useState,
} from 'react';

import type {
  ChangeEvent,
  FormEvent,
} from 'react';

import {
  motion,
  useReducedMotion,
} from 'framer-motion';

import {
  Mail,
  MapPin,
  Phone,
  Send,
  Github,
  Linkedin,
  ArrowUpRight,
  MessageCircle,
  CheckCircle2,
  User,
  AtSign,
  FileText,
  Loader2,
} from 'lucide-react';

import { useTheme } from '../contexts/ThemeContext';
import { useToast } from '../hooks/use-toast';

/* =========================================================
   CONTACT INFORMATION
========================================================= */

const EMAIL = 'kodnidiyanadesilva123@gmail.com';

const WHATSAPP_NUMBER = '94742772707';

const contactInfo = [
  {
    icon: Mail,
    label: 'Email Address',
    value: EMAIL,
    href: `mailto:${EMAIL}`,
  },
  {
    icon: Phone,
    label: 'Phone / WhatsApp',
    value: '074 2772707',
    href: `https://wa.me/${WHATSAPP_NUMBER}`,
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Matara, Sri Lanka',
    href: '',
  },
];

/* =========================================================
   SOCIAL MEDIA
========================================================= */

const socialLinks = [
  {
    icon: Github,
    label: 'GitHub',
    href: 'https://github.com/KodniDiyana',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/kodni-diyana-651404382/',
  },
];

/* =========================================================
   FORM TYPES
========================================================= */

type ContactForm = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type FormErrors = Partial<
  Record<keyof ContactForm, string>
>;

const initialForm: ContactForm = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

/* =========================================================
   BLUE CURSOR SPARKLE ANIMATION
========================================================= */

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
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

    const finePointer = window.matchMedia(
      '(pointer: fine)'
    );

    if (!finePointer.matches) return;

    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    const particles: Particle[] = [];

    let animationFrame = 0;
    let lastSpawn = 0;
    let previousFrame = performance.now();

    /* Resize Canvas */

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

      canvas.style.width =
        `${window.innerWidth}px`;

      canvas.style.height =
        `${window.innerHeight}px`;

      ctx.setTransform(
        ratio,
        0,
        0,
        ratio,
        0,
        0
      );
    };

    /* Pointer Movement */

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

      if (now - lastSpawn < 25) return;

      lastSpawn = now;

      for (let i = 0; i < 3; i++) {
        particles.push({
          x:
            event.clientX +
            (Math.random() - 0.5) * 10,

          y:
            event.clientY +
            (Math.random() - 0.5) * 10,

          vx:
            (Math.random() - 0.5) * 1.8,

          vy:
            (Math.random() - 0.5) * 1.8,

          life: 1,

          size:
            Math.random() * 2 + 1,
        });
      }

      if (particles.length > 100) {
        particles.splice(
          0,
          particles.length - 100
        );
      }
    };

    /* Draw Sparkles */

    const animate = (now: number) => {
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

        const opacity = Math.max(
          particle.life,
          0
        );

        ctx.globalAlpha = opacity;

        ctx.fillStyle = dark
          ? '#67e8f9'
          : '#2563eb';

        ctx.shadowColor = dark
          ? '#38bdf8'
          : '#3b82f6';

        ctx.shadowBlur = 12;

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

      animationFrame =
        requestAnimationFrame(animate);
    };

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

    return () => {
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
   MAIN CONTACT PAGE
========================================================= */

export function Contact() {
  /* =====================================================
     THEME
  ===================================================== */

  const { theme } = useTheme();

  const dark = theme === 'dark';

  const reducedMotion = useReducedMotion();

  const { toast } = useToast();

  /* =====================================================
     FORM STATE
  ===================================================== */

  const [formData, setFormData] =
    useState<ContactForm>(initialForm);

  const [errors, setErrors] =
    useState<FormErrors>({});

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  /* =====================================================
     THEME STYLES
  ===================================================== */

  const heading = dark
    ? 'text-white'
    : 'text-slate-900';



  const muted = dark
    ? 'text-slate-300'
    : 'text-slate-600';

  const card = dark
    ? `
      border-blue-200/20
      bg-gradient-to-br
      from-[#2b5484]/95
      to-[#1d3b63]/95
      shadow-[0_18px_45px_rgba(5,20,45,0.22)]
    `
    : `
      border-blue-200
      bg-white/90
      shadow-[0_15px_40px_rgba(40,95,170,0.12)]
    `;

  const smallCard = dark
    ? `
      border-blue-200/15
      bg-white/[0.07]
      hover:border-cyan-300/40
      hover:bg-white/[0.12]
    `
    : `
      border-blue-100
      bg-blue-50/80
      hover:border-blue-300
      hover:bg-blue-100
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

  const inputStyle = dark
    ? `
      border-blue-200/20
      bg-[#15375e]/65
      text-white
      placeholder:text-slate-400
      focus:border-cyan-400
      focus:ring-cyan-400/20
    `
    : `
      border-blue-200
      bg-white
      text-slate-900
      placeholder:text-slate-400
      focus:border-blue-500
      focus:ring-blue-500/20
    `;

  /* =====================================================
     HANDLE INPUT CHANGE
  ===================================================== */

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: undefined,
    }));
  };

  /* =====================================================
     FORM VALIDATION
  ===================================================== */

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (formData.name.trim().length < 2) {
      newErrors.name =
        'Please enter at least 2 characters.';
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email.trim()
      )
    ) {
      newErrors.email =
        'Please enter a valid email address.';
    }

    if (formData.subject.trim().length < 3) {
      newErrors.subject =
        'Please enter a subject with at least 3 characters.';
    }

    if (formData.message.trim().length < 10) {
      newErrors.message =
        'Please enter at least 10 characters.';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /* =====================================================
     SEND MESSAGE TO WHATSAPP
  ===================================================== */

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (isSubmitting) return;

    if (!validate()) return;

    setIsSubmitting(true);

    const message = [
      'Hello Diyana,',
      '',
      `Name: ${formData.name.trim()}`,
      `Email: ${formData.email.trim()}`,
      `Subject: ${formData.subject.trim()}`,
      '',
      'Message:',
      formData.message.trim(),
    ].join('\n');

    const whatsappURL =
      `https://wa.me/${WHATSAPP_NUMBER}` +
      `?text=${encodeURIComponent(message)}`;

    const newWindow = window.open(
      whatsappURL,
      '_blank',
      'noopener,noreferrer'
    );

    if (newWindow) {
      toast({
        title: 'WhatsApp Opened',
        description:
          'Your message is ready. Press Send in WhatsApp to deliver it.',
      });

      setFormData(initialForm);

      setErrors({});
    } else {
      toast({
        title: 'Unable to Open WhatsApp',
        description:
          'Please allow pop-ups or use the WhatsApp contact link.',
        variant: 'destructive',
      });
    }

    setIsSubmitting(false);
  };

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
            ? `
              bg-gradient-to-br
              from-[#193a63]
              via-[#1d4671]
              to-[#122d50]
            `
            : `
              bg-gradient-to-br
              from-[#f4f9ff]
              via-[#e9f3ff]
              to-[#deedff]
            `
        }
      `}
    >
      {/* =================================================
          BACKGROUND DECORATION
      ================================================= */}

      <div
        aria-hidden="true"
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
            -left-40
            -top-40
            h-[550px]
            w-[550px]
            rounded-full
            bg-blue-400/10
            blur-[110px]
          "
        />

        <div
          className="
            absolute
            -right-40
            top-[30%]
            h-[550px]
            w-[550px]
            rounded-full
            bg-cyan-400/10
            blur-[110px]
          "
        />

        {/* Subtle Grid */}

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

      {/* =================================================
          BLUE CURSOR SPARKLE TRAIL
      ================================================= */}

      <CursorSparkles dark={dark} />

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
          lg:px-10
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
          className="
            mb-12
            text-center
          "
        >
          {/* Header Badge */}

          <div
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
            <span
              className="
                h-2
                w-2
                rounded-full
                bg-emerald-400
                animate-pulse
              "
            />

            Let's Connect
          </div>

          {/* Main Heading */}

          <h1
            className={`
              mb-5
              text-4xl
              font-extrabold
              tracking-tight
              sm:text-5xl
              lg:text-6xl

              ${heading}
            `}
          >
            Get In{' '}

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
              Touch
            </span>
          </h1>

          {/* Description */}

          <p
            className={`
              mx-auto
              max-w-2xl
              text-base
              leading-relaxed
              sm:text-lg

              ${muted}
            `}
          >
            Have a project in mind, a collaboration
            opportunity, or simply want to connect?
            Feel free to reach out!
          </p>

          {/* Decorative Line */}

          <motion.div
            initial={{
              width: 0,
            }}
            animate={{
              width: 100,
            }}
            transition={{
              duration: reducedMotion ? 0 : 0.7,
              delay: 0.2,
            }}
            className="
              mx-auto
              mt-6
              h-1
              rounded-full
              bg-gradient-to-r
              from-blue-500
              to-cyan-400
            "
          />
        </motion.header>

        {/* =================================================
            MAIN CONTACT LAYOUT
        ================================================= */}

        <div
          className="
            grid
            grid-cols-1
            items-start
            gap-7
            lg:grid-cols-3
          "
        >
          {/* =============================================
              LEFT COLUMN
          ============================================= */}

          <motion.div
            initial={{
              opacity: 0,
              x: -25,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: reducedMotion ? 0 : 0.6,
              delay: 0.1,
            }}
            className="
              space-y-6
              lg:col-span-1
            "
          >
            {/* ==========================================
                CONTACT INFORMATION CARD
            ========================================== */}

            <section
              className={`
                rounded-3xl
                border
                p-6
                transition-[border-color,box-shadow]
                duration-300

                ${card}
              `}
            >
              {/* Card Header */}

              <div className="mb-6">
                <div className="mb-4 flex items-center gap-3">
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
                    <MessageCircle size={23} />
                  </div>

                  <div>
                    <h2
                      className={`
                        text-xl
                        font-bold

                        ${heading}
                      `}
                    >
                      Contact Information
                    </h2>

                    <p
                      className={`
                        mt-1
                        text-sm

                        ${muted}
                      `}
                    >
                      Ways to reach me
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Details */}

              <div className="space-y-3">
                {contactInfo.map((item, index) => {
                  const Icon = item.icon;

                  const content = (
                    <>
                      {/* Icon */}

                      <div
                        className={`
                          flex
                          h-11
                          w-11
                          shrink-0
                          items-center
                          justify-center
                          rounded-xl

                          ${iconStyle}
                        `}
                      >
                        <Icon size={20} />
                      </div>

                      {/* Information */}

                      <div className="min-w-0 flex-1">
                        <p
                          className={`
                            text-xs
                            font-medium

                            ${muted}
                          `}
                        >
                          {item.label}
                        </p>

                        <p
                          className={`
                            mt-1
                            break-all
                            text-sm
                            font-semibold
                            leading-relaxed

                            ${heading}
                          `}
                        >
                          {item.value}
                        </p>
                      </div>

                      {/* External Link Icon */}

                      {item.href && (
                        <ArrowUpRight
                          size={16}
                          className={`
                            shrink-0
                            opacity-50
                            transition-all
                            group-hover:translate-x-0.5
                            group-hover:-translate-y-0.5
                            group-hover:opacity-100

                            ${
                              dark
                                ? 'text-cyan-300'
                                : 'text-blue-600'
                            }
                          `}
                        />
                      )}
                    </>
                  );

                  return (
                    <motion.div
                      key={item.label}
                      initial={{
                        opacity: 0,
                        y: 12,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        duration: reducedMotion
                          ? 0
                          : 0.45,
                        delay: index * 0.08,
                      }}
                    >
                      {item.href ? (
                        <a
                          href={item.href}
                          target={
                            item.href.startsWith('http')
                              ? '_blank'
                              : undefined
                          }
                          rel={
                            item.href.startsWith('http')
                              ? 'noopener noreferrer'
                              : undefined
                          }
                          className={`
                            group
                            flex
                            items-center
                            gap-3
                            rounded-xl
                            border
                            p-3.5
                            transition-all
                            duration-300
                            hover:-translate-y-0.5

                            ${smallCard}
                          `}
                        >
                          {content}
                        </a>
                      ) : (
                        <div
                          className={`
                            flex
                            items-center
                            gap-3
                            rounded-xl
                            border
                            p-3.5

                            ${smallCard}
                          `}
                        >
                          {content}
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </section>

            {/* ==========================================
                SOCIAL MEDIA CARD
            ========================================== */}

            <section
              className={`
                rounded-3xl
                border
                p-6

                ${card}
              `}
            >
              {/* Header */}

              <div className="mb-5">
                <h2
                  className={`
                    text-xl
                    font-bold

                    ${heading}
                  `}
                >
                  Connect With Me
                </h2>

                <p
                  className={`
                    mt-2
                    text-sm

                    ${muted}
                  `}
                >
                  Find me on professional platforms
                </p>
              </div>

              {/* Social Buttons */}

              <div className="grid grid-cols-2 gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;

                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit my ${social.label} profile`}
                      whileHover={
                        reducedMotion
                          ? undefined
                          : {
                              y: -4,
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
                        group
                        flex
                        items-center
                        justify-center
                        gap-2.5
                        rounded-xl
                        border
                        px-3
                        py-3.5
                        text-sm
                        font-semibold
                        transition-colors
                        duration-300

                        ${smallCard}
                        ${heading}
                      `}
                    >
                      <Icon size={19} />

                      {social.label}

                      <ArrowUpRight
                        size={14}
                        className="
                          opacity-60
                          transition-transform
                          group-hover:translate-x-0.5
                          group-hover:-translate-y-0.5
                        "
                      />
                    </motion.a>
                  );
                })}
              </div>
            </section>

            {/* Small Contact Note */}

            <div
              className={`
                flex
                items-start
                gap-3
                rounded-xl
                border
                p-4

                ${
                  dark
                    ? `
                      border-cyan-300/20
                      bg-cyan-300/[0.07]
                    `
                    : `
                      border-blue-200
                      bg-blue-50
                    `
                }
              `}
            >
              <CheckCircle2
                size={19}
                className="
                  mt-0.5
                  shrink-0
                  text-cyan-400
                "
              />

              <p
                className={`
                  text-sm
                  leading-relaxed

                  ${muted}
                `}
              >
                Email is preferred for project proposals
                and professional collaborations.
                WhatsApp is also available for
                direct communication.
              </p>
            </div>
          </motion.div>

          {/* =============================================
              RIGHT COLUMN — MESSAGE FORM
          ============================================= */}

          <motion.section
            initial={{
              opacity: 0,
              x: 25,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: reducedMotion ? 0 : 0.6,
              delay: 0.15,
            }}
            className={`
              rounded-3xl
              border
              p-6
              sm:p-8
              lg:col-span-2

              ${card}
            `}
          >
            {/* ==========================================
                FORM HEADER
            ========================================== */}

            <div
              className="
                mb-7
                flex
                items-start
                gap-4
              "
            >
              {/* Icon */}

              <div
                className={`
                  flex
                  h-13
                  w-13
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  p-3

                  ${iconStyle}
                `}
              >
                <Send size={24} />
              </div>

              {/* Heading */}

              <div>
                <h2
                  className={`
                    text-2xl
                    font-bold

                    ${heading}
                  `}
                >
                  Send a Message
                </h2>

                <p
                  className={`
                    mt-2
                    text-sm
                    leading-relaxed
                    sm:text-base

                    ${muted}
                  `}
                >
                  Fill out the form below and
                  continue to WhatsApp to send
                  your message.
                </p>
              </div>
            </div>

            {/* Divider */}

            <div
              className={`
                mb-7
                border-t

                ${
                  dark
                    ? 'border-white/15'
                    : 'border-blue-200'
                }
              `}
            />

            {/* ==========================================
                CONTACT FORM
            ========================================== */}

            <form
              onSubmit={handleSubmit}
              noValidate
              className="space-y-6"
            >
              {/* ======================================
                  NAME & EMAIL
              ====================================== */}

              <div
                className="
                  grid
                  grid-cols-1
                  gap-5
                  sm:grid-cols-2
                "
              >
                {/* NAME FIELD */}

                <div className="space-y-2.5">
                  <label
                    htmlFor="contact-name"
                    className={`
                      flex
                      items-center
                      gap-2
                      text-sm
                      font-semibold

                      ${heading}
                    `}
                  >
                    <User
                      size={16}
                      className="text-cyan-400"
                    />

                    Your Name

                    <span className="text-red-400">
                      *
                    </span>
                  </label>

                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={
                      errors.name
                        ? 'contact-name-error'
                        : undefined
                    }
                    className={`
                      h-12
                      w-full
                      rounded-xl
                      border
                      px-4
                      text-sm
                      outline-none
                      ring-4
                      ring-transparent
                      transition-all
                      duration-300

                      ${inputStyle}

                      ${
                        errors.name
                          ? 'border-red-400 ring-red-400/10'
                          : ''
                      }
                    `}
                  />

                  {errors.name && (
                    <p
                      id="contact-name-error"
                      role="alert"
                      className="text-xs text-red-400"
                    >
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* EMAIL FIELD */}

                <div className="space-y-2.5">
                  <label
                    htmlFor="contact-email"
                    className={`
                      flex
                      items-center
                      gap-2
                      text-sm
                      font-semibold

                      ${heading}
                    `}
                  >
                    <AtSign
                      size={16}
                      className="text-cyan-400"
                    />

                    Email Address

                    <span className="text-red-400">
                      *
                    </span>
                  </label>

                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={
                      errors.email
                        ? 'contact-email-error'
                        : undefined
                    }
                    className={`
                      h-12
                      w-full
                      rounded-xl
                      border
                      px-4
                      text-sm
                      outline-none
                      ring-4
                      ring-transparent
                      transition-all
                      duration-300

                      ${inputStyle}

                      ${
                        errors.email
                          ? 'border-red-400 ring-red-400/10'
                          : ''
                      }
                    `}
                  />

                  {errors.email && (
                    <p
                      id="contact-email-error"
                      role="alert"
                      className="text-xs text-red-400"
                    >
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* ======================================
                  SUBJECT FIELD
              ====================================== */}

              <div className="space-y-2.5">
                <label
                  htmlFor="contact-subject"
                  className={`
                    flex
                    items-center
                    gap-2
                    text-sm
                    font-semibold

                    ${heading}
                  `}
                >
                  <FileText
                    size={16}
                    className="text-cyan-400"
                  />

                  Subject

                  <span className="text-red-400">
                    *
                  </span>
                </label>

                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  placeholder="What would you like to discuss?"
                  value={formData.subject}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.subject)}
                  aria-describedby={
                    errors.subject
                      ? 'contact-subject-error'
                      : undefined
                  }
                  className={`
                    h-12
                    w-full
                    rounded-xl
                    border
                    px-4
                    text-sm
                    outline-none
                    ring-4
                    ring-transparent
                    transition-all
                    duration-300

                    ${inputStyle}

                    ${
                      errors.subject
                        ? 'border-red-400 ring-red-400/10'
                        : ''
                    }
                  `}
                />

                {errors.subject && (
                  <p
                    id="contact-subject-error"
                    role="alert"
                    className="text-xs text-red-400"
                  >
                    {errors.subject}
                  </p>
                )}
              </div>

              {/* ======================================
                  MESSAGE FIELD
              ====================================== */}

              <div className="space-y-2.5">
                <label
                  htmlFor="contact-message"
                  className={`
                    flex
                    items-center
                    gap-2
                    text-sm
                    font-semibold

                    ${heading}
                  `}
                >
                  <MessageCircle
                    size={16}
                    className="text-cyan-400"
                  />

                  Your Message

                  <span className="text-red-400">
                    *
                  </span>
                </label>

                <textarea
                  id="contact-message"
                  name="message"
                  rows={6}
                  placeholder="Tell me about your project, collaboration opportunity, or inquiry..."
                  value={formData.message}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={
                    errors.message
                      ? 'contact-message-error'
                      : undefined
                  }
                  className={`
                    min-h-[155px]
                    w-full
                    resize-y
                    rounded-xl
                    border
                    px-4
                    py-3.5
                    text-sm
                    leading-relaxed
                    outline-none
                    ring-4
                    ring-transparent
                    transition-all
                    duration-300

                    ${inputStyle}

                    ${
                      errors.message
                        ? 'border-red-400 ring-red-400/10'
                        : ''
                    }
                  `}
                />

                {errors.message && (
                  <p
                    id="contact-message-error"
                    role="alert"
                    className="text-xs text-red-400"
                  >
                    {errors.message}
                  </p>
                )}
              </div>

              {/* ======================================
                  SUBMIT BUTTON
              ====================================== */}

              <div
                className="
                  flex
                  flex-col
                  items-start
                  gap-4
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                "
              >
                {/* Button */}

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={
                    reducedMotion || isSubmitting
                      ? undefined
                      : {
                          y: -3,
                        }
                  }
                  whileTap={
                    reducedMotion || isSubmitting
                      ? undefined
                      : {
                          scale: 0.97,
                        }
                  }
                  className="
                    group
                    inline-flex
                    w-full
                    items-center
                    justify-center
                    gap-3
                    rounded-xl

                    bg-gradient-to-r
                    from-blue-600
                    to-cyan-500

                    px-7
                    py-3.5

                    text-sm
                    font-bold
                    text-white

                    shadow-lg
                    shadow-blue-500/20

                    transition-[box-shadow,opacity]
                    duration-300

                    hover:shadow-blue-500/40

                    disabled:cursor-not-allowed
                    disabled:opacity-60

                    sm:w-auto
                  "
                >
                  {isSubmitting ? (
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />
                  ) : (
                    <Send size={18} />
                  )}

                  {isSubmitting
                    ? 'Opening WhatsApp...'
                    : 'Send to WhatsApp'}

                  {!isSubmitting && (
                    <ArrowUpRight
                      size={17}
                      className="
                        transition-transform
                        group-hover:translate-x-0.5
                        group-hover:-translate-y-0.5
                      "
                    />
                  )}
                </motion.button>

                {/* Helper Text */}

                <div
                  className={`
                    flex
                    items-start
                    gap-2
                    text-xs
                    leading-relaxed

                    ${muted}
                  `}
                >
                  <CheckCircle2
                    size={15}
                    className="
                      mt-0.5
                      shrink-0
                      text-emerald-400
                    "
                  />

                  Review and send your
                  message in WhatsApp.
                </div>
              </div>
            </form>
          </motion.section>
        </div>
      </div>
    </main>
  );
}

export default Contact;