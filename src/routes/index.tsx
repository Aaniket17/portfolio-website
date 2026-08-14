import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Copy,
  Check,
  ArrowUp,
  ExternalLink,
  Rocket,
  FileDown,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import resumeAsset from "@/assets/resume.pdf.asset.json";
import profileAsset from "@/assets/passport_pic_1.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aniket Kumar — Full Stack MERN Developer Portfolio" },
      {
        name: "description",
        content:
          "Portfolio of Aniket Kumar, Full Stack Web Developer specializing in the MERN stack, real-time systems and modern UI engineering.",
      },
      { property: "og:title", content: "Aniket Kumar — Full Stack MERN Developer" },
      {
        property: "og:description",
        content:
          "Scalable web apps, real-time systems and modern UI engineering. Projects, experience and contact.",
      },
    ],
  }),
  component: Portfolio,
});

const NAV = ["About", "Skills", "Experience", "Projects", "Education", "Contact"];

const STATS = [
  { icon: "🎓", value: "8.4 CGPA", label: "B.Tech Information Technology", tone: "grad-text" },
  { icon: "💼", value: "10+ Months", label: "Hands-on Full Stack & MERN Experience", tone: "grad-text-neon" },
  { icon: "🏆", value: "Top 50", label: "Hack-Hackathon Finalist", tone: "grad-text" },
  { icon: "🌐", value: "Open Source", label: "Hacktoberfest Contributor", tone: "grad-text-neon" },
];

const SKILLS: { group: string; items: string[]; tone: "indigo" | "emerald" | "amber" }[] = [
  {
    group: "Frontend",
    tone: "indigo",
    items: ["React.js", "JavaScript (ES6+)", "HTML5", "CSS3", "Tailwind CSS", "Responsive UI"],
  },
  {
    group: "Backend & APIs",
    tone: "emerald",
    items: ["Node.js", "Express.js", "RESTful APIs", "Socket.io (WebSockets)", "Authentication (OAuth/Passport)"],
  },
  { group: "Database", tone: "amber", items: ["MongoDB", "Mongoose", "SQL / DBMS"] },
  {
    group: "Core CS",
    tone: "indigo",
    items: ["Data Structures & Algorithms", "System Design", "Computer Networks", "Operating Systems"],
  },
  { group: "Languages", tone: "emerald", items: ["C", "C++", "Python", "Java"] },
  {
    group: "Developer Tools",
    tone: "amber",
    items: ["Git", "GitHub", "Agile / Scrum", "CI/CD pipelines", "VS Code"],
  },
];

const GH = "https://github.com/Aaniket17";
const LINKEDIN = "https://www.linkedin.com/in/aniketkumar17/";
const GMAIL_COMPOSE = "https://mail.google.com/mail/?view=cm&fs=1&to=aniketkumar.2000.17@gmail.com";


const PROJECTS = [
  {
    title: "Cryptocurrency Analytics Platform",
    emoji: "📈",
    description:
      "Real-time interactive cryptocurrency monitoring dashboard with dynamic price tracking, charts, and filtering.",
    tech: ["React", "Node.js", "Express.js", "Chart.js", "HTML/CSS"],
    repo: GH,
    demo: GH,
  },
  {
    title: "Distributed Chat-Room Application",
    emoji: "💬",
    description:
      "Real-time multi-user communication platform built using Socket.io and a distributed client-server architecture.",
    tech: ["Socket.io", "Node.js", "JavaScript", "WebSockets"],
    repo: GH,
    demo: null,
  },
  {
    title: "Sorting Visualizer",
    emoji: "🧮",
    description:
      "Interactive visual algorithm tool allowing users to adjust array sizes and visualization speeds for classic sorting algorithms.",
    tech: ["JavaScript", "HTML5 Canvas", "Algorithms"],
    repo: GH,
    demo: null,
  },
];

const EXPERIENCE = [
  {
    org: "Masai School",
    role: "Full Stack Web Development (Remote)",
    period: "June 2024 – Present",
    detail:
      "Hands-on immersion in full-stack MERN development, DSA, scalable system architecture, and agile sprints.",
  },
  {
    org: "Tathastu Scholar",
    role: "Web Development Intern",
    period: "Sep 2023 – Dec 2023",
    detail:
      "Engineered a student course portal; implemented secure OAuth (Google, Facebook) and Passport Local authentication.",
  },
  {
    org: "HCL Technologies",
    role: "Technical Support Specialist",
    period: "Dec 2020 – Jan 2021",
    detail:
      "Delivered hardware/software diagnostic resolutions and troubleshooting for enterprise client systems.",
  },
];

const EDUCATION = [
  {
    title: "B.Tech in Information Technology",
    place: "Dr. Ambedkar Institute of Technology for Handicapped (AITH), Kanpur",
    meta: "CGPA 8.4",
    year: "2023",
  },
  {
    title: "Diploma in Electrical Engineering",
    place: "ITM Gorakhpur",
    meta: "75.68%",
    year: "2020",
  },
  {
    title: "Certification — Web Design & Development",
    place: "Easy CAD Solutions",
    meta: "Certified",
    year: "—",
  },
];

const EMAIL = "aniketkumar.2000.17@gmail.com";
const PHONE = "+91-7007437359";

const toneClass: Record<string, string> = {
  indigo: "border-indigo/40 text-indigo bg-indigo/10",
  emerald: "border-emerald/40 text-emerald bg-emerald/10",
  amber: "border-amber/40 text-amber bg-amber/10",
};

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mx-auto w-full max-w-6xl scroll-mt-24 px-5 py-20">
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] grad-text-neon">{eyebrow}</p>
      <h2 className="mb-10 text-3xl font-extrabold sm:text-4xl">
        <span className="grad-text">{title}</span>
      </h2>
      {children}
    </section>
  );
}

function Portfolio() {
  const [copied, setCopied] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  const copy = async (value: string, key: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(key);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopied(null), 1600);
    } catch {
      toast.error("Couldn't copy — please copy manually");
    }
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setSending(true);
    const subject = encodeURIComponent(String(data.get("subject") || "Portfolio enquiry"));
    const body = encodeURIComponent(
      `Name: ${data.get("name")}\nEmail: ${data.get("email")}\n\n${data.get("message")}`,
    );
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    toast.success("Opening your mail app…");
    setTimeout(() => {
      setSending(false);
      form.reset();
    }, 900);
  };

  return (
    <div className="min-h-screen">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-surface-border/60 bg-background/70 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <a href="#top" className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl btn-gradient font-display text-sm font-bold">
              A
            </span>
            <span className="font-display text-lg font-bold grad-text">Aniket Kumar</span>
          </a>
          <ul className="hidden items-center gap-7 lg:flex">
            {NAV.map((n) => (
              <li key={n}>
                <a
                  href={`#${n.toLowerCase()}`}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {n}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            className="rounded-full btn-gradient px-5 py-2 text-sm font-semibold ring-glow"
          >
            Hire Me
          </a>
        </nav>
      </header>

      {/* HERO */}
      <section id="top" className="relative mx-auto max-w-6xl px-5 pb-10 pt-16 sm:pt-24 lg:pt-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-14">
          {/* TEXT COLUMN */}
          <div className="order-2 text-center lg:order-1 lg:text-left">
            <span className="inline-flex animate-float items-center gap-2 rounded-full border border-emerald/40 bg-emerald/10 px-4 py-1.5 text-xs font-semibold text-emerald">
              <span className="animate-pulse-glow">🟢</span> Open to Software Engineer &amp; MERN Stack Roles
            </span>
            <h1 className="mt-7 text-4xl font-extrabold leading-[1.1] sm:text-5xl xl:text-6xl">
              Building <span className="grad-text">Scalable Web Apps</span> &amp;{" "}
              <span className="grad-text-neon">Digital Experiences</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:mx-0">
              Hi, I&apos;m Aniket Kumar — Full Stack Web Developer specializing in the MERN Stack,
              distributed systems, and modern UI engineering.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3 lg:justify-start">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full btn-gradient px-6 py-3 text-sm font-semibold"
              >
                Explore Projects <Rocket className="h-4 w-4" />
              </a>
              <a
                href={resumeAsset.url}
                target="_blank"
                rel="noreferrer"
                download="AniketKumarResume.pdf"
                className="inline-flex items-center gap-2 rounded-full btn-glass px-6 py-3 text-sm font-semibold"
              >
                Download Resume <FileDown className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-10 flex justify-center lg:justify-start">
              <div className="flex items-center gap-2 rounded-full glass px-3 py-2">
                {[
                  { icon: Github, href: GH, label: "GitHub", ext: true },
                  { icon: Linkedin, href: "https://linkedin.com/in/Aniket", label: "LinkedIn", ext: true },
                  { icon: Mail, href: `mailto:${EMAIL}`, label: "Email", ext: false },
                  { icon: Phone, href: "tel:+917007437359", label: "Phone", ext: false },
                ].map(({ icon: Icon, href, label, ext }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    {...(ext ? { target: "_blank", rel: "noreferrer" } : {})}
                    className="grid h-11 w-11 place-items-center rounded-full border border-surface-border text-muted-foreground transition-all hover:-translate-y-1 hover:border-indigo/60 hover:text-foreground"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* PHOTO COLUMN */}
          <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
            <div className="group relative">
              {/* Soft ambient glow */}
              <div className="absolute -inset-16 -z-10 rounded-full bg-blue-500/10 blur-[120px] opacity-60 transition-opacity duration-1000 group-hover:opacity-100" />

              {/* Premium glass frame container */}
              <div className="animate-float">
                <div className="relative z-10 rounded-[2.5rem] bg-white/5 p-1 backdrop-blur-2xl border border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] sm:rounded-[3rem] sm:p-1.5 lg:rounded-[3.5rem]">
                  {/* Portrait inner wrapper */}
                  <div className="relative overflow-hidden rounded-[2.3rem] bg-card ring-1 ring-white/5 sm:rounded-[2.8rem] lg:rounded-[3.2rem]">
                    <img
                      src={profileAsset.url}
                      alt="Aniket Kumar — Full Stack Developer"
                      className="block h-72 w-60 object-cover object-top transition-transform duration-700 group-hover:scale-105 sm:h-80 sm:w-64 lg:h-96 lg:w-72"
                      loading="eager"
                    />
                    {/* Subtle gradient overlay for depth */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-white/5" />
                    {/* Inner reflection streak */}
                    <div className="pointer-events-none absolute -inset-full -translate-x-full rotate-45 bg-gradient-to-tr from-transparent via-white/5 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
                  </div>

                  {/* Availability indicator */}
                  <div className="absolute -bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-background/80 px-4 py-2 shadow-2xl backdrop-blur-xl">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.5)]" />
                    </span>
                    <span className="whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">
                      Available for hire
                    </span>
                  </div>
                </div>
              </div>

              {/* Outer technical corners */}
              <div className="absolute -right-2 -top-2 h-8 w-8 rounded-tr-2xl border-t border-r border-white/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute -bottom-2 -left-2 h-8 w-8 rounded-bl-2xl border-b border-l border-white/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-5 py-10 lg:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.value} className="glass p-5 text-center">
            <div className="text-2xl">{s.icon}</div>
            <div className={`mt-2 font-display text-xl font-extrabold ${s.tone}`}>{s.value}</div>
            <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* ABOUT */}
      <Section id="about" eyebrow="About" title="Engineer, builder, problem solver">
        <div className="grid gap-5 lg:grid-cols-3">
          <div className="glass p-7 lg:col-span-2">
            <p className="leading-relaxed text-muted-foreground">
              I&apos;m a Full Stack Developer from India with a B.Tech in Information Technology
              (8.4 CGPA). I build production-minded MERN applications — real-time dashboards,
              WebSocket-driven platforms and authentication systems — with a strong foundation in
              data structures, system design and networks. I care about clean architecture, fast
              interfaces and shipping things people actually use.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["MERN Stack", "Real-time Systems", "System Design", "Agile Delivery"].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-indigo/40 bg-indigo/10 px-3 py-1 text-xs font-medium text-indigo"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="glass flex flex-col justify-center gap-4 p-7">
            <Sparkles className="h-6 w-6 text-amber" />
            <p className="font-display text-lg font-bold">Currently</p>
            <p className="text-sm text-muted-foreground">
              Full Stack Web Development at Masai School — daily DSA, sprint-based team projects and
              scalable backend architecture.
            </p>
            <a href="#contact" className="text-sm font-semibold grad-text-neon">
              Let&apos;s work together →
            </a>
          </div>
        </div>
      </Section>

      {/* SKILLS */}
      <Section id="skills" eyebrow="Toolkit" title="Technical Skills Matrix">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SKILLS.map((s) => (
            <div key={s.group} className="glass p-6">
              <h3 className="mb-4 font-display text-lg font-bold">{s.group}</h3>
              <div className="flex flex-wrap gap-2">
                {s.items.map((i) => (
                  <span
                    key={i}
                    className={`rounded-lg border px-3 py-1 text-xs font-medium ${toneClass[s.tone]}`}
                  >
                    {i}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* PROJECTS */}
      <Section id="projects" eyebrow="Work" title="Featured Projects">
        <div className="grid gap-5 lg:grid-cols-3">
          {PROJECTS.map((p) => (
            <article key={p.title} className="glass flex flex-col p-6">
              <div className="text-3xl">{p.emoji}</div>
              <h3 className="mt-4 font-display text-xl font-bold">{p.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                {p.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-surface-border bg-secondary/50 px-3 py-1 text-[11px] font-medium text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex gap-2">
                <a
                  href={p.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full btn-glass px-4 py-2 text-xs font-semibold"
                >
                  <Github className="h-4 w-4" /> Repo
                </a>
                {p.demo && (
                  <a
                    href={p.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full btn-gradient px-4 py-2 text-xs font-semibold"
                  >
                    <ExternalLink className="h-4 w-4" /> Live Demo
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* EXPERIENCE */}
      <Section id="experience" eyebrow="Journey" title="Work & Practical Experience">
        <div className="relative border-l border-surface-border pl-6 sm:pl-10">
          {EXPERIENCE.map((e) => (
            <div key={e.org} className="relative mb-6 last:mb-0">
              <span className="absolute -left-[31px] top-7 grid h-3.5 w-3.5 place-items-center rounded-full btn-gradient sm:-left-[47px]" />
              <div className="glass p-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-display text-lg font-bold">{e.org}</h3>
                  <span className="rounded-full border border-amber/40 bg-amber/10 px-3 py-1 text-[11px] font-semibold text-amber">
                    {e.period}
                  </span>
                </div>
                <p className="mt-1 text-sm font-medium grad-text-neon">{e.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{e.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* EDUCATION */}
      <Section id="education" eyebrow="Background" title="Education & Credentials">
        <div className="grid gap-5 lg:grid-cols-3">
          {EDUCATION.map((ed) => (
            <div key={ed.title} className="glass p-6">
              <div className="flex items-center justify-between">
                <span className="rounded-full border border-indigo/40 bg-indigo/10 px-3 py-1 text-[11px] font-semibold text-indigo">
                  {ed.year}
                </span>
                <span className="font-display text-sm font-bold grad-text-neon">{ed.meta}</span>
              </div>
              <h3 className="mt-4 font-display text-lg font-bold leading-snug">{ed.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{ed.place}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="contact" eyebrow="Contact" title="Let's build something together">
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            {[
              { icon: Mail, label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
              { icon: Phone, label: "Phone", value: PHONE, href: "tel:+917007437359" },
              { icon: MapPin, label: "Location", value: "India", href: null },
            ].map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="glass flex items-center gap-4 p-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl btn-gradient">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">{label}</p>
                  {href ? (
                    <a href={href} className="block truncate text-sm font-semibold hover:underline">
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm font-semibold">{value}</p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => copy(value, label)}
                  aria-label={`Copy ${label}`}
                  className="grid h-9 w-9 place-items-center rounded-lg border border-surface-border text-muted-foreground transition-colors hover:text-foreground"
                >
                  {copied === label ? (
                    <Check className="h-4 w-4 text-emerald" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>
            ))}
          </div>

          <form onSubmit={onSubmit} className="glass flex flex-col gap-4 p-7">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field name="name" label="Name" placeholder="Your name" />
              <Field name="email" label="Email" type="email" placeholder="you@example.com" />
            </div>
            <Field name="subject" label="Subject" placeholder="Project / role enquiry" />
            <label className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Message
              </span>
              <textarea
                name="message"
                required
                rows={5}
                placeholder="Tell me about it…"
                className="w-full rounded-xl border border-surface-border bg-secondary/40 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-indigo"
              />
            </label>
            <button
              type="submit"
              disabled={sending}
              className="mt-1 inline-flex items-center justify-center gap-2 rounded-full btn-gradient px-6 py-3 text-sm font-semibold disabled:opacity-70"
            >
              {sending ? "Sending…" : "Send Message"} <Rocket className="h-4 w-4" />
            </button>
          </form>
        </div>
      </Section>

      <footer className="border-t border-surface-border/60 px-5 py-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Aniket Kumar. Built with React &amp; Tailwind.
          </p>
          <a
            href="#top"
            className="inline-flex items-center gap-2 rounded-full btn-glass px-4 py-2 text-xs font-semibold"
          >
            Back to top <ArrowUp className="h-4 w-4" />
          </a>
        </div>
      </footer>
    </div>
  );
}

function Field({
  name,
  label,
  type = "text",
  placeholder,
}: {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      <input
        name={name}
        type={type}
        required
        placeholder={placeholder}
        className="w-full rounded-xl border border-surface-border bg-secondary/40 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-indigo"
      />
    </label>
  );
}
