import { Resume } from "@/utils/types";

export const tools = [
  {
    type: "function",
    function: {
      name: "optimizeResume",
      description: "Extract and structure resume data",
      parameters: {
        type: "object",
        properties: {
          name: { type: "string" },
          contact: { type: "string" },
          summary: { type: "string" },
          skills: {
            type: "array",
            items: { type: "string" },
          },
          education: {
            type: "array",
            items: {
              type: "object",
              properties: {
                school: { type: "string" },
                degree: { type: "string" },
                startDate: { type: "string" },
                endDate: { type: "string" },
              },
              required: ["school", "degree"],
            },
          },
          experience: {
            type: "array",
            items: {
              type: "object",
              properties: {
                title: { type: "string" },
                company: { type: "string" },
                startDate: { type: "string" },
                endDate: { type: "string" },
                description: {
                  type: "array",
                  items: { type: "string" },
                },
              },
              required: ["title", "company", "startDate", "endDate"],
            },
          },
        },
        required: ["summary", "skills", "education", "experience"],
      },
    },
  },
] as const;

export const testResumeContent: Resume = {
  name: "Vladimir Mujakovic",
  contact:
    "(603) 703-3542 • vladimir.mujakovic@gmail.com • https://www.linkedin.com/in/vladimir-mjv",
  summary:
    "Frontend Engineer with a passion for building modern, engaging and responsive web applications.",
  skills: [
    "Vue3",
    "Vue2",
    "Vuetify",
    "Vuex",
    "Vue Router",
    "Pinia",
    "CSS",
    "HTML",
    "SCSS",
    "TypeScript",
    "JavaScript",
    "MongoDB",
    "GoLang",
    "Git",
    "Jest",
    "REST",
    "Webpack",
    "Vite",
    "Node.js",
    "Figma",
    "React",
    "PHP",
    "Liquid",
    "Zeplin",
    "Docker",
    "jQuery",
    "Python",
    "Django",
  ],
  education: [
    {
      school: "Southern New Hampshire University",
      degree: "M.Sc IT",
      startDate: "",
      endDate: "2017",
    },
    {
      school: "Southern New Hampshire University",
      degree: "BBA",
      startDate: "",
      endDate: "2014",
    },
  ],
  experience: [
    {
      title: "LEAD FRONTEND ENGINEER",
      company: "Foundant Technologies",
      startDate: "May 2022",
      endDate: "February 2025",
      description: [
        "Innovated frontend architecture company-wide by increasing focus on UI/UX, removing technological bottlenecks, and helping shape product design and technical implementation.",
        "Led development of new Vue3/TypeScript application upgrading from Vue2/Vuetify/JavaScript.",
        "Wrote reusable Vue3 TypeScript UI components setting frontend standards in organization.",
        "Mentored 3 junior engineers with critical code analysis and pair coding.",
        "Optimized APIs by reducing network loads, speeding up UI responsiveness 20%.",
        "Wrote Vue3/TypeScript POCs exploring the idea of upgrading legacy UI.",
        "Challenged design concepts by contributing to UI/UX mockups.",
        "Built UI prototypes to help Product team A/B test features with clients.",
      ],
    },
    {
      title: "FRONTEND DEVELOPER",
      company: "Freightwaves Inc.",
      startDate: "February 2021",
      endDate: "May 2022",
      description: [
        "Led frontend development for a multi-million-dollar enterprise SaaS platform.",
        "Modernized codebase by migrating to Vue3/TypeScript from Vue2/JavaScript/jQuery.",
        "Developed an intuitive dashboard for the logistics industry.",
        "Built complex data visualizations with D3.js.",
        "Collaborated with backend team to optimize APIs and improve frontend performance.",
      ],
    },
    {
      title: "SENIOR FRONTEND SOFTWARE ENGINEER",
      company: "AirTank Inc.",
      startDate: "September 2018",
      endDate: "February 2021",
      description: [
        "Developed custom user-facing features and dynamic web components for ecommerce sites on WordPress, Shopify, and custom platforms.",
        "Built JavaScript/TypeScript and Node.js libraries for rapid development of ecommerce sites.",
        "Created reusable, mobile-responsive templates and themes from PSDs and mockups.",
      ],
    },
    {
      title: "LEAD FRONTEND DEVELOPER",
      company: "Admachines Inc.",
      startDate: "December 2016",
      endDate: "September 2018",
      description: [
        "Developed WordPress themes, plugins, and mobile-responsive sites for 216 web properties.",
        "Created dynamic PHP/JavaScript libraries to boost client onboarding and increase revenue.",
        "Developed WordPress site templates with interchangeable components.",
        "Performed frontend optimization, including SEO, code, and image optimization.",
      ],
    },
    {
      title: "FRONTEND DEVELOPER",
      company: "Capital Investigations",
      startDate: "August 2016",
      endDate: "December 2016",
      description: [
        "Styled reusable React components for a custom social media investigation platform.",
        "Created print style sheets for data-driven user-facing outputs.",
      ],
    },
    {
      title: "JUNIOR FRONTEND DEVELOPER",
      company: "PixelOne Digital",
      startDate: "April 2016",
      endDate: "August 2016",
      description: [
        "Transformed UI mockups into websites and landing pages using HTML, CSS, JS, and jQuery.",
      ],
    },
  ],
};
