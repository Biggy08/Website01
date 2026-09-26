type IconName = "sun" | "moon" | "lock" | "check" | "bolt" | "shield" | "target" | "idea" | "pin" | "code" | "server" | "cloud" | "palette";

const paths: Record<IconName, React.ReactNode> = {
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" /></>,
  moon: <path d="M20 15.3A8.5 8.5 0 0 1 8.7 4 8.5 8.5 0 1 0 20 15.3Z" />,
  lock: <><rect x="5" y="10" width="14" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v2" /></>,
  check: <path d="m5 12 4 4L19 6" />,
  bolt: <path d="m13 2-9 12h7l-1 8 9-12h-7l1-8Z" />,
  shield: <path d="M12 3 5 6v5c0 5 3 8 7 10 4-2 7-5 7-10V6l-7-3Z" />,
  target: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3" /><path d="M12 2v2M22 12h-2M12 22v-2M2 12h2" /></>,
  idea: <><path d="M9 18h6M10 22h4M8.5 14.5C7.5 13.5 7 12.2 7 10a5 5 0 0 1 10 0c0 2.2-.5 3.5-1.5 4.5-.8.8-1.2 1.5-1.2 2.5h-4.6c0-1-.4-1.7-1.2-2.5Z" /></>,
  pin: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
  code: <path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14" />,
  server: <><rect x="3" y="4" width="18" height="6" rx="1" /><rect x="3" y="14" width="18" height="6" rx="1" /><path d="M7 7h.01M7 17h.01M11 7h6M11 17h6" /></>,
  cloud: <path d="M17 18H7a4 4 0 1 1 .7-7.94A5.5 5.5 0 0 1 18.2 12 3 3 0 0 1 17 18Z" />,
  palette: <><path d="M12 3a9 9 0 1 0 0 18h1.2c1.2 0 1.7-1.5.7-2.2-.8-.6-.4-1.8.6-1.8H16a5 5 0 0 0 5-5c0-5-4-9-9-9Z" /><circle cx="7.5" cy="11" r=".8" /><circle cx="10" cy="7" r=".8" /><circle cx="15" cy="8" r=".8" /></>,
};

export default function SiteIcon({ name, size = 20 }: { name: IconName; size?: number }) {
  return <svg className="site-icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}
