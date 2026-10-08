export const profile = {
  name: "Kevin Ciang",
  intro:
    "Senior software engineer with eight years in frontend, now building fullstack and AI applications for Singapore teams from Medan, Indonesia.",
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
}

export const experience: Job[] = [
  {
    org: "Organisation Solutions",
    role: "Senior Software Engineer",
    when: "2024 – Now", // check dates
    current: true,
    note: "Leading the frontend of a leadership-assessment SaaS platform. Integrated WorkOS, Stripe, PostHog, Courier and Puppeteer.",
  },
  {
    org: "Produgie",
    role: "Senior Software Engineer",
    when: "2021 – 2024", // check dates
    note: "Owned the Sprint module across Angular assessment platforms (GLA / GL360) and its end-to-end tests.",
  },
  {
    org: "ProSpark",
    role: "Dev Team Lead · Full Stack Developer",
    when: "2019 – 2021", // check dates
    note: "Led a team of five on LMS customization for clients including Gojek and Pizza Hut.",
  },
  {
    org: "Maximize Play",
    role: "Full Stack & Game Developer",
    when: "2017 – 2019", // check dates
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
    items: ["TypeScript", "React", "Next.js", "Angular", "Tailwind", "Testing Library", "Playwright"],
  },
  { name: "Backend", items: ["Node.js", "NestJS", "PostgreSQL", "REST", "GraphQL", "Redis"] },
  {
    name: "Infra & AI",
    items: ["AWS", "Docker", "CI/CD", "Vercel", "LLM APIs", "RAG", "Vector search"],
  },
];
