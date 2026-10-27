import type { Metadata } from "next";
import Link from "next/link";
import { brand } from "@/brand";

export const metadata: Metadata = {
  title: "About",
};

/** Minimal stub — not a design investment in M1. */
export default function AboutPage() {
  return (
    <article className="stub">
      <p className="meta">About</p>
      <h1 className="stub__title">{brand.name}</h1>
      <p className="stub__body">
        Small digital and printable things. A project from the Vekon universe —
        not the Vekon application.
      </p>
      <p className="meta">
        <Link href="/">← Back</Link>
      </p>
    </article>
  );
}
