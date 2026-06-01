import { useState, useEffect } from 'react';
import { Mail, ExternalLink, ChevronDown, Menu, X, Code2, Brain, Palette, BarChart2, Cpu, Users, Linkedin, Instagram } from 'lucide-react';

const NAV_LINKS = ['About', 'Skills', 'Projects', 'Experience', 'Contact'];

const SKILLS = {
  'AI & Data': [
    { name: 'Prompt Engineering', level: 90 },
    { name: 'AI Tool Selection', level: 85 },
    { name: 'AI Literacy', level: 88 },
    { name: 'Python & PL/SQL', level: 70 },
    { name: 'MS Power BI / Excel', level: 75 },
  ],
  'Design & Technical': [
    { name: 'UI Design', level: 80 },
    { name: 'Unity (3D Design)', level: 72 },
    { name: 'Autodesk 3Ds Max', level: 65 },
    { name: 'Visual Basics', level: 60 },
    { name: 'SILVACO / Origin', level: 65 },
  ],
  'Core Competencies': [
    { name: 'Critical Thinking', level: 95 },
    { name: 'Market Analysis', level: 85 },
    { name: 'Stakeholder Management', level: 80 },
    { name: 'Financial Reporting', level: 75 },
    { name: 'Cross-Dept Collaboration', level: 88 },
  ],
};

const SKILL_ICONS: Record<string, React.ReactNode> = {
  'AI & Data': <Brain size={20} />,
  'Design & Technical': <Palette size={20} />,
  'Core Competencies': <Users size={20} />,
};

const PROJECTS = [
  {
    title: 'Morning Greetings',
    subtitle: 'Dynamic Web Application',
    description:
      'Engineered a time-aware web application that synchronizes user greetings with real-time clock data. Features a dynamic messaging engine serving 20 unique variations across four daily phases with a fully responsive UI.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Replit.AI'],
    link: 'https://herschelle-andy.github.io/DawnGreetings/',
    color: 'from-sky-500 to-cyan-400',
    icon: <Code2 size={24} />,
  },
  {
    title: 'Fantasy Cricket Game',
    subtitle: 'Full-Stack Application',
    description:
      'Platform for users to form virtual cricket teams scoring points based on real-life player performances. Features team creation, management UI, and a competitive ranking system backed by a relational database.',
    tech: ['Python', 'Qt Designer', 'SQLite Studio'],
    link: null,
    color: 'from-emerald-500 to-teal-400',
    icon: <BarChart2 size={24} />,
  },
  {
    title: 'Tourepedia Marketing Blueprint',
    subtitle: 'Business Strategy Project',
    description:
      'Analyzed the Indian Online Travel Market using ERRC grid and SWOT analysis. Developed a tailored marketing mix (4Ps) aligned with organizational goals and competitive positioning.',
    tech: ['ERRC Grid', 'SWOT Analysis', 'Market Research'],
    link: null,
    color: 'from-amber-500 to-orange-400',
    icon: <BarChart2 size={24} />,
  },
  {
    title: 'Human Development Index Review',
    subtitle: 'Data Research & Analysis',
    description:
      'Conducted a data-driven review of HDI methodologies focused on India. Calculated Inequality-adjusted HDI (IHDI), Multidimensional Poverty Index (MPI), and Gender Development Index (GDI).',
    tech: ['Data Analysis', 'Statistical Modeling', 'HDI Methodology'],
    link: null,
    color: 'from-rose-500 to-pink-400',
    icon: <Brain size={24} />,
  },
  {
    title: 'Solar Devices / OLEDs Simulation',
    subtitle: 'Optical & Electrical Engineering',
    description:
      'Simulated OLED performance using SILVACO, analyzing Continuity Equations and Schottky contact conditions. Evaluated and optimized OLED outcoupling efficiency through electroluminescence simulations.',
    tech: ['SILVACO', 'Electroluminescence', 'Schottky Analysis'],
    link: null,
    color: 'from-blue-500 to-sky-400',
    icon: <Cpu size={24} />,
  },
];

function useScrollSpy() {
  const [active, setActive] = useState('About');
  useEffect(() => {
    const handler = () => {
      for (const id of [...NAV_LINKS].reverse()) {
        const el = document.getElementById(id.toLowerCase());
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);
  return active;
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeSection = useScrollSpy();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <div className="bg-[#0a0f1e] text-white font-sans">
      {/* Nav */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-[#0a0f1e]/95 backdrop-blur-md shadow-lg shadow-black/20 border-b border-white/5' : ''
        }`}
      >
        <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-xl font-bold tracking-tight">
            Menu
          </span>
          <ul className="hidden md:flex gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link}>
                <button
                  onClick={() => scrollTo(link)}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    activeSection === link ? 'text-sky-400' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {link}
                </button>
              </li>
            ))}
          </ul>
          <button className="md:hidden text-gray-400 hover:text-white" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
        {menuOpen && (
          <div className="md:hidden bg-[#0d1427] border-t border-white/5 px-6 py-4 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                className="text-sm font-medium text-gray-300 hover:text-sky-400 text-left transition-colors"
              >
                {link}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Hero */}
      <section id="about" className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-6">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-sky-600/20 rounded-full blur-3xl" />
          <div className="absolute top-1/3 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-blue-700/15 rounded-full blur-3xl" />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)',
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto flex items-center justify-between gap-16 py-20">
          <div className="flex-1 max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 bg-sky-500/10 border border-sky-500/20 rounded-full px-4 py-1.5 text-sky-400 text-sm font-medium mb-8">
              <span className="w-2 h-2 bg-sky-400 rounded-full animate-pulse" />
              Available for opportunities
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-4 leading-tight">
              Hi, I&apos;m{' '}
              <span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">Ankit</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 font-light mb-6">AI Generalist & Prompt Engineer</p>
            <p className="text-gray-400 leading-relaxed mb-10 text-sm sm:text-base">
              Motivated and analytically driven professional transitioning into AI with hands-on skills in prompt
              engineering, AI tool selection, and AI literacy. Bringing 9+ years of structured problem-solving across
              business analysis, data research, and UI design.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollTo('Projects')}
                className="bg-sky-500 hover:bg-sky-400 text-white px-8 py-3 rounded-full font-medium transition-all duration-200 hover:shadow-lg hover:shadow-sky-500/30 hover:-translate-y-0.5"
              >
                View Projects
              </button>
              <button
                onClick={() => scrollTo('Contact')}
                className="border border-white/20 hover:border-sky-400/50 text-gray-300 hover:text-white px-8 py-3 rounded-full font-medium transition-all duration-200 hover:-translate-y-0.5"
              >
                Get in Touch
              </button>
            </div>
          </div>

          <div className="hidden lg:flex lg:flex-1 items-center justify-center flex-shrink-0">
            <div className="relative w-96 h-96">
              <div className="absolute inset-0 bg-gradient-to-br from-sky-500/40 to-cyan-500/30 rounded-full blur-3xl animate-pulse" />
              <div className="absolute inset-0 border-2 border-sky-400/40 rounded-full" />
              <img
                src="/LinkedInProfilePic.jpeg"
                alt="Ankit's Profile"
                className="relative w-full h-full object-cover rounded-full shadow-2xl shadow-sky-500/40 border-2 border-white/20 brightness-110 contrast-105"
              />
              <div className="absolute -inset-3 border-2 border-sky-400/20 rounded-full" />
            </div>
          </div>
        </div>

        <button
          onClick={() => scrollTo('Skills')}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-500 hover:text-sky-400 transition-colors animate-bounce"
        >
          <ChevronDown size={28} />
        </button>
      </section>

      {/* Skills */}
      <section id="skills" className="py-24 px-6 bg-[#0d1427]">
        <div className="max-w-6xl mx-auto">
          <SectionHeader label="Expertise" title="Skills & Competencies" />
          <div className="grid md:grid-cols-3 gap-8 mt-14">
            {Object.entries(SKILLS).map(([category, items]) => (
              <SkillCard key={category} category={category} items={items} icon={SKILL_ICONS[category]} />
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeader label="Work" title="Key Projects" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
            {PROJECTS.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="py-24 px-6 bg-[#0d1427]">
        <div className="max-w-4xl mx-auto">
          <SectionHeader label="Background" title="Experience" />
          <div className="mt-14 space-y-6">
            <ExperienceCard
              role="Game Designer & Developer (Intern)"
              company="Bhramm Technologies Private Ltd."
              type="Internship"
              highlights={[
                'Designed and developed an interactive 3D menu in Unity, enhancing UX with smooth navigation.',
                'Implemented object creation techniques and scripted functionalities for interactive elements; integrated high-quality 3D models.',
                'Applied advanced lighting, texturing, and shadowing techniques to create realistic, immersive environments.',
              ]}
              tech={['Unity', '3D Design', 'Scripting', 'UX']}
            />
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeader label="Let's Connect" title="Get in Touch" />
          <p className="text-gray-400 mt-6 mb-16 leading-relaxed text-center max-w-2xl mx-auto">
            I&apos;m actively looking for AI Generalist and Prompt Engineering opportunities. Whether you have a
            project, a role, or just want to connect — my inbox is always open.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <a
              href="https://linktr.ee/Ank_IT_GenAI"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit my Linktr.ee profile"
              className="animate-fade-in-up group relative h-48 bg-gradient-to-br from-[#0d1427] to-[#0a0f1e] border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:border-sky-400/50 hover:shadow-lg hover:shadow-sky-500/20 cursor-pointer flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-sky-500/0 to-sky-500/0 group-hover:from-sky-500/10 group-hover:to-sky-500/5 transition-all duration-300" />
              <div className="relative z-10 flex flex-col items-center justify-center gap-4">
                <div className="w-14 h-14 rounded-full bg-sky-500/15 flex items-center justify-center text-sky-400 group-hover:bg-sky-500/25 transition-all duration-300 group-hover:scale-110">
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M10.5 1.5H13.5V3H10.5V1.5ZM3 3.5H6V5.5H3V3.5ZM18 3.5H21V5.5H18V3.5ZM1.5 10.5V13.5H3V10.5H1.5ZM21 10.5V13.5H22.5V10.5H21ZM3 18V21H6V18H3ZM18 18V21H21V18H18ZM10.5 21V22.5H13.5V21H10.5Z" />
                  </svg>
                </div>
                <span className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors duration-300">Linktr.ee</span>
              </div>
            </a>

            <a
              href="https://www.linkedin.com/in/a-nk-i-t-gen-ai/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit my LinkedIn profile"
              className="animate-fade-in-up group relative h-48 bg-gradient-to-br from-[#0d1427] to-[#0a0f1e] border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:border-sky-400/50 hover:shadow-lg hover:shadow-sky-500/20 cursor-pointer flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-sky-500/0 to-sky-500/0 group-hover:from-sky-500/10 group-hover:to-sky-500/5 transition-all duration-300" />
              <div className="relative z-10 flex flex-col items-center justify-center gap-4">
                <div className="w-14 h-14 rounded-full bg-sky-500/15 flex items-center justify-center text-sky-400 group-hover:bg-sky-500/25 transition-all duration-300 group-hover:scale-110">
                  <Linkedin size={28} />
                </div>
                <span className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors duration-300">LinkedIn</span>
              </div>
            </a>

            <a
              href="https://www.instagram.com/a_nk_i_t_genai/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit my Instagram profile"
              className="animate-fade-in-up group relative h-48 bg-gradient-to-br from-[#0d1427] to-[#0a0f1e] border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:border-sky-400/50 hover:shadow-lg hover:shadow-sky-500/20 cursor-pointer flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-sky-500/0 to-sky-500/0 group-hover:from-sky-500/10 group-hover:to-sky-500/5 transition-all duration-300" />
              <div className="relative z-10 flex flex-col items-center justify-center gap-4">
                <div className="w-14 h-14 rounded-full bg-sky-500/15 flex items-center justify-center text-sky-400 group-hover:bg-sky-500/25 transition-all duration-300 group-hover:scale-110">
                  <Instagram size={28} />
                </div>
                <span className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors duration-300">Instagram</span>
              </div>
            </a>

            <a
              href="mailto:manachapandey@gmail.com"
              aria-label="Send me an email"
              className="animate-fade-in-up group relative h-48 bg-gradient-to-br from-[#0d1427] to-[#0a0f1e] border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:border-sky-400/50 hover:shadow-lg hover:shadow-sky-500/20 cursor-pointer flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-sky-500/0 to-sky-500/0 group-hover:from-sky-500/10 group-hover:to-sky-500/5 transition-all duration-300" />
              <div className="relative z-10 flex flex-col items-center justify-center gap-4">
                <div className="w-14 h-14 rounded-full bg-sky-500/15 flex items-center justify-center text-sky-400 group-hover:bg-sky-500/25 transition-all duration-300 group-hover:scale-110">
                  <Mail size={28} />
                </div>
                <span className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors duration-300">Email</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a0f1e] border-t border-white/5 py-8 px-6 text-gray-600 text-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-sky-400 font-medium">Ankit</span>
          <p className="text-center flex-1">
            Designed & built by <span className="text-sky-400 font-medium">Ankit</span> — AI Generalist & Prompt Engineer
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/in/a-nk-i-t-gen-ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-sky-400 transition-colors"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://www.instagram.com/a_nk_i_t_genai/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-sky-400 transition-colors"
            >
              <Instagram size={20} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function SectionHeader({ label, title }: { label: string; title: string }) {
  return (
    <div className="text-center">
      <p className="text-sky-400 text-sm font-semibold uppercase tracking-widest mb-3">{label}</p>
      <h2 className="text-3xl sm:text-4xl font-bold text-white">{title}</h2>
      <div className="mt-4 flex justify-center">
        <div className="h-1 w-12 bg-gradient-to-r from-sky-500 to-cyan-400 rounded-full" />
      </div>
    </div>
  );
}

function SkillCard({
  category,
  items,
  icon,
}: {
  category: string;
  items: { name: string; level: number }[];
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-[#0a0f1e] border border-white/8 rounded-2xl p-6 hover:border-sky-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-500/5">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 rounded-xl bg-sky-500/15 flex items-center justify-center text-sky-400">{icon}</div>
        <h3 className="font-semibold text-white">{category}</h3>
      </div>
      <div className="space-y-4">
        {items.map(({ name, level }) => (
          <div key={name}>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-gray-300">{name}</span>
              <span className="text-gray-500">{level}%</span>
            </div>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-sky-500 to-cyan-400 rounded-full transition-all duration-1000"
                style={{ width: `${level}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectCard({
  title,
  subtitle,
  description,
  tech,
  link,
  color,
  icon,
}: {
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  link: string | null;
  color: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="group bg-[#0d1427] border border-white/8 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/40 flex flex-col">
      <div className={`h-1.5 bg-gradient-to-r ${color}`} />
      <div className="p-6 flex flex-col flex-1">
        <div
          className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white mb-4 opacity-90`}
        >
          {icon}
        </div>
        <h3 className="font-bold text-lg text-white mb-1">{title}</h3>
        <p className="text-xs text-gray-500 mb-3 font-medium uppercase tracking-wide">{subtitle}</p>
        <p className="text-gray-400 text-sm leading-relaxed mb-5 flex-1">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tech.map((t) => (
            <span key={t} className="bg-white/5 border border-white/8 text-gray-400 text-xs px-2.5 py-1 rounded-full">
              {t}
            </span>
          ))}
        </div>
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sky-400 hover:text-sky-300 text-sm font-medium transition-colors"
          >
            Live Demo <ExternalLink size={13} />
          </a>
        )}
      </div>
    </div>
  );
}

function ExperienceCard({
  role,
  company,
  type,
  highlights,
  tech,
}: {
  role: string;
  company: string;
  type: string;
  highlights: string[];
  tech: string[];
}) {
  return (
    <div className="bg-[#0a0f1e] border border-white/8 rounded-2xl p-6 hover:border-sky-500/20 transition-all duration-300">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
        <div>
          <h3 className="font-bold text-white text-lg">{role}</h3>
          <p className="text-sky-400 text-sm font-medium mt-0.5">{company}</p>
        </div>
        <span className="inline-block bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap h-fit">
          {type}
        </span>
      </div>
      <ul className="space-y-2 mb-5">
        {highlights.map((h, i) => (
          <li key={i} className="flex gap-3 text-sm text-gray-400">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-sky-500/60 shrink-0" />
            {h}
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-2">
        {tech.map((t) => (
          <span key={t} className="bg-white/5 border border-white/8 text-gray-400 text-xs px-2.5 py-1 rounded-full">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
