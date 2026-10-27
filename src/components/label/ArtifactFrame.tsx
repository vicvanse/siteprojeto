type Props = {
  children: React.ReactNode;
  className?: string;
  objectId?: string;
  coords?: string;
  plaques?: string[];
};

/** Museum mount × Vekon machine panel — outer shell + inset artwork. */
export function ArtifactFrame({
  children,
  className = "",
  objectId,
  coords,
  plaques,
}: Props) {
  return (
    <div className={`artifact-frame ${className}`}>
      {coords ? (
        <span className="artifact-frame__coords" aria-hidden>
          {coords}
        </span>
      ) : null}
      {objectId ? (
        <span className="artifact-frame__badge">{objectId}</span>
      ) : null}

      <div className="artifact-frame__shell">
        <div className="artifact-frame__well">
          <div className="artifact-frame__mount">{children}</div>
        </div>
        {plaques && plaques.length > 0 ? (
          <ul className="artifact-frame__plaques" aria-label="Object format">
            {plaques.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        ) : null}
      </div>

      <span className="artifact-frame__tick artifact-frame__tick--t" aria-hidden />
      <span className="artifact-frame__tick artifact-frame__tick--r" aria-hidden />
      <span className="artifact-frame__tick artifact-frame__tick--b" aria-hidden />
      <span className="artifact-frame__tick artifact-frame__tick--l" aria-hidden />
      <span className="artifact-frame__dim artifact-frame__dim--w" aria-hidden>
        W 438
      </span>
      <span className="artifact-frame__dim artifact-frame__dim--h" aria-hidden>
        H 517
      </span>
    </div>
  );
}
