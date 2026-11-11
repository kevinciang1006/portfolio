export const profile = {
  name: "Kevin Ciang",
  personal: "Outside work I'm out with my family: trips, eating out, or just getting outside and touching grass.",
  tagline: "I build the frontend of B2B SaaS, down to the last printed page.",
  intro:
    "Senior software engineer, eight years in, mostly frontend. Most recently I led the frontend of a leadership-assessment platform for a Singapore consultancy, used by Schneider Electric and Santen Pharmaceutical. Based in Medan, working Singapore hours.",
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
    note: "Led the frontend of a leadership-assessment SaaS platform that has generated 1,000+ branded PDF reports. Integrated WorkOS, Stripe, PostHog, Courier and Puppeteer.",
  },
  {
    org: "Produgie",
    role: "Senior Software Engineer",
    when: "Feb 2022 – May 2025",
    project: "produgie",
    note: "Owned the Sprint module across Angular assessment platforms (GLA / GL360) and its end-to-end tests. Used by hundreds of leaders at 3M, Gojek and Schneider Electric.",
  },
  {
    org: "ProSpark",
    role: "Dev Team Lead · Full Stack Developer",
    when: "Feb 2021 – Feb 2022",
    project: "prospark",
    note: "Led a team of five on LMS customization for clients including Gojek and Pizza Hut, each with thousands of users.",
  },
  {
    org: "Maximize Play",
    role: "Full Stack & Game Developer",
    when: "Mar 2017 – Feb 2021",
    project: "maximize-play",
    note: "Built web and mobile apps plus games, from the UI to real-time game logic, including a car-audio competition platform still in use since 2019: ~300 events, 3,340 competitors, 910 judges.",
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
