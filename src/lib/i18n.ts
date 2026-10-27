/** Same 10 locales as Vekon app language set. */
export type Language =
  | "en"
  | "ko"
  | "pt"
  | "es"
  | "ja"
  | "de"
  | "fr"
  | "it"
  | "zh-CN"
  | "zh-TW";

export const LANGUAGES: Language[] = [
  "en",
  "ko",
  "pt",
  "es",
  "ja",
  "de",
  "fr",
  "it",
  "zh-CN",
  "zh-TW",
];

export const DEFAULT_LANGUAGE: Language = "en";

export const LANGUAGE_STORAGE_KEY = "papers-lang";

/** Compact chip initials â fits the accent swatch slot. */
export const LANGUAGE_INITIALS: Record<Language, string> = {
  en: "EN",
  ko: "KO",
  pt: "PT",
  es: "ES",
  ja: "JA",
  de: "DE",
  fr: "FR",
  it: "IT",
  "zh-CN": "简",
  "zh-TW": "繁",
};

export const LANGUAGE_NAMES: Record<Language, string> = {
  en: "English",
  ko: "한국어",
  pt: "Português",
  es: "Español",
  ja: "日本語",
  de: "Deutsch",
  fr: "Français",
  it: "Italiano",
  "zh-CN": "简体中文",
  "zh-TW": "繁體中文",
};

export const LANGUAGE_BCP47: Record<Language, string> = {
  en: "en-US",
  ko: "ko-KR",
  pt: "pt-BR",
  es: "es-ES",
  ja: "ja-JP",
  de: "de-DE",
  fr: "fr-FR",
  it: "it-IT",
  "zh-CN": "zh-CN",
  "zh-TW": "zh-TW",
};

export type MessageKey =
  | "view"
  | "gallery"
  | "schema"
  | "object"
  | "pages"
  | "get"
  | "releases"
  | "objects"
  | "editions"
  | "edition.readColour"
  | "edition.readBw"
  | "edition.printA4Colour"
  | "edition.printA4Bw"
  | "edition.printLetterColour"
  | "edition.printLetterBw"
  | "edition.folding"
  | "edition.note"
  | "papersKind"
  | "lifeKind"
  | "tagline"
  | "showObject"
  | "free"
  | "language"
  | "desc.001"
  | "desc.003"
  | "desc.004"
  | "desc.005"
  | "desc.006"
  | "desc.007"
  | "desc.008"
  | "desc.009";

type Dictionary = Record<MessageKey, string>;

const en: Dictionary = {
  view: "View",
  gallery: "Gallery",
  schema: "Schema",
  object: "Object",
  pages: "PAGES",
  get: "Get →",
  releases: "Releases",
  objects: "objects",
  editions: "Editions",
  "edition.readColour": "Read · colour",
  "edition.readBw": "Read · black and white",
  "edition.printA4Colour": "Print · A4 colour",
  "edition.printA4Bw": "Print · A4 black and white",
  "edition.printLetterColour": "Print · Letter colour",
  "edition.printLetterBw": "Print · Letter black and white",
  "edition.folding": "Folding guide",
  "edition.note":
    "Read it on screen, or print it at 100% and fold it. For personal use, please don't resell.",
  papersKind: "texts",
  lifeKind: "a diary app",
  tagline: "a Vekon project",
  showObject: "Show object {number}: {title}",
  free: "FREE",
  language: "Language",
  "desc.001":
    "Chapter one of a week that never clocks in. Eight pages on the gap between a mood and a calendar — mornings that feel like endings, inboxes that feel like weather, and the quiet math of being between jobs without calling it a crisis.",
  "desc.003":
    "Twelve pages from the concrete ledge after midnight. Trains below, neon above, and a notebook that only opens when the city thinks nobody is watching. Half reportage, half apology to whoever still waits for the last bus.",
  "desc.004":
    "A short field chapter under a lavender sky. Two sheep, one fence, and the hour when the grass turns the color of bruises that heal. Six pages of quiet looking — almost a prayer, almost a joke.",
  "desc.005":
    "Sixteen pages of salt, rods, and the patience of not catching anything. Line in the water, phone in the pocket, stories from people who measure time in casts instead of clocks. A pier essay that refuses a clean ending.",
  "desc.006":
    "Skyline inventory written from under the overhang. Balconies, AC units, laundry flags — a catalog of lives stacked one floor at a time. Ten pages of looking up until your neck learns a new posture.",
  "desc.007":
    "Soft towers, hard edges — a field guide to silhouettes that pretend to be architecture. Ten pages of naming what sticks out of the land when the light is wrong and the horizon won't stay still.",
  "desc.008":
    "Bars, a bicycle, and the light that still finds a way through. Eight pages from the wrong side of a gate — neighbors as silhouettes, afternoons as evidence, and the small politics of a shared courtyard.",
  "desc.009":
    "Sunset field notes with three subjects who refuse to pose. Twelve pages on distance, muscle, and the color the grass becomes when the day finally gives up. A study that keeps circling the same fence.",
};

const pt: Dictionary = {
  ...en,
  view: "Vista",
  gallery: "Galeria",
  schema: "Schema",
  object: "Objeto",
  pages: "PÁGINAS",
  get: "Pegar →",
  releases: "Lançamentos",
  objects: "objetos",
  editions: "Edições",
  "edition.readColour": "Ler · cor",
  "edition.readBw": "Ler · preto e branco",
  "edition.printA4Colour": "Imprimir · A4 cor",
  "edition.printA4Bw": "Imprimir · A4 preto e branco",
  "edition.printLetterColour": "Imprimir · Letter cor",
  "edition.printLetterBw": "Imprimir · Letter preto e branco",
  "edition.folding": "Guia de dobra",
  "edition.note":
    "Leia na tela, ou imprima em 100% e dobre. Para uso pessoal — por favor, não revenda.",
  papersKind: "textos",
  lifeKind: "um app de diário",
  tagline: "um projeto Vekon",
  showObject: "Mostrar objeto {number}: {title}",
  free: "GRÁTIS",
  language: "Idioma",
  "desc.001":
    "Capítulo um de uma semana que nunca bate o ponto. Oito páginas sobre o vão entre um humor e um calendário — manhãs que parecem finais, caixas de entrada que parecem clima, e a matemática quieta de estar entre empregos sem chamar isso de crise.",
  "desc.003":
    "Doze páginas da laje de concreto depois da meia-noite. Trens embaixo, neon em cima, e um caderno que só abre quando a cidade acha que ninguém está olhando. Metade reportagem, metade desculpa a quem ainda espera o último ônibus.",
  "desc.004":
    "Um capítulo curto de campo sob céu lavanda. Duas ovelhas, uma cerca, e a hora em que a grama fica da cor de hematomas que cicatrizam. Seis páginas de olhar quieto — quase oração, quase piada.",
  "desc.005":
    "Dezesseis páginas de sal, varas e a paciência de não fisgar nada. Linha na água, telefone no bolso, histórias de quem mede o tempo em arremessos em vez de relógios. Um ensaio de píer que recusa um final limpo.",
  "desc.006":
    "Inventário de horizonte escrito debaixo do beiral. Sacadas, ar-condicionados, bandeiras de roupa — um catálogo de vidas empilhadas andar por andar. Dez páginas olhando para cima até o pescoço aprender outra postura.",
  "desc.007":
    "Torres moles, bordas duras — um guia de campo para silhuetas que fingem ser arquitetura. Dez páginas nomeando o que sobressai da terra quando a luz está errada e o horizonte não para quieto.",
  "desc.008":
    "Grades, uma bicicleta, e a luz que ainda encontra caminho. Oito páginas do lado errado do portão — vizinhos como silhuetas, tardes como evidência, e a pequena política de um pátio compartilhado.",
  "desc.009":
    "Notas de campo ao pôr do sol com três sujeitos que recusam posar. Doze páginas sobre distância, músculo, e a cor que a grama fica quando o dia finalmente desiste. Um estudo que continua circulando a mesma cerca.",
};

const es: Dictionary = {
  ...en,
  view: "Vista",
  gallery: "Galería",
  schema: "Schema",
  object: "Objeto",
  pages: "PÁGINAS",
  get: "Obtener →",
  releases: "Lanzamientos",
  objects: "objetos",
  editions: "Ediciones",
  "edition.readColour": "Leer · color",
  "edition.readBw": "Leer · blanco y negro",
  "edition.printA4Colour": "Imprimir · A4 color",
  "edition.printA4Bw": "Imprimir · A4 blanco y negro",
  "edition.printLetterColour": "Imprimir · Letter color",
  "edition.printLetterBw": "Imprimir · Letter blanco y negro",
  "edition.folding": "Guía de plegado",
  "edition.note":
    "Léelo en pantalla, o imprímelo al 100% y dóblalo. Para uso personal — por favor, no lo revendás.",
  papersKind: "textos",
  lifeKind: "una app de diario",
  tagline: "un proyecto Vekon",
  showObject: "Mostrar objeto {number}: {title}",
  free: "GRATIS",
  language: "Idioma",
  "desc.001":
    "Capítulo uno de una semana que nunca fichó. Ocho páginas sobre el hueco entre un humor y un calendario — mañanas que parecen finales, bandejas de entrada que parecen clima, y la matemática quieta de estar entre trabajos sin llamarlo crisis.",
  "desc.003":
    "Doce páginas desde el borde de concreto después de medianoche. Trenes abajo, neón arriba, y un cuaderno que solo se abre cuando la ciudad cree que nadie mira. Mitad reportaje, mitad disculpa a quien aún espera el último bus.",
  "desc.004":
    "Un breve capítulo de campo bajo cielo lavanda. Dos ovejas, una cerca, y la hora en que la hierba toma el color de moretones que sanan. Seis páginas de mirada quieta — casi una oración, casi un chiste.",
  "desc.005":
    "Dieciséis páginas de sal, cañas y la paciencia de no atrapar nada. Línea en el agua, teléfono en el bolsillo, historias de quien mide el tiempo en lances en vez de relojes. Un ensayo de muelle que rechaza un final limpio.",
  "desc.006":
    "Inventario de horizonte escrito bajo el alero. Balcones, aires acondicionados, banderas de ropa — un catálogo de vidas apiladas piso a piso. Diez páginas mirando arriba hasta que el cuello aprende otra postura.",
  "desc.007":
    "Torres blandas, bordes duros — una guía de campo de siluetas que fingen ser arquitectura. Diez páginas nombrando lo que sobresale de la tierra cuando la luz está mal y el horizonte no se queda quieto.",
  "desc.008":
    "Rejas, una bicicleta, y la luz que aún encuentra camino. Ocho páginas del lado equivocado de una puerta — vecinos como siluetas, tardes como evidencia, y la pequeña política de un patio compartido.",
  "desc.009":
    "Notas de campo al atardecer con tres sujetos que se niegan a posar. Doce páginas sobre distancia, músculo, y el color que toma la hierba cuando el día finalmente se rinde. Un estudio que sigue rodeando la misma cerca.",
};

const de: Dictionary = {
  ...en,
  view: "Ansicht",
  gallery: "Galerie",
  schema: "Schema",
  object: "Objekt",
  pages: "SEITEN",
  get: "Holen →",
  releases: "Releases",
  objects: "Objekte",
  editions: "Ausgaben",
  "edition.readColour": "Lesen · Farbe",
  "edition.readBw": "Lesen · Schwarzweiß",
  "edition.printA4Colour": "Drucken · A4 Farbe",
  "edition.printA4Bw": "Drucken · A4 Schwarzweiß",
  "edition.printLetterColour": "Drucken · Letter Farbe",
  "edition.printLetterBw": "Drucken · Letter Schwarzweiß",
  "edition.folding": "Faltanleitung",
  "edition.note":
    "Am Bildschirm lesen oder zu 100 % drucken und falten. Nur für den persönlichen Gebrauch — bitte nicht weiterverkaufen.",
  papersKind: "Texte",
  lifeKind: "eine Tagebuch-App",
  tagline: "ein Vekon-Projekt",
  showObject: "Objekt zeigen {number}: {title}",
  free: "GRATIS",
  language: "Sprache",
  "desc.001":
    "Kapitel eins einer Woche, die nie einstempelt. Acht Seiten über die Lücke zwischen Stimmung und Kalender — Morgen, die wie Enden wirken, Posteingänge wie Wetter, und die stille Mathematik, zwischen Jobs zu sein, ohne es Krise zu nennen.",
  "desc.003":
    "Zwölf Seiten vom Betonvorsprung nach Mitternacht. Züge unten, Neon oben, und ein Notizbuch, das sich nur öffnet, wenn die Stadt glaubt, niemand schaue zu. Halb Reportage, halb Entschuldigung an alle, die noch auf den letzten Bus warten.",
  "desc.004":
    "Ein kurzes Feldkapitel unter lavendelfarbenem Himmel. Zwei Schafe, ein Zaun, und die Stunde, in der das Gras die Farbe heilender Prellungen annimmt. Sechs Seiten stillen Schauens — fast ein Gebet, fast ein Witz.",
  "desc.005":
    "Sechzehn Seiten Salz, Ruten und die Geduld, nichts zu fangen. Leine im Wasser, Telefon in der Tasche, Geschichten von Menschen, die Zeit in Würfen statt Uhren messen. Ein Pier-Essay ohne sauberes Ende.",
  "desc.006":
    "Skyline-Inventar von unter dem Überhang. Balkone, Klimageräte, Wäscheflaggen — ein Katalog gestapelter Leben, Etage für Etage. Zehn Seiten nach oben schauen, bis der Nacken eine neue Haltung lernt.",
  "desc.007":
    "Weiche Türme, harte Kanten — ein Feldführer zu Silhouetten, die Architektur vortäuschen. Zehn Seiten, die benennen, was aus dem Land ragt, wenn das Licht falsch ist und der Horizont nicht stillhält.",
  "desc.008":
    "Gitter, ein Fahrrad, und Licht, das trotzdem durchkommt. Acht Seiten von der falschen Seite eines Tors — Nachbarn als Silhouetten, Nachmittage als Beweise, und die kleine Politik eines gemeinsamen Hofs.",
  "desc.009":
    "Sonnenuntergangs-Feldnotizen mit drei Motiven, die nicht posieren. Zwölf Seiten über Distanz, Muskel und die Farbe, die das Gras annimmt, wenn der Tag endlich aufgibt. Eine Studie, die denselben Zaun umkreist.",
};

const fr: Dictionary = {
  ...en,
  view: "Vue",
  gallery: "Galerie",
  schema: "Schéma",
  object: "Objet",
  pages: "PAGES",
  get: "Obtenir →",
  releases: "Parutions",
  objects: "objets",
  editions: "Éditions",
  "edition.readColour": "Lire · couleur",
  "edition.readBw": "Lire · noir et blanc",
  "edition.printA4Colour": "Imprimer · A4 couleur",
  "edition.printA4Bw": "Imprimer · A4 noir et blanc",
  "edition.printLetterColour": "Imprimer · Letter couleur",
  "edition.printLetterBw": "Imprimer · Letter noir et blanc",
  "edition.folding": "Guide de pliage",
  "edition.note":
    "Lisez à l’écran, ou imprimez à 100 % et pliez. Usage personnel — merci de ne pas revendre.",
  papersKind: "textes",
  lifeKind: "une app de journal",
  tagline: "un projet Vekon",
  showObject: "Afficher l’objet {number} : {title}",
  free: "GRATUIT",
  language: "Langue",
  "desc.001":
    "Chapitre un d’une semaine qui ne pointe jamais. Huit pages sur l’écart entre une humeur et un calendrier — des matins comme des fins, des boîtes mail comme le temps qu’il fait, et la mathématique discrète d’être entre deux jobs sans appeler ça une crise.",
  "desc.003":
    "Douze pages depuis le rebord de béton après minuit. Trains en bas, néons en haut, et un carnet qui ne s’ouvre que quand la ville croit que personne ne regarde. Moitié reportage, moitié excuses à ceux qui attendent encore le dernier bus.",
  "desc.004":
    "Un court chapitre de terrain sous un ciel lavande. Deux moutons, une clôture, et l’heure où l’herbe prend la couleur des bleus qui guérissent. Six pages de regard calme — presque une prière, presque une blague.",
  "desc.005":
    "Seize pages de sel, de cannes et de la patience de ne rien attraper. Ligne dans l’eau, téléphone en poche, histoires de gens qui mesurent le temps en lancers plutôt qu’en horloges. Un essai de jetée qui refuse une fin nette.",
  "desc.006":
    "Inventaire d’horizon écrit sous l’auvent. Balcons, climatisations, drapeaux de linge — un catalogue de vies empilées étage par étage. Dix pages à lever les yeux jusqu’à ce que le cou apprenne une autre posture.",
  "desc.007":
    "Tours molles, arêtes dures — un guide de terrain des silhouettes qui jouent à l’architecture. Dix pages pour nommer ce qui dépasse du sol quand la lumière est fausse et que l’horizon ne tient pas en place.",
  "desc.008":
    "Des barreaux, un vélo, et la lumière qui trouve encore un passage. Huit pages du mauvais côté d’une grille — voisins en silhouettes, après-midi en preuves, et la petite politique d’une cour partagée.",
  "desc.009":
    "Notes de terrain au coucher du soleil avec trois sujets qui refusent de poser. Douze pages sur la distance, le muscle, et la couleur que prend l’herbe quand le jour finit par abandonner. Une étude qui tourne autour de la même clôture.",
};

const it: Dictionary = {
  ...en,
  view: "Vista",
  gallery: "Galleria",
  schema: "Schema",
  object: "Oggetto",
  pages: "PAGINE",
  get: "Prendi →",
  releases: "Uscite",
  objects: "oggetti",
  editions: "Edizioni",
  "edition.readColour": "Leggi · colore",
  "edition.readBw": "Leggi · bianco e nero",
  "edition.printA4Colour": "Stampa · A4 colore",
  "edition.printA4Bw": "Stampa · A4 bianco e nero",
  "edition.printLetterColour": "Stampa · Letter colore",
  "edition.printLetterBw": "Stampa · Letter bianco e nero",
  "edition.folding": "Guida al ripiego",
  "edition.note":
    "Leggilo a schermo, o stampalo al 100% e piegalo. Per uso personale — per favore non rivenderlo.",
  papersKind: "testi",
  lifeKind: "un'app diario",
  tagline: "un progetto Vekon",
  showObject: "Mostra oggetto {number}: {title}",
  free: "GRATIS",
  language: "Lingua",
  "desc.001":
    "Capitolo uno di una settimana che non timbra mai. Otto pagine sul vuoto tra un umore e un calendario — mattine che sembrano finali, inbox che sembrano meteo, e la matematica quieta di essere tra un lavoro e l’altro senza chiamarlo crisi.",
  "desc.003":
    "Dodici pagine dal bordo di cemento dopo mezzanotte. Treni sotto, neon sopra, e un taccuino che si apre solo quando la città crede che nessuno guardi. Metà reportage, metà scuse a chi aspetta ancora l’ultimo bus.",
  "desc.004":
    "Un breve capitolo di campo sotto un cielo lavanda. Due pecore, un recinto, e l’ora in cui l’erba prende il colore dei lividi che guariscono. Sei pagine di sguardo quieto — quasi una preghiera, quasi una battuta.",
  "desc.005":
    "Sedici pagine di sale, canne e la pazienza di non prendere nulla. Lenza in acqua, telefono in tasca, storie di chi misura il tempo in lanci invece che in orologi. Un saggio da molo che rifiuta un finale pulito.",
  "desc.006":
    "Inventario di skyline scritto da sotto la pensilina. Balconi, condizionatori, bandiere di bucato — un catalogo di vite impilate piano per piano. Dieci pagine a guardare in su finché il collo non impara un’altra postura.",
  "desc.007":
    "Torri morbide, bordi duri — una guida di campo a silhouette che fingono di essere architettura. Dieci pagine per nominare ciò che sporge dalla terra quando la luce è sbagliata e l’orizzonte non sta fermo.",
  "desc.008":
    "Sbarre, una bicicletta, e la luce che trova ancora un passaggio. Otto pagine dal lato sbagliato di un cancello — vicini come silhouette, pomeriggi come prove, e la piccola politica di un cortile condiviso.",
  "desc.009":
    "Appunti di campo al tramonto con tre soggetti che rifiutano di posare. Dodici pagine su distanza, muscolo, e il colore che prende l’erba quando il giorno finalmente si arrende. Uno studio che continua a girare intorno allo stesso recinto.",
};

const ja: Dictionary = {
  ...en,
  view: "表示",
  gallery: "ギャラリー",
  schema: "スキーマ",
  object: "オブジェクト",
  pages: "ページ",
  get: "入手 →",
  releases: "リリース",
  objects: "オブジェクト",
  editions: "エディション",
  "edition.readColour": "読む · カラー",
  "edition.readBw": "読む · 白黒",
  "edition.printA4Colour": "印刷 · A4 カラー",
  "edition.printA4Bw": "印刷 · A4 白黒",
  "edition.printLetterColour": "印刷 · Letter カラー",
  "edition.printLetterBw": "印刷 · Letter 白黒",
  "edition.folding": "折り方ガイド",
  "edition.note":
    "画面で読むか、100%で印刷して折ってください。個人利用のみ — 転売しないでください。",
  papersKind: "テキスト",
  lifeKind: "日記アプリ",
  tagline: "Vekon プロジェクト",
  showObject: "オブジェクト {number} を表示: {title}",
  free: "無料",
  language: "言語",
  "desc.001":
    "タイムカードを切らない一週間の第一章。気分とカレンダーのあいだのすき間について八ページ — 終わりみたいな朝、天気みたいな受信箱、そして危機と呼ばずに職と職のあいだにいる静かな計算。",
  "desc.003":
    "真夜中すぎのコンクリートの縁から十二ページ。下には電車、上にはネオン、街が誰も見ていないと思ったときだけ開くノート。半分はルポルタージュ、半分は終バスを待つ人への診び。",
  "desc.004":
    "ラベンダー色の空の下の短いフィールド章。羊が二匹、棚がひとつ、草が治りかけのアザの色になる時間。静かな視線の六ページ — 祈りにも世談にも近い。",
  "desc.005":
    "塩と竿と、何も釣れない忍耐の十六ページ。水面の糸、ポケットの電話、時計ではなくキャストで時を測る人たちの話。きれいな結末を拒む梨橋のエッセイ。",
  "desc.006":
    "ひさしの下から書いたスカイライン目録。バルコニー、室外機、洗濯物の旗 — 階ごとに積み上がる生のカタログ。首が新しい姿勢を覚えるまで見上げる十ページ。",
  "desc.007":
    "やわらかい塔、固い輪郭 — 建築のふりをするシルエットのフィールドガイド。光がおかしく地平線がじっとしていないとき、土地から突き出るものを名づける十ページ。",
  "desc.008":
    "棚、自転車、それでも通り抜ける光。門の裏側からの八ページ — シルエットの隣人、証拠のような午後、共有中庭の小さな政治。",
  "desc.009":
    "ポーズを拒む三頭の被写体との日没フィールドノート。距離と筋肉、そして一日が折れたときの草の色について十二ページ。同じ棚を回り続ける習作。",
};

const ko: Dictionary = {
  ...en,
  view: "보기",
  gallery: "갤러리",
  schema: "스키마",
  object: "오브젝트",
  pages: "페이지",
  get: "받기 →",
  releases: "릴리스",
  objects: "오브젝트",
  editions: "에디션",
  "edition.readColour": "읽기 · 컬러",
  "edition.readBw": "읽기 · 흑백",
  "edition.printA4Colour": "인쇄 · A4 컬러",
  "edition.printA4Bw": "인쇄 · A4 흑백",
  "edition.printLetterColour": "인쇄 · Letter 컬러",
  "edition.printLetterBw": "인쇄 · Letter 흑백",
  "edition.folding": "접는 가이드",
  "edition.note":
    "화면으로 읽거나 100%로 인쇄해 접으세요. 개인 사용만 — 재판매하지 마세요.",
  papersKind: "텍스트",
  lifeKind: "다이어리 앱",
  tagline: "Vekon 프로젝트",
  showObject: "오브젝트 {number} 보기: {title}",
  free: "무료",
  language: "언어",
  "desc.001":
    "출근 도장을 찍지 않는 한 주의 첫 장. 기분과 달력 사이의 트임에 대한 여덟 페이지 — 끝처럼 느껴지는 아침, 날씨처럼 느껴지는 받은편지함, 그리고 위기라 부르지 않은 채 직장 사이에 있는 조용한 셈법.",
  "desc.003":
    "자정 지난 콘크리트 난간에서 열두 페이지. 아래는 기차, 위는 네온, 도시가 아무도 안 본다고 생각할 때만 열리는 노트. 반은 르포, 반은 막차를 기다리는 이에게 하는 사과.",
  "desc.004":
    "라벤더 하늘 아래의 짧은 필드 책터. 양 두 마리, 울타리 하나, 풀이 낫는 멍 색이 되는 시각. 고요한 시선의 여섯 페이지 — 기도에 가깝고, 농담에 가깝다.",
  "desc.005":
    "소금과 낙싷대, 아무것도 잡지 않는 인내의 열여섯 페이지. 물속의 줄, 포켓의 전화, 시계가 아니라 캐스트로 시간을 재는 사람들의 이야기. 깔끔한 결말을 거부하는 부두 에세이.",
  "desc.006":
    "처마 아래에서 쓴 스카이라인 목록. 발코니, 실외기, 빨래 깃발 — 층마다 쌓인 삶의 카탈로그. 목이 새 자세를 배울 때까지 올려다보는 열 페이지.",
  "desc.007":
    "부드러운 탑, 단단한 모서리 — 건축인 척하는 실루엣의 필드 가이드. 빛이 틀리고 지평선이 가만히 있지 않을 때 땅에서 튀어나온 것을 이름 붙이는 열 페이지.",
  "desc.008":
    "쇠창살, 자전거, 그래도 스며드는 빛. 문 반대편에서 쓴 여덟 페이지 — 실루엣인 이웃, 증거인 오후, 공유 마당의 작은 정치.",
  "desc.009":
    "포즈를 거부하는 세 피사체와 함께한 노을 필드 노트. 거리와 근육, 하루가 포기할 때 풀이 되는 색에 대한 열두 페이지. 같은 울타리를 계속 도는 스터디.",
};

const zhCN: Dictionary = {
  ...en,
  view: "视图",
  gallery: "画廊",
  schema: "图式",
  object: "物件",
  pages: "页",
  get: "获取 →",
  releases: "发行",
  objects: "物件",
  editions: "版本",
  "edition.readColour": "阅读 · 彩色",
  "edition.readBw": "阅读 · 黑白",
  "edition.printA4Colour": "打印 · A4 彩色",
  "edition.printA4Bw": "打印 · A4 黑白",
  "edition.printLetterColour": "打印 · Letter 彩色",
  "edition.printLetterBw": "打印 · Letter 黑白",
  "edition.folding": "折页指南",
  "edition.note":
    "可在屏幕阅读，或以 100% 打印后折叠。仅供个人使用 — 请勿转售。",
  papersKind: "文本",
  lifeKind: "日记应用",
  tagline: "Vekon 项目",
  showObject: "显示物件 {number}：{title}",
  free: "免费",
  language: "语言",
  "desc.001":
    "一周从未打卡的第一章。八页关于情绪与日历之间的空隙——像结局的早晨、像天气的收件箱，以及身在两份工作之间却不称之为危机的安静算术。",
  "desc.003":
    "午夜之后混凝土边缘的十二页。下面是火车，上面是霭虹，只有当城市以为无人注视时才打开的笔记本。一半报道，一半向仍在等末班车的人道歉。",
  "desc.004":
    "薰衣草天空下的短篇田野章节。两只羊、一道篱笆，以及草地变成愈合瘀青颜色的时辰。六页安静的凝视——近乎祈祷，也近乎玩笑。",
  "desc.005":
    "十六页盐、钓竿，以及什么也钓不到的耐心。水里的线、口袋里的手机，用抛竿而非钟表计量时间的人们的故事。一篇拒绝干净结尾的码头随笔。",
  "desc.006":
    "写在挑檐下的天际线清单。阳台、外机、晒衣旗——一层层叠起的生活目录。十页仰望，直到脖子学会新的姿势。",
  "desc.007":
    "柔软的塔、坚硬的边——伪装成建筑的轮廓田野指南。十页为土地上冒出的东西命名，当光线出错、地平线不肯静止。",
  "desc.008":
    "铁栏、一辆自行车，以及仍能挤进来的光。从门的另一侧写下的八页——邻居成了剪影，午后成了证据，还有共享庭院的小小政治。",
  "desc.009":
    "日落田野笔记，三个拒绝摆姿势的对象。十二页关于距离、肌肉，以及白昼终于放弃时草地的颜色。一项不断绕着同一道篱笆打转的习作。",
};

const zhTW: Dictionary = {
  ...en,
  view: "檢視",
  gallery: "藝廊",
  schema: "圖式",
  object: "物件",
  pages: "頁",
  get: "取得 →",
  releases: "發行",
  objects: "物件",
  editions: "版本",
  "edition.readColour": "閱讀 · 彩色",
  "edition.readBw": "閱讀 · 黑白",
  "edition.printA4Colour": "列印 · A4 彩色",
  "edition.printA4Bw": "列印 · A4 黑白",
  "edition.printLetterColour": "列印 · Letter 彩色",
  "edition.printLetterBw": "列印 · Letter 黑白",
  "edition.folding": "摺頁指南",
  "edition.note":
    "可在螢幕閱讀，或以 100% 列印後摺疊。僅供個人使用 — 請勿轉售。",
  papersKind: "文本",
  lifeKind: "日記應用",
  tagline: "Vekon 專案",
  showObject: "顯示物件 {number}：{title}",
  free: "免費",
  language: "語言",
  "desc.001":
    "一週從未打卡的第一章。八頁關於情緒與日曆之間的空隙——像結局的早晨、像天氣的收件匣，以及身在兩份工作之間卻不稱之為危機的安靜算術。",
  "desc.003":
    "午夜之後混凝土邊緣的十二頁。下面是火車，上面是霞虹，只有當城市以為無人注視時才打開的筆記本。一半報導，一半向仍在等末班車的人道歉。",
  "desc.004":
    "薰衣草天空下的短篇田野章節。兩隻羊、一道籬笆，以及草地變成癒合瘀青顏色的時辰。六頁安靜的凝視——近乎祈禱，也近乎玩笑。",
  "desc.005":
    "十六頁鹽、釣竿，以及什麼也釣不到的耐心。水裡的線、口袋裡的手機，用抛竿而非鐘錶計量時間的人們的故事。一篇拒絕乾淨結尾的碼頭隨筆。",
  "desc.006":
    "寫在挑簷下的天際線清單。陽台、室外機、晒衣旗——一層層疊起的生活目錄。十頁仰望，直到脖子學會新的姿勢。",
  "desc.007":
    "柔軟的塔、堅硬的邊——偽裝成建築的輪廓田野指南。十頁為土地上冒出的東西命名，當光線出錯、地平線不肯靜止。",
  "desc.008":
    "鐵欄、一輛腳踏車，以及仍能擠進來的光。從門的另一側寫下的八頁——邻居成了剪影，午後成了證據，還有共享庭院的小小政治。",
  "desc.009":
    "日落田野筆記，三個拒絕擺姿勢的對象。十二頁關於距離、肌肉，以及白昼終於放棄時草地的顏色。一項不斷繞著同一道籬笆打轉的習作。",
};

export const DICTIONARIES: Record<Language, Dictionary> = {
  en,
  ko,
  pt,
  es,
  ja,
  de,
  fr,
  it,
  "zh-CN": zhCN,
  "zh-TW": zhTW,
};

export function isLanguage(value: string | null | undefined): value is Language {
  return !!value && (LANGUAGES as string[]).includes(value);
}

export function translate(
  language: Language,
  key: MessageKey,
  vars?: Record<string, string | number>,
): string {
  let text = DICTIONARIES[language][key] ?? DICTIONARIES.en[key] ?? key;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      text = text.replaceAll(`{${k}}`, String(v));
    }
  }
  return text;
}

export function artifactDescriptionKey(
  id: string,
): Extract<MessageKey, `desc.${string}`> | null {
  const key = `desc.${id}` as MessageKey;
  if (key in DICTIONARIES.en) return key as Extract<MessageKey, `desc.${string}`>;
  return null;
}
