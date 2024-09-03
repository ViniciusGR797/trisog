import { NextApiRequest, NextApiResponse } from "next";
import { format } from "date-fns";

const getBaseUrl = (req: NextApiRequest): string => {
  const protocol = req.headers["x-forwarded-proto"] || "http";
  const host = req.headers.host || "localhost:3000";
  return `${protocol}://${host}`;
};

const Sitemap = (req: NextApiRequest) => {
  const baseUrl = getBaseUrl(req);

  const pages = [
    "",
    "/create-account",
    "/home",
    "/destination",
    "/destination/{destinationId}",
    "/tours",
    "/tours/{experienceId}",
  ];

  const urls = pages.map((page) => ({
    loc: `${baseUrl}${page}`,
    lastmod: format(new Date(), "yyyy-MM-dd"),
    changefreq: "monthly",
    priority: page === "" ? 1.0 : 0.8,
  }));

  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls
      .map(
        (url) => `
      <url>
        <loc>${url.loc}</loc>
        <lastmod>${url.lastmod}</lastmod>
        <changefreq>${url.changefreq}</changefreq>
        <priority>${url.priority}</priority>
      </url>
    `
      )
      .join("")}
  </urlset>`;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Content-Type", "application/xml");
  res.write(Sitemap(req));
  res.end();
}