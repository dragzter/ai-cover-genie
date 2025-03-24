"use client";

import * as pdfjsLib from "pdfjs-dist";
import { getDocument } from "pdfjs-dist";
// @ts-expect-error
import workerUrl from "pdfjs-dist/build/pdf.worker?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl;

export default async function PdfReader({ file }: { file: File }) {
  const buffer = await file.arrayBuffer();
  const pdf = await getDocument({ data: new Uint8Array(buffer) }).promise;

  let fullText = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    fullText += content.items.map((item: any) => item.str).join(" ") + "\n";
  }

  return fullText;
}
