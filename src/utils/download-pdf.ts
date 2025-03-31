"use client";

import { PDFDocument, StandardFonts, rgb, breakTextIntoLines } from "pdf-lib";

export async function downloadResumeAsPdf(
  text: string,
  fileName = "resume.pdf",
) {
  const pdfDoc = await PDFDocument.create();
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

  const fontSize = 11;
  const lineHeight = fontSize + 6;
  // @ts-ignore
  const textLines = breakTextIntoLines(text, [" "], 1500, () => 105);
  const textHeight = lineHeight * textLines.length;
  const numberOfPages = Math.ceil(textHeight / 800);
  const maxLInesPerPage = Math.floor(800 / lineHeight);

  debugger;
  for (let i = 0; i < numberOfPages; i++) {
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();

    const chunkedText = textLines.splice(0, maxLInesPerPage);
    const finalText = chunkedText.join("\n");

    page.drawText(finalText, {
      x: 15,
      y: height - 1.5 * fontSize,
      size: fontSize,
      maxWidth: width - 20,
      lineHeight: fontSize + 6,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
    });
  }

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
}

export async function downloadResumeAsPdf_v2(html: string) {
  const response = await fetch("/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      html,
    }),
  });

  const blob = await response.blob();
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "resume.pdf";
  link.click();

  URL.revokeObjectURL(url); // Clean up memory
}
