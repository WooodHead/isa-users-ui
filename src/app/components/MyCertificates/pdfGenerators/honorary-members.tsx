import PDF_EN from './templates/honorary-members-en.pdf';

import { PDFDocument } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import {
  convertToYCoordinate,
  embedFonts,
  isaBlue,
  isaRed,
} from 'app/components/MyCertificates/pdfGenerators/utils';

interface Props {
  fullname: string;
  date: string;
}

export const PDFs = { en: PDF_EN };

export async function generate(
  language: string,
  data: Props,
): Promise<PDFDocument> {
  const blankPDF = PDFs[language] || PDFs.en;

  const res = await fetch(blankPDF);
  const existingPdfBytes = await res.arrayBuffer();

  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  pdfDoc.registerFontkit(fontkit);
  const { semiboldFont, boldFont } = await embedFonts(pdfDoc);

  const pages = pdfDoc.getPages();
  const page = pages[0];
  const pageHeight = page.getSize().height;
  const pageWidth = page.getSize().width;

  const modifications = {
    fullname: {
      size: 21,
      font: boldFont,
      color: isaRed,
      x: pageWidth / 2 - boldFont.widthOfTextAtSize(data.fullname, 21) / 2,
      y: convertToYCoordinate(259, pageHeight, boldFont, 21),
    },
    date: {
      size: 16,
      font: semiboldFont,
      color: isaBlue,
      x: 424,
      y: convertToYCoordinate(401, pageHeight, semiboldFont, 16),
    },
  };

  page.drawText(data.fullname, {
    ...modifications.fullname,
  });

  page.drawText(data.date, {
    ...modifications.date,
  });

  return pdfDoc;
}
