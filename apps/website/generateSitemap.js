const { writeFileSync } = require("fs");

const LOCALES = ["en", "de", "ru", "ua"];

const URLS = [
  "/",
  "/gallery",
  "/notfound",
  "/impressum",
  "/wheel",
  "/door-panel",
  "/salon",
];

const HOST = "https://autosattlerei-guk.de";

const now = new Date();
const year = now.getFullYear();
const month = now.getMonth() + 1;
const day = now.getDate();
const date = `${year}-${month}-${day}`;

let sitemap = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

const urls = LOCALES.flatMap((locale) => URLS.map((url) => `/${locale}${url}`));

for (const url of urls) {
  sitemap += "<url>";
  sitemap += `<loc>${HOST}${url}</loc>`;
  sitemap += `<lastmod>${date}</lastmod>`;
  sitemap += "</url>";
}
sitemap += `</urlset>`;

writeFileSync("./public/sitemap.xml", sitemap);
