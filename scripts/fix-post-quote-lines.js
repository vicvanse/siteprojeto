/**
 * Fix TS string literals in victor-notes-posts.ts: ASCII " inside "..."
 * (introduced when « » were converted to straight quotes) and restore UTF-8 titles.
 * Run after git checkout d56505e -- data/victor-notes-posts.ts && node scripts/remove-harry-post-image.js
 */
const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "../data/victor-notes-posts.ts");
const lines = fs.readFileSync(file, "utf8").split(/\r?\n/);

const patch = {
  332: '      "Parte do catálogo está marcada como gratuita; outras peças pedem subscrição ou sessão iniciada no site. Vale explorar as secções «Free Videos» e os índices por módulo antes de subscrever.",',
  339: `    title: "Nothing — \\"simply do nothing\\"",`,
  346:
    '      "https://usenothing.com/ oferece Nothing: escolhes por quanto tempo queres \\"não fazer nada\\" (ou deixas em aberto), inicias o temporizador e o site conta o tempo — sem metas, sem gamificação, sem lista de tarefas; a ideia é a pausa ser o próprio objectivo.",',
  665:
    '      "GhostEdits publica edições e mashups com estética próxima do remix e do audiovisual de cultura online, por vezes associados a jogos ou a paisagens sonoras eletrônicas. \\"Memory Reboot\\" aparece aqui no contexto de \\"Resilience\\", como peça de vídeo musical ou edição rítmica no YouTube.",',
  680:
    '      "The Twilight Zone é uma série antológica em preto-e-branco: cada episódio apresenta uma história isolada, muitas vezes com reviravolta final, que cruza ficção científica, horror, fantasia e sátira social. Rod Serling foi roteirista central, apresentador e \\"voz\\" do programa; o tom mistura sobriedade literária com economia dramática típica da TV dos anos 1960, sem renunciar a metáfora política ou a crítica velada ao conformismo e ao medo da época.",',
  748: `    title: "Lamp - 恋人へ～ひろがるなみだ",`,
  755:
    '      "Lamp é um projeto musical japonês com raízes em sonoridades próximas do city pop e do indie suave; no YouTube, o canal oficial publica gravações de estúdio e vídeos que acompanham lançamentos. \\"恋人へ～ひろがるなみだ\\" (leitura aproximada: Koibito e ~ Hirogaru namida) integra esse arquivo em formato de vídeo musical.",',
  768:
    '      "\\"julie\\" é um projeto musical com lançamentos que misturam indie rock e texturas próximas do shoegaze ou dream pop, conforme o período e o registo de cada faixa.",',
  770:
    '      "\\"julie\\" é um projeto musical com lançamentos que misturam indie rock e texturas próximas do shoegaze ou dream pop, conforme o período e o registo de cada faixa. \\"feminine adornments\\" aparece como vídeo musical no canal oficial.",',
  786:
    `      "Bonjr é um projeto de música eletrônica com lançamentos que costumam explorar texturas suaves, batidas limpas e atmosfera quase hipnótica, comum em cruzamentos entre future beats, chill e pop sintético. \\"It's Ok, You're Ok\\" circula como vídeo no canal i'm cyborg but that's ok (nome que remete ao filme de Park Chan-wook), com cenas do filme Morro dos Ventos Uivantes.",`,
  799:
    '      "Blue Foundation é uma formação dinamarquesa com raízes em eletrônica e dream pop; \\"Eyes On Fire\\".",',
  801:
    '      "Blue Foundation é uma formação dinamarquesa com raízes em eletrônica e dream pop; \\"Eyes On Fire\\".",',
  817:
    '      "Gravado em Brighton e publicado no canal oficial da banda, o medley junta \\"I Shot the Sheriff\\" e \\"Road to Zion\\" a uma passagem de rap/hip hop, transformando referências conhecidas em uma execução mais crua, expansiva e muito dependente da energia ao vivo.",',
  913:
    '      "Erin Hanson é uma pintora norte-americana conhecida por paisagens em grande formato e pelo que chama de \\"Open Impressionism\\": uma pintura de pinceladas abertas, cor intensa e poucas camadas, voltada menos para o acabamento liso do que para a sensação de luz, movimento e volume.",',
  918:
    '      "Erin Hanson é uma pintora norte-americana conhecida por paisagens em grande formato e pelo que chama de \\"Open Impressionism\\": uma pintura de pinceladas abertas, cor intensa e poucas camadas, voltada menos para o acabamento liso do que para a sensação de luz, movimento e volume.",',
  996:
    '      "A Bridge Leads from One World to the Next é uma gravura de J. J. Grandville incluída em Un Autre Monde (1844), álbum ilustrado que combina fantasia, sátira e imaginação especulativa em uma viagem por mundos inventados. Também vale lembrar as séries em que Grandville se volta a animais antropomorfizados e metamorfoses fantásticas, \\"Les Métamorphoses du jour\\" e \\"Scènes de la vie privée et publique des animaux\\", criando figuras híbridas de humano e animal em cenas cômicas e satíricas.",',
  1031:
    '      "Utagawa Hiroshige (1797—1858) é um dos nomes centrais do ukiyo-e de paisagem. Suas gravuras se destacam pela cor plana, pelo desenho preciso e pelo uso delicado de gradações de tinta (bokashi). Hiroshige foca menos em \\"descrever um lugar com exatidão\\" e mais em representar a atmosfera de um lugar.",',
  1185: `    title: "Blame! (ブラム!)",`,
  1190:
    '      "Blame! (ブラム!) é uma série de manga de Tsutomu Nihei, publicada originalmente na revista Afternoon (Kodansha). O protagonista, Killy, em busca de humanos portadores do Gene Terminal de Rede, atravessa níveis intermináveis de uma cidade-máquina em colapso: passagens, pontes e vãos que não parecem ter fim, desenhados com perspetivas extremas e um preto-e-branco denso. O tom é cyberpunk minimalista, poucos diálogos, ameaças mecânicas e biológicas, e a sensação constante de escala inhumana.",',
  1195:
    '      "Blame! (ブラム!) é uma série de manga de Tsutomu Nihei, publicada originalmente na revista Afternoon (Kodansha).",',
  1228:
    '      "Civilização, felicidade e o que não cabe na \\"máquina\\" de querer o mundo de outro modo.",',
  1290:
    '      "Shoujo Shuumatsu Ryokou (少女終末旅行, Girls\u2019 Last Tour) é um manga de Tsukumizu, serializado na revista online seinen Kurage Bunch (Shinchosha). Acompanhamos Chito e Yuuri, que sobrevivem numa megacidade esvaziada, entre níveis de concreto, neve e máquinas abandonadas, em um Kettenkrad de meia-lagarta, à procura de comida, combustível e sentido.",',
  1356:
    '      "Mary Oliver — Varanasi ao amanhecer: o Ganges, uma mulher na água e o contraste com o olhar «ocidental».",',
};

for (const [k, v] of Object.entries(patch)) {
  const i = Number(k);
  lines[i] = v;
}

fs.writeFileSync(file, lines.join("\r\n"));
new TextDecoder("utf8", { fatal: true }).decode(fs.readFileSync(file));
console.log("patched", Object.keys(patch).length, "lines");
