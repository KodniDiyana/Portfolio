import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Mail, MapPin, Phone, Send, Github, Linkedin, Twitter } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { useToast } from '../hooks/use-toast';

/* ───────────────── Data (unchanged) ───────────────── */
const contactInfo = [
  { icon: Mail, label: 'Email', value: 'kodnidiyanadesilva123@gmail.com', href: 'mailto:kodnidiyanadesilva123@gmail.com' },
  { icon: Phone, label: 'Phone', value: '074 2772707', href: 'tel:+94742772707' },
  { icon: MapPin, label: 'Location', value: 'Sri lanka, Matara', href: '#' },
];

const socialLinks = [
  { icon: Github, label: 'GitHub', href: 'https://github.com' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com' },
  { icon: Twitter, label: 'Twitter', href: 'https://twitter.com' },
];

/* ───────────────── Cursor spotlight hook ───────────────── */
function useCursorGlow() {
  const ref = useRef<HTMLDivElement | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 140, damping: 18, mass: 0.25 });
  const sy = useSpring(my, { stiffness: 140, damping: 18, mass: 0.25 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      mx.set(e.clientX - r.left);
      my.set(e.clientY - r.top);
    };
    el.addEventListener('mousemove', onMove);
    return () => el.removeEventListener('mousemove', onMove);
  }, [mx, my]);

  const background = useTransform([sx, sy], ([x, y]) =>
    `radial-gradient(280px 240px at ${x}px ${y}px, rgba(99,102,241,0.18), rgba(14,165,233,0.08) 35%, rgba(2,6,23,0) 70%)`
  );
  return { ref, style: { backgroundImage: background as unknown as string } };
}

/* ───────────────── Anim variants ───────────────── */
const fadeUp = (d = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, delay: d } },
});
const slideIn = (d = 0, x = 24) => ({
  initial: { opacity: 0, x },
  animate: { opacity: 1, x: 0, transition: { duration: 0.5, delay: d } },
});

export function Contact() {
  const { toast } = useToast();

  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<{[k:string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { ref: sceneRef, style: glowStyle } = useCursorGlow();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors(prev => ({ ...prev, [e.target.name]: '' }));
  };

  // lightweight validation
  const validate = () => {
    const e: {[k:string]: string} = {};
    if (formData.name.trim().length < 2) e.name = 'Please enter at least 2 characters.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = 'Enter a valid email address.';
    if (formData.subject.trim().length < 3) e.subject = 'Add a short subject.';
    if (formData.message.trim().length < 10) e.message = 'Tell me a bit more (10+ chars).';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 1500));

    toast({
      title: 'Message sent successfully!',
      description: "Thank you for reaching out. I'll get back to you soon.",
    });

    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  /* ───────────────── Decorative background ───────────────── */
  const Background = useMemo(() => (
    <div className="pointer-events-none absolute inset-0">
      {/* soft grid */}
      <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:56px_56px]" />
      {/* gradient orbs */}
      <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full blur-3xl opacity-25 bg-indigo-500" />
      <div className="absolute -bottom-28 -right-28 h-80 w-80 rounded-full blur-3xl opacity-20 bg-cyan-400" />
    </div>
  ), []);

  // glass + border wrapper
  const shell = 'relative rounded-2xl p-[1px] bg-[linear-gradient(180deg,rgba(255,255,255,0.14),rgba(255,255,255,0.04))]';
  const panel = 'rounded-2xl bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/45 border border-white/10';

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* interactive glow layer */}
      <motion.div ref={sceneRef} style={glowStyle as any} className="pointer-events-none absolute inset-0" />
      {Background}

      <div className="max-w-6xl mx-auto relative">
        {/* header */}
        <motion.div {...fadeUp(0)} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs border border-white/10 bg-white/5 backdrop-blur mb-4">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Typically replies within 24 hours
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
              Get In Touch
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or just want to chat? Feel free to reach out!
          </p>
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 200, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mx-auto mt-5 h-[3px] rounded-full bg-gradient-to-r from-indigo-400 via-sky-400 to-cyan-300"
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* left column */}
          <motion.div {...slideIn(0.05, -24)} className="lg:col-span-1 space-y-6">
            {/* contact info */}
            <div className={shell}>
              <Card className={panel}>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>Ways to reach me</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {contactInfo.map((item, i) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      initial={{ opacity: 0, x: -14 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + i * 0.07 }}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-colors group"
                    >
                      <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">{item.label}</div>
                        <div className="text-sm font-medium">{item.value}</div>
                      </div>
                    </motion.a>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* socials */}
            <div className={shell}>
              <Card className={panel}>
                <CardHeader>
                  <CardTitle>Social Media</CardTitle>
                  <CardDescription>Connect with me online</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-3">
                    {socialLinks.map((s, i) => (
                      <motion.a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.25 + i * 0.08, type: 'spring', stiffness: 260, damping: 18 }}
                        whileHover={{ y: -2, rotate: -3 }}
                        whileTap={{ scale: 0.98 }}
                        aria-label={s.label}
                        className="w-11 h-11 rounded-xl bg-primary/10 border border-white/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        <s.icon className="w-[18px] h-[18px]" />
                      </motion.a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* mini note */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="text-xs text-muted-foreground px-1"
            >
              Prefer email for proposals & collaborations. Phone for urgent matters only.
            </motion.div>
          </motion.div>

          {/* right column – form */}
          <motion.div {...slideIn(0.12, 24)} className="lg:col-span-2">
            <div className={shell}>
              <Card className={panel}>
                <CardHeader className="pb-2">
                  <CardTitle>Send a Message</CardTitle>
                  <CardDescription>Fill out the form and I’ll get back to you shortly</CardDescription>
                </CardHeader>

                {/* slim divider with gradient */}
                <div className="px-6">
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                </div>

                <CardContent className="pt-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <div className="relative">
                          <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 opacity-60">
                            <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 12a5 5 0 1 0-5-5a5 5 0 0 0 5 5m0 2c-4.33 0-8 2-8 5v1h16v-1c0-3-3.67-5-8-5"/></svg>
                          </div>
                          <Input
                            id="name"
                            name="name"
                            placeholder="Your name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            aria-invalid={!!errors.name}
                            className={`pl-10 focus-visible:ring-2 focus-visible:ring-indigo-400/60 ${errors.name ? 'border-red-500/60' : ''}`}
                          />
                        </div>
                        {errors.name && (
                          <p className="text-xs text-red-400" role="alert">{errors.name}</p>
                        )}
                      </div>

                      {/* Email */}
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                          <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 opacity-60">
                            <Mail className="w-4 h-4" />
                          </div>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="your.email@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            aria-invalid={!!errors.email}
                            className={`pl-10 focus-visible:ring-2 focus-visible:ring-indigo-400/60 ${errors.email ? 'border-red-500/60' : ''}`}
                          />
                        </div>
                        {errors.email && (
                          <p className="text-xs text-red-400" role="alert">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    {/* Subject */}
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <div className="relative">
                        <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 opacity-60">
                          <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M5 4h14v2H5zm0 7h14v2H5zm0 7h10v2H5z"/></svg>
                        </div>
                        <Input
                          id="subject"
                          name="subject"
                          placeholder="What's this about?"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          aria-invalid={!!errors.subject}
                          className={`pl-10 focus-visible:ring-2 focus-visible:ring-indigo-400/60 ${errors.subject ? 'border-red-500/60' : ''}`}
                        />
                      </div>
                      {errors.subject && (
                        <p className="text-xs text-red-400" role="alert">{errors.subject}</p>
                      )}
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <div className="relative">
                        <div className="pointer-events-none absolute left-3 top-3 opacity-60">
                          <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M2 4h20v12H6l-4 4z"/></svg>
                        </div>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Tell me about your project or inquiry..."
                          rows={6}
                          value={formData.message}
                          onChange={handleChange}
                          required
                          aria-invalid={!!errors.message}
                          className={`pl-10 focus-visible:ring-2 focus-visible:ring-indigo-400/60 ${errors.message ? 'border-red-500/60' : ''}`}
                        />
                      </div>
                      {errors.message && (
                        <p className="text-xs text-red-400" role="alert">{errors.message}</p>
                      )}
                    </div>

                    {/* Submit */}
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto relative overflow-hidden group"
                    >
                      {/* shimmer */}
                      <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="absolute -inset-1 bg-gradient-to-r from-indigo-400/0 via-indigo-400/30 to-indigo-400/0 blur-sm [mask-image:linear-gradient(90deg,transparent,white,transparent)] animate-[shimmer_2s_infinite]" />
                      </span>

                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          >
                            <Send className="w-4 h-4 mr-2" />
                          </motion.div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>

      {/* keyframes */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
