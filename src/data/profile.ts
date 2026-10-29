export const profile = {
  name: "Kevin Ciang",
  intro:
    "Senior software engineer with eight years of experience, mostly frontend for B2B SaaS. Most recently led the frontend of a leadership assessment platform for a Singapore company. Based in Medan, working Singapore hours.",
  availability: "Open to senior/staff roles",
  city: "Medan",
  timeZone: "Asia/Jakarta",
  timeZoneLabel: "WIB",
  email: "kevinciang1006@gmail.com",
  github: "https://github.com/kevinciang1006",
  linkedin: "https://www.linkedin.com/in/kevinciang1006/",
  contactHeading: "Hiring for a senior or staff role? Let’s talk.",
  contactNote:
    "Remote from Medan (UTC+7), same working hours as Singapore. I usually reply within a day.",
};

export interface Job {
  org: string;
  role: string;
  when: string;
  note: string;
  current?: boolean;
  project?: string; // slug of a portfolio entry showing this work
}

export const experience: Job[] = [
  {
    org: "Organisation Solutions",
    role: "Senior Software Engineer",
    when: "Jun 2025 – Apr 2026",
    project: "organisation-solutions",
    note: "Led the frontend of a leadership-assessment SaaS platform. Integrated WorkOS, Stripe, PostHog, Courier and Puppeteer.",
  },
  {
    org: "Produgie",
    role: "Senior Software Engineer",
    when: "Feb 2022 – May 2025",
    project: "produgie",
    note: "Owned the Sprint module across Angular assessment platforms (GLA / GL360) and its end-to-end tests.",
  },
  {
    org: "ProSpark",
    role: "Dev Team Lead · Full Stack Developer",
    when: "Feb 2021 – Feb 2022",
    project: "prospark",
    note: "Led a team of five on LMS customization for clients including Gojek and Pizza Hut.",
  },
  {
    org: "Maximize Play",
    role: "Full Stack & Game Developer",
    when: "Mar 2017 – Feb 2021",
    project: "maximize-play",
    note: "Built web and mobile apps plus games, from the UI to real-time game logic.",
  },
];

export interface SkillGroup {
  name: string;
  items: string[];
}

export const skills: SkillGroup[] = [
  {
    name: "Frontend",
    items: ["TypeScript", "React", "Next.js", "Angular", "Vue", "Tailwind", "Testing Library", "Vitest", "Cypress"],
  },
  { name: "Backend", items: ["Node.js", "NestJS", "FastAPI", "PostgreSQL", "Supabase", "REST", "GraphQL", "Redis"] },
  {
    name: "Infra",
    items: ["AWS", "Google Cloud Run", "Docker", "GitHub Actions", "Vercel"],
  },
];
