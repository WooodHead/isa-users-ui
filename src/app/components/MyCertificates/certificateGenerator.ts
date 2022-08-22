import { PDFDocument } from 'pdf-lib';
import { CertificateItem } from 'app/components/MyCertificates/types';

import * as honoraryMembers from './pdfGenerators/honorary-members';
import * as instructorB from './pdfGenerators/instructor-b';
import * as rigger from './pdfGenerators/rigger';

export const generateCertificate = async (
  item: CertificateItem,
  language: string,
) => {
  let pdf: PDFDocument | undefined;
  switch (item.certificateType) {
    case 'honoraryMember':
      pdf = await honoraryMembers.generate(language, item.data);
      break;
    case 'instructor':
      if (item.data.level.toUpperCase() === 'B') {
        pdf = await instructorB.generate(language, item.data);
      }
      if (item.data.level.toUpperCase() === 'C') {
        pdf = await instructorB.generate(language, item.data);
      }
      break;
    case 'rigger':
      pdf = await rigger.generate(language, item.data);
      break;
    default:
      break;
  }
  if (pdf) {
    await openPDF(pdf);
  }
};

const openPDF = async (pdf: PDFDocument) => {
  const pdfBytes = await pdf.save();
  const file = new Blob([pdfBytes], { type: 'application/pdf' });
  const fileURL = URL.createObjectURL(file);
  const pdfWindow = window.open();
  pdfWindow!.location.href = fileURL;
};
