import { GetAllCertificatesAPIResponse } from 'app/api/types';
import {
  CertificateItem,
  CertificateType,
} from 'app/components/MyCertificates/types';

export const parseCertificatesFromSpreadsheet = (
  spreadsheetItems: GetAllCertificatesAPIResponse['items'] | undefined,
) => {
  if (!spreadsheetItems) {
    return [];
  }
  const certificates: CertificateItem[] = [];
  for (const spreadsheetItem of spreadsheetItems) {
    certificates.push(...parse(spreadsheetItem.range, spreadsheetItem.values));
  }
  return certificates;
};

const parse = (range: string, values: string[][]) => {
  const items: CertificateItem[] = [];
  for (const row of values) {
    for (const [key, value] of Object.entries(parsers)) {
      if (range.includes(value.range)) {
        items.push(value.parse(row));
      }
    }
  }
  return items;
};

const parsers: {
  [P in CertificateType]: {
    range: string;
    parse: (row: string[]) => CertificateItem;
  };
} = {
  instructor: {
    range: 'Instructors',
    parse: row => ({
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
    }),
  },
  rigger: {
    range: 'Riggers',
    parse: row => ({
      certificateType: 'rigger',
      name: `Rigger Level ${row[4].trim()}`,
      languages: ['en'],
      data: {
        name: row[2].trim().toUpperCase(),
        surname: row[3].trim().toUpperCase(),
        level: row[4].trim().toUpperCase(),
        startDate: row[5].trim().toUpperCase(),
        endDate: row[6].trim().toUpperCase(),
      },
    }),
  },
  'athletic-award': {
    range: 'Athletic Award(Contest)',
    parse: row => ({
      certificateType: 'athletic-award',
      name: `Athletic Award`,
      languages: ['en'],
      data: {
        name: row[2].trim().toUpperCase(),
        surname: row[3].trim().toUpperCase(),
        representing: row[4].trim().toUpperCase(),
        rank: row[5].trim().toUpperCase(),
        competitionName: row[6].trim().toUpperCase(),
        location: row[7].trim().toUpperCase(),
        dateOfFinals: row[8].trim().toUpperCase(),
        contestSize: row[9].trim().toUpperCase(),
        category: row[10].trim().toUpperCase(),
        discipline: row[11].trim().toUpperCase(),
      },
    }),
  },
  'athlete-certificate-of-exellence': {
    range: 'Athlete Certificate of Exellence(Year)',
    parse: row => ({
      certificateType: 'athlete-certificate-of-exellence',
      name: `Athlete Certificate of Exellence`,
      languages: ['en'],
      data: {
        name: row[2].trim().toUpperCase(),
        surname: row[3].trim().toUpperCase(),
        representing: row[4].trim().toUpperCase(),
        year: row[5].trim().toUpperCase(),
        rank: row[6].trim().toUpperCase(),
        category: row[7].trim().toUpperCase(),
        discipline: row[8].trim().toUpperCase(),
      },
    }),
  },
  'contest-organizer': {
    range: 'Contest Organizer',
    parse: row => ({
      certificateType: 'contest-organizer',
      name: `Contest Organizer`,
      languages: ['en'],
      data: {
        name: row[2].trim().toUpperCase(),
        surname: row[3].trim().toUpperCase(),
        contestName: row[4].trim().toUpperCase(),
        country: row[5].trim().toUpperCase(),
        date: row[6].trim().toUpperCase(),
        discipline: row[7].trim().toUpperCase(),
        contestSize: row[8].trim().toUpperCase(),
      },
    }),
  },
  'isa-membership': {
    range: 'ISA Membership',
    parse: row => ({
      certificateType: 'isa-membership',
      name: `ISA Membership`,
      languages: ['en'],
      data: {
        membership: row[2].trim().toUpperCase(),
        name: row[3].trim().toUpperCase(),
        date: row[4].trim().toUpperCase(),
        location: row[5].trim().toUpperCase(),
      },
    }),
  },
  'world-record': {
    range: 'World Records',
    parse: row => ({
      certificateType: 'world-record',
      name: `World Record`,
      languages: ['en'],
      data: {
        recordType: row[2].trim().toUpperCase(),
        specs: row[3].trim().toUpperCase(),
        name: row[4].trim().toUpperCase(),
        category: row[5].trim().toUpperCase(),
        date: row[6].trim().toUpperCase(),
      },
    }),
  },
  honoraryMember: {
    range: 'Honorary Members',
    parse: row => ({
      certificateType: 'honoraryMember',
      name: `Honorary Member`,
      languages: ['en'],
      data: {
        fullname: row[2].trim().toUpperCase(),
        date: row[3].trim().toUpperCase(),
      },
    }),
  },
  'approved-gear': {
    range: 'Approved Gear',
    parse: row => ({
      certificateType: 'approved-gear',
      name: `Approved Gear: ${row[3].trim()}`,
      languages: ['en'],
      data: {
        brand: row[2].trim().toUpperCase(),
        modelName: row[3].trim().toUpperCase(),
        modelVersion: row[4].trim().toUpperCase(),
        releaseYear: row[5].trim().toUpperCase(),
        productLink: row[6].trim().toUpperCase(),
        manualLink: row[7].trim().toUpperCase(),
        testingLab: row[8].trim().toUpperCase(),
        testDate: row[9].trim().toUpperCase(),
        productType: row[10].trim().toUpperCase(),
        standard: row[11].trim().toUpperCase(),
        standardVersion: row[12].trim().toUpperCase(),
      },
    }),
  },
};
