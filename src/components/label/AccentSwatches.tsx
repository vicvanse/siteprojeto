"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { useAccent } from "@/components/AccentProvider";
import { useLanguage } from "@/components/LanguageProvider";
import {
  ACCENT_ORDER,
  ACCENT_PALETTES,
  ACCENT_ROWS,
  STYLE_SELECTED,
  type AccentHue,
} from "@/lib/accent";
import {
  LANGUAGES,
  LANGUAGE_INITIALS,
  LANGUAGE_NAMES,
  type Language,
} from "@/lib/i18n";

/** Mudar estilo — full grid on desktop; compact lang+active color on mobile (expands down). */
export function AccentSwatches() {
  const { hue, setHue, ready } = useAccent();
  const { language, setLanguage, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const toggle = () => setOpen((v) => !v);

  return (
    <div
      ref={rootRef}
      className={`accent-swatches-panel${open ? " accent-swatches-panel--open" : ""}`}
    >
      {/* Mobile collapsed face: current language + current color */}
      <div
        className="accent-swatches__compact"
        role="group"
        aria-label={t("language")}
      >
        <LangChip
          code={language}
          active
          hintDelay={0}
          ariaExpanded={open}
          ariaControls={panelId}
          onClick={toggle}
        />
        <Swatch
          id={hue}
          active={ready}
          hintDelay={1.8}
          ariaExpanded={open}
          ariaControls={panelId}
          onClick={toggle}
        />
      </div>

      <div
        id={panelId}
        className="accent-swatches accent-swatches--full"
        role="group"
        aria-label="Accent color"
      >
        {ACCENT_ROWS.map((row, rowIndex) => (
          <div
            key={rowIndex === 0 ? "accent-row-1" : "accent-row-2"}
            className="accent-swatches__row"
          >
            {row.map((id) => {
              const index = ACCENT_ORDER.indexOf(id);
              return (
                <Swatch
                  key={id}
                  id={id}
                  active={ready && hue === id}
                  hintDelay={(Math.max(0, index) % 6) * 1.8}
                  onClick={() => {
                    setHue(id);
                    setOpen(false);
                  }}
                />
              );
            })}
            {rowIndex === 0 ? (
              <LangChip
                className="accent-swatches__lang-desktop"
                code={language}
                active
                hintDelay={7.2}
                ariaExpanded={open}
                ariaControls={`${panelId}-langs`}
                onClick={toggle}
              />
            ) : null}
          </div>
        ))}

        <div
          id={`${panelId}-langs`}
          className="accent-swatches__langs"
          role="listbox"
          aria-label={t("language")}
        >
          {LANGUAGES.map((code) => (
            <LangChip
              key={code}
              code={code}
              active={code === language}
              onClick={() => {
                setLanguage(code);
                setOpen(false);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Swatch({
  id,
  active,
  hintDelay,
  onClick,
  ariaExpanded,
  ariaControls,
}: {
  id: AccentHue;
  active: boolean;
  hintDelay: number;
  onClick: () => void;
  ariaExpanded?: boolean;
  ariaControls?: string;
}) {
  const palette = ACCENT_PALETTES[id];
  const style: CSSProperties = {
    border: active ? `2px solid ${STYLE_SELECTED}` : "1px solid #d4d4d4",
    boxShadow: active ? `0 0 0 1px ${STYLE_SELECTED}` : "none",
  };
  if (!active) {
    style["--hint-delay" as string] = `${hintDelay}s`;
  }

  return (
    <button
      type="button"
      className={`accent-swatch${active ? " accent-swatch--active" : ""}`}
      aria-label={id}
      aria-pressed={active}
      aria-expanded={ariaExpanded}
      aria-controls={ariaControls}
      title={id}
      suppressHydrationWarning
      style={style}
      onClick={onClick}
    >
      <span
        className="accent-swatch__chip"
        style={{
          background: `linear-gradient(135deg, ${palette.surfaceOdd} 50%, ${palette.selected} 50%)`,
          boxShadow: `0 0 0 1px ${palette.ring}`,
        }}
        aria-hidden
      />
    </button>
  );
}

function LangChip({
  code,
  active,
  hintDelay = 0,
  onClick,
  ariaExpanded,
  ariaControls,
  className = "",
}: {
  code: Language;
  active: boolean;
  hintDelay?: number;
  onClick: () => void;
  ariaExpanded?: boolean;
  ariaControls?: string;
  className?: string;
}) {
  const style: CSSProperties = {
    border: active ? `2px solid ${STYLE_SELECTED}` : "1px solid #d4d4d4",
    boxShadow: active ? `0 0 0 1px ${STYLE_SELECTED}` : "none",
    ["--hint-delay" as string]: `${hintDelay}s`,
  };
  const cjk = code === "zh-CN" || code === "zh-TW";

  return (
    <button
      type="button"
      role="option"
      aria-selected={active}
      aria-label={LANGUAGE_NAMES[code]}
      aria-expanded={ariaExpanded}
      aria-controls={ariaControls}
      className={`accent-swatch lang-swatch${active ? " accent-swatch--active" : ""}${className ? ` ${className}` : ""}`}
      title={LANGUAGE_NAMES[code]}
      style={style}
      onClick={onClick}
    >
      <span
        className={`accent-swatch__chip lang-swatch__chip${
          cjk ? " lang-swatch__chip--cjk" : ""
        }`}
        aria-hidden
      >
        {LANGUAGE_INITIALS[code]}
      </span>
    </button>
  );
}
