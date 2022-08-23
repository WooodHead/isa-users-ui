import PDF_EN from './templates/world-record-en.pdf';

import { PDFDocument } from 'pdf-lib';
import {
  convertToYCoordinate,
  isaBlue,
  isaRed,
  loadPDFTemplate,
} from 'app/components/MyCertificates/pdfGenerators/utils';
import { PDFModificationsObject } from 'app/components/MyCertificates/pdfGenerators/types';

interface Props {
  recordType: string;
  specs: string;
  name: string;
  category: string;
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

  const modifications: PDFModificationsObject<Props> = {
    recordType: {
      size: 21,
      font: boldFont,
      color: isaBlue,
      x: pageWidth / 2 - boldFont.widthOfTextAtSize(data.recordType, 21) / 2,
      y: convertToYCoordinate(213, pageHeight, boldFont, 21),
    },
    specs: {
      size: 16,
      font: semiboldFont,
      color: isaBlue,
      x: 336,
      y: convertToYCoordinate(259, pageHeight, semiboldFont, 16),
    },
    name: {
      size: 21,
      font: boldFont,
      color: isaRed,
      x: 336,
      y: convertToYCoordinate(293, pageHeight, boldFont, 21),
    },
    date: {
      size: 16,
      font: semiboldFont,
      color: isaBlue,
      x: 336,
      y: convertToYCoordinate(332, pageHeight, semiboldFont, 16),
    },
  };

  for (const [key, value] of Object.entries(modifications)) {
    page.drawText(data[key], {
      ...value,
    });
  }
  return pdfDoc;
}
