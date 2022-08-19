import { PDFDocument } from 'pdf-lib';
import { CertificateItem } from 'app/components/MyCertificates/types';

import * as honoraryMembers from './pdfGenerators/honorary-members';

export const generateCertificate = async (
  item: CertificateItem,
  language: string,
) => {
  let pdf: PDFDocument | undefined;
  if (item.certificateType === 'honoraryMember') {
    pdf = await honoraryMembers.generate(language, item.data);
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
