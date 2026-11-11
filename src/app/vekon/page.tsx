import type { Metadata } from "next";
import { VekonHome } from "@/components/vekon/VekonHome";
import { withBase } from "@/lib/base-path";

/**
 * Root of the Vekon site. Lives at /papers/vekon in this app; vekonlife.com/
 * is rewritten here by the Vekon Life project.
 */
export const metadata: Metadata = {
  title: { absolute: "Vekon" },
  description:
    "Observe before interpreting. Vekon Life, a diary for your days, and Vekon: Papers, short texts kept as objects.",
  icons: {
    icon: [{ url: withBase("/vekon-mark.png"), type: "image/png" }],
    apple: [{ url: withBase("/vekon-mark.png"), type: "image/png" }],
  },
};

export default function VekonPage() {
  return <VekonHome />;
}
