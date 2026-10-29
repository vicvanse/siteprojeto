import type { ReactNode } from "react";

/** Immersive booklet preview — full-width desk, site chrome stays light. */
export default function BookletLayout({ children }: { children: ReactNode }) {
  return <div className="booklet-route">{children}</div>;
}
