import { localizeVictorPost } from "@/lib/victor-post-i18n";
import type { AppLocale } from "@/i18n/routing";

/** Posts dos arquivos (Victor, Utilidades, Clínica) — feed estilo Patreon / notas. */

/** Data curta pt-BR para cartões (ex.: "12 de abr. de 2026"), alinhada ao Intl `pt-BR`. */
export function formatPostDateLabelPtBr(date: Date): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export type VictorPostSection =
  | "notas-gerais"
  | "entender"
  | "apreciar"
  | "clinica"
  | "respostas";

/** Só em `section: "entender"` (Utilidades): Ferramentas / Jornais / Material (kind `textos`). */
export type UtilidadeKind = "ferramenta" | "jornais" | "textos";

/** Só em `section: "apreciar"` (Incomum): Arte, Literatura, Audiovisual, Perfis. */
export type IncomumKind = "arte" | "literatura" | "audiovisual" | "perfis";

/** Imagem de post — `src` obrigatório; `alt` opcional (fallback no componente). */
export interface VictorPostImage {
  src: string;
  alt?: string;
}

export interface VictorFeedPost {
  section: VictorPostSection;
  slug: string;
  title: string;
  /** Data ISO (`YYYY-MM-DD` ou instante completo) para ordenação no feed (mais recente primeiro). */
  publishedAt: string;
  /** Se true, o post fica no topo da secção; o resto segue por data (desc.). */
  pinned?: boolean;
  /** Data curta para o cartão (pt-BR estilo leitura: "11 de abr. de 2026"). */
  dateLabel: string;
  /** Etiqueta de tipo / categoria (filtro). */
  category: string;
  /** Só em `entender`: omitido conta como ferramenta. */
  utilidadeKind?: UtilidadeKind;
  /**
   * Só em `entender`: se true, o post não entra no feed de Utilidades (ex.: antiga subseção Sites).
   * A página `/post/[slug]` mantém-se se existir em `getAllPostSlugs`.
   */
  hideFromUtilidadesFeed?: boolean;
  /** Só em `apreciar`: omitido conta como literatura. */
  incomumKind?: IncomumKind;
  excerpt: string;
  /** Parágrafos do texto completo na página `/post/[slug]`. */
  body: string[];
  /**
   * Parágrafos iniciais sempre visíveis; o restante fica atrás de “Ler mais” (feed e página).
   * Ex.: `1` = só o primeiro parágrafo antes do botão. Omitido = corpo inteiro.
   */
  postBodyVisibleParagraphCount?: number;
  /**
   * `verse`: cada entrada de `body` preserva quebras de linha; a primeira costuma ser o autor, centrada.
   * Omitido = parágrafos corridos (`prose`).
   */
  bodyPresentation?: "prose" | "verse";
  /**
   * Com `imageSrc`: `default` = imagem em faixa larga no topo (ImagePostCard);
   * `thumbnail-right` = miniatura à direita alinhada ao título (tipo 2).
   */
  cardLayout?: "default" | "thumbnail-right";
  /** No feed: alinhar título (e linha data/etiqueta) ao centro a partir de `md` (ex.: clínica). */
  feedTitleAlign?: "center";
  imageSrc?: string;
  imageAlt?: string;
  /**
   * Lista explícita de imagens (substitui o par `imageSrc` + `imageGallery` quando preenchida).
   * Útil para `alt` por ficheiro, ordem customizada ou migração futura.
   */
  postImages?: VictorPostImage[];
  /** Índice inicial da galeria (0-based), por defeito 0. */
  coverIndex?: number;
  /**
   * Índice inicial em viewports estreitas (`max-width: 767px`), por defeito igual a `coverIndex` / 0.
   * Útil quando a ordem desejada no telemóvel difere do desktop (ex.: Doré — Rosa Celeste no telemóvel).
   */
  postGalleryMobileCoverIndex?: number;
  /** Se true, o feed desfoca a área da galeria (ex.: conteúdo reservado). */
  isImageLocked?: boolean;
  /**
   * URLs extra após `imageSrc` — na UI viram galeria (principal + miniaturas; na página, lightbox).
   */
  imageGallery?: string[];
  /**
   * Tamanho da imagem principal na galeria (feed + página).
   * `pixel-art` — teto de altura + centrado + object-contain (pixel art / baixa resolução).
   * `compact` — um pouco mais baixo que o natural (óleos / pintura digital largos).
   * Omitido em `apreciar` com `incomumKind` literatura: usa `pixel-art` (mesmo critério que HamsterFragment).
   */
  postGalleryMainPreset?: "default" | "pixel-art" | "compact";
  /**
   * Em viewports estreitas (`max-width: 639px`), reduz o teto de altura da imagem principal
   * (presets `pixel-art` e `compact` na galeria).
   */
  postGalleryMobileTighter?: boolean;
  /** ID do vídeo YouTube (ex.: `6nGZYFHC9MM` de `watch?v=<id>`) — embed no cartão e na página. */
  youtubeVideoId?: string;
  /** ID da playlist (`list=<id>` na URL) — acrescentado ao embed quando existir. */
  youtubeListId?: string;
  /**
   * Se true, não gera página em `/post/[slug]` (o conteúdo está noutra rota).
   * Usar com `feedCardHref`.
   */
  skipPostDetailPage?: boolean;
  /** Destino ao clicar no cartão no feed (em vez de `/post/[slug]`). */
  feedCardHref?: string;
}

/** URL do iframe `embed` para posts com vídeo (e opcionalmente playlist). */
export function getYoutubeEmbedSrc(post: VictorFeedPost): string | null {
  if (!post.youtubeVideoId) return null;
  const base = `https://www.youtube.com/embed/${post.youtubeVideoId}`;
  return post.youtubeListId
    ? `${base}?list=${encodeURIComponent(post.youtubeListId)}`
    : base;
}

/** Lista normalizada de imagens: `postImages` ou capa + `imageGallery`. */
export function getPostImages(post: VictorFeedPost): VictorPostImage[] {
  if (post.postImages?.length) return post.postImages;
  const out: VictorPostImage[] = [];
  if (post.imageSrc) {
    out.push({ src: post.imageSrc, alt: post.imageAlt });
  }
  for (const src of post.imageGallery ?? []) {
    out.push({ src });
  }
  return out;
}

/** Índice inicial da galeria, limitado ao intervalo válido. */
export function getPostGalleryInitialIndex(
  post: VictorFeedPost,
  count: number,
): number {
  if (count <= 0) return 0;
  const raw = post.coverIndex ?? 0;
  return Math.max(0, Math.min(Math.floor(raw), count - 1));
}

/**
 * Preset da imagem principal na galeria. Literatura em `apreciar` sem valor explícito
 * herda `pixel-art` (teto de altura + contain), alinhado a HamsterFragment.
 */
export function getPostGalleryMainPreset(
  post: VictorFeedPost,
): "default" | "pixel-art" | "compact" {
  if (post.postGalleryMainPreset) return post.postGalleryMainPreset;
  if (
    post.section === "apreciar" &&
    (post.incomumKind ?? "literatura") === "literatura"
  ) {
    return "pixel-art";
  }
  return "default";
}

/**
 * Arte em baixa resolução com preset `pixel-art` (ex.: HamsterFragment): servir PNG
 * sem optimiser e escalar o lightbox como o feed. Literatura com o mesmo preset
 * mantém imagens otimizadas (capas, etc.).
 */
export function getPostGalleryNativePixelSources(post: VictorFeedPost): boolean {
  return (
    post.section === "apreciar" &&
    (post.incomumKind ?? "literatura") === "arte" &&
    getPostGalleryMainPreset(post) === "pixel-art"
  );
}

/** Ordem das imagens no post (URLs) — compatível com código legado. */
export function getPostImageStackUrls(post: VictorFeedPost): string[] {
  return getPostImages(post).map((p) => p.src);
}

export const VICTOR_FEED_POSTS: VictorFeedPost[] = [
  {
    section: "notas-gerais",
    slug: "criacao-manutencao-2026",
    title: "Nota",
    publishedAt: "2026-04-12",
    pinned: true,
    dateLabel: "12 de abr. de 2026",
    category: "nota",
    excerpt:
      "ProjetoX é um projeto de divulgação/educação científica sobre psicologia, comportamento e vida cotidiana.\n\nA ideia é reunir textos, vídeos, recomendações e observações sobre como pessoas pensam, escolhem, sofrem, aprendem, se organizam e circulam pelo mundo.\n\nNão como curiosidade solta, mas como tentativa de transformar pesquisa, dados e boas perguntas em algo mais acessível, útil e compartilhável.",
    body: [
      "ProjetoX é um projeto de divulgação/educação científica sobre psicologia, comportamento e vida cotidiana.",
      "A ideia é reunir textos, vídeos, recomendações e observações sobre como pessoas pensam, escolhem, sofrem, aprendem, se organizam e circulam pelo mundo.",
      "Não como curiosidade solta, mas como tentativa de transformar pesquisa, dados e boas perguntas em algo mais acessível, útil e compartilhável.",
    ],
    imageSrc: "/media/hover/nota-criacao-manutencao-2026.png",
    imageAlt:
      "Víctor num laboratório de informática, em frente a um ecrã com página de login da Vercel.",
  },
  {
    section: "notas-gerais",
    slug: "sugestoes",
    title: "Sugestões",
    publishedAt: "2026-04-13",
    dateLabel: "13 de abr. de 2026",
    category: "nota",
    skipPostDetailPage: true,
    feedCardHref: "/victor/sugestoes",
    excerpt: "Partilhe ideias, referências e descobertas num formulário curto.",
    body: ["Faça sugestões acerca do que quiser."],
  },
  {
    section: "respostas",
    slug: "curadoria-estetica-transitos",
    title: "User 01",
    publishedAt: "2026-04-28",
    dateLabel: "28 de abr. de 2026",
    category: "nota",
    excerpt:
      "Uma curadoria estética e emocional que vai da nostalgia de Habbo; Harry Potter sendo uma criança; a era dourada de Perfect World; passando pelo isolamento dos dias iniciais de DayZ; e a experiência de Shadow of the Colossus.",
    body: [
      "Uma curadoria estética e emocional que vai da nostalgia de Habbo; Harry Potter sendo uma criança; a era dourada de Perfect World; passando pelo isolamento dos dias iniciais de DayZ; e a experiência de Shadow of the Colossus. O tom do existencialismo de Nier: Automata e o mistério da SCP Lore, com a paleta visual de Crepúsculo. Em ideias: dilemas filosóficos sobre androides na era pré-IA, o conceito de Isekai, a existência de açaí, astronomia e fisica quântica.",
    ],
    postImages: [
      {
        src: "/media/respostas/curadoria-crepusculo.png",
        alt: "Crepúsculo — dois personagens num campo com paleta visual fria (tons azuis e verdes).",
      }
    ],
    coverIndex: 0,
  },
  {
    section: "respostas",
    slug: "user02-ceu-interior-inverno",
    title: "User 02",
    publishedAt: "2026-04-30",
    dateLabel: "30 de abr. de 2026",
    category: "nota",
    excerpt:
      "o céu do interior em um final de tarde de inverno, muitos tons de rosa, alguns de laranja, outros de azul e um pouco de cinza.",
    body: [
      "o céu do interior em um final de tarde de inverno, muitos tons de rosa, alguns de laranja, outros de azul e um pouco de cinza.",
    ],
    postImages: [
      {
        src: "/media/respostas/user02-ceu-interior-inverno.png",
        alt: "Reflexo do céu na água ao final do dia no interior: nuvens em tons de rosa, laranja, azul e cinza.",
      },
    ],
    coverIndex: 0,
  },
  {
    section: "entender",
    utilidadeKind: "ferramenta",
    slug: "roadmap-sh",
    title: "Roadmap.sh",
    publishedAt: "2026-04-12",
    dateLabel: "12 de abr. de 2026",
    category: "recurso",
    cardLayout: "thumbnail-right",
    imageSrc: "/media/utilidades/roadmap-sh.png",
    imageAlt: "Ilustração em estilo mapa de percursos (roadmap)",
    excerpt:
      "roadmap.sh reúne roteiros de estudo organizados por função, como frontend, backend, DevOps e full stack, e também por tecnologias específicas. O site funciona como um mapa de percurso: ajuda a visualizar a sequência possível entre assuntos, as dependências entre ferramentas e os caminhos mais comuns de aprendizagem em cada área.",
    body: [
      "roadmap.sh reúne roteiros de estudo organizados por função, como frontend, backend, DevOps e full stack, e também por tecnologias específicas. O site funciona como um mapa de percurso: ajuda a visualizar a sequência possível entre assuntos, as dependências entre ferramentas e os caminhos mais comuns de aprendizagem em cada área.",
    ],
  },
  {
    section: "entender",
    utilidadeKind: "ferramenta",
    slug: "seeing-theory-brown",
    title: "Seeing Theory",
    publishedAt: "2026-04-12",
    dateLabel: "12 de abr. de 2026",
    category: "recurso",
    cardLayout: "thumbnail-right",
    imageSrc: "/media/utilidades/seeing-theory.png",
    imageAlt: "Visualização de curva e probabilidade (Seeing Theory)",
    excerpt:
      "Seeing Theory apresenta conceitos de probabilidade e estatística por meio de visualizações interativas, cobrindo temas como distribuições, inferência frequentista e bayesiana, regressão e outros tópicos centrais da área.",
    body: [
      "Seeing Theory apresenta conceitos de probabilidade e estatística por meio de visualizações interativas, cobrindo temas como distribuições, inferência frequentista e bayesiana, regressão e outros tópicos centrais da área. Em vez de começar pelo formalismo, o site procura mostrar como esses conceitos se comportam visualmente e o que eles significam em termos intuitivos.",
    ],
  },
  {
    section: "entender",
    hideFromUtilidadesFeed: true,
    slug: "state-foreign-language-training",
    title: "Formação em línguas estrangeiras (NFATC)",
    publishedAt: "2026-04-12",
    dateLabel: "12 de abr. de 2026",
    category: "recurso",
    cardLayout: "thumbnail-right",
    imageSrc: "/media/utilidades/nfatc-languages.svg",
    imageAlt: "Símbolo de línguas e formação",
    excerpt:
      "Informações institucionais sobre formação em línguas e estimativas de tempo de estudo por idioma.",
    body: [
      "https://www.state.gov/national-foreign-affairs-training-center/foreign-language-training — referência institucional sobre formação em línguas no âmbito do centro de formação do Departamento de Estado dos EUA.",
      "https://www.state.gov/national-foreign-affairs-training-center/foreign-language-training apresenta informações institucionais sobre a formação em línguas estrangeiras no âmbito do National Foreign Affairs Training Center, vinculado ao Departamento de Estado dos EUA, incluindo como esses programas pensam a dificuldade relativa entre idiomas e a estimativa de tempo necessária para aprendê-los a partir do inglês.",
      "Útil para entender a estrutura desse tipo de formação, e também ver, por curiosidade, como se estimam diferentes tempos de estudo, a partir do inglês, conforme o idioma.",
    ],
  },
  {
    section: "entender",
    hideFromUtilidadesFeed: true,
    slug: "kaomoji-you-en",
    title: "Kaomoji (kaomoji.you)",
    publishedAt: "2026-04-25",
    dateLabel: "25 de abr. de 2026",
    category: "site",
    excerpt:
      "Catálogo de kaomoji (faces de texto) para copiar e colar, com interface em inglês.",
    body: [
      "https://kaomoji.you/en/ reúne milhares de kaomoji — combinações de caracteres Unicode que imitam expressões, animais, gestos e memes visuais no estilo japonês — organizados por temas e prontos a copiar para chat, redes ou código.",
      "Útil quando queres um tom ligeiro ou expressivo sem depender só de emoji de sistema, ou para explorar variantes menos comuns do que as que aparecem por defeito no teclado.",
    ],
  },
  {
    section: "entender",
    hideFromUtilidadesFeed: true,
    slug: "scp-wiki-wikidot",
    title: "SCP Foundation Wiki (Wikidot)",
    publishedAt: "2026-04-26",
    dateLabel: "26 de abr. de 2026",
    category: "site",
    excerpt:
      "Wiki colaborativa em torno do universo ficcional da SCP Foundation — relatórios, contos e recursos da comunidade.",
    body: [
      "https://scp-wiki.wikidot.com/ é o hub principal da wiki em inglês do projeto SCP Foundation: ficheiros numerados no estilo de relatório, contos (tales), formatos de grupos de interesse, hubs temáticos, concursos e guias para novos leitores e autores.",
      "O conteúdo é escrito por voluntários; a própria wiki documenta regras de licenciamento (Creative Commons BY-SA 3.0 na maior parte do material) e políticas de citação — útil se fores ler, comentar ou criar derivados respeitando os termos.",
    ],
  },
  {
    section: "entender",
    hideFromUtilidadesFeed: true,
    slug: "barista-hustle-video-archive",
    title: "Barista Hustle — arquivo de vídeos",
    publishedAt: "2026-04-27",
    dateLabel: "27 de abr. de 2026",
    category: "site",
    excerpt:
      "Vídeos técnicos sobre café: extração, leite, máquinas, água e controlo de qualidade.",
    body: [
      "https://www.baristahustle.com/video-archive-main/ agrega o arquivo de vídeos da Barista Hustle — aulas curtas e demonstrações sobre espresso, imersão, percolação, latte art, refractómetros, água, processamento e muito mais, agrupadas por curso ou tema.",
      "Parte do catálogo está marcada como gratuita; outras peças pedem subscrição ou sessão iniciada no site. Vale explorar as secções «Free Videos» e os índices por módulo antes de subscrever.",
    ],
  },
  {
    section: "entender",
    hideFromUtilidadesFeed: true,
    slug: "usenothing-timer",
    title: "Nothing — \"simply do nothing\"",
    publishedAt: "2026-04-30",
    dateLabel: "30 de abr. de 2026",
    category: "site",
    excerpt:
      "Temporizador minimalista para escolher conscientemente não fazer nada durante um intervalo.",
    body: [
      "https://usenothing.com/ oferece Nothing: escolhes por quanto tempo queres \"não fazer nada\" (ou deixas em aberto), inicias o temporizador e o site conta o tempo — sem metas, sem gamificação, sem lista de tarefas; a ideia é a pausa ser o próprio objectivo.",
      "O texto do site enfatiza que o valor está em afastar o ecrã se fizer sentido, não em fixar o contador; há presets rápidos (1 a 60 minutos, etc.) e o código está referenciado no GitHub pelo autor (Maze).",
    ],
  },
  {
    section: "entender",
    utilidadeKind: "ferramenta",
    slug: "wolfram-alpha",
    title: "Wolfram|Alpha",
    publishedAt: "2026-04-14",
    dateLabel: "14 de abr. de 2026",
    category: "recurso",
    cardLayout: "thumbnail-right",
    imageSrc: "/media/utilidades/wolfram-alpha.svg",
    imageAlt: "Identidade visual em laranja (Wolfram|Alpha)",
    excerpt:
      "Wolfram|Alpha é uma ferramenta computacional de busca e cálculo que gera respostas, visualizações e resultados a partir de linguagem natural e da base de conhecimento da Wolfram. Pode ser usada para matemática, estatística, física, química, conversão de unidades, gráficos e muitos outros tipos de consulta.",
    body: [
      "Wolfram|Alpha é uma ferramenta computacional de busca e cálculo que gera respostas, visualizações e resultados a partir de linguagem natural e da base de conhecimento da Wolfram. Pode ser usada para matemática, estatística, física, química, conversão de unidades, gráficos e muitos outros tipos de consulta.",
      "Verificar resultados, explorar funções, visualizar expressões e testar problemas sem precisar instalar um sistema algébrico completo. Também funciona bem como apoio rápido para estudo, checagem e experimentação.",
    ],
  },
  {
    section: "entender",
    utilidadeKind: "jornais",
    slug: "nature-human-behaviour-reviews-analysis",
    title: "Nature Human Behaviour - Reviews & Analysis",
    publishedAt: "2026-04-20",
    dateLabel: "20 de abr. de 2026",
    category: "jornais",
    cardLayout: "thumbnail-right",
    imageSrc: "/media/utilidades/nature-human-behaviour.png",
    imageAlt:
      "Logótipo circular Nature Human Behaviour — texto em minúsculas sobre fundo preto e contorno azul",
    excerpt:
      "A seção Reviews & Analysis da Nature Human Behaviour reúne textos de síntese, interpretação e comentário publicados pela revista, incluindo formatos como Review Article, Perspective, News & Views e Research Briefing.",
    body: [
      "A seção Reviews & Analysis da Nature Human Behaviour reúne textos de síntese, interpretação e comentário publicados pela revista, incluindo formatos como Review Article, Perspective, News & Views e Research Briefing. É um espaço voltado menos ao artigo empírico completo e mais à organização de debates, resultados e direções recentes em áreas ligadas ao comportamento humano.",
      "Bom para acompanhar leituras de conjunto em psicologia, ciências sociais quantitativas, neurociência cognitiva e políticas públicas relacionadas ao comportamento, servindo como boa entrada antes de avançar para os artigos de pesquisa mais técnicos.",
    ],
  },
  {
    section: "entender",
    utilidadeKind: "ferramenta",
    slug: "z-library-bz",
    title: "Bibliotecas-sombra e acesso ao conhecimento",
    publishedAt: "2026-04-23",
    dateLabel: "23 de abr. de 2026",
    category: "recurso",
    cardLayout: "thumbnail-right",
    imageSrc: "/media/utilidades/z-library.png",
    imageAlt: "Logótipo Z-Library (zlibrary)",
    excerpt:
      "Z-Library e Sci-Hub são exemplos controversos de bibliotecas-sombra: plataformas que aparecem no debate sobre acesso a livros, artigos e materiais acadêmicos protegidos por direitos autorais.",
    body: [
      "Z-Library e Sci-Hub são exemplos controversos de bibliotecas-sombra: plataformas que aparecem no debate sobre acesso a livros, artigos e materiais acadêmicos protegidos por direitos autorais.",
      "Elas interessam menos como recomendação de uso e mais como sintoma de um problema maior: a desigualdade no acesso ao conhecimento. De um lado, estudantes e pesquisadores encontram barreiras econômicas reais; de outro, há direitos autorais, editoras, autores e disputas jurídicas internacionais.",
      "Por isso, este site não fornece links, domínios ativos ou instruções de acesso. Para pesquisa e leitura acadêmica, a prioridade é usar fontes abertas, institucionais ou licenciadas",
    ],
  },
  {
    section: "entender",
    utilidadeKind: "jornais",
    slug: "aeon-co",
    title: "Aeon",
    publishedAt: "2026-04-18",
    dateLabel: "18 de abr. de 2026",
    category: "jornais",
    excerpt:
      "Aeon reúne ensaios, artigos e vídeos sobre temas como consciência, ética, história das ideias, ciência cognitiva, ambiente e arte, em um formato mais reflexivo e menos submetido ao ritmo imediato das notícias.",
    body: [
      "Aeon reúne ensaios, artigos e vídeos sobre temas como consciência, ética, história das ideias, ciência cognitiva, ambiente e arte, em um formato mais reflexivo e menos submetido ao ritmo imediato das notícias. A publicação costuma trabalhar com textos longos, escritos por pesquisadores, ensaístas e jornalistas, preservando um tom de divulgação cuidadosa e de maior fôlego.",
    ],
  },
  {
    section: "entender",
    utilidadeKind: "ferramenta",
    slug: "linguagem-r",
    title: "R",
    publishedAt: "2026-05-01",
    dateLabel: "1 de mai. de 2026",
    category: "recurso",
    excerpt:
      "R é uma linguagem e ambiente de programação voltado à estatística computacional, análise de dados e visualização, distribuído como software livre. O site oficial reúne documentação, manuais introdutórios, referência de funções e instruções de instalação para Windows, macOS e Linux.",
    body: [
      "R é uma linguagem e ambiente de programação voltado à estatística computacional, análise de dados e visualização, distribuído como software livre. O site oficial reúne documentação, manuais introdutórios, referência de funções e instruções de instalação para Windows, macOS e Linux.",
      "O CRAN (Comprehensive R Archive Network) centraliza o interpretador, os arquivos-fonte e milhares de pacotes contribuídos pela comunidade, sendo o principal ponto de acesso para instalar extensões, atualizar bibliotecas e consultar materiais por domínio. No uso cotidiano, o ecossistema da Posit, antigo RStudio, oferece o IDE mais difundido para escrita, execução e organização de código, enquanto o tidyverse reúne pacotes com uma gramática compartilhada para importar, transformar, visualizar e organizar dados de forma consistente.",
      "É um recurso especialmente útil em psicologia e ciências sociais quantitativas, tanto pela reprodutibilidade dos scripts quanto pela flexibilidade para modelagem, simulação, análise estatística e produção de figuras prontas para publicação. A comunidade acadêmica em torno da linguagem também facilita o acesso a materiais de ensino, pacotes especializados e soluções já consolidadas para pesquisa.",
    ],
  },
  {
    section: "entender",
    utilidadeKind: "ferramenta",
    slug: "cursor-ai",
    title: "Cursor",
    publishedAt: "2026-05-02",
    dateLabel: "2 de mai. de 2026",
    category: "recurso",
    excerpt:
      "Cursor é um editor de código com IA integrada: completamento contextual, chat sobre o repositório, edições em vários ficheiros e fluxos de agente, numa experiência próxima ao Visual Studio Code.",
    body: [
      "https://cursor.com/ concentra o produto Cursor: um ambiente de desenvolvimento em que modelos de linguagem entram: sugestões inline, conversa sobre ficheiros e pastas, alterações coordenadas em blocos maiores e integração com terminal e Git no mesmo painel. A interface herda muito do ecossistema VS Code, o que ajuda quem já trabalha com extensões e atalhos familiares.",
      "Há opções de privacidade e de modelo conforme a conta; em projetos sensíveis, convém rever as definições de envio de código e as regras que definires para o repositório, para alinhar estilo, frameworks e o que a assistência pode assumir. Como em qualquer ferramenta generativa, o ganho de velocidade vem acompanhado da responsabilidade de validar diffs, testes e segurança antes de integrar no ramo principal.",
    ],
  },
  {
    section: "entender",
    utilidadeKind: "textos",
    slug: "youtube-playlist-nnf",
    title: "Aulas de Human Behavioral Biology (Robert Sapolsky / Stanford)",
    publishedAt: "2026-04-12",
    dateLabel: "12 de abr. de 2026",
    category: "textos",
    excerpt:
      "Esta série de aulas de Human Behavioral Biology, ministrada por Robert Sapolsky em Stanford, percorre diferentes níveis de explicação do comportamento humano, articulando evolução, genética, neurociência, endocrinologia, desenvolvimento, agressão, sexualidade e contexto social.",
    body: [
      "Esta série de aulas de Human Behavioral Biology, ministrada por Robert Sapolsky em Stanford, percorre diferentes níveis de explicação do comportamento humano, articulando evolução, genética, neurociência, endocrinologia, desenvolvimento, agressão, sexualidade e contexto social. O curso funciona como uma introdução ampla à ideia de que o comportamento pode ser pensado a partir de múltiplas camadas biológicas e históricas, sem se reduzir a uma única causa.",
      "https://www.youtube.com/watch?v=NNnIGh9g6fA&list=PL848F2368C90DDC3D",
    ],
    youtubeVideoId: "NNnIGh9g6fA",
    youtubeListId: "PL848F2368C90DDC3D",
  },
  {
    section: "entender",
    utilidadeKind: "jornais",
    slug: "mathematical-social-sciences",
    title: "Mathematical Social Sciences",
    publishedAt: "2026-04-16",
    dateLabel: "16 de abr. de 2026",
    category: "jornais",
    cardLayout: "thumbnail-right",
    imageSrc: "/media/utilidades/mathematical-social-sciences.png",
    imageAlt: "Capa e título da revista Mathematical Social Sciences (Elsevier)",
    excerpt:
      "Mathematical Social Sciences é uma revista internacional e interdisciplinar dedicada a modelos matemáticos nas ciências sociais, com artigos sobre escolha, informação, preferências, teoria dos jogos, votação, redes sociais, barganha, divisão justa, desigualdade e dinâmicas evolutivas, entre outros temas. A proposta do periódico é reunir trabalhos matematicamente rigorosos, mas ainda legíveis para pesquisadores das ciências sociais com formação quantitativa.",
    body: [
      "https://www.sciencedirect.com/journal/mathematical-social-sciences Mathematical Social Sciences é uma revista internacional e interdisciplinar dedicada a modelos matemáticos nas ciências sociais, com artigos sobre escolha, informação, preferências, teoria dos jogos, votação, redes sociais, barganha, divisão justa, desigualdade e dinâmicas evolutivas, entre outros temas. A proposta do periódico é reunir trabalhos matematicamente rigorosos, mas ainda legíveis para pesquisadores das ciências sociais com formação quantitativa.",
    ],
  },
  {
    section: "entender",
    utilidadeKind: "jornais",
    slug: "journal-of-mathematical-psychology",
    title: "Journal of Mathematical Psychology",
    publishedAt: "2026-04-19",
    dateLabel: "19 de abr. de 2026",
    category: "jornais",
    cardLayout: "thumbnail-right",
    imageSrc: "/media/utilidades/journal-mathematical-psychology.png",
    imageAlt: "Capa laranja do Journal of Mathematical Psychology (Elsevier, ScienceDirect)",
    excerpt:
      "O Journal of Mathematical Psychology é uma das revistas de referência para trabalhos em psicologia matemática, reunindo artigos sobre modelagem formal de decisão, percepção, aprendizagem, memória, psicofísica e outros processos cognitivos quantificáveis. O interesse do periódico está justamente nessa combinação entre rigor matemático e problemas psicológicos, com espaço tanto para contribuições teóricas quanto empíricas.",
    body: [
      "https://www.sciencedirect.com/journal/journal-of-mathematical-psychology O Journal of Mathematical Psychology é uma das revistas de referência para trabalhos em psicologia matemática, reunindo artigos sobre modelagem formal de decisão, percepção, aprendizagem, memória, psicofísica e outros processos cognitivos quantificáveis. O interesse do periódico está justamente nessa combinação entre rigor matemático e problemas psicológicos, com espaço tanto para contribuições teóricas quanto empíricas.",
      "É um bom ponto de entrada para acompanhar pesquisas em modelagem, mensuração, julgamento e tomada de decisão, além de áreas como psicometria, psicofísica e teoria cognitiva.",
    ],
  },
  {
    section: "entender",
    utilidadeKind: "jornais",
    slug: "annual-review-of-psychology",
    title: "Annual Review of Psychology",
    publishedAt: "2026-05-08",
    dateLabel: "8 de mai. de 2026",
    category: "jornais",
    cardLayout: "thumbnail-right",
    imageSrc: "/media/utilidades/annual-review-of-psychology.png",
    imageAlt:
      "Logótipo Annual Reviews — letras AR em branco sobre fundo azul e faixas de cores institucionais",
    excerpt:
      "Annual Review of Psychology é um dos periódicos de revisão mais destacados da psicologia. Em vez de publicar principalmente estudos empíricos isolados, a revista reúne artigos de síntese escritos para organizar os desenvolvimentos mais importantes da área, cobrindo temas como cognição, percepção, desenvolvimento, psicopatologia, clínica, psicologia social e bases biológicas do comportamento. Por isso, funciona menos como fluxo de novidades dispersas e mais como um lugar de consolidação: textos que ajudam a entender o estado da arte de um campo, seus debates centrais e suas direções recentes.",
    body: [
      "https://www.annualreviews.org/content/journals/psych Annual Review of Psychology é um dos periódicos de revisão mais destacados da psicologia. Em vez de publicar principalmente estudos empíricos isolados, a revista reúne artigos de síntese escritos para organizar os desenvolvimentos mais importantes da área, cobrindo temas como cognição, percepção, desenvolvimento, psicopatologia, clínica, psicologia social e bases biológicas do comportamento. Por isso, funciona menos como fluxo de novidades dispersas e mais como um lugar de consolidação: textos que ajudam a entender o estado da arte de um campo, seus debates centrais e suas direções recentes.",
    ],
  },
  {
    section: "entender",
    utilidadeKind: "jornais",
    slug: "annual-review-of-clinical-psychology",
    title: "Annual Review of Clinical Psychology",
    publishedAt: "2026-04-22",
    dateLabel: "22 de abr. de 2026",
    category: "jornais",
    excerpt:
      "Annual Review of Clinical Psychology é um dos periódicos de revisão mais destacados da psicologia clínica. Em vez de publicar principalmente estudos empíricos isolados, reúne artigos de síntese escritos para organizar os desenvolvimentos centrais do campo, cobrindo temas como avaliação, intervenção, psicopatologia, ansiedade, depressão, transtornos do espectro autista, transtornos alimentares, dependências, psicoterapia baseada em evidências e psicologia clínica infantil. Por isso, funciona menos como fluxo de novidades dispersas e mais como um lugar de consolidação: textos que ajudam a entender o estado da arte da clínica, seus debates mais relevantes e suas direções recentes.",
    body: [
      "https://www.annualreviews.org/content/journals/clinpsy Annual Review of Clinical Psychology é um dos periódicos de revisão mais destacados da psicologia clínica. Em vez de publicar principalmente estudos empíricos isolados, reúne artigos de síntese escritos para organizar os desenvolvimentos centrais do campo, cobrindo temas como avaliação, intervenção, psicopatologia, ansiedade, depressão, transtornos do espectro autista, transtornos alimentares, dependências, psicoterapia baseada em evidências e psicologia clínica infantil. Por isso, funciona menos como fluxo de novidades dispersas e mais como um lugar de consolidação: textos que ajudam a entender o estado da arte da clínica, seus debates mais relevantes e suas direções recentes.",
    ],
  },
  {
    section: "entender",
    utilidadeKind: "jornais",
    slug: "computational-brain-behavior-springer",
    title: "Computational Brain & Behavior",
    publishedAt: "2026-04-17",
    dateLabel: "17 de abr. de 2026",
    category: "jornais",
    excerpt:
      "Computational Brain & Behavior é uma revista da Springer voltada à base computacional da mente, com trabalhos em modelagem matemática, simulação computacional e pesquisa empírica. A revista enfatiza rigor científico e o tipo de esclarecimento que modelos quantitativos podem oferecer para problemas psicológicos e cognitivos. Também é o periódico oficial da Society for Mathematical Psychology.",
    body: [
      "https://link.springer.com/journal/42113 Computational Brain & Behavior é uma revista da Springer voltada à base computacional da mente, com trabalhos em modelagem matemática, simulação computacional e pesquisa empírica. A revista enfatiza rigor científico e o tipo de esclarecimento que modelos quantitativos podem oferecer para problemas psicológicos e cognitivos. Também é o periódico oficial da Society for Mathematical Psychology.",
    ],
  },
  {
    section: "apreciar",
    incomumKind: "audiovisual",
    slug: "ted-ed-psychology-lessons",
    title: "TED-Ed: lições de psicologia",
    publishedAt: "2026-05-12T22:00:00.000Z",
    dateLabel: "12 de mai. de 2026",
    category: "vídeos",
    excerpt:
      "A seção de Psychology do TED-Ed reúne lições em vídeo sobre temas como cognição e aprendizagem, motivação e emoção, personalidade, desenvolvimento e psicologia social.",
    body: [
      "A seção de Psychology do TED-Ed reúne lições em vídeo sobre temas como cognição e aprendizagem, motivação e emoção, personalidade, desenvolvimento e psicologia social. São conteúdos curtos, geralmente pensados para introduzir um conceito, uma pergunta ou um problema de maneira visual e acessível.",
      "O interesse está justamente nisso: funcionam bem como porta de entrada, revisão rápida ou primeiro contato com assuntos que depois podem ser aprofundados em textos mais técnicos. Mesmo quando simplificam, as lições costumam organizar bem o tema e ajudar a situar ideias centrais antes de uma leitura mais densa.",
    ],
  },
  {
    section: "apreciar",
    incomumKind: "audiovisual",
    slug: "you-are-not-so-smart",
    title: "You Are Not So Smart",
    publishedAt: "2026-05-13T22:00:00.000Z",
    dateLabel: "13 de mai. de 2026",
    category: "podcast",
    excerpt:
      "You Are Not So Smart é um podcast de David McRaney centrado em psicologia, raciocínio, crenças e desinformação.",
    body: [
      "You Are Not So Smart (https://youarenotsosmart.com/) é um podcast de David McRaney centrado em psicologia, raciocínio, crenças e desinformação. Os episódios costumam ser organizados em torno de entrevistas com pesquisadores, autores e especialistas, discutindo temas como viés cognitivo, percepção, memória, polarização, teorias conspiratórias e pensamento crítico.",
      "No site do projeto, o podcast aparece como parte de um conjunto maior que inclui posts, livros, newsletter e transcrições. O interesse do programa está em traduzir pesquisa psicológica e social para conversas longas, acessíveis e orientadas por problemas contemporâneos: por que acreditamos no que acreditamos, como mudamos de ideia, e de que modo erro, ilusão e convencimento participam da vida comum.",
    ],
  },
  {
    section: "apreciar",
    incomumKind: "audiovisual",
    slug: "mad-men",
    title: "Mad Men",
    publishedAt: "2026-05-15T22:00:00.000Z",
    dateLabel: "15 de mai. de 2026",
    category: "série",
    excerpt:
      "Mad Men segue a agência Sterling Cooper, e o que dela decorre, em Madison Avenue, com Don Draper (Jon Hamm) como figura central, criativo brilhante com um passado construído em segredo.",
    body: [
      "Mad Men segue a agência Sterling Cooper, e o que dela decorre, em Madison Avenue, com Don Draper (Jon Hamm) como figura central, criativo brilhante com um passado construído em segredo. Em volta dele, copywriters, diretores de arte, contabilistas e clientes desenham o quotidiano de uma indústria que vende desejo; o enredo trata de poder, gênero, raça, classe e identidade sem dar respostas fáceis.",
      "O que torna a série memorável é o ritmo contido, o diálogo preciso e o cuidado com cenário, guarda-roupa e música como extensão narrativa: os anos 1960 avançam episódio a episódio, e o tom muda com o país.",
    ],
  },
  {
    section: "apreciar",
    incomumKind: "audiovisual",
    slug: "special-books-by-special-kids",
    title: "Special Books by Special Kids",
    publishedAt: "2026-05-09T12:00:00.000Z",
    dateLabel: "9 de mai. de 2026",
    category: "vídeos",
    excerpt:
      "Special Books by Special Kids é um canal no YouTube criado por Chris Ulmer, com entrevistas e conversas longas com pessoas que vivem com diversidades neurológicas, condições raras e deficiências.",
    body: [
      "Special Books by Special Kids (https://www.youtube.com/@SpecialBooksbySpecialKids) é um canal no YouTube criado por Chris Ulmer, com entrevistas e conversas longas com pessoas que vivem com diversidades neurológicas, condições raras e deficiências. O formato é simples e quase doméstico: uma câmera, uma conversa, e um espaço em que cada pessoa, ou alguém da família, conta a sua história em primeira pessoa.",
      "O interesse do projeto está em desfazer o tom espetacular ou piedoso que costuma acompanhar essas representações, deslocando o foco para o cotidiano, o humor, os afetos e as dificuldades concretas. Ao longo dos anos, o canal acabou se tornando também um arquivo de vidas marcadas por experiências pouco visibilizadas, organizado em torno de escuta, presença e trabalho continuado de comunidade.",
    ],
  },
  {
    section: "apreciar",
    incomumKind: "audiovisual",
    slug: "great-pretender-anime",
    title: "Great Pretender",
    publishedAt: "2026-05-16T12:00:00.000Z",
    dateLabel: "16 de mai. de 2026",
    category: "anime",
    excerpt:
      "Great Pretender segue Makoto Edamura, um vigarista em Tóquio que acaba envolvido nas operações de Laurent Thierry.",
    body: [
      "Great Pretender segue Makoto Edamura, um vigarista em Tóquio que acaba envolvido nas operações de Laurent Thierry. Cada bloco de episódios monta um grande embuste (Los Angeles, Singapura, Londres, Tóquio/Xangai) com ritmo de capítulo de filme: alvo rico, disfarces, reversões e um final que costuma rebater o que parecia óbvio. O tom mistura comédia leve, drama e alguma crítica social sem perder o prazer de ver o esquema desenrolar.",
      "A realização de Hiro Kaburagi e o desenho da Wit Studio apostam em cor saturada, planos largos e referências visuais a cinema e jazz; a banda sonora (incluindo o tema que evoca o título clássico de The Platters) reforça a ideia de espetáculo.",
    ],
  },
  {
    section: "apreciar",
    incomumKind: "audiovisual",
    slug: "cowboy-bebop",
    title: "Cowboy Bebop",
    publishedAt: "2026-05-09T22:00:00.000Z",
    dateLabel: "9 de mai. de 2026",
    category: "anime",
    excerpt:
      "Cowboy Bebop acompanha Spike Spiegel e Jet Black a bordo da nave Bebop, caçando criminosos em um futuro em que a Terra foi em parte abandonada e o sistema solar se tornou cenário de deslocamento, precariedade e violência difusa.",
    body: [
      "Cowboy Bebop acompanha Spike Spiegel e Jet Black a bordo da nave Bebop, caçando criminosos em um futuro em que a Terra foi em parte abandonada e o sistema solar se tornou cenário de deslocamento, precariedade e violência difusa. Ao longo da série, surgem também Faye Valentine, Ed e Ein, compondo um grupo marcado menos por unidade do que por convivência provisória, restos de passado e vínculos instáveis.",
      "Cada episódio pode assumir algo de faroeste, noir, comédia, ficção científica ou drama existencial, sem perder uma identidade muito própria. A direção é contida e cinematográfica, o desenho trabalha muito bem cor, enquadramento e silêncio, e a trilha de Yoko Kanno com os Seatbelts, jazz, blues, bebop e rock, não funciona apenas como acompanhamento, mas como parte central do ritmo da série. O resultado é um anime melancólico, estilizado e muito consciente de que passado, solidão e arrependimento raramente se resolvem por completo.",
    ],
  },
  {
    section: "apreciar",
    incomumKind: "audiovisual",
    slug: "stanford-psychology-podcast",
    title: "Stanford Psychology Podcast",
    publishedAt: "2026-05-10T22:00:00.000Z",
    dateLabel: "10 de mai. de 2026",
    category: "podcast",
    excerpt:
      "O Stanford Psychology Podcast é um podcast voltado à divulgação de pesquisa em psicologia, com conversas longas entre os apresentadores e convidados ligados a áreas como cognição, emoção, desenvolvimento, neurociência e comportamento social.",
    body: [
      "O Stanford Psychology Podcast é um podcast voltado à divulgação de pesquisa em psicologia, com conversas longas entre os apresentadores e convidados ligados a áreas como cognição, emoção, desenvolvimento, neurociência e comportamento social. Os episódios costumam girar em torno de linhas de investigação atuais, métodos de pesquisa e problemas teóricos, em um formato mais extenso do que o de entrevistas de divulgação rápida.",
      "O interesse está justamente nesse equilíbrio entre rigor e acessibilidade: o podcast funciona bem para quem quer acompanhar debates e temas da psicologia contemporânea sem ficar apenas em resumos muito breves. No site oficial e na newsletter, é possível encontrar o arquivo dos episódios e links para ouvir em diferentes plataformas.",
    ],
  },
  {
    section: "apreciar",
    incomumKind: "audiovisual",
    slug: "resilience-memory-reboot",
    title: "Resilience - Memory Reboot",
    publishedAt: "2026-05-18T22:30:00.000Z",
    dateLabel: "18 de mai. de 2026",
    category: "música",
    excerpt:
      "GhostEdits publica edições e mashups com estética próxima do remix e do audiovisual de cultura online, por vezes associados a jogos ou a paisagens sonoras eletrônicas.",
    body: [
      "GhostEdits publica edições e mashups com estética próxima do remix e do audiovisual de cultura online, por vezes associados a jogos ou a paisagens sonoras eletrônicas. \"Memory Reboot\" aparece aqui no contexto de \"Resilience\", como peça de vídeo musical ou edição rítmica no YouTube.",
    ],
    youtubeVideoId: "IO6fLj14zRA",
  },
  {
    section: "apreciar",
    incomumKind: "audiovisual",
    slug: "the-twilight-zone",
    title: "The Twilight Zone (1959–1964)",
    publishedAt: "2026-05-16T22:00:00.000Z",
    dateLabel: "16 de mai. de 2026",
    category: "série",
    excerpt:
      "The Twilight Zone é uma série antológica em preto-e-branco: cada episódio apresenta uma história isolada, muitas vezes com reviravolta final, que cruza ficção científica, horror, fantasia e sátira social.",
    body: [
      "The Twilight Zone é uma série antológica em preto-e-branco: cada episódio apresenta uma história isolada, muitas vezes com reviravolta final, que cruza ficção científica, horror, fantasia e sátira social. Rod Serling foi roteirista central, apresentador e \"voz\" do programa; o tom mistura sobriedade literária com economia dramática típica da TV dos anos 1960, sem renunciar a metáfora política ou a crítica velada ao conformismo e ao medo da época.",
      "A série original durou cinco temporadas; mais tarde surgiram continuações e reboots (anos 1980, 2000 e uma versão com Jordan Peele nos anos 2010).",
    ],
  },
  {
    section: "apreciar",
    incomumKind: "audiovisual",
    slug: "love-death-and-robots",
    title: "Love, Death & Robots",
    publishedAt: "2026-05-14T12:00:00.000Z",
    dateLabel: "14 de mai. de 2026",
    category: "série",
    excerpt:
      "Love, Death & Robots é uma série antológica em que cada episódio é um curta independente, durações variáveis, estilos de animação distintos (2D, 3D, captura, híbridos) e tons que vão do grotesco cómico ao terror corporal e à ficção especulativa.",
    body: [
      "Love, Death & Robots é uma série antológica em que cada episódio é um curta independente, durações variáveis, estilos de animação distintos (2D, 3D, captura, híbridos) e tons que vão do grotesco cómico ao terror corporal e à ficção especulativa. A ideia é servir de vitrine a realizadores e estúdios dispersos, com liberdade formal forte e conteúdo frequentemente explícito (violência, sexualidade, linguagem), pensado para público adulto.",
      "Tim Miller figura entre os criadores; a série associa-se a um clima de block de curtas em formato streaming, com curadoria que privilegia variedade em relação a continuidade. Vários episódios adaptam contos de autores de ficção científica ou propostas originais; o prazer está tanto na história como na mudança radical de língua visual de um capítulo para o seguinte.",
    ],
  },
  {
    section: "apreciar",
    incomumKind: "audiovisual",
    slug: "ichika-nito-away-official-music-video",
    title: "Ichika Nito - Away (Official Music Video)",
    publishedAt: "2026-05-15T12:00:00.000Z",
    dateLabel: "15 de mai. de 2026",
    category: "música",
    excerpt:
      "Ichika Nito é um guitarrista e compositor japonês conhecido sobretudo por vídeos em que combina fingerstyle, tapping e um fraseado muito limpo, muitas vezes sem vocais, com ênfase no som da corda e no ritmo como melodia.",
    body: [
      "Ichika Nito é um guitarrista e compositor japonês conhecido sobretudo por vídeos em que combina fingerstyle, tapping e um fraseado muito limpo, muitas vezes sem vocais, com ênfase no som da corda e no ritmo como melodia. Away é um dos lançamentos em formato de videoclipe oficial no canal do autor.",
    ],
    youtubeVideoId: "sOjA1tm_rvk",
  },
  {
    section: "apreciar",
    incomumKind: "audiovisual",
    slug: "pina-2011",
    title: "Pina (2011)",
    publishedAt: "2026-05-11T22:00:00.000Z",
    dateLabel: "11 de mai. de 2026",
    category: "documentário",
    excerpt:
      "Pina (2011), de Wim Wenders, documenta a coreógrafa Pina Bausch e o Tanztheater Wuppertal num formato pensado para projeção em 3D: trechos de espetáculos gravados em palco e em exteriores, cortados com depoimentos curtos dos bailarinos sobre o método de criação da companhia.",
    body: [
      "Pina (2011), de Wim Wenders, documenta a coreógrafa Pina Bausch e o Tanztheater Wuppertal num formato pensado para projeção em 3D: trechos de espetáculos gravados em palco e em exteriores, cortados com depoimentos curtos dos bailarinos sobre o método de criação da companhia. Em vez de uma biografia linear feita de arquivo e narração contínua, o filme organiza-se sobretudo à volta do repertório: gestos repetidos, humor sombrio, uso da palavra e da música ao vivo como elementos coreográficos, deixando o espetáculo falar por si.",
      "A montagem confia na sucessão de números para transmitir o vocabulário cénico de Bausch; quem procura cronologia ou contexto histórico mais denso pode complementar com leituras ou outros materiais, mas como registo cinematográfico da dança em espaço e volume, o filme oferece uma entrada forte ao seu universo.",
    ],
    youtubeVideoId: "JmKur1D772c",
  },
  {
    section: "apreciar",
    incomumKind: "audiovisual",
    slug: "channel-5-andrew-callaghan",
    title: "Channel 5 with Andrew Callaghan",
    publishedAt: "2026-05-11T16:00:00.000Z",
    dateLabel: "11 de mai. de 2026",
    category: "documentário",
    excerpt:
      "Channel 5 with Andrew Callaghan é um projeto de jornalismo documental independente lançado em 2021, apresentado por Andrew Callaghan e surgido depois do fim de All Gas No Brakes.",
    body: [
      "Channel 5 with Andrew Callaghan é um projeto de jornalismo documental independente lançado em 2021, apresentado por Andrew Callaghan e surgido depois do fim de All Gas No Brakes. O canal mistura entrevistas de rua, cobertura de eventos, perfis de personagens e documentários mais longos, publicados principalmente no YouTube e no Patreon.",
    ],
  },
  {
    section: "apreciar",
    incomumKind: "audiovisual",
    slug: "lamp-koibito-e-hirogaru-namida",
    title: "Lamp - 恋人へ～ひろがるなみだ",
    publishedAt: "2026-05-13T12:00:00.000Z",
    dateLabel: "13 de mai. de 2026",
    category: "música",
    excerpt:
      "Lamp é um projeto musical japonês com raízes em sonoridades próximas do city pop e do indie suave; no YouTube, o canal oficial publica gravações de estúdio e vídeos que acompanham lançamentos.",
    body: [
      "Lamp é um projeto musical japonês com raízes em sonoridades próximas do city pop e do indie suave; no YouTube, o canal oficial publica gravações de estúdio e vídeos que acompanham lançamentos. \"恋人へ～ひろがるなみだ\" (leitura aproximada: Koibito e ~ Hirogaru namida) integra esse arquivo em formato de vídeo musical.",
    ],
    youtubeVideoId: "daWgSX6X-kY",
  },
  {
    section: "apreciar",
    incomumKind: "audiovisual",
    slug: "julie-feminine-adornments",
    title: "Julie - feminine adornments",
    publishedAt: "2026-05-12T12:00:00.000Z",
    dateLabel: "12 de mai. de 2026",
    category: "música",
    excerpt:
      "\"julie\" é um projeto musical com lançamentos que misturam indie rock e texturas próximas do shoegaze ou dream pop, conforme o período e o registo de cada faixa.",
    body: [
      "\"julie\" é um projeto musical com lançamentos que misturam indie rock e texturas próximas do shoegaze ou dream pop, conforme o período e o registo de cada faixa. \"feminine adornments\" aparece como vídeo musical no canal oficial.",
      "Eu diria que é uma ótima representação sobre quem eu sou. 95% do tempo o da esquerda, 5% o da direita.",
    ],
    youtubeVideoId: "7P42-zrcGSY",
  },
  {
    section: "apreciar",
    incomumKind: "audiovisual",
    slug: "bonjr-its-ok-youre-ok",
    title: "Bonjr - It's Ok, You're Ok",
    publishedAt: "2026-05-17T22:00:00.000Z",
    dateLabel: "17 de mai. de 2026",
    category: "música",
    excerpt:
      "Bonjr é um projeto de música eletrônica com lançamentos que costumam explorar texturas suaves, batidas limpas e atmosfera quase hipnótica, comum em cruzamentos entre future beats, chill e pop sintético.",
    body: [
      "Bonjr é um projeto de música eletrônica com lançamentos que costumam explorar texturas suaves, batidas limpas e atmosfera quase hipnótica, comum em cruzamentos entre future beats, chill e pop sintético. \"It's Ok, You're Ok\" circula como vídeo no canal i'm cyborg but that's ok (nome que remete ao filme de Park Chan-wook), com cenas do filme Morro dos Ventos Uivantes.",
    ],
    youtubeVideoId: "akkLbD2KUbE",
  },
  {
    section: "apreciar",
    incomumKind: "audiovisual",
    slug: "blue-foundation-eyes-on-fire-official-music-video",
    title: "Blue Foundation - Eyes On Fire (Official Music Video)",
    publishedAt: "2026-05-14T22:00:00.000Z",
    dateLabel: "14 de mai. de 2026",
    category: "música",
    excerpt:
      "Blue Foundation é uma formação dinamarquesa com raízes em eletrônica e dream pop; \"Eyes On Fire\".",
    body: [
      "Blue Foundation é uma formação dinamarquesa com raízes em eletrônica e dream pop; \"Eyes On Fire\".",
    ],
    youtubeVideoId: "LAxCqlU-OAo",
  },
  {
    section: "apreciar",
    incomumKind: "audiovisual",
    slug: "the-big-push",
    title: "The Big Push",
    publishedAt: "2026-05-18T22:00:00.000Z",
    dateLabel: "18 de mai. de 2026",
    category: "música",
    excerpt:
      "The Big Push é uma banda surgida da cena de busking de Brighton, formada por Ren Gill, Romain Axisa, Gorran Kendall e Glenn Chambers.",
    body: [
      "The Big Push é uma banda surgida da cena de busking de Brighton, formada por Ren Gill, Romain Axisa, Gorran Kendall e Glenn Chambers. O grupo ficou conhecido justamente por esse começo de rua: apresentações ao vivo muito físicas, circulação por vídeos online e uma linguagem que juntava energia de performance, rearranjos de covers e composições próprias.",
      "Gravado em Brighton e publicado no canal oficial da banda, o medley junta \"I Shot the Sheriff\" e \"Road to Zion\" a uma passagem de rap/hip hop, transformando referências conhecidas em uma execução mais crua, expansiva e muito dependente da energia ao vivo.",
    ],
    youtubeVideoId: "uSeCuR51rek",
  },
  {
    section: "apreciar",
    incomumKind: "audiovisual",
    slug: "christian-loffler-ensemble-live-volksbuhne-berlin",
    title: "Christian Löffler & Ensemble (Live at Volksbühne, Berlin)",
    publishedAt: "2026-05-16T22:30:00.000Z",
    dateLabel: "16 de mai. de 2026",
    category: "música",
    excerpt:
      "Christian Löffler é um produtor e músico alemão associado a uma linha de house e techno melódico com forte carga emotiva, paisagens sonoras lentas, vozes fragmentadas e texturas que se aproximam do ambient.",
    body: [
      "Christian Löffler é um produtor e músico alemão associado a uma linha de house e techno melódico com forte carga emotiva, paisagens sonoras lentas, vozes fragmentadas e texturas que se aproximam do ambient. Este registo captura um concerto com ensemble na Volksbühne (Berlim), teatro e casa de cultura conhecida pela experimentação cénica.",
    ],
    youtubeVideoId: "pZYagxwMhaw",
  },
  {
    section: "apreciar",
    incomumKind: "audiovisual",
    slug: "vice-documentarios",
    title: "VICE",
    publishedAt: "2026-05-18",
    dateLabel: "18 de mai. de 2026",
    category: "documentário",
    excerpt:
      "A VICE reúne documentários, reportagens em vídeo e séries voltadas a temas de política, crime, drogas, tecnologia, guerra, cultura e vida urbana, quase sempre com uma linguagem mais imersiva e direta do que a do jornalismo televisivo convencional.",
    body: [
      "A VICE reúne documentários, reportagens em vídeo e séries voltadas a temas de política, crime, drogas, tecnologia, guerra, cultura e vida urbana, quase sempre com uma linguagem mais imersiva e direta do que a do jornalismo televisivo convencional. No ecossistema da marca, esse material aparece tanto no VICE Video quanto em produções distribuídas em plataformas como o YouTube e a VICE TV.",
    ],
  },
  {
    section: "apreciar",
    incomumKind: "audiovisual",
    slug: "youtube-playlist-okcjg",
    title: "Compilação EELF",
    publishedAt: "2026-05-10T12:00:00.000Z",
    dateLabel: "10 de mai. de 2026",
    category: "vídeos",
    excerpt:
      "EELF é um canal ligado à circulação de lo-fi house e house mais subterrânea, conhecido tanto pela curadoria musical quanto pela identidade visual muito própria.",
    body: [
      "EELF é um canal ligado à circulação de lo-fi house e house mais subterrânea, conhecido tanto pela curadoria musical quanto pela identidade visual muito própria.",
      "O underground / lo-fi house designa uma vertente da house menos polida e mais texturizada: batidas repetitivas, pads enevoados, acordes nostálgicos, ruídos e imperfeições deliberadas que dão à música um calor quase analógico.",
      "As cenas, no EELF, costumam aparecer como arquivos de memória: vídeos granulados, feitos de deslocamentos, fragmentos urbanos e imagens melancólicas que não contam exatamente uma história, mas constroem uma atmosfera. Elas funcionam como extensão da música, menos ilustração do que sensação.",
    ],
    youtubeVideoId: "okCJGgqnQFI",
  },
  {
    section: "apreciar",
    incomumKind: "audiovisual",
    slug: "hey-who-really-cares-lowertown",
    title: "Hey, Who Really Cares? - Song by Linda Perhacs",
    publishedAt: "2026-05-11T12:00:00.000Z",
    dateLabel: "11 de mai. de 2026",
    category: "música",
    excerpt:
      "Cover por Lowertown. Sei lá, só apareceu nos meus recomendados, tem algo nele.",
    body: [
      "Cover por Lowertown. Sei lá, só apareceu nos meus recomendados, tem algo nele.",
    ],
    youtubeVideoId: "6nGZYFHC9MM",
  },
  {
    section: "apreciar",
    incomumKind: "arte",
    slug: "1041uuu-galeria",
    title: "1041uuu展示室",
    publishedAt: "2026-04-16T23:00:00.000Z",
    dateLabel: "16 de abr. de 2026",
    category: "pixel art",
    excerpt:
      "https://1041uuu.jp/ reúne a galeria de 1041uuu, artista japonês que trabalha principalmente com pixel art.",
    imageSrc: "/media/incomum/1041uuu-tumblr-ab3b87a6.png",
    imageAlt:
      "Pixel art 1041uuu — imagem partilhada no Tumblr (tumblr_ab3b87a6b0a2582c0a8a379ddb37d849_71a1b5fb_500-1)",
    imageGallery: [
      "/media/incomum/1041uuu.gif",
      "/media/incomum/1041uuu-1.png",
    ],
    body: [
      "https://1041uuu.jp/ reúne a galeria de 1041uuu, artista japonês que trabalha principalmente com pixel art. O site funciona menos como portfólio convencional e mais como um espaço de exposição: um lugar para percorrer imagens, séries e pequenos ambientes visuais no próprio ritmo, acompanhando a consistência de um imaginário que se repete e se transforma.",
    ],
  },
  {
    section: "apreciar",
    incomumKind: "arte",
    slug: "erin-hanson-monets-bridge",
    title: "Erin Hanson, Monet's Bridge",
    publishedAt: "2026-04-15",
    dateLabel: "15 de abr. de 2026",
    category: "pintura",
    postGalleryMainPreset: "compact",
    excerpt:
      "Erin Hanson é uma pintora norte-americana conhecida por paisagens em grande formato e pelo que chama de \"Open Impressionism\": uma pintura de pinceladas abertas, cor intensa e poucas camadas, voltada menos para o acabamento liso do que para a sensação de luz, movimento e volume.",
    imageSrc: "/media/incomum/erin-hanson-monets-bridge.png",
    imageAlt:
      "Monet's Bridge — óleo de Erin Hanson: ponte japonesa sobre lago com nenúfares, jardim com rosas, lírios e flores silvestres, folhagem em verde, lavanda e azul (Open Impressionism)",
    body: [
      "Erin Hanson é uma pintora norte-americana conhecida por paisagens em grande formato e pelo que chama de \"Open Impressionism\": uma pintura de pinceladas abertas, cor intensa e poucas camadas, voltada menos para o acabamento liso do que para a sensação de luz, movimento e volume.",
    ],
  },
  {
    section: "apreciar",
    incomumKind: "arte",
    slug: "hamsterfragment",
    title: "HamsterFragment",
    publishedAt: "2026-04-13T18:00:00.000Z",
    dateLabel: "13 de abr. de 2026",
    category: "pixel art",
    postGalleryMainPreset: "pixel-art",
    excerpt:
      "https://x.com/HamsterFragment reúne trabalhos de HamsterFragment, artista de linguagem próxima da pixel art, marcados pela recorrência de uma mesma personagem em cenas de tentativa de suicídio: ela é imortal.",
    imageSrc: "/media/incomum/hamsterfragment-5.png",
    imageAlt:
      "Pixel art monocromático: duas figuras em espreguiçadeiras ao ar livre; personagem recorrente em farda escolar (HamsterFragment)",
    imageGallery: [
      "/media/incomum/hamsterfragment-4.png",
      "/media/incomum/hamsterfragment-1.png",
      "/media/incomum/hamsterfragment-2.png",
      "/media/incomum/hamsterfragment-3.png",
      "/media/incomum/hamsterfragment-6.png",
    ],
    body: [
      "https://x.com/HamsterFragment reúne trabalhos de HamsterFragment, artista de linguagem próxima da pixel art, marcados pela recorrência de uma mesma personagem em cenas de tentativa de suicídio: ela é imortal. Há algo de filosoficamente cômico nisso: parece o samsara fazendo piada.",
    ],
  },
  {
    section: "apreciar",
    incomumKind: "arte",
    slug: "jean-francois-millet-pintura",
    title: "Jean-François Millet",
    publishedAt: "2026-04-19T20:00:00.000Z",
    dateLabel: "19 de abr. de 2026",
    category: "pintura",
    postGalleryMainPreset: "compact",
    excerpt:
      "Barbizon e realismo francês: figuras camponesas, paleta de terras e ocres, paisagem e claro-escuro — Pissenlits, Marguerites, La Mort et le Bûcheron e Printemps.",
    imageSrc: "/media/incomum/millet-pissenlits.png",
    imageAlt:
      "Jean-François Millet, Pissenlits (c. 1867–1868): pastel — dentes-de-leão em semente e flor, margaridas, vegetação em contraluz sobre fundo escuro",
    postImages: [
      {
        src: "/media/incomum/millet-pissenlits.png",
        alt: "Jean-François Millet, Pissenlits (c. 1867–1868): pastel — dentes-de-leão em semente e flor, margaridas, vegetação em contraluz sobre fundo escuro",
      },
      {
        src: "/media/incomum/millet-marguerites.png",
        alt: "Jean-François Millet, Marguerites (c. 1871–1874): pastel — ramo de margaridas num jarro azul, rosto de criança à direita, tesoura e alfineteiro no parapeito",
      },
      {
        src: "/media/incomum/millet-mort-bucheron.png",
        alt: "Jean-François Millet, La Mort et le Bûcheron (1859): óleo — a Morte com foice e ampulheta alada, lenhador exausto junto ao feixe de lenha, fábula de La Fontaine",
      },
      {
        src: "/media/incomum/millet-printemps.png",
        alt: "Jean-François Millet, Printemps (c. 1868–1873): pastel e carvão — arco-íris duplo, macieira em flor e terra lavrada ao primeiro plano",
      },
    ],
    body: [
      "Jean-François Millet (1814–1875) foi um dos nomes associados à escola de Barbizon e ao realismo francês do século XIX. Sua pintura costuma ser lembrada pelas figuras camponesas, pelos gestos pesados do trabalho rural e por uma paleta feita de terras, ocres e cinzas quentes. Ao lado dessas cenas, há também paisagens e estudos de natureza em que a luz, o clima e o claro-escuro ganham quase tanta importância quanto a figura humana. Na seleção apresentada, aparecem as obras Pissenlits, Marguerites, La Mort et le Bûcheron e Printemps.",
    ],
  },
  {
    section: "apreciar",
    incomumKind: "arte",
    slug: "grandville-bridge-un-autre-monde",
    title: "J. J. Grandville, Un Autre Monde (1844)",
    publishedAt: "2026-04-16T19:00:00.000Z",
    dateLabel: "16 de abr. de 2026",
    category: "desenho",
    excerpt:
      "A Bridge Leads from One World to the Next é uma gravura de J. J. Grandville incluída em Un Autre Monde (1844), álbum ilustrado que combina fantasia, sátira e imaginação especulativa.",
    imageSrc: "/media/incomum/grandville-bridge-un-autre-monde.png",
    imageAlt:
      "Gravura em madeira: ponte ornamental entre planetas flutuantes, figura solitária a atravessar, fundo estrelado — J. J. Grandville, Un Autre Monde (1844)",
    body: [
      "A Bridge Leads from One World to the Next é uma gravura de J. J. Grandville incluída em Un Autre Monde (1844), álbum ilustrado que combina fantasia, sátira e imaginação especulativa em uma viagem por mundos inventados. Também vale lembrar as séries em que Grandville se volta a animais antropomorfizados e metamorfoses fantásticas, \"Les Métamorphoses du jour\" e \"Scènes de la vie privée et publique des animaux\", criando figuras híbridas de humano e animal em cenas cômicas e satíricas.",
    ],
  },
  {
    section: "apreciar",
    incomumKind: "arte",
    slug: "utagawa-hiroshige-ukiyo-e",
    title: "Utagawa Hiroshige",
    publishedAt: "2026-04-14",
    dateLabel: "14 de abr. de 2026",
    category: "gravura",
    excerpt:
      "Utagawa Hiroshige (1797–1858) é um dos nomes centrais do ukiyo-e de paisagem.",
    imageSrc: "/media/incomum/hiroshige-2-grua-onda.png",
    imageAlt:
      "Ukiyo-e de Utagawa Hiroshige: grou-coroado em voo sobre onda azul, caligrafia e selos vermelhos",
    postImages: [
      {
        src: "/media/incomum/hiroshige-2-grua-onda.png",
        alt: "Ukiyo-e de Utagawa Hiroshige: grou-coroado em voo sobre onda azul, caligrafia e selos vermelhos",
      },
      {
        src: "/media/incomum/hiroshige-1-fujikawa.png",
        alt: "Ukiyo-e de Utagawa Hiroshige: neve na estação de Fujikawa (Tōkaidō), viajantes a cavalo e a pé, casas cobertas de neve",
      },
      {
        src: "/media/incomum/hiroshige-3-ohashi-yudachi.png",
        alt: "Ukiyo-e de Utagawa Hiroshige: chuva súbita na ponte Shin-Ōhashi e Atake (Cem vistas célebres de Edo), figuras com capas e guarda-chuvas",
      },
      {
        src: "/media/incomum/hiroshige-4-hira-yuki.png",
        alt: "Ukiyo-e de Utagawa Hiroshige: neve ao entardecer em Hira (Oito vistas de Ōmi), montanhas nevadas e lago azul",
      },
    ],
    body: [
      "Utagawa Hiroshige (1797—1858) é um dos nomes centrais do ukiyo-e de paisagem. Suas gravuras se destacam pela cor plana, pelo desenho preciso e pelo uso delicado de gradações de tinta (bokashi). Hiroshige foca menos em \"descrever um lugar com exatidão\" e mais em representar a atmosfera de um lugar.",
      "Na seleção apresentada, aparecem Nami ni Tsuru (Garça e Onda), da série de flores e pássaros; Fujikawa, Shukugai no Zu (Fujikawa: Arredores da Estação), das Cinquenta e Três Estações da Estrada Tōkaidō; Shin-Ōhashi Atake no Yudachi (Chuva Repentina sobre a Ponte Shin-Ōhashi e Atake), das Cem Vistas Famosas de Edo; e Hira no Bosetsu (Neve ao Entardecer em Hira), das Oito Vistas de Ōmi.",
    ],
  },
  {
    section: "apreciar",
    incomumKind: "arte",
    slug: "gustave-dore-gravuras",
    title: "Gustave Doré",
    publishedAt: "2026-04-12T12:00:00.000Z",
    dateLabel: "12 de abr. de 2026",
    category: "desenho",
    /** Abre na cena de redil sob a lua (índice 2) em todos os tamanhos de ecrã. */
    coverIndex: 2,
    excerpt:
      "Paul Gustave Doré (1832–1883) foi um dos ilustradores mais reconhecidos do século XIX.",
    imageSrc: "/media/incomum/gustave-dore-2.png",
    imageAlt:
      "Gravura de Gustave Doré (Paraíso Perdido): anjo caído em queda vertiginosa, asas escuras, céu com estrelas e clarão divino",
    postImages: [
      {
        src: "/media/incomum/gustave-dore-2.png",
        alt: "Gravura de Gustave Doré (Paraíso Perdido): anjo caído em queda vertiginosa, asas escuras, céu com estrelas e clarão divino",
      },
      {
        src: "/media/incomum/gustave-dore-3.png",
        alt: "Gravura de Gustave Doré (Divina Comédia — Paraíso): rosa celestial de anjos em espiral, luz no centro, duas figuras em primeiro plano",
      },
      {
        src: "/media/incomum/gustave-dore-4.png",
        alt: "Gravura de Gustave Doré: lobos junto ao redil à luz da lua, ovelhas no curral, árvores sombrias",
      },
      {
        src: "/media/incomum/gustave-dore-post7-4.png",
        alt: "Gravura de Gustave Doré (Bíblia): Morte sobre cavalo pálido, cavaleiro encapuzado com foice, galope sobre fundo escuro",
      },
    ],
    body: [
      "Paul Gustave Doré (1832–1883) foi um dos ilustradores mais reconhecidos do século XIX. Seu trabalho se tornou especialmente célebre pelas gravuras para edições da Bíblia, da Divina Comédia e do Paraíso Perdido, entre muitos outros textos, sempre com forte senso de escala, dramaticidade e contraste entre luz e trevas.",
      "Na sequência apresentada, aparecem a queda vertiginosa em Paraíso Perdido; a Rosa Celeste do Paraíso dantesco; uma cena de redil sob a lua; e A Morte sobre o cavalo pálido.",
    ],
  },
  {
    section: "apreciar",
    incomumKind: "arte",
    slug: "camille-corot-paisagens",
    title: "Jean-Baptiste-Camille Corot",
    publishedAt: "2026-04-19T12:00:00.000Z",
    dateLabel: "19 de abr. de 2026",
    category: "pintura",
    postGalleryMainPreset: "compact",
    excerpt:
      "Jean-Baptiste-Camille Corot (1796–1875) é uma das referências centrais da paisagem francesa do século XIX.",
    imageSrc: "/media/incomum/corot-1-pond-ville-davray.png",
    imageAlt:
      "Óleo de Camille Corot: lago e prado em Ville-d'Avray, vacas, árvores altas e aldeia ao fundo sob céu claro (atmosfera suave)",
    imageGallery: ["/media/incomum/corot-2-road-to-sevres.png"],
    body: [
      "Jean-Baptiste-Camille Corot (1796–1875) é uma das referências centrais da paisagem francesa do século XIX. Ligado à pintura ao ar livre, à floresta de Fontainebleau e ao ambiente da escola de Barbizon, desenvolveu uma linguagem em que a luz, a atmosfera e os meios-tons passam a ter mais peso que o contorno nítido. Em muitas obras tardias, a cena parece se desfazer suavemente no ar, como se a pintura se aproximasse mais de uma lembrança ou de uma impressão do que de uma descrição exata.",
      "Le Tang de Ville-d'Avray concentra bem esse modo mais contido: água parada, campo baixo, figuras e animais reduzidos a pequenas presenças, verdes e cinzas luminosos, céu amplo e uma calma que não é vazia, mas trabalhada. The Road to Sèvres mostra um dos motivos mais recorrentes de Corot: a estrada, a figura pequena, a massa de árvores e o horizonte aberto.",
    ],
  },
  {
    section: "apreciar",
    incomumKind: "arte",
    slug: "hurufiyya-ahmed-moustafa",
    title: "Ahmed Moustafa",
    publishedAt: "2026-04-28T14:00:00.000Z",
    dateLabel: "28 de abr. de 2026",
    category: "pintura",
    postGalleryMainPreset: "compact",
    excerpt:
      "Hurufiyya designa uma vertente da arte moderna e contemporânea árabe que toma a letra não apenas como veículo de leitura, mas como espaço visual.",
    imageSrc: "/media/incomum/hurufiyya-tunel-perspectiva.png",
    imageAlt:
      "Caligrafia árabe branca em perspectiva de túnel convergindo para uma abertura com céu azul e nuvens",
    postImages: [
      {
        src: "/media/incomum/hurufiyya-tunel-perspectiva.png",
        alt: "Caligrafia árabe branca em perspectiva de túnel convergindo para uma abertura com céu azul e nuvens",
      },
      {
        src: "/media/incomum/hurufiyya-post11-caligrafia.png",
        alt: "Composição Hurufiyya: traços negros amplos e microcaligrafia em fundo claro, círculo dourado como foco luminoso",
      },
    ],
    body: [
      "Hurufiyya designa uma vertente da arte moderna e contemporânea árabe que toma a letra não apenas como veículo de leitura, mas como espaço visual. Em vez de permanecer restrita ao texto, a escrita passa a organizar superfície, massa, repetição e perspectiva. As obras apresentadas demonstram um pouco dessa essência, de Ahmed Moustafa, Eqra - Endless Cosmic Renewal, em que o disco central e a organização das letras remetem ao ciclo lunar e à ideia de leitura como contemplação cósmica, e Divine Bedrock of Human Artistry, em que a escrita se abre em perspectiva para um céu de nuvens, como se a caligrafia passasse a habitar o espaço e o horizonte.",
      "Há nessas imagens um rigor geométrico forte: a escrita se distribui por simetrias, repetições e rotações que fazem a letra atuar não apenas como signo, mas como estrutura de espaço.",
    ],
  },
  {
    section: "apreciar",
    incomumKind: "arte",
    slug: "slawek-fedorczuk-instagram",
    title: "Slawek Fedorczuk",
    publishedAt: "2026-04-18",
    dateLabel: "18 de abr. de 2026",
    category: "pintura digital",
    excerpt:
      "Ilustrador e concept artist na Polônia: ambientes, fundos e color scripts; paisagens amplas, luz filtrada e arquitetura em ruína ou suspensão.",
    imageSrc: "/media/incomum/slawek-fedorczuk-3.png",
    imageAlt:
      "Pintura digital de Slawek Fedorczuk: vale com ribeiro e pedras, duas figuras, casas e montanhas ao pôr do sol (luz dourada)",
    imageGallery: [
      "/media/incomum/slawek-fedorczuk-1.png",
      "/media/incomum/slawek-fedorczuk-2.png",
      "/media/incomum/slawek-fedorczuk-4.png",
    ],
    body: [
      "Sławek Fedorczuk é um ilustrador e concept artist freelancer baseado na Polônia, com trabalho voltado sobretudo a design de ambientes, fundos e color scripts para animação, motion design e games. Suas imagens costumam chamar atenção pela construção atmosférica: paisagens amplas, luz filtrada, cores, arquitetura em ruína ou suspensão, e uma sensação constante de mundo à beira de alguma coisa.",
    ],
  },
  {
    section: "apreciar",
    incomumKind: "literatura",
    slug: "baudelaire-the-abyss",
    title: "The Abyss",
    publishedAt: "2026-04-20",
    dateLabel: "20 de abr. de 2026",
    category: "poema",
    excerpt:
      "Charles Baudelaire — poema em inglês (The Abyss).",
    bodyPresentation: "verse",
    body: [
      "Charles Baudelaire",
      "Pascal had his abyss, that moved with him.\nAll is abyss—action, desire, dream,\nwords! And I often feel against my skin,\nsetting my hair on end, the wind of Fear.",
      "All around me—the brink, the depths, the space;\nI'm spellbound, petrified, frozen in place;\nAnd on my midnights, God's skilled fingers trace\nan ever-changing, never-ending nightmare.",
      "I fear my dreams, as I would fear big holes\nfilled with vague dread, and leading who knows where.\nI see infinity through every window,\nand my mind, always racked by vertigo,\nyearns to become as numb as empty air.\nAh! Never leave the realms of Sums and Souls!",
    ],
  },
  {
    section: "apreciar",
    incomumKind: "literatura",
    slug: "tennyson-tears-idle-tears",
    title: "from The Princess: Tears, Idle Tears",
    publishedAt: "2026-04-16",
    dateLabel: "16 de abr. de 2026",
    category: "poema",
    excerpt:
      "Alfred, Lord Tennyson — memória, perda e a melancolia dos dias que já não voltam.",
    bodyPresentation: "verse",
    body: [
      "By Alfred, Lord Tennyson",
      "Tears, idle tears, I know not what they mean,\nTears from the depth of some divine despair\nRise in the heart, and gather to the eyes,\nIn looking on the happy Autumn-fields,\nAnd thinking of the days that are no more.",
      "Fresh as the first beam glittering on a sail,\nThat brings our friends up from the underworld,\nSad as the last which reddens over one\nThat sinks with all we love below the verge;\nSo sad, so fresh, the days that are no more.",
      "Ah, sad and strange as in dark summer dawns\nThe earliest pipe of half-awaken'd birds\nTo dying ears, when unto dying eyes\nThe casement slowly grows a glimmering square;\nSo sad, so strange, the days that are no more.",
      "Dear as remember'd kisses after death,\nAnd sweet as those by hopeless fancy feign'd\nOn lips that are for others; deep as love,\nDeep as first love, and wild with all regret;\nO Death in Life, the days that are no more!",
    ],
  },
  {
    section: "apreciar",
    incomumKind: "literatura",
    slug: "blame-tsutomu-nihei",
    title: "Blame! (ブラム!)",
    publishedAt: "2026-04-19",
    dateLabel: "19 de abr. de 2026",
    category: "manga",
    excerpt:
      "Blame! (ブラム!) é uma série de manga de Tsutomu Nihei, publicada originalmente na revista Afternoon (Kodansha). O protagonista, Killy, em busca de humanos portadores do Gene Terminal de Rede, atravessa níveis intermináveis de uma cidade-máquina em colapso: passagens, pontes e vãos que não parecem ter fim, desenhados com perspetivas extremas e um preto-e-branco denso. O tom é cyberpunk minimalista, poucos diálogos, ameaças mecânicas e biológicas, e a sensação constante de escala inhumana.",
    imageSrc: "/media/incomum/blame-tsutomu-nihei.png",
    imageAlt:
      "Capa de BLAME! THE ANTHOLOGY (Hayakawa): interior industrial gigantesco em preto e branco, tubagens e vigas em perspetiva, figura minúscula num patamar — obra original Tsutomu Nihei",
    body: [
      "Blame! (ブラム!) é uma série de manga de Tsutomu Nihei, publicada originalmente na revista Afternoon (Kodansha).",
      "O protagonista, Killy, em busca de humanos portadores do Gene Terminal de Rede, atravessa níveis intermináveis de uma cidade-máquina em colapso: passagens, pontes e vãos que não parecem ter fim, desenhados com perspetivas extremas e um preto-e-branco denso. O tom é cyberpunk minimalista, poucos diálogos, ameaças mecânicas e biológicas, e a sensação constante de escala inhumana.",
    ],
  },
  {
    section: "apreciar",
    incomumKind: "literatura",
    slug: "aldous-huxley-island",
    title: "A Ilha (Island)",
    publishedAt: "2026-04-21",
    dateLabel: "21 de abr. de 2026",
    category: "livro",
    postBodyVisibleParagraphCount: 1,
    excerpt:
      "Island (1962): Will Farnaby em Pala — sociedade que articula budismo, psicanálise e educação; utopia frágil, menos inconsciente e brutal; lucidez, compaixão e felicidade como presença.",
    imageSrc: "/media/incomum/aldous-huxley-island.png",
    imageAlt:
      "Capa de Island de Aldous Huxley (Penguin Books): lombada e faixa laranja com logótipo e título; painel rosa com composição geométrica em triângulos brancos e laranja e salpicos pretos",
    body: [
      "Island (1962), último romance concluído por Aldous Huxley, acompanha a chegada do jornalista Will Farnaby à ilha fictícia de Pala, no Oceano Índico, uma sociedade que procurou articular budismo, psicanálise, educação e formas mais conscientes de organizar a vida. O romance tem algo de ensaio e de experiência imaginária: não descreve uma comunidade perfeita, mas uma tentativa frágil de construir uma civilização menos inconsciente, menos brutal e menos submetida ao automatismo do desejo, do poder e da técnica.",
      "O que Huxley parece querer apontar é que uma vida melhor não nasce da eliminação da dor, nem da fantasia de controlar o curso das coisas, mas de uma forma mais lúcida de aceitá-las. Em Pala, atenção, compaixão e disciplina não aparecem como técnicas de conforto, e sim como modos de estar no mundo sem fugir dele. Há aí um paradoxo importante: a maturidade não está em vencer o sofrimento, mas em acolher o que vem sem se deixar deformar inteiramente por isso; não em dominar o destino, mas em consentir à sua forma sem cair na passividade. E, justamente por isso, a felicidade deixa de ser pensada como euforia, conquista ou anestesia, e passa a aparecer como presença, uma espécie de alegria sóbria do aqui e agora, tornada possível quando a mente já não está inteiramente capturada por medo, fantasia ou avidez. A lucidez, nesse sentido, não suaviza a vida; ela a torna mais real. E a disciplina não serve para endurecer o sujeito contra o mundo, mas para permitir que ele atravesse dor, perda e limite com menos ilusão e, talvez, com mais inteireza.",
      "Mais do que apresentar soluções, o livro organiza um problema: como viver de modo mais desperto sem cair em rigidez, ingenuidade ou propaganda moral. É um romance curto, denso em ideias, que vale ser lido devagar.",
    ],
  },
  {
    section: "apreciar",
    incomumKind: "literatura",
    slug: "caeiro-falas",
    title: "Alberto Caeiro",
    publishedAt: "2026-04-23",
    dateLabel: "23 de abr. de 2026",
    category: "poema",
    excerpt:
      "Civilização, felicidade e o que não cabe na \"máquina\" de querer o mundo de outro modo.",
    bodyPresentation: "verse",
    body: [
      "Falas",
      "Falas de civilização, e de não dever ser,\nFalas de civilização, e de não dever ser,\nOu de não dever ser assim.",
      "Dizes que todos sofrem, ou a maioria de todos,\nCom as coisas humanas postas desta maneira,",
      "Dizes que se fossem diferentes, sofreriam menos.\nDizes que se fossem como tu queres, seriam melhor.",
      "Escuto sem te ouvir.\nPara que te quereria eu ouvir?\nOuvindo-te nada ficaria sabendo.",
      "Se as coisas fossem diferentes, seriam diferentes: eis tudo.\nSe as coisas fossem como tu queres, seriam só como tu queres.",
      "Ai de ti e de todos que levam a vida\nA querer inventar a máquina de fazer felicidade!",
    ],
  },
  {
    section: "apreciar",
    incomumKind: "literatura",
    slug: "isaac-asimov-the-last-question",
    title: "The Last Question, Isaac Asimov",
    publishedAt: "2026-04-18",
    dateLabel: "18 de abr. de 2026",
    category: "conto",
    excerpt:
      "The Last Question (1956): Multivac, eras cósmicas e a pergunta pela entropia. O conto é curto — texto online na CMU.",
    body: [
      "The Last Question (1956) segue a linhagem de uma inteligência artificial colossal, de um Multivac na Terra a sucessivas gerações de máquinas cósmicas, enquanto a humanidade deixa o planeta, funde-se com a tecnologia e atravessa eras. Em cada etapa volta a mesma pergunta essencial: será possível inverter a entropia, escapar ao esfriamento terminal de tudo?",
      "O conto é curto.",
      "https://users.ece.cmu.edu/~gamvrosi/thelastq.html",
    ],
  },
  {
    section: "apreciar",
    incomumKind: "literatura",
    slug: "zimbardo-o-efeito-lucifer",
    title: "O Efeito Lúcifer, Philip Zimbardo",
    publishedAt: "2026-04-24",
    dateLabel: "24 de abr. de 2026",
    category: "livro",
    excerpt:
      "O Efeito Lúcifer propõe que a brutalidade nem sempre nasce de indivíduos excepcionalmente maus, mas pode emergir de arranjos situacionais que deformam percepção, responsabilidade e limite moral.",
    imageSrc: "/media/incomum/zimbardo-efeito-lucifer-record.png",
    imageAlt:
      "M. C. Escher, Círculo limite IV (Céu e Inferno, 1960): xilogravura, tesselado de anjos brancos e demónios negros; obra associada a O Efeito Lúcifer (Zimbardo).",
    postGalleryMobileTighter: true,
    body: [
      "Sinto que a literatura reunida aqui se inclina mais ao metafísico e ao passar-tempo do que conteúdos mais substanciais ou técnicos. Até onde sei, a literatura deveria preservar majoritariamente o lúdico; por isso, os textos mais voltados a comportamento social, sociedade, e temas formais afins acabam ficando em Utilidades, na subseção Material. Ainda assim, para que esta seção não se torne excessivamente esotérica:",
      "O Efeito Lúcifer propõe que a brutalidade nem sempre nasce de indivíduos excepcionalmente maus, mas pode emergir de arranjos situacionais que deformam percepção, responsabilidade e limite moral. Em vez de tratar o mal como traço fixo de caráter, Philip Zimbardo chama atenção para o modo como contexto, autoridade, papel social e pressão institucional podem transformar condutas ordinárias em violência.",
      "Caso tenha interesse por textos utilitários, olhe na seção de Utilidades.",
    ],
  },
  {
    section: "apreciar",
    incomumKind: "literatura",
    slug: "shoujo-shuumatsu-ryokou",
    title: "Shoujo Shuumatsu Ryokou (Girls' Last Tour)",
    publishedAt: "2026-04-14",
    dateLabel: "14 de abr. de 2026",
    category: "manga",
    excerpt:
      "Tsukumizu — Chito e Yuuri numa megacidade esvaziada; ritmo contemplativo, vazio no quadro e capítulos quase como curtas.",
    imageSrc: "/media/incomum/shoujo-shuumatsu-ryokou.png",
    imageAlt:
      "Shoujo Shuumatsu Ryokou: Chito e Yuuri abrigadas sob betão, fogueira à frente, casacos de inverno — desenho a lápis em preto e branco",
    body: [
      "Shoujo Shuumatsu Ryokou (少女終末旅行, Girls’ Last Tour) é um manga de Tsukumizu, serializado na revista online seinen Kurage Bunch (Shinchosha). Acompanhamos Chito e Yuuri, que sobrevivem numa megacidade esvaziada, entre níveis de concreto, neve e máquinas abandonadas, em um Kettenkrad de meia-lagarta, à procura de comida, combustível e sentido.",
      "O ritmo é lento e contemplativo: poucos diálogos, muito vazio no quadro, e perguntas sobre civilização, fé, arte e o que fica quando não resta quase ninguém. Os capítulos funcionam quase como curtas-metragens.",
    ],
  },
  {
    section: "apreciar",
    incomumKind: "literatura",
    slug: "lygia-fagundes-telles-antes-do-baile-verde",
    title: "Antes do Baile Verde, Lygia Fagundes Telles",
    publishedAt: "2026-04-13",
    dateLabel: "13 de abr. de 2026",
    category: "contos",
    excerpt:
      "Antes do Baile Verde: contos urbanos e burgueses onde o estranho surge aos poucos — contenção, inquietação e prosa brasileira com humor fino.",
    imageSrc: "/media/incomum/lygia-fagundes-telles-antes-do-baile-verde.png",
    imageAlt:
      "Livro aberto Antes do Baile Verde [1970] com índice de contos em páginas verde-claras, marcador em aguarela com rosas, paleta de tintas e retrato da autora — vista de cima",
    body: [
      "Antes do Baile Verde reúne contos de Lygia Fagundes Telles, uma das vozes mais reconhecidas da ficção brasileira. Os contos costumam se situar em ambientes urbanos e burgueses, mas o estranho surge de modo gradual: conversas banais, relações tensas, lembranças de infância e pequenos gestos que alteram a temperatura de tudo. Há uma combinação muito própria entre contenção e inquietação, com humor fino, por vezes sombrio, e uma linguagem que permanece claramente brasileira em ritmo, vocabulário e sensibilidade.",
    ],
  },
  {
    section: "apreciar",
    incomumKind: "literatura",
    slug: "raymond-carver-what-we-talk-about-love",
    title: "What We Talk About When We Talk About Love",
    publishedAt: "2026-04-22",
    dateLabel: "22 de abr. de 2026",
    category: "livro",
    excerpt:
      "Carver (1981): prosa seca e tensão em escala pequena; o conto-título, dois casais à mesa — diálogo, silêncios e um marco do minimalismo norte-americano.",
    imageSrc: "/media/incomum/raymond-carver-what-we-talk-about-love.png",
    postGalleryMobileTighter: true,
    imageAlt:
      "Capa Vintage Contemporaries: What We Talk About When We Talk About Love, Raymond Carver — mulher na cama com cartas, luz quente",
    body: [
      "What We Talk About When We Talk About Love (1981), de Raymond Carver, reúne contos escritos em prosa seca e contida, feitos de frases curtas, ambientes comuns e personagens que giram em torno daquilo que não conseguem dizer com clareza. Cozinhas, estradas, quartos de motel, copos, conversas interrompidas: quase tudo acontece em escala pequena, mas com uma tensão que nunca desaparece.",
      "O conto que dá nome ao livro é o mais conhecido: dois casais à mesa, entre café, gim e o fim da tarde, tentando falar sobre o amor. A conversa, no entanto, logo se desloca para posse, violência, fracasso, fé e incomunicabilidade. Carver não interpreta nem conduz o leitor a uma conclusão; deixa que o diálogo, os silêncios e o tempo produzam o efeito. É isso que faz do livro um dos marcos do minimalismo norte-americano.",
    ],
  },
  {
    section: "apreciar",
    incomumKind: "literatura",
    slug: "dostoievski-o-idiota",
    title: "O Idiota, Fiódor Dostoiévski",
    publishedAt: "2026-04-15",
    dateLabel: "15 de abr. de 2026",
    category: "livro",
    excerpt:
      "O Idiota é um dos romances centrais de Fiódor Dostoiévski, publicado entre 1868 e 1869.",
    imageSrc: "/media/incomum/dostoievski-o-idiota-cap.png",
    imageAlt:
      "Capa (edição em inglês) de The Idiot: título em branco sobre triângulo negro invertido, padrão geométrico preto e cinzento em estilo Art déco, Fyodor Dostoevsky",
    body: [
      "O Idiota é um dos romances centrais de Fiódor Dostoiévski, publicado entre 1868 e 1869. Nele, o príncipe Lev Nikoláievitch Míchkin retorna da Suíça, onde passou por tratamento, e entra no mundo social de São Petersburgo com uma espécie de franqueza desarmada, quase impossível de acomodar. Sua bondade, sua transparência e sua falta de cálculo não são lidas como virtude simples, mas como estranheza: à sua volta, os outros projetam suspeita, desejo, desprezo, fascínio. A tensão do livro nasce justamente daí: do encontro entre uma figura quase inocente e um mundo regido por honra, dinheiro, orgulho e aparência.",
    ],
  },
  {
    section: "apreciar",
    incomumKind: "literatura",
    slug: "mary-oliver-early-morning-ganges",
    title: "Varanasi",
    publishedAt: "2026-04-12",
    dateLabel: "12 de abr. de 2026",
    category: "poema",
    excerpt:
      "Mary Oliver — Varanasi ao amanhecer: o Ganges, uma mulher na água e o contraste com o olhar «ocidental».",
    bodyPresentation: "verse",
    body: [
      "Mary Oliver. A Thousand Mornings.",
      "Early in the morning we crossed the ghat,\nwhere fires were still smoldering,\nand gazed, with our Western minds, into the Ganges.\n\nA woman was standing in the river up to her waist;\nshe was lifting handfuls of water and spilling it\nover her body, slowly and many times,\nas if until there came some moment\nof inner satisfaction between her own life and the river's.\n\nThen she dipped a vessel she had brought with her\nand carried it filled with water back across the ghat,\nno doubt to refresh some shrine near where she lives,\nfor this is the holy city of Shiva, maker\nof the world, and this is his river.\n\nI can't say much more, except that it all happened\nin silence and peaceful simplicity, and something that felt\nlike that bliss of a certainty and a life lived\nin accordance with that certainty.\n\nI must remember this, I thought, as we fly back\nto America.\n\nPray God I remember this.",
    ],
  },
  {
    section: "apreciar",
    incomumKind: "literatura",
    slug: "mistica",
    title: "Laila e Majnun, Nizami",
    publishedAt: "2026-04-17",
    dateLabel: "17 de abr. de 2026",
    category: "literatura",
    excerpt:
      "Sufismo, budismo e daoísmo são nomes de tradições filosóficas voltadas a perceber, habitar e atravessar a realidade sem se reduzir ao ego, ao apego e ao desejo de domínio.",
    imageSrc: "/media/incomum/tradicoes-sapienciais.png",
    imageAlt:
      "Gravura em estilo de manuscrito: disco central claro rodeado de halo e raios rectilíneos, fundo castanho escuro, margens laterais em tom pergaminho",
    postGalleryMainPreset: "compact",
    postBodyVisibleParagraphCount: 1,
    body: [
      "Sufismo, budismo e daoísmo são nomes de tradições filosóficas voltadas a perceber, habitar e atravessar a realidade sem se reduzir ao ego, ao apego e ao desejo de domínio. Cada uma, à sua maneira, procura refinar a percepção, o desejo, a linguagem e a atenção. Não servem tanto para explicar o mundo quanto para alterar a forma de estar nele. O intuito destas recomendações é oferecer uma introdução, nada muito profunda, a uma literatura que sinaliza para um caminho e que, ao mesmo tempo, também pode ser satisfatória de se ler.",
      "No sufismo, Laila e Majnun, sobretudo em Nizami, apresenta o amor como excesso, perda de si e transformação do mundo em sinal. Não é apenas um romance; é também uma forma de perceber como a paixão pode ser lida como travessia espiritual. Antes que você morra, de Osho, figura profundamente controversa, mais associada a um culto pessoal do que a uma tradição séria de transmissão, costuma ser visto como algo exterior ao sufismo tradicional, mas ainda assim é um livro curioso. Seu interesse está menos na fidelidade à tradição do que na maneira como reaproveita certas intuições sufis sobre morte do ego, desprendimento e transformação interior.",
      "No budismo, o interesse está menos em consolar do que em ver com precisão: sofrimento, apego, impermanência e fabricação do eu. É uma tradição útil para quem quer pensar a mente sem sentimentalismo. O Heart Sutra e o Diamond Sutra são boas entradas: tratam de vacuidade, não-substancialidade, não-apego e dos limites de tomar o eu e as coisas como entidades fixas. Em outro registro, Siddhartha, de Hesse, embora não seja um texto budista tradicional, ajuda a aproximar esse clima de busca, renúncia e atenção de leitores ocidentais.",
      "O daoísmo segue por uma via diferente: menos combate, menos rigidez, menos vontade de domínio. O Tao Te Ching e o Zhuangzi são introduções coerentes nesse sentido. Há neles uma inteligência da leveza, do não-forçamento, da ação que não endurece e de uma forma de vida que não precisa se impor para existir.",
      "Essas leituras não formam um sistema único, mas uma vizinhança. O que têm em comum é a tentativa de mostrar que a realidade não se esgota no uso mais imediato das coisas, e que conhecer o mundo exige também transformar o modo de olhar.",
    ],
  },
  {
    section: "clinica",
    slug: "clinica-contacto",
    title: "Atendimento psicoterapeutico",
    feedTitleAlign: "center",
    publishedAt: "2026-04-11",
    dateLabel: "11 de abr. de 2026",
    category: "contato",
    excerpt:
      "Começaremos a atender apenas no ano que vem. Para outros projetos, e-mail — responderemos quando possível.",
    body: [
      "Começaremos a atender apenas no ano que vem.",
      "Para informações sobre quaisquer outros projetos, o contato pode ser feito por e-mail. Responderemos assim que possível.",
      "victorcvanse@gmail.com e adriellourenco@usp.br",
    ],
  },
  {
    section: "clinica",
    slug: "clinica-design",
    title: "Design",
    feedTitleAlign: "center",
    publishedAt: "2026-03-01",
    dateLabel: "1 de mar. de 2026",
    category: "design",
    excerpt: "Serviços de design",
    body: ["Serviços de design"],
  },
];

/** Ordenação do feed: fixados primeiro; depois mais recente — mais antigo; empate por slug. */
function sortFeedPostsForDisplay(posts: VictorFeedPost[]): VictorFeedPost[] {
  return [...posts].sort((a, b) => {
    const pin = Number(!!b.pinned) - Number(!!a.pinned);
    if (pin !== 0) return pin;
    const byDate = b.publishedAt.localeCompare(a.publishedAt);
    if (byDate !== 0) return byDate;
    return a.slug.localeCompare(b.slug, "pt");
  });
}

export function getPostsForSection(
  section: VictorPostSection,
  locale: AppLocale = "pt-BR",
): VictorFeedPost[] {
  return sortFeedPostsForDisplay(
    VICTOR_FEED_POSTS.filter((p) => {
      if (p.section !== section) return false;
      if (section === "entender" && p.hideFromUtilidadesFeed) return false;
      return true;
    }),
  ).map((p) => localizeVictorPost(p, locale));
}

export function getPostBySlug(
  slug: string,
  locale: AppLocale = "pt-BR",
): VictorFeedPost | undefined {
  const p = VICTOR_FEED_POSTS.find((x) => x.slug === slug);
  if (!p) return undefined;
  return localizeVictorPost(p, locale);
}

export function getAllPostSlugs(): string[] {
  return VICTOR_FEED_POSTS.filter((p) => !p.skipPostDetailPage).map(
    (p) => p.slug,
  );
}

export function getCategoriesForPosts(posts: VictorFeedPost[]): string[] {
  const s = new Set(posts.map((p) => p.category));
  return Array.from(s).sort((a, b) => a.localeCompare(b, "pt"));
}

/** Etiqueta para filtro “tipos” e badges (uma palavra ou título em várias palavras). */
export function formatCategoryLabel(category: string): string {
  const t = category.trim();
  if (!t) return category;
  if (t === "pixel art") return "Pixel art";
  if (t === "textos") return "Material";
  if (/\s/.test(t)) {
    return t
      .split(/\s+/)
      .map(
        (w) =>
          w.charAt(0).toLocaleUpperCase("pt-BR") +
          w.slice(1).toLocaleLowerCase("pt-BR"),
      )
      .join(" ");
  }
  return t.charAt(0).toLocaleUpperCase("pt-BR") + t.slice(1);
}

/** Bucket Ferramentas / Jornais / Material (kind `textos`) para posts de Utilidades (`entender`). */
export function getUtilidadeKind(post: VictorFeedPost): UtilidadeKind {
  if (post.section !== "entender") return "ferramenta";
  return post.utilidadeKind ?? "ferramenta";
}

/** Bucket Arte / Literatura / Audiovisual / Perfis para posts de Incomum (`apreciar`). */
export function getIncomumKind(post: VictorFeedPost): IncomumKind {
  if (post.section !== "apreciar") return "literatura";
  return post.incomumKind ?? "literatura";
}

