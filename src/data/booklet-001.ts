/** Booklet 001 — O mundo que estava lá · OBJECT / 009 · Three Horses */

export const BOOKLET_001 = {
  id: "001",
  code: "PAPERS / BOOKLET 001",
  title: "O mundo que estava lá",
  titleLines: ["O MUNDO", "QUE ESTAVA LÁ"] as const,
  subtitle: "Sobre ver, aprender e olhar novamente",
  year: "2026",
  object: {
    id: "009",
    slug: "pasture-three",
    title: "Three Horses",
    subtitle: "Pasture Study",
    cover: "/covers/009-pasture.gif",
    avatar: "/avatars/001-cat.gif",
    type: "Digital landscape",
    source: "Vekon Archive",
    date: "2026",
    dimensions: "512 × 288 px",
    medium: "Pixel art",
    collection: "Objects / 009",
  },
  /** Colors sampled from the pasture banner — not a new system. */
  palette: [
    { id: "P01", hex: "#2A1838", label: "Violeta profundo" },
    { id: "P02", hex: "#6B3A58", label: "Ameixa" },
    { id: "P03", hex: "#D4897A", label: "Pêssego do céu" },
    { id: "P04", hex: "#B8A0C8", label: "Lavanda" },
    { id: "P05", hex: "#3D4A3A", label: "Vegetação" },
    { id: "P06", hex: "#8A7A6A", label: "Campo seco" },
    { id: "P07", hex: "#171717", label: "Ink" },
    { id: "P08", hex: "#F0F0F0", label: "Surface" },
  ],
} as const;

export type CropId =
  | "full"
  | "sky"
  | "horizon"
  | "mountains"
  | "horses"
  | "horse-near"
  | "vegetation"
  | "fence"
  | "rock";

/** object-position + optional zoom for reinterpretations of the same banner. */
export const CROPS: Record<
  CropId,
  { position: string; zoom?: number; note: string }
> = {
  full: { position: "50% 45%", note: "Banner completo" },
  sky: { position: "58% 2%", zoom: 1.95, note: "O céu" },
  horizon: { position: "55% 18%", zoom: 1.9, note: "Horizonte" },
  mountains: { position: "68% 22%", zoom: 2.1, note: "As montanhas" },
  horses: { position: "50% 58%", zoom: 2.0, note: "Os cavalos" },
  "horse-near": { position: "46% 64%", zoom: 2.6, note: "Perto" },
  vegetation: { position: "70% 88%", zoom: 2.4, note: "A vegetação" },
  fence: { position: "6% 45%", zoom: 2.2, note: "Cerca / bosque" },
  rock: { position: "92% 82%", zoom: 2.3, note: "Rocha / primeiro plano" },
};

export const CONTENTS = [
  { n: "01", title: "O Objeto" },
  { n: "02", title: "O Mutum" },
  { n: "03", title: "Ver de Perto, Ver de Longe" },
  { n: "04", title: "O que Passa Despercebido" },
  { n: "05", title: "Aprender a Ver" },
  { n: "06", title: "Outras Lentes" },
  { n: "07", title: "O Mesmo Mundo" },
  { n: "08", title: "Notas & Referências" },
] as const;

export const UNNOTICED_MARKS = [
  { n: "01", label: "trilha na vegetação", x: 58, y: 72 },
  { n: "02", label: "sombra atrás do cavalo", x: 44, y: 58 },
  { n: "03", label: "segunda linha de montanhas", x: 62, y: 34 },
  { n: "04", label: "postes / cerca", x: 18, y: 48 },
  { n: "05", label: "variação de cor no campo", x: 72, y: 68 },
] as const;

export const WAYS_OF_SEEING = [
  {
    id: "leigo",
    label: "O LEIGO",
    crop: "horses" as CropId,
    reading: "Three horses in a field.",
  },
  {
    id: "botanico",
    label: "O BOTÂNICO",
    crop: "vegetation" as CropId,
    reading: "Vegetação, espécies, padrões de luz no solo.",
  },
  {
    id: "geografo",
    label: "O GEÓGRAFO",
    crop: "mountains" as CropId,
    reading: "Relevo, ocupação, distribuição no terreno.",
  },
  {
    id: "fotografo",
    label: "O FOTÓGRAFO",
    crop: "sky" as CropId,
    reading: "Luz, composição, contraste entre bandas.",
  },
] as const;

/** Essay body — Campo Geral / Miguilim / percepção. */
export const ESSAY_MUTUM = {
  heading: "02 / O MUTUM",
  title: "O mundo que já estava ali",
  paragraphs: [
    "Em Campo Geral, Miguilim vive no Mutum como quem habita um desenho incompleto. As coisas estão lá — o terreiro, as pessoas, o sertão — mas muitas só se tornam disponíveis depois de uma correção mínima: um par de óculos.",
    "Antes disso, o mundo não estava ausente. Estava próximo demais e longe demais ao mesmo tempo. Formas se dissolviam. Distâncias mentiam. O menino aprendia a nomear o que mal conseguia distinguir.",
    "A miopia, nesse sentido, não é só um defeito óptico. É uma metáfora precisa para a atenção: o que não enxergamos com nitidez tende a desaparecer da experiência, mesmo quando permanece diante de nós.",
    "Quando a lente chega, o lugar não muda de coordenadas. Muda a relação. Three Horses não é um ensaio sobre pastagem — é uma paisagem usada como instrumento para praticar o olhar outra vez.",
  ],
} as const;

export const ESSAY_UNNOTICED = {
  heading: "04 / O QUE PASSA DESPERCEBIDO",
  title: "Quantas coisas não vemos?",
  paragraphs: [
    "Na primeira passagem, a imagem entrega o óbvio: três cavalos, um campo, um céu. Isso basta para reconhecer. Não basta para ver.",
    "Os detalhes marcados estavam no banner desde o começo. Não foram adicionados — apenas apontados. Presença não garante percepção.",
  ],
} as const;

export const ESSAY_WAYS = {
  heading: "05 / APRENDER A VER",
  title: "Outras maneiras de olhar",
  paragraphs: [
    "Conhecimento não cria o mundo. Ensina distinções. O leigo vê “cavalos num campo”; o botânico separa texturas; o geógrafo lê ocupação; o fotógrafo mede luz.",
    "Aprender a ver é tornar disponíveis regiões do visível que já estavam à vista — como no Mutum, depois dos óculos.",
  ],
} as const;

export const ESSAY_RETURN = {
  heading: "07 / O MESMO MUNDO",
  title: "Seen again",
  lines: [
    "A imagem é a mesma.",
    "O objeto não se moveu.",
    "O que mudou foi a disponibilidade do olhar.",
  ],
} as const;
