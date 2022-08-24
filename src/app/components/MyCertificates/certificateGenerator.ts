import { PDFDocument } from 'pdf-lib';
import { CertificateItem } from 'app/components/MyCertificates/types';

import * as honoraryMembers from './pdfGenerators/honorary-members';
import * as instructorB from './pdfGenerators/instructor-b';
import * as instructorC from './pdfGenerators/instructor-c';
import * as rigger from './pdfGenerators/rigger';
import * as isaMember from './pdfGenerators/isa-membership';
import * as approvedGear from './pdfGenerators/approved-gear';
import * as worldRecord from './pdfGenerators/world-record';
import * as athleticAward from './pdfGenerators/athletic-award';
import * as athleteExellence from './pdfGenerators/athletic-exellence';
import * as contestOrganizer from './pdfGenerators/contest-organizer';

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
        pdf = await instructorC.generate(language, item.data);
      }
      break;
    case 'rigger':
      pdf = await rigger.generate(language, item.data);
      break;
    case 'isa-membership':
      pdf = await isaMember.generate(language, item.data);
      break;
    case 'approved-gear':
      pdf = await approvedGear.generate(language, item.data);
      break;
    case 'world-record':
      pdf = await worldRecord.generate(language, item.data);
      break;
    case 'athletic-award':
      pdf = await athleticAward.generate(language, item.data);
      break;
    case 'athlete-certificate-of-exellence':
      pdf = await athleteExellence.generate(language, item.data);
      break;
    case 'contest-organizer':
      pdf = await contestOrganizer.generate(language, item.data);
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
