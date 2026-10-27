"use client";

import { useId } from "react";

type Props = {
  className?: string;
};

/**
 * Same mark as Cursor-Site-Victor `VekonHeroMark`
 * (LoginCircleMark chrome + LandingLivingRing + outer dashed arc).
 */
export function LivingRingMark({ className = "" }: Props) {
  const gradientId = useId().replace(/:/g, "");

  return (
    <div className={`living-ring ${className}`.trim()} aria-hidden>
      <span className="living-ring__bloom" />
      <span className="living-ring__outer" />
      <span className="living-ring__inner" />

      <div className="living-ring__living">
        <svg viewBox="0 0 100 100" className="living-ring__svg">
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
              <stop
                className="living-ring__g1"
                offset="0"
                stopColor="rgba(0,0,0,0.18)"
              />
              <stop
                className="living-ring__g2"
                offset="0.55"
                stopColor="rgba(0,0,0,0.55)"
              />
              <stop
                className="living-ring__g3"
                offset="1"
                stopColor="rgba(0,0,0,0.12)"
              />
            </linearGradient>
          </defs>

          <circle
            cx="50"
            cy="50"
            r="41"
            className="living-ring__arc"
            strokeWidth="1.6"
            strokeLinecap="round"
            fill="none"
            strokeDasharray="14 9 8 11 18 7"
          />
          <circle
            cx="50"
            cy="50"
            r="34"
            className="living-ring__base"
            strokeWidth="8"
            fill="none"
          />
          <g className="living-ring__spin">
            <circle
              cx="50"
              cy="50"
              r="34"
              stroke={`url(#${gradientId})`}
              strokeWidth="8"
              strokeLinecap="round"
              fill="none"
              strokeDasharray="24 10"
              className="living-ring__pulse"
            />
            <circle
              cx="50"
              cy="50"
              r="26"
              className="living-ring__thin living-ring__wobble"
              strokeWidth="2"
              fill="none"
              strokeDasharray="10 6"
            />
          </g>
        </svg>
      </div>

      <div className="living-ring__center">
        <div className="living-ring__wordmark">
          <span className="living-ring__measure">VEKON</span>
          <span className="living-ring__dots">VEKON</span>
        </div>
        <p className="living-ring__subtitle">Memory • Personas</p>
      </div>
    </div>
  );
}
