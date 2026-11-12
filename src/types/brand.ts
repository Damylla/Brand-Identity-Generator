export type ColorRole = 'Dominant' | 'Secondary' | 'Accent' | 'Neutral Dark' | 'Neutral Light';

export interface BrandColor {
  role: ColorRole;
  hex: string;
  name: string;
  percentage: string;
  usageNotes: string;
  contrastOnWhite?: number;
  contrastOnDark?: number;
}

export interface SecondaryMark {
  type: 'icon' | 'monochrome' | 'badge' | 'lockup';
  name: string;
  description: string;
  svgContent: string;
}

export interface FontSpec {
  family: string;
  weights: string[];
  category: 'serif' | 'sans-serif' | 'display' | 'monospace';
  pairingRationale: string;
  previewText?: string;
}

export interface TypeScaleStep {
  level: string;
  size: string;
  lineHeight: string;
  weight: string;
  fontTarget: 'header' | 'body';
}

export interface GeneratedBrandAsset {
  id: string;
  title: string;
  prompt: string;
  size: '1K' | '2K' | '4K';
  aspectRatio: '1:1' | '16:9' | '4:3' | '9:16';
  imageUrl: string;
  timestamp: number;
}

export interface BrandBible {
  brandName: string;
  tagline: string;
  mission: string;
  positioning: string;
  archetype: string;
  industry: string;
  brandValues: Array<{
    title: string;
    description: string;
  }>;
  voiceAndTone: {
    attributes: string[];
    dos: string[];
    donts: string[];
    formality: number; // 0 (hyper-casual) to 100 (ultra-formal)
    energy: number; // 0 (calm/grounded) to 100 (electric/high-octane)
  };
  logos: {
    primary: {
      concept: string;
      svgContent: string;
      clearspace: string;
      minSize: string;
    };
    secondaryMarks: SecondaryMark[];
  };
  palette: {
    colors: BrandColor[];
    accessibilityNotes: string;
    applicationGuidelines: string[];
  };
  typography: {
    headerFont: FontSpec;
    bodyFont: FontSpec;
    typeScale: TypeScaleStep[];
    cssSnippet: string;
  };
  imageryGuidelines: {
    artDirection: string;
    moodKeywords: string[];
    lightingAndComposition: string;
    generatedAssets: GeneratedBrandAsset[];
  };
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  modelUsed?: string;
}

export type GeminiModelId =
  | 'gemini-3.8-flash'
  | 'gemini-4-carbon'
  | 'gemini-4-argon'
  | 'gemini-3.1-flash-lite';
