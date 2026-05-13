const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "../data/victor-notes-posts.ts");
let s = fs.readFileSync(file, "utf8");

const re =
  /,\s*\{\s*src: "\/media\/respostas\/curadoria-harry-potter-azkaban\.png",\s*alt: "[^"]*",\s*\},/;
const next = s.replace(re, "");
if (next === s) {
  console.error("pattern not found");
  process.exit(1);
}
fs.writeFileSync(file, next);
new TextDecoder("utf8", { fatal: true }).decode(fs.readFileSync(file));
console.log("removed harry image block");
