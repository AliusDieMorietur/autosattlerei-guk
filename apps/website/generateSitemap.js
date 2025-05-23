const { writeFileSync } = require("fs");

const LOCALES = ["en", "de", "ru", "ua"];

const URLS = [
  "",
  "/gallery",
  "/notfound",
  "/impressum",
  "/gallery/wheel",
  "/gallery/door-panel",
  "/gallery/salon",
];

const HOST = "https://autosattlerei-guk.de";
const urls = LOCALES.flatMap((locale) => URLS.map((url) => `/${locale}${url}`));

const now = new Date();
const year = now.getFullYear();
const month = String(now.getMonth() + 1).padStart(2, "0");
const day = String(now.getDate()).padStart(2, "0");
const date = `${year}-${month}-${day}`;

let sitemap = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

for (const url of urls) {
  sitemap += "<url>";
  sitemap += `<loc>${HOST}${url}</loc>`;
  sitemap += `<lastmod>${date}</lastmod>`;
  sitemap += "</url>";
}
sitemap += `</urlset>`;

writeFileSync("./public/sitemap.xml", sitemap);
