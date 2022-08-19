import { GetAllCertificatesAPIResponse } from 'app/api/types';
import { CertificateItem } from 'app/components/MyCertificates/types';

export const parseCertificatesFromSpreadsheet = (
  spreadsheetItems: GetAllCertificatesAPIResponse['items'] | undefined,
) => {
  if (!spreadsheetItems) {
    return [];
  }
  const certificates: CertificateItem[] = [];
  for (const spreadsheetItem of spreadsheetItems) {
    certificates.push(
      ...parseInstructors(spreadsheetItem.range, spreadsheetItem.values),
    );
    certificates.push(
      ...parseHonoraryMembers(spreadsheetItem.range, spreadsheetItem.values),
    );
  }

  return certificates;
};

const parseInstructors = (range: string, values: string[][]) => {
  if (!range.includes('Instructors')) {
    return [];
  }
  const items: CertificateItem[] = [];
  for (const row of values) {
    items.push({
      certificateType: 'instructor',
      name: `Instructor Level ${row[4].trim()}`,
      languages: ['en'],
      data: {
        name: row[2].trim().toUpperCase(),
        surname: row[3].trim().toUpperCase(),
        level: row[4].trim().toUpperCase(),
        startDate: row[5].trim().toUpperCase(),
        endDate: row[6].trim().toUpperCase(),
      },
    });
  }
  return items;
};

const parseHonoraryMembers = (range: string, values: string[][]) => {
  if (!range.includes('Honorary Members')) {
    return [];
  }
  const items: CertificateItem[] = [];
  for (const row of values) {
    items.push({
      certificateType: 'honoraryMember',
      name: `Honorary Member`,
      languages: ['en'],
      data: {
        fullname: row[2].trim().toUpperCase(),
        date: row[3].trim(),
      },
    });
  }
  return items;
};
