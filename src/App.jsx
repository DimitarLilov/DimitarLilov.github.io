import React, { useState, useEffect, useRef, useCallback } from "react";

/* ============================================================================
   DimitarOS — a macOS-on-desktop / iOS-on-mobile portfolio shell.
   Content is a 1:1 port of the original Handlebars site:
   About Me, Projects (Games/Web/Servers), Education, Certificates, Contact.
   ============================================================================ */

const GITHUB_USER = "DimitarLilov";
const GITHUB_API = `https://api.github.com/repos/${GITHUB_USER}`;

/* ---------------------------------------------------------------------------
   SF Symbols-style glyphs — thin, consistent stroke-weight line icons
   drawn inline so the app needs no icon font / image assets.
--------------------------------------------------------------------------- */

const ICONS = {
  person: (p) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <circle cx="12" cy="8" r="3.6" stroke="currentColor" strokeWidth="1.8" />
      <path d="M4.5 19.5c1.4-3.4 4.3-5.2 7.5-5.2s6.1 1.8 7.5 5.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  folder: (p) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <path
        d="M3.5 7.2c0-.8.65-1.4 1.45-1.4h4.3l1.6 1.9h8.2c.8 0 1.45.63 1.45 1.4v9.1c0 .77-.65 1.4-1.45 1.4H4.95c-.8 0-1.45-.63-1.45-1.4V7.2Z"
        stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"
      />
    </svg>
  ),
  cap: (p) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <path d="M12 4.5 21 9l-9 4.5L3 9l9-4.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M7 11v4.2c0 1.2 2.2 2.8 5 2.8s5-1.6 5-2.8V11" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21 9v6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  ),
  scroll: (p) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <path d="M6 4h9a2.5 2.5 0 0 1 2.5 2.5v11A2.5 2.5 0 0 1 15 20H8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 4a2.5 2.5 0 0 0-2.5 2.5v11A2.5 2.5 0 0 0 6 20" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M8.5 9h6M8.5 12.5h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  github: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M12 2.2c-5.5 0-10 4.5-10 10 0 4.4 2.86 8.13 6.84 9.45.5.1.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.64-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.1.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.9-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.69 0 3.85-2.34 4.7-4.57 4.94.36.31.68.92.68 1.85 0 1.34-.01 2.42-.01 2.75 0 .27.18.59.69.48A10.01 10.01 0 0 0 22 12.2c0-5.5-4.5-10-10-10Z" />
    </svg>
  ),
  mail: (p) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <rect x="3" y="5.5" width="18" height="13" rx="2.2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  gamepad: (p) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <path d="M6.5 8.5h11a3.5 3.5 0 0 1 3.4 4.3l-.6 2.4a2.7 2.7 0 0 1-4.9.86L14.6 15a1.8 1.8 0 0 0-1.5-.8h-2.2a1.8 1.8 0 0 0-1.5.8l-.8 1.06a2.7 2.7 0 0 1-4.9-.86l-.6-2.4a3.5 3.5 0 0 1 3.4-4.3Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M8 10.8v2.4M6.8 12h2.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="16" cy="11" r=".9" fill="currentColor" />
      <circle cx="18" cy="13" r=".9" fill="currentColor" />
    </svg>
  ),
  globe: (p) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <circle cx="12" cy="12" r="8.2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M3.8 12h16.4M12 3.8c2.3 2.2 3.5 5.1 3.5 8.2s-1.2 6-3.5 8.2c-2.3-2.2-3.5-5.1-3.5-8.2s1.2-6 3.5-8.2Z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  server: (p) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <rect x="3.5" y="4.5" width="17" height="6" rx="1.6" stroke="currentColor" strokeWidth="1.7" />
      <rect x="3.5" y="13.5" width="17" height="6" rx="1.6" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="7" cy="7.5" r=".9" fill="currentColor" />
      <circle cx="7" cy="16.5" r=".9" fill="currentColor" />
    </svg>
  ),
  doc: (p) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <path d="M7 3.5h7l4 4v12.2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M14 3.5V8h4" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M9 12.5h6M9 15.5h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  link: (p) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <path d="M10 14.2 14.2 10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M11.6 7.4l1.4-1.4a3.6 3.6 0 0 1 5.1 5.1L16.7 12.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M12.4 16.6 11 18a3.6 3.6 0 0 1-5.1-5.1l1.4-1.4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  ),
  close: (p) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  chevronLeft: (p) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <path d="M14.5 5.5 8 12l6.5 6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  signal: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <rect x="2.5" y="14" width="3.4" height="6" rx="0.8" />
      <rect x="8" y="10.5" width="3.4" height="9.5" rx="0.8" />
      <rect x="13.5" y="7" width="3.4" height="13" rx="0.8" />
      <rect x="19" y="3.5" width="3.4" height="16.5" rx="0.8" />
    </svg>
  ),
  battery: (p) => (
    <svg viewBox="0 0 26 14" fill="none" {...p}>
      <rect x="1" y="1" width="20" height="12" rx="3.2" stroke="currentColor" strokeWidth="1.3" />
      <rect x="3" y="3" width="14.5" height="8" rx="1.6" fill="currentColor" />
      <path d="M23 5v4a1.6 1.6 0 0 0 1.2-1.55V6.55A1.6 1.6 0 0 0 23 5Z" fill="currentColor" />
    </svg>
  ),
};

function Icon({ name, size = 22, className = "" }) {
  const draw = ICONS[name];
  if (!draw) return null;
  return draw({
    width: size,
    height: size,
    className: ("icon icon-" + name + " " + className).trim(),
  });
}

/* DimitarOS logomark — "{DL}" mark, reused for the menu bar and as the
   site favicon (public/favicon.svg mirrors this exact design). */
function LogoMark({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className="logo-mark">
      <defs>
        <linearGradient id="logoGrad" x1="8" y1="6" x2="56" y2="58" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#5b8def" />
          <stop offset="1" stopColor="#5cd6c0" />
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="56" height="56" rx="14" fill="#0c1a30" />
      <rect x="4" y="4" width="56" height="56" rx="14" fill="url(#logoGrad)" fillOpacity="0.16" />
      <rect x="4.75" y="4.75" width="54.5" height="54.5" rx="13.25" fill="none" stroke="url(#logoGrad)" strokeWidth="1.2" strokeOpacity="0.55" />
      <text
        x="32" y="41" textAnchor="middle"
        fontFamily="'SF Mono','JetBrains Mono','Fira Code',ui-monospace,Menlo,Consolas,monospace"
        fontSize="22" fontWeight="700" fill="url(#logoGrad)"
      >
        {"{DL}"}
      </text>
    </svg>
  );
}

/* ---------------------------------------------------------------------------
   App registry — single source of truth for both Desktop icons / Dock
   and the iOS Home Screen grid.
--------------------------------------------------------------------------- */

const APP_DEFS = [
  { id: "about", title: "About Me", icon: "person", color: "#5b8def", dock: true, desktop: true },
  { id: "projects", title: "Projects", icon: "folder", color: "#ffcf5c", dock: true, desktop: true },
  { id: "education", title: "Education", icon: "cap", color: "#9b8cf2", dock: true, desktop: true },
  { id: "certificates", title: "Certificates", icon: "scroll", color: "#5cd6c0", dock: true, desktop: true },
  { id: "github", title: "GitHub", icon: "github", color: "#24292e", dock: true, desktop: false, external: "https://github.com/DimitarLilov/" },
  { id: "mail", title: "Mail", icon: "mail", color: "#3478f6", dock: true, desktop: false, external: "mailto:dimitar.lilov.dev@gmail.com" },
];

/* ---------------------------------------------------------------------------
   Static content (ported 1:1 from the Handlebars templates)
--------------------------------------------------------------------------- */

/* Each entry is ONE rendered line: { indent, segs: [{t, v}, ...] }. */
const WORK_ENTRIES = [
  { CompanyName: "Sirius Software Ltd.", Title: "Software Developer", Description: "Slot Games Developer", Start: "2019, 05, 27", End: "2024, 04, 18" },
  { CompanyName: "EGT Digital", Title: "Senior .Net Developer", Description: "Platform Development", Start: "2024, 05, 28" },
];
const PROJECT_ENTRIES = [
  { Name: "Slots Math Implementation", CompanyName: "7Mojos", Link: "https://7mojos.com/slots" },
  { Name: "Slots Engine", CompanyName: "7Mojos", Link: "https://7mojos.com/slots" },
  { Name: "Progressive Jackpot", CompanyName: "7Mojos", Link: "https://7mojos.com/slots" },
  { Name: "Casino Back Office", CompanyName: "7Mojos", Link: "https://7mojos.com" },
];
const SCHOOL_ENTRIES = [
  { Name: "SoftUni", Qualification: "Software Engineering", Specialty: "C# Web Developer", Start: "2015, 09", End: "2018, 02" },
  { Name: "University of Food Technologies", Qualification: "Engineering and Technology", Specialty: "Analysis and Control of Food Products", Start: "2011, 09", End: "2015, 06" },
  { Name: "Professional School of Chemical and Food Technologies", Qualification: "Laboratory Technician", Specialty: "Technological and Microbiological Control in Chemical Industries", Start: "2006, 09", End: "2011, 06" },
];

const RESUME_LINES = [
  { indent: 0, segs: [{ t: "kw", v: "namespace" }, { t: "txt", v: " About_Me" }] },
  { indent: 0, segs: [{ t: "txt", v: "{" }] },
  { indent: 1, segs: [{ t: "kw", v: "using" }, { t: "txt", v: " System;" }] },
  { indent: 1, segs: [{ t: "kw", v: "using" }, { t: "txt", v: " System.Collections.Generic;" }] },
  { indent: 0, segs: [{ t: "txt", v: "" }] },
  { indent: 1, segs: [{ t: "kw", v: "public class" }, { t: "cls", v: " AboutMe" }] },
  { indent: 1, segs: [{ t: "txt", v: "{" }] },
  { indent: 2, segs: [{ t: "kw", v: "public static void " }, { t: "txt", v: "Main()" }] },
  { indent: 2, segs: [{ t: "txt", v: "{" }] },
  { indent: 3, segs: [{ t: "cls", v: "Person" }, { t: "txt", v: " dimitar = " }, { t: "kw", v: "new " }, { t: "cls", v: "Person" }] },
  { indent: 3, segs: [{ t: "txt", v: "{" }] },
  { indent: 4, segs: [{ t: "txt", v: "FirstName = " }, { t: "str", v: '"Dimitar"' }, { t: "txt", v: "," }] },
  { indent: 4, segs: [{ t: "txt", v: "LastName = " }, { t: "str", v: '"Lilov"' }, { t: "txt", v: "," }] },
  { indent: 4, segs: [{ t: "txt", v: "BirthDate = " }, { t: "kw", v: "new " }, { t: "cls", v: "DateTime" }, { t: "txt", v: " (1992, 04, 25)" }] },
  { indent: 3, segs: [{ t: "txt", v: "};" }] },
  { indent: 0, segs: [{ t: "txt", v: "" }] },
  { indent: 3, segs: [{ t: "comment", v: "// Work" }] },
  { indent: 3, segs: [{ t: "txt", v: "dimitar.Work = " }, { t: "kw", v: "new " }, { t: "cls", v: "List" }, { t: "txt", v: "<" }, { t: "cls", v: "Work" }, { t: "txt", v: ">" }] },
  { indent: 3, segs: [{ t: "txt", v: "{" }] },
  ...WORK_ENTRIES.flatMap((w, i, arr) => [
    { indent: 4, segs: [{ t: "kw", v: "new " }, { t: "cls", v: "Work" }] },
    { indent: 4, segs: [{ t: "txt", v: "{" }] },
    { indent: 5, segs: [{ t: "txt", v: "CompanyName = " }, { t: "str", v: `"${w.CompanyName}"` }, { t: "txt", v: "," }] },
    { indent: 5, segs: [{ t: "txt", v: "Title = " }, { t: "str", v: `"${w.Title}"` }, { t: "txt", v: "," }] },
    { indent: 5, segs: [{ t: "txt", v: "Description = " }, { t: "str", v: `"${w.Description}"` }, { t: "txt", v: "," }] },
    { indent: 5, segs: [{ t: "txt", v: "StartDate = " }, { t: "kw", v: "new " }, { t: "cls", v: "DateTime" }, { t: "txt", v: ` (${w.Start})${w.End ? "," : ""}` }] },
    ...(w.End
      ? [{ indent: 5, segs: [{ t: "txt", v: "EndDate = " }, { t: "kw", v: "new " }, { t: "cls", v: "DateTime" }, { t: "txt", v: ` (${w.End})` }] }]
      : []),
    { indent: 4, segs: [{ t: "txt", v: i === arr.length - 1 ? "}" : "}," }] },
  ]),
  { indent: 3, segs: [{ t: "txt", v: "};" }] },
  { indent: 0, segs: [{ t: "txt", v: "" }] },
  { indent: 3, segs: [{ t: "comment", v: "// Projects" }] },
  { indent: 3, segs: [{ t: "txt", v: "dimitar.Projects = " }, { t: "kw", v: "new " }, { t: "cls", v: "List" }, { t: "txt", v: "<" }, { t: "cls", v: "Project" }, { t: "txt", v: ">" }] },
  { indent: 3, segs: [{ t: "txt", v: "{" }] },
  ...PROJECT_ENTRIES.flatMap((p, i, arr) => [
    { indent: 4, segs: [{ t: "kw", v: "new " }, { t: "cls", v: "Project" }] },
    { indent: 4, segs: [{ t: "txt", v: "{" }] },
    { indent: 5, segs: [{ t: "txt", v: "Name = " }, { t: "str", v: `"${p.Name}"` }, { t: "txt", v: "," }] },
    { indent: 5, segs: [{ t: "txt", v: "CompanyName = " }, { t: "str", v: `"${p.CompanyName}"` }, { t: "txt", v: "," }] },
    { indent: 5, segs: [{ t: "txt", v: "Link = " }, { t: "str", v: `"${p.Link}"` }] },
    { indent: 4, segs: [{ t: "txt", v: i === arr.length - 1 ? "}" : "}," }] },
  ]),
  { indent: 3, segs: [{ t: "txt", v: "};" }] },
  { indent: 0, segs: [{ t: "txt", v: "" }] },
  { indent: 3, segs: [{ t: "comment", v: "// Education" }] },
  { indent: 3, segs: [{ t: "txt", v: "dimitar.Schools = " }, { t: "kw", v: "new " }, { t: "cls", v: "List" }, { t: "txt", v: "<" }, { t: "cls", v: "School" }, { t: "txt", v: ">" }] },
  { indent: 3, segs: [{ t: "txt", v: "{" }] },
  ...SCHOOL_ENTRIES.flatMap((s, i, arr) => [
    { indent: 4, segs: [{ t: "kw", v: "new " }, { t: "cls", v: "School" }] },
    { indent: 4, segs: [{ t: "txt", v: "{" }] },
    { indent: 5, segs: [{ t: "txt", v: "Name = " }, { t: "str", v: `"${s.Name}"` }, { t: "txt", v: "," }] },
    { indent: 5, segs: [{ t: "txt", v: "Qualification = " }, { t: "str", v: `"${s.Qualification}"` }, { t: "txt", v: "," }] },
    { indent: 5, segs: [{ t: "txt", v: "Specialty = " }, { t: "str", v: `"${s.Specialty}"` }, { t: "txt", v: "," }] },
    { indent: 5, segs: [{ t: "txt", v: "StartDate = " }, { t: "kw", v: "new " }, { t: "cls", v: "DateTime" }, { t: "txt", v: ` (${s.Start}),` }] },
    { indent: 5, segs: [{ t: "txt", v: "EndDate = " }, { t: "kw", v: "new " }, { t: "cls", v: "DateTime" }, { t: "txt", v: ` (${s.End})` }] },
    { indent: 4, segs: [{ t: "txt", v: i === arr.length - 1 ? "}" : "}," }] },
  ]),
  { indent: 3, segs: [{ t: "txt", v: "};" }] },
  { indent: 2, segs: [{ t: "txt", v: "}" }] },
  { indent: 1, segs: [{ t: "txt", v: "}" }] },
  { indent: 0, segs: [{ t: "txt", v: "}" }] },
];

const PROJECT_CATEGORIES = {
  games: {
    title: "Games",
    items: [
      { kind: "link", name: "Slots Games", href: "https://7mojos.com/slots" },
      { kind: "repo", name: "Super Pesho", repo: "Team-Demeter" },
      { kind: "repo", name: "Space Invaders", repo: "Team-Entablefine" },
      { kind: "repo", name: "Star Wars", repo: "Team-Dantooine" },
      { kind: "repo", name: "RPG Game", repo: "EntityFrameworkWorkGroup/RpgGame", noScreens: true },
    ],
  },
  web: {
    title: "Web Applications",
    items: [
      { kind: "repo", name: "Teamwork System", repo: "Teamwork-System" },
      { kind: "repo", name: "Ticket Store Handlebars", repo: "Team-Dragonfruit" },
      { kind: "repo", name: "Ticket Store Angular", repo: "Ticket-Store" },
    ],
  },
  servers: {
    title: "Servers",
    items: [
      { kind: "link", name: "Slots Engine", href: "https://7mojos.com/slots" },
      { kind: "link", name: "Progressive Jackpot", href: "https://7mojos.com/slots" },
      { kind: "link", name: "Casino Back Office", href: "https://7mojos.com" },
      { kind: "repo", name: "C# Server", repo: "HttpServer" },
      { kind: "repo", name: "Express Server", repo: "Express-Server" },
    ],
  },
};

const EDUCATION = [
  { name: "SoftUni", href: "https://softuni.bg/", initials: "SU", color: "#2e7d32" },
  { name: "UFT", href: "http://uft-plovdiv.bg/", initials: "UFT", color: "#1565c0" },
  { name: "PSCFT", href: "https://pghht.weebly.com/", initials: "PS", color: "#ad1457" },
];

/* ---------------------------------------------------------------------------
   GitHub fetch helpers (mirrors the original requester.js / service.js)
--------------------------------------------------------------------------- */

function useGithubContents(repo, subpath) {
  const [state, setState] = useState({ loading: true, error: null, items: [] });

  useEffect(() => {
    let cancelled = false;
    setState({ loading: true, error: null, items: [] });

    const fullRepo = repo.includes("/") ? repo : `${GITHUB_USER}/${repo}`;
    const url = `https://api.github.com/repos/${fullRepo}/contents/${subpath}`;
    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error("not found");
        return r.json();
      })
      .then((data) => {
        if (cancelled) return;
        const images = Array.isArray(data)
          ? data.filter((d) => /\.(png|jpe?g|gif)$/i.test(d.name))
          : [];
        setState({ loading: false, error: null, items: images });
      })
      .catch((e) => {
        if (cancelled) return;
        setState({ loading: false, error: e, items: [] });
      });

    return () => { cancelled = true; };
  }, [repo, subpath]);

  return state;
}

/* ---------------------------------------------------------------------------
   Window manager hook (desktop only)
--------------------------------------------------------------------------- */

let zCounter = 10;

function useWindowManager() {
  const [windows, setWindows] = useState([]); // {id, appId, x, y, w, h, z, minimized, maximized}

  const open = useCallback((appId, opts = {}) => {
    setWindows((prev) => {
      const existing = prev.find((w) => w.appId === appId && !w.closed);
      if (existing) {
        zCounter += 1;
        return prev.map((w) =>
          w.id === existing.id ? { ...w, z: zCounter, minimized: false } : w
        );
      }
      zCounter += 1;
      const offset = prev.filter((w) => !w.closed).length * 26;
      return [
        ...prev,
        {
          id: appId + "-" + Date.now(),
          appId,
          x: 120 + offset,
          y: 80 + offset,
          w: opts.w || 720,
          h: opts.h || 520,
          z: zCounter,
          minimized: false,
          maximized: false,
        },
      ];
    });
  }, []);

  const close = useCallback((id) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
  }, []);

  const focus = useCallback((id) => {
    zCounter += 1;
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, z: zCounter } : w)));
  }, []);

  const minimize = useCallback((id) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, minimized: true } : w)));
  }, []);

  const restore = useCallback((id) => {
    zCounter += 1;
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, minimized: false, z: zCounter } : w))
    );
  }, []);

  const toggleMaximize = useCallback((id) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, maximized: !w.maximized } : w))
    );
  }, []);

  const move = useCallback((id, x, y) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, x, y } : w)));
  }, []);

  const resize = useCallback((id, w, h, x, y) => {
    setWindows((prev) =>
      prev.map((win) =>
        win.id === id
          ? {
              ...win,
              w,
              h,
              ...(x !== undefined ? { x } : {}),
              ...(y !== undefined ? { y } : {}),
            }
          : win
      )
    );
  }, []);

  return { windows, open, close, focus, minimize, restore, toggleMaximize, move, resize };
}

/* ---------------------------------------------------------------------------
   Desktop: macOS window chrome
--------------------------------------------------------------------------- */

const MIN_WIN_W = 380;
const MIN_WIN_H = 280;

const RESIZE_HANDLES = [
  { dir: "n", cursor: "ns-resize" },
  { dir: "s", cursor: "ns-resize" },
  { dir: "e", cursor: "ew-resize" },
  { dir: "w", cursor: "ew-resize" },
  { dir: "ne", cursor: "nesw-resize" },
  { dir: "sw", cursor: "nesw-resize" },
  { dir: "nw", cursor: "nwse-resize" },
  { dir: "se", cursor: "nwse-resize" },
];

function MacWindow({ win, app, onClose, onFocus, onMinimize, onMaximize, onMove, onResize, children, title }) {
  const ref = useRef(null);
  const dragState = useRef(null);
  const resizeState = useRef(null);
  const [justOpened, setJustOpened] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setJustOpened(false), 240);
    return () => clearTimeout(t);
  }, []);

  const onPointerDown = (e) => {
    if (e.target.closest(".traffic-lights")) return;
    if (win.maximized) return;
    onFocus(win.id);
    dragState.current = {
      startX: e.clientX,
      startY: e.clientY,
      origX: win.x,
      origY: win.y,
    };
    window.addEventListener("pointermove", onDragMove);
    window.addEventListener("pointerup", onDragUp);
  };

  const onDragMove = (e) => {
    if (!dragState.current) return;
    const { startX, startY, origX, origY } = dragState.current;
    onMove(win.id, Math.max(0, origX + (e.clientX - startX)), Math.max(28, origY + (e.clientY - startY)));
  };

  const onDragUp = () => {
    dragState.current = null;
    window.removeEventListener("pointermove", onDragMove);
    window.removeEventListener("pointerup", onDragUp);
  };

  const startResize = (dir) => (e) => {
    if (win.maximized) return;
    e.stopPropagation();
    e.preventDefault();
    onFocus(win.id);
    resizeState.current = {
      dir,
      startX: e.clientX,
      startY: e.clientY,
      origX: win.x,
      origY: win.y,
      origW: win.w,
      origH: win.h,
    };
    window.addEventListener("pointermove", onResizeMove);
    window.addEventListener("pointerup", onResizeUp);
  };

  const onResizeMove = (e) => {
    const rs = resizeState.current;
    if (!rs) return;
    const dx = e.clientX - rs.startX;
    const dy = e.clientY - rs.startY;
    let { origX: x, origY: y, origW: w, origH: h } = rs;
    let nextW = w;
    let nextH = h;
    let nextX = x;
    let nextY = y;

    if (rs.dir.includes("e")) nextW = Math.max(MIN_WIN_W, w + dx);
    if (rs.dir.includes("s")) nextH = Math.max(MIN_WIN_H, h + dy);
    if (rs.dir.includes("w")) {
      nextW = Math.max(MIN_WIN_W, w - dx);
      nextX = x + (w - nextW);
    }
    if (rs.dir.includes("n")) {
      nextH = Math.max(MIN_WIN_H, h - dy);
      nextY = Math.max(28, y + (h - nextH));
    }

    onResize(win.id, nextW, nextH, nextX, nextY);
  };

  const onResizeUp = () => {
    resizeState.current = null;
    window.removeEventListener("pointermove", onResizeMove);
    window.removeEventListener("pointerup", onResizeUp);
  };

  const style = win.maximized
    ? { left: 8, top: 36, width: "calc(100vw - 16px)", height: "calc(100vh - 120px)", zIndex: win.z }
    : { left: win.x, top: win.y, width: win.w, height: win.h, zIndex: win.z };

  return (
    <div
      ref={ref}
      className={"mac-window" + (win.minimized ? " minimized" : "") + (justOpened ? " opening" : "")}
      style={style}
      onMouseDown={() => onFocus(win.id)}
    >
      <div className="mac-titlebar" onPointerDown={onPointerDown}>
        <div className="traffic-lights">
          <button className="tl tl-close" onClick={() => onClose(win.id)} aria-label="Close" />
          <button className="tl tl-min" onClick={() => onMinimize(win.id)} aria-label="Minimize" />
          <button className="tl tl-max" onClick={() => onMaximize(win.id)} aria-label="Maximize" />
        </div>
        <div className="mac-title">{title}</div>
      </div>
      <div className="mac-window-body">{children}</div>
      {!win.maximized &&
        RESIZE_HANDLES.map((h) => (
          <div
            key={h.dir}
            className={"resize-handle rh-" + h.dir}
            style={{ cursor: h.cursor }}
            onPointerDown={startResize(h.dir)}
          />
        ))}
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Shared "content" renderers — used inside both Mac windows and iOS sheets
--------------------------------------------------------------------------- */

function CodeLine({ n, segs, indent = 0 }) {
  return (
    <div className="code-line">
      <span className="code-n">{n}</span>
      <span className="code-text" style={{ paddingLeft: indent * 18 }}>
        {segs}
      </span>
    </div>
  );
}

function ResumeCode() {
  return (
    <div className="code-editor">
      {RESUME_LINES.map((line, i) => (
        <CodeLine
          key={i}
          n={i + 1}
          indent={line.indent}
          segs={line.segs.map((s, j) => (
            <span key={j} className={"tok-" + s.t}>
              {s.v}
            </span>
          ))}
        />
      ))}
    </div>
  );
}

function HelloCode() {
  const lines = [
    { i: 0, n: [["kw", "namespace"], ["txt", " Home"]] },
    { i: 0, n: [["txt", "{"]] },
    { i: 1, n: [["kw", "using"], ["txt", " System;"]] },
    { i: 0, n: [["txt", ""]] },
    { i: 1, n: [["kw", "public class"], ["cls", " Hello"]] },
    { i: 1, n: [["txt", "{"]] },
    { i: 2, n: [["kw", "public static void"], ["txt", " Main()"]] },
    { i: 2, n: [["txt", "{"]] },
    { i: 3, n: [["cls", "Console"], ["txt", ".WriteLine("], ["str", '"Hello World"'], ["txt", ");"]] },
    { i: 2, n: [["txt", "}"]] },
    { i: 1, n: [["txt", "}"]] },
    { i: 0, n: [["txt", "}"]] },
  ];
  return (
    <div className="code-editor">
      {lines.map((l, idx) => (
        <CodeLine
          key={idx}
          n={idx + 1}
          indent={l.i}
          segs={l.n.map(([t, v], j) => (
            <span key={j} className={"tok-" + t}>
              {v}
            </span>
          ))}
        />
      ))}
    </div>
  );
}

function FileGridItem({ icon, label, onOpen, kind = "folder" }) {
  return (
    <button className={"fs-item fs-" + kind} onClick={onOpen}>
      <div className="fs-icon">
        <Icon name={icon} size={24} />
      </div>
      <div className="fs-label">{label}</div>
    </button>
  );
}

function PhotoThumb({ url, name }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button className="fs-item fs-photo" onClick={() => setOpen(true)}>
        <div className="fs-icon fs-icon-photo">
          <img src={url} alt={name} loading="lazy" />
        </div>
        <div className="fs-label">{name}</div>
      </button>
      {open && (
        <div className="quicklook-overlay" onClick={() => setOpen(false)}>
          <div className="quicklook-box" onClick={(e) => e.stopPropagation()}>
            <div className="quicklook-bar">
              <span className="quicklook-name">{name}</span>
              <button className="quicklook-close" onClick={() => setOpen(false)} aria-label="Close preview">
                <Icon name="close" size={13} />
              </button>
            </div>
            <div className="quicklook-imgwrap">
              <img src={url} alt={name} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function AboutMeRoot({ navigate }) {
  return (
    <div className="finder-view">
      <div className="fs-grid">
        <PhotoThumb
          url="https://raw.githubusercontent.com/DimitarLilov/DimitarLilov.github.io/master/images/I.jpg"
          name="Photo.jpg"
        />
        <FileGridItem icon="doc" label="Resume.cs" kind="file" onOpen={() => navigate("about-resume")} />
      </div>
    </div>
  );
}

function AboutMeResume() {
  return (
    <div className="finder-view code-view">
      <ResumeCode />
    </div>
  );
}

function ProjectsRoot({ navigate }) {
  return (
    <div className="finder-view">
      <div className="fs-grid">
        <FileGridItem icon="gamepad" label="Games" onOpen={() => navigate("projects-games")} />
        <FileGridItem icon="globe" label="Web Applications" onOpen={() => navigate("projects-web")} />
        <FileGridItem icon="server" label="Servers" onOpen={() => navigate("projects-servers")} />
      </div>
    </div>
  );
}

function ProjectsCategory({ categoryKey, navigate }) {
  const cat = PROJECT_CATEGORIES[categoryKey];
  return (
    <div className="finder-view">
      <div className="fs-grid">
        {cat.items.map((item) =>
          item.kind === "link" ? (
            <a key={item.name} className="fs-item fs-link" href={item.href} target="_blank" rel="noreferrer">
              <div className="fs-icon">
                <Icon name="link" size={22} />
              </div>
              <div className="fs-label">{item.name}</div>
            </a>
          ) : (
            <FileGridItem
              key={item.name}
              icon="folder"
              label={item.name}
              onOpen={() => navigate("project-detail", { categoryKey, item })}
            />
          )
        )}
      </div>
    </div>
  );
}

function ProjectDetail({ categoryKey, item }) {
  const fetchUrl = item.repo.includes("/")
    ? `https://api.github.com/repos/${item.repo}/contents/screenshots`
    : `${GITHUB_API}/${item.repo}/contents/screenshots`;

  const [state, setState] = useState({ loading: !item.noScreens, items: [] });

  useEffect(() => {
    if (item.noScreens) return;
    let cancelled = false;
    fetch(fetchUrl)
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => {
        if (cancelled) return;
        const images = Array.isArray(data) ? data.filter((d) => /\.(png|jpe?g|gif)$/i.test(d.name)) : [];
        setState({ loading: false, items: images });
      })
      .catch(() => !cancelled && setState({ loading: false, items: [] }));
    return () => { cancelled = true; };
  }, [fetchUrl, item.noScreens]);

  const githubHref = item.repo.includes("/")
    ? `https://github.com/${item.repo}`
    : `https://github.com/${GITHUB_USER}/${item.repo}`;

  return (
    <div className="finder-view">
      <div className="fs-grid">
        {state.loading && <div className="fs-loading">Loading screenshots…</div>}
        {!state.loading &&
          state.items.map((d) => (
            <PhotoThumb key={d.sha} url={d.download_url} name={d.name.split(".")[0]} />
          ))}
        <a className="fs-item fs-link" href={githubHref} target="_blank" rel="noreferrer">
          <div className="fs-icon">
            <Icon name="github" size={22} />
          </div>
          <div className="fs-label">{item.name}</div>
        </a>
      </div>
    </div>
  );
}

function EducationView() {
  return (
    <div className="finder-view">
      <div className="fs-grid">
        {EDUCATION.map((e) => (
          <a key={e.name} className="fs-item fs-link" href={e.href} target="_blank" rel="noreferrer">
            <div className="fs-icon fs-icon-badge" style={{ background: e.color }}>
              {e.initials}
            </div>
            <div className="fs-label">{e.name}</div>
          </a>
        ))}
      </div>
    </div>
  );
}

function CertificatesView() {
  const { loading, items } = useGithubContents(`${GITHUB_USER}/DimitarLilov.github.io`, "images/certificates");
  return (
    <div className="finder-view">
      <div className="fs-grid">
        {loading && <div className="fs-loading">Loading certificates…</div>}
        {!loading &&
          items.map((d) => <PhotoThumb key={d.sha} url={d.download_url} name={d.name.split(".")[0]} />)}
      </div>
    </div>
  );
}

function HomeWindowContent() {
  return (
    <div className="finder-view code-view">
      <HelloCode />
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Per-app router: each app has a tiny internal "stack" of views
--------------------------------------------------------------------------- */

function useAppNav(initial) {
  const [stack, setStack] = useState([{ view: initial }]);
  const navigate = (view, params = {}) => setStack((s) => [...s, { view, params }]);
  const back = () => setStack((s) => (s.length > 1 ? s.slice(0, -1) : s));
  const reset = () => setStack([{ view: initial }]);
  return { current: stack[stack.length - 1], depth: stack.length, navigate, back, reset };
}

function AppTitle(appId, current) {
  switch (appId) {
    case "about":
      return current.view === "about-resume" ? "Resume.cs" : "About Me";
    case "projects":
      if (current.view === "projects-games") return "Games";
      if (current.view === "projects-web") return "Web Applications";
      if (current.view === "projects-servers") return "Servers";
      if (current.view === "project-detail") return current.params.item.name;
      return "Projects";
    case "education":
      return "Education";
    case "certificates":
      return "Certificates";
    default:
      return "";
  }
}

function AppBody({ appId, nav }) {
  const { current, navigate } = nav;
  if (appId === "home") return <HomeWindowContent />;
  if (appId === "about") {
    return current.view === "about-resume" ? <AboutMeResume /> : <AboutMeRoot navigate={navigate} />;
  }
  if (appId === "projects") {
    if (current.view === "projects-games") return <ProjectsCategory categoryKey="games" navigate={navigate} />;
    if (current.view === "projects-web") return <ProjectsCategory categoryKey="web" navigate={navigate} />;
    if (current.view === "projects-servers") return <ProjectsCategory categoryKey="servers" navigate={navigate} />;
    if (current.view === "project-detail")
      return <ProjectDetail categoryKey={current.params.categoryKey} item={current.params.item} />;
    return <ProjectsRoot navigate={navigate} />;
  }
  if (appId === "education") return <EducationView />;
  if (appId === "certificates") return <CertificatesView />;
  return null;
}

/* ---------------------------------------------------------------------------
   Desktop shell
--------------------------------------------------------------------------- */

function MenuBar({ clock }) {
  return (
    <div className="menubar">
      <div className="menubar-left">
        <LogoMark size={16} />
        <span className="menubar-app">DimitarOS</span>
        <span className="menubar-item">File</span>
        <span className="menubar-item">Edit</span>
        <span className="menubar-item">View</span>
        <span className="menubar-item">Window</span>
      </div>
      <div className="menubar-right">
        <span className="menubar-item">{clock}</span>
      </div>
    </div>
  );
}

function Dock({ onLaunch, openAppIds }) {
  return (
    <div className="dock-wrap">
      <div className="dock">
        {APP_DEFS.filter((a) => a.dock).map((app) => (
          <button
            key={app.id}
            className="dock-item"
            onClick={() => onLaunch(app)}
            title={app.title}
          >
            <span className="dock-icon" style={{ background: app.color }}>
              <Icon name={app.icon} size={24} />
            </span>
            {openAppIds.includes(app.id) && <span className="dock-dot" />}
          </button>
        ))}
      </div>
    </div>
  );
}

function DesktopIcon({ app, onOpen }) {
  return (
    <button className="desktop-icon" onDoubleClick={() => onOpen(app)}>
      <span className="desktop-icon-glyph" style={{ background: app.color }}>
        <Icon name={app.icon} size={26} />
      </span>
      <span className="desktop-icon-label">{app.title}</span>
    </button>
  );
}

function WindowInner({ appId }) {
  const nav = useAppNav(appId === "about" ? "about" : appId === "projects" ? "projects" : "root");
  return <AppBody appId={appId} nav={nav} />;
}

function DesktopOS() {
  const wm = useWindowManager();
  const [clock, setClock] = useState(formatClock());

  useEffect(() => {
    const t = setInterval(() => setClock(formatClock()), 1000 * 30);
    return () => clearInterval(t);
  }, []);

  const handleLaunch = (app) => {
    if (app.external) {
      window.open(app.external, "_blank");
      return;
    }
    wm.open(app.id);
  };

  const openAppIds = wm.windows.filter((w) => !w.minimized).map((w) => w.appId);

  return (
    <div className="os-root mac">
      <MenuBar clock={clock} />
      <div className="desktop-surface">
        <div className="desktop-icons">
          {APP_DEFS.filter((a) => a.desktop).map((app) => (
            <DesktopIcon key={app.id} app={app} onOpen={handleLaunch} />
          ))}
        </div>

        {wm.windows.map((win) => {
          const app = APP_DEFS.find((a) => a.id === win.appId);
          return (
            <WindowWithNav
              key={win.id}
              win={win}
              app={app}
              onClose={wm.close}
              onFocus={wm.focus}
              onMinimize={wm.minimize}
              onMaximize={wm.toggleMaximize}
              onMove={wm.move}
              onResize={wm.resize}
            />
          );
        })}
      </div>
      <Dock onLaunch={handleLaunch} openAppIds={openAppIds} />
    </div>
  );
}

function WindowWithNav({ win, app, onClose, onFocus, onMinimize, onMaximize, onMove, onResize }) {
  const nav = useAppNav(win.appId === "about" ? "about" : win.appId === "projects" ? "projects" : "root");
  const title = AppTitle(win.appId, nav.current);
  return (
    <MacWindow
      win={win}
      app={app}
      title={title}
      onClose={onClose}
      onFocus={onFocus}
      onMinimize={onMinimize}
      onMaximize={onMaximize}
      onMove={onMove}
      onResize={onResize}
    >
      <div className="window-toolbar">
        {nav.depth > 1 && (
          <button className="back-btn" onClick={nav.back}>
            <Icon name="chevronLeft" size={13} /> Back
          </button>
        )}
        <span className="window-toolbar-title">{title}</span>
      </div>
      <AppBody key={nav.current.view} appId={win.appId} nav={nav} />
    </MacWindow>
  );
}

function formatClock() {
  const d = new Date();
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let h = d.getHours();
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  const m = String(d.getMinutes()).padStart(2, "0");
  return `${days[d.getDay()]} ${d.toLocaleDateString(undefined, { month: "short", day: "numeric" })}  ${h}:${m} ${ampm}`;
}

/* ---------------------------------------------------------------------------
   Mobile shell — iOS Home Screen
--------------------------------------------------------------------------- */

function StatusBar({ clock }) {
  return (
    <div className="ios-statusbar">
      <span className="ios-time">{clock}</span>
      <div className="ios-statusicons">
        <Icon name="signal" size={15} />
        <Icon name="battery" size={17} />
      </div>
    </div>
  );
}

function IOSHomeIcon({ app, onOpen }) {
  return (
    <button className="ios-icon" onClick={() => onOpen(app)}>
      <span className="ios-icon-glyph" style={{ background: app.color }}>
        <Icon name={app.icon} size={26} />
      </span>
      <span className="ios-icon-label">{app.title}</span>
    </button>
  );
}

function IOSAppSheet({ app, onClose }) {
  const nav = useAppNav(app.id === "about" ? "about" : app.id === "projects" ? "projects" : "root");
  const title = AppTitle(app.id, nav.current);

  return (
    <div className="ios-sheet">
      <div className="ios-sheet-navbar">
        <button
          className="ios-sheet-back"
          onClick={nav.depth > 1 ? nav.back : onClose}
        >
          <Icon name="chevronLeft" size={16} /> {nav.depth > 1 ? "Back" : "Home"}
        </button>
        <span className="ios-sheet-title">{title}</span>
        <button className="ios-sheet-close" onClick={onClose}>
          <Icon name="close" size={14} />
        </button>
      </div>
      <div className="ios-sheet-body" key={nav.current.view}>
        <AppBody appId={app.id} nav={nav} />
      </div>
    </div>
  );
}

function MobileOS() {
  const [openApp, setOpenApp] = useState(null);
  const [clock, setClock] = useState(formatIOSClock());

  useEffect(() => {
    const t = setInterval(() => setClock(formatIOSClock()), 1000 * 15);
    return () => clearInterval(t);
  }, []);

  const handleOpen = (app) => {
    if (app.external) {
      window.open(app.external, "_blank");
      return;
    }
    setOpenApp(app);
  };

  const homeApps = APP_DEFS.filter((a) => a.desktop);
  const dockApps = APP_DEFS.filter((a) => a.dock && !a.desktop);

  return (
    <div className="os-root ios">
      <StatusBar clock={clock} />
      <div className="ios-home">
        <div className="ios-grid">
          {homeApps.map((app) => (
            <IOSHomeIcon key={app.id} app={app} onOpen={handleOpen} />
          ))}
        </div>
      </div>
      <div className="ios-dock">
        {dockApps.map((app) => (
          <IOSHomeIcon key={app.id} app={app} onOpen={handleOpen} />
        ))}
      </div>
      {openApp && <IOSAppSheet app={openApp} onClose={() => setOpenApp(null)} />}
    </div>
  );
}

function formatIOSClock() {
  const d = new Date();
  let h = d.getHours();
  const m = String(d.getMinutes()).padStart(2, "0");
  return `${String(h).padStart(2, "0")}:${m}`;
}

/* ---------------------------------------------------------------------------
   Root: switches between Desktop (macOS) and Mobile (iOS) by viewport width
--------------------------------------------------------------------------- */

export default function App() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 760 : false
  );

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 760);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <style>{STYLES}</style>
      {isMobile ? <MobileOS /> : <DesktopOS />}
    </>
  );
}

/* ============================================================================
   STYLES
   ============================================================================ */

const STYLES = `
:root {
  --mac-bg-1: #0b1f3a;
  --mac-bg-2: #1c3a5e;
  --mac-accent: #5b8def;
  --mac-glass: rgba(28, 34, 48, 0.55);
  --mac-glass-strong: rgba(20, 25, 36, 0.78);
  --mac-border: rgba(255,255,255,0.08);
  --mac-text: #e7ecf3;
  --mac-text-dim: #9aa7bd;
  --mono: "SF Mono", "JetBrains Mono", "Fira Code", ui-monospace, Menlo, Consolas, monospace;
  --sys: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

* { box-sizing: border-box; }

html, body {
  margin: 0;
  padding: 0;
  height: 100%;
}

.os-root {
  width: 100%;
  height: 100vh;
  min-height: 640px;
  overflow: hidden;
  position: relative;
  font-family: var(--sys);
  color: var(--mac-text);
  background:
    radial-gradient(circle at 20% 15%, rgba(91,141,239,0.25), transparent 45%),
    radial-gradient(circle at 80% 80%, rgba(91,214,192,0.18), transparent 45%),
    linear-gradient(160deg, var(--mac-bg-1), var(--mac-bg-2) 60%, #0c1626);
  -webkit-font-smoothing: antialiased;
}

/* ---------------- macOS desktop ---------------- */

.menubar {
  height: 28px;
  background: rgba(15,18,26,0.55);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid var(--mac-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 14px;
  font-size: 13px;
  font-weight: 500;
  position: relative;
  z-index: 5000;
}
.menubar-left { display: flex; align-items: center; gap: 16px; }
.logo-mark { display: block; flex-shrink: 0; border-radius: 4px; }
.menubar-app { font-weight: 700; }
.menubar-item { color: var(--mac-text-dim); cursor: default; }
.menubar-right { display: flex; align-items: center; gap: 14px; font-variant-numeric: tabular-nums; }

.desktop-surface {
  position: absolute;
  top: 28px; left: 0; right: 0; bottom: 92px;
  overflow: hidden;
}

.desktop-icons {
  position: absolute;
  top: 24px; right: 24px;
  display: flex;
  flex-direction: column;
  gap: 22px;
  align-items: center;
}

.desktop-icon {
  background: none; border: none; cursor: pointer;
  display: flex; flex-direction: column; align-items: center; gap: 6px;
  width: 84px; padding: 8px 4px; border-radius: 10px;
  color: var(--mac-text);
}
.desktop-icon:hover { background: rgba(255,255,255,0.06); }
.desktop-icon:focus-visible { outline: 2px solid var(--mac-accent); }
.desktop-icon-glyph {
  width: 52px; height: 52px; border-radius: 14px;
  display: flex; align-items: center; justify-content: center;
  font-size: 24px;
  box-shadow: 0 6px 16px rgba(0,0,0,0.35);
}
.desktop-icon-label {
  font-size: 12px; text-align: center; text-shadow: 0 1px 3px rgba(0,0,0,0.6);
  line-height: 1.2;
}

/* windows */
.mac-window {
  position: absolute;
  display: flex; flex-direction: column;
  background: var(--mac-glass-strong);
  backdrop-filter: blur(28px) saturate(180%);
  -webkit-backdrop-filter: blur(28px) saturate(180%);
  border: 1px solid var(--mac-border);
  border-radius: 12px;
  box-shadow: 0 24px 60px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3);
  overflow: hidden;
  min-width: 360px;
  min-height: 260px;
  transition: box-shadow 0.15s ease;
}
.mac-window.minimized { display: none; }
.mac-window.opening { animation: win-open 0.22s cubic-bezier(.2,.9,.3,1.2); }
@keyframes win-open {
  from { opacity: 0; transform: scale(0.94) translateY(10px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

.resize-handle {
  position: absolute;
  z-index: 5;
}
.rh-n { top: 0; left: 10px; right: 10px; height: 6px; }
.rh-s { bottom: 0; left: 10px; right: 10px; height: 6px; }
.rh-e { top: 10px; right: 0; bottom: 10px; width: 6px; }
.rh-w { top: 10px; left: 0; bottom: 10px; width: 6px; }
.rh-ne { top: 0; right: 0; width: 14px; height: 14px; }
.rh-nw { top: 0; left: 0; width: 14px; height: 14px; }
.rh-se { bottom: 0; right: 0; width: 14px; height: 14px; }
.rh-sw { bottom: 0; left: 0; width: 14px; height: 14px; }

.mac-titlebar {
  height: 38px;
  background: rgba(255,255,255,0.04);
  border-bottom: 1px solid var(--mac-border);
  display: flex; align-items: center;
  padding: 0 12px;
  cursor: grab;
  user-select: none;
  flex-shrink: 0;
}
.mac-titlebar:active { cursor: grabbing; }
.traffic-lights { display: flex; gap: 8px; }
.tl {
  width: 12px; height: 12px; border-radius: 50%;
  border: none; padding: 0; cursor: pointer;
}
.tl-close { background: #ff5f57; }
.tl-min { background: #febc2e; }
.tl-max { background: #28c840; }
.mac-title {
  flex: 1; text-align: center;
  font-size: 13px; font-weight: 600; color: var(--mac-text-dim);
  margin-right: 56px;
}

.mac-window-body {
  flex: 1; overflow: hidden; display: flex; flex-direction: column;
}

.window-toolbar {
  display: flex; align-items: center; gap: 10px;
  padding: 10px 16px;
  border-bottom: 1px solid var(--mac-border);
  flex-shrink: 0;
}
.back-btn {
  background: rgba(255,255,255,0.08);
  border: 1px solid var(--mac-border);
  color: var(--mac-text);
  border-radius: 6px;
  padding: 4px 10px;
  font-size: 12px;
  cursor: pointer;
  display: inline-flex; align-items: center; gap: 2px;
}
.back-btn:hover { background: rgba(255,255,255,0.14); }
.window-toolbar-title { font-size: 13px; font-weight: 600; color: var(--mac-text-dim); }

/* dock */
.dock-wrap {
  position: absolute; left: 0; right: 0; bottom: 14px;
  display: flex; justify-content: center;
  z-index: 6000;
}
.dock {
  display: flex; align-items: flex-end; gap: 10px;
  padding: 10px 14px;
  background: rgba(20,24,34,0.5);
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  border: 1px solid var(--mac-border);
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.4);
}
.dock-item {
  background: none; border: none; cursor: pointer;
  position: relative;
  transition: transform 0.12s ease;
  padding: 0;
}
.dock-item:hover { transform: translateY(-8px) scale(1.12); }
.dock-icon {
  width: 50px; height: 50px; border-radius: 13px;
  display: flex; align-items: center; justify-content: center;
  font-size: 22px; font-weight: 700;
  box-shadow: 0 6px 14px rgba(0,0,0,0.4);
  color: #fff;
}
.dock-dot {
  position: absolute; bottom: -7px; left: 50%; transform: translateX(-50%);
  width: 4px; height: 4px; border-radius: 50%;
  background: #fff;
}

/* ---------------- shared Finder-style content ---------------- */

.finder-view { padding: 22px; flex: 1; overflow: auto; }
.fs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(96px, 1fr));
  gap: 18px;
}
.fs-item {
  background: none; border: none; cursor: pointer;
  display: flex; flex-direction: column; align-items: center; gap: 8px;
  padding: 10px 6px; border-radius: 10px;
  color: var(--mac-text);
  text-decoration: none;
}
.fs-item:hover { background: rgba(255,255,255,0.06); }
.fs-icon {
  width: 56px; height: 56px; border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  font-size: 24px; font-weight: 700;
  background: rgba(255,255,255,0.08);
  border: 1px solid var(--mac-border);
}
.fs-folder .fs-icon { background: rgba(255,207,92,0.18); color: #ffcf5c; }
.fs-file .fs-icon { background: rgba(91,141,239,0.18); color: #5b8def; }
.fs-link .fs-icon { background: rgba(92,214,192,0.18); color: #5cd6c0; }
.fs-icon-badge { color: #fff; font-size: 13px; }
.fs-icon-photo { padding: 0; overflow: hidden; background: #111; }
.fs-icon-photo img { width: 100%; height: 100%; object-fit: cover; }
.fs-label { font-size: 12px; text-align: center; line-height: 1.25; word-break: break-word; }
.fs-loading { color: var(--mac-text-dim); font-size: 13px; padding: 20px; grid-column: 1 / -1; }

/* Quick Look-style photo preview */
.quicklook-overlay {
  position: fixed; inset: 0;
  z-index: 20000;
  background: rgba(8,11,18,0.72);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  display: flex; align-items: center; justify-content: center;
  padding: 40px;
  animation: ql-fade-in 0.15s ease;
}
@keyframes ql-fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
.quicklook-box {
  display: flex; flex-direction: column;
  max-width: min(90vw, 920px);
  max-height: 86vh;
  background: var(--mac-glass-strong);
  backdrop-filter: blur(28px) saturate(180%);
  -webkit-backdrop-filter: blur(28px) saturate(180%);
  border: 1px solid var(--mac-border);
  border-radius: 14px;
  box-shadow: 0 30px 80px rgba(0,0,0,0.55);
  overflow: hidden;
  animation: ql-pop-in 0.18s cubic-bezier(.2,.9,.3,1.2);
}
@keyframes ql-pop-in {
  from { opacity: 0; transform: scale(0.96); }
  to { opacity: 1; transform: scale(1); }
}
.quicklook-bar {
  flex-shrink: 0;
  display: flex; align-items: center; justify-content: space-between;
  padding: 10px 14px;
  border-bottom: 1px solid var(--mac-border);
}
.quicklook-name { font-size: 13px; font-weight: 600; color: var(--mac-text-dim); }
.quicklook-close {
  background: rgba(255,255,255,0.08);
  border: 1px solid var(--mac-border);
  color: var(--mac-text);
  border-radius: 6px;
  width: 26px; height: 26px;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
}
.quicklook-close:hover { background: rgba(255,255,255,0.16); }
.quicklook-imgwrap {
  flex: 1; min-height: 0;
  display: flex; align-items: center; justify-content: center;
  background: rgba(0,0,0,0.3);
  padding: 16px;
  overflow: auto;
}
.quicklook-imgwrap img {
  max-width: 100%; max-height: 78vh;
  object-fit: contain;
  border-radius: 4px;
}

/* code editor look */
.code-view { padding: 0; }
.code-editor {
  font-family: var(--mono);
  font-size: 13px;
  line-height: 1.65;
  padding: 18px 20px;
  background: rgba(10,14,22,0.4);
  white-space: pre;
}
.code-line { display: flex; }
.code-n {
  width: 28px; flex-shrink: 0;
  color: #45526b; text-align: right; margin-right: 14px;
  user-select: none;
}
.code-text { color: #c3c7b8; white-space: pre-wrap; word-break: break-word; }
.tok-kw { color: #5b9eff; }
.tok-cls { color: #4fd6c4; }
.tok-str { color: #e0a45f; }
.tok-comment { color: #5fae50; font-style: italic; }
.tok-txt { color: #c3c7b8; }
.tok-close { color: #c3c7b8; }

/* ---------------- iOS mobile ---------------- */

.ios {
  display: flex; flex-direction: column;
  background:
    radial-gradient(circle at 30% 10%, rgba(91,141,239,0.3), transparent 50%),
    radial-gradient(circle at 75% 85%, rgba(92,214,192,0.22), transparent 50%),
    linear-gradient(165deg, #0b1f3a, #122845 55%, #0a1424);
}
.ios-statusbar {
  height: 44px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 20px;
  font-size: 14px; font-weight: 600;
}
.ios-statusicons { display: flex; align-items: center; gap: 6px; color: var(--mac-text); }

.ios-home { flex: 1; overflow-y: auto; padding: 18px 18px 0; }
.ios-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 22px 14px;
}
.ios-icon {
  background: none; border: none; cursor: pointer;
  display: flex; flex-direction: column; align-items: center; gap: 6px;
  color: var(--mac-text);
  padding: 0;
}
.ios-icon-glyph {
  width: 58px; height: 58px; border-radius: 16px;
  display: flex; align-items: center; justify-content: center;
  font-size: 26px; font-weight: 700;
  box-shadow: 0 6px 14px rgba(0,0,0,0.4);
  color: #fff;
}
.ios-icon-label { font-size: 11px; text-shadow: 0 1px 3px rgba(0,0,0,0.6); }

.ios-dock {
  flex-shrink: 0;
  display: flex; justify-content: center; gap: 26px;
  margin: 14px 14px 14px;
  padding: 14px 22px;
  background: rgba(255,255,255,0.08);
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  border-radius: 26px;
  border: 1px solid var(--mac-border);
}

.ios-sheet {
  position: absolute; inset: 0;
  display: flex; flex-direction: column;
  background: var(--mac-glass-strong);
  backdrop-filter: blur(30px) saturate(180%);
  -webkit-backdrop-filter: blur(30px) saturate(180%);
  animation: ios-slide-up 0.28s cubic-bezier(.32,.72,0,1);
  z-index: 9000;
}
@keyframes ios-slide-up {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}
.ios-sheet-navbar {
  height: 52px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 8px 0 4px;
  border-bottom: 1px solid var(--mac-border);
  padding-top: env(safe-area-inset-top, 0px);
}
.ios-sheet-back, .ios-sheet-close {
  background: none; border: none; color: var(--mac-accent);
  font-size: 16px; font-weight: 500; cursor: pointer;
  padding: 8px 12px;
  display: inline-flex; align-items: center; gap: 1px;
}
.ios-sheet-close { color: var(--mac-text-dim); font-size: 14px; }
.ios-sheet-title { font-size: 16px; font-weight: 700; }
.ios-sheet-body { flex: 1; overflow: hidden; display: flex; flex-direction: column; }
.ios-sheet-body .fs-grid { grid-template-columns: repeat(auto-fill, minmax(84px, 1fr)); }
.ios-sheet-body .code-editor { font-size: 12px; padding: 14px 14px; }

@media (max-width: 380px) {
  .ios-grid { grid-template-columns: repeat(4, 1fr); gap: 18px 10px; }
  .ios-icon-glyph { width: 52px; height: 52px; font-size: 22px; }
}

@media (prefers-reduced-motion: reduce) {
  .mac-window.opening {
    animation: none !important;
    transition: none !important;
  }
}
`;
