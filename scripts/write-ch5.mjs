import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const d = path.dirname(fileURLToPath(import.meta.url));
const o = {
  en: {
    title: "Channel 5 with Andrew Callaghan",
    excerpt:
      "Channel 5 with Andrew Callaghan is an independent documentary-journalism project launched in 2021, presented by Andrew Callaghan and created after the end of All Gas No Brakes.",
    body: [
      "Channel 5 with Andrew Callaghan is an independent documentary-journalism project launched in 2021, presented by Andrew Callaghan and created after the end of All Gas No Brakes. The channel mixes street interviews, event coverage, character profiles, and longer docs, published mainly on YouTube and Patreon.",
    ],
  },
  ko: {
    title: "Channel 5 with Andrew Callaghan",
    excerpt:
      "Channel 5 with Andrew Callaghan는 2021년에 착수된 독립 다큐멘터리·저널리즘 프로젝트이며, 앤드루 캘러핸이 진행하고, All Gas No Brakes가 끝난 뒤에 나온 흐름에 묶인다.",
    body: [
      "Channel 5 with Andrew Callaghan는 2021년에 착수된 독립 다큐멘터리·저널리즘 프로젝트이며, 앤드루 캘러핸이 진행한다. All Gas No Brakes가 끝난 뒤에 나온 흐름에 붙는다. 채널은 인터뷰, 이벤트, 인물, 좀 긴 기록을 섞고, 주로 YouTube·Patreon에 올린다.",
    ],
  },
  es: {
    title: "Channel 5 with Andrew Callaghan",
    excerpt:
      "Channel 5 with Andrew Callaghan es un proyecto de periodismo documental independiente, lanzado en 2021, con Andrew Callaghan, surgido al terminar All Gas No Brakes.",
    body: [
      "Channel 5 with Andrew Callaghan es un proyecto de periodismo documental independiente, lanzado en 2021, con Andrew Callaghan, surgido al terminar All Gas No Brakes. Mezcla entrevistas de calle, cobertura de acontecimientos, perfiles y documentales largos, publicados principalmente en YouTube y Patreon.",
    ],
  },
  ja: {
    title: "Channel 5 with Andrew Callaghan",
    excerpt:
      "Channel 5 with Andrew Callaghan は 2021 年に始まり、Andrew Callaghan が前に立ち、All Gas No Brakes の後に続く、独立系のドキュメンタリー／報道プロジェクト。",
    body: [
      "Channel 5 with Andrew Callaghan は 2021 年に始まり、独立のドキュメンタリー／ジャーナリズム。Andrew Callaghan。All Gas No Brakes 終了後。街頭インタビュー、イベント、人物、長尺、主に YouTube・Patreon。",
    ],
  },
  de: {
    title: "Channel 5 with Andrew Callaghan",
    excerpt:
      "Channel 5 with Andrew Callaghan ist unabhängiges journalistisches Dokumentarfilmprojekt, Start 2021, mit Andrew Callaghan, entstanden nach All Gas No Brakes.",
    body: [
      "Channel 5 with Andrew Callaghan ist unabhängiges journalistisches Dokumentarfilmprojekt, Start 2021, mit Andrew Callaghan, entstanden nach All Gas No Brakes. Straßenumfragen, Berichterstattung, Porträts, lange Filme, vor allem YouTube und Patreon.",
    ],
  },
  fr: {
    title: "Channel 5 with Andrew Callaghan",
    excerpt:
      "Channel 5 with Andrew Callaghan est un projet de journalisme documentaire indépendant lancé en 2021, porté par Andrew Callaghan, après la fin d’All Gas No Brakes.",
    body: [
      "Channel 5 with Andrew Callaghan est un projet de journalisme documentaire indépendant lancé en 2021, porté par Andrew Callaghan, après la fin d’All Gas No Brakes. Entretiens de rue, sujets d’événements, portraits, formats longs, en ligne surtout YouTube et Patreon.",
    ],
  },
  it: {
    title: "Channel 5 with Andrew Callaghan",
    excerpt:
      "Channel 5 with Andrew Callaghan è un progetto indipendente di giornalismo documentario, avviato nel 2021, con Andrew Callaghan, dopo la fine di All Gas No Brakes.",
    body: [
      "Channel 5 with Andrew Callaghan è un progetto indipendente di giornalismo documentario, avviato nel 2021, con Andrew Callaghan, dopo la fine di All Gas No Brakes. Mescola interviste in strada, coperture di eventi, ritratti, documenti lunghi, soprattutto su YouTube e Patreon.",
    ],
  },
  "zh-CN": {
    title: "Channel 5 with Andrew Callaghan",
    excerpt:
      "Channel 5 with Andrew Callaghan 是 2021 年启动的、由 Andrew Callaghan 主持、在 All Gas No Brakes 告段落之后接上的、独立纪录／新闻式项目。",
    body: [
      "Channel 5 with Andrew Callaghan 是 2021 年启动的、由 Andrew Callaghan 主持、在 All Gas No Brakes 结束之后接上的、独立纪录片/新闻式项目。混合街头采访、活动、人物、长片，主要在 YouTube 与 Patreon 发布。",
    ],
  },
  "zh-TW": {
    title: "Channel 5 with Andrew Callaghan",
    excerpt:
      "Channel 5 with Andrew Callaghan 是 2021 年啟的、由 Andrew Callaghan 主持、在 All Gas No Brakes 畫上句點之後、接上的、獨立紀錄／新聞式專案。",
    body: [
      "Channel 5 with Andrew Callaghan 是 2021 年啟的、由 Andrew Callaghan 主持、在 All Gas No Brakes 畫上句點之後接上的、獨立紀錄／新聞式專案。混街訪、活動、人、長一點的片，主在 YouTube 與 Patreon。",
    ],
  },
};
fs.writeFileSync(
  path.join(d, "batch2-frags", "channel-5-andrew-callaghan.json"),
  JSON.stringify(o, null, 2) + "\n",
);
