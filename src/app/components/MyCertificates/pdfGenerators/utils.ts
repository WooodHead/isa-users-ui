import { PDFDocument, PDFFont, rgb } from 'pdf-lib';

export const isaRed = rgb(237 / 255, 80 / 255, 53 / 255);
export const isaBlue = rgb(0 / 255, 160 / 255, 153 / 255);

let fontCache;

export const convertToYCoordinate = (
  y: number,
  height: number,
  font: PDFFont,
  fontSize: number,
) => {
  // No idea why heightAtSize returns with error margin 6
  return height - (y + 6 + font.heightAtSize(fontSize) / 2);
};

export const embedFonts = async (pdfDoc: PDFDocument) => {
  if (!fontCache) {
    await loadFonts();
  }
  const regularFont = await pdfDoc.embedFont(fontCache[0]);
  const semiboldFont = await pdfDoc.embedFont(fontCache[1]);
  const boldFont = await pdfDoc.embedFont(fontCache[2]);
  return { regularFont, semiboldFont, boldFont };
};

export const loadFonts = async () => {
  const regularFont = await fetch(
    '/fonts/montserrat/Montserrat-Regular.ttf',
  ).then(res => res.arrayBuffer());

  const semibold = await fetch(
    '/fonts/montserrat/Montserrat-SemiBold.ttf',
  ).then(res => res.arrayBuffer());

  const bold = await fetch('/fonts/montserrat/Montserrat-Bold.ttf').then(res =>
    res.arrayBuffer(),
  );
  fontCache = [regularFont, semibold, bold];
};
