import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const Scissors3DIcon: React.FC<IconProps> = ({ className = '', size = 48 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`drop-shadow-[0_8px_16px_rgba(212,175,55,0.3)] transition-transform hover:scale-105 duration-300 ${className}`}
  >
    <defs>
      <linearGradient id="goldSheen" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFF2B2" />
        <stop offset="30%" stopColor="#D4AF37" />
        <stop offset="70%" stopColor="#AA771C" />
        <stop offset="100%" stopColor="#684705" />
      </linearGradient>
      <linearGradient id="bladeGrad" x1="10" y1="10" x2="50" y2="50" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="40%" stopColor="#E2E8F0" />
        <stop offset="70%" stopColor="#94A3B8" />
        <stop offset="100%" stopColor="#475569" />
      </linearGradient>
      <radialGradient id="screwGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFF9D2" />
        <stop offset="60%" stopColor="#D4AF37" />
        <stop offset="100%" stopColor="#5B3E03" />
      </radialGradient>
      <filter id="shadow3d" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="#000000" floodOpacity="0.7" />
      </filter>
    </defs>

    {/* Primary Blade */}
    <path
      d="M18 10C24 22 34 30 46 42L44 45C30 33 22 24 16 11L18 10Z"
      fill="url(#bladeGrad)"
      filter="url(#shadow3d)"
    />
    <path d="M19 12L43 43" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" opacity="0.8" />

    {/* Secondary Blade */}
    <path
      d="M46 10C40 22 30 30 18 42L16 45C30 33 38 24 44 11L46 10Z"
      fill="url(#bladeGrad)"
      filter="url(#shadow3d)"
    />
    <path d="M45 12L21 43" stroke="#CBD5E1" strokeWidth="1" strokeLinecap="round" opacity="0.6" />

    {/* Handle Left Ring */}
    <circle cx="16" cy="48" r="9" stroke="url(#goldSheen)" strokeWidth="4" fill="#121212" filter="url(#shadow3d)" />
    <circle cx="16" cy="48" r="6" stroke="#FFE79A" strokeWidth="1" opacity="0.6" />

    {/* Handle Right Ring */}
    <circle cx="48" cy="48" r="9" stroke="url(#goldSheen)" strokeWidth="4" fill="#121212" filter="url(#shadow3d)" />
    <circle cx="48" cy="48" r="6" stroke="#FFE79A" strokeWidth="1" opacity="0.6" />

    {/* Golden Pivot Screw */}
    <circle cx="32" cy="28" r="4.5" fill="url(#screwGlow)" filter="url(#shadow3d)" />
    <circle cx="32" cy="28" r="2.5" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.7" />
    <circle cx="32" cy="28" r="1" fill="#3D2900" />
  </svg>
);

export const Beard3DIcon: React.FC<IconProps> = ({ className = '', size = 48 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`drop-shadow-[0_8px_16px_rgba(212,175,55,0.3)] transition-transform hover:scale-105 duration-300 ${className}`}
  >
    <defs>
      <linearGradient id="razorGold" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFF3B8" />
        <stop offset="35%" stopColor="#D4AF37" />
        <stop offset="75%" stopColor="#8C6212" />
        <stop offset="100%" stopColor="#4A3100" />
      </linearGradient>
      <linearGradient id="razorSteel" x1="0" y1="0" x2="50" y2="20" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="50%" stopColor="#CBD5E1" />
        <stop offset="100%" stopColor="#64748B" />
      </linearGradient>
      <radialGradient id="beardGleam" cx="32" cy="44" r="18" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#2A241A" />
        <stop offset="70%" stopColor="#14110C" />
        <stop offset="100%" stopColor="#080705" />
      </radialGradient>
    </defs>

    {/* Elegant Mustache & Beard Outline in 3D */}
    <path
      d="M32 30C26 26 16 28 14 34C18 36 25 35 32 39C39 35 46 36 50 34C48 28 38 26 32 30Z"
      fill="url(#razorGold)"
    />

    {/* Sculpted Beard Body */}
    <path
      d="M20 37C20 48 25 56 32 58C39 56 44 48 44 37C39 41 35 42 32 42C29 42 25 41 20 37Z"
      fill="url(#beardGleam)"
      stroke="url(#razorGold)"
      strokeWidth="2"
    />

    {/* Straight Razor Floating Blade in 3D Angle */}
    <g transform="rotate(-25 32 18)">
      {/* Razor Handle */}
      <rect x="18" y="16" width="30" height="5" rx="2.5" fill="url(#razorGold)" />
      <circle cx="21" cy="18.5" r="1.5" fill="#FFE58F" />
      {/* Steel Blade */}
      <path d="M26 12L46 12L44 16L24 16Z" fill="url(#razorSteel)" />
      <line x1="26" y1="12" x2="46" y2="12" stroke="#FFFFFF" strokeWidth="0.8" />
    </g>
  </svg>
);

export const Combo3DIcon: React.FC<IconProps> = ({ className = '', size = 48 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`drop-shadow-[0_8px_16px_rgba(212,175,55,0.3)] transition-transform hover:scale-105 duration-300 ${className}`}
  >
    <defs>
      <linearGradient id="comboGold" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFF6C2" />
        <stop offset="30%" stopColor="#E5C158" />
        <stop offset="70%" stopColor="#B38422" />
        <stop offset="100%" stopColor="#5E3F05" />
      </linearGradient>
      <linearGradient id="badgeRedGold" x1="0" y1="0" x2="20" y2="20" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#D4AF37" />
        <stop offset="100%" stopColor="#8A670D" />
      </linearGradient>
    </defs>

    {/* Shield Base */}
    <path
      d="M32 6L48 14V30C48 42 38 52 32 58C26 52 16 42 16 30V14L32 6Z"
      fill="#141414"
      stroke="url(#comboGold)"
      strokeWidth="2.5"
    />
    <path
      d="M32 10L44 17V30C44 39 36 47 32 52C28 47 20 39 20 30V17L32 10Z"
      fill="#0A0A0A"
    />

    {/* Shears Accent */}
    <line x1="25" y1="20" x2="39" y2="34" stroke="url(#comboGold)" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="39" y1="20" x2="25" y2="34" stroke="url(#comboGold)" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="32" cy="27" r="2.5" fill="#FFE899" />

    {/* Crown Top / Luxury Emblem */}
    <path
      d="M26 42C26 46 29 49 32 50C35 49 38 46 38 42C35 44 33 44 32 44C31 44 29 44 26 42Z"
      fill="url(#comboGold)"
    />

    {/* 5% OFF Sparkle */}
    <circle cx="46" cy="14" r="7" fill="url(#badgeRedGold)" />
    <text x="46" y="17" fill="#0A0A0A" fontSize="7" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">
      -5%
    </text>
  </svg>
);

export const Eyebrow3DIcon: React.FC<IconProps> = ({ className = '', size = 48 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`drop-shadow-[0_8px_16px_rgba(212,175,55,0.3)] transition-transform hover:scale-105 duration-300 ${className}`}
  >
    <defs>
      <linearGradient id="eyeGold" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFF2B2" />
        <stop offset="40%" stopColor="#D4AF37" />
        <stop offset="100%" stopColor="#634507" />
      </linearGradient>
    </defs>
    {/* Sculpted Eyebrow Arch */}
    <path
      d="M12 36C20 25 36 21 52 30C46 32 34 30 22 38C18 39 15 39 12 36Z"
      fill="url(#eyeGold)"
    />
    <path
      d="M14 35C24 26 38 24 50 31"
      stroke="#FFF9D2"
      strokeWidth="1.2"
      strokeLinecap="round"
      opacity="0.8"
    />
    {/* Precision Micro-Blade */}
    <line x1="42" y1="14" x2="28" y2="30" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="48" y1="8" x2="42" y2="14" stroke="url(#eyeGold)" strokeWidth="4" strokeLinecap="round" />
    <circle cx="44" cy="12" r="1.5" fill="#FFE899" />
  </svg>
);

export const Straightening3DIcon: React.FC<IconProps> = ({ className = '', size = 48 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`drop-shadow-[0_8px_16px_rgba(212,175,55,0.3)] transition-transform hover:scale-105 duration-300 ${className}`}
  >
    <defs>
      <linearGradient id="selagemGold" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFBE6" />
        <stop offset="30%" stopColor="#E5C158" />
        <stop offset="70%" stopColor="#A87814" />
        <stop offset="100%" stopColor="#4A3403" />
      </linearGradient>
    </defs>
    {/* Silk Gloss Strand Flow */}
    <path
      d="M20 12C28 20 20 34 26 44C30 50 38 52 44 48C40 44 34 40 32 32C30 24 38 18 34 12Z"
      fill="url(#selagemGold)"
    />
    {/* Thermal Iron Plates in Gold */}
    <rect x="36" y="16" width="16" height="5" rx="2" fill="#E2E8F0" />
    <rect x="36" y="24" width="16" height="5" rx="2" fill="#E2E8F0" />
    <line x1="44" y1="21" x2="44" y2="24" stroke="url(#selagemGold)" strokeWidth="2" />
    <circle cx="48" cy="18.5" r="1" fill="#D4AF37" />
    {/* Sparkle Highlights */}
    <circle cx="18" cy="24" r="2" fill="#FFE899" />
    <circle cx="46" cy="40" r="2.5" fill="#FFF2B2" />
  </svg>
);

export const Calendar3DIcon: React.FC<IconProps> = ({ className = '', size = 48 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`drop-shadow-[0_8px_16px_rgba(212,175,55,0.3)] transition-transform hover:scale-105 duration-300 ${className}`}
  >
    <defs>
      <linearGradient id="calGold" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFF4BE" />
        <stop offset="35%" stopColor="#D4AF37" />
        <stop offset="75%" stopColor="#996E14" />
        <stop offset="100%" stopColor="#4D3402" />
      </linearGradient>
      <linearGradient id="calPlate" x1="12" y1="16" x2="52" y2="56" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#1E1E1E" />
        <stop offset="100%" stopColor="#0D0D0D" />
      </linearGradient>
    </defs>

    {/* 3D Calendar Body */}
    <rect x="10" y="14" width="44" height="42" rx="8" fill="url(#calPlate)" stroke="url(#calGold)" strokeWidth="2.5" />
    {/* Top Header Strip */}
    <path d="M10 22C10 16.5 14.5 14 20 14H44C49.5 14 54 16.5 54 22V24H10V22Z" fill="url(#calGold)" />

    {/* Gold Rings */}
    <rect x="18" y="9" width="4" height="10" rx="2" fill="#FFE799" />
    <rect x="30" y="9" width="4" height="10" rx="2" fill="#FFE799" />
    <rect x="42" y="9" width="4" height="10" rx="2" fill="#FFE799" />

    {/* Grid Dots / Number */}
    <circle cx="20" cy="32" r="2" fill="#9CA3AF" />
    <circle cx="28" cy="32" r="2" fill="#9CA3AF" />
    <circle cx="36" cy="32" r="2" fill="#9CA3AF" />
    <circle cx="44" cy="32" r="2" fill="#9CA3AF" />

    <circle cx="20" cy="40" r="2" fill="#9CA3AF" />
    <circle cx="28" cy="40" r="2.5" fill="#D4AF37" />
    <circle cx="36" cy="40" r="2" fill="#9CA3AF" />
    <circle cx="44" cy="40" r="2" fill="#9CA3AF" />

    <circle cx="20" cy="48" r="2" fill="#9CA3AF" />
    <circle cx="28" cy="48" r="2" fill="#9CA3AF" />
    <circle cx="36" cy="48" r="2" fill="#9CA3AF" />
  </svg>
);

export const Clock3DIcon: React.FC<IconProps> = ({ className = '', size = 48 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`drop-shadow-[0_8px_16px_rgba(212,175,55,0.3)] transition-transform hover:scale-105 duration-300 ${className}`}
  >
    <defs>
      <linearGradient id="clockGold" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFF6C2" />
        <stop offset="35%" stopColor="#D4AF37" />
        <stop offset="75%" stopColor="#8C6212" />
        <stop offset="100%" stopColor="#452F01" />
      </linearGradient>
      <radialGradient id="clockFace" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#1A1A1A" />
        <stop offset="85%" stopColor="#0F0F0F" />
        <stop offset="100%" stopColor="#050505" />
      </radialGradient>
    </defs>

    {/* Outer Bevel */}
    <circle cx="32" cy="34" r="22" fill="url(#clockFace)" stroke="url(#clockGold)" strokeWidth="3" />
    <circle cx="32" cy="34" r="18" stroke="#FFEAA7" strokeWidth="0.75" opacity="0.3" />

    {/* Crown Top Button */}
    <rect x="29" y="8" width="6" height="5" rx="1.5" fill="url(#clockGold)" />
    <circle cx="32" cy="7" r="4" stroke="url(#clockGold)" strokeWidth="1.5" fill="none" />

    {/* Hour Markers */}
    <line x1="32" y1="18" x2="32" y2="21" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
    <line x1="48" y1="34" x2="45" y2="34" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
    <line x1="32" y1="50" x2="32" y2="47" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
    <line x1="16" y1="34" x2="19" y2="34" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />

    {/* Hands pointing to 10:10 style */}
    <line x1="32" y1="34" x2="25" y2="26" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="32" y1="34" x2="42" y2="27" stroke="url(#clockGold)" strokeWidth="2" strokeLinecap="round" />
    <circle cx="32" cy="34" r="2.5" fill="#FFE58F" />
  </svg>
);

export const WhatsApp3DIcon: React.FC<IconProps> = ({ className = '', size = 48 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`drop-shadow-[0_8px_16px_rgba(37,211,102,0.35)] transition-transform hover:scale-105 duration-300 ${className}`}
  >
    <defs>
      <linearGradient id="waGreen" x1="12" y1="8" x2="52" y2="52" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#4ADE80" />
        <stop offset="45%" stopColor="#22C55E" />
        <stop offset="100%" stopColor="#15803D" />
      </linearGradient>
      <linearGradient id="waRim" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFF2A3" />
        <stop offset="50%" stopColor="#D4AF37" />
        <stop offset="100%" stopColor="#8C6212" />
      </linearGradient>
    </defs>

    {/* 3D Bubble */}
    <circle cx="32" cy="31" r="21" fill="url(#waGreen)" stroke="url(#waRim)" strokeWidth="2.5" />
    <path
      d="M19 44L17 53L26 50C28 51 30 52 32 52C43.5 52 53 42.5 53 31C53 19.5 43.5 10 32 10C20.5 10 11 19.5 11 31C11 35 12.5 38.5 15 41.5L19 44Z"
      fill="url(#waGreen)"
      stroke="url(#waRim)"
      strokeWidth="2"
    />

    {/* Inner Handset */}
    <path
      d="M24 22C23.5 22 22.5 23 22 24C21.5 25.5 21 28 23 32C25 36 28 39 32 41C36 43 38.5 42.5 40 42C41 41.5 42 40.5 42 40C42 39.5 40.5 38 39 37C37.5 36 36.5 36 35.5 37C34.5 38 34 38.5 33 38C31 37 27 33 26 31C25.5 30 26 29.5 27 28.5C28 27.5 28 26.5 27 25C26 23.5 24.5 22 24 22Z"
      fill="#FFFFFF"
    />
  </svg>
);

export const Checkmark3DIcon: React.FC<IconProps> = ({ className = '', size = 48 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`drop-shadow-[0_8px_20px_rgba(212,175,55,0.4)] ${className}`}
  >
    <defs>
      <linearGradient id="checkGold" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFDF0" />
        <stop offset="30%" stopColor="#F5D77F" />
        <stop offset="65%" stopColor="#D4AF37" />
        <stop offset="100%" stopColor="#7A560C" />
      </linearGradient>
      <radialGradient id="checkGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#241E11" />
        <stop offset="85%" stopColor="#141108" />
        <stop offset="100%" stopColor="#080703" />
      </radialGradient>
    </defs>

    {/* Outer Seal Medallion */}
    <circle cx="32" cy="32" r="26" fill="url(#checkGlow)" stroke="url(#checkGold)" strokeWidth="3" />
    <circle cx="32" cy="32" r="21" stroke="#FFEBB0" strokeWidth="1" opacity="0.4" strokeDasharray="3 3" />

    {/* Checkmark in solid polished gold */}
    <path
      d="M21 32L28 39L43 23"
      stroke="url(#checkGold)"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21 32L28 39L43 23"
      stroke="#FFFFFF"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.75"
    />
  </svg>
);

export const Lock3DIcon: React.FC<IconProps> = ({ className = '', size = 32 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`drop-shadow-[0_4px_12px_rgba(239,68,68,0.4)] ${className}`}
  >
    <defs>
      <linearGradient id="shackleSteel" x1="16" y1="8" x2="48" y2="32" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="30%" stopColor="#E2E8F0" />
        <stop offset="70%" stopColor="#94A3B8" />
        <stop offset="100%" stopColor="#475569" />
      </linearGradient>
      <linearGradient id="lockBody" x1="12" y1="26" x2="52" y2="58" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#991B1B" />
        <stop offset="40%" stopColor="#7F1D1D" />
        <stop offset="100%" stopColor="#450A0A" />
      </linearGradient>
      <linearGradient id="lockBevelGold" x1="12" y1="26" x2="52" y2="58" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFF2A3" />
        <stop offset="50%" stopColor="#D4AF37" />
        <stop offset="100%" stopColor="#8C6212" />
      </linearGradient>
    </defs>
    {/* 3D Shackle */}
    <path
      d="M20 30V19C20 12.3726 25.3726 7 32 7C38.6274 7 44 12.3726 44 19V30"
      stroke="url(#shackleSteel)"
      strokeWidth="6"
      strokeLinecap="round"
    />
    <path
      d="M22 19C22 13.5 26.5 9 32 9C37.5 9 42 13.5 42 19V30"
      stroke="#FFFFFF"
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.6"
    />
    {/* 3D Body */}
    <rect
      x="12"
      y="26"
      width="40"
      height="32"
      rx="7"
      fill="url(#lockBody)"
      stroke="url(#lockBevelGold)"
      strokeWidth="2.5"
    />
    {/* Specular Highlight Strip */}
    <path d="M16 29H48" stroke="#FFA3A3" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
    {/* Keyhole */}
    <circle cx="32" cy="40" r="4" fill="#000000" />
    <path d="M30 40L29 48H35L34 40Z" fill="#000000" />
    <circle cx="32" cy="40" r="2" fill="url(#lockBevelGold)" />
  </svg>
);

export const Sparkle3DIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`drop-shadow-[0_2px_8px_rgba(212,175,55,0.6)] ${className}`}
  >
    <defs>
      <linearGradient id="starGold" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="35%" stopColor="#FFF2A3" />
        <stop offset="70%" stopColor="#D4AF37" />
        <stop offset="100%" stopColor="#8C6212" />
      </linearGradient>
    </defs>
    <path
      d="M16 2L19.5 12.5L30 16L19.5 19.5L16 30L12.5 19.5L2 16L12.5 12.5L16 2Z"
      fill="url(#starGold)"
    />
    <circle cx="16" cy="16" r="3" fill="#FFFFFF" opacity="0.9" />
  </svg>
);

