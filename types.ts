export interface PatientData {
  name: string;
  email: string;
  image: File | null;
  imagePreview: string | null;
}

export enum CataractSeverity {
  Healthy = "Healthy",
  Mild = "Mild",
  Moderate = "Moderate",
  Severe = "Severe"
}

export interface AnalysisResult {
  hasCataract: boolean;
  confidence: number;
  severity: CataractSeverity;
  opacityScore: string;
  type: string; // e.g., Nuclear, Cortical
  recommendation: string;
  reasoning: string;
}

export type ViewState = 'landing' | 'intake' | 'results';
