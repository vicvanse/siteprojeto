type Props = {
  lines: string[];
  className?: string;
};

/** Small cataloguing metadata cluster — Sutéra callout DNA, Vekon mono labels. */
export function Annotation({ lines, className = "" }: Props) {
  return (
    <aside className={`annotation ${className}`}>
      <span className="annotation__leader" aria-hidden />
      <ul className="annotation__list">
        {lines.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
    </aside>
  );
}
