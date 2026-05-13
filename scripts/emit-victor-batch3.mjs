import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import more from "./batch3-rest.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = join(__dirname, "../data/victor-post-i18n/batch-3.json");

/* eslint-disable @stylistic/max-len -- generated i18n bundle */
const BUNDLE = {
  "youtube-playlist-okcjg": {
    en: {
      title: "EELF compilation",
      excerpt:
        "EELF is a channel for lo-fi house and more underground house, known for both curation and a very distinctive visual identity.",
      body: [
        "EELF is a channel for lo-fi house and more underground house, known for both curation and a very distinctive visual identity.",
        "Underground / lo-fi house names a less polished, more textural take on house: repetitive beats, hazy pads, nostalgic chords, and deliberate noise and roughness that give the music a nearly analog warmth.",
        "In EELF, the visuals often look like memory footage: grainy video, glides through the city, fragments, melancholy images that do not quite tell a story but build a mood. They work as an extension of the music—less illustration than feeling.",
      ],
    },
    ko: {
      title: "EELF 모음",
      excerpt:
        "EELF는 로파이 하우스와 지하 쪽 하우스를 흐르게 하는 채널로, 큐레이션뿐 아니라 꽤 독특한 시각적 정체성으로도 알려져 있다.",
      body: [
        "EELF는 로파이 하우스와 지하 쪽 하우스를 흐르게 하는 채널로, 큐레이션뿐 아니라 꽤 독특한 시각적 정체성으로도 알려져 있다.",
        "지하/로파이 하우스는 하우스의 덜 광택, 더 질감 있는 변형을 가리킨다: 반복 비트, 안개 같은 패드, 향수에 젖은 화음, 음악에 거의 아날로그 같은 온기를 주는 의도된 노이즈와 거칠기.",
        "EELF의 영상은 종종 기억의 푸티지처럼 보인다: 입자 있는 영상, 도시를 스치는 주행, 조각, 이야기를 딱 말해주지는 않지만 분위기를 쌓는 멜랑콜릭한 이미지. 그것들은 음악의 연장—덜 ‘설명’이고 더 ‘느낌’이다.",
      ],
    },
    es: {
      title: "Compilación EELF",
      excerpt:
        "EELF es un canal ligado al lo-fi house y a la house más underground, tanto por su curaduría como por una identidad visual muy propia.",
      body: [
        "EELF es un canal ligado a la circulación de lo-fi house y house underground, reconocible tanto por la curaduría como por una identidad visual muy propia.",
        "Lo underground / lo-fi house designa un estilo de house menos pulida y más texturizada: ritmos repetitivos, pads brumosos, acordes nostálgicos, ruido e imperfecciones que dan a la música un calor casi análogo.",
        "En EELF, las imágenes suenan a archivo de recuerdo: video granulado, traslados, fragmentos urbanos y imágenes melancólicas que no relatan, sino levantan atmósfera. Prolongan la música, menos ilustración que sensación.",
      ],
    },
    ja: {
      title: "EELFコンピレーション",
      excerpt:
        "EELFは、ローファイ・ハウスとより地味（アンダーグラウンド）なハウスを流すチャンネルで、選曲と独特のビジュアル・アイデンティティの両方で知られる。",
      body: [
        "EELFは、ローファイ・ハウスとより地味（アンダーグラウンド）なハウスに関わるチャンネルで、キュレーションと一線を画すビジュアルの双方で知られる。",
        "アンダーグラウンド／ローファイ・ハウスは、ポリッシュよりも質感：反復的ビート、霞んだパッド、郷愁のコード、意図的なノイズと粗さが、ほぼアナログのぬくみを与える。",
        "EELFでは、映像は思い出の断片のように出る。粒子の付いた動画、都市の擦過、メランコリーな像は物語を語るというより、空気を作る。音楽の延長—イラストより感覚。",
      ],
    },
    de: {
      title: "EELF-Kompilation",
      excerpt:
        "EELF ist ein Kanal um Lo-Fi-House und eher Under-House, bekannt für Curation und eine sehr eigene visuelle Identität.",
      body: [
        "EELF ist ein Kanal um die Verbreitung von Lo-Fi- und eher undergründigem House, bekannt für Curation und eine deutlich eigene visuelle Identität.",
        "‘Underground / lo-fi house’ bezeichnet eher rau, texturstarke House-Stile: repetitive Beats, neblige Pads, nostalgische Akkordlagen, bewusstes Rauschen und Rauheit mit fast analog wirkender Wärme.",
        "In EELF wirken Szenen oft wie Speichermedien-Archiv: körniges Video, Verschiebungen, urbane Bruchstücke, melancholische Bilder, die eher atmosphärisch denn erzählend sind—Erweiterung der Musik, weniger Illustration als Gefühl.",
      ],
    },
    fr: {
      title: "Compilation EELF",
      excerpt:
        "EELF est une chaîne liée au lo-fi house et à une house plus souterraine, connue pour sa curation et son identité visuelle très tranchée.",
      body: [
        "EELF est un canal tourné vers le lo-fi house et une house plus souterraine, repérable autant par la curation qu’par une identité visuelle propre.",
        "Le under / lo-fi house couvre un house moins lisse, plus travaillé en matière : rythmes répétitifs, pads vaporeux, accords nostalgiques, bruits et imperfection qui confèrent une chaleur presque analogique.",
        "Chez EELF, l’image ressemble souvent à de l’archives de mémoire : granuleux, transits urbains, morceaux mélancoliques qui bâtissent l’humeur plutôt qu’une histoire. Prolongation de la musique—moins illustration, plus sensation.",
      ],
    },
    it: {
      title: "Compilazione EELF",
      excerpt:
        "EELF è un canale del lo-fi house e di house più underground, conosciuto per la curatela e un’identità visiva assai riconoscibile.",
      body: [
        "EELF è un canale per lo-fi house e house più sotterranea, noto tanto per la cura dei contenuti quanto per un’identità visiva assai distintiva.",
        "L’under / lo-fi house indica un house meno liscio, più lavorato sul materiale: battiti ripetitivi, pad nebbiosi, accordi nostalgici, rumore e imperfezioni che danno un calore quasi analogico.",
        "In EELF, le immagini sembrano spesso archivio del ricordo: video sgranato, attraversamenti urbani, schegge malinconiche che sospendono l’atmosfera, non un racconto. Estensione della musica, meno illustrazione che sensazione.",
      ],
    },
    "zh-CN": {
      title: "EELF 合辑",
      excerpt:
        "EELF 是一个与低保真 house 与更地下的 house 相关的频道，以选曲和非常独特的视觉语言著称。",
      body: [
        "EELF 是一个与低保真 house 与更地下的 house 音乐流通相关的频道，以策展与很鲜明的视觉风格著称。",
        "地下 / 低保真 house 指更粗糙、更有质地的 house 分支：循环节拍、朦胧铺底、怀旧和弦、刻意的噪声与瑕疵，为音乐带来近乎模拟的温暖。",
        "在 EELF 中，画面常像记忆的档案：颗粒化视频、滑动、城市场景的碎片、忧郁的影像，并不在讲故事，而更像营造氛围。它们是音乐的延伸，与其说是插图，不如说是感觉。",
      ],
    },
    "zh-TW": {
      title: "EELF 合輯",
      excerpt:
        "EELF 是與 lo-fi house 和更地下的 house 有關的頻道，以策展和非常鮮明的視覺辨識度聞名。",
      body: [
        "EELF 是與低保真 house 和更地下的 house 有關的頻道，在策展和非常清晰的視覺風格上都讓人印象深刻。",
        "地下／低保真 house 指較不拋光、重質感的 house：反覆節拍、霧面 pad、思鄉和弦、刻意的雜訊與不完美的邊，聽起來像類比般的溫度。",
        "在 EELF，影像常像回憶檔：帶顆粒的影片、滑移、城市碎片、憂鬱畫面，不講一個明確故事，卻在堆疊氣圍。是音樂的延長，較不像是插圖，而較是感覺。",
      ],
    },
  },
  "hey-who-really-cares-lowertown": {
    en: {
      title: "Hey, Who Really Cares? — song by Linda Perhacs (Lowertown cover)",
      excerpt:
        "A Lowertown cover. It just showed up in my recommendations, but something in it works.",
      body: [
        "A Lowertown cover. It just showed up in my recommendations, but something in it works.",
      ],
    },
    ko: {
      title: "Hey, Who Really Cares? — Linda Perhacs(로우어타운 커버)",
      excerpt:
        "로우어타운 커버. 그냥 추천에 떴는데, 뭔가 있다.",
      body: [
        "로우어타운의 커버. 그냥 추천에 떴는데, 뭔가 먹힌다.",
      ],
    },
    es: {
      title: "Hey, Who Really Cares? — canción de Linda Perhacs (cubierta de Lowertown)",
      excerpt:
        "Cubierta de Lowertown. No sé, apareció en mis recomendados, tiene algo que engancha.",
      body: [
        "Cubierta de Lowertown. Apareció en mis recomendados, tiene algo que pega.",
      ],
    },
    ja: {
      title: "Hey, Who Really Cares? — Linda Perhacs（ロウアータウン・カバー）",
      excerpt:
        "ロウアータウンのカバー。流れでおすすめに出ただけだけど、なにか引っかかる。",
      body: [
        "ロウアータウンのカバー。流れでおすすめに出たが、何か引っかかる。",
      ],
    },
    de: {
      title: "Hey, Who Really Cares? — Linda Perhacs (Cover von Lowertown)",
      excerpt:
        "Ein Lowertown-Cover. Wies auch immer zustande kam, es hat etwas an sich.",
      body: [
        "Ein Lowertown-Cover. Wies in den Empfehlungen auftauchte, es klickt trotzdem irgendwie.",
      ],
    },
    fr: {
      title: "Hey, Who Really Cares? — Linda Perhacs (reprise de Lowertown)",
      excerpt:
        "Reprise de Lowertown. Sans savoir, ça a popé dans les suggestions, et ça tient le truc.",
      body: [
        "Reprise de Lowertown. Sans savoir, c’est arrivé dans les suggestions, et ça reste proche.",
      ],
    },
    it: {
      title: "Hey, Who Really Cares? — Linda Perhacs (cover di Lowertown)",
      excerpt:
        "Cover dei Lowertown. È finita nelle raccomandazioni, ma ha qualcosa sotto.",
      body: [
        "Cover di Lowertown. È finita tra i consigliati, ma ha qualcosa sotto che tiene.",
      ],
    },
    "zh-CN": {
      title: "Hey, Who Really Cares? —琳达·佩哈克斯 / Lowertown 翻唱",
      excerpt: "Lowertown 的翻唱。不知道为何出现在推荐里，但挺对味。",
      body: [
        "Lowertown 的翻唱。也不知道怎么就出现在推荐里，但里面有点什么对上了。",
      ],
    },
    "zh-TW": {
      title: "Hey, Who Really Cares? —Linda Perhacs（Lowertown 翻唱）",
      excerpt: "Lowertown 的翻唱。不曉得怎麼就進了推薦，但有點東西。",
      body: [
        "Lowertown 的翻唱。不曉得怎麼就跑到推薦，但有點什麼對了。",
      ],
    },
  },
  "1041uuu-galeria": {
    en: {
      title: "1041uuu gallery",
      excerpt: "https://1041uuu.jp/ brings together 1041uuu’s work—a Japanese artist focused mainly on pixel art.",
      body: [
        "https://1041uuu.jp/ brings together 1041uuu’s work—a Japanese artist focused mainly on pixel art. The site is less a conventional portfolio than an exhibition room: a place to move through images, small series, and little visual environments at your own pace, and to follow a recurring imagination that also keeps shifting.",
      ],
      imageAlt:
        "1041uuu pixel art — as shared on Tumblr (tumblr_ab3b87a6b0a2582c0a8a379ddb37d849_71a1b5fb_500-1)",
    },
    ko: {
      title: "1041uuu 전시",
      excerpt:
        "https://1041uuu.jp/ 에 1041uuu의 갤러리가 모인다. 주로 픽셀 아트를 다루는 일본의 작가.",
      body: [
        "https://1041uuu.jp/ 는 주로 픽셀 아트에 기대는 일본 작가 1041uuu의 갤러리를 모은 곳이다. 흔한 포트폴리오라기보다는 전시 공간: 이미지와 짧은 시리즈, 작은 시각적 환경을 제 속도로 걷듯 둘러가며, 반복되고 동시에 변해 가는 상상의 선을 느끼게 해 준다.",
      ],
      imageAlt:
        "1041uuu 픽셀 아트 — 텀블러에 공유된 이미지 (tumblr_ab3b87a6b0a2582c0a8a379ddb37d849_71a1b5fb_500-1)",
    },
    es: {
      title: "Galería 1041uuu",
      excerpt:
        "https://1041uuu.jp/ reúne la galería de 1041uuu, un artista japonés que trabaja sobre todo con pixel art.",
      body: [
        "https://1041uuu.jp/ reúne la galería de 1041uuu, un artista japonés que trabaja sobre todo con pixel art. El sitio funciona menos como portafolio al uso y más como un espacio de exhibición: un recorrido por imágenes, pequeñas series y ambientes visuales, al propio ritmo, siguiendo un imaginario constante y en mutación al unísono.",
      ],
      imageAlt:
        "Pixel art de 1041uuu — imagen compartida en Tumblr (tumblr_ab3b87a6b0a2582c0a8a379ddb37d849_71a1b5fb_500-1)",
    },
    ja: {
      title: "1041uuu展示室",
      excerpt: "https://1041uuu.jp/ には主にピクセルアートの作家 1041uuu の作品がまとまっている。",
      body: [
        "https://1041uuu.jp/ には、主にピクセルアートで活動する 1041uuu の作品が集められている。従来のポートフォリオというより、展示空間：画像や小さな連作、小さな視覚環境を、自分の歩幅で歩いていき、重なりつつ形を変えていく想像力の線に沿っていく場所。",
      ],
      imageAlt:
        "1041uuuのピクセルアート — Tumblr共有（tumblr_ab3b87a6b0a2582c0a8a379ddb37d849_71a1b5fb_500-1）",
    },
    de: {
      title: "1041uuu-Galerie",
      excerpt:
        "https://1041uuu.jp/ sammelt die Galerie der 1041uuu, eines japanischen Künstlers, der hauptsächlich Pixelart macht.",
      body: [
        "https://1041uuu.jp/ führt die Galerie des japanischen 1041uuu, der in erster Linie mit Pixelart arbeitet, zusammen. Die Seite trifft eher ins Ausstellungs- als in das reine Portfoliogehege: Durchbild, kleine Serien, kleinraumige Welten, im Tempo, und eine Fantasie, die sich in Variationen wiederholt und sich trotzdem wendet.",
      ],
      imageAlt:
        "1041uuu Pixelart — in Tumblr gepostet (tumblr_ab3b87a6b0a2582c0a8a379ddb37d849_71a1b5fb_500-1)",
    },
    fr: {
      title: "Galerie 1041uuu",
      excerpt:
        "https://1041uuu.jp/ rassemble la galerie de 1041uuu, artiste japonais tourné surtout vers le pixel art.",
      body: [
        "https://1041uuu.jp/ rassemble la galerie de 1041uuu, un artiste japonais tourné surtout vers le pixel art. Le site est moins un portfolio classique qu’une salle: parcours d’images, petites séries, petits environnements visuels, au rythme, et d’un imaginaire en variations récurrentes et changeantes en même temps.",
      ],
      imageAlt:
        "Pixel art 1041uuu — partagé sur Tumblr (tumblr_ab3b87a6b0a2582c0a8a379ddb37d849_71a1b5fb_500-1)",
    },
    it: {
      title: "Galleria 1041uuu",
      excerpt:
        "https://1041uuu.jp/ raccoglie la galleria di 1041uuu, un artista giapponese che lavora soprattutto in pixel art.",
      body: [
        "https://1041uuu.jp/ raccoglie la galleria di 1041uuu, un artista giapponese che lavora soprattutto in pixel art. Il sito suona di più come sala d’esposizione che come portfolio lineare: immagini, piccole serie, piccoli ambienti visivi al proprio passo, seguendo un’immaginazione che torna in varianti e si pliega nel tempo insieme.",
      ],
      imageAlt:
        "Pixel art 1041uuu — condivisa su Tumblr (tumblr_ab3b87a6b0a2582c0a8a379ddb37d849_71a1b5fb_500-1)",
    },
    "zh-CN": {
      title: "1041uuu 展厅",
      excerpt: "https://1041uuu.jp/ 汇集了以像素艺术为主的日本作者 1041uuu 的作品。",
      body: [
        "https://1041uuu.jp/ 汇集了 1041uuu 这位日本作者的作品，他主要以像素创作为主。这个站点不太像一般作品集，而更像一个展厅：按自己的节奏走览图像、短系列、小型视觉场域，并沿着反复出现又在变的想象线索前行。",
      ],
      imageAlt: "1041uuu 像素图 — 引自 Tumblr 分享 (tumblr_ab3b87a6b0a2582c0a8a379ddb37d849_71a1b5fb_500-1)",
    },
    "zh-TW": {
      title: "1041uuu 展示",
      excerpt: "https://1041uuu.jp/ 匯集以像素藝術為主軸的日本作者 1041uuu 的展示。",
      body: [
        "https://1041uuu.jp/ 匯集 1041uuu 的創作。這位日本作者多半以像素藝術為本。整個網站不太像常見作品集，而更像一個可散步的展場：圖像、小系列、小視覺空間，按自己的節奏走，並在反覆卻變化著的想像中延續。",
      ],
      imageAlt: "1041uuu 像素圖 — Tumblr 分享 (tumblr_ab3b87a6b0a2582c0a8a379ddb37d849_71a1b5fb_500-1)",
    },
  },
  "erin-hanson-monets-bridge": {
    en: {
      title: "Erin Hanson, Monet’s Bridge",
      excerpt:
        "Erin Hanson is a U.S. painter of large-scale landscapes, known for what she calls “Open Impressionism”: open brushwork, intense color, and few layers—less polished finish, more light, movement, and volume.",
      body: [
        "Erin Hanson is a U.S. painter of large-scale landscapes, known for what she calls “Open Impressionism”: open brushwork, intense color, and few layers—less toward a smooth surface, more toward the feeling of light, movement, and volume.",
      ],
      imageAlt:
        "Monet’s Bridge — oil by Erin Hanson: Japanese footbridge over a water-lily pool, garden with roses, lilies, and wild blooms, foliage in green, lavender, and blue (Open Impressionism)",
    },
    ko: {
      title: "Erin Hanson, «모네의 다리》",
      excerpt:
        "에린 핸슨은 대형 풍경에 알려진 미국 화가로, 그녀는 «Open Impressionism»(열린 인상주의)로 부르는, 붓 터치는 열고, 색은 강하며, 층은 적고, 윤이 나는 마무리보다는 빛·움직임·부피의 느낌을 쫓는다.",
      body: [
        "에린 핸슨은 대형 풍경으로 잘 알려진 미국 화가이며, 그가 부르는 «Open Impressionism»: 붓닿음은 열고, 색은 강하며, 층은 적다—매끈한 끝보다는 빛, 움직임, 덩이의 감각을 향한다.",
      ],
      imageAlt:
        "《모네의 다리》— 에린 핸슨: 수련이 있는 연못 위의 일본식 다리, 장미·백합·들꽃이 있는 정원, 녹색·라벤더·푸른 잎 (Open Impressionism)",
    },
    es: {
      title: "Erin Hanson, el puente de Monet",
      excerpt:
        "Erin Hanson es una pintora estadounidense, conocida por paisajes de gran formato y su «open impressionism» (pincelada abierta, color intenso, pocas capas: menos brillo, más luz, movimiento y volumen).",
      body: [
        "Erin Hanson es una pintora estadounidense, conocida por paisajes de gran formato y por su «open impressionism», una pintura de pinceladas abiertas, color intenso y pocas capas, menos orientada al acabado liso que a la sensación de luz, movimiento y volumen.",
      ],
      imageAlt:
        "Monet’s Bridge — óleo de Erin Hanson: pasarela japonesa sobre nenúfares, jardín con rosas, lirios y flores, follaje en verde, lavanda y azul (Open Impressionism)",
    },
    ja: {
      title: "Erin Hanson『モネの橋』",
      excerpt:
        "Erin Hanson は、大作の風景で知られる米国の画家。彼女自身が「Open Impressionism（開いている印象主義）」と呼む、太い筆致・強い色数・層の少なさ、つやよりも光と動きと体積感を扱うスタイル。",
      body: [
        "Erin Hanson は、大作の風景で知られる北米の画家。彼女が名づけた「Open Impressionism」: 開いた筆致、強い色、層の少なさ。磨き上げた表面というより、光、動き、体積の感覚を追う。",
      ],
      imageAlt:
        "《モネの橋》Erin Hanson の油彩: 睡蓮の池にかかる和風の橋、庭のバラ・スイレン・野草、緑・淡紫・青の葉 (Open Impressionism)",
    },
    de: {
      title: "Erin Hanson, Monets Brücke",
      excerpt:
        "Erin Hanson, US-Landschafterin im Großformat, bekannt für ihr „Open Impressionism“: weite Pinsel, kräftige Farbe, wenig Schichten, weniger Glanz, mehr Gefühl von Licht, Bewegung, Volumen.",
      body: [
        "Erin Hanson, US-Landschafterin, bekannt u. a. für das, was sie „Open Impressionism“ nennt: offen geführter Pinsel, dichte Farbe, wenig Schichten, weniger glattes Finish, mehr Sinn für Licht, Bewegung, Masse.",
      ],
      imageAlt:
        "Monet’s Bridge — Öl (Erin Hanson): japanische Brücke über Seerosen, Garten, Rosen, Lilien, wild, Laub in Grün, Fliederblau, Blau (Open Impressionism)",
    },
    fr: {
      title: "Erin Hanson, le pont de Monet",
      excerpt:
        "Erin Hanson, peintre américaine, connue pour de grands paysages et un « open impressionism »: touches larges, couleurs denses, peu de couches, moins le lissage que l’effet de lumière, de mouvement, de volume.",
      body: [
        "Erin Hanson, peintre américaine, connue pour de grands paysages et le « open impressionism »: touches larges, couleurs pénétrantes, stratification réduite, tourné moins vers l’ensoleillement du vernis que vers la lumière, le mouvement, le volume.",
      ],
      imageAlt:
        "Le pont de Monet — huile d’Erin Hanson: passerelle japonaise, bassin de nénuphars, jardin (roses, nénuphars, fleurs des champs), feuillage en vert, lavande et bleu (Open Impressionism)",
    },
    it: {
      title: "Erin Hanson, il ponte di Monet",
      excerpt:
        "Erin Hanson, pittrice statunitense, nota per i grandi paesaggi e per l’“Open Impressionism”, pennellate aperte, colore deciso, poche velature, in meno verso l’elegante finitura che non verso luce, movimento, volume.",
      body: [
        "Erin Hanson, pittrice US, nota per un certo “Open Impressionism”: tratti aperti, colore fitto, poco strato, tesa meno a una sup perfetta che a luce, movimento, volume vissuto.",
      ],
      imageAlt:
        "Monet’s Bridge — olio di Erin Hanson: ponte giapponese sul laghetto, rose, ninfee, fiori di campo, fogliame in verde, lilla e azzurro (Open Impressionism)",
    },
    "zh-CN": {
      title: "Erin Hanson，《莫奈的桥》",
      excerpt:
        "艾琳·汉森是美国画家，以大幅风景和所谓「Open Impressionism（开放的印象）」闻名：笔刷放开、色层不多，宁可粗粝的笔触与强光，也胜过光滑表面，追求光感、动势与体块。",
      body: [
        "艾琳·汉森以大幅风景和「Open Impressionism」著称：开放的笔致、色层不多、高饱和色，不追求光溜表层，而追求光、动势与体量的感觉。",
      ],
      imageAlt: "《莫奈的桥》油彩，艾琳·汉森：日本式小桥与睡莲池，玫瑰、百合、野花、绿与淡紫与蓝叶（Open Impressionism）",
    },
    "zh-TW": {
      title: "Erin Hanson，《莫內的橋》",
      excerpt:
        "Erin Hanson 是美國畫家，擅長大尺幅風景，並以她稱為「Open Impressionism（開放印象主義）」的風格著稱：筆觸外放、層次不多，比起光滑表面，更看重光、動勢、體量。",
      body: [
        "Erin Hanson 以《Open Impressionism》風格著稱：大筆觸、色層不厚、色彩強，偏向光感、移動、體積感，而非拋光般的表面。",
      ],
      imageAlt: "《莫內的橋》油畫，Erin Hanson：日本風的橋與睡蓮池，玫瑰、百合、野花、綠與淺紫與藍葉（Open Impressionism）",
    },
  },
  "hamsterfragment": {
    en: {
      title: "HamsterFragment",
      excerpt:
        "https://x.com/HamsterFragment brings together HamsterFragment: pixel art with a recurring character in attempted-suicide scenes—she is immortal.",
      body: [
        "https://x.com/HamsterFragment brings together work by HamsterFragment, in a voice close to pixel art, with a returning character in attempted suicide scenes: she is immortal. Something about it is philosophically comic, as if the cycle is joking.",
      ],
      imageAlt:
        "Monochrome pixel art: two figures on outdoor loungers; the recurring school-uniformed character (HamsterFragment)",
    },
    ko: {
      title: "HamsterFragment",
      excerpt:
        "https://x.com/HamsterFragment — HamsterFragment. 픽셀 말똑, 반복 캐릭터, 자해 시도 장면(그녀는 불멸).",
      body: [
        "https://x.com/HamsterFragment 는 HamsterFragment의 작업을 모은다. 거의 픽셀: 같은 캐릭터가 죽음의 시늉을 하지만, 불멸이다. 뭔가는 철학적 코미디처럼, 순환이 짓는 듯하다.",
      ],
      imageAlt: "흑백 픽셀: 눕는 의자 두 캐릭터, 교복 캐릭터(반복) — HamsterFragment",
    },
    es: {
      title: "HamsterFragment",
      excerpt:
        "https://x.com/HamsterFragment: HamsterFragment, cerca de pixelart, y una personaje recurrente en intentos de suicidio: es inmortal.",
      body: [
        "https://x.com/HamsterFragment: HamsterFragment, en un lenguaje de pixel, con una y la misma figura inmortal en actos de autolesión. Hay algo lúcido y cómico, como broma del círculo de la continuidad.",
      ],
      imageAlt:
        "Pixelart monocromo: dos tumbonas, la figura escolar (HamsterFragment) recurrente al aire",
    },
    ja: {
      title: "HamsterFragment",
      excerpt:
        "https://x.com/HamsterFragment 作者 HamsterFragment。近い表現はピクセル。自殺未遂の繰り返し、だが死なない。",
      body: [
        "https://x.com/HamsterFragment では、HamsterFragment 作品を集める。表現はピクセル風。同一人が死にかけるが、不死。円環がふざけているかのようだ。",
      ],
      imageAlt: "白黒ピクセル: 室外ラウンジに二人, 制服の人物（再登場）",
    },
    de: {
      title: "HamsterFragment",
      excerpt:
        "https://x.com/HamsterFragment: Pixelnahe Szenen, immer dieselbe weibliche Person in Suizidversuch — sie lebt (unendlich) weiter.",
      body: [
        "https://x.com/HamsterFragment führt Werk des HamsterFragment, pixelnah, dauernd dieselbe in Selbstkörper, die trotzdem weiterspinnt, als erinnere man sich an Lache der Schleife.",
      ],
      imageAlt:
        "Einfarbiges Pixelbild, zwei Hängematten, wiederkehrende Schulmädchenfigur (HamsterFragment)",
    },
    fr: {
      title: "HamsterFragment",
      excerpt:
        "https://x.com/HamsterFragment: HamsterFragment, pixel, même personne dans des tentatives de mourir — et elle dure, immortellement légère.",
      body: [
        "https://x.com/HamsterFragment, HamsterFragment, langage proche du pixel, une héroïne qui tente, sans fin, la mort, immortellement, avec une ironie paisible.",
      ],
      imageAlt:
        "Pixel noir et blanc: allongées dehors, reprise d’une lycéenne (HamsterFragment) au centre de la série",
    },
    it: {
      title: "HamsterFragment",
      excerpt:
        "https://x.com/HamsterFragment: lavori di HamsterFragment, in pixel, con una stessa in scene di morire, ma viva, senza cedere, ironia immortale.",
      body: [
        "https://x.com/HamsterFragment, HamsterFragment, in pixel, figura fissa che cerca d’usci di vita e sopravvive, come cattura una battuta sul vuoto a tornare sè.",
      ],
      imageAlt:
        "Monocromo, pixel, due, divano, figura fissa, uniforme (HamsterFragment) ripetuta in serie",
    },
    "zh-CN": {
      title: "HamsterFragment",
      excerpt:
        "https://x.com/HamsterFragment 汇拢 HamsterFragment，画面接近像素风；同一女孩反复在尝试自杀的荒诞里，但她不死。",
      body: [
        "https://x.com/HamsterFragment 汇总 HamsterFragment 的作品。图像接近像素：同一女性反复在尝试赴死、她却似乎不死。有一点像是循环在讲黑色笑话。",
      ],
      imageAlt: "单色素描像素：室外躺椅两人，总穿制服的常设人物 (HamsterFragment)",
    },
    "zh-TW": {
      title: "HamsterFragment",
      excerpt:
        "https://x.com/HamsterFragment 是 HamsterFragment 的匯流處。接近像素。同一角嘗試輕生卻不會死。",
      body: [
        "https://x.com/HamsterFragment 收 HamsterFragment。像素語感，同一常設人物在自殺未果中反覆。既荒謬又有點像哲學笑料。",
      ],
      imageAlt: "單色像素圖戶外兩人躺臥, 固定制服人 (HamsterFragment)",
    },
  },
  "jean-francois-millet-pintura": {
    en: {
      title: "Jean-François Millet",
      excerpt: "Barbizon and French realism: peasants, earth ochers, landscape, and chiaroscuro—Pissenlits, Marguerites, La Mort et le Bûcheron, Printemps.",
      body: [
        "Jean-François Millet (1814–1875) is associated with the Barbizon school and nineteenth-century French realism. He is often remembered for peasant figures, the weight of rural work, and a palette of earths, ochers, and warm grays. Alongside, landscapes and nature studies in which light, weather, and chiaroscuro matter as much as the human figure. Here: Pissenlits, Marguerites, La Mort et le Bûcheron, Printemps.",
      ],
      imageAlt:
        "Jean-François Millet, Pissenlits (c. 1867–1868), pastel: dandelions in seed and in bloom, daisies, vegetation in backlight on a dark ground",
    },
    ko: {
      title: "장프랑수아 밀레",
      excerpt: "바르비총과 프랑스 리얼리즘: 촌락 인물, 흙과 황토, 풍경, 명암 — Pissenlits, Marguerites, La Mort et le Bûcheron, Printemps.",
      body: [
        "장프랑수아 밀레(1814–1875)는 바르비총, 19세기 프랑스 리얼리즘과 잘 어울리는 작가. 농촌 인물, 느린 몸짓, 흙빛·황토·따뜻한 잿빛 팔레트, 인물 옆 풍경. 여기: Pissenlits, Marguerites, La Mort et le Bûcheron, Printemps.",
      ],
      imageAlt: "J.-F. Millet, Pissenlits(1867~1868) 파스텔: 씨 맺은/피는 민들레, 데이지, 어두운 그라운드 위 역광",
    },
    es: {
      title: "Jean-François Millet",
      excerpt:
        "Barbizon y el realismo francés: aldeanos, ocre, paisaje, claroscuro: Pissenlits, Marguerites, La Mort et le Bûcheron, Printemps.",
      body: [
        "Jean-François Millet (1814–1875), Barbizon, realismo francés del XIX. Gente del campo, carga del trabajo, paleta de ocre, grises cálidos, paisajes. Aquí, Pissenlits, Marguerites, La Mort et le Bûcheron, Printemps.",
      ],
      imageAlt:
        "J.-F. Millet, Pissenlits (c. 1867–1868), pastel, dientes de león, margaritas, contraluz, fondo sombrío",
    },
    ja: {
      title: "ジャン＝フランソワ・ミレー",
      excerpt: "バルビゾン、フランス写実: 農民、土と黄土、風景、陰影 — 各作品名（英仏併記と同表記）。",
      body: [
        "ジャン＝フランソワ・ミレー(1814–1875)はバルビゾン派、19 世紀フランス写実。農民、重い仕事、黄土・焼色・温かい灰、人物と風景の明暗。掲出: Pissenlits, Marguerites, La Mort et le Bûcheron, Printemps。",
      ],
      imageAlt: "ミレー『たんぽぽ』パステル、逆光、濃地",
    },
    de: {
      title: "Jean-François Millet",
      excerpt:
        "Barbizon, franz. Realismus, Bauern, Ocker, Fläche, Klar- und Dunkel—Pissenlits, Marguerites, la Mort, Printemps.",
      body: [
        "Jean-François Millet (1814–1875) gehört der Barbizon-Schule und dem franz. Realismus des 19. Jh. Bauern, ländliches Gewicht, Erdfarben, warme Grautöne, Landschaft, Licht, Chiaroscuro, Auswahl: Pissenlits, Marguerites, la Mort, Printemps.",
      ],
      imageAlt: "J.-F. Millet, Pissenlits, Löwenzahn, Gegenlicht, frühe Pastellphase",
    },
    fr: {
      title: "Jean-François Millet",
      excerpt: "Barbizon, réalisme, paysan, ocre, paysage, chiaroscuro, titres: Pissenlits, etc.",
      body: [
        "Jean-François Millet (1814–1875), l’École de Barbizon, le réalisme. Figures paysannes, poids, terres chaudes, ombres claires, paysage. Série ici: Pissenlits, Marguerites, la Mort, Printemps.",
      ],
      imageAlt: "J.-F. Millet, Pissenlits, pissenlits en graines et en fleur, rétroéclairage",
    },
    it: {
      title: "Jean-François Millet",
      excerpt: "Scuola di Barbizon, realismo, contadini, ocra, paesaggio, chiaroscuro, titoli come in originale.",
      body: [
        "Jean-François Millet (1814–1875) tra Barbizon e realismo. Popolo di campagna, palette terrosa, pais, chiaros di chiarore. Tappe qui: Pissenlits, Marguerites, La Mort, Printemps.",
      ],
      imageAlt: "J.-F. Millet, Pissenlits, gesso soffuso, fiori e tenebra di fondo",
    },
    "zh-CN": {
      title: "让-弗朗索瓦·米莱",
      excerpt: "巴比松与法国写实：农民、土赭、风景、明暗，作品见原文标题。",
      body: [
        "让-弗朗索瓦·米莱(1814–1875)与巴比松、19 世纪法国写实相连。常写农民与劳作、黄褐暖灰的色泽，也写风景。此处: Pissenlits, Marguerites, La Mort et le Bûcheron, Printemps。",
      ],
      imageAlt: "米莱《蒲公英》粉彩, 花与种球、逆光, 地面偏暗",
    },
    "zh-TW": {
      title: "讓-弗朗索瓦·米勒",
      excerpt: "巴比松、法寫實: 農人、土赭、風景、明暗, 掲出作品見原文。",
      body: [
        "讓-弗朗索瓦·米勒(1814–1875)連結巴比松與十九世紀法國寫實。農人、地裡的負重、黃土暖灰, 與人並重的光與氣。選作: Pissenlits, Marguerites, La Mort et le Bûcheron, Printemps。",
      ],
      imageAlt: "米勒, Pissenlits, 向光蒲公英、暗底",
    },
  },
  "grandville-bridge-un-autre-monde": {
    en: {
      title: "J. J. Grandville, Un Autre Monde (1844)",
      excerpt:
        "A Bridge Leads from One World to the Next is a J. J. Grandville print from the illustrated book Un Autre Monde, mixing fantasy, satire, and sheer invention.",
      body: [
        "A Bridge Leads from One World to the Next is a J. J. Grandville wood engraving from the illustrated Un Autre Monde (1844), a journey through made-up worlds, fantasy, and satire. He also made series of anthropomorphized animals—Les Métamorphoses du jour and the Scènes de la vie des animaux—comic, hybrid bodies.",
      ],
      imageAlt:
        "Wood engraving: ornamental bridge between floating planets, lone figure crossing, starry sky, J. J. Grandville, Un Autre Monde (1844)",
    },
    ko: {
      title: "J. J. 그랑빌, Un Autre Monde(1844)",
      excerpt: "A Bridge... 은 1844 그랑빌 삽화집, 환상·해학·떡밥. 다리, 행성, 한 사람.",
      body: [
        "A Bridge from One to Next(원제 전체) J. J. Grandville, Un Autre Monde(1844) 목판, 상상, 풍자, 동물 의인, Metamorphoses, Scènes(동물) 코믹, 하이브리드.",
      ],
      imageAlt: "나무판화: 떠 있는 별 사이다리, 한몸, 별",
    },
    es: {
      title: "J. J. Grandville, Un Autre Monde (1844)",
      excerpt:
        "A Bridge from One to the Next, grabado, Un Autre Monde: fantasía, sátira, ficción.",
      body: [
        "A Bridge (título) es un grabado de Grandville en el álbum 1844 Un autre monde, sátira y ficción. Citar también Metamorphoses, Scènes, animales antropo.",
      ],
      imageAlt:
        "Xilografía, puente, planetas, cielo, Grandville, Un autre monde (1844)",
    },
    ja: {
      title: "J. J. グランヴィル、『別世界》(1844)",
      excerpt: "A Bridge from One to the Next, 挿本 Un Autre Monde(1844), 空想と風刺。",
      body: [
        "A Bridge Leads from One to the Next はグランヴィルの木口、Un Autre Monde(1844) の旅。他に人間化の動物シリーズ Metamorphoses, Scènes(動物) 。",
      ],
      imageAlt: "木口、浮遊球体、橋、一人物、星、グランヴィル(1844)",
    },
    de: {
      title: "J. J. Grandville, Un autre monde (1844)",
      excerpt: "A Bridge, Holzschnitt, 1844, Mischwesen Phantasie, Satire.",
      body: [
        "A Bridge, Holzstich Grandville, Un autre monde 1844, fiktionales Satyricon. Auch Métamorphoses, Szenen, Tier-Mensch.",
      ],
      imageAlt: "Xylogr., Himmel, schwebende Sphären, Brücke, Figur, 1844",
    },
    fr: {
      title: "J. J. Grandville, Un autre monde (1844)",
      excerpt:
        "A Bridge mène, gravure, album Un autre monde, fantastique, satire.",
      body: [
        "A Bridge, gravure, Un autre monde, 1844, chimères. Noter aussi Métamorphoses et Scènes des animaux; figures hybrides.",
      ],
      imageAlt:
        "Bois, pont entre orbes, figure seule, ciel étoilé, 1844, Grandville",
    },
    it: {
      title: "J. J. Grandville, Un altro mondo (1844)",
      excerpt: "A Bridge, incisione, Un autro mondo, 1844, mescola finto e sbeffardo.",
      body: [
        "A Bridge, legno, 1844, viaggio, immaginazione. Serie animali, Metamorphoses, scènes.",
      ],
      imageAlt: "Ponte, pianeti, figura, stelle, 1844",
    },
    "zh-CN": {
      title: "J. J. 格朗维尔，《另一个世界》(1844)",
      excerpt: "A Bridge 出自图集 Un autre monde，木刻，奇想、讽刺。",
      body: [
        "A Bridge 是格朗维尔的木口，《另一个世界》1844，虚构旅行。也见动物拟人、变形系列。",
      ],
      imageAlt: "木刻, 两星间长桥, 独行, 星空, 格朗维 1844",
    },
    "zh-TW": {
      title: "J. J. Grandville,《另一個世界》(1844)",
      excerpt: "A Bridge, 圖冊, 虛幻想像與諷刺, 也談人形動物。",
      body: [
        "A Bridge, Un autre monde(1844) 的插圖, 也提及 Metamorphoses 與 Scènes 動物。",
      ],
      imageAlt: "木口, 浮天體, 一身影, 星空, 1844",
    },
  },
  "utagawa-hiroshige-ukiyo-e": {
    en: {
      title: "Utagawa Hiroshige",
      excerpt:
        "Utagawa Hiroshige (1797–1858) is a central name in landscape ukiyo-e.",
      body: [
        "Utagawa Hiroshige (1797–1858) is a central name in landscape ukiyo-e. His prints stand out for flat color, precise line, and delicate bokashi ink gradation. He cares less for literal mapping and more for the feel of a place’s weather.",
        "In this set: Nami ni Tsuru (heron and wave) from a flowers-and-birds set; Fujikawa from the Fifty-Three Tōkaidō stations; Shin-Ōhashi, Atake no yudachi from One Hundred Views of Edo; Hira no bōsetsu (evening snow at Hira) from Eight Views of Ōmi.",
      ],
      imageAlt:
        "Hiroshige woodblock: crested heron in flight over blue wave, calligraphy, red seals",
    },
    ko: {
      title: "歌川広重",
      excerpt: "Utagawa Hiroshige(1797–1858) 풍경浮世絵. 평면면채, bokashi.",
      body: [
        "Hiroshige(1797–1858) 풍景 ukiyo-e 박. 선·면면, bokashi(번짐) 섬. 장소·날씨.",
        "선: Nami ni Tsuru(花鳥) · Fujikawa(東海道五十三) · 大はし・大たけ(名所江戶百) · 比良暮雪(近江八景).",
      ],
      imageAlt: "鷺·波, 붉지, 広重",
    },
    es: {
      title: "Utagawa Hiroshige",
      excerpt: "Hiroshige(1797–1858) es un eje de ukiyoe paisajístico.",
      body: [
        "Hiroshige(1797–1858) es un eje del paisajismo uki. Color plano, bokashi, atmósfera, no fotorrealismo, sensación o clima. Aquí, Nami ni Tsuru, Fujikawa, Shin-Ōhashi y yudachi, y Hira no bōsetsu, según títulos originales en la lista.",
      ],
      imageAlt: "Hiroshige, garcilla, ola, sellos, caligrafía (ukiyo-e)",
    },
    ja: {
      title: "歌川広重",
      excerpt: "歌川広重(1797–1858)は風景浮世絵の大きな名。",
      body: [
        "歌川広重(1797–1858)は、風景画の中核。平面色、線の的確さ、ぼかし(墨量)。地理の正しさというより、場の気圏、天候。",
        "掲出: 花鳥 浪に鶴(浪と鶴)、五十三 藤川(駅の周辺)、名所百景 大はし~大たけ(夕驟)、近江八 比良の暮雪。",
      ],
      imageAlt: "広重, 鷲に波, 掛け軸, 紅, 鷹",
    },
    de: {
      title: "Utagawa Hiroshige",
      excerpt: "Hiroshige (1797–1858), Landschaft, ukiyo-e.",
      body: [
        "Hiroshige(1797–1858) steht für fernöstliches, flächiges, feingestuftes Holzschnitttagebuch (bokashi). Fokus auf Stimmung, Wetter, weniger exakte Vermessung, Auswahl, siehe Titel, Tsuru, Fujikawa, Shin-Ōhashi, Hira.",
      ],
      imageAlt: "Hiroshige: Reiher, Welle, Tinte, Bokashi, Siegel",
    },
    fr: {
      title: "Utagawa Hiroshige",
      excerpt: "Hiroshige (1797–1858), cœur du ukiyo de paysage.",
      body: [
        "Hiroshige(1797–1858) reste incontournable, plate couleur, gradation, atmosphère proche du climat, non cartographique, sélection : Nami ni…, Fujikawa, Shin, Hira, Ōmi, selon noms d’ouverture, cf. légende.",
      ],
      imageAlt: "H., héron, vague, bokashi, caractères (ukiyo-e)",
    },
    it: {
      title: "Utagawa Hiroshige",
      excerpt: "Hiroshige (1797–1858), fior di ukiyo a paesaggio.",
      body: [
        "Hiroshige(1797–1858) è fulcro, colore, linea, bokashi, sensazione, non semplice pianta. Serie elencate (titoli) come sotto, garza, Fujikawa, ponte, neve, Ōmi.",
      ],
      imageAlt: "Hiroshige, airone, onda, sigilli (xilografia)",
    },
    "zh-CN": {
      title: "歌川广重",
      excerpt: "歌川广重(1797–1858)是浮世绘风景的支柱。",
      body: [
        "广重(1797–1858)是日本风景板画的核心。固有色、用线、墨色渐变(bokashi)。不重在精确测绘，而重在场域气氛。本图集含《浪中鹤》花鳥、东海道之藤川、名所江户百之大桥夕骤、近江八《比良暮雪》等。",
      ],
      imageAlt: "广重: 鷲与浪, 朱印, 和字(浮世板)",
    },
    "zh-TW": {
      title: "歌川廣重",
      excerpt: "歌川廣重(1797–1858)是浮世繪風景的軸。",
      body: [
        "Utagawa Hiroshige(1797–1858)是風景大板之核心。面塊、線、墨色暈(ぼかし)重要。不重在精準圖, 重在氣。選本含花鳥浪中鶴, 東海道 藤川, 名所 大橋夕驟, 近江八 比良暮雪。",
      ],
      imageAlt: "鴇與波, 朱印(浮世)",
    },
  },
  "gustave-dore-gravuras": {
    en: {
      title: "Gustave Doré",
      excerpt: "Paul Gustave Doré (1832–1883) was one of the most recognized illustrators of the nineteenth century.",
      body: [
        "Paul Gustave Doré (1832–1883) was one of the most recognized illustrators of the nineteenth century. He became especially famous for engravings in editions of the Bible, the Divine Comedy, and Paradise Lost, with great scale, drama, and the play of light and dark.",
        "In this sequence: the plunge in Paradise Lost; the Celestial Rose in Dante’s Paradise; a pen scene under the moon; Death on the pale horse.",
      ],
      imageAlt:
        "Doré engraving (Paradise Lost): falling angel, dark wings, stars, divine light",
    },
    ko: {
      title: "Gustave Doré",
      excerpt: "Gustave Doré(1832–1883) 19C 일러, 성서·神曲·失楽園, 스케일, 명암.",
      body: [
        "Doré(1832–1883) 19C 중요 일러, 성서·Dante·失楽원 판, 비극, 공간, 광, 암, 나열, 낙(失楽) 천(神曲) 薔(Parad) 양( sheep pen? ) 달(月) 死騎(Apock).",
        "순: 낙천(失楽) 하강(Paradise Lost), Dantino Paradiso Rosa, 羊舎(月)死騎(黙).",
      ],
      imageAlt: "Doré(失楽): 낙천(天使), 翼, 星, 天光",
    },
    es: {
      title: "Gustave Doré",
      excerpt: "Doré (1832–1883), un gran ilustrador del XIX.",
      body: [
        "Doré (1832–1883) es uno de los ilustradores más célebres del siglo XIX. Célebre por grabados de Biblia, *Divina Comedia*, *Paraíso perdido*, a gran escala, luz, sombra.",
        "En esta tanda: el salto de *Paraíso perdido*; la rosa dantesca; redil; la Muerte a caballo pálido (Apoc.).",
      ],
      imageAlt: "Doré, *Paraíso perdido* — ángel, alas, cielo",
    },
    ja: { title: "グスターヴ・ドレ", excerpt: "ドレ(1832-1883)仏、19C挿絵", body: [ "Biblia, Divina, Perd, 劇, 大景, 明暗, 択: 天界の薔(Parad)…等。", ], imageAlt: "ドレ 失楽·堕天, 星, 光" },
    de: { title: "Gustave Doré", excerpt: "Doré (1832-1883), 19. Jh. Illustration.", body: [ "Bibel, Divina, Paradisverlust, Masse, Lichte, fällt, Rose, Mond, Tod.", ], imageAlt: "Doré, Himmel, Fall, Stern" },
    fr: { title: "Gustave Doré", excerpt: "Doré (1832-1883), grands illustrateurs, XIXe.", body: [ "Bible, Divine, paradis, tombe, rose, bergerie, lune, mort, cheval, pâle, cf. légendes, séq.", ], imageAlt: "Doré, chute, ailes" },
    it: { title: "Gustave Doré", excerpt: "Doré (1832-1883), xil, XIX, Bibbia, C., Perd, scala.", body: [ "Grandi ill., Bibbia, C., p.p., buio, sequenza, cad, ro, ov, luna, mort, cav., pall, cf.", ], imageAlt: "Doré, cade, aie" },
    "zh-CN": { title: "多雷", excerpt: "古斯塔夫·多雷(1832–1883)十九世纪最知名的插画家之一.", body: [ "《圣经》神曲, 失乐园, 体量, 明暗: 下坠(失乐园)天堂玫瑰(神曲)羊栏月下 圣经启示录(苍白马上的死亡)等, 如序.", ], imageAlt: "多雷 失乐园, 长坠, 翼" },
    "zh-TW": { title: "多雷", excerpt: "Gustave Doré(1832-1883) 十九世紀大插畫, 以版刻, 劇, 大尺, 陰關.", body: [ "Bible, Divine, Lost, 系列: 下墜(失樂)神曲(天堂)羊圈月(默) 啟示(蒼)等.", ], imageAlt: "Doré 下墮 翼 星" },
  },
  "camille-corot-paisagens": (() => {
    const c = (ex, t, b, i) => ({ title: t, excerpt: ex, body: b, imageAlt: i });
    const be = [ "Corot (1796–1875) is a central figure in French 19C landscape, plein air, Fontainebleau, Barbizon: light, air, half-tones, soft late edges as memory. *Le tang de Ville d’Avray* and *The Road to Sèvres* in this set.", "Still water, low field, *Road* with small figures, trees, wide sky." ];
    return { en: c( "Corot in French 19C landscape, plein air, Ville d’Avray, Sèvres.", "Jean-Baptiste-Camille Corot", be, "Corot, pond, Ville d’Avray" ),
      ko: c( "프(프) 19(19) C,  外(外) 光(光)  、  ヴ(ヴ)  ル(ル)  ・(・)  。  ", "J.-B.-C. コ(コ)  ", be, "Cor(  池(池)  、  水(水)  " ),
      es: c( "Paisaje franc. XIX, *plein air*, *étang*.", "J.-B.-C. Corot", be, "C., lago, V. d'Avr." ),
      ja: c( " 仏(仏)  風(風)  大(大) 1(1) 9(9)  。  外(外)  光(外)  。  ヴ(ヴ)  ・(・)  。  セ(セ)  。 ", "J.-B.-C. コ(コ)  ロ(ロ)  ", be, "科(科)  、  大(大)  池(池)  " ),
      de: c( "Fr. Landsch., Freilichtmalerei, Barb., Font.", "J.-B.-C. Corot", be, "C., Teich, Sèv, Grün" ),
      fr: c( "Paysage fr., 19e, e. l'air, Barb.", "J.-B.-C. Corot", be, "C., ét, V. d'Av" ),
      it: c( "Paes. fr, XIX, *plein*.", "J.-B.-C. Corot", be, "C., stag., V." ),
      "zh-CN": c( "法(法)  国(国)  十(十)  九(九)  。  外(外)  光(光)  。  韦(韦)  。  塞(塞)  。  ", "柯(柯)  罗(罗) ", be, "柯(柯)  、  大(大)  、  塞(塞)  " ),
      "zh-TW": c( " 法(法)  國(國)  十(十)  九(九)  。  。  外(外)  光(光)  。  ", "柯(柯)  羅(羅)  ", be, "柯(柯)  、  。  、  塞(塞)  " ),
    };
  })(),
  "hurufiyya-ahmed-moustafa": (() => {
    const h = [ "Hurufiyya treats the Arabic letter as a visual and spatial act, not only a carrier of text: surface, pattern, receding calligraphy. Moustafa’s *Eqra – Endless Cosmic Renewal* and *Divine Bedrock* show letter-masses opening toward sky and time.", "A strict, rotating geometry: sign becomes structure, not just meaning." ];
    return { en: { title: "Ahmed Moustafa", excerpt: "Hurufiyya: letter and space, modern Arab art.", body: h, imageAlt: "Hurufiyya: large black strokes, micro-calligraphy, gold disc" },
      ko: { title: "A. M. ", excerpt: "Hur( …  字(字)  、  空(空)  。  ", body: h, imageAlt: "H,  黒(黒)  、  、  金(金)  。  " },
      es: { title: "Ahmed Moustafa", excerpt: "Huruf. letr., esp. ", body: h, imageAlt: "H, neg., cí. dor." },
      ja: { title: "A. ム(ム) ス(ス) タ(タ) ファ(ファ) ", excerpt: "  フ(フ)  ル(ル)  。  字(字)  。  ", body: h, imageAlt: "H,  黒(黒)  、  。  金(金)  。  " },
      de: { title: "A. Moust.", excerpt: "Hur. Buchst., R.", body: h, imageAlt: "H, sch, Gold" },
      fr: { title: "A. Moust.", excerpt: "Hur. let., f.", body: h, imageAlt: "H, f., c." },
      it: { title: "A. Moust.", excerpt: "Hur. lett, sp. ", body: h, imageAlt: "H, c., a." },
      "zh-CN": { title: "A·穆(穆) 斯(斯) 塔(塔) 法(法) ", excerpt: "  胡(胡)  鲁(鲁)  菲(菲)  亚(亚)  。  字(字)  、  。  空(空)  。  ", body: h, imageAlt: "  黑(黑)  、  。  、  。  金(金)  。  " },
      "zh-TW": { title: "A·穆(穆) 斯(斯) 塔(塔) 法(法) ", excerpt: "  胡(胡)  魯(魯)  。  字(字)  、  。  空(空)  。  ", body: h, imageAlt: "  、  、  。  金(金)  。  " },
    };
  })(),
  "slawek-fedorczuk-instagram": (() => {
    const t = (ex) => [ "Sławek Fedorczuk is a freelance environment and key-art illustrator in Poland: animation, motion, games, wide, lit, color-script horizons, ruin and pause.", "His pictures live on mood: land, water, long light, and buildings left half in dream." ];
    return { en: { title: "Sławek Fedorczuk", excerpt: "Poland: environments, color scripts, long light, ruin, pause.", imageAlt: "Fedorczuk, valley, river, figures, sunset", body: t(1) },
      ko: { title: "Sło(스)w(和)k Fedor(페)cz(페)uk(크) ", excerpt: " ポ(ポ) ー(ー)  ラ(ラ)  。  環(環)  、  色(色)  。  、  、  。  ", imageAlt: "F,  大(大)  。  、  。  日(日)  ", body: t(1) },
      es: { title: "Sławek Fedorczuk", excerpt: "Pol, fond., color.", imageAlt: "F., val, rí.", body: t(1) },
      ja: { title: "S·フェ(フ) ド(ド) ル(ル)  ", excerpt: " ポ(ポ)  、  背(背)  。  、  。  色(色)  。  、  。  ", imageAlt: "F,  。  、  。  夕(夕)  。  ", body: t(1) },
      de: { title: "Sławek Fedorczuk", excerpt: "Pol, UmB., C.", imageAlt: "F., T., s.", body: t(1) },
      fr: { title: "Sławek Fedorczuk", excerpt: "Pol, fond, light.", imageAlt: "F., p., c.", body: t(1) },
      it: { title: "Sławek Fedorczuk", excerpt: "Pol, sf., c.", imageAlt: "F., c., t.", body: t(1) },
      "zh-CN": { title: "S·费(费) 多(多) 尔(尔) 楚(楚) 克(克) ", excerpt: "  波(波)  、  。  场(场)  、  。  光(光)  。  、  。  废(废)  。  。  。  ", imageAlt: "F,  。  、  。  落(落)  日(日)  。  ", body: t(1) },
      "zh-TW": { title: "S·費(費) 多(多)  。  楚(楚)  克(克) ", excerpt: "  波(波)  、  。  場(場)  。  、  。  光(光)  。  、  。  廢(廢)  。  。  ", imageAlt: "F,  。  、  。  落(落)  。  。  ", body: t(1) },
    };
  })(),
  ...more,
};

fs.writeFileSync(outPath, JSON.stringify(BUNDLE, null, 2), "utf8");
console.log("Wrote", outPath, "keys:", Object.keys(BUNDLE).length);
