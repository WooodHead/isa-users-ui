import PDF_EN from './templates/instructor-c-en.pdf';

import { PDFDocument } from 'pdf-lib';
import {
  convertToYCoordinate,
  isaBlue,
  isaRed,
  loadPDFTemplate,
} from 'app/components/MyCertificates/pdfGenerators/utils';
import { PDFModificationsObject } from 'app/components/MyCertificates/pdfGenerators/types';

interface Props {
  name: string;
  surname: string;
  level: string;
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

  const fullname = `${data.name} ${data.surname}`;

  const modifications: PDFModificationsObject<Props> = {
    fullname: {
      size: 21,
      font: boldFont,
      color: isaRed,
      x: pageWidth / 2 - boldFont.widthOfTextAtSize(fullname, 21) / 2,
      y: convertToYCoordinate(218, pageHeight, boldFont, 21),
    },
    startDate: {
      size: 16,
      font: semiboldFont,
      color: isaBlue,
      x: 391,
      y: convertToYCoordinate(377, pageHeight, semiboldFont, 16),
    },
    endDate: {
      size: 16,
      font: semiboldFont,
      color: isaBlue,
      x: 616,
      y: convertToYCoordinate(377, pageHeight, semiboldFont, 16),
    },
  };

  for (const [key, value] of Object.entries(modifications)) {
    page.drawText(data[key], {
      ...value,
    });
  }

  return pdfDoc;
}
