import PDF_EN from './templates/honorary-members-en.pdf';
import { PDFDocument } from 'pdf-lib';
import {
  convertToYCoordinate,
  isaBlue,
  isaRed,
  loadPDFTemplate,
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
  const { boldFont, page, pageHeight, pageWidth, pdfDoc, semiboldFont } =
    await loadPDFTemplate(blankPDF);

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
