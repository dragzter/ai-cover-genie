"use client";

import { PDFDocument, StandardFonts } from "pdf-lib";
// @ts-expect-error
//import html2pdf from "html2pdf.js";

export async function downloadTextAsPdf(text: string, fileName = "resume.pdf") {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  console.log(text);

  const fontSize = 12;
  const margin = 40;
  const maxWidth = page.getWidth() - margin * 2;

  const lines = splitTextIntoLines(text, font, fontSize, maxWidth);

  let y = page.getHeight() - margin;
  lines.forEach((line) => {
    if (y <= margin) {
      y = page.getHeight() - margin;
      pdfDoc.addPage(); // new page if needed
    }
    page.drawText(line, { x: margin, y, size: fontSize, font });
    y -= fontSize + 4;
  });

  const pdfBytes = await pdfDoc.save();

  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
}

function splitTextIntoLines(
  text: string,
  font: any,
  fontSize: number,
  maxWidth: number,
): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let line = "";

  for (let word of words) {
    const testLine = line ? `${line} ${word}` : word;
    const width = font.widthOfTextAtSize(testLine, fontSize);

    if (width < maxWidth) {
      line = testLine;
    } else {
      lines.push(line);
      line = word;
    }
  }

  if (line) lines.push(line);
  return lines;
}

//
// export function downloadHtmlAsPdf(elementId: string, fileName = "resume.pdf") {
//   const element = document.getElementById(elementId);
//   if (!element) return console.error("Element not found:", elementId);
//
//   const opt = {
//     margin: 0.5,
//     filename: fileName,
//     image: { type: "jpeg", quality: 0.98 },
//     html2canvas: { scale: 2 },
//     jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
//   };
//
//   html2pdf().from(element).set(opt).save();
// }
