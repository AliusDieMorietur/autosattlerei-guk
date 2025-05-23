const { readdirSync, statSync, writeFileSync } = require("fs");
const { join, extname } = require("path");

const IMAGE_EXTENSIONS = [".webp", ".png", ".jpg", ".jpeg"];
const HOST = "https://autosattlerei-guk.de";
const SITEMAP_PATHNAME = "./public/image-sitemap.xml";
const IMAGE_DIR = "./public";
const CAPTION = `Eine Werkstatt für das Neubeziehen von Fahrzeuginnenräumen. Arbeiten in allen Schwierigkeitsgraden. Vielfältige Arbeitsoptionen: Neubezug von Türverkleidungen, Sitzen, Lenkrädern, Armaturenbrettern, Dachhimmeln, Griffen, Schalthebeln und kompletten Innenräumen. Von Oldtimern bis hin zu Supersportwagen. Handwerkskunst auf höchstem Niveau.`;
const TITLE = "ein Arbeitsbeispiel";

const findImageFiles = (dir, imageFiles = []) => {
  try {
    const files = readdirSync(dir);

    for (const file of files) {
      const filePath = join(dir, file);
      const stat = statSync(filePath);

      if (stat.isDirectory()) {
        findImageFiles(filePath, imageFiles);
      } else if (stat.isFile()) {
        const ext = extname(file).toLowerCase();
        if (IMAGE_EXTENSIONS.includes(ext)) {
          imageFiles.push(filePath);
        }
      }
    }
  } catch (error) {
    console.warn(`Warning: Could not read directory ${dir}:`, error.message);
  }
  return imageFiles;
};

const urls = findImageFiles(IMAGE_DIR);

const now = new Date();
const year = now.getFullYear();
const month = now.getMonth() + 1;
const day = now.getDate();
const date = `${year}-${month}-${day}`;

let sitemap = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`;
for (const url of urls) {
  const location = `${HOST}${url.replace("public", "")}`;
  sitemap += "<url>";
  sitemap += `<loc>${location}</loc>`;
  sitemap += `<image:image>`;
  sitemap += `<image:loc>${location}</image:loc>`;
  sitemap += `<image:title>${TITLE}</image:title>`;
  sitemap += `<image:caption>${CAPTION}</image:caption>`;
  sitemap += `</image:image>`;
  sitemap += `<lastmod>${date}</lastmod>`;
  sitemap += "</url>";
}
sitemap += `</urlset>`;

writeFileSync(SITEMAP_PATHNAME, sitemap);
