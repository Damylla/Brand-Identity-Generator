import test from 'node:test';
import assert from 'node:assert/strict';
import {
  normalizeHex,
  hexToRgb,
  getRelativeLuminance,
  calculateContrastRatio,
  getWcagRating,
  buildGoogleFontsUrl,
  generateCssSnippet
} from './brandMath';
import { BrandBible } from '../types/brand';

test('normalizeHex handles 3-digit, 6-digit, and invalid inputs', () => {
  assert.equal(normalizeHex('#fff'), '#FFFFFF');
  assert.equal(normalizeHex('000'), '#000000');
  assert.equal(normalizeHex('#3b82f6'), '#3B82F6');
  assert.equal(normalizeHex('not-a-color'), '#000000');
});

test('hexToRgb converts correctly', () => {
  assert.deepEqual(hexToRgb('#FFFFFF'), [255, 255, 255]);
  assert.deepEqual(hexToRgb('#000000'), [0, 0, 0]);
  assert.deepEqual(hexToRgb('#FF0000'), [255, 0, 0]);
});

test('calculateContrastRatio validates pure black on white', () => {
  const ratio = calculateContrastRatio('#FFFFFF', '#000000');
  assert.equal(ratio, 21);
});

test('calculateContrastRatio validates same color gives 1:1', () => {
  const ratio = calculateContrastRatio('#336699', '#336699');
  assert.equal(ratio, 1);
});

test('getWcagRating assigns AA and AAA correctly', () => {
  assert.equal(getWcagRating(21).level, 'AAA');
  assert.equal(getWcagRating(5.5).level, 'AA');
  assert.equal(getWcagRating(3.2).level, 'AA Large');
  assert.equal(getWcagRating(2.0).level, 'Fail');
});

test('buildGoogleFontsUrl creates valid link query', () => {
  const url = buildGoogleFontsUrl('Syne', 'Inter');
  assert.ok(url.includes('family=Syne'));
  assert.ok(url.includes('family=Inter'));
});

test('generateCssSnippet produces valid CSS root block', () => {
  const sampleBible: BrandBible = {
    brandName: 'Test Brand',
    tagline: 'Test tagline',
    mission: 'Test mission',
    positioning: 'Test positioning',
    archetype: 'The Creator',
    industry: 'Technology',
    brandValues: [{ title: 'Integrity', description: 'Truthful craft' }],
    voiceAndTone: {
      attributes: ['Direct', 'Warm'],
      dos: ['Be concise'],
      donts: ['No jargon'],
      formality: 60,
      energy: 70
    },
    logos: {
      primary: {
        concept: 'Monogram',
        svgContent: '<svg></svg>',
        clearspace: '24px',
        minSize: '32px'
      },
      secondaryMarks: []
    },
    palette: {
      colors: [
        {
          role: 'Dominant',
          hex: '#0F172A',
          name: 'Slate Midnight',
          percentage: '60%',
          usageNotes: 'Backgrounds & key structural elements'
        },
        {
          role: 'Secondary',
          hex: '#2563EB',
          name: 'Royal Cobalt',
          percentage: '30%',
          usageNotes: 'Cards and section emphasis'
        },
        {
          role: 'Accent',
          hex: '#F59E0B',
          name: 'Solar Amber',
          percentage: '10%',
          usageNotes: 'High-intent CTA buttons'
        },
        {
          role: 'Neutral Dark',
          hex: '#020617',
          name: 'Obsidian',
          percentage: 'N/A',
          usageNotes: 'Primary typography'
        },
        {
          role: 'Neutral Light',
          hex: '#F8FAFC',
          name: 'Cloud Paper',
          percentage: 'N/A',
          usageNotes: 'Page backdrop'
        }
      ],
      accessibilityNotes: 'AA compliant',
      applicationGuidelines: ['Use dominant on 60% of surfaces']
    },
    typography: {
      headerFont: {
        family: 'Syne',
        weights: ['700'],
        category: 'sans-serif',
        pairingRationale: 'Punchy geometric curves'
      },
      bodyFont: {
        family: 'Inter',
        weights: ['400', '500'],
        category: 'sans-serif',
        pairingRationale: 'Hyper-legible for UI'
      },
      typeScale: [],
      cssSnippet: ''
    },
    imageryGuidelines: {
      artDirection: 'Clean studio lighting',
      moodKeywords: ['Modern', 'Tactile'],
      lightingAndComposition: 'Warm rim lights',
      generatedAssets: []
    }
  };

  const css = generateCssSnippet(sampleBible);
  assert.ok(css.includes('--brand-dominant: #0F172A'));
  assert.ok(css.includes('--brand-accent: #F59E0B'));
  assert.ok(css.includes("--font-header: 'Syne', sans-serif"));
});
