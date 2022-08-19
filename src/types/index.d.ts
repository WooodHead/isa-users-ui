type IdentityType = 'individual' | 'organization';

declare module '*.pdf' {
  const content: any;
  export default content;
}
