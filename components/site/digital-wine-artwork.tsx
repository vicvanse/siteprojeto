interface DigitalWineArtworkProps {
  className?: string;
}

export function DigitalWineArtwork({
  className = "",
}: DigitalWineArtworkProps) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute right-0 top-1/2 hidden -translate-y-1/2 translate-x-3 overflow-visible sm:translate-x-5 lg:translate-x-7 xl:translate-x-10 2xl:translate-x-12 lg:block ${className}`}
    >
      <svg
        viewBox="0 0 1020 960"
        overflow="visible"
        className="h-auto w-full overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="wineTop" x1="530" y1="56" x2="830" y2="236">
            <stop offset="0%" stopColor="#86152d" />
            <stop offset="100%" stopColor="#791126" />
          </linearGradient>

          <radialGradient
            id="wineCircle"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(706 330) rotate(90) scale(176)"
          >
            <stop offset="0%" stopColor="#9b1632" />
            <stop offset="58%" stopColor="#8a132d" />
            <stop offset="100%" stopColor="#751027" />
          </radialGradient>

          <linearGradient id="wineGlass" x1="626" y1="160" x2="738" y2="718">
            <stop offset="0%" stopColor="#f2cdd6" stopOpacity="0.26" />
            <stop offset="100%" stopColor="#791126" stopOpacity="0.1" />
          </linearGradient>

          <linearGradient id="wineBand" x1="815" y1="318" x2="1025" y2="508">
            <stop offset="0%" stopColor="#8c132e" />
            <stop offset="100%" stopColor="#791126" />
          </linearGradient>

          <radialGradient
            id="greyOrb"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(820 250) rotate(90) scale(230)"
          >
            <stop offset="0%" stopColor="#dad5d4" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#cfc8c7" stopOpacity="0.28" />
          </radialGradient>

          <radialGradient
            id="greyBlob"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(828 414) rotate(90) scale(210)"
          >
            <stop offset="0%" stopColor="#eee8e8" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#d7d0cf" stopOpacity="0.25" />
          </radialGradient>

          <radialGradient
            id="wineBottom"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(785 742) rotate(90) scale(172)"
          >
            <stop offset="0%" stopColor="#97203a" />
            <stop offset="100%" stopColor="#791126" />
          </radialGradient>

          <pattern
            id="dotsWine"
            width="18"
            height="18"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="3" cy="3" r="1.7" fill="#7a1024" fillOpacity="0.28" />
          </pattern>

          <pattern
            id="dotsGrey"
            width="16"
            height="16"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2.5" cy="2.5" r="1.5" fill="#000" fillOpacity="0.08" />
          </pattern>

          <filter id="softBlur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="12" />
          </filter>
        </defs>

        <circle cx="820" cy="250" r="230" fill="url(#greyOrb)" />
        <rect
          x="530"
          y="56"
          width="300"
          height="180"
          rx="24"
          fill="url(#wineTop)"
        />
        <circle cx="706" cy="330" r="176" fill="url(#wineCircle)" />

        <rect
          x="626"
          y="160"
          width="112"
          height="558"
          rx="28"
          fill="url(#wineGlass)"
        />

        <path
          d="M704 176C754 152 836 166 878 212C919 257 918 328 898 376C876 428 827 458 800 506C776 548 768 620 718 645C669 670 601 646 573 602C545 558 560 498 549 447C538 390 489 328 515 275C546 212 639 202 704 176Z"
          fill="url(#greyBlob)"
          opacity="0.78"
        />

        <rect
          x="790"
          y="306"
          width="210"
          height="196"
          rx="30"
          fill="url(#wineBand)"
        />

        <circle
          cx="785"
          cy="742"
          r="172"
          fill="url(#wineBottom)"
          opacity="0.94"
        />
        <rect
          x="760"
          y="608"
          width="280"
          height="264"
          fill="#8d162d"
          opacity="0.9"
        />
        <rect
          x="882"
          y="190"
          width="98"
          height="426"
          rx="22"
          fill="#ddd8d7"
          opacity="0.18"
        />

        <rect
          x="882"
          y="76"
          width="112"
          height="82"
          fill="url(#dotsWine)"
          opacity="0.8"
        />
        <rect
          x="466"
          y="250"
          width="140"
          height="170"
          fill="url(#dotsGrey)"
          opacity="0.5"
        />
        <rect
          x="612"
          y="590"
          width="124"
          height="138"
          fill="url(#dotsGrey)"
          opacity="0.42"
        />
        <rect
          x="540"
          y="694"
          width="80"
          height="80"
          fill="url(#dotsWine)"
          opacity="0.75"
        />
        <rect
          x="928"
          y="520"
          width="78"
          height="78"
          fill="url(#dotsWine)"
          opacity="0.72"
        />

        <g stroke="#7b1224" strokeOpacity="0.42" strokeWidth="1.25">
          <path d="M694 14V56" />
          <path d="M692 56C692 112 644 110 644 160" />
          <path d="M444 152H530" />
          <path d="M430 152H356" />
          <path d="M706 0V718" />
          <path d="M752 0V636" />
          <path d="M790 402H980" />
          <path d="M618 468C658 468 690 498 690 536V598" />
          <path d="M468 726C530 640 618 620 704 650C760 669 801 719 801 772" />
          <path d="M472 796H650C710 796 742 826 778 844" />
          <path d="M846 248C886 248 920 230 952 194C970 174 993 166 1014 166" />
          <path d="M888 642H980" />
          <path d="M842 316C900 316 948 296 980 258" />
        </g>

        <g stroke="#7b1224" strokeOpacity="0.55">
          <circle cx="694" cy="14" r="4.5" fill="#7b1224" />
          <circle cx="644" cy="160" r="4.5" fill="#7b1224" />
          <circle cx="706" cy="402" r="4.5" fill="#7b1224" />
          <circle cx="620" cy="774" r="4.5" fill="#7b1224" />
          <circle cx="778" cy="844" r="5.2" fill="#7b1224" />
          <circle cx="980" cy="258" r="4.5" fill="#7b1224" />
          <circle cx="1014" cy="166" r="7.5" />
        </g>

        <g stroke="#7b1224" strokeOpacity="0.42" strokeWidth="1.2">
          <path d="M896 216C944 216 984 256 984 304" />
          <path d="M886 228C924 228 956 260 956 298" />
        </g>

        <g fill="#7b1224">
          <rect x="922" y="40" width="9" height="9" />
          <rect x="954" y="40" width="9" height="9" />
          <rect x="986" y="40" width="9" height="9" />
          <rect x="540" y="780" width="10" height="10" />
          <rect x="560" y="780" width="10" height="10" />
          <rect x="580" y="780" width="10" height="10" />
        </g>

        <g fill="#8e8a89" opacity="0.65">
          <rect x="426" y="248" width="9" height="9" />
          <rect x="458" y="248" width="9" height="9" />
          <rect x="490" y="248" width="9" height="9" />
        </g>

        <ellipse
          cx="720"
          cy="330"
          rx="214"
          ry="154"
          fill="#8b132e"
          opacity="0.08"
          filter="url(#softBlur)"
        />
      </svg>
    </div>
  );
}
