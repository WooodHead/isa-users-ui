import PDF_EN from './templates/rigger-en.pdf';

import { PDFDocument } from 'pdf-lib';
import {
  convertToYCoordinate,
  isaBlue,
  isaRed,
  loadPDFTemplate,
} from 'app/components/MyCertificates/pdfGenerators/utils';
import { PDFModificationsObject } from 'app/components/MyCertificates/pdfGenerators/types';

interface Props {
  fullname: string;
  startDate: string;
  endDate: string;
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
    fullname: {
      size: 21,
      font: boldFont,
      color: isaRed,
      x: pageWidth / 2 - boldFont.widthOfTextAtSize(data.fullname, 21) / 2,
      y: convertToYCoordinate(172, pageHeight, boldFont, 21),
    },
    startDate: {
      size: 16,
      font: semiboldFont,
      color: isaBlue,
      x: 388,
      y: convertToYCoordinate(420, pageHeight, semiboldFont, 16),
    },
    endDate: {
      size: 16,
      font: semiboldFont,
      color: isaBlue,
      x: 618,
      y: convertToYCoordinate(420, pageHeight, semiboldFont, 16),
    },
  };

  for (const [key, value] of Object.entries(modifications)) {
    page.drawText(data[key], {
      ...value,
    });
  }
  return pdfDoc;
}
