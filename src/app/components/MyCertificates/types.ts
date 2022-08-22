export interface CertificateItem {
  certificateType: 'instructor' | 'rigger' | 'honoraryMember';
  name: string;
  languages: string[];
  data: any;
}
