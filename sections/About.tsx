"use client";

import { Bebas_Neue, Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
});

export const techStack = {
  frontend: {
    title: "Frontend",
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "React.js",
      "Next.js",
      "Tailwind CSS",
      "Material UI",
    ],
  },

  backend: {
    title: "Backend & Databases",
    skills: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "Authentication",
      "Middleware",
      "MongoDB",
      "PostgreSQL",
      "SQLLite",
    ],
  },

  ui_styling: {
    title: "UI & Styling",
    skills: [
      "Responsive Design",
      "Framer Motion",
      "GSAP",
      "Modern UI/UX",
      "Animations",
    ],
  },

  others: {
    title: "Tools & Practices",
    skills: [
      "Git",
      "GitHub",
      "Clean Code",
      "Code Optimization",
      "Problem Solving (DSA)",
      "LeetCode Daily Practice",
    ],
  },
};

const headingColors = [
  "bg-emerald-500/90",
  "bg-sky-500/90",
  "bg-violet-500/90",
  "bg-amber-500/90",
];

const platformBadges = [
  {
    name: "JavaScript",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  {
    name: "TypeScript",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
  {
    name: "React",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "Next.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  },
  {
    name: "Node.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
  {
    name: "Express",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  },
  {
    name: "MongoDB",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  },
  {
    name: "PostgreSQL",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  },
  {
    name: "Tailwind",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  },
  {
    name: "Git",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  },
  {
    name: "GitHub",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  },
  {
    name: "Framer Motion",
    logo: "https://cdn.simpleicons.org/framer/ffffff",
  },
];

const About = () => {
  const techStackList = Object.values(techStack);
  const topMarqueeSkills = platformBadges;
  const bottomMarqueeSkills = [
    ...platformBadges.slice(4),
    ...platformBadges.slice(0, 4),
  ];

  return (
    <div
      className={`min-h-screen bg-slate-100 px-4 py-8 dark:bg-[#131313] dark:text-[#EDE1DF] sm:px-6 md:px-12 md:py-10 lg:px-20 ${spaceGrotesk.className}`}
      id="about"
    >
      <h1 className={`text-4xl font-medium sm:text-5xl ${bebasNeue.className} `}>ABOUT</h1>
      <div className="mt-6 flex flex-col justify-between gap-8 lg:flex-row lg:gap-10">
        <div className="w-full lg:max-w-[45%]">
          <p className="mt-4 text-sm leading-7 md:text-base">
            Hello! I&apos;m Samarth Chawla, a Full Stack Developer passionate
            about building scalable and high-performance web applications. I
            specialize in modern technologies like React, Next.js, and Node.js,
            with a strong focus on clean code, performance, and user
            experience. <br></br> <br></br>I have a solid foundation in Data
            Structures & Algorithms, which helps me write optimized and
            efficient solutions. I&apos;m committed to continuous learning,
            solving real-world problems, and building impactful projects.
          </p>
          <ul className="mt-6 flex list-inside flex-col gap-3 pl-1 sm:pl-4 md:pl-8">
            <li>
              <span className="font-medium">Name </span>: Samarth Chawla
            </li>
            <li>
              <span className="font-medium">Email </span>:
              mr.samarthchawla@gmail.com{" "}
            </li>
            <li>
              <span className="font-medium">Phone </span>: +91 9971445751
            </li>
            <li>
              <span className="font-medium">Location </span>: New Delhi, India
            </li>
            <li>
              <span className="font-medium">Language </span>: English, Hindi
            </li>
            <li>
              <span className="font-medium">Focus </span>: Web Development +
              DSA
            </li>
          </ul>
        </div>
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:w-1/2">
          {techStackList.map((stack, index) => (
            <div
              key={stack.title}
              className="rounded-xl border border-neutral-300 dark:border-white/20 bg-transparent overflow-hidden"
            >
              <div
                className={`px-4 py-2 text-sm md:text-base font-semibold text-white ${
                  headingColors[index % headingColors.length]
                }`}
              >
                {stack.title}
              </div>

              <div className="px-4 py-3">
                <div className="flex flex-wrap gap-2">
                  {stack.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md border border-neutral-300 dark:border-white/20 px-2.5 py-1 text-xs md:text-sm text-neutral-700 dark:text-neutral-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 space-y-3">
        <div className="relative overflow-hidden rounded-lg border border-neutral-300/70 py-2 dark:border-white/15">
          <div className="marquee-track">
            {[...topMarqueeSkills, ...topMarqueeSkills].map((skill, index) => (
              <span
                key={`top-${skill.name}-${index}`}
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-md border border-neutral-300 dark:border-white/20 px-3 py-1 text-xs md:text-sm text-neutral-700 dark:text-neutral-200 bg-white/40 dark:bg-white/[0.03]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={skill.logo}
                  alt={`${skill.name} logo`}
                  width={14}
                  height={14}
                  className="h-3.5 w-3.5 object-contain"
                  loading="lazy"
                />
                {skill.name}
              </span>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-slate-100 via-slate-100/90 to-transparent dark:from-[#131313] dark:via-[#131313]/90" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-slate-100 via-slate-100/90 to-transparent dark:from-[#131313] dark:via-[#131313]/90" />
        </div>

        <div className="relative overflow-hidden rounded-lg border border-neutral-300/70 py-2 dark:border-white/15">
          <div className="marquee-track marquee-reverse">
            {[...bottomMarqueeSkills, ...bottomMarqueeSkills].map(
              (skill, index) => (
                <span
                  key={`bottom-${skill.name}-${index}`}
                  className="inline-flex items-center gap-2 whitespace-nowrap rounded-md border border-neutral-300 dark:border-white/20 px-3 py-1 text-xs md:text-sm text-neutral-700 dark:text-neutral-200 bg-white/40 dark:bg-white/[0.03]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={skill.logo}
                    alt={`${skill.name} logo`}
                    width={14}
                    height={14}
                    className="h-3.5 w-3.5 object-contain"
                    loading="lazy"
                  />
                  {skill.name}
                </span>
              ),
            )}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-slate-100 via-slate-100/90 to-transparent dark:from-[#131313] dark:via-[#131313]/90" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-slate-100 via-slate-100/90 to-transparent dark:from-[#131313] dark:via-[#131313]/90" />
        </div>
      </div>
    </div>
  );
};

export default About;
