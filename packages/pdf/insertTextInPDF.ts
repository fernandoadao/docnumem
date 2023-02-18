import { degrees, PDFDocument, rgb, StandardFonts } from "pdf-lib";

export async function insertTextInPDF(
  pdfAsBase64: string,
  text: string,
  positionX: number,
  positionY: number,
  page: number = 0
): Promise<string> {
  const existingPdfBytes = pdfAsBase64;

  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const pages = pdfDoc.getPages();
  const firstPage = pages[page];
  firstPage.drawText(text, {
    x: positionX,
    y: positionY,
    size: 25,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  });

  const pdfAsUint8Array = await pdfDoc.save();
  return Buffer.from(pdfAsUint8Array).toString("base64");
}