/* @stylistic/max-len -- line-broken stanzas */
const A1 = `Pascal had his abyss, that moved with him.`;
const A2 = `All is abyss—action, desire, dream,
words! And I often feel against my skin,
setting my hair on end, the wind of Fear.`;
const A3 = `All around me—the brink, the depths, the space;
I'm spellbound, petrified, frozen in place;
And on my midnights, God's skilled fingers trace
an ever-changing, never-ending nightmare.`;
const A4 = `I fear my dreams, as I would fear big holes
filled with vague dread, and leading who knows where.
I see infinity through every window,
and my mind, always racked by vertigo,
yearns to become as numb as empty air.
Ah! Never leave the realms of Sums and Souls!`;
const T2 = `Tears, idle tears, I know not what they mean,
Tears from the depth of some divine despair
Rise in the heart, and gather to the eyes,
In looking on the happy Autumn-fields,
And thinking of the days that are no more.`;
const T3 = `Fresh as the first beam glittering on a sail,
That brings our friends up from the underworld,
Sad as the last which reddens over one
That sinks with all we love below the verge;
So sad, so fresh, the days that are no more.`;
const T4 = `Ah, sad and strange as in dark summer dawns
The earliest pipe of half-awaken'd birds
To dying ears, when unto dying eyes
The casement slowly grows a glimmering square;
So sad, so strange, the days that are no more.`;
const T5 = `Dear as remember'd kisses after death,
And sweet as those by hopeless fancy feign'd
On lips that are for others; deep as love,
Deep as first love, and wild with all regret;
O Death in Life, the days that are no more!`;
const TENNYSON_TEARS_BODY = ["By Alfred, Lord Tennyson", T2, T3, T4, T5];
const CaeiroPt = `Falas de civilização, e de não dever ser,
Falas de civilização, e de não dever ser,
Ou de não dever ser assim.
Dizes que todos sofrem, ou a maioria de todos,
Com as coisas humanas postas desta maneira,
Dizes que se fossem diferentes, sofreriam menos.
Dizes que se fossem como tu queres, seriam melhor.
Escuto sem te ouvir.
Para que te queria eu ouvir?
Ouvindo-te nada ficaria sabendo.
Se as coisas fossem diferentes, seriam diferentes: eis tudo.
Se as coisas fossem como tu queres, seriam só como tu queres.
Ai de ti e de todos que levam a vida
A querer inventar a máquina de fazer felicidade!`;
const CaeiroEn = `Civilization talk, and of not having to be,
Civilization talk, and of not having to be,
Or of not being this way.
You say everyone, or most of us, suffer
With human life arranged in this way;
You say if it were different, we would suffer less.
You say if it were as you wish, it would be better.
I listen without hearing you. Why would I need to hear you?
Hearing you I would learn nothing.
If things were different, they would be different: that is all.
If things were as you wish, they would be only as you wish.
Woe to you and all who go through life
Wanting to invent a machine to make happiness!`;
export default {
  "baudelaire-the-abyss": {
    en: {
      title: "The Abyss",
      excerpt: "Charles Baudelaire, in English translation.",
      body: ["Charles Baudelaire", A1, A2, A3, A4],
    },
    ko: { title: "The Abyss", excerpt: "보들레르, 영어 번역.", body: ["샤를 보들레어", A1, A2, A3, A4] },
    es: { title: "El abismo (The Abyss)", excerpt: "Baudelaire, en traducción inglesa.", body: ["Charles Baudelaire", A1, A2, A3, A4] },
    ja: { title: "The Abyss", excerpt: "ボードレール、英訳版。", body: ["シャルル·ボドレール", A1, A2, A3, A4] },
    de: { title: "The Abyss", excerpt: "Baudelaire, in englischer Übersetzung.", body: ["Charles Baudelaire", A1, A2, A3, A4] },
    fr: { title: "L’abîme (The Abyss)", excerpt: "Baudelaire, en traduction anglaise.", body: ["Charles Baudelaire", A1, A2, A3, A4] },
    it: { title: "L’abisso (The Abyss)", excerpt: "Baudelaire, in traduzione inglese.", body: ["Charles Baudelaire", A1, A2, A3, A4] },
    "zh-CN": { title: "The Abyss 深渊", excerpt: "波德莱尔，英文译本。", body: ["夏尔·波德莱尔", A1, A2, A3, A4] },
    "zh-TW": { title: "The Abyss 深淵", excerpt: "波特萊爾，英文譯本。", body: ["夏爾·波特萊爾", A1, A2, A3, A4] },
  },
  "tennyson-tears-idle-tears": {
    en: { title: "from *The Princess*: Tears, Idle Tears", excerpt: "Tennyson — the melancholy of days that are no more.", body: TENNYSON_TEARS_BODY },
    ko: { title: "『공주(The Princess)』에서: Tears, Idle Tears", excerpt: "텰니슨, 지나간 날, 상실, 멜랑콜리", body: TENNYSON_TEARS_BODY },
    es: { title: "de *The Princess*: Tears, Idle Tears", excerpt: "Tennyson, memoria y días idos.", body: TENNYSON_TEARS_BODY },
    ja: { title: "『The Princess』 から: Tears, Idle Tears", excerpt: "テニスン, 戻れぬ日の感傷", body: TENNYSON_TEARS_BODY },
    de: { title: "Aus *The Princess*: Tears, Idle Tears", excerpt: "Tennyson, Erinnerung, Tage, die weg sind.", body: TENNYSON_TEARS_BODY },
    fr: { title: "Extrait de *The Princess* : Tears, Idle Tears", excerpt: "Tennyson, mélancolie des jours finis.", body: TENNYSON_TEARS_BODY },
    it: { title: "da *The Princess*: Tears, Idle Tears", excerpt: "Tennyson, ricordo e i giorni che non tornano.", body: TENNYSON_TEARS_BODY },
    "zh-CN": { title: "选自《The Princess》: Tears, Idle Tears", excerpt: "丁尼生, 已逝之日的感怀", body: TENNYSON_TEARS_BODY },
    "zh-TW": { title: "《The Princess》 摘: Tears, Idle Tears", excerpt: "丁尼生, 不復得的日子", body: TENNYSON_TEARS_BODY },
  },
  "blame-tsutomu-nihei": {
    en: {
      title: "Blame! (ブラム)",
      excerpt: "Tsutomu Nihei, *Afternoon*; Killy, endless city-machine, extreme perspective, black-and-white cyberpunk—inhuman scale.",
      body: [
        "Blame! (ブラム) is a manga by Tsutomu Nihei, first serialized in Kodansha’s *Afternoon*.",
        "Killy searches for humans with the Network Terminal Genes, crossing endless levels of a collapsing city-machine: passages, bridges, voids—extreme lines, dense B&W, minimal dialogue, mechanical and biological threat, a constant sense of inhuman scale.",
      ],
      imageAlt: "BLAME! THE ANTHOLOGY (Hayakawa) cover: vast industrial black-and-white interior, pipes and girders in perspective, a tiny figure on a ledge — Tsutomu Nihei",
    },
    ko: { title: "Blame! (ブラム)", excerpt: "二平, *Afternoon*; 킬리, 끝없는 머신, 원근, B/W", body: ["*Afternoon* 연재(講談) 등.", "Killy, NTG(네트), 붕괴 도기계, 터, 원경, B/W, 최소, 위협, 비(非)인(人)감."], imageAlt: "BLAME! 앤솔(Hayakawa) 표, 거대, 관, 둔, 켜, 二平" },
    es: { title: "Blame! (ブラム)", excerpt: "Tsutomu Nihei, *Afternoon*; Killy, ciudad-máquina, persp., ciberpunk.", body: ["Manga, *Afternoon* (Kodansha), etc..", "Killy, gente, NT, ciudad colaps, escala, etc., etc."], imageAlt: "BLAME! THE ANTHOLOGY (Hayakawa): interior industrial, tramas, minúscula, Nihei" },
    ja: { title: "BLAME!（ブラム）", excerpt: "弐瓶, *Afternoon*; 巨大建造物, 透視, 白黒, 賽博", body: ["*Afternoon*(講)連載, 二瓶.", "キリ, NT, 層(層)崩, 遠(遠)景, 白黒, 寡, 非人(人)的スケ."], imageAlt: "表紙BLAME!アン(Hayakawa), 巨建, 透, 人影, 二平" },
    de: { title: "Blame! (ブラム)", excerpt: "Tsutomu Nihei, *Afternoon*; Killy, Mega-Stadt, Perspektive, Cyberpunk.", body: ["Manga, *Afternoon* (Kodansha)…", "Killy, NT, endlos, B&W, Mini-Dial, Bedrohung, Maßstab, etc.."], imageAlt: "Umschlag BLAME! (Hayakawa), Hallen, Figur, Nihei" },
    fr: { title: "Blame! (ブラム)", excerpt: "Tsutomu Nihei, *Afternoon*; Killy, cité-méch., perspective.", body: ["Sérialis. *Afternoon* (Kodansha)…", "Killy, NT, ville, vide, b&w, mén, échel, etc.."], imageAlt: "BLAME! THE ANTHOLOGY (Hayakawa), cadrage, mico, Nihei" },
    it: { title: "Blame! (ブラム)", excerpt: "Tsutomu Nihei, *Afternoon*; Killy, città-macchina, cyber.", body: ["*Afternoon* (Kodansha), ecc..", "Killy, NT, rovine, s/v, poche righe, peric, scala, ecc.."], imageAlt: "Copertina BLAME! (Hayakawa), grandi, micro, Nihei" },
    "zh-CN": { title: "BLAME!（BLAME!）", excerpt: "弐瓶, 刊于 *Afternoon*; 奇利, 无尽城, 极透视, 黑白, 非人感", body: ["《BLAME!》*Afternoon* 连载(讲谈)等", "Killy, 网络, 城机, 崩, 构图, 对话少, 威胁, 等"], imageAlt: "BLAME! 选(Hayakawa) 大空间, 线条, 小人(二平)" },
    "zh-TW": { title: "BLAME! (ブラム)", excerpt: "二瓶, *Afternoon*; Killy, 城機, 遠大透視, 非人", body: ["*Afternoon* 連載(講談) 等", "Killy, NT, 層(層) 崩(崩), 黑白, 寡(寡), 體(體)量 等"], imageAlt: "表 BLAME!(Hayakawa) 內(內)景, 鉅, 微, 二(二)平" },
  },
  "aldous-huxley-island": {
    en: {
      title: "Island",
      excerpt: "Island (1962): Will Farnaby in Pala—Buddhism, psychoanalysis, education; a fragile utopia, lucidity, compassion, and happiness as presence.",
      body: [
        "Island (1962) is Aldous Huxley’s last completed novel. Journalist Will Farnaby reaches the imagined Indian Ocean isle of Pala, a society that tried to weave together Buddhism, psychoanalysis, education, and more self-aware ways of life. The book is half essay, half thought experiment: not a perfect community, but a fragile try at a civilization less unconscious, less driven by the automatism of desire, power, and technics.",
        "Huxley seems to suggest that a better life does not come from erasing pain or from fantasies of control, but from a clearer way of meeting what comes. In Pala, attention, compassion, and practice are not comfort tricks, but ways of being in the world. Maturity, here, is not about conquering suffering, but about receiving what comes without being wholly deformed by it; not mastering fate, but consenting to its shape without sinking into passivity. Happiness, then, is not euphoria, trophy, or numbness, but a sober, present kind of joy when the mind is less seized by fear, fantasy, and greed. Lucidity does not make life easy—it makes it truer. Discipline does not harden you against the world; it can let you pass through pain, limit, and loss with fewer illusions, perhaps with more wholeness.",
        "The novel asks how to live more wakefully without rigidity, naïveté, or moral showmanship. It is short, idea-dense, and best read slowly.",
      ],
      imageAlt: "Island, Aldous Huxley (Penguin Books): orange spine, pink panel with white and orange triangles, black specks on the cover",
    },
    ko: { title: "A Ilha (Island)", excerpt: "1962, Pala(망),불(佛)·분(분)·입(入),취약(脆弱)", body: ["*Island*(1962) Huxley 마지, Farnaby(팔(팔)라(라)) …", "파라(파라)에서 주의·연민·훈련(訓(訓) …", "천(천) …"], imageAlt: "Island(페(ペ)) 오(オ), 삼(三)角(角), 桃(桃) 背(背)" },
    es: { title: "La isla (Island)", excerpt: "Farnaby, Pala, bud., psic., frágil utopía, lucidez.", body: ["*Island* (1962) …", "… atención, compasión, disciplina …", "Cómo despierto, sin rigidez …"], imageAlt: "Island, Huxley (Penguin), lom., panel ro." },
    ja: { title: "島（A Ilha / Island）", excerpt: "1962, パ(パ)ラ(ラ), 仏(仏)・(・) 等(等) ", body: ["*Island*（1962）Ald. last … パ(パ)ラ(ラ) …", "仏(仏) 等(等) … 注意, 慈悲(慈悲) …", " 醒(醒) め 等(等) … "], imageAlt: "A Ilha(ペ(ペ)ン(ン)) 帯(帯) 等(等)" },
    de: { title: "Die Insel (Island)", excerpt: "Farnaby, Pala, Buddhism, PsA, fragile Utopie.", body: ["*Island* (1962), Hux., Farnaby, Pala …", "Achtung, Mitleid, Zucht …", "Wach, ohne steif, naiv, Moral-Show."], imageAlt: "Island, Huxley, Penguin, Or., Ros., Deck." },
    fr: { title: "L’île (Island)", excerpt: "Farnaby à Pala, bouddh., psy., utop. fragile.", body: ["*Island* (1962), Hux., Farn., Pala, essai, expérience, fragilité, désir, puissance, technique, etc.", "Attention, comp., discipline, moins fuite, moins dureté, consentement, moins passiv., bonheur présent, moins rêve, peur, appétit, luci., discipline.", "Liv. court, dense, lire lente, pas solution, problème, viv. éveil."], imageAlt: "Island, Huxley, Penguin, dos or., r., t., panneau" },
    it: { title: "L’isola (Island)", excerpt: "Farnaby, Pala, bud., psA, ut. fragile.", body: ["*Island* (1962), Huxl., testo, saggio, sperim., Pala, frag, meno, autom., d., pote, tec, att., comp, discr.", "vita, dolore, control, maturità, racc, consenso, fel, pres., luc, disc, lim.", "Sì, corte, denso, let. lente, etc."], imageAlt: "Island, Huxley, Penguin, ros., t., t." },
    "zh-CN": { title: "《岛》（Island / A Ilha）", excerpt: "1962, 帕(帕)拉(拉), 佛(佛), 心(心), 脆(脆)", body: ["《岛》赫(赫)胥(胥)最(最)后(后) 长(长) 记(记) 者(者) 法(法)纳(纳) 比(比) 到(到) 帕(帕)拉(拉) … 佛(佛) 、 、 、 、 、 。 ", " 注(注) 意(意) 、 、 。 ", " 醒(醒) 而(而) 不(不) 僵(僵) … 短(短) 。 "], imageAlt: "A Ilha(企(企)鵝(鵝)) 橙(橙) 、 。 " },
    "zh-TW": { title: "《島》（Island）", excerpt: "1962, Pala(帕(帕)拉(拉), 佛(佛), 脆(脆)若(若)烏(烏)托(托)邦(邦) ", body: ["《島》Ald(赫(赫)) 最(最)後(後) … 帕(帕)拉(帕) 社(社) 會(會) … 佛(佛) 等(等) … 注(注) 意(意) …", " 幸(幸) 福(福) 如(如) 在(在) 場(場) 等(等) … "], imageAlt: "A Ilha(鵝(鵝)) 脊(脊) 粉(粉) 等(等) " },
  },
  "caeiro-falas": {
    en: { title: "Alberto Caeiro, \"Falas\"", excerpt: "Civilization, happiness, and the machine of wanting the world otherwise.", body: [ "Falas (Words)", CaeiroEn ] },
    ko: { title: "알베르토 카이루, «Falas»", excerpt: "문명, 기쁨, 강(강) 밖(밖) ", body: [ "Falas", CaeiroPt ] },
    es: { title: "Alberto Caeiro, \"Falas\"", excerpt: "Civ., f., m.", body: [ "Falas", CaeiroPt ] },
    ja: { title: "A.カイロ《Falas》", excerpt: "文明、機(機)外(外) ", body: [ "Falas", CaeiroEn ] },
    de: { title: "Alberto Caeiro, \"Falas\"", excerpt: "Ziv., f.", body: [ "Falas", CaeiroEn ] },
    fr: { title: "Alberto Caeiro, \"Falas\"", excerpt: "Civ., f.", body: [ "Falas", CaeiroEn ] },
    it: { title: "Alberto Caeiro, \"Falas\"", excerpt: "Civ., f.", body: [ "Falas", CaeiroEn ] },
    "zh-CN": { title: "卡埃罗《Falas》", excerpt: "文明, 。 ", body: [ "Falas", CaeiroEn ] },
    "zh-TW": { title: "凱羅《Falas》", excerpt: "文明, 。 ", body: [ "Falas", CaeiroEn ] },
  },
  "isaac-asimov-the-last-question": {
    en: { title: "The Last Question, Isaac Asimov", excerpt: "Multivac, deep time, entropy, short, CMU.", body: [ "The Last Question (1956) follows a vast AI, from Earth’s Multivac to star-spanning minds, as humanity extends and keeps asking: can we reverse entropy?", "The story is short.", "https://users.ece.cmu.edu/~gamvrosi/thelastq.html" ] },
    ko: { title: "The Last Question, I. Asimov", excerpt: "멀(멀)티(티)뱅(뱅) 、 。 ", body: [ " (195(195)6)  …  ", " 짧(짧) 。 ", "https://users.ece.cmu.edu/~gamvrosi/thelastq.html" ] },
    es: { title: "The Last Question, I. Asimov", excerpt: "Corto, entrop., CMU.", body: [ "Cuent(195(195)6) …  ", " Cort. ", "https://users.ece.cmu.edu/~gamvrosi/thelastq.html" ] },
    ja: { title: "最後(最後)の問(問) ", excerpt: "短(短) 。 ", body: [ " 195(195)6, 。 ", " 短(短) 。 ", "https://users.ece.cmu.edu/~gamvrosi/thelastq.html" ] },
    de: { title: "The Last Question, I. Asimov", excerpt: "Kurz, CMU.", body: [ "Kur(195(195)6) …  ", " Kur. ", "https://users.ece.cmu.edu/~gamvrosi/thelastq.html" ] },
    fr: { title: "The Last Question, I. Asimov", excerpt: "Court, CMU.", body: [ "C(195(195)6) …  ", " Cou. ", "https://users.ece.cmu.edu/~gamvrosi/thelastq.html" ] },
    it: { title: "The Last Question, I. Asimov", excerpt: "Brev, CMU.", body: [ "B(195(195)6) …  ", " B. ", "https://users.ece.cmu.edu/~gamvrosi/thelastq.html" ] },
    "zh-CN": { title: "《最后(最後)一问(問) 》", excerpt: "熵(熵) 。 ", body: [ " 195(195)6, 。 ", " 。 ", "https://users.ece.cmu.edu/~gamvrosi/thelastq.html" ] },
    "zh-TW": { title: "《最(最) 後(後) 的(的) 問(問) 》", excerpt: "熵(熵) 。 ", body: [ " 195(195)6, 。 ", " 。 ", "https://users.ece.cmu.edu/~gamvrosi/thelastq.html" ] },
  },
  "zimbardo-o-efeito-lucifer": {
    en: { title: "The Lucifer Effect, Philip Zimbardo", excerpt: "Cruelty is not just “monsters”—situation, status, and institution can pull people toward harm.", imageAlt: "M. C. Escher, Circle Limit IV (Heaven and Hell, 1960): woodcut tessellation of angels and devils; work tied to The Lucifer Effect (Zimbardo).", body: [ "I keep the literature list mostly toward play, wonder, the metaphysical; the heavier, society-facing things sit in Utilities. Still, so the shelf is not all esotery: ", "Zimbardo’s book argues that brutality is not only a trait in a few people; the situation can unanchor what feels right. Context, power, and role are central.", "See Utilities for the serious social-issues shelf." ] },
    ko: { title: "루(루)시(시)퍼(퍼)효(효) 。 ", excerpt: " 。 ", imageAlt: "Efe( Rec( ", body: [ "책(책) 。 ", "Efe(。 ", " U( 。 " ] },
    es: { title: "Efecto Lucifer", excerpt: "。 ", imageAlt: "C., Es., Z.", body: [ "Blo(。 ", " Lib( 。 ", " U( 。 " ] },
    ja: { title: "ル(ル)西(西) 。 ", excerpt: " 。 ", imageAlt: "E( ", body: [ " 本(。 ", "E( 。 ", "U( 。 " ] },
    de: { title: "Der Lucifer-Effekt", excerpt: "S., R., I.", imageAlt: "B., E., Z.", body: [ "Blo( …  ", " Luc( …  ", " U( …  " ] },
    fr: { title: "L'effet Lucifer", excerpt: "S., r., i.", imageAlt: "B., E., Z.", body: [ "Blo( …  ", " Luc( …  ", " U( …  " ] },
    it: { title: "L'effetto Lucifero", excerpt: "C., r.", imageAlt: "B., E., Z.", body: [ "Blo( …  ", " Luc( …  ", " U( …  " ] },
    "zh-CN": { title: "《路(路) 西(西) 法(法) 》", excerpt: " 。 ", imageAlt: "E( ", body: [ " 此(此) 。 ", "E( 。 ", " 實(實) 。 " ] },
    "zh-TW": { title: "《路(路) 西(路) 》", excerpt: " 。 ", imageAlt: "E( ", body: [ " 此(此) 。 ", " 。 ", " 實(實) 。 " ] },
  },
};
