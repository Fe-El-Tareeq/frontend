export interface LegalVersionMetadata {
  version: string;
  effectiveDate: string;
  termsUrl?: string;
  privacyUrl?: string;
  summaryAr?: string;
}

export interface LegalAcceptanceRequest {
  version: string;
}

export interface LegalAcceptanceResponseData {
  accepted: boolean;
  version: string;
  acceptedAt: string;
}
