import type { IconName } from '@/lib/types';

/*
 * Set de íconos de línea NOUFON — trazo 1.75, 24×24, currentColor.
 * Reemplaza el 100% de los emojis de la UI (regla de diseño).
 */

const paths: Record<IconName, React.ReactNode> = {
  focus: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
      <path d="M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" opacity=".45" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.25" />
      <path d="M3.5 19.5c.6-3.1 2.8-5 5.5-5s4.9 1.9 5.5 5" />
      <path d="M15.5 5.2a3.25 3.25 0 110 5.9M17.2 14.7c1.8.6 3 2.2 3.4 4.4" />
    </>
  ),
  teacher: (
    <>
      <rect x="3" y="4" width="18" height="12" rx="1.5" />
      <path d="M7 8.5h6M7 11.5h4" />
      <path d="M12 16v2.5M8 21l4-2.5 4 2.5" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7 3v5c0 4.5-3 8.4-7 10-4-1.6-7-5.5-7-10V6l7-3z" />
      <path d="M9 12l2.2 2.2L15.5 10" />
    </>
  ),
  spark: (
    <>
      <path d="M12 3l1.9 5.6L19.5 10l-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.4L12 3z" />
      <path d="M18.5 16.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2z" opacity=".5" />
    </>
  ),
  eye: (
    <>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="10.5" width="14" height="9.5" rx="2" />
      <path d="M8 10.5V8a4 4 0 018 0v2.5" />
      <circle cx="12" cy="15.2" r="1.3" fill="currentColor" stroke="none" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  fileCheck: (
    <>
      <path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8l-5-5z" />
      <path d="M14 3v5h5" />
      <path d="M9 14.5l2 2 4-4" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.5 2.3 3.8 5.2 3.8 8.5s-1.3 6.2-3.8 8.5c-2.5-2.3-3.8-5.2-3.8-8.5s1.3-6.2 3.8-8.5z" />
    </>
  ),
  hand: (
    <>
      <path d="M8 11.5V5.8a1.4 1.4 0 012.8 0v4.7" />
      <path d="M10.8 10.2V4.4a1.4 1.4 0 012.8 0v5.8" />
      <path d="M13.6 10.5V5.6a1.4 1.4 0 012.8 0v6.9c0 4-2.4 6.8-6 6.8-2.8 0-4.3-1.4-5.9-4.2L3.3 13c-.5-.9-.2-1.8.6-2.2.7-.4 1.5-.2 2 .5L8 13.6" />
    </>
  ),
  badge: (
    <>
      <circle cx="12" cy="9.5" r="5.5" />
      <path d="M9.5 9.2l1.8 1.8 3.2-3.2" />
      <path d="M8.6 14.2L7.5 21l4.5-2.6L16.5 21l-1.1-6.8" />
    </>
  ),
  mask: (
    <>
      <path d="M4 5c2.6.9 5.3.9 8 0 2.7.9 5.4.9 8 0v6.5c0 5-3.5 8.5-8 9.5-4.5-1-8-4.5-8-9.5V5z" />
      <path d="M8 10.5c.7-.7 1.8-.7 2.5 0M13.5 10.5c.7-.7 1.8-.7 2.5 0M9 15.5c1.9 1.4 4.1 1.4 6 0" />
    </>
  ),
  moon: (
    <>
      <path d="M20 14.5A8.5 8.5 0 119.5 4 7 7 0 0020 14.5z" />
      <path d="M16 4.5l.6 1.6 1.6.6-1.6.6-.6 1.6-.6-1.6-1.6-.6 1.6-.6.6-1.6z" opacity=".5" />
    </>
  ),
  mic: (
    <>
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5.5 11.5a6.5 6.5 0 0013 0M12 18v3M9 21h6" />
    </>
  ),
  scale: (
    <>
      <path d="M12 4v16M7.5 20.5h9M12 4l-6 2.5M12 4l6 2.5" />
      <path d="M6 6.5l-2.8 6a3 3 0 005.6 0L6 6.5zM18 6.5l-2.8 6a3 3 0 005.6 0L18 6.5z" />
    </>
  ),
  gavel: (
    <>
      <path d="M10 5.5l5.5 5.5M8 7.5l5.5 5.5M9 4.5L6.5 7 12 12.5 14.5 10 9 4.5z" />
      <path d="M11.5 13l-7 7M3.5 21h9" transform="translate(1.5 -1.5)" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3" y="7.5" width="18" height="12.5" rx="2" />
      <path d="M9 7.5V6a2 2 0 012-2h2a2 2 0 012 2v1.5M3 12.5h18" />
    </>
  ),
  signalOff: (
    <>
      <path d="M4 19.5c0-7 5-13 12-15M8.5 19.5c.4-4.2 3-7.8 7-9.5" opacity=".45" />
      <circle cx="18" cy="17.5" r="2" />
      <path d="M3.5 3.5l17 17" />
    </>
  ),
  doc: (
    <>
      <path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8l-5-5z" />
      <path d="M14 3v5h5M8.5 13h7M8.5 16.5h5" />
    </>
  ),
  heart: (
    <>
      <path d="M12 20s-7.5-4.6-9.3-9.2C1.5 7.6 3.6 4.5 6.8 4.5c2 0 3.6 1 4.5 2.6.2.4.5.4.7 0 .9-1.6 2.5-2.6 4.5-2.6 3.2 0 5.3 3.1 4.1 6.3C19.5 15.4 12 20 12 20z" />
    </>
  ),
  building: (
    <>
      <path d="M4 21V5a2 2 0 012-2h8a2 2 0 012 2v16M16 9h2a2 2 0 012 2v10M2.5 21h19" />
      <path d="M8 7h2M12 7h2M8 11h2M12 11h2M8 15h2M12 15h2" opacity=".6" />
    </>
  ),
};

export function Icon({
  name,
  size = 26,
  className,
}: {
  name: IconName;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {paths[name]}
    </svg>
  );
}
