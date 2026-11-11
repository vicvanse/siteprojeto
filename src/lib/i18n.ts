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
  | "collection"
  | "logIn"
  | "collection.kicker"
  | "collection.yours"
  | "collection.owned"
  | "collection.locked"
  | "collection.ownedMeta"
  | "collection.lockedMeta"
  | "collection.objectCount"
  | "collection.yoursCount"
  | "collection.yourObjects"
  | "collection.extras"
  | "collection.banner"
  | "collection.download"
  | "collection.explore"
  | "collection.exit"
  | "collection.logOut"
  | "collection.filters"
  | "collection.filterAll"
  | "collection.filterBooklets"
  | "collection.filterEssays"
  | "collection.filterGuides"
  | "collection.emptyFilter"
  | "collection.missing"
  | "collection.missingObject"
  | "collection.personalCopy"
  | "collection.copy"
  | "collection.acquired"
  | "collection.version"
  | "access.kicker"
  | "access.title"
  | "access.lead"
  | "access.email"
  | "access.emailInvalid"
  | "access.send"
  | "access.checkTitle"
  | "access.checkLead"
  | "access.checkHint"
  | "access.expire"
  | "access.openLink"
  | "access.sendAgain"
  | "access.close"
  | "access.working"
  | "access.badLink"
  | "access.ready"
  | "object"
  | "pages"
  | "get"
  | "read"
  | "acquire.title"
  | "acquire.note"
  | "access.google"
  | "access.googleLead"
  | "access.rateLimited"
  | "access.sendFailed"
  | "subtitle.009"
  | "banner.009"
  | "kind.essay"
  | "kind.booklet"
  | "kind.guide"
  | "kind.banner"
  | "intro.label"
  | "intro.title"
  | "intro.body"
  | "intro.since"
  | "home.kicker"
  | "home.title"
  | "home.body"
  | "home.doors"
  | "home.life.label"
  | "home.life.body"
  | "home.life.learn"
  | "home.life.enter"
  | "home.papers.label"
  | "home.papers.body"
  | "home.papers.open"
  | "themes"
  | "references"
  | "theme.time"
  | "theme.memory"
  | "theme.choice"
  | "theme.self"
  | "ref.augustine"
  | "ref.seneca"
  | "collection.owner"
  | "collection.notYet"
  | "collection.seeInGallery"
  | "seeMore"
  | "releases"
  | "objects"
  | "editions"
  | "edition.readColour"
  | "edition.readBw"
  | "edition.folding"
  | "edition.languages"
  | "edition.references"
  | "edition.note"
  | "manifestations"
  | "manifestations.papers"
  | "manifestations.vekon"
  | "manifestations.pdfBooklet"
  | "manifestations.bannerCosmetic"
  | "manifestations.purchaseNote"
  | "manifestations.related"
  | "manifestations.alsoInVekon"
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
  "acquire.title": "Acquired",
  "acquire.note": "Now in your Collection.",
  "access.google": "Continue with Google",
  "access.googleLead": "Sign in with Google to keep your objects in one place, here and in Vekon Life.",
  "access.rateLimited": "Too many links requested. Please wait a few minutes and try again.",
  "access.sendFailed": "The link couldn't be sent. Please try again.",
  "subtitle.009": "WHAT REMAINS OF THE JOURNEY",
  "banner.009": "Pasture banner",
  "kind.essay": "Essay",
  "kind.booklet": "Booklet",
  "kind.guide": "Guide",
  "kind.banner": "Banner",
  "intro.label": "About · Vekon: Papers",
  "intro.title": "Short texts, kept as objects.",
  "intro.body": "A life is made of hours, and most of them pass without leaving a mark. Vekon exists for the ones that do. In Vekon Life you keep your days: a diary for what happened and what stayed. In Papers, we keep ours: short texts, guides and articles, each one numbered as an object, to read on a screen or print and fold by hand. Made for you to look at your own time from somewhere else.",
  "intro.since": "Since 2026",
  "home.kicker": "About",
  "home.title": "Vekon",
  "home.body": "Vekon is an independent studio that makes tools and publications about time and memory. It brings together two projects with the same idea: paying more attention to the hours we live.",
  "home.doors": "Two doors",
  "home.life.label": "Diary",
  "home.life.body": "Write the day, track habits, mark places, and see your records turn into patterns over time.",
  "home.life.learn": "Learn more",
  "home.life.enter": "Sign in",
  "home.papers.label": "Publisher",
  "home.papers.body": "Short texts, guides and articles, each kept as a numbered object, to read on a screen or print and fold by hand.",
  "home.papers.open": "Open Papers",
  "themes": "Themes",
  "references": "References",
  "theme.time": "Time",
  "theme.memory": "Memory",
  "theme.choice": "Choice",
  "theme.self": "The self",
  "ref.augustine": "Augustine, Confessions XI",
  "ref.seneca": "Seneca, On the Shortness of Life",
  "collection.owner": "Owner",
  "collection.notYet": "Not with you yet · {n}",
  "collection.seeInGallery": "See in Gallery →",
  view: "View:",
  gallery: "Gallery",
  collection: "Collection",
  logIn: "Log in",
  "collection.kicker": "YOUR OBJECTS",
  "collection.yours": "YOUR COLLECTION",
  "collection.owned": "OWNED",
  "collection.locked": "LOCKED",
  "collection.ownedMeta": "{count} in your collection",
  "collection.lockedMeta": "Identification required",
  "collection.objectCount": "{count} OBJECTS",
  "collection.yoursCount": "YOUR COLLECTION: {count} OBJECTS",
  "collection.yourObjects": "YOUR OBJECTS",
  "collection.extras": "COLLECTED EXTRAS",
  "collection.banner": "BANNER",
  "collection.download": "DOWNLOAD ↓",
  "collection.explore": "EXPLORE ARCHIVE →",
  "collection.exit": "EXIT",
  "collection.logOut": "Log out",
  "collection.filters": "Filter collection",
  "collection.filterAll": "ALL",
  "collection.filterBooklets": "BOOKLETS",
  "collection.filterEssays": "ESSAYS",
  "collection.filterGuides": "FIELD GUIDES",
  "collection.emptyFilter": "Nothing in this drawer yet.",
  "collection.missing": "MISSING",
  "collection.missingObject": "Missing object {number}: {title} — open in Gallery",
  "collection.personalCopy": "PERSONAL COPY",
  "collection.copy": "COPY",
  "collection.acquired": "ACQUIRED",
  "collection.version": "VERSION",
  "access.kicker": "ACCESS / COLLECTION",
  "access.title": "Access your collection",
  "access.lead": "Enter the email used to collect your objects.",
  "access.email": "EMAIL",
  "access.emailInvalid": "Enter a valid email.",
  "access.send": "Send link →",
  "access.checkTitle": "Check your email",
  "access.checkLead": "We sent an access link to {email}",
  "access.checkHint": "Open it to access your collection.",
  "access.expire": "The link expires in 15 minutes.",
  "access.openLink": "Open the access link →",
  "access.sendAgain": "Send again",
  "access.close": "Close",
  "access.working": "Confirming access…",
  "access.badLink": "This access link is invalid or expired.",
  "access.ready": "Identification required",
  object: "Object",
  pages: "PAGES",
  get: "Get →",
  read: "Read →",
  seeMore: "See more →",
  releases: "Releases",
  objects: "objects",
  editions: "Editions",
  "edition.readColour": "PDF · colour",
  "edition.readBw": "PDF · black and white",
  "edition.folding": "Folding guide",
  "edition.languages": "Languages",
  "edition.references": "References marked",
  "edition.note":
    "PDF in multiple languages, with sources clearly marked. Read on screen or print. The Vekon cosmetic is sold separately. For personal use, please don't resell.",
  manifestations: "Manifestations",
  "manifestations.papers": "Papers",
  "manifestations.vekon": "Vekon",
  "manifestations.pdfBooklet": "PDF booklet",
  "manifestations.bannerCosmetic": "Cosmetic",
  "manifestations.purchaseNote":
    "Purchase here includes the Papers edition only. The banner is available separately in Vekon.",
  "manifestations.related": "Related manifestation",
  "manifestations.alsoInVekon": "Also exists in Vekon",
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
    "A life lasts about eighty years, but we only start remembering it around seven. This manifesto does that arithmetic and asks what to do with the time that is left. Two sheets, a single ink, and the text where Vekon began.",
};

const pt: Dictionary = {
  ...en,
  "acquire.title": "Adquirido",
  "acquire.note": "Agora na sua Coleção.",
  "access.google": "Continuar com Google",
  "access.googleLead": "Entre com o Google para guardar seus objetos num só lugar, aqui e no Vekon Life.",
  "access.rateLimited": "Muitos links pedidos. Espere alguns minutos e tente de novo.",
  "access.sendFailed": "Não foi possível enviar o link. Tente de novo.",
  "subtitle.009": "O QUE FICA DA JORNADA",
  "banner.009": "Banner do pasto",
  "kind.essay": "Ensaio",
  "kind.booklet": "Livreto",
  "kind.guide": "Guia",
  "kind.banner": "Banner",
  "intro.label": "Sobre · Vekon: Papers",
  "intro.title": "Textos curtos, guardados como objetos.",
  "intro.body": "Uma vida é feita de horas, e a maioria passa sem deixar marca. O Vekon existe para as que deixam. No Vekon Life você guarda os seus dias: um diário para o que aconteceu e o que ficou. No Papers, nós guardamos os nossos: textos curtos, guias e artigos, cada um numerado como objeto, para ler na tela ou imprimir e dobrar à mão. Feitos para você olhar o seu próprio tempo de outro lugar.",
  "intro.since": "Desde 2026",
  "home.kicker": "Sobre",
  "home.title": "Vekon",
  "home.body": "Vekon é um estúdio independente que faz ferramentas e publicações sobre tempo e memória. Reúne dois projetos com a mesma ideia: dar mais atenção às horas que vivemos.",
  "home.doors": "Duas portas",
  "home.life.label": "Diário",
  "home.life.body": "Escreva o dia, acompanhe hábitos, marque lugares e veja seus registros virarem padrões com o tempo.",
  "home.life.learn": "Conhecer",
  "home.life.enter": "Entrar",
  "home.papers.label": "Editora",
  "home.papers.body": "Textos curtos, guias e artigos, cada um guardado como objeto numerado, para ler na tela ou imprimir e dobrar à mão.",
  "home.papers.open": "Abrir o Papers",
  "themes": "Temas",
  "references": "Referências",
  "theme.time": "Tempo",
  "theme.memory": "Memória",
  "theme.choice": "Escolha",
  "theme.self": "O eu",
  "ref.augustine": "Agostinho, Confissões XI",
  "ref.seneca": "Sêneca, Sobre a brevidade da vida",
  "collection.owner": "Dono",
  "collection.notYet": "Ainda não estão com você · {n}",
  "collection.seeInGallery": "Ver na Galeria →",
  view: "Vista:",
  gallery: "Galeria",
  collection: "Coleção",
  logIn: "Entrar",
  "collection.kicker": "SEUS OBJETOS",
  "collection.yours": "SUA COLEÇÃO",
  "collection.owned": "SEU",
  "collection.locked": "BLOQUEADO",
  "collection.ownedMeta": "{count} na sua coleção",
  "collection.lockedMeta": "Identificação necessária",
  "collection.objectCount": "{count} OBJETOS",
  "collection.yoursCount": "SUA COLEÇÃO: {count} OBJETOS",
  "collection.yourObjects": "SEUS OBJETOS",
  "collection.extras": "EXTRAS COLETADOS",
  "collection.banner": "BANNER",
  "collection.download": "BAIXAR ↓",
  "collection.explore": "EXPLORAR ARQUIVO →",
  "collection.exit": "SAIR",
  "collection.logOut": "Sair",
  "collection.filters": "Filtrar coleção",
  "collection.filterAll": "TUDO",
  "collection.filterBooklets": "LIVRETOS",
  "collection.filterEssays": "ENSAIOS",
  "collection.filterGuides": "GUIAS DE CAMPO",
  "collection.emptyFilter": "Nada nesta gaveta ainda.",
  "collection.missing": "FALTA",
  "collection.missingObject": "Objeto ausente {number}: {title}, abrir na Galeria",
  "collection.personalCopy": "EXEMPLAR",
  "collection.copy": "CÓPIA",
  "collection.acquired": "ADQUIRIDO",
  "collection.version": "VERSÃO",
  "access.kicker": "ACESSO / COLEÇÃO",
  "access.title": "Acesse sua coleção",
  "access.lead": "Digite o email usado para coletar seus objetos.",
  "access.email": "EMAIL",
  "access.emailInvalid": "Digite um email válido.",
  "access.send": "Enviar link →",
  "access.checkTitle": "Confira seu email",
  "access.checkLead": "Enviamos um link de acesso para {email}",
  "access.checkHint": "Abra-o para acessar sua coleção.",
  "access.expire": "O link expira em 15 minutos.",
  "access.openLink": "Abrir o link de acesso →",
  "access.sendAgain": "Enviar de novo",
  "access.close": "Fechar",
  "access.working": "Confirmando acesso…",
  "access.badLink": "Este link de acesso é inválido ou expirou.",
  "access.ready": "Identificação necessária",
  object: "Objeto",
  pages: "PÁGINAS",
  get: "Pegar →",
  read: "Ler →",
  seeMore: "Ver mais →",
  releases: "Lançamentos",
  objects: "objetos",
  editions: "Edições",
  "edition.readColour": "PDF · cor",
  "edition.readBw": "PDF · preto e branco",
  "edition.folding": "Guia de dobra",
  "edition.languages": "Idiomas",
  "edition.references": "Referências indicadas",
  "edition.note":
    "PDF em vários idiomas, com as fontes bem marcadas. Leia na tela ou imprima. O cosmético do Vekon é vendido à parte. Para uso pessoal, por favor não revenda.",
  manifestations: "Manifestações",
  "manifestations.papers": "Papers",
  "manifestations.vekon": "Vekon",
  "manifestations.pdfBooklet": "Livreto em PDF",
  "manifestations.bannerCosmetic": "Cosmético",
  "manifestations.purchaseNote":
    "A compra no site inclui apenas o PDF. O banner está disponível separadamente no Vekon.",
  "manifestations.related": "Manifestação relacionada",
  "manifestations.alsoInVekon": "Também existe no Vekon",
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
    "Uma vida dura perto de oitenta anos, mas só começamos a lembrá-la por volta dos sete. Este manifesto faz essa conta e pergunta o que fazer com o tempo que resta. Duas folhas, uma tinta só, e o texto em que o Vekon começou.",
};

const es: Dictionary = {
  ...en,
  "acquire.title": "Adquirido",
  "acquire.note": "Ahora en tu colección.",
  "access.google": "Continuar con Google",
  "access.googleLead": "Entra con Google para guardar tus objetos en un solo lugar, aquí y en Vekon Life.",
  "access.rateLimited": "Demasiados enlaces solicitados. Espera unos minutos y vuelve a intentarlo.",
  "access.sendFailed": "No se pudo enviar el enlace. Inténtalo de nuevo.",
  "access.badLink": "Este enlace de acceso no es válido o ha caducado.",
  "access.checkHint": "Ábrelo para acceder a tu colección.",
  "access.checkLead": "Enviamos un enlace de acceso a {email}",
  "access.checkTitle": "Revisa tu correo",
  "access.close": "Cerrar",
  "access.email": "CORREO",
  "access.emailInvalid": "Escribe un correo válido.",
  "access.expire": "El enlace caduca en 15 minutos.",
  "access.kicker": "ACCESO / COLECCIÓN",
  "access.lead": "Escribe el correo con el que reuniste tus objetos.",
  "access.openLink": "Abrir el enlace de acceso →",
  "access.ready": "Identificación necesaria",
  "access.send": "Enviar enlace →",
  "access.sendAgain": "Enviar de nuevo",
  "access.title": "Accede a tu colección",
  "access.working": "Confirmando acceso…",
  "collection.acquired": "ADQUIRIDO",
  "collection.copy": "COPIA",
  "collection.download": "DESCARGAR ↓",
  "collection.emptyFilter": "Todavía no hay nada en este cajón.",
  "collection.exit": "SALIR",
  "collection.explore": "EXPLORAR EL ARCHIVO →",
  "collection.extras": "EXTRAS REUNIDOS",
  "collection.filterAll": "TODO",
  "collection.filterBooklets": "CUADERNILLOS",
  "collection.filterEssays": "ENSAYOS",
  "collection.filterGuides": "GUÍAS DE CAMPO",
  "collection.filters": "Filtrar colección",
  "collection.kicker": "TUS OBJETOS",
  "collection.locked": "BLOQUEADO",
  "collection.lockedMeta": "Identificación necesaria",
  "collection.logOut": "Cerrar sesión",
  "collection.missing": "FALTA",
  "collection.missingObject": "Objeto ausente {number}: {title}, abrir en la galería",
  "collection.objectCount": "{count} OBJETOS",
  "collection.owned": "TUYO",
  "collection.ownedMeta": "{count} en tu colección",
  "collection.personalCopy": "EJEMPLAR",
  "collection.version": "VERSIÓN",
  "collection.yourObjects": "TUS OBJETOS",
  "collection.yours": "TU COLECCIÓN",
  "collection.yoursCount": "TU COLECCIÓN: {count} OBJETOS",
  "subtitle.009": "LO QUE QUEDA DEL VIAJE",
  "banner.009": "Banner del prado",
  "kind.essay": "Ensayo",
  "kind.booklet": "Cuadernillo",
  "kind.guide": "Guía",
  "kind.banner": "Banner",
  "intro.label": "Acerca de · Vekon: Papers",
  "intro.title": "Textos breves, guardados como objetos.",
  "intro.body": "Una vida está hecha de horas, y la mayoría pasa sin dejar huella. Vekon existe para las que sí la dejan. En Vekon Life guardas tus días: un diario para lo que pasó y lo que se quedó. En Papers guardamos los nuestros: textos breves, guías y artículos, cada uno numerado como un objeto, para leer en pantalla o imprimir y doblar a mano. Hechos para que mires tu propio tiempo desde otro lugar.",
  "intro.since": "Desde 2026",
  "home.kicker": "Acerca de",
  "home.title": "Vekon",
  "home.body": "Vekon es un estudio independiente que hace herramientas y publicaciones sobre el tiempo y la memoria. Reúne dos proyectos con la misma idea: prestar más atención a las horas que vivimos.",
  "home.doors": "Dos puertas",
  "home.life.label": "Diario",
  "home.life.body": "Escribe el día, sigue tus hábitos, marca lugares y mira cómo tus registros se vuelven patrones con el tiempo.",
  "home.life.learn": "Conocer",
  "home.life.enter": "Entrar",
  "home.papers.label": "Editorial",
  "home.papers.body": "Textos breves, guías y artículos, cada uno guardado como un objeto numerado, para leer en pantalla o imprimir y doblar a mano.",
  "home.papers.open": "Abrir Papers",
  "themes": "Temas",
  "references": "Referencias",
  "theme.time": "Tiempo",
  "theme.memory": "Memoria",
  "theme.choice": "Elección",
  "theme.self": "El yo",
  "ref.augustine": "Agustín, Confesiones XI",
  "ref.seneca": "Séneca, Sobre la brevedad de la vida",
  "collection.owner": "Propietario",
  "collection.notYet": "Aún no están contigo · {n}",
  "collection.seeInGallery": "Ver en la galería →",
  view: "Vista:",
  gallery: "Galería",
  collection: "Colección",
  logIn: "Entrar",
  object: "Objeto",
  pages: "PÁGINAS",
  get: "Obtener →",
  read: "Leer →",
  seeMore: "Ver más →",
  releases: "Lanzamientos",
  objects: "objetos",
  editions: "Ediciones",
  "edition.readColour": "PDF · color",
  "edition.readBw": "PDF · blanco y negro",
  "edition.folding": "Guía de plegado",
  "edition.languages": "Idiomas",
  "edition.references": "Referencias marcadas",
  "edition.note":
    "PDF en varios idiomas, con las fuentes bien señaladas. Léelo en pantalla o imprímelo. El cosmético de Vekon se vende por separado. Para uso personal, por favor no lo revendas.",
  manifestations: "Manifestaciones",
  "manifestations.papers": "Papers",
  "manifestations.vekon": "Vekon",
  "manifestations.pdfBooklet": "Cuadernillo PDF",
  "manifestations.bannerCosmetic": "Cosmético",
  "manifestations.purchaseNote":
    "La compra aquí incluye solo la edición de Papers. El banner está disponible por separado en Vekon.",
  "manifestations.related": "Manifestación relacionada",
  "manifestations.alsoInVekon": "También existe en Vekon",
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
    "Una vida dura cerca de ochenta años, pero solo empezamos a recordarla hacia los siete. Este manifiesto hace esa cuenta y pregunta qué hacer con el tiempo que queda. Dos hojas, una sola tinta, y el texto en el que empezó Vekon.",
};

const de: Dictionary = {
  ...en,
  "acquire.title": "Erworben",
  "acquire.note": "Jetzt in deiner Sammlung.",
  "access.google": "Mit Google fortfahren",
  "access.googleLead": "Melde dich mit Google an, um deine Objekte an einem Ort zu behalten, hier und in Vekon Life.",
  "access.rateLimited": "Zu viele Links angefordert. Warte ein paar Minuten und versuche es erneut.",
  "access.sendFailed": "Der Link konnte nicht gesendet werden. Bitte versuche es erneut.",
  "access.badLink": "Dieser Zugangslink ist ungültig oder abgelaufen.",
  "access.checkHint": "Öffne ihn, um auf deine Sammlung zuzugreifen.",
  "access.checkLead": "Wir haben einen Zugangslink an {email} gesendet",
  "access.checkTitle": "Sieh in dein Postfach",
  "access.close": "Schließen",
  "access.email": "E-MAIL",
  "access.emailInvalid": "Gib eine gültige E-Mail-Adresse ein.",
  "access.expire": "Der Link läuft in 15 Minuten ab.",
  "access.kicker": "ZUGANG / SAMMLUNG",
  "access.lead": "Gib die E-Mail-Adresse ein, mit der du deine Objekte gesammelt hast.",
  "access.openLink": "Zugangslink öffnen →",
  "access.ready": "Anmeldung erforderlich",
  "access.send": "Link senden →",
  "access.sendAgain": "Erneut senden",
  "access.title": "Zugang zu deiner Sammlung",
  "access.working": "Zugang wird bestätigt…",
  "collection.acquired": "ERWORBEN",
  "collection.copy": "EXEMPLAR",
  "collection.download": "HERUNTERLADEN ↓",
  "collection.emptyFilter": "In dieser Schublade liegt noch nichts.",
  "collection.exit": "VERLASSEN",
  "collection.explore": "ARCHIV ERKUNDEN →",
  "collection.extras": "GESAMMELTE EXTRAS",
  "collection.filterAll": "ALLE",
  "collection.filterBooklets": "HEFTE",
  "collection.filterEssays": "ESSAYS",
  "collection.filterGuides": "FELDFÜHRER",
  "collection.filters": "Sammlung filtern",
  "collection.kicker": "DEINE OBJEKTE",
  "collection.locked": "GESPERRT",
  "collection.lockedMeta": "Anmeldung erforderlich",
  "collection.logOut": "Abmelden",
  "collection.missing": "FEHLT",
  "collection.missingObject": "Fehlendes Objekt {number}: {title}, in der Galerie öffnen",
  "collection.objectCount": "{count} OBJEKTE",
  "collection.owned": "DEINS",
  "collection.ownedMeta": "{count} in deiner Sammlung",
  "collection.personalCopy": "PERSÖNLICHES EXEMPLAR",
  "collection.version": "VERSION",
  "collection.yourObjects": "DEINE OBJEKTE",
  "collection.yours": "DEINE SAMMLUNG",
  "collection.yoursCount": "DEINE SAMMLUNG: {count} OBJEKTE",
  "subtitle.009": "WAS VON DER REISE BLEIBT",
  "banner.009": "Weide-Banner",
  "kind.essay": "Essay",
  "kind.booklet": "Heft",
  "kind.guide": "Leitfaden",
  "kind.banner": "Banner",
  "intro.label": "Über · Vekon: Papers",
  "intro.title": "Kurze Texte, aufbewahrt als Objekte.",
  "intro.body": "Ein Leben besteht aus Stunden, und die meisten vergehen, ohne eine Spur zu hinterlassen. Vekon gibt es für die anderen. In Vekon Life bewahrst du deine Tage auf: ein Tagebuch für das, was geschah, und das, was blieb. In Papers bewahren wir unsere auf: kurze Texte, Leitfäden und Artikel, jeder als Objekt nummeriert, zum Lesen am Bildschirm oder zum Ausdrucken und Falten von Hand. Gemacht, damit du deine eigene Zeit von einem anderen Ort aus betrachtest.",
  "intro.since": "Seit 2026",
  "home.kicker": "Über",
  "home.title": "Vekon",
  "home.body": "Vekon ist ein unabhängiges Studio, das Werkzeuge und Publikationen über Zeit und Erinnerung macht. Es vereint zwei Projekte mit derselben Idee: den Stunden, die wir leben, mehr Aufmerksamkeit zu schenken.",
  "home.doors": "Zwei Türen",
  "home.life.label": "Tagebuch",
  "home.life.body": "Schreib den Tag auf, verfolge Gewohnheiten, markiere Orte und sieh zu, wie deine Einträge mit der Zeit zu Mustern werden.",
  "home.life.learn": "Mehr erfahren",
  "home.life.enter": "Anmelden",
  "home.papers.label": "Verlag",
  "home.papers.body": "Kurze Texte, Leitfäden und Artikel, jeder als nummeriertes Objekt aufbewahrt, zum Lesen am Bildschirm oder zum Ausdrucken und Falten von Hand.",
  "home.papers.open": "Papers öffnen",
  "themes": "Themen",
  "references": "Referenzen",
  "theme.time": "Zeit",
  "theme.memory": "Erinnerung",
  "theme.choice": "Entscheidung",
  "theme.self": "Das Selbst",
  "ref.augustine": "Augustinus, Bekenntnisse XI",
  "ref.seneca": "Seneca, Von der Kürze des Lebens",
  "collection.owner": "Besitzer",
  "collection.notYet": "Noch nicht bei dir · {n}",
  "collection.seeInGallery": "In der Galerie ansehen →",
  view: "Ansicht:",
  gallery: "Galerie",
  collection: "Sammlung",
  logIn: "Anmelden",
  object: "Objekt",
  pages: "SEITEN",
  get: "Holen →",
  read: "Lesen →",
  seeMore: "Mehr →",
  releases: "Neuerscheinungen",
  objects: "Objekte",
  editions: "Ausgaben",
  "edition.readColour": "PDF · Farbe",
  "edition.readBw": "PDF · Schwarzweiß",
  "edition.folding": "Faltanleitung",
  "edition.languages": "Sprachen",
  "edition.references": "Quellen markiert",
  "edition.note":
    "PDF in mehreren Sprachen, mit klar gekennzeichneten Quellen. Am Bildschirm lesen oder ausdrucken. Das Vekon-Kosmetikobjekt wird separat verkauft. Nur für den persönlichen Gebrauch, bitte nicht weiterverkaufen.",
  manifestations: "Erscheinungsformen",
  "manifestations.papers": "Papers",
  "manifestations.vekon": "Vekon",
  "manifestations.pdfBooklet": "PDF-Heft",
  "manifestations.bannerCosmetic": "Kosmetisch",
  "manifestations.purchaseNote":
    "Der Kauf hier umfasst nur die Papers-Ausgabe. Das Banner gibt es separat in Vekon.",
  "manifestations.related": "Verwandte Erscheinungsform",
  "manifestations.alsoInVekon": "Gibt es auch in Vekon",
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
    "Ein Leben dauert etwa achtzig Jahre, doch erinnern können wir uns erst ab etwa sieben. Dieses Manifest macht diese Rechnung auf und fragt, was wir mit der verbleibenden Zeit anfangen. Zwei Blätter, eine einzige Farbe und der Text, mit dem Vekon begann.",
};

const fr: Dictionary = {
  ...en,
  "acquire.title": "Acquis",
  "acquire.note": "Désormais dans votre collection.",
  "access.google": "Continuer avec Google",
  "access.googleLead": "Connectez-vous avec Google pour garder vos objets au même endroit, ici et dans Vekon Life.",
  "access.rateLimited": "Trop de liens demandés. Attendez quelques minutes et réessayez.",
  "access.sendFailed": "Le lien n'a pas pu être envoyé. Réessayez.",
  "access.badLink": "Ce lien d'accès est invalide ou a expiré.",
  "access.checkHint": "Ouvrez-le pour accéder à votre collection.",
  "access.checkLead": "Nous avons envoyé un lien d'accès à {email}",
  "access.checkTitle": "Consultez vos e-mails",
  "access.close": "Fermer",
  "access.email": "E-MAIL",
  "access.emailInvalid": "Saisissez une adresse e-mail valide.",
  "access.expire": "Le lien expire dans 15 minutes.",
  "access.kicker": "ACCÈS / COLLECTION",
  "access.lead": "Saisissez l'e-mail utilisé pour collectionner vos objets.",
  "access.openLink": "Ouvrir le lien d'accès →",
  "access.ready": "Identification requise",
  "access.send": "Envoyer le lien →",
  "access.sendAgain": "Renvoyer",
  "access.title": "Accédez à votre collection",
  "access.working": "Confirmation de l'accès…",
  "collection.acquired": "ACQUIS",
  "collection.copy": "EXEMPLAIRE",
  "collection.download": "TÉLÉCHARGER ↓",
  "collection.emptyFilter": "Rien dans ce tiroir pour l'instant.",
  "collection.exit": "QUITTER",
  "collection.explore": "EXPLORER L'ARCHIVE →",
  "collection.extras": "EXTRAS COLLECTÉS",
  "collection.filterAll": "TOUT",
  "collection.filterBooklets": "LIVRETS",
  "collection.filterEssays": "ESSAIS",
  "collection.filterGuides": "GUIDES DE TERRAIN",
  "collection.filters": "Filtrer la collection",
  "collection.kicker": "VOS OBJETS",
  "collection.locked": "VERROUILLÉ",
  "collection.lockedMeta": "Identification requise",
  "collection.logOut": "Se déconnecter",
  "collection.missing": "MANQUANT",
  "collection.missingObject": "Objet manquant {number} : {title}, ouvrir dans la galerie",
  "collection.objectCount": "{count} OBJETS",
  "collection.owned": "À VOUS",
  "collection.ownedMeta": "{count} dans votre collection",
  "collection.personalCopy": "EXEMPLAIRE PERSONNEL",
  "collection.version": "VERSION",
  "collection.yourObjects": "VOS OBJETS",
  "collection.yours": "VOTRE COLLECTION",
  "collection.yoursCount": "VOTRE COLLECTION : {count} OBJETS",
  "subtitle.009": "CE QUI RESTE DU VOYAGE",
  "banner.009": "Bannière pâturage",
  "kind.essay": "Essai",
  "kind.booklet": "Livret",
  "kind.guide": "Guide",
  "kind.banner": "Bannière",
  "intro.label": "À propos · Vekon: Papers",
  "intro.title": "Des textes courts, gardés comme des objets.",
  "intro.body": "Une vie est faite d'heures, et la plupart passent sans laisser de trace. Vekon existe pour celles qui en laissent une. Dans Vekon Life, vous gardez vos jours : un journal pour ce qui s'est passé et ce qui est resté. Dans Papers, nous gardons les nôtres : des textes courts, des guides et des articles, chacun numéroté comme un objet, à lire à l'écran ou à imprimer et plier à la main. Faits pour regarder votre propre temps depuis un autre endroit.",
  "intro.since": "Depuis 2026",
  "home.kicker": "À propos",
  "home.title": "Vekon",
  "home.body": "Vekon est un studio indépendant qui crée des outils et des publications sur le temps et la mémoire. Il réunit deux projets portés par la même idée : prêter plus d'attention aux heures que nous vivons.",
  "home.doors": "Deux portes",
  "home.life.label": "Journal",
  "home.life.body": "Écrivez la journée, suivez vos habitudes, marquez des lieux et voyez vos notes devenir des motifs avec le temps.",
  "home.life.learn": "Découvrir",
  "home.life.enter": "Se connecter",
  "home.papers.label": "Éditeur",
  "home.papers.body": "Des textes courts, des guides et des articles, chacun gardé comme un objet numéroté, à lire à l'écran ou à imprimer et plier à la main.",
  "home.papers.open": "Ouvrir Papers",
  "themes": "Thèmes",
  "references": "Références",
  "theme.time": "Temps",
  "theme.memory": "Mémoire",
  "theme.choice": "Choix",
  "theme.self": "Le soi",
  "ref.augustine": "Augustin, Les Confessions XI",
  "ref.seneca": "Sénèque, De la brièveté de la vie",
  "collection.owner": "Propriétaire",
  "collection.notYet": "Pas encore avec vous · {n}",
  "collection.seeInGallery": "Voir dans la galerie →",
  view: "Vue:",
  gallery: "Galerie",
  collection: "Collection",
  logIn: "Connexion",
  object: "Objet",
  pages: "PAGES",
  get: "Obtenir →",
  read: "Lire →",
  seeMore: "Voir plus →",
  releases: "Parutions",
  objects: "objets",
  editions: "Éditions",
  "edition.readColour": "PDF · couleur",
  "edition.readBw": "PDF · noir et blanc",
  "edition.folding": "Guide de pliage",
  "edition.languages": "Langues",
  "edition.references": "Références indiquées",
  "edition.note":
    "PDF en plusieurs langues, avec des sources clairement indiquées. À lire à l'écran ou à imprimer. Le cosmétique Vekon est vendu séparément. Pour un usage personnel, merci de ne pas revendre.",
  manifestations: "Manifestations",
  "manifestations.papers": "Papers",
  "manifestations.vekon": "Vekon",
  "manifestations.pdfBooklet": "Livret PDF",
  "manifestations.bannerCosmetic": "Cosmétique",
  "manifestations.purchaseNote":
    "L'achat ici comprend uniquement l'édition Papers. La bannière est disponible séparément dans Vekon.",
  "manifestations.related": "Manifestation associée",
  "manifestations.alsoInVekon": "Existe aussi dans Vekon",
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
    "Une vie dure environ quatre-vingts ans, mais on ne commence à s'en souvenir que vers sept ans. Ce manifeste fait ce calcul et demande quoi faire du temps qui reste. Deux feuilles, une seule encre, et le texte par lequel Vekon a commencé.",
};

const it: Dictionary = {
  ...en,
  "acquire.title": "Acquisito",
  "acquire.note": "Ora nella tua collezione.",
  "access.google": "Continua con Google",
  "access.googleLead": "Accedi con Google per tenere i tuoi oggetti in un unico posto, qui e in Vekon Life.",
  "access.rateLimited": "Troppi link richiesti. Attendi qualche minuto e riprova.",
  "access.sendFailed": "Impossibile inviare il link. Riprova.",
  "access.badLink": "Questo link di accesso non è valido o è scaduto.",
  "access.checkHint": "Aprilo per accedere alla tua collezione.",
  "access.checkLead": "Abbiamo inviato un link di accesso a {email}",
  "access.checkTitle": "Controlla la tua email",
  "access.close": "Chiudi",
  "access.email": "EMAIL",
  "access.emailInvalid": "Inserisci un'email valida.",
  "access.expire": "Il link scade tra 15 minuti.",
  "access.kicker": "ACCESSO / COLLEZIONE",
  "access.lead": "Inserisci l'email usata per collezionare i tuoi oggetti.",
  "access.openLink": "Apri il link di accesso →",
  "access.ready": "Identificazione richiesta",
  "access.send": "Invia link →",
  "access.sendAgain": "Invia di nuovo",
  "access.title": "Accedi alla tua collezione",
  "access.working": "Conferma dell'accesso…",
  "collection.acquired": "ACQUISITO",
  "collection.copy": "COPIA",
  "collection.download": "SCARICA ↓",
  "collection.emptyFilter": "Ancora niente in questo cassetto.",
  "collection.exit": "ESCI",
  "collection.explore": "ESPLORA L'ARCHIVIO →",
  "collection.extras": "EXTRA RACCOLTI",
  "collection.filterAll": "TUTTO",
  "collection.filterBooklets": "LIBRETTI",
  "collection.filterEssays": "SAGGI",
  "collection.filterGuides": "GUIDE DA CAMPO",
  "collection.filters": "Filtra la collezione",
  "collection.kicker": "I TUOI OGGETTI",
  "collection.locked": "BLOCCATO",
  "collection.lockedMeta": "Identificazione richiesta",
  "collection.logOut": "Esci",
  "collection.missing": "MANCANTE",
  "collection.missingObject": "Oggetto mancante {number}: {title}, apri nella galleria",
  "collection.objectCount": "{count} OGGETTI",
  "collection.owned": "TUO",
  "collection.ownedMeta": "{count} nella tua collezione",
  "collection.personalCopy": "COPIA PERSONALE",
  "collection.version": "VERSIONE",
  "collection.yourObjects": "I TUOI OGGETTI",
  "collection.yours": "LA TUA COLLEZIONE",
  "collection.yoursCount": "LA TUA COLLEZIONE: {count} OGGETTI",
  "subtitle.009": "CIÒ CHE RESTA DEL VIAGGIO",
  "banner.009": "Banner del pascolo",
  "kind.essay": "Saggio",
  "kind.booklet": "Libretto",
  "kind.guide": "Guida",
  "kind.banner": "Banner",
  "intro.label": "Info · Vekon: Papers",
  "intro.title": "Testi brevi, custoditi come oggetti.",
  "intro.body": "Una vita è fatta di ore, e la maggior parte passa senza lasciare traccia. Vekon esiste per quelle che la lasciano. In Vekon Life custodisci i tuoi giorni: un diario per ciò che è accaduto e ciò che è rimasto. In Papers custodiamo i nostri: testi brevi, guide e articoli, ognuno numerato come un oggetto, da leggere sullo schermo o da stampare e piegare a mano. Fatti per guardare il tuo tempo da un altro punto di vista.",
  "intro.since": "Dal 2026",
  "home.kicker": "Info",
  "home.title": "Vekon",
  "home.body": "Vekon è uno studio indipendente che crea strumenti e pubblicazioni sul tempo e sulla memoria. Riunisce due progetti con la stessa idea: dare più attenzione alle ore che viviamo.",
  "home.doors": "Due porte",
  "home.life.label": "Diario",
  "home.life.body": "Scrivi la giornata, segui le abitudini, segna i luoghi e guarda le tue annotazioni diventare schemi nel tempo.",
  "home.life.learn": "Scopri",
  "home.life.enter": "Accedi",
  "home.papers.label": "Editore",
  "home.papers.body": "Testi brevi, guide e articoli, ognuno custodito come un oggetto numerato, da leggere sullo schermo o da stampare e piegare a mano.",
  "home.papers.open": "Apri Papers",
  "themes": "Temi",
  "references": "Riferimenti",
  "theme.time": "Tempo",
  "theme.memory": "Memoria",
  "theme.choice": "Scelta",
  "theme.self": "Il sé",
  "ref.augustine": "Agostino, Confessioni XI",
  "ref.seneca": "Seneca, La brevità della vita",
  "collection.owner": "Proprietario",
  "collection.notYet": "Non ancora con te · {n}",
  "collection.seeInGallery": "Vedi nella galleria →",
  view: "Vista:",
  gallery: "Galleria",
  collection: "Collezione",
  logIn: "Accedi",
  object: "Oggetto",
  pages: "PAGINE",
  get: "Prendi →",
  read: "Leggi →",
  seeMore: "Vedi di più →",
  releases: "Uscite",
  objects: "oggetti",
  editions: "Edizioni",
  "edition.readColour": "PDF · colore",
  "edition.readBw": "PDF · bianco e nero",
  "edition.folding": "Guida al ripiego",
  "edition.languages": "Lingue",
  "edition.references": "Riferimenti indicati",
  "edition.note":
    "PDF in più lingue, con le fonti chiaramente indicate. Da leggere a schermo o da stampare. Il cosmetico Vekon è venduto separatamente. Per uso personale, si prega di non rivendere.",
  manifestations: "Manifestazioni",
  "manifestations.papers": "Papers",
  "manifestations.vekon": "Vekon",
  "manifestations.pdfBooklet": "Libretto PDF",
  "manifestations.bannerCosmetic": "Cosmetico",
  "manifestations.purchaseNote":
    "L'acquisto qui include solo l'edizione Papers. Il banner è disponibile separatamente in Vekon.",
  "manifestations.related": "Manifestazione correlata",
  "manifestations.alsoInVekon": "Esiste anche in Vekon",
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
    "Una vita dura circa ottant'anni, ma cominciamo a ricordarla solo verso i sette. Questo manifesto fa questo conto e chiede che cosa fare del tempo che resta. Due fogli, un solo inchiostro, e il testo da cui è nato Vekon.",
};

const ja: Dictionary = {
  ...en,
  "acquire.title": "入手",
  "acquire.note": "コレクションに追加されました。",
  "access.google": "Google で続ける",
  "access.googleLead": "Google でログインして、オブジェクトをここと Vekon Life でひとつにまとめましょう。",
  "access.rateLimited": "リンクのリクエストが多すぎます。数分待ってからもう一度お試しください。",
  "access.sendFailed": "リンクを送信できませんでした。もう一度お試しください。",
  "access.badLink": "このアクセスリンクは無効か、期限が切れています。",
  "access.checkHint": "開いてコレクションにアクセスしてください。",
  "access.checkLead": "{email} にアクセスリンクを送りました",
  "access.checkTitle": "メールを確認してください",
  "access.close": "閉じる",
  "access.email": "メール",
  "access.emailInvalid": "有効なメールアドレスを入力してください。",
  "access.expire": "リンクの有効期限は15分です。",
  "access.kicker": "アクセス / コレクション",
  "access.lead": "オブジェクトを集めたときのメールアドレスを入力してください。",
  "access.openLink": "アクセスリンクを開く →",
  "access.ready": "本人確認が必要です",
  "access.send": "リンクを送る →",
  "access.sendAgain": "もう一度送る",
  "access.title": "コレクションにアクセス",
  "access.working": "アクセスを確認中…",
  "collection.acquired": "取得日",
  "collection.copy": "コピー",
  "collection.download": "ダウンロード ↓",
  "collection.emptyFilter": "この引き出しにはまだ何もありません。",
  "collection.exit": "終了",
  "collection.explore": "アーカイブを見る →",
  "collection.extras": "集めたエクストラ",
  "collection.filterAll": "すべて",
  "collection.filterBooklets": "ブックレット",
  "collection.filterEssays": "エッセイ",
  "collection.filterGuides": "フィールドガイド",
  "collection.filters": "コレクションを絞り込む",
  "collection.kicker": "あなたのオブジェクト",
  "collection.locked": "ロック中",
  "collection.lockedMeta": "本人確認が必要です",
  "collection.logOut": "ログアウト",
  "collection.missing": "未所持",
  "collection.missingObject": "未所持のオブジェクト {number}：{title}（ギャラリーで開く）",
  "collection.objectCount": "{count} オブジェクト",
  "collection.owned": "所持",
  "collection.ownedMeta": "コレクションに {count}",
  "collection.personalCopy": "個人用コピー",
  "collection.version": "バージョン",
  "collection.yourObjects": "あなたのオブジェクト",
  "collection.yours": "あなたのコレクション",
  "collection.yoursCount": "あなたのコレクション：{count} オブジェクト",
  "subtitle.009": "旅に残るもの",
  "banner.009": "牧草地のバナー",
  "kind.essay": "エッセイ",
  "kind.booklet": "ブックレット",
  "kind.guide": "ガイド",
  "kind.banner": "バナー",
  "intro.label": "Vekon: Papers について",
  "intro.title": "短いテキストを、オブジェクトとして。",
  "intro.body": "人生は時間でできていて、そのほとんどは跡を残さずに過ぎていきます。Vekon は、跡を残す時間のためにあります。Vekon Life では、あなたが自分の日々をしまっておきます。起きたこと、残ったことのための日記です。Papers では、私たちが自分たちの日々をしまっておきます。短いテキスト、ガイド、記事を、ひとつずつ番号をつけたオブジェクトとして。画面で読むことも、印刷して手で折ることもできます。自分の時間を、別の場所から見つめるために。",
  "intro.since": "2026年から",
  "home.kicker": "について",
  "home.title": "Vekon",
  "home.body": "Vekon は、時間と記憶についての道具と出版物をつくるインディペンデントなスタジオです。ふたつのプロジェクトは同じ考えから生まれました。私たちが生きる時間に、もっと注意を向けること。",
  "home.doors": "ふたつの入口",
  "home.life.label": "日記",
  "home.life.body": "一日を書き、習慣を記録し、場所に印をつける。記録は時間とともにパターンになっていきます。",
  "home.life.learn": "詳しく見る",
  "home.life.enter": "ログイン",
  "home.papers.label": "出版",
  "home.papers.body": "短いテキスト、ガイド、記事。それぞれが番号付きのオブジェクトとして保管され、画面で読むことも、印刷して手で折ることもできる。",
  "home.papers.open": "Papers を開く",
  "themes": "テーマ",
  "references": "参照",
  "theme.time": "時間",
  "theme.memory": "記憶",
  "theme.choice": "選択",
  "theme.self": "自己",
  "ref.augustine": "アウグスティヌス『告白』第11巻",
  "ref.seneca": "セネカ『人生の短さについて』",
  "collection.owner": "オーナー",
  "collection.notYet": "まだ手元にないもの · {n}",
  "collection.seeInGallery": "ギャラリーで見る →",
  view: "表示:",
  gallery: "ギャラリー",
  collection: "コレクション",
  logIn: "ログイン",
  object: "オブジェクト",
  pages: "ページ",
  get: "入手 →",
  read: "読む →",
  seeMore: "もっと見る →",
  releases: "リリース",
  objects: "オブジェクト",
  editions: "エディション",
  "edition.readColour": "PDF · カラー",
  "edition.readBw": "PDF · 白黒",
  "edition.folding": "折り方ガイド",
  "edition.languages": "言語",
  "edition.references": "出典を明記",
  "edition.note":
    "複数言語の PDF、出典を明記。画面で読むことも、印刷することもできます。Vekon のコスメティックは別売りです。個人利用に限ります。転売はご遠慮ください。",
  manifestations: "展開",
  "manifestations.papers": "Papers",
  "manifestations.vekon": "Vekon",
  "manifestations.pdfBooklet": "PDFブックレット",
  "manifestations.bannerCosmetic": "コスメティック",
  "manifestations.purchaseNote":
    "ここでの購入は Papers 版のみです。バナーは Vekon で別途入手できます。",
  "manifestations.related": "関連する展開",
  "manifestations.alsoInVekon": "Vekon にもあります",
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
    "人生はおよそ八十年。けれど、私たちがそれを覚えはじめるのは七歳ごろからです。このマニフェストはその計算をして、残された時間をどう使うかを問いかけます。二枚の紙、一色のインク、そして Vekon がはじまった文章。",
};

const ko: Dictionary = {
  ...en,
  "acquire.title": "획득",
  "acquire.note": "컬렉션에 추가되었습니다.",
  "access.google": "Google로 계속하기",
  "access.googleLead": "Google로 로그인해 오브젝트를 이곳과 Vekon Life에서 한곳에 보관하세요.",
  "access.rateLimited": "링크 요청이 너무 많습니다. 몇 분 후 다시 시도하세요.",
  "access.sendFailed": "링크를 보낼 수 없습니다. 다시 시도하세요.",
  "access.badLink": "이 접속 링크는 유효하지 않거나 만료되었습니다.",
  "access.checkHint": "링크를 열어 컬렉션에 접속하세요.",
  "access.checkLead": "{email}(으)로 접속 링크를 보냈습니다",
  "access.checkTitle": "이메일을 확인하세요",
  "access.close": "닫기",
  "access.email": "이메일",
  "access.emailInvalid": "올바른 이메일을 입력하세요.",
  "access.expire": "링크는 15분 후 만료됩니다.",
  "access.kicker": "접속 / 컬렉션",
  "access.lead": "오브젝트를 모을 때 사용한 이메일을 입력하세요.",
  "access.openLink": "접속 링크 열기 →",
  "access.ready": "본인 확인이 필요합니다",
  "access.send": "링크 보내기 →",
  "access.sendAgain": "다시 보내기",
  "access.title": "컬렉션에 접속하기",
  "access.working": "접속 확인 중…",
  "collection.acquired": "획득",
  "collection.copy": "사본",
  "collection.download": "다운로드 ↓",
  "collection.emptyFilter": "이 서랍은 아직 비어 있습니다.",
  "collection.exit": "나가기",
  "collection.explore": "아카이브 둘러보기 →",
  "collection.extras": "모은 엑스트라",
  "collection.filterAll": "전체",
  "collection.filterBooklets": "소책자",
  "collection.filterEssays": "에세이",
  "collection.filterGuides": "필드 가이드",
  "collection.filters": "컬렉션 필터",
  "collection.kicker": "나의 오브젝트",
  "collection.locked": "잠김",
  "collection.lockedMeta": "본인 확인이 필요합니다",
  "collection.logOut": "로그아웃",
  "collection.missing": "없음",
  "collection.missingObject": "없는 오브젝트 {number}: {title}, 갤러리에서 열기",
  "collection.objectCount": "{count} 오브젝트",
  "collection.owned": "보유",
  "collection.ownedMeta": "컬렉션에 {count}",
  "collection.personalCopy": "개인 사본",
  "collection.version": "버전",
  "collection.yourObjects": "나의 오브젝트",
  "collection.yours": "나의 컬렉션",
  "collection.yoursCount": "나의 컬렉션: {count} 오브젝트",
  "subtitle.009": "여정에 남는 것",
  "banner.009": "목초지 배너",
  "kind.essay": "에세이",
  "kind.booklet": "소책자",
  "kind.guide": "가이드",
  "kind.banner": "배너",
  "intro.label": "소개 · Vekon: Papers",
  "intro.title": "짧은 글을, 오브젝트로 간직하다.",
  "intro.body": "삶은 시간으로 이루어지고, 그 대부분은 흔적 없이 지나갑니다. Vekon은 흔적을 남기는 시간을 위해 존재합니다. Vekon Life에서는 당신의 날들을 간직합니다. 일어난 일과 남은 것을 위한 일기입니다. Papers에서는 우리의 날들을 간직합니다. 짧은 글, 가이드, 아티클을 하나하나 번호를 붙인 오브젝트로. 화면으로 읽거나 인쇄해 손으로 접을 수 있습니다. 당신의 시간을 다른 곳에서 바라볼 수 있도록.",
  "intro.since": "2026년부터",
  "home.kicker": "소개",
  "home.title": "Vekon",
  "home.body": "Vekon은 시간과 기억에 관한 도구와 출판물을 만드는 독립 스튜디오입니다. 두 프로젝트는 같은 생각에서 출발합니다. 우리가 살아가는 시간에 더 많은 주의를 기울이는 것.",
  "home.doors": "두 개의 문",
  "home.life.label": "일기",
  "home.life.body": "하루를 쓰고, 습관을 기록하고, 장소를 표시하세요. 기록은 시간이 지나며 패턴이 됩니다.",
  "home.life.learn": "알아보기",
  "home.life.enter": "로그인",
  "home.papers.label": "출판",
  "home.papers.body": "짧은 글, 가이드, 아티클. 각각 번호가 매겨진 오브제로 보관되어, 화면으로 읽거나 인쇄해 손으로 접을 수 있다.",
  "home.papers.open": "Papers 열기",
  "themes": "테마",
  "references": "참고 문헌",
  "theme.time": "시간",
  "theme.memory": "기억",
  "theme.choice": "선택",
  "theme.self": "자아",
  "ref.augustine": "아우구스티누스, 『고백록』 11권",
  "ref.seneca": "세네카, 『인생의 짧음에 관하여』",
  "collection.owner": "소유자",
  "collection.notYet": "아직 없는 오브젝트 · {n}",
  "collection.seeInGallery": "갤러리에서 보기 →",
  view: "보기:",
  gallery: "갤러리",
  collection: "컬렉션",
  logIn: "로그인",
  object: "오브젝트",
  pages: "페이지",
  get: "받기 →",
  read: "읽기 →",
  seeMore: "더 보기 →",
  releases: "릴리스",
  objects: "오브젝트",
  editions: "에디션",
  "edition.readColour": "PDF · 컬러",
  "edition.readBw": "PDF · 흑백",
  "edition.folding": "접는 가이드",
  "edition.languages": "언어",
  "edition.references": "참고 표시",
  "edition.note":
    "여러 언어로 된 PDF, 출처를 명확히 표기했습니다. 화면으로 읽거나 인쇄하세요. Vekon 코스메틱은 별도로 판매됩니다. 개인 용도로만 사용하고 재판매하지 마세요.",
  manifestations: "구현 형태",
  "manifestations.papers": "Papers",
  "manifestations.vekon": "Vekon",
  "manifestations.pdfBooklet": "PDF 소책자",
  "manifestations.bannerCosmetic": "코스메틱",
  "manifestations.purchaseNote":
    "여기서의 구매에는 Papers 판만 포함됩니다. 배너는 Vekon에서 따로 구할 수 있습니다.",
  "manifestations.related": "관련 형태",
  "manifestations.alsoInVekon": "Vekon에도 있습니다",
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
    "삶은 대략 팔십 년이지만, 우리는 일곱 살 무렵부터에야 그것을 기억하기 시작합니다. 이 선언문은 그 계산을 해 보고, 남은 시간으로 무엇을 할지 묻습니다. 두 장의 종이, 한 가지 잉크, 그리고 Vekon이 시작된 글.",
};

const zhCN: Dictionary = {
  ...en,
  "acquire.title": "已获得",
  "acquire.note": "已加入你的收藏。",
  "access.google": "使用 Google 继续",
  "access.googleLead": "使用 Google 登录，把你的物件保存在同一个地方，这里和 Vekon Life 都可以用。",
  "access.rateLimited": "请求的链接过多。请等几分钟再试。",
  "access.sendFailed": "无法发送链接，请重试。",
  "access.badLink": "此访问链接无效或已过期。",
  "access.checkHint": "打开它即可访问你的收藏。",
  "access.checkLead": "我们已向 {email} 发送访问链接",
  "access.checkTitle": "请查看你的邮箱",
  "access.close": "关闭",
  "access.email": "邮箱",
  "access.emailInvalid": "请输入有效的邮箱。",
  "access.expire": "链接将在 15 分钟后失效。",
  "access.kicker": "访问 / 收藏",
  "access.lead": "输入你收集物件时使用的邮箱。",
  "access.openLink": "打开访问链接 →",
  "access.ready": "需要身份验证",
  "access.send": "发送链接 →",
  "access.sendAgain": "重新发送",
  "access.title": "访问你的收藏",
  "access.working": "正在确认访问…",
  "collection.acquired": "获得于",
  "collection.copy": "副本",
  "collection.download": "下载 ↓",
  "collection.emptyFilter": "这个抽屉里还什么都没有。",
  "collection.exit": "退出",
  "collection.explore": "浏览档案 →",
  "collection.extras": "收集的附加物",
  "collection.filterAll": "全部",
  "collection.filterBooklets": "小册子",
  "collection.filterEssays": "随笔",
  "collection.filterGuides": "田野指南",
  "collection.filters": "筛选收藏",
  "collection.kicker": "你的物件",
  "collection.locked": "已锁定",
  "collection.lockedMeta": "需要身份验证",
  "collection.logOut": "退出登录",
  "collection.missing": "缺少",
  "collection.missingObject": "缺少的物件 {number}：{title}，在画廊中打开",
  "collection.objectCount": "{count} 件物件",
  "collection.owned": "已拥有",
  "collection.ownedMeta": "收藏中有 {count}",
  "collection.personalCopy": "个人副本",
  "collection.version": "版本",
  "collection.yourObjects": "你的物件",
  "collection.yours": "你的收藏",
  "collection.yoursCount": "你的收藏：{count} 件物件",
  "subtitle.009": "旅程留下的",
  "banner.009": "牧场横幅",
  "kind.essay": "随笔",
  "kind.booklet": "小册子",
  "kind.guide": "指南",
  "kind.banner": "横幅",
  "intro.label": "关于 · Vekon: Papers",
  "intro.title": "短小的文字，作为物件保存。",
  "intro.body": "人生由时间组成，而大多数时间流逝时不留痕迹。Vekon 为那些留下痕迹的时间而存在。在 Vekon Life 里，你保存自己的日子：一本记录发生了什么、留下了什么的日记。在 Papers 里，我们保存我们的：短文、指南与文章，每一篇都编号成为物件，可以在屏幕上阅读，也可以打印后亲手折叠。让你从另一个地方看待自己的时间。",
  "intro.since": "始于 2026",
  "home.kicker": "关于",
  "home.title": "Vekon",
  "home.body": "Vekon 是一家独立工作室，制作关于时间与记忆的工具和出版物。它汇集了两个出于同一想法的项目：更加留意我们度过的每一个小时。",
  "home.doors": "两扇门",
  "home.life.label": "日记",
  "home.life.body": "写下这一天，追踪习惯，标记地点，看着你的记录随时间变成规律。",
  "home.life.learn": "了解更多",
  "home.life.enter": "登录",
  "home.papers.label": "出版",
  "home.papers.body": "短文、指南和文章，每一篇都作为编号的物件保存，可在屏幕上阅读，也可打印后亲手折叠。",
  "home.papers.open": "打开 Papers",
  "themes": "主题",
  "references": "参考",
  "theme.time": "时间",
  "theme.memory": "记忆",
  "theme.choice": "选择",
  "theme.self": "自我",
  "ref.augustine": "奥古斯丁《忏悔录》第十一卷",
  "ref.seneca": "塞涅卡《论生命之短暂》",
  "collection.owner": "所有者",
  "collection.notYet": "尚未拥有 · {n}",
  "collection.seeInGallery": "在画廊中查看 →",
  view: "视图:",
  gallery: "画廊",
  collection: "收藏",
  logIn: "登录",
  object: "物件",
  pages: "页",
  get: "获取 →",
  read: "阅读 →",
  seeMore: "查看更多 →",
  releases: "发行",
  objects: "物件",
  editions: "版本",
  "edition.readColour": "PDF · 彩色",
  "edition.readBw": "PDF · 黑白",
  "edition.folding": "折页指南",
  "edition.languages": "语言",
  "edition.references": "标明出处",
  "edition.note":
    "多语言 PDF，出处标注清晰。可在屏幕上阅读或打印。Vekon 装饰物品单独出售。仅供个人使用，请勿转售。",
  manifestations: "呈现形式",
  "manifestations.papers": "Papers",
  "manifestations.vekon": "Vekon",
  "manifestations.pdfBooklet": "PDF 小册子",
  "manifestations.bannerCosmetic": "装饰",
  "manifestations.purchaseNote":
    "此处购买仅包含 Papers 版本。横幅可在 Vekon 单独获取。",
  "manifestations.related": "相关形式",
  "manifestations.alsoInVekon": "也存在于 Vekon",
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
    "一生大约八十年，但我们大约从七岁才开始记得它。这份宣言算了这笔账，并追问该如何度过剩下的时间。两张纸，一种墨色，以及 Vekon 开始的那篇文字。",
};

const zhTW: Dictionary = {
  ...en,
  "acquire.title": "已取得",
  "acquire.note": "已加入你的收藏。",
  "access.google": "使用 Google 繼續",
  "access.googleLead": "使用 Google 登入，把你的物件保存在同一個地方，這裡和 Vekon Life 都能用。",
  "access.rateLimited": "請求的連結過多。請等幾分鐘再試。",
  "access.sendFailed": "無法寄送連結，請重試。",
  "access.badLink": "此存取連結無效或已過期。",
  "access.checkHint": "打開它即可存取你的收藏。",
  "access.checkLead": "我們已向 {email} 寄送存取連結",
  "access.checkTitle": "請查看你的信箱",
  "access.close": "關閉",
  "access.email": "電子郵件",
  "access.emailInvalid": "請輸入有效的電子郵件。",
  "access.expire": "連結將在 15 分鐘後失效。",
  "access.kicker": "存取 / 收藏",
  "access.lead": "輸入你收集物件時使用的電子郵件。",
  "access.openLink": "打開存取連結 →",
  "access.ready": "需要身分驗證",
  "access.send": "寄送連結 →",
  "access.sendAgain": "重新寄送",
  "access.title": "存取你的收藏",
  "access.working": "正在確認存取…",
  "collection.acquired": "取得於",
  "collection.copy": "副本",
  "collection.download": "下載 ↓",
  "collection.emptyFilter": "這個抽屜裡還什麼都沒有。",
  "collection.exit": "退出",
  "collection.explore": "瀏覽檔案 →",
  "collection.extras": "收集的附加物",
  "collection.filterAll": "全部",
  "collection.filterBooklets": "小冊子",
  "collection.filterEssays": "隨筆",
  "collection.filterGuides": "田野指南",
  "collection.filters": "篩選收藏",
  "collection.kicker": "你的物件",
  "collection.locked": "已鎖定",
  "collection.lockedMeta": "需要身分驗證",
  "collection.logOut": "登出",
  "collection.missing": "缺少",
  "collection.missingObject": "缺少的物件 {number}：{title}，在藝廊中打開",
  "collection.objectCount": "{count} 件物件",
  "collection.owned": "已擁有",
  "collection.ownedMeta": "收藏中有 {count}",
  "collection.personalCopy": "個人副本",
  "collection.version": "版本",
  "collection.yourObjects": "你的物件",
  "collection.yours": "你的收藏",
  "collection.yoursCount": "你的收藏：{count} 件物件",
  "subtitle.009": "旅程留下的",
  "banner.009": "牧場橫幅",
  "kind.essay": "隨筆",
  "kind.booklet": "小冊子",
  "kind.guide": "指南",
  "kind.banner": "橫幅",
  "intro.label": "關於 · Vekon: Papers",
  "intro.title": "短小的文字，作為物件保存。",
  "intro.body": "人生由時間組成，而大多數時間流逝時不留痕跡。Vekon 為那些留下痕跡的時間而存在。在 Vekon Life 裡，你保存自己的日子：一本記錄發生了什麼、留下了什麼的日記。在 Papers 裡，我們保存我們的：短文、指南與文章，每一篇都編號成為物件，可以在螢幕上閱讀，也可以列印後親手摺疊。讓你從另一個地方看待自己的時間。",
  "intro.since": "始於 2026",
  "home.kicker": "關於",
  "home.title": "Vekon",
  "home.body": "Vekon 是一家獨立工作室，製作關於時間與記憶的工具和出版品。它匯集了兩個出於同一想法的計畫：更加留意我們度過的每一個小時。",
  "home.doors": "兩扇門",
  "home.life.label": "日記",
  "home.life.body": "寫下這一天，追蹤習慣，標記地點，看著你的紀錄隨時間變成規律。",
  "home.life.learn": "了解更多",
  "home.life.enter": "登入",
  "home.papers.label": "出版",
  "home.papers.body": "短文、指南與文章，每一篇都作為編號的物件保存，可在螢幕上閱讀，也可列印後親手摺疊。",
  "home.papers.open": "開啟 Papers",
  "themes": "主題",
  "references": "參考",
  "theme.time": "時間",
  "theme.memory": "記憶",
  "theme.choice": "選擇",
  "theme.self": "自我",
  "ref.augustine": "奧古斯丁《懺悔錄》第十一卷",
  "ref.seneca": "塞涅卡《論生命之短暫》",
  "collection.owner": "所有者",
  "collection.notYet": "尚未擁有 · {n}",
  "collection.seeInGallery": "在藝廊中查看 →",
  view: "檢視:",
  gallery: "藝廊",
  collection: "收藏",
  logIn: "登入",
  object: "物件",
  pages: "頁",
  get: "取得 →",
  read: "閱讀 →",
  seeMore: "查看更多 →",
  releases: "發行",
  objects: "物件",
  editions: "版本",
  "edition.readColour": "PDF · 彩色",
  "edition.readBw": "PDF · 黑白",
  "edition.folding": "摺頁指南",
  "edition.languages": "語言",
  "edition.references": "標明出處",
  "edition.note":
    "多語言 PDF，出處標註清楚。可在螢幕上閱讀或列印。Vekon 裝飾物品另行販售。僅供個人使用，請勿轉售。",
  manifestations: "呈現形式",
  "manifestations.papers": "Papers",
  "manifestations.vekon": "Vekon",
  "manifestations.pdfBooklet": "PDF 小冊子",
  "manifestations.bannerCosmetic": "裝飾",
  "manifestations.purchaseNote":
    "此處購買僅包含 Papers 版本。橫幅可在 Vekon 另行取得。",
  "manifestations.related": "相關形式",
  "manifestations.alsoInVekon": "也存在於 Vekon",
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
    "一生大約八十年，但我們大約從七歲才開始記得它。這份宣言算了這筆帳，並追問該如何度過剩下的時間。兩張紙，一種墨色，以及 Vekon 開始的那篇文字。",
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

export function artifactSubtitleKey(id: string): MessageKey | null {
  const key = `subtitle.${id}` as MessageKey;
  return key in DICTIONARIES.en ? key : null;
}

export function artifactBannerKey(id: string): MessageKey | null {
  const key = `banner.${id}` as MessageKey;
  return key in DICTIONARIES.en ? key : null;
}

/** Kind of object, translated (Essay / Booklet / Guide / Banner). */
export function kindKey(kind: string): MessageKey {
  if (kind === "essay") return "kind.essay";
  if (kind === "field-guide") return "kind.guide";
  if (kind === "extra") return "kind.banner";
  return "kind.booklet";
}

export function artifactDescriptionKey(
  id: string,
): Extract<MessageKey, `desc.${string}`> | null {
  const key = `desc.${id}` as MessageKey;
  if (key in DICTIONARIES.en) return key as Extract<MessageKey, `desc.${string}`>;
  return null;
}
