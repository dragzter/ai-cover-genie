import { NextRequest } from "next/server";
import puppeteer from "puppeteer";

export async function POST(req: NextRequest) {
  const { html } = await req.json();

  // Define CSS styles to apply to the PDF
  const styleTag = `
    <style>
      body {
        font-family: Arial, sans-serif;
        font-size: 12px;
        line-height: 1.5;
        margin: 0;
        padding: 0;
      }

      .resume-name {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 0.25em;
      }

      .resume-contact {
        font-size: 12px;
        margin-bottom: 1em;
        color: #444;
      }

      .resume-summary {
        font-size: 14px;
        margin-bottom: 1.5em;
      }

      .resume h3 {
        font-size: 16px;
        font-weight: bold;
        margin-top: 1em;
        margin-bottom: 0.5em;
      }

      .resume-skills {
        list-style: none !important;
        padding: 0;
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }

      .resume .resume-skills {
        margin: 0 !important;
        line-height: 1.5;
        font-size: 12px;
      }


      .resume-experience {
        margin-bottom: 1.5em;
      }
      
      .resume-experience ul li {
         margin-bottom: 5px;
      }
      
      .resume-experience ul li p {
        margin: 0;
        padding: 0;
      }
      
      .resume h4 {
        margin-bottom: 10px;
        margin-top: 0
      }

      .job-title {
        display: flex;
        justify-content: space-between;
        font-weight: bold;
      }

      .resume-experience ul {
        padding-left: 1.2em;
      }

      .resume-education {
        margin-top: 0.5em;
      }
    </style>
  `;

  // Inject CSS and wrap the content in a basic HTML document
  const fullHtml = `
    <html>
      <head>${styleTag}</head>
      <body>${html}</body>
    </html>
  `;

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.setContent(fullHtml, { waitUntil: "networkidle0" });

  const contentHeight = await page.evaluate(() => {
    const body = document.body;
    const html = document.documentElement;
    return Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight,
    );
  });

  const height = contentHeight + 140;

  const pdfBuffer = await page.pdf({
    width: "8.27in", // A4 width
    height: `${height}px`, // dynamic height
    printBackground: true,
    margin: {
      top: "0.5in",
      bottom: "0.5in",
      left: "0.5in",
      right: "0.5in",
    },
  });

  await browser.close();

  return new Response(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=resume.pdf",
    },
  });
}
