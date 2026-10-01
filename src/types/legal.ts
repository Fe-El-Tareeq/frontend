export interface LegalVersionMetadata {
  version?: string;
  termsVersion?: string;
  privacyVersion?: string;
  effectiveDate?: string;
  termsUrl?: string;
  privacyUrl?: string;
  summaryAr?: string;
}

export interface LegalAcceptanceRequest {
  termsVersion: string;
  privacyVersion: string;
}

export interface LegalAcceptanceResponseData {
  accepted: boolean;
  termsVersion?: string;
  privacyVersion?: string;
  version?: string;
  acceptedAt?: string;
}
