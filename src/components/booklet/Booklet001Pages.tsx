import {
  BOOKLET_001,
  ESSAY_MUTUM,
  ESSAY_RETURN,
  ESSAY_UNNOTICED,
  ESSAY_WAYS,
  UNNOTICED_MARKS,
  WAYS_OF_SEEING,
} from "@/data/booklet-001";
import {
  BannerMedia,
  BookletPage,
  ObjectMetadata,
  SpecimenCrop,
  TechnicalLabel,
} from "./primitives";

/** PAGE 01 — Cover · Gathering Moss logic on Papers white */
export function CoverPage() {
  const b = BOOKLET_001;
  return (
    <BookletPage page="001" ariaLabel="Capa — O mundo que estava lá" framed>
      <div className="bk-cover">
        <div className="bk-cover__mast">
          <TechnicalLabel>PAPERS</TechnicalLabel>
          <TechnicalLabel muted>BOOKLET / 001</TechnicalLabel>
        </div>

        <div className="bk-cover__split">
          <div className="bk-cover__main">
            <h1 className="bk-title bk-title--cover bk-title--serif">
              {b.titleLines[0]}
              <br />
              {b.titleLines[1]}
            </h1>

            <BannerMedia className="bk-cover__hero" aspect="16 / 10" />

            <p className="bk-cover__lede">
              Uma publicação sobre percepção, atenção e o que já estava diante
              de nós — lida através de OBJECT / 009.
            </p>
          </div>

          <aside className="bk-cover__rail" aria-hidden={false}>
            <p className="bk-vert">OBJECT / {b.object.id}</p>
            <div className="bk-cover__rail-mid">
              <p className="bk-cover__sub-rail">{b.subtitle}</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="bk-mark"
                src="/vekon-papers-icon.png"
                alt=""
                width={22}
                height={22}
                draggable={false}
                decoding="async"
              />
            </div>
            <p className="bk-vert bk-vert--soft">THREE HORSES</p>
          </aside>
        </div>

        <div className="bk-cover__foot">
          <TechnicalLabel>A VEKON PROJECT</TechnicalLabel>
          <TechnicalLabel muted>{b.year}</TechnicalLabel>
        </div>
      </div>
    </BookletPage>
  );
}

/** PAGE 03 — The Object · specimen with open metadata */
export function ObjectSpecimenPage() {
  return (
    <BookletPage page="003" ariaLabel="01 / O Objeto — Three Horses" framed>
      <div className="bk-object">
        <div className="bk-object__top">
          <span className="bk-folio-lg" aria-hidden>
            01
          </span>
          <div className="bk-object__titles">
            <p className="bk-heading">O OBJETO</p>
            <h2 className="bk-title bk-title--serif">Three Horses</h2>
            <TechnicalLabel muted>PASTURE STUDY · SOURCE / 01</TechnicalLabel>
          </div>
        </div>

        <BannerMedia className="bk-object__banner" aspect="16 / 9" />

        <div className="bk-object__meta">
          <TechnicalLabel muted>SPECIMEN ENTRY</TechnicalLabel>
          <ObjectMetadata />
        </div>
      </div>
    </BookletPage>
  );
}

/** PAGE 06 — O Mutum · essay with vertical running label */
export function MutumEssayPage() {
  const e = ESSAY_MUTUM;
  return (
    <BookletPage page="006" ariaLabel="02 / O Mutum" framed>
      <div className="bk-essay">
        <p className="bk-vert bk-essay__vert" aria-hidden>
          02 / O MUTUM
        </p>

        <div className="bk-essay__col">
          <header className="bk-essay__head">
            <h2 className="bk-title bk-title--serif bk-title--essay">{e.title}</h2>
          </header>

          <div className="bk-essay__stack">
            {e.paragraphs.map((p, i) => (
              <p
                key={p.slice(0, 24)}
                className={`bk-body bk-body--essay${i === 0 ? " bk-body--lead" : ""}`}
              >
                {p}
              </p>
            ))}
          </div>

          <div className="bk-essay__fig">
            <SpecimenCrop
              crop="horizon"
              aspect="2.8 / 1"
              fig="FIG / 07"
              caption="Horizonte"
            />
          </div>
        </div>
      </div>
    </BookletPage>
  );
}

/** PAGE 08 — Quantas coisas não vemos? · annotated plate */
export function UnnoticedPage() {
  const e = ESSAY_UNNOTICED;
  return (
    <BookletPage page="008" ariaLabel="04 / O que passa despercebido" framed>
      <div className="bk-unnoticed">
        <header className="bk-unnoticed__head">
          <p className="bk-heading">{e.heading}</p>
          <h2 className="bk-title bk-title--serif">{e.title}</h2>
        </header>

        <div className="bk-unnoticed__stage">
          <BannerMedia aspect="16 / 9" />
          <div className="bk-unnoticed__marks" aria-hidden>
            {UNNOTICED_MARKS.map((m) => (
              <span
                key={m.n}
                className="bk-unnoticed__dot"
                style={{ left: `${m.x}%`, top: `${m.y}%` }}
              >
                {m.n}
              </span>
            ))}
          </div>
        </div>

        <div className="bk-unnoticed__below">
          <ul className="bk-unnoticed__list">
            {UNNOTICED_MARKS.map((m) => (
              <li key={m.n}>
                <span className="n">{m.n}</span>
                <span>{m.label}</span>
              </li>
            ))}
          </ul>
          <div className="bk-unnoticed__text">
            {e.paragraphs.map((p) => (
              <p key={p.slice(0, 24)} className="bk-body bk-body--essay">
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </BookletPage>
  );
}

/** PAGE 09 — Outras maneiras · asymmetric readings, not equal cards */
export function WaysOfSeeingPage() {
  const e = ESSAY_WAYS;
  const [lead, ...rest] = WAYS_OF_SEEING;
  return (
    <BookletPage page="009" ariaLabel="05 / Aprender a ver" framed>
      <div className="bk-ways">
        <header className="bk-ways__head">
          <p className="bk-heading">{e.heading}</p>
          <h2 className="bk-title bk-title--serif">{e.title}</h2>
        </header>

        <div className="bk-ways__layout">
          {lead ? (
            <div className="bk-ways__lead">
              <SpecimenCrop crop={lead.crop} aspect="4 / 3" fig={lead.label} caption="" />
              <p className="bk-ways__reading">{lead.reading}</p>
            </div>
          ) : null}

          <div className="bk-ways__stack">
            {rest.map((w) => (
              <div key={w.id} className="bk-ways__row">
                <SpecimenCrop crop={w.crop} aspect="5 / 3" fig={w.label} caption="" />
                <p className="bk-ways__reading">{w.reading}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bk-ways__text">
          {e.paragraphs.map((p) => (
            <p key={p.slice(0, 24)} className="bk-body bk-body--essay">
              {p}
            </p>
          ))}
        </div>
      </div>
    </BookletPage>
  );
}

/** PAGE 13 — Return · cinematic pause, Ghibli landscape logic */
export function ReturnPage() {
  const e = ESSAY_RETURN;
  return (
    <BookletPage page="013" ariaLabel="Return — Object 009 seen again" framed bareFoot>
      <div className="bk-return">
        <div className="bk-return__bar">
          <TechnicalLabel>OBJECT / 009</TechnicalLabel>
          <p className="bk-vert bk-return__vert">SEEN AGAIN</p>
        </div>

        <div className="bk-return__stage">
          <BannerMedia aspect="16 / 10" />
        </div>

        <div className="bk-return__lines">
          {e.lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>

        <footer className="bk-return__foot">
          <span>PAPERS / 001</span>
          <span>013 / 016</span>
        </footer>
      </div>
    </BookletPage>
  );
}
