export const skills = {
  Frontend: [
    { name: "HTML", level: 100 },
    { name: "CSS", level: 100 },
    { name: "JavaScript", level: 100 },
    { name: "Bootstrap", level: 75 },
    { name: "NodeJS", level: 50 },
    { name: "Tailwind CSS", level: 40 },
    { name: "ReactJS", level: 40 },
  ],
  Backend: [
    { name: "MySQL", level: 100 },
    { name: "PHP", level: 100 },
    { name: "Java", level: 70 },
    { name: "Express.js", level: 50 },
    { name: "PostgreSQL", level: 40 },
    { name: "Laravel", level: 25 },
    { name: "C++", level: 25 },
  ],
  Others: [
    { name: "Figma", level: 50 },
    { name: "Android Java", level: 50 },
    { name: "Photo Editing", level: 50 },
    { name: "Flash Animation", level: 50 },
    { name: "Video Editing", level: 50 },
  ],
};

export const projects = [
  {
    title: "Farm Management System",
    date: "Feb 2026 – Ongoing",
    type: "OJT Project",
    desc: "A multi-tenant farm management platform featuring timesheet tracking with approval workflows, task management, inventory, accounting, and role-based access control.",
    tech: ["NextJS", "TailwindCSS", "NodeJS", "PostgreSQL"],
    tag: "ongoing",
  },
  {
    title: "Disaster Evacuation Management System",
    date: "Mar – Dec 2025",
    type: "Capstone + Hackathon",
    desc: "An AI-driven evacuation system with predictive analytics for resilient urban futures. Won Best Smart Communities Innovation & People's Choice Award among 17 solutions in Western Visayas.",
    tech: ["JavaScript", "HTML", "CSS", "PHP", "Python", "MySQL", "Bootstrap"],
    tag: "award",
  },
  {
    title: "Bantay Kalusugan Management System",
    date: "November 2025",
    type: "2nd BSIS Hackathon",
    desc: "A web-based platform to support community health monitoring. Enables health workers and barangay officials to track residents' medical records, check-ups, and vaccinations.",
    tech: ["HTML", "CSS", "JavaScript", "MySQL", "Bootstrap", "PHP"],
    tag: null,
  },
  {
    title: "Book Inventory Management System",
    date: "Jan – Mar 2024",
    type: "Class Project",
    desc: "A web-based tool to manage and track books in a bookstore or library. Supports adding, updating, deleting, and searching book records with easy reporting.",
    tech: ["HTML", "CSS", "JavaScript", "MySQL", "Bootstrap", "PHP"],
    tag: null,
  },
];

export const achievements = [
  { icon: "🏆", title: "Programmer of the Year", year: "2024" },
  { icon: "🌐", title: "Web Developer of the Year", year: "2025" },
  { icon: "⭐", title: "Best Smart Communities Innovation", year: "2025" },
  { icon: "🎯", title: "People's Choice Award", year: "2025" },
];
