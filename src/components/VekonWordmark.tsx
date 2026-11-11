/**
 * The Vekon wordmark built from live parts instead of an image, so it stays
 * sharp at header size: a CSS pill outline (snaps to whole pixels), the word
 * in EB Garamond (hinted text), and the orange four-point star as a tiny SVG.
 */
export function VekonWordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`vk-wm ${className}`.trim()} role="img" aria-label="Vekon">
      <svg className="vk-wm__star" viewBox="0 0 20 20" aria-hidden>
        <path d="M10 0C10.9 6.6 13.4 9.1 20 10C13.4 10.9 10.9 13.4 10 20C9.1 13.4 6.6 10.9 0 10C6.6 9.1 9.1 6.6 10 0Z" />
      </svg>
      <span className="vk-wm__word" aria-hidden>
        VEKON
      </span>
    </span>
  );
}
