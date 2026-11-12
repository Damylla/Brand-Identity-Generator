import { BrandBible, BrandColor } from '../types/brand';

/**
 * Normalizes hex code (ensures leading # and 6 characters)
 */
export function normalizeHex(hex: string): string {
  let cleaned = hex.trim().replace(/^#/, '');
  if (cleaned.length === 3) {
    cleaned = cleaned
      .split('')
      .map((c) => c + c)
      .join('');
  }
  if (!/^[0-9A-Fa-f]{6}$/.test(cleaned)) {
    return '#000000';
  }
  return `#${cleaned.toUpperCase()}`;
}

/**
 * Converts Hex to RGB tuple [r, g, b]
 */
export function hexToRgb(hex: string): [number, number, number] {
  const norm = normalizeHex(hex).slice(1);
  const r = parseInt(norm.substring(0, 2), 16);
  const g = parseInt(norm.substring(2, 4), 16);
  const b = parseInt(norm.substring(4, 6), 16);
  return [r, g, b];
}

/**
 * Calculate WCAG 2.1 relative luminance
 */
export function getRelativeLuminance(r: number, g: number, b: number): number {
  const [sR, sG, sB] = [r / 255, g / 255, b / 255].map((val) => {
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * sR + 0.7152 * sG + 0.0722 * sB;
}

/**
 * Calculate WCAG contrast ratio between two hex colors
 */
export function calculateContrastRatio(hex1: string, hex2: string): number {
  const [r1, g1, b1] = hexToRgb(hex1);
  const [r2, g2, b2] = hexToRgb(hex2);

  const lum1 = getRelativeLuminance(r1, g1, b1);
  const lum2 = getRelativeLuminance(r2, g2, b2);

  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);

  const ratio = (brightest + 0.05) / (darkest + 0.05);
  return Math.round(ratio * 100) / 100;
}

/**
 * Get WCAG rating badge details
 */
export function getWcagRating(ratio: number): {
  level: 'AAA' | 'AA' | 'AA Large' | 'Fail';
  pass: boolean;
  colorClass: string;
} {
  if (ratio >= 7.0) {
    return { level: 'AAA', pass: true, colorClass: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
  }
  if (ratio >= 4.5) {
    return { level: 'AA', pass: true, colorClass: 'text-emerald-600 bg-emerald-50 border-emerald-200' };
  }
  if (ratio >= 3.0) {
    return { level: 'AA Large', pass: true, colorClass: 'text-amber-700 bg-amber-50 border-amber-200' };
  }
  return { level: 'Fail', pass: false, colorClass: 'text-rose-700 bg-rose-50 border-rose-200' };
}

/**
 * Generate Google Fonts CSS Link URL
 */
export function buildGoogleFontsUrl(familyHeader: string, familyBody: string): string {
  const encodeFont = (f: string) => f.trim().replace(/\s+/g, '+');
  const h = encodeFont(familyHeader);
  const b = encodeFont(familyBody);
  if (h === b) {
    return `https://fonts.googleapis.com/css2?family=${h}:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap`;
  }
  return `https://fonts.googleapis.com/css2?family=${h}:ital,wght@0,400;0,600;0,700;0,800;1,400&family=${b}:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap`;
}

/**
 * Generate CSS Variables snippet
 */
export function generateCssSnippet(bible: BrandBible): string {
  const colorVars = bible.palette.colors
    .map((c) => {
      const slug = c.role.toLowerCase().replace(/\s+/g, '-');
      return `  --brand-${slug}: ${c.hex}; /* ${c.name} (${c.percentage}) */`;
    })
    .join('\n');

  return `:root {
  /* Brand Typography */
  --font-header: '${bible.typography.headerFont.family}', ${bible.typography.headerFont.category};
  --font-body: '${bible.typography.bodyFont.family}', ${bible.typography.bodyFont.category};

  /* Brand Palette (60-30-10 Rule) */
${colorVars}
}`;
}

/**
 * Export Brand Bible to Markdown
 */
export function exportBibleToMarkdown(bible: BrandBible): string {
  const colorRows = bible.palette.colors
    .map(
      (c) =>
        `| **${c.role}** | \`${c.hex}\` | ${c.name} | ${c.percentage} | ${c.usageNotes} |`
    )
    .join('\n');

  const valuesList = bible.brandValues
    .map((v) => `- **${v.title}**: ${v.description}`)
    .join('\n');

  const dosList = bible.voiceAndTone.dos.map((d) => `- [DO] ${d}`).join('\n');
  const dontsList = bible.voiceAndTone.donts.map((d) => `- [DON'T] ${d}`).join('\n');

  return `# ${bible.brandName} — Brand Bible & Identity Guidelines
*${bible.tagline}*

---

## 1. Brand Core & Mission
- **Mission**: ${bible.mission}
- **Positioning**: ${bible.positioning}
- **Brand Archetype**: ${bible.archetype}
- **Industry**: ${bible.industry}

### Core Values
${valuesList}

---

## 2. Voice & Tone
**Key Attributes**: ${bible.voiceAndTone.attributes.join(', ')}  
**Formality Index**: ${bible.voiceAndTone.formality}/100  
**Energy Index**: ${bible.voiceAndTone.energy}/100  

### Communication Guidelines
${dosList}

${dontsList}

---

## 3. Color Palette & System
| Role | Hex | Name | Distribution | Usage Notes |
| :--- | :--- | :--- | :--- | :--- |
${colorRows}

### Accessibility & Application
${bible.palette.accessibilityNotes}

${bible.palette.applicationGuidelines.map((g) => `- ${g}`).join('\n')}

---

## 4. Typography
- **Header Font**: \`${bible.typography.headerFont.family}\` (${bible.typography.headerFont.category})
  - *Rationale*: ${bible.typography.headerFont.pairingRationale}
- **Body Font**: \`${bible.typography.bodyFont.family}\` (${bible.typography.bodyFont.category})
  - *Rationale*: ${bible.typography.bodyFont.pairingRationale}

### CSS Variables
\`\`\`css
${generateCssSnippet(bible)}
\`\`\`

---

## 5. Art Direction & Imagery
- **Art Direction**: ${bible.imageryGuidelines.artDirection}
- **Lighting & Composition**: ${bible.imageryGuidelines.lightingAndComposition}
- **Keywords**: ${bible.imageryGuidelines.moodKeywords.join(', ')}

Generated with Brand Bible AI Studio.
`;
}
