import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { batch2Tail } from "./batch-2-tail.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(__dirname, "..", "data", "victor-post-i18n", "batch-2.json");

/** @type {Record<string, Record<string, { title: string; excerpt: string; body: string[]; imageAlt?: string }>>} */
const data = {
  "ted-ed-psychology-lessons": {
    en: {
      title: "TED-Ed: psychology lessons",
      excerpt:
        "The TED-Ed Psychology section brings together video lessons on topics such as cognition and learning, motivation and emotion, personality, development, and social psychology.",
      body: [
        "The TED-Ed Psychology section brings together video lessons on topics such as cognition and learning, motivation and emotion, personality, development, and social psychology. The pieces are short, usually meant to introduce a concept, a question, or a problem in a visual, accessible way.",
        "The point is exactly that: they work well as a gateway, a quick review, or a first contact with topics you can deepen later in more technical texts. Even when they simplify, the lessons usually frame the subject clearly and help place core ideas before a denser read.",
      ],
    },
    ko: {
      title: "TED-Ed: 심리학 레슨",
      excerpt:
        "TED-Ed의 Psychology 섹션은 인지·학습, 동기·정서, 성격, 발달, 사회심리 등을 다루는 짧은 영상 레슨을 모아 둡니다.",
      body: [
        "TED-Ed의 Psychology 섹션은 인지·학습, 동기·정서, 성격, 발달, 사회심리 등을 다루는 짧은 영상 레슨을 모아 둡니다. 보통 개념·질문·주제를 시각적이고 쉬운 방식으로 소개하도록 짧게 구성돼 있습니다.",
        "핵심은 바로 이 점입니다: 입문, 빠른 복습, 또는 뒤에서 더 기술적인 글로 이어갈 때의 첫 닿음으로 잘 쓰입니다. 단순화할 때도, 주제를 잘 잡아 주고 본문을 읽기 전 핵심을 짚는 데 도움이 됩니다.",
      ],
    },
    es: {
      title: "TED-Ed: lecciones de psicología",
      excerpt:
        "La sección Psychology de TED-Ed reúne lecciones en vídeo sobre temas como cognición y aprendizaje, motivación y emoción, personalidad, desarrollo y psicología social.",
      body: [
        "La sección Psychology de TED-Ed reúne lecciones en vídeo sobre cognición y aprendizaje, motivación y emoción, personalidad, desarrollo y psicología social. Son contenidos breves, pensados sobre todo para introducir un concepto, una pregunta o un problema de forma visual y accesible.",
        "El interés está precisamente ahí: sirven bien de puerta de entrada, repaso rápido o primer contacto con asuntos que luego puedes profundizar en textos más técnicos. Aunque simplifiquen, suelen ordenar el tema y situar ideas centrales antes de una lectura más densa.",
      ],
    },
    ja: {
      title: "TED-Ed：心理学のレッスン",
      excerpt:
        "TED-EdのPsychology（心理学）コーナーは、認知と学習、動機づけと情動、人格、発達、社会心理学などを扱う短い動画レッスンを集めたものです。",
      body: [
        "TED-EdのPsychologyコーナーは、認知と学習、動機づけと情動、人格、発達、社会心理学などを扱う短い動画レッスンを集めたものです。映像的で分かりやすく、一つの概念・問い・問題の入り口にする、短尺の企画が多いです。",
        "面白いのはまさにそこで、導入・さっと振り返る・本格的な文献の前触れとして使いやすい点です。単純化しがちでも、テーマの骨格はきちんと示し、踏み込んだ読解の前に中核的な考え方を置いてくれます。",
      ],
    },
    de: {
      title: "TED-Ed: Psychologielektionen",
      excerpt:
        "Der Bereich Psychology bei TED-Ed sammelt kurze Videolektionen zu Themen wie Kognition und Lernen, Motivation und Emotion, Persönlichkeit, Entwicklung und Sozialpsychologie.",
      body: [
        "Der Bereich Psychology bei TED-ED sammelt Videolektionen zu Kognition und Lernen, Motivation und Emotion, Persönlichkeit, Entwicklung und Sozialpsychologie. Die Inhalte sind kurz, meist gedacht, um einen Begriff, eine Frage oder ein Problem visuell und leicht zugänglich einzuführen.",
        "Genau das ist der Wert: Sie eignen sich als Einstieg, schnelle Wiederholung oder erster Berührungspunkt, bevor man in tiefere Texte geht. Auch bei Vereinfachung rücken die Lektionen das Thema meist klar in den Raum und helfen, zentrale Ideen vor dichtem Lesen zu platzieren.",
      ],
    },
    fr: {
      title: "TED-Ed : leçons de psychologie",
      excerpt:
        "La rubrique Psychology de TED-Ed regroupe de courtes leçons vidéo sur la cognition et l’apprentissage, la motivation et l’émotion, la personnalité, le développement et la psychologie sociale.",
      body: [
        "La rubrique Psychology de TED-Ed regroupe des leçons vidéo sur la cognition et l’apprentissage, la motivation et l’émotion, la personnalité, le développement et la psychologie sociale. Des formats courts, le plus souvent conçus pour introduire une notion, une question ou un problème de manière visuelle et accessible.",
        "L’intérêt tient justement à cela : cela tient lieu de porte d’entrée, de révision rapide ou de premier contact avant d’aller vers des textes plus techniques. Même en simplifiant, les leçons cadrent souvent bien le sujet et aident à situer les idées centrales avant une lecture plus dense.",
      ],
    },
    it: {
      title: "TED-Ed: lezioni di psicologia",
      excerpt:
        "La sezione Psychology di TED-Ed raccoglie lezioni video su cognizione e apprendimento, motivazione ed emozione, personalità, sviluppo e psicologia sociale.",
      body: [
        "La sezione Psychology di TED-Ed raccoglie lezioni video su cognizione e apprendimento, motivazione ed emozione, personalità, sviluppo e psicologia sociale. Sono contributi brevi, pensati per introdurre un concetto, una domanda o un problema in modo visivo e fruibile.",
        "Proprio lì sta il valore: funzionano da entrata, ripasso rapido o primo contatto con argomenti che poi approfondirai in testi più tecnici. Anche quando semplificano, di solito incorniciano il tema e aiutano a piazzare le idee centrali prima di una lettura più densa.",
      ],
    },
    "zh-CN": {
      title: "TED-Ed：心理学小课",
      excerpt:
        "TED-Ed 的「Psychology」板块汇集了关于认知与学习、动机与情绪、人格、发展与社会心理学等主题的视频小课。",
      body: [
        "TED-Ed 的「Psychology」板块汇集了关于认知与学习、动机与情绪、人格、发展与社会心理学等主题的视频小课。内容短，多是以直观、可理解的方式引入一个概念、一个问题或一个主题。",
        "看点就在于此：很适合作为入口、快览，或在读更专深的文字前先建立框架。即使有所简化，也常常能把主题理清楚，帮助在深入阅读前抓住核心。",
      ],
    },
    "zh-TW": {
      title: "TED-Ed：心理學小講",
      excerpt:
        "TED-Ed 的 Psychology 區彙整了有關認知與學習、動機與情緒、人格、發展與社會心理等主題的短片教學。",
      body: [
        "TED-Ed 的 Psychology 區彙整了有關認知與學習、動機與情緒、人格、發展與社會心理等主題的短片教學。篇幅短，多半用來以視覺、易懂方式引出一個觀念、一個問題或一則主題。",
        "可取之處正在於此：作為起點、速覽，或在讀更技術性文本之前的第一次接觸都很合適。即使做簡化，也常能把主題鋪好，讓讀者先立住幾條中軸再進到較艱的閱讀。",
      ],
    },
  },
  "you-are-not-so-smart": {
    en: {
      title: "You Are Not So Smart",
      excerpt:
        "You Are Not So Smart is a podcast by David McRaney focused on psychology, reasoning, beliefs, and misinformation.",
      body: [
        "You Are Not So Smart (https://youarenotsosmart.com/) is a podcast by David McRaney focused on psychology, reasoning, beliefs, and misinformation. Episodes are usually built around interviews with researchers, authors, and experts, covering topics such as cognitive bias, perception, memory, polarization, conspiracy thinking, and critical thought.",
        "On the project’s site, the show sits within a larger set of posts, books, a newsletter, and transcripts. The show’s value is in translating psychological and social research into long, accessible, problem-driven conversations: why we believe what we believe, how minds change, and how error, illusion, and persuasion play out in everyday life.",
      ],
    },
    ko: {
      title: "You Are Not So Smart",
      excerpt:
        "데이비드 맥라니의 팟캐스트로, 심리·추론·신념·오·정보를 다룹니다.",
      body: [
        "You Are Not So Smart(https://youarenotsosmart.com/)는 데이비드 맥라니의 팟캐스트로, 심리·추론·신념·오·정보를 다룹니다. 에피소드는 연구자·저자·전문가와의 대담을 축으로 하여 인지 편향, 지각, 기억, 양극화, 음모론, 비판적 사고 등을 논의합니다.",
        "프로젝트 사이트에서는 이 팟캐스트가 글, 책, 뉴스레터, 대본을 아우른 더 큰 묶음의 일부로 등장합니다. 쇼의 매력은 심리·사회 연구를 길고 접근 쉬운, 동시대 문제를 중심에 둔 대화로 옮기는 데 있습니다. 우리가 믿는 이유, 생각이 바뀌는 방식, 일상 속에서 오류·착시·설득이 어떻게 작동하는가.",
      ],
    },
    es: {
      title: "You Are Not So Smart",
      excerpt:
        "You Are Not So Smart es un podcast de David McRaney centrado en psicología, razonamiento, creencias y desinformación.",
      body: [
        "You Are Not So Smart (https://youarenotsosmart.com/) es un podcast de David McRaney centrado en psicología, razonamiento, creencias y desinformación. Los episodios suelen girar en entrevistas con investigadores, autores y expertos, con temas como sesgo cognitivo, percepción, memoria, polarización, teorías conspirativas y pensamiento crítico.",
        "En el sitio del proyecto, el podcast forma parte de un conjunto más amplio con entradas, libros, boletín y transcripciones. El interés del programa está en traducir la investigación psicológica y social a conversaciones largas y asequibles, orientadas a problemas de hoy: por qué creemos lo que creemos, cómo cambiamos de opinión y de qué modo el error, la ilusión y el convencimiento se dan en la vida cotidiana.",
      ],
    },
    ja: {
      title: "You Are Not So Smart",
      excerpt:
        "デイビッド・マクレーニのポッドキャスト。心理学・推論・信念・誤情報がテーマ。",
      body: [
        "You Are Not So Smart（https://youarenotsosmart.com/）はデイビッド・マクレーニのポッドキャストで、心理学・推論・信念・誤情報を扱います。研究家・著者・専門家へのインタビューが多く、認知バイアス、知覚、記憶、分極化、陰謀論、批判的思考などを話題にします。",
        "公式サイトでは、この番組は記事、書籍、ニュースレター、文字起こしなどより大きな枠の一部として置かれています。価値は、心理・社会研究を長く、わかりやすく、現代の問いの周りに沿った対談へ翻訳する点にあります。信じる理由、考え方が変わる仕組み、日常の中での錯誤・錯覚・説得の働き方。",
      ],
    },
    de: {
      title: "You Are Not So Smart",
      excerpt:
        "You Are Not So Smart ist ein Podcast von David McRaney mit Schwerpunkt Psychologie, Denken, Überzeugungen und Fehlinformationen.",
      body: [
        "You Are Not So Smart (https://youarenotsosmart.com/) ist ein Podcast von David McRaney mit Schwerpunkt Psychologie, Denken, Überzeugungen und Fehlinformationen. Episoden drehen sich meist um Gespräche mit Forschenden, Autorinnen und Expertinnen, zu Themen wie kognitiven Verzerrungen, Wahrnehmung, Erinnerung, Polarisation, Verschwörungsdenken und kritischem Denken.",
        "Auf der Projektseite steht der Podcast in einem größeren Bündel aus Beiträgen, Büchern, Newsletter und Transkripten. Stärke des Programms ist, psychologische und soziale Forschung in lange, zugängliche Gespräche mit aktuellen Problemlagen zu übersetzen: warum wir glauben, was wir glauben, wie sich Einstellungen wandeln und wie Fehler, Illusion und Überzeugen im Alltag mitschwingen.",
      ],
    },
    fr: {
      title: "You Are Not So Smart",
      excerpt:
        "You Are Not So Smart est un podcast de David McRaney centré sur la psychologie, le raisonnement, les croyances et la désinformation.",
      body: [
        "You Are Not So Smart (https://youarenotsosmart.com/) est un podcast de David McRaney centré sur la psychologie, le raisonnement, les croyances et la désinformation. Les épisodes s’appuient souvent sur des entretiens avec des chercheurs, des autrices et des expert·es, autour de biais cognitifs, perception, mémoire, polarisation, théories conspirationnistes et pensée critique.",
        "Sur le site, le podcast fait partie d’un ensemble plus vaste: billets, livres, lettre, transcriptions. L’enjeu est de traduire la recherche en psychologie et en sciences sociales en longues conversations accessibles, guidées par des enjeux contemporains: pourquoi nous croyons, comment les vues se modifient, et comment erreur, illusion et conviction agissent au quotidien.",
      ],
    },
    it: {
      title: "You Are Not So Smart",
      excerpt:
        "You Are Not So Smart è un podcast di David McRaney su psicologia, ragionamento, credenze e disinformazione.",
      body: [
        "You Are Not So Smart (https://youarenotsosmart.com/) è un podcast di David McRaney su psicologia, ragionamento, credenze e disinformazione. Le puntate si appoggiano spesso a interviste con ricercatrici, autrici e esperte, su argomenti come distorsione cognitiva, percezione, memoria, polarizzazione, teorie del complotto e pensiero critico.",
        "Sul sito, il podcast è parte di un pacchetto più ampio con post, libri, newsletter e trascrizioni. Il valore del programma è tradurre ricerca psicologica e sociale in conversazioni lunghe e comprensibili, orientate a problemi d’attualità: perché crediamo ciò che crediamo, come cambiano le idee, e in che modo errore, illusione e convinzione lavorano nella quotidianità.",
      ],
    },
    "zh-CN": {
      title: "You Are Not So Smart",
      excerpt:
        "David McRaney 主持的播客，关注心理学、推理、信念与 misinformation。",
      body: [
        "You Are Not So Smart（https://youarenotsosmart.com/）是 David McRaney 主持的播客，关注心理学、推理、信念与 misinformation。单集多围绕与研究者、作者、专家的谈话，涉认知偏差、感知、记忆、极化、阴谋论与批判性思维。",
        "在官网，播客是更大内容集合的一部分，包括文章、书、通讯与转录。节目的价值在于把心理与社会研究译入较长、可读的、贴着当代问题的对谈里：我们为何信其所信、观念如何变，以及日常里错误、错觉与说服如何发生。",
      ],
    },
    "zh-TW": {
      title: "You Are Not So Smart",
      excerpt:
        "David McRaney 的 Podcast，關注心理、推理、信念與不實訊息。",
      body: [
        "You Are Not So Smart（https://youarenotsosmart.com/）是 David McRaney 的 Podcast，關注心理、推理、信念與不實訊息。單集多以研究者、作者、專家訪談為主軸，談認知偏誤、知覺、記憶、兩極化、陰謀論與批判性思考。",
        "在專案網站，這個節目是更一大組內容的一部分：文章、書籍、電子報、逐字稿。重點在於把心理與社會研究，翻成既長又容易跟上的對談，扣著當代的問題意識：人為什麼信、觀點怎麼變、錯誤、幻覺與說服在日常生活裡怎麼運作。",
      ],
    },
  },
  "mad-men": {
    en: {
      title: "Mad Men",
      excerpt:
        "Mad Men follows the Sterling Cooper agency, and what spins out of it, on Madison Avenue, with Don Draper (Jon Hamm) at the center: a brilliant creative with a past built on secrets.",
      body: [
        "Mad Men follows the Sterling Cooper agency, and what spins out of it, on Madison Avenue, with Don Draper (Jon Hamm) at the center: a brilliant creative with a past built on secrets. Around him, copywriters, art directors, accountants, and clients sketch the everyday of an industry that trades in desire; the story handles power, gender, race, class, and identity without easy answers.",
        "What makes the show memorable is its contained pacing, the precision of the dialogue, and the care for setting, costume, and music as narrative extension: the 1960s advance episode by episode, and the mood shifts with the country.",
      ],
    },
    ko: {
      title: "Mad Men",
      excerpt:
        "《매드 맨》은 매디슨 애비뉴의 광고대행사 스털링 쿠퍼와 그 파생을 따라가며, 조넘 햄의 돈 드레이퍼를 중심에 둡니다. 비밀로 쌓은 과거를 지닌, 빛나는 크리에이티브죠.",
      body: [
        "《매드 맨》은 스털링 쿠퍼와 그 파생을 따라가며 매디슨 애비뉴에서 ‘욕망’을 팔아 온 광고업의 일상을, 카피라이터, 아트 디렉터, 경리, 클라이언트가 풀어 갑니다. 권력, 젠더, 인종, 계급, 정체성을 쉬운 답으로 묶지 않고 다룹니다.",
        "기억에 남는 점은 절제된 리듬, 정밀한 대사, 풍경·의상·음악이 서사의 연장이 되는 배려, 그리고 60년대가 화마다 쌓이며 국가의 흐름과 함께 분위기가 변하는 점입니다.",
      ],
    },
    es: {
      title: "Mad Men",
      excerpt:
        "Mad Men sigue a la agencia Sterling Cooper, y a lo que de ella nace, en Madison Avenue, con Don Draper (Jon Hamm) como eje, un creativo brillante cuyo pasado está construido a base de secretos.",
      body: [
        "Mad Men sigue a la agencia Sterling Cooper, y a lo que de ella nace, en Madison Avenue, con Don Draper (Jon Hamm) como eje, un creativo brillante cuyo pasado está hecho de silencio. A su alrededor, copywriters, directores de arte, contables y clientes trazan el día a día de una industria que vende deseo; el relato toca poder, género, raza, clase e identidad sin respuestas fáciles.",
        "Lo que la hace memorable es un ritmo contenido, un diálogo exacto, y un cuidado del entorno, el vestuario y la música como extensión narrativa: los años sesenta avanzan capítulo a capítulo, y el tono cambia con el país.",
      ],
    },
    ja: {
      title: "Mad Men",
      excerpt:
        "『マッドメン』は、マジソン・アベニューのスターリング・クーパーと派生の物語。中心は（ジョン・ハムの）ドン・ドレイパー。秘密の上に築かれた輝かしいクリエイティブの男。",
      body: [
        "『マッドメン』は、マジソン・アベニューのエージェンシー、スターリング・クーパーと派生先を辿る物語。欲望を売る産業の日々を、周囲のコピーライター、アートディ、経理、クライアントが形づくります。権力、ジェンダー、人種、階級、アイデンティティに、手早い正解を与えないで向き合います。",
        "印象深いのは、抑えたリズム、的確な台詞、セット、衣、音楽が物語の延長として扱われること、そして60年代が話ごとに進み、国の空気に合わせてトーンが揺れていくこと。",
      ],
    },
    de: {
      title: "Mad Men",
      excerpt:
        "Mad Men begleitet die Agentur Sterling Cooper – und alles, was daraus wird – an der Madison Avenue, mit Don Draper (Jon Hamm) im Zentrum: glänzender Creative mit einem in Geheimnisse gepackten Lebenslauf.",
      body: [
        "Mad Men begleitet Sterling Cooper an der Madison Avenue, mit Don Draper (Jon Hamm) als Mittelpunkt, brillant im Job, in der Vergangenheit in Geheimnisse gehüllt. Um ihn herum zeichnen Texter, Art Directors, Buchhaltung und Kundinnen den Alltag einer Branche, die Wunsch verkauft; Macht, Geschlecht, „Rasse“, Klasse und Identität, ohne schnelle Antworten.",
        "Was die Serie unvergesslich macht: ihr gedämpftes Tempo, präziser Dialog, und die sorgfältige Ausstattung von Set, Mode und Musik als erzählendes Geflecht. Die 1960er rücken Folge für Folge, und der Ton wandelt sich mit dem Land.",
      ],
    },
    fr: {
      title: "Mad Men",
      excerpt:
        "Mad Men suit l’agence Sterling Cooper, et ce qui en dérive, sur Madison Avenue, autour de Don Draper (Jon Hamm), un créatif brillant au passé bâti de secrets.",
      body: [
        "Mad Men suit l’agence Sterling Cooper, et ce qui en dérive, sur Madison Avenue, autour de Don Draper, créatif brillant au passé tissé de secrets. Autour de lui, copywriters, directeur·rices artistiques, comptables et clientes décrivent le quotidien d’une industrie du désir. Le récit mêle pouvoir, genre, race, classe et identité, sans recettes faciles.",
        "Ce qui en fait le souvenir, c’est le rythme contenu, le dialogue ciselé, le soin de la mise en scène, des costumes et de la musique comme extension du récit : les années 1960 s’enchaînent, et l’humeur suit le pays.",
      ],
    },
    it: {
      title: "Mad Men",
      excerpt:
        "Mad Men segue l’agenzia Sterling Cooper, e ciò che ne deriva, a Madison Avenue, con Don Draper (Jon Hamm) al centro, creativo brillante con un passato costruito su segreti.",
      body: [
        "Mad Men segue la Sterling Cooper e ciò che ne consegue, a Madison Avenue, con al centro Don Draper, creativo brillante con un passato fatto di segreti. Intorno, copy, direttori artistici, contabilità e clienti disegnano il vivere quotidiano di un’industria che vende desiderio. Il filo mescola potere, genere, razza, classe, identità, senza risposte scontate.",
        "Ciò che la rende memorabile è un ritmo trattenuto, un dialogo preciso, l’attenzione a set, abiti e musica come prosecuzione del racconto: i Sessanta avanzano puntata dopo puntata, e l’atmosfera scorre con il paese.",
      ],
    },
    "zh-CN": {
      title: "广告狂人",
      excerpt:
        "《广告狂人》讲述麦迪逊大道上的斯特林·库珀公司及其发展，乔·汉姆饰演的唐·德雷柏是核心，他是才华横溢的创意人，但过去被秘密所构筑。",
      body: [
        "《广告狂人》跟随斯特林·库珀及其在麦迪逊大道的迁延。唐·德雷柏（乔·汉姆）是中心：以秘密堆叠起来的出色创意。文案、美指、财务与客户在欲望买卖的行业里画日常；叙事触及权力、性别、种族、阶层与身份，不给出轻快的答案。",
        "令该剧难忘的是节制的节奏、利落的对话，以及场景、衣装、音乐与叙事的同频延伸：60年代一集一集走，而国家的氛围与之起伏。",
      ],
    },
    "zh-TW": {
      title: "廣告狂人",
      excerpt:
        "《廣告狂人》跟著史特林庫柏與一路分支，在麥迪遜大道上。核心是（Jon Hamm 的）唐·德雷伯：才華洋溢的創意，過去卻是秘密疊出來的。",
      body: [
        "《廣告狂人》跟隨史特林庫柏，以及從中長出的脈絡。唐·德雷伯在中心，天才創意人，卻有由秘密堆起的人生。圍著他，文案、美指、帳房與客戶描寫一個以欲望為本業的產業日常；劇情處理權力、性別、種族、階級與認同，不給便宜答案。",
        "讓人記得的是內斂的節奏、精準的台詞、對場景、服裝與音樂的照料像敘事延伸，以及六〇年代一集一集往前、氛圍與社會氣壓一齊轉。",
      ],
    },
  },
  "special-books-by-special-kids": {
    en: {
      title: "Special Books by Special Kids",
      excerpt:
        "Special Books by Special Kids is a YouTube channel created by Chris Ulmer, with long interviews and conversations with people living with neurological differences, rare conditions, and disabilities.",
      body: [
        "Special Books by Special Kids (https://www.youtube.com/@SpecialBooksbySpecialKids) is a YouTube channel created by Chris Ulmer, with long interviews and conversations with people living with neurological differences, rare conditions, and disabilities. The format is simple, almost domestic: a camera, a conversation, and a space where each person, or someone in the family, tells their own story in the first person.",
        "What makes the project compelling is the way it pulls away from the spectacular or pitying tone that often surrounds these portrayals, shifting attention toward daily life, humor, affection, and concrete difficulties. Over the years, the channel has also become an archive of lives shaped by experiences that rarely get visibility, built around listening, presence, and steady community work.",
      ],
    },
    ko: {
      title: "Special Books by Special Kids",
      excerpt:
        "Special Books by Special Kids는 크리스 울머가 만든 유튜브 채널로, 신경학적 다양성, 희귀 질환, 장애와 함께 살아가는 사람들과의 긴 인터뷰와 대화를 모은 곳입니다.",
      body: [
        "Special Books by Special Kids (https://www.youtube.com/@SpecialBooksbySpecialKids)는 크리스 울머가 만든 유튜브 채널로, 신경학적 다양성, 희귀 질환, 장애와 함께 살아가는 사람들과의 긴 인터뷰와 대화를 모은 곳입니다. 형식은 단순하고 거의 가정적입니다. 카메라 한 대, 대화 한 자리, 그리고 본인이나 가족이 1인칭으로 자기 이야기를 들려줄 공간이 그 전부입니다.",
        "이 프로젝트가 흥미로운 이유는, 이런 모습들을 흔히 둘러싸는 자극적이거나 동정적인 톤에서 벗어나 일상, 유머, 정서, 구체적인 어려움 쪽으로 시선을 옮긴다는 점입니다. 시간이 지나면서 이 채널은 잘 드러나지 않던 경험으로 채워진 삶의 기록이 되었고, 그 바탕에는 듣기, 함께 있어 주기, 꾸준한 공동체적 작업이 자리합니다.",
      ],
    },
    es: {
      title: "Special Books by Special Kids",
      excerpt:
        "Special Books by Special Kids es un canal de YouTube creado por Chris Ulmer, con entrevistas y conversaciones largas con personas que viven con diversidades neurológicas, condiciones raras y discapacidades.",
      body: [
        "Special Books by Special Kids (https://www.youtube.com/@SpecialBooksbySpecialKids) es un canal de YouTube creado por Chris Ulmer, con entrevistas y conversaciones largas con personas que viven con diversidades neurológicas, condiciones raras y discapacidades. El formato es sencillo y casi casero: una cámara, una conversación y un espacio en el que cada persona, o alguien de la familia, cuenta su historia en primera persona.",
        "El interés del proyecto está en deshacer el tono espectacular o compasivo que suele rodear estas representaciones, desplazando la mirada hacia lo cotidiano, el humor, los afectos y las dificultades concretas. Con los años, el canal se ha convertido también en un archivo de vidas atravesadas por experiencias poco visibles, organizado en torno a la escucha, la presencia y un trabajo de comunidad sostenido.",
      ],
    },
    ja: {
      title: "Special Books by Special Kids",
      excerpt:
        "Special Books by Special Kids は、クリス・アルマーが立ち上げた YouTube チャンネルで、神経学的な多様性、希少疾患、障害とともに生きる人々への長いインタビューや対話を集めている。",
      body: [
        "Special Books by Special Kids (https://www.youtube.com/@SpecialBooksbySpecialKids) は、クリス・アルマーが立ち上げた YouTube チャンネルで、神経学的な多様性、希少疾患、障害とともに生きる人々への長いインタビューと対話をまとめている。形式は簡素で、ほぼ家庭的。カメラ一台と会話、そして当事者や家族が一人称で自分の物語を語る場が用意されている。",
        "この企画の魅力は、こうした表象を取り囲みがちな扇情的または憐憫の調子から離れ、日々の暮らし、ユーモア、情、具体的な困りごとへ視線を移す点にある。年月を重ねるうちに、可視化されにくい経験を抱えた生の記録としても機能するようになり、その土台には聴くこと、寄り添うこと、続いていく共同体的な仕事がある。",
      ],
    },
    de: {
      title: "Special Books by Special Kids",
      excerpt:
        "Special Books by Special Kids ist ein YouTube-Kanal von Chris Ulmer, der lange Interviews und Gespräche mit Menschen versammelt, die mit neurologischer Vielfalt, seltenen Erkrankungen und Behinderungen leben.",
      body: [
        "Special Books by Special Kids (https://www.youtube.com/@SpecialBooksbySpecialKids) ist ein YouTube-Kanal von Chris Ulmer, der lange Interviews und Gespräche mit Menschen versammelt, die mit neurologischer Vielfalt, seltenen Erkrankungen und Behinderungen leben. Das Format ist schlicht, fast häuslich: eine Kamera, ein Gespräch und ein Raum, in dem jede Person oder ein Angehöriger in der ersten Person die eigene Geschichte erzählen kann.",
        "Spannend wird das Projekt dadurch, dass es den spektakulären oder mitleidigen Ton ablegt, der solche Darstellungen oft begleitet, und den Blick auf Alltag, Humor, Zuneigung und konkrete Schwierigkeiten lenkt. Über die Jahre ist der Kanal auch zu einem Archiv von Leben geworden, in denen wenig sichtbare Erfahrungen Gewicht bekommen, getragen von Zuhören, Präsenz und einer beständigen Arbeit am Gemeinschaftlichen.",
      ],
    },
    fr: {
      title: "Special Books by Special Kids",
      excerpt:
        "Special Books by Special Kids est une chaîne YouTube créée par Chris Ulmer, qui rassemble de longs entretiens et conversations avec des personnes vivant avec des diversités neurologiques, des maladies rares et des handicaps.",
      body: [
        "Special Books by Special Kids (https://www.youtube.com/@SpecialBooksbySpecialKids) est une chaîne YouTube créée par Chris Ulmer, qui rassemble de longs entretiens et conversations avec des personnes vivant avec des diversités neurologiques, des maladies rares et des handicaps. Le format est simple, presque domestique: une caméra, une conversation, et un espace où chaque personne, ou un proche, raconte son histoire à la première personne.",
        "L’intérêt du projet tient à la façon dont il se détache du ton spectaculaire ou apitoyé qui accompagne souvent ces représentations, en déplaçant le regard vers le quotidien, l’humour, les affects et les difficultés concrètes. Au fil des années, la chaîne est devenue aussi une archive de vies marquées par des expériences peu visibles, articulée autour de l’écoute, de la présence et d’un travail patient de communauté.",
      ],
    },
    it: {
      title: "Special Books by Special Kids",
      excerpt:
        "Special Books by Special Kids è un canale YouTube creato da Chris Ulmer, che raccoglie interviste e lunghe conversazioni con persone che vivono con diversità neurologiche, condizioni rare e disabilità.",
      body: [
        "Special Books by Special Kids (https://www.youtube.com/@SpecialBooksbySpecialKids) è un canale YouTube creato da Chris Ulmer, che raccoglie interviste e lunghe conversazioni con persone che vivono con diversità neurologiche, condizioni rare e disabilità. Il formato è semplice e quasi domestico: una telecamera, una conversazione e uno spazio in cui ciascuno, o un familiare, racconta la propria storia in prima persona.",
        "L’interesse del progetto sta nel disfare il tono spettacolare o pietoso che spesso accompagna queste rappresentazioni, spostando lo sguardo sul quotidiano, sull’umorismo, sugli affetti e sulle difficoltà concrete. Con il tempo, il canale è diventato anche un archivio di vite segnate da esperienze poco visibili, costruito attorno all’ascolto, alla presenza e a un lavoro continuativo di comunità.",
      ],
    },
    "zh-CN": {
      title: "Special Books by Special Kids",
      excerpt:
        "《Special Books by Special Kids》是克里斯·厄尔默创办的 YouTube 频道，集中收录与神经多样性、罕见疾病及残障人士相关的长访谈与对话。",
      body: [
        "《Special Books by Special Kids》（https://www.youtube.com/@SpecialBooksbySpecialKids）是克里斯·厄尔默创办的 YouTube 频道，集中收录与神经多样性、罕见疾病及残障人士的长访谈与对话。形式简单，近乎家庭：一台摄像机、一段对谈，以及当事人或家人以第一人称讲述自身经历的空间。",
        "项目的可贵之处，在于不再沿用那种猎奇或怜悯的叙述口吻，把注意力转回日常、幽默、情感与具体的困难。多年下来，这个频道也成为一份不易被看见之生命经验的档案，建立在倾听、陪伴与持续的社群工作之上。",
      ],
    },
    "zh-TW": {
      title: "Special Books by Special Kids",
      excerpt:
        "《Special Books by Special Kids》是 Chris Ulmer 創辦的 YouTube 頻道，集中收錄與神經多樣性、罕見疾病及身心障礙者的長訪談與對話。",
      body: [
        "《Special Books by Special Kids》（https://www.youtube.com/@SpecialBooksbySpecialKids）是 Chris Ulmer 創辦的 YouTube 頻道，集中收錄與神經多樣性、罕見疾病及身心障礙者的長訪談與對話。形式簡單，近乎家庭：一台攝影機、一段對談，以及當事人或家人以第一人稱訴說自身故事的空間。",
        "這個計畫有意思的地方，在於拉開與獵奇或憐憫常見口吻的距離，把目光轉回日常、幽默、情感與具體的困難。多年下來，這個頻道也成為一份較少被看見的生命經驗檔案，奠基於聆聽、陪伴與長期投入的社群工作。",
      ],
    },
  },
  "great-pretender-anime": {
    en: {
      title: "Great Pretender",
      excerpt:
        "Great Pretender follows Makoto Edamura, a con artist in Tokyo who gets drawn into Laurent Thierry’s operations.",
      body: [
        "Great Pretender follows Makoto Edamura, a con artist in Tokyo who gets drawn into Laurent Thierry’s operations. Each block of episodes stages a long con (Los Angeles, Singapore, London, Tokyo/Shanghai) in a film-chapter rhythm: a wealthy mark, costumes, turns, and a final twist that usually flips what looked obvious. The blend mixes light comedy, drama, and a touch of social critique without losing the fun of watching the scheme play out.",
        "Hiro Kaburagi’s direction and Wit Studio’s look bet on saturated color, wide frames, and visual nods to cinema and jazz; the score (including the track that winks at The Platters’ title classic) underlines the idea of performance.",
      ],
    },
    ko: {
      title: "Great Pretender",
      excerpt:
        "도쿄의 약속쟁이 에다무라 마코토가, 로랑 티에리의 작전에 끼어드는 이야기.",
      body: [
        "도쿄의 사기꾼 에다무라 마코토가, 로랑 티에리의 ‘작전’에 휘말리는 이야기. 에피소드 묶음은 LA, 싱가포르, 런던, 도쿄/상하이를 무대로 한 ‘큰’ 사기(롱콘)로, 한 편의 영화 같은 호흡으로: 부자 표적, 변장, 반전, 처음엔 뻔해 보이던 것을 뒤집는 엔딩. 가벼운 코미디, 드라마, 은은한 사회 풍자. 계획이 펼쳐지는 재미는 잃지 않는다.",
        "히로 카부라기 연출과 WIT STUDIO는 채도, 와이드 구도, 영화·재즈에 대한 눈길을 쓴다. (플래터스 명곡 제목을 떠올리는 트랙도 포함) 사운드가 ‘쇼’ 느낌을 키운다.",
      ],
    },
    es: {
      title: "Great Pretender",
      excerpt:
        "Great Pretender sigue a Makoto Edamura, estafador en Tokio, que acaba enredado en las operaciones de Laurent Thierry.",
      body: [
        "Great Pretender sigue a Makoto Edamura, estafador en Tokio, atrapado en el esquema de Laurent Thierry. Cada bloque monta un gran timo (Los Ángeles, Singapur, Londres, Tokio/Shanghái) con ritmo de capítulo de cine: ricazo, disfraces, giros, final que vuelve lo “obvio”. Tono: comedia ligera, drama, algo de crítica social sin dejar de disfrutar el plan.",
        "La puesta de Hiro Kaburagi y el dibujo de Wit Studio se apoyan en color saturado, plano abierto, guiños al cine y al jazz; el tema sonoro (y el guiño al título de The Platters) subraya la idea de espectáculo.",
      ],
    },
    ja: {
      title: "Great Pretender",
      excerpt:
        "江村誠、東京の詐欺師。ロラン・ティエリの一連の作戦に巻き込まれる。",
      body: [
        "江村誠、東京の詐欺師が、ロラン・ティエリの一連の“仕事”に引きずり込まれる。各ブロック（ロサンゼルス、シンガポ、ロンドン、東京/上海）が映画の一編のような大がかりな手口：金持ち、変装、どんでん返し、一見自明のものをひっくり返す結末。コメディ、ドラマ、少し社会批評。だが“だまし合い”を見る面白さは損なわれない。",
        "鏑木宏の演出とWITの絵作りは彩度、ワイド、映画・ジャズ的参照。サウンド（The Plattersのタイトル曲を連想させる曲も含む）が「ショー」の感覚を補う。",
      ],
    },
    de: {
      title: "Great Pretender",
      excerpt:
        "Great Pretender folgt dem Trickbetrüger Makoto Edamura in Tokio, der in die Operationen von Laurent Thierry hineinzieht.",
      body: [
        "Great Pretender folgt Makoto Edamura, einem Betrüger in Tokio, hinein in die Coups von Laurent Thierry. Jeder Block setzt ein großes Stück (Los Angeles, Singapur, London, Tokio/Shanghai) im Kapitel-Tempo mit Film-Atem: wohlhabende Ziele, Tarnung, Wendungen, Finalem, das oft umkehrt, was klar wirkte. Mischton: leichtere Komik, Drama, etwas Gesellschaftskritik, ohne die Freude, dem Plan zuzusehen, zu verlieren.",
        "Hiro Kaburagis Führung und WIT-Studios Bildsprache setzen auf gesättigte Farbe, weite Bildausschnitte, Nods zu Film und Jazz; die Soundkulisse (u. a. ein Song, der an The Platters’ Titel anknüpft) stützt die Idee von Aufführung.",
      ],
    },
    fr: {
      title: "Great Pretender",
      excerpt:
        "Great Pretender suit Makoto Edamura, arnaqueur à Tokyo, entraîné dans les opérations de Laurent Thierry.",
      body: [
        "Great Pretender suit Edamura à Tokyo, entraîné par Laurent Thierry. Chaque bloc bâtit une grosse arnaque (LA, Singapour, Londres, Tokyo/Changhai) rythmée comme un chapitre de film: gros lot, travestis, retournements, finale qui bouscule l’évident. Tonalité: comédie, drame, une pointe de critique, sans renoncer au plaisir de la mécanique.",
        "Hiro Kaburagi et WIT optent couleurs vives, plans larges, références film et jazz; la bande-son, dont un titre qui rappelle le classique de The Platters, renforce l’idée de spectacle.",
      ],
    },
    it: {
      title: "Great Pretender",
      excerpt:
        "Great Pretender segue Makoto Edamura, truffatore a Tokyo, trascinato nelle operazioni di Laurent Thierry.",
      body: [
        "Great Pretender segue Makoto Edamura, truffatore a Tokyo, risucchiato dalle operazioni di Laurent Thierry. Ogni blocco monta una grande fregatura (LA, Singapore, Londra, Tokyo/Shanghai) con respiro da capitol film: preda ricca, travestimenti, svolte, chiusura che rimescola l’ovvio. Commedia leggera, dramma, accenno di critica, senza perdere il gusto a seguire il tranello.",
        "Kaburagi e WIT puntano a colori saturi, inquadrature largi, cenni a cinema e jazz; la colonna, anche un pezzo che richiama il classico The Platters, sostiene l’idea di rappresentazione.",
      ],
    },
    "zh-CN": {
      title: "Great Pretender",
      excerpt:
        "《Great Pretender》跟随东京诈欺师江村诚，他卷入到罗兰·提耶里的连环运作之中。",
      body: [
        "《Great Pretender》跟随江村诚，在东京的诈欺师，被拉进罗兰·提耶里的一串计划。分块以洛杉矶、新加坡、伦敦、东京/上海为舞台，大骗局像电影章节：有钱的目标、变装、反转、结局常把看起来理所当然的事掀翻。轻喜、正剧、一点社会指涉，不失去看骗局展开的快感。",
        "镝木宏的执导与 WIT 的作画，强调饱和、宽景、对电影与爵士的致敬；原声带（含令人联想到 The Platters 名曲的曲目）也强化“秀”的感觉。",
      ],
    },
    "zh-TW": {
      title: "Great Pretender",
      excerpt:
        "《Great Pretender》跟江村誠在東京的騙局人生，最後攪進羅倫·提耶的計畫。",
      body: [
        "跟江村誠，在東京的騙子，被掃進羅倫·提耶的一連串佈局。幾大段在洛杉磯、星國、倫敦、東京/上海，節拍像小說/電影章那樣的長騙局：有錢的獵物、變身、大翻轉，結局常把一開始覺得明白的事全掀掉。一點喜劇、一點戲、一點社會，但不把看佈陣鋪開的樂趣丟掉。",
        "鏑木宏＋WIT 作畫是飽和色、寬景、向電影和爵士的視覺參考；聲帶也（含一軌令人想到 The Platters 題名的那種）在撐“秀場”感。",
      ],
    },
  },
  "cowboy-bebop": {
    en: {
      title: "Cowboy Bebop",
      excerpt:
        "Cowboy Bebop follows Spike Spiegel and Jet Black aboard the Bebop, hunting criminals in a future where Earth is partly abandoned and the solar system becomes a stage of migration, precarity, and scattered violence.",
      body: [
        "Cowboy Bebop follows Spike Spiegel and Jet Black aboard the Bebop, hunting criminals in a future where Earth is partly abandoned and the solar system becomes a stage of migration, precarity, and scattered violence. Faye Valentine, Ed, and Ein join the crew, a group less united than provisionally cohabiting, with leftover pasts and unstable bonds.",
        "Each episode can feel like Western, noir, comedy, science fiction, or existential drama, yet the show keeps a very distinct voice. The direction is spare and cinematic; the art leans on color, framing, and silence; and Yoko Kanno’s work with the Seatbelts—jazz, blues, bebop, rock—is not just accompaniment but a central part of the rhythm. The result is a melancholy, stylized anime fully aware that past, solitude, and regret rarely close neatly.",
      ],
    },
    ko: {
      title: "카우보이 비밥",
      excerpt:
        "스파이크 스피겔과 젯 블랙이 베밥을 타고, 지구가 일부 황폐한 미래에서 태양계를 떠도는 악당을 쫓는 이야기.",
      body: [
        "지구를 일부 떠난 인류, 태양계가 이주·빈곤·흩어진 폭력의 배경이 된다. 스파이크와 젯, 현상금 ‘카우보이’로 범죄자를 잡는다. 뒤이어 페이, 에드, 아인이 끼며, 이들은 ‘한 팀’이라기보다 임시로 같이 사는, 과거의 찌꺼기와 불안한 인연만 있다.",
        "에피소드마다 서부, 누아르, 코미디, SF, 실존극 느낌이 갈리지만, 작품의 정체는 또렷하다. 절제·시네마 연출, 색·구도·침묵, Yoko Kanno와 The Seatbelts의 재즈, 브루스, 비밥, 록은 BGM이 아니라 박의 중심이다. 멜랑콜리하되 절제되고, 과거·고독·후회는 깨끗이 묶이지 않는 쪽이 자연스럽다.",
      ],
    },
    es: {
      title: "Cowboy Bebop",
      excerpt:
        "Cowboy Bebop sigue a Spike Spiegel y Jet Black en la Bebop, cazarecompensas en un futuro donde la Tierra quedó en parte deshabitada y el sistema solar es desplazamiento, precariedad y violencia difusa.",
      body: [
        "Cowboy Bebop sigue a Spike Spiegel y Jet Black a bordo de la Bebop, cazando criminales en un futuro en que la Tierra quedó en parte abandonada y el sistema solar se hace marco de movimiento, precariedad, violencia esparcida. Aparecen Faye Valentine, Ed y Ein, un grupo menos unido que conviviendo a la intemperie, con sobras de pasado y lazos inestables.",
        "Cada capítulo es casi western, noir, comedia, ciencia ficción o drama existencial, y aun así la serie mantiene una voz muy suya. Dirección sobria, casi fílmica; imágenes que apuestan a color, encuadre y silencio; y el trabajo de Yoko Kanno con the Seatbelts, jazz, blues, bebop, rock, no de fondo sino como corazón del pulso. Resultado: un anime melancólico y de estilazo, consciente de que pasado, soledad y arrepentimiento rara vez se cierran con llave.",
      ],
    },
    ja: {
      title: "カウボーイビバップ",
      excerpt:
        "未来の太陽系。地球は一部焼かれ、人は移住と不安定、暴力が漂う。宇宙船『ビバップ号』のスパイクとジェットが、賞金首を追う。",
      body: [
        "未来の太陽系。地球の一部放棄、人の移住と不安定、暴力。スパイク・スピーゲルとジェット・ブラックはビバップ号で手配犯を追う。フェイ、エド、アインと合わさり、一つの『家族』といより、仮住まい、過去の残り、揺らぐ仲だ。",
        "話は西部、フィルムノワール、コメディ、SF、実存めいて変わるが、作品の面影は一つ。表現は抑え、シネマティック。色、フレーミング、静けさ。Yoko Kanno＋Seatbeltsのジャズ、ブルース、ビバップ、ロックは添え物でなく、リズムの芯。哀しみ、様式、過去・孤独・悔いをきれいに片づけない自覚がある。",
      ],
    },
    de: {
      title: "Cowboy Bebop",
      excerpt:
        "Cowboy Bebop folgt Spike Spiegel und Jet Black an Bord der Bebop, Kopfgeldjägern in einer Zukunft, in der die Erde teilweise verlassen ist und das Sonnensystem zu Bühne von Migration, Prekarität, zerstreuter Gewalt wird.",
      body: [
        "Cowboy Bebop begleitet Spike und Jet, Verbrecherjagd in einer Zukunft mit teilweise entvölkelter Erde, Sonnensystem als Szene von Migration, prekären Verhältnissen, flächiger Gewalt. Faye, Ed, Ein stößen dazu, weniger enge Truppe als vorläufiges Miteinander, Reste von vergangenem, wackeligen Bindungen.",
        "Folge für Folge schlägt’s nach Western, Noir, Komik, Science-Fiction, Existentiellem, bleibt aber unverwechselbar. Regie zurückhaltend, filmisch; Farbe, Bildausschnitt, Stille; Yoko Kanno und die Seatbelts bedienen den Puls, nicht der Nebenspur. Eher melancholisch, selbst stilvoll, mit dem Wissen, dass Vergangenheit, Einsamkeit, Reue selten lösbar sind.",
      ],
    },
    fr: {
      title: "Cowboy Bebop",
      excerpt:
        "Cowboy Bebop suit Spike Spiegel et Jet Black à bord du Bebop, chassant des criminelles et criminels dans un futur où la Terre est en partie laissée à l’abandon et le système solaire devient migration, précarité, violence diffuse.",
      body: [
        "Ils chassent des têtes, Terre en partie quittée, Système solaire comme théâtre d’exil, d’infortune, d’agressions éparses. Puis Faye, Ed, Ein, davantage cohabitation que famille, reliquats de vies, liens bancals.",
        "L’épisode penche western, noir, comédie, SF, mélodrame, sans cesser d’avoir un timbre propre. Mise en scène sobre, peinture, cadrage, silence; le travail de Yoko Kanno et des Seatbelts, jazz, blues, bebop, rock, nourrit vraiment le rythme. C’est mélancolique, sec, conscient que le passé, l’écart, le regret se ferment rarement proprement.",
      ],
    },
    it: {
      title: "Cowboy Bebop",
      excerpt:
        "Cowboy Bebop segue Spike Spiegel e Jet Black sulla Bebop, a cacciare taglie in un futuro in cui la Terra è in parte lasciata a sé e il sistema solare diventa spostamento, precarietà, violenza diffusa.",
      body: [
        "A bordo, ricerca di taglie, Terra in parte abbandonata, Sistema come scena di migrazione, precarità, violenza sparsa. Poi Faye, Ed, Ein, gruppo più da convivenza d’occasione che famiglia, residui, legami instabili.",
        "A puntata, odore di Western, noir, farsa, fantascienza, dramma, senza perdere un’impronta. Regia tesa, cine, colore, inquadrature, silenzio, e la musica con Yoko Kanno e i Seatbelts, jazz, blues, bebop, rock, non da contorno, ma battito. Esito: anime in tono malinconico, consapevole che passato, solitudine, rimpianti non s’archiviano facilmente.",
      ],
    },
    "zh-CN": {
      title: "星际牛仔",
      excerpt:
        "《星际牛仔》中，斯派克与杰特驾驶飞船贝波普，在地球部分荒废、人类迁往太阳系的未来里追捕赏金要犯。",
      body: [
        "地球在某种程度被弃置，太阳系的迁徙、匮乏与四散的暴力构成背景。斯派克、杰特以“牛仔”式赏金猎人行事；随后有菲、艾德、爱因加入，这伙人更似临时共处，被过去的残留与不稳定的牵系绑着。",
        "各集在西部、黑色电影、喜剧、科幻、存在式戏剧之间变奏，却仍保持强烈辨识度。构图克制、镜头电影感、色彩、留白；菅野洋子与 Seatbelts 的爵士、蓝调、比波普、摇滚不只是陪衬，而是节拍的核。结果是忧郁而造型意识极强的作品，清楚知道过去、孤独与悔意难被一笔勾销。",
      ],
    },
    "zh-TW": {
      title: "星際牛仔",
      excerpt:
        "《Cowboy Bebop》中，史派克和傑在貝鋼菲特號上，於地球被局部放棄、人類在太陽系中漂流與不穩的未來，獵補通緝犯。",
      body: [
        "在地球人部分離去、遷移與不穩、暴力飄在四方的前提下，兩人做賞金工作。之後有菲、艾德、因加入；與其說一夥人，更像暫時同船，帶殘影的過去與不牢靠的關係。",
        "每集像西部、黑色喜劇、科幻想像或存在戲劇的混合，卻從不丟自己的聲部。導戲內斂、偏電影、注意色、框、靜音；Yoko Kanno 與 Seatbelts 的爵士、藍調、比博普、搖滾不是牆上音樂，是節律本身。是憂傷、有型、明白過去與遺憾難一筆劃去的那種。",
      ],
    },
  },
  "stanford-psychology-podcast": {
    en: {
      title: "Stanford Psychology Podcast",
      excerpt:
        "The Stanford Psychology Podcast spotlights research in psychology through long conversations between hosts and guests in areas such as cognition, emotion, development, neuroscience, and social behavior.",
      body: [
        "The Stanford Psychology Podcast spotlights research in psychology through long conversations between hosts and guests in areas such as cognition, emotion, development, neuroscience, and social behavior. Episodes usually turn on current lines of work, research methods, and theoretical questions, in a format longer than a quick pop-sci interview.",
        "The value is the balance of rigor and access: the show works well for following debates and topics in contemporary psychology without staying only in very short summaries. On the official site and newsletter you can find the episode archive and links to listen on several platforms.",
      ],
    },
    ko: {
      title: "Stanford Psychology Podcast",
      excerpt:
        "스탠퍼드 심리학 팟캐스트. 인지, 정서, 발달, 신경과학, 사회적 행동 등을 다루는, 호스트·게스트의 긴 대담.",
      body: [
        "스탠퍼드 심리학 팟캐스트는 인지, 정서, 발달, 신경과학, 사회적 행동 등에 관한 심리 연구를, 호스트와 게스트의 긴 대담으로 풀어 냅니다. 단편의 대중 과학 인터뷰보다, 최근의 연구선, 방법, 이론적 쟁점에 더 맞닿는 편입니다.",
        "엄밀함과 읽기 쉬움의 균형이 강점입니다. 짧은 요약에만 머물지 않고 당대 심리의 논의와 주제를 끌고 가기에 좋습니다. 공식 사이트·뉴스레터에서 아카이브와 여러 플랫폼 링크를 볼 수 있습니다.",
      ],
    },
    es: {
      title: "Stanford Psychology Podcast",
      excerpt:
        "El Stanford Psychology Podcast divulga investigación en psicología con conversaciones largas entre anfitriones e invitados de áreas como cognición, emoción, desarrollo, neurociencia y conducta social.",
      body: [
        "Conversan sobre líneas de trabajo, métodos y cuestiones teóricas, con más tiro que una entrevista de divulgación relámpago. El enfoque es seguir el debate, no un resumen de dos minutos.",
        "El atractivo es equilibrar rigor y lectura. Sirve quien quiera acompañar el pulso de la psicología actual. En el sitio y en la newsletter está el archivo y los enlaces para oír en otras plataformas.",
      ],
    },
    ja: {
      title: "Stanford Psychology Podcast",
      excerpt:
        "スタンフォード大の心理学系ポッドキャスト。認知、感情、発達、神経、社会行動のゲストを迎え、長い対談で研究の話を聞かせる。",
      body: [
        "認知、感情、発達、神経、社会行動。話題の中心は、今の研究ライン、手法、理論的問い。短い流行りの啓蒙インタビューというより、じっと腰を据えた形に近い。",
        "厳密さと分かりやすさのバランス。短い要約の外で、当世の心理の討議やテーマを追うのに向いている。公式とニュースレターに、エピソード一覧と多様な再生先の導線がある。",
      ],
    },
    de: {
      title: "Stanford Psychology Podcast",
      excerpt:
        "Der Stanford Psychology Podcast stellt psychologische Forschung in langen Gesprächen mit Gäst·innen zu Kognition, Emotion, Entwicklung, Neurowissenschaften und sozialem Verhalten vor.",
      body: [
        "Die Folgen kreisen oft um laufende Forschungslinien, Methoden, theoretische Streitpunkte, in einem deutlich längeren Format als schnelle Pop-Science-Interviews.",
        "Der Sitz zwischen Tiefgang und Zugang: man kann Debatten und Themen der gegenwärtigen Psychologie folgen, ohne ausschließlich auf Häppchen-Resümees zu hängen. Im offiziellen Feed/Newsletter liegen Archiv und Links zu vielen Hör-Apps.",
      ],
    },
    fr: {
      title: "Stanford Psychology Podcast",
      excerpt:
        "Le Stanford Psychology Podcast sert de vitrine à la recherche en psychologie via de longs entretiens entre animateurs·rices et invité·es en cognition, émotion, développement, neurosciences, comportement social.",
      body: [
        "Les discussions portent plutôt sur des lignes de travail, méthodes, questions théoriques, dans un format beaucoup plus long qu’un flash divulgatif.",
        "L’enjeu est d’allier exigence et clarté: on peut suivre l’agenda d’échanges et thèmes de la psychologie actuelle. Site officiel et infolettre fournissent l’archive et liens d’écoute sur plusieurs plateformes.",
      ],
    },
    it: {
      title: "Stanford Psychology Podcast",
      excerpt:
        "Lo Stanford Psychology Podcast presenta la ricerca in psicologia in conversazioni lunghe con ospiti di aree come cognizione, emozione, sviluppo, neuroscienze, comportamento sociale.",
      body: [
        "Le puntate vanno per linee di lavoro, strumenti, nodi teorici, con un’ampiezza oltre l’intervista divulgativa brevissima.",
        "C’è equilibrio tra rigore e accesso: adatto a non restare a riassunti da 60 secondi, ma a seguire dibattito e temi. Sul sito e in newsletter, archivio e link a più piattaforme d’ascolto.",
      ],
    },
    "zh-CN": {
      title: "斯坦福心理学播客",
      excerpt:
        "《斯坦福心理学播客》以较长对话，请嘉宾讨论认知、情绪、发展、神经科学与社会行为等领域的心理研究。",
      body: [
        "节目围绕前沿研究、方法、理论问题展开，体量大过一两分钟的快访科普。",
        "在严谨与可读之间做平衡，适合想跟进当代心理议题而不满足于极简摘要的听众。官网与通讯中有节目存档与多平台收听链接。",
      ],
    },
    "zh-TW": {
      title: "史丹佛心理學 Podcast",
      excerpt:
        "《Stanford Psychology Podcast》用比較長的對談，談認知、情緒、發展、神經科學、社會行為等心理研究。",
      body: [
        "內容多半落在當前研究脈絡、方法、理論，篇幅明顯大於兩分鐘速覽的科普。",
        "在嚴謹與好懂之間抓平衡。想持續跟當代心理學的討論、又不想停在極短摘要的，會覺得合用。站與電子報有存檔與多平臺的收聽連結。",
      ],
    },
  },
  "the-twilight-zone": {
    en: {
      title: "The Twilight Zone (1959–1964)",
      excerpt:
        "The Twilight Zone is a black-and-white anthology series: each episode is a self-contained story, often with a twist, crossing science fiction, horror, fantasy, and social satire.",
      body: [
        "The Twilight Zone is a black-and-white anthology series: each episode is a self-contained story, often with a twist, crossing science fiction, horror, fantasy, and social satire. Rod Serling was a core writer, host, and the program’s “voice”; the tone blends literary gravity with the lean drama of 1960s TV, while still smuggling political metaphor and a critique of conformity and the fears of the era.",
        "The original run spans five seasons; later came revivals in the 1980s, 2000s, and a 2010s run with Jordan Peele.",
      ],
    },
    ko: {
      title: "The Twilight Zone (1959–1964)",
      excerpt:
        "흑백의 시리즈 단편. 한 편씩 끊긴 이야기, 흔히 뒤늦은 반전, SF·호러·판타지·사회 풍자가 겹친다.",
      body: [
        "흑백의 옴니버스. 매 화는 독립, 종말 흔히 꺾이며, SF, 공포, 판타지, 사회 풍자를 섞는다. 로드 셀링이 핵심의 글, 진행, ‘목소리’다. 60년대 TV의 잘린 드라마와 음산한 문장, 그 밑으로 정치 은유, 동조, 당시의 공포. ",
        "초기 시리즈는 5시즌. 80, 00, 10년대(조던 필)로 이어지는 리부트가 뒤따른다.",
      ],
    },
    es: {
      title: "The Twilight Zone (1959–1964)",
      excerpt:
        "The Twilight Zone es antológica, en blanco y negro: cada capítulo es un relato aislado, a menudo con sorpresa final, mezclando ciencia ficción, terror, fantasía, sátira social.",
      body: [
        "Cada relato, giro, cruces de género. Rod Serling, pluma, presentación, voz, entre peso de escritura y teledrama breve, con crítica encubierta: política, conformidad, pánico del clima social.",
        "Cinco temporadas de la tanda clásica; reediciones 1980, 2000, 2010, una de las cuales involucra a Jordan Peele.",
      ],
    },
    ja: {
      title: "The Twilight Zone (1959–1964)",
      excerpt:
        "白黒のオムニバス。各話独立、多くはどんでん、SF、ホラー、幻想、風刺。",
      body: [
        "各話、独立、手堅い反転。ロッド・セーリング執筆、司会、声。60年代の短い劇、文学の圧。政治、同調、恐怖の隠喩。",
        "初期五季。以後、80、00、10年代の再演。一つにジョーダン・ピール。",
      ],
    },
    de: {
      title: "The Twilight Zone (1959–1964)",
      excerpt:
        "Anthologieserie, s/w, jede Folge für sich, oft Spannungsbogen, Mischform SF, Schauer, Märchen, Zynismus.",
      body: [
        "Serling, Wort, Bühne, Klang, knapp, und doch dicht, Metapher, Befehl und Drang, Epochenangst, subtextpolitisch. ",
        "Fünf Staffeln der Urserie, danach 80, 00, 10, darunter Verbindung zu Jordan Peele. ",
      ],
    },
    fr: {
      title: "The Twilight Zone (1959–1964)",
      excerpt:
        "Série noire, blanc, chaque soir un feuilleton, fin souvent tournante, mélange science, effroi, merveilleux, ironie de mœurs.",
      body: [
        "Serling, plume, présentation, timbre, court, dense, l’ombre des idées, le poids du moment, l’envers des lois, peur, satire. ",
        "Cinq volets classiques, puis 80, 00, 10, dont une piste proche de Jordan Peele. ",
      ],
    },
    it: {
      title: "The Twilight Zone (1959–1964)",
      excerpt:
        "Antologia bianco e nero, puntata a sé, spesso coda, genere misto: fantascienza, orrore, strano, sberleffo al costume.",
      body: [
        "Serling, testi, conduzione, suono, brevità, tensione, metafora, critica, paure, ironia, contesto, società, conformismo, satira. ",
        "Cinque atti originali, ritorni ottanta, duemila, duemiladieci, con eco Jordan Peele. ",
      ],
    },
    "zh-CN": {
      title: "《迷离时空》(1959–1964)",
      excerpt:
        "《迷离时空》是黑白选集剧，每集一则，常带意外结局，融科幻、恐怖、奇幻、社会讽喻。",
      body: [
        "罗德·塞林主笔、主持、语声。文学与六十年代电视的凝练剧力并存，夹带政治喻示、对顺从、时代之惧的批评。",
        "原版五季。后有八零、两千年、一零年代的续作与重拍，一版与乔丹·皮尔有关。",
      ],
    },
    "zh-TW": {
      title: "The Twilight Zone（1959–1964）",
      excerpt:
        "《陰陽魔界》黑白、單元、常見結尾一翻。科幻、恐怖、奇幻、社諷。",
      body: [
        "羅德·塞林是筆、是主持、是節氣的聲。有文孮味，也有六○年代小螢幕的緊，底下藏政治、從眾、怕。",
        "原版五季。後有八○、兩千、一○年代的重起，一條線有 Jordan Peele 的影子。",
      ],
    },
  },
  ...batch2Tail,
};

fs.writeFileSync(out, JSON.stringify(data, null, 2) + "\n", "utf8");
console.log("Wrote", out, Object.keys(data).length, "slugs (partial; extend script).");
