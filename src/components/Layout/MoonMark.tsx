import { useId } from 'react';

interface MoonMarkProps {
  className?: string;
  title?: string;
}

const MoonMark = ({ className, title }: MoonMarkProps) => {
  // useId output contains colons, which break url(#...) references.
  const id = useId().replace(/:/g, '');

  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      <defs>
        <linearGradient id={`${id}-gold`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fff3b0" />
          <stop offset="55%" stopColor="#f7c948" />
          <stop offset="100%" stopColor="#e89a2c" />
        </linearGradient>
        <mask id={`${id}-cut`}>
          <rect width="64" height="64" fill="white" />
          <circle cx="40" cy="24" r="20" fill="black" />
        </mask>
      </defs>
      <circle cx="30" cy="34" r="22" fill={`url(#${id}-gold)`} mask={`url(#${id}-cut)`} />
      <path d="M50 6l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill="#ff8fc4" />
    </svg>
  );
};

export default MoonMark;
