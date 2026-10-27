"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const COPIES = 9;
/** Índice em que ambos os trilhos param — texto final alinhado. */
const FINAL_INDEX = 4;
const CELL = 88;

const LEFT_WORDS = [
  "Archive",
  "Label",
  "Studio",
  "Field",
  "Vekon:",
  "Object",
  "Gallery",
  "Schema",
  "Vekon:",
];

const RIGHT_WORDS = [
  "Schema",
  "Zine",
  "Release",
  "Object",
  "Papers",
  "Mark",
  "Frame",
  "Egg",
  "Papers",
];

function WordReelColumn({
  words,
  direction,
  width,
}: {
  words: string[];
  /** 1 = sobe, -1 = desce */
  direction: 1 | -1;
  width: number;
}) {
  const startIndex = direction === 1 ? 0 : COPIES - 1;
  const startY = -startIndex * CELL;
  const endY = -FINAL_INDEX * CELL;

  return (
    <div
      className="site-intro__reel"
      style={{
        height: CELL,
        width,
      }}
    >
      <motion.div
        className="site-intro__track"
        initial={{ y: startY }}
        animate={{ y: endY }}
        transition={{
          duration: 1.4,
          delay: 0.08,
          ease: [0.65, 0.05, 0.18, 1],
        }}
      >
        {words.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="site-intro__word"
            style={{ height: CELL, width }}
            aria-hidden
          >
            {word}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/** Intro: dois trilhos em roleta; param em “Vekon: Papers”. */
export function SiteIntro() {
  const [phase, setPhase] = useState<"boot" | "play" | "done">("boot");

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setPhase("done");
      return;
    }

    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      document.body.style.overflow = "";
      setPhase("done");
    };

    setPhase("play");
    document.body.style.overflow = "hidden";

    const doneAt = window.setTimeout(finish, 2000);
    const safetyAt = window.setTimeout(finish, 4000);

    return () => {
      window.clearTimeout(doneAt);
      window.clearTimeout(safetyAt);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {phase === "play" ? (
        <motion.div
          key="site-intro"
          className="site-intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          aria-hidden
        >
          <div className="site-intro__pair">
            <WordReelColumn words={LEFT_WORDS} direction={1} width={200} />
            <WordReelColumn words={RIGHT_WORDS} direction={-1} width={180} />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
