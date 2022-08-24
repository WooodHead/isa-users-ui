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
        items.push(value.parse(parseRowData(row)));
      }
    }
  }
  return items;
};

const parsers: {
  [P in CertificateType]: {
    range: string;
    parse: (row: ReturnType<typeof parseRowData>) => CertificateItem;
  };
} = {
  instructor: {
    range: 'Instructors',
    parse: row => ({
      certificateType: 'instructor',
      name: `Instructor Level ${row(4)}`,
      languages: ['en'],
      data: {
        fullname: `${row(2)} ${row(3)}`,
        level: row(4),
        startDate: row(5),
        endDate: row(6),
      },
    }),
  },
  rigger: {
    range: 'Riggers',
    parse: row => ({
      certificateType: 'rigger',
      name: `Rigger Level ${row(4)}`,
      languages: ['en'],
      data: {
        fullname: `${row(2)} ${row(3)}`,
        level: row(4),
        startDate: row(5),
        endDate: row(6),
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
        fullname: `${row(2)} ${row(3)}`,
        representing: row(4),
        rank: row(5),
        competitionName: row(6),
        location: row(7),
        dateOfFinals: row(8),
        contestSize: row(9),
        category: row(10),
        discipline: row(11),
      },
    }),
  },
  'athlete-certificate-of-exellence': {
    range: 'Athlete Certificate Of Exellence',
    parse: row => ({
      certificateType: 'athlete-certificate-of-exellence',
      name: `Athlete Certificate of Exellence`,
      languages: ['en'],
      data: {
        fullname: `${row(2)} ${row(3)}`,
        representing: row(4),
        year: row(5),
        rank: row(6),
        category: row(7),
        discipline: row(8),
      },
    }),
  },
  'contest-organizer': {
    range: 'Contest Organizer',
    parse: row => ({
      certificateType: 'contest-organizer',
      name: `Contest Organizer: ${row(4)}`,
      languages: ['en'],
      data: {
        fullname: `${row(2)} ${row(3)}`,
        contestName: row(4),
        country: row(5),
        date: row(6),
        discipline: row(7),
        contestSize: row(8),
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
        membership: row(2),
        name: row(3),
        date: row(4),
        location: row(5),
      },
    }),
  },
  'world-record': {
    range: 'World Records',
    parse: row => ({
      certificateType: 'world-record',
      name: `World Record: ${row(3)}`,
      languages: ['en'],
      data: {
        recordType: row(2),
        specs: row(3),
        name: row(4),
        category: row(5),
        date: row(6),
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
        fullname: row(2),
        date: row(3),
      },
    }),
  },
  'approved-gear': {
    range: 'Approved Gear',
    parse: row => ({
      certificateType: 'approved-gear',
      name: `Approved Gear: ${row(3)}`,
      languages: ['en'],
      data: {
        brand: row(2),
        modelName: row(3),
        modelVersion: row(4),
        releaseYear: row(5),
        productLink: row(6),
        manualLink: row(7),
        testingLab: row(8),
        testDate: row(9),
        productType: row(10),
        standard: row(11),
        standardVersion: row(12),
      },
    }),
  },
};

const parseRowData = (row: string[]) => {
  return (
    index: number,
    opts: { toUpperCase: boolean } = { toUpperCase: true },
  ) => {
    let value = row[index]?.trim();
    if (opts.toUpperCase) {
      value = value?.toUpperCase();
    }
    return value;
  };
};
