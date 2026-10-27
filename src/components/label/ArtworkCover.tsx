import type { Artifact } from "@/data/artifacts";

type Props = {
  artifact: Artifact;
  /** Compact release tile vs featured mount. */
  size?: "featured" | "release";
};

/**
 * Banner-as-cover + avatar overlay.
 * Native <img> + pixelated rendering — Next/Image re-encode blurs pixel banners.
 */
export function ArtworkCover({ artifact, size = "featured" }: Props) {
  const label = artifact.type.toUpperCase();
  const hasCover = Boolean(artifact.cover);
  const avatarPx = size === "featured" ? 72 : 40;

  return (
    <div
      className={`artwork artwork--${size}${hasCover ? " artwork--media" : ""}`}
      aria-hidden
    >
      {artifact.cover ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className="artwork__cover"
          src={artifact.cover}
          alt=""
          draggable={false}
          decoding="async"
          {...(size === "featured" ? { fetchPriority: "high" as const } : {})}
        />
      ) : null}

      <div className="artwork__veil" />

      <span className="artwork__code">{label}</span>

      {artifact.avatar ? (
        <span className="artwork__avatar">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={artifact.avatar}
            alt=""
            width={avatarPx}
            height={avatarPx}
            draggable={false}
            decoding="async"
          />
        </span>
      ) : (
        <span className="artwork__glyph">{artifact.number.slice(-2)}</span>
      )}
    </div>
  );
}
