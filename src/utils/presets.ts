import { BrandBible } from '../types/brand';

export const PRESET_MISSIONS = [
  {
    id: 'solis-coffee',
    name: 'Solis Roastery',
    industry: 'Specialty Coffee & Hospitality',
    mission: 'We craft ethically sourced, micro-batch specialty coffees engineered to inspire deep focus and mindful morning rituals for makers, thinkers, and craftspeople.',
    archetype: 'The Creator & Caregiver',
    keywords: ['Warm', 'Artisanal', 'Mindful', 'Earthy', 'Sophisticated'],
    bible: {
      brandName: 'Solis',
      tagline: 'Artisanal micro-batch roasts for focused minds.',
      mission: 'We craft ethically sourced, micro-batch specialty coffees engineered to inspire deep focus and mindful morning rituals for makers, thinkers, and craftspeople.',
      positioning: 'The premium, design-forward specialty coffee brand bridging regenerative agriculture with modern ritual aesthetic.',
      archetype: 'The Creator',
      industry: 'Specialty Coffee & Hospitality',
      brandValues: [
        { title: 'Radical Traceability', description: 'Direct trade relationships with smallholder farms paying 3x Fair Trade minimums.' },
        { title: 'Ritual of Focus', description: 'Formulations roasted specifically for sustained clean cognitive flow.' },
        { title: 'Zero Waste Circularity', description: 'Compostable bio-barrier packaging and cascara upcycling programs.' },
      ],
      voiceAndTone: {
        attributes: ['Warm', 'Poetic', 'Intention-Driven', 'Sophisticated', 'Down-to-earth'],
        dos: ['Speak about origins and hands behind the harvest', 'Evoke sensory details of aroma and light', 'Keep prose crisp and rhythmic'],
        donts: ['Never use clinical jargon or snobbish tasting notes', 'Avoid pushy sales exclamation marks', 'Never compromise transparency'],
        formality: 45,
        energy: 65,
      },
      logos: {
        primary: {
          concept: 'Solar Meridian & Steam Monogram — A geometric sun crest rising through a stylized distillation curve, evoking dawn harvest and heat control.',
          clearspace: '32px (equivalent to the diameter of the central solar disk)',
          minSize: '36px digital / 12mm print',
          svgContent: `<svg viewBox="0 0 400 120" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="solisSun" x1="20" y1="20" x2="100" y2="100" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#E07A5F" />
      <stop offset="100%" stop-color="#C2593F" />
    </linearGradient>
  </defs>
  <!-- Solar Emblem -->
  <g transform="translate(10, 15)">
    <circle cx="45" cy="45" r="38" stroke="#E07A5F" stroke-width="3" stroke-dasharray="4 6" opacity="0.6"/>
    <circle cx="45" cy="45" r="28" fill="url(#solisSun)"/>
    <path d="M45 22V32M45 58V68M22 45H32M58 45H68" stroke="#F4F1DE" stroke-width="3" stroke-linecap="round"/>
    <circle cx="45" cy="45" r="7" fill="#F4F1DE"/>
    <path d="M45 28C54 28 62 36 62 45" stroke="#F4F1DE" stroke-width="2.5" stroke-linecap="round" opacity="0.9"/>
  </g>
  <!-- Wordmark -->
  <text x="125" y="65" font-family="'Cinzel', serif" font-size="44" font-weight="700" letter-spacing="4" fill="#3D405B">SOLIS</text>
  <text x="128" y="88" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="600" letter-spacing="6" fill="#81B29A">ROASTERY &amp; PROVISIONS</text>
</svg>`,
        },
        secondaryMarks: [
          {
            type: 'icon',
            name: 'Solar Seal Mark',
            description: 'Minimal standalone emblem for app icons, wax stamps, and social avatars.',
            svgContent: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="100" height="100" rx="24" fill="#3D405B"/>
  <circle cx="50" cy="50" r="34" stroke="#E07A5F" stroke-width="2" stroke-dasharray="3 4" opacity="0.7"/>
  <circle cx="50" cy="50" r="22" fill="#E07A5F"/>
  <circle cx="50" cy="50" r="7" fill="#F4F1DE"/>
  <path d="M50 34V40M50 60V66M34 50H40M60 50H66" stroke="#F4F1DE" stroke-width="2.5" stroke-linecap="round"/>
</svg>`,
          },
          {
            type: 'monochrome',
            name: 'Monochrome Dark Mark',
            description: 'High-contrast single-tone lockup for debossing, thermal receipts, and laser engraving.',
            svgContent: `<svg viewBox="0 0 400 120" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(10, 15)">
    <circle cx="45" cy="45" r="38" stroke="#1F2421" stroke-width="2.5" stroke-dasharray="3 5"/>
    <circle cx="45" cy="45" r="26" fill="#1F2421"/>
    <circle cx="45" cy="45" r="7" fill="#FFFFFF"/>
    <path d="M45 28V36M45 54V62M28 45H36M54 45H62" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round"/>
  </g>
  <text x="125" y="65" font-family="'Cinzel', serif" font-size="44" font-weight="700" letter-spacing="4" fill="#1F2421">SOLIS</text>
  <text x="128" y="88" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="600" letter-spacing="6" fill="#1F2421">ROASTERY &amp; PROVISIONS</text>
</svg>`,
          },
          {
            type: 'badge',
            name: 'Origin Quality Badge',
            description: 'Circular heritage stamp applied on coffee bean bag seals and burlap sacks.',
            svgContent: `<svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="80" cy="80" r="74" fill="#F4F1DE" stroke="#E07A5F" stroke-width="3"/>
  <circle cx="80" cy="80" r="66" stroke="#3D405B" stroke-width="1.5" stroke-dasharray="3 3"/>
  <path id="curveTop" d="M30 80 A50 50 0 0 1 130 80" fill="none"/>
  <path id="curveBottom" d="M130 80 A50 50 0 0 1 30 80" fill="none"/>
  <circle cx="80" cy="80" r="26" fill="#E07A5F"/>
  <text font-family="'Cinzel', serif" font-size="10" font-weight="700" fill="#3D405B" letter-spacing="3">
    <textPath href="#curveTop" startOffset="50%" text-anchor="middle">CERTIFIED ETHICAL ORIGIN</textPath>
  </text>
  <text font-family="'Plus Jakarta Sans', sans-serif" font-size="9" font-weight="700" fill="#81B29A" letter-spacing="3">
    <textPath href="#curveBottom" startOffset="50%" text-anchor="middle">EST. 2026 • SINGLE HARVEST</textPath>
  </text>
  <circle cx="80" cy="80" r="7" fill="#F4F1DE"/>
</svg>`,
          },
          {
            type: 'lockup',
            name: 'Vertical Stacked Lockup',
            description: 'Centered vertical configuration for narrow poster headers, menu covers, and retail storefront signage.',
            svgContent: `<svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(55, 10)">
    <circle cx="45" cy="45" r="38" stroke="#E07A5F" stroke-width="2.5" stroke-dasharray="4 4" opacity="0.7"/>
    <circle cx="45" cy="45" r="26" fill="#E07A5F"/>
    <circle cx="45" cy="45" r="7" fill="#F4F1DE"/>
    <path d="M45 28V36M45 54V62M28 45H36M54 45H62" stroke="#F4F1DE" stroke-width="2.5" stroke-linecap="round"/>
  </g>
  <text x="100" y="125" text-anchor="middle" font-family="'Cinzel', serif" font-size="30" font-weight="700" letter-spacing="5" fill="#3D405B">SOLIS</text>
  <text x="100" y="145" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" font-weight="700" letter-spacing="4" fill="#81B29A">ROASTERY</text>
</svg>`,
          },
        ],
      },
      palette: {
        colors: [
          {
            role: 'Dominant',
            hex: '#3D405B',
            name: 'Deep Terracotta Dusk',
            percentage: '60%',
            usageNotes: 'Hero canvases, primary headings, packaging outer cardstock, and structured interface cards.',
            contrastOnWhite: 9.61,
            contrastOnDark: 2.18,
          },
          {
            role: 'Secondary',
            hex: '#81B29A',
            name: 'Sage Canopy',
            percentage: '30%',
            usageNotes: 'Secondary panels, badges, navigation borders, sensory metric charts, and category pills.',
            contrastOnWhite: 2.45,
            contrastOnDark: 8.57,
          },
          {
            role: 'Accent',
            hex: '#E07A5F',
            name: 'Sunrise Ember',
            percentage: '10%',
            usageNotes: 'High-conversion checkout CTA buttons, active state highlights, and batch seal wax marks.',
            contrastOnWhite: 3.42,
            contrastOnDark: 6.14,
          },
          {
            role: 'Neutral Dark',
            hex: '#1F2421',
            name: 'Espresso Crema',
            percentage: 'System',
            usageNotes: 'High-legibility long-form body copy, legal footers, and barcode micro-type.',
            contrastOnWhite: 14.88,
            contrastOnDark: 1.41,
          },
          {
            role: 'Neutral Light',
            hex: '#F4F1DE',
            name: 'Unbleached Parchment',
            percentage: 'System',
            usageNotes: 'Main application background, card fill contrast layer, and print backing paper.',
            contrastOnWhite: 1.12,
            contrastOnDark: 18.75,
          },
        ],
        accessibilityNotes: 'Primary text meets WCAG AAA standards (14.88:1 against Neutral Light). Accent color is reserved for large graphical buttons with #FFFFFF or #1F2421 text.',
        applicationGuidelines: [
          'Maintain 60% neutral/terracotta backdrop coverage to ensure tactile calm.',
          'Never use Sunrise Ember for body paragraphs; keep strictly to buttons and key badges.',
          'Pair Sage Canopy with Unbleached Parchment for high-comfort long-session reading.',
        ],
      },
      typography: {
        headerFont: {
          family: 'Cinzel',
          weights: ['600', '700', '800'],
          category: 'serif',
          pairingRationale: 'Classical Roman proportions give Solis an artisanal legacy feel, balancing luxury craftsmanship with grounded heritage.',
          previewText: 'Every morning is an architectural ceremony.',
        },
        bodyFont: {
          family: 'Plus Jakarta Sans',
          weights: ['400', '500', '600'],
          category: 'sans-serif',
          pairingRationale: 'Modern geometric neo-grotesque with warm apertures, providing effortless legibility on digital storefronts and physical labels.',
          previewText: 'Direct-trade beans slowly harvested in Antigua volcanic valley, shade-grown at 1,850 meters altitude for nuanced stonefruit acidity.',
        },
        typeScale: [
          { level: 'Display 1', size: '56px', lineHeight: '1.1', weight: '700', fontTarget: 'header' },
          { level: 'Heading 1', size: '40px', lineHeight: '1.2', weight: '700', fontTarget: 'header' },
          { level: 'Heading 2', size: '28px', lineHeight: '1.3', weight: '600', fontTarget: 'header' },
          { level: 'Heading 3', size: '20px', lineHeight: '1.4', weight: '600', fontTarget: 'header' },
          { level: 'Body Large', size: '18px', lineHeight: '1.6', weight: '400', fontTarget: 'body' },
          { level: 'Body Regular', size: '15px', lineHeight: '1.6', weight: '400', fontTarget: 'body' },
          { level: 'Caption & Micro', size: '12px', lineHeight: '1.4', weight: '500', fontTarget: 'body' },
        ],
        cssSnippet: `@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap');

:root {
  --font-header: 'Cinzel', serif;
  --font-body: 'Plus Jakarta Sans', sans-serif;
  --brand-dominant: #3D405B;
  --brand-secondary: #81B29A;
  --brand-accent: #E07A5F;
  --brand-neutral-dark: #1F2421;
  --brand-neutral-light: #F4F1DE;
}`,
      },
      imageryGuidelines: {
        artDirection: 'Nordic-Japanese warmth (Japandi minimalism) combined with tactile coffee atelier photography. Rich natural morning sunlight with soft shadows, macro close-ups of ceramic textures, steam, and unbleached paper fibers.',
        moodKeywords: ['Morning ritual', 'Tactile ceramic', 'Regenerative harvest', 'Steam & warmth', 'Warm shadow play'],
        lightingAndComposition: 'Natural side lighting, 45-degree angle, golden hour morning warmth, shallow depth of field (f/2.0), authentic unfiltered textures without artificial gloss.',
        generatedAssets: [],
      },
    } as BrandBible,
  },
  {
    id: 'vanguard-security',
    name: 'Vanguard ZK',
    industry: 'Fintech & Zero-Knowledge Cryptography',
    mission: 'We provide cryptographic zero-knowledge proof infrastructure allowing institutions to settle multi-billion dollar transactions with mathematical privacy and instantaneous finality.',
    archetype: 'The Magician & Sage',
    keywords: ['Cryptographic', 'Impenetrable', 'Architectural', 'Electric', 'Institutional'],
    bible: {
      brandName: 'Vanguard',
      tagline: 'Cryptographic finality for sovereign institutions.',
      mission: 'We provide cryptographic zero-knowledge proof infrastructure allowing institutions to settle multi-billion dollar transactions with mathematical privacy and instantaneous finality.',
      positioning: 'The gold-standard zero-knowledge rollup infrastructure for global tier-1 financial institutions.',
      archetype: 'The Sage',
      industry: 'Fintech & Zero-Knowledge Cryptography',
      brandValues: [
        { title: 'Mathematical Certainty', description: 'Zero trust assumptions; verified exclusively through sound zero-knowledge proofs.' },
        { title: 'Sub-Millisecond Latency', description: 'Institutional grade high-frequency execution pipelines.' },
        { title: 'Auditable Sovereignty', description: 'Decentralized cryptography with strict regulatory compliance.' },
      ],
      voiceAndTone: {
        attributes: ['Authoritative', 'Precise', 'Technically Rigorous', 'Sovereign', 'Unapologetically Sharp'],
        dos: ['Speak in clear, unambiguous engineering statements', 'Cite mathematical bounds and latency metrics', 'Project institutional solidity'],
        donts: ['Never use crypto meme slang (no wen, moon, etc.)', 'Avoid speculative hype', 'Never obscure technical architecture'],
        formality: 90,
        energy: 50,
      },
      logos: {
        primary: {
          concept: 'Hyper-Prism Monogram — An interlocking hexagonal prism forming an immutable "V", signifying multi-dimensional cryptographic lattices.',
          clearspace: '28px around all perimeter edges',
          minSize: '32px digital',
          svgContent: `<svg viewBox="0 0 420 120" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="vanguardGrad" x1="20" y1="20" x2="90" y2="90" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00F0FF"/>
      <stop offset="100%" stop-color="#3B82F6"/>
    </linearGradient>
  </defs>
  <!-- Hex Prism Glyph -->
  <g transform="translate(15, 15)">
    <polygon points="45,10 80,30 80,70 45,90 10,70 10,30" stroke="#1E293B" stroke-width="2" fill="#0A0F1D"/>
    <path d="M45 10L45 50M45 50L80 70M45 50L10 70" stroke="#00F0FF" stroke-width="2.5" opacity="0.8"/>
    <polygon points="45,50 80,30 45,10" fill="url(#vanguardGrad)" opacity="0.3"/>
    <polygon points="45,50 10,70 45,90" fill="#00F0FF" opacity="0.2"/>
    <circle cx="45" cy="50" r="4" fill="#00F0FF"/>
  </g>
  <text x="125" y="66" font-family="'Space Grotesk', sans-serif" font-size="42" font-weight="700" letter-spacing="4" fill="#F8FAFC">VANGUARD</text>
  <text x="127" y="88" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="500" letter-spacing="5" fill="#00F0FF">ZK-INFRASTRUCTURE // PROTOCOL</text>
</svg>`,
        },
        secondaryMarks: [
          {
            type: 'icon',
            name: 'Prism Node Icon',
            description: 'Minimal app launcher and hardware security key emblem.',
            svgContent: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="100" height="100" rx="20" fill="#030712"/>
  <polygon points="50,15 85,35 85,75 50,95 15,75 15,35" stroke="#1E293B" stroke-width="2"/>
  <path d="M50 15L50 55M50 55L85 75M50 55L15 75" stroke="#00F0FF" stroke-width="3"/>
  <circle cx="50" cy="55" r="5" fill="#3B82F6"/>
</svg>`,
          },
          {
            type: 'monochrome',
            name: 'Monochrome Light Mark',
            description: 'Clean monochrome lockup for executive whitepapers and investor memos.',
            svgContent: `<svg viewBox="0 0 420 120" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(15, 15)">
    <polygon points="45,10 80,30 80,70 45,90 10,70 10,30" stroke="#0F172A" stroke-width="3"/>
    <path d="M45 10L45 50M45 50L80 70M45 50L10 70" stroke="#0F172A" stroke-width="3"/>
    <circle cx="45" cy="50" r="4" fill="#0F172A"/>
  </g>
  <text x="125" y="66" font-family="'Space Grotesk', sans-serif" font-size="42" font-weight="700" letter-spacing="4" fill="#0F172A">VANGUARD</text>
  <text x="127" y="88" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="600" letter-spacing="5" fill="#0F172A">ZK-INFRASTRUCTURE // PROTOCOL</text>
</svg>`,
          },
          {
            type: 'badge',
            name: 'Cryptographic Verification Seal',
            description: 'Audit certificate badge rendered on verified institutional smart contracts.',
            svgContent: `<svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="160" height="160" rx="32" fill="#0A0F1D" stroke="#00F0FF" stroke-width="2"/>
  <circle cx="80" cy="80" r="55" stroke="#1E293B" stroke-dasharray="3 4"/>
  <polygon points="80,45 110,62 110,98 80,115 50,98 50,62" stroke="#00F0FF" stroke-width="2"/>
  <path d="M80 45V80M80 80L110 98M80 80L50 98" stroke="#3B82F6" stroke-width="2"/>
  <text x="80" y="142" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="700" fill="#00F0FF" letter-spacing="2">ZK-SNARK VERIFIED</text>
</svg>`,
          },
          {
            type: 'lockup',
            name: 'Compact Horizontal Lockup',
            description: 'Optimized for developer documentation navigation bars and CLI terminal prompts.',
            svgContent: `<svg viewBox="0 0 320 60" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(10, 10)">
    <polygon points="20,5 36,14 36,32 20,41 4,32 4,14" stroke="#00F0FF" stroke-width="2"/>
    <path d="M20 5V23M20 23L36 32M20 23L4 32" stroke="#00F0FF" stroke-width="2"/>
  </g>
  <text x="60" y="36" font-family="'Space Grotesk', sans-serif" font-size="24" font-weight="700" letter-spacing="3" fill="#F8FAFC">VANGUARD</text>
  <text x="200" y="36" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="500" fill="#00F0FF">v4.2</text>
</svg>`,
          },
        ],
      },
      palette: {
        colors: [
          {
            role: 'Dominant',
            hex: '#0A0F1D',
            name: 'Deep Quantum Slate',
            percentage: '60%',
            usageNotes: 'Core interface background, high-density terminal panels, cryptographic explorer containers.',
            contrastOnWhite: 16.5,
            contrastOnDark: 1.27,
          },
          {
            role: 'Secondary',
            hex: '#1E293B',
            name: 'Sub-Zero Graphite',
            percentage: '30%',
            usageNotes: 'Card surfaces, table header borders, code block backings, and secondary utility modules.',
            contrastOnWhite: 11.2,
            contrastOnDark: 1.88,
          },
          {
            role: 'Accent',
            hex: '#00F0FF',
            name: 'Hyper-Cyan Pulse',
            percentage: '10%',
            usageNotes: 'Verified block indicators, interactive state accents, code syntax keywords, and latency graphs.',
            contrastOnWhite: 1.25,
            contrastOnDark: 13.2,
          },
          {
            role: 'Neutral Dark',
            hex: '#020617',
            name: 'Void Black',
            percentage: 'System',
            usageNotes: 'High-security alert overlays and deeply nested node views.',
            contrastOnWhite: 19.8,
            contrastOnDark: 1.05,
          },
          {
            role: 'Neutral Light',
            hex: '#F8FAFC',
            name: 'Cleanroom White',
            percentage: 'System',
            usageNotes: 'Primary interface typography, data table values, and proof verification hash outputs.',
            contrastOnWhite: 1.04,
            contrastOnDark: 20.1,
          },
        ],
        accessibilityNotes: 'Cyan accent achieves 13.2:1 against Deep Quantum Slate. White typography achieves 20.1:1, offering peerless readability in demanding developer and financial operations.',
        applicationGuidelines: [
          'Maintain dark-first cleanroom aesthetic with Deep Quantum Slate dominating 60% of viewport.',
          'Never use Hyper-Cyan for large background fills; limit strictly to glowing metrics and active nodes.',
          'Format numerical values in monospace JetBrains font for zero visual ambiguity.',
        ],
      },
      typography: {
        headerFont: {
          family: 'Space Grotesk',
          weights: ['500', '600', '700'],
          category: 'sans-serif',
          pairingRationale: 'Engineered geometric curves and subtle ink traps project bleeding-edge computational architecture without looking gimmicky.',
          previewText: 'Zero-knowledge proofs at lightspeed scale.',
        },
        bodyFont: {
          family: 'JetBrains Mono',
          weights: ['400', '500', '700'],
          category: 'monospace',
          pairingRationale: 'Hyper-legible developer-grade monospaced font with distinct ligature support, clear zeroes, and optical balance for complex financial parameters.',
          previewText: 'proof_verify(batch_id: 0x9f4a..., gas_used: 21000, latency_ms: 1.4);',
        },
        typeScale: [
          { level: 'Display 1', size: '52px', lineHeight: '1.1', weight: '700', fontTarget: 'header' },
          { level: 'Heading 1', size: '36px', lineHeight: '1.2', weight: '700', fontTarget: 'header' },
          { level: 'Heading 2', size: '26px', lineHeight: '1.3', weight: '600', fontTarget: 'header' },
          { level: 'Heading 3', size: '20px', lineHeight: '1.4', weight: '600', fontTarget: 'header' },
          { level: 'Body Large', size: '16px', lineHeight: '1.6', weight: '500', fontTarget: 'body' },
          { level: 'Body Regular', size: '14px', lineHeight: '1.6', weight: '400', fontTarget: 'body' },
          { level: 'Code / Hash', size: '12px', lineHeight: '1.5', weight: '400', fontTarget: 'body' },
        ],
        cssSnippet: `@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Space+Grotesk:wght@500;600;700&display=swap');

:root {
  --font-header: 'Space Grotesk', sans-serif;
  --font-body: 'JetBrains Mono', monospace;
  --brand-dominant: #0A0F1D;
  --brand-secondary: #1E293B;
  --brand-accent: #00F0FF;
  --brand-neutral-dark: #020617;
  --brand-neutral-light: #F8FAFC;
}`,
      },
      imageryGuidelines: {
        artDirection: 'Dark, architectural high-tech realism. Dark titanium textures, laser refraction through optical glass prisms, volumetric blue/cyan caustic beams, clean cleanroom server racks, and minimalist holographic schematics.',
        moodKeywords: ['Cryptographic lattice', 'Glass prism caustics', 'Titanium surfaces', 'Laser telemetry', 'Cleanroom server'],
        lightingAndComposition: 'High-contrast chiaroscuro, cold 6500K edge lights, deep obsidian shadows, crisp macro focus on etched silicon and brushed metal surfaces.',
        generatedAssets: [],
      },
    } as BrandBible,
  },
  {
    id: 'lumina-studios',
    name: 'Lumina Architecture',
    industry: 'Sustainable Biophilic Architecture',
    mission: 'We design living biophilic spaces that breathe with the seasons, integrating native flora, reclaimed timber, and passive solar engineering into sanctuaries of human vitality.',
    archetype: 'The Visionary & Caregiver',
    keywords: ['Biophilic', 'Organic', 'Serene', 'Luminous', 'Architectural'],
    bible: {
      brandName: 'Lumina',
      tagline: 'Living architecture for timeless human wellbeing.',
      mission: 'We design living biophilic spaces that breathe with the seasons, integrating native flora, reclaimed timber, and passive solar engineering into sanctuaries of human vitality.',
      positioning: 'Boutique architectural practice pioneering carbon-negative, wellness-certified residential and cultural sanctuaries.',
      archetype: 'The Creator',
      industry: 'Sustainable Biophilic Architecture',
      brandValues: [
        { title: 'Biophilic Integration', description: 'Every space maximizes circadian daylight rhythms and living green air purification.' },
        { title: 'Carbon Negative Timber', description: 'Mass timber construction sourced exclusively from regenerative local forestry.' },
        { title: 'Sensory Timelessness', description: 'Acoustic calm, honest tactile finishes, and aging gracefully with the seasons.' },
      ],
      voiceAndTone: {
        attributes: ['Serene', 'Thoughtful', 'Poetic', 'Elevated', 'Tactile'],
        dos: ['Speak about space, light, materiality, and the seasons', 'Celebrate natural imperfections in raw materials', 'Maintain tranquil cadence'],
        donts: ['Never use loud marketing jargon', 'Avoid sterile developer speak', 'Never rush or crowd ideas'],
        formality: 70,
        energy: 40,
      },
      logos: {
        primary: {
          concept: 'Light Oculus & Leaf Arch — An interplay of an architectural vaulted archway and an organic botanical leaf vein, symbolizing harmony between built structure and living ecology.',
          clearspace: '30px',
          minSize: '32px digital',
          svgContent: `<svg viewBox="0 0 400 120" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(15, 15)">
    <circle cx="45" cy="45" r="40" stroke="#2D5A46" stroke-width="2"/>
    <path d="M45 15C60 15 75 30 75 55C75 75 45 75 45 75C45 75 15 75 15 55C15 30 30 15 45 15Z" stroke="#D4AF37" stroke-width="2.5" fill="#F4F7F4" opacity="0.9"/>
    <line x1="45" y1="15" x2="45" y2="75" stroke="#2D5A46" stroke-width="2"/>
    <path d="M45 35L60 45M45 48L62 58M45 35L30 45M45 48L28 58" stroke="#2D5A46" stroke-width="1.8" stroke-linecap="round"/>
  </g>
  <text x="120" y="65" font-family="'Playfair Display', serif" font-size="44" font-weight="600" letter-spacing="4" fill="#1C382B">LUMINA</text>
  <text x="122" y="88" font-family="'Outfit', sans-serif" font-size="12" font-weight="500" letter-spacing="5" fill="#8DAA9D">BIOPHILIC ARCHITECTURE</text>
</svg>`,
        },
        secondaryMarks: [
          {
            type: 'icon',
            name: 'Botanical Oculus',
            description: 'Minimal monogram stamp for architectural blueprints and project signage.',
            svgContent: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="100" height="100" rx="24" fill="#1C382B"/>
  <circle cx="50" cy="50" r="38" stroke="#D4AF37" stroke-width="2"/>
  <path d="M50 20C63 20 75 33 75 55C75 72 50 72 50 72C50 72 25 72 25 55C25 33 37 20 50 20Z" stroke="#F4F7F4" stroke-width="2.5"/>
  <line x1="50" y1="20" x2="50" y2="72" stroke="#D4AF37" stroke-width="2"/>
</svg>`,
          },
          {
            type: 'monochrome',
            name: 'Monochrome Dark Mark',
            description: 'Refined single-color mark for blueprint embossing and linen binding.',
            svgContent: `<svg viewBox="0 0 400 120" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(15, 15)">
    <circle cx="45" cy="45" r="40" stroke="#111827" stroke-width="2"/>
    <path d="M45 15C60 15 75 30 75 55C75 75 45 75 45 75C45 75 15 75 15 55C15 30 30 15 45 15Z" stroke="#111827" stroke-width="2.5"/>
    <line x1="45" y1="15" x2="45" y2="75" stroke="#111827" stroke-width="2"/>
  </g>
  <text x="120" y="65" font-family="'Playfair Display', serif" font-size="44" font-weight="600" letter-spacing="4" fill="#111827">LUMINA</text>
  <text x="122" y="88" font-family="'Outfit', sans-serif" font-size="12" font-weight="500" letter-spacing="5" fill="#111827">BIOPHILIC ARCHITECTURE</text>
</svg>`,
          },
          {
            type: 'badge',
            name: 'Living Building Certified Seal',
            description: 'Emblem affixed to completed sustainable pavilions and dwellings.',
            svgContent: `<svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="80" cy="80" r="74" fill="#F4F7F4" stroke="#2D5A46" stroke-width="2.5"/>
  <circle cx="80" cy="80" r="66" stroke="#D4AF37" stroke-width="1.5" stroke-dasharray="4 3"/>
  <path d="M80 35C95 35 110 50 110 75C110 95 80 95 80 95C80 95 50 95 50 75C50 50 65 35 80 35Z" stroke="#2D5A46" stroke-width="2.5" fill="#FFFFFF"/>
  <line x1="80" y1="35" x2="80" y2="95" stroke="#D4AF37" stroke-width="2"/>
  <text x="80" y="128" text-anchor="middle" font-family="'Outfit', sans-serif" font-size="9" font-weight="700" fill="#2D5A46" letter-spacing="2">LIVING SANCTUARY</text>
</svg>`,
          },
          {
            type: 'lockup',
            name: 'Monoline Stacked Lockup',
            description: 'Vertical presentation mark for portfolio covers and atelier entry doors.',
            svgContent: `<svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(55, 10)">
    <circle cx="45" cy="45" r="38" stroke="#2D5A46" stroke-width="2"/>
    <path d="M45 20C57 20 68 32 68 50C68 65 45 65 45 65C45 65 22 65 22 50C22 32 33 20 45 20Z" stroke="#D4AF37" stroke-width="2"/>
    <line x1="45" y1="20" x2="45" y2="65" stroke="#2D5A46" stroke-width="1.8"/>
  </g>
  <text x="100" y="125" text-anchor="middle" font-family="'Playfair Display', serif" font-size="28" font-weight="600" letter-spacing="4" fill="#1C382B">LUMINA</text>
  <text x="100" y="145" text-anchor="middle" font-family="'Outfit', sans-serif" font-size="9" font-weight="600" letter-spacing="4" fill="#8DAA9D">STUDIO</text>
</svg>`,
          },
        ],
      },
      palette: {
        colors: [
          {
            role: 'Dominant',
            hex: '#1C382B',
            name: 'Old Growth Forest',
            percentage: '60%',
            usageNotes: 'Header titles, structural dividers, heavy exterior renderings, and primary brand framing.',
            contrastOnWhite: 10.8,
            contrastOnDark: 1.94,
          },
          {
            role: 'Secondary',
            hex: '#8DAA9D',
            name: 'Mist Sage',
            percentage: '30%',
            usageNotes: 'Subtle backdrop panels, section tags, architectural elevation fills, and passive shading diagrams.',
            contrastOnWhite: 2.15,
            contrastOnDark: 9.77,
          },
          {
            role: 'Accent',
            hex: '#D4AF37',
            name: 'Solar Brass',
            percentage: '10%',
            usageNotes: 'Refined metallic callouts, primary commission inquiry buttons, and blueprint seal highlights.',
            contrastOnWhite: 2.12,
            contrastOnDark: 9.9,
          },
          {
            role: 'Neutral Dark',
            hex: '#111827',
            name: 'Charred Cedar',
            percentage: 'System',
            usageNotes: 'Architectural specifications, long-form project narratives, and technical drawing dimensions.',
            contrastOnWhite: 16.1,
            contrastOnDark: 1.3,
          },
          {
            role: 'Neutral Light',
            hex: '#F4F7F4',
            name: 'Lime Plaster',
            percentage: 'System',
            usageNotes: 'Clean open white space, editorial gallery canvas, and physical studio stationary.',
            contrastOnWhite: 1.07,
            contrastOnDark: 19.6,
          },
        ],
        accessibilityNotes: 'Deep Old Growth Forest against Lime Plaster delivers a crisp 10.1:1 ratio. Brass accents are utilized with deep charcoal text for accessible interactive buttons.',
        applicationGuidelines: [
          'Allow generous breathing room: white space should encompass at least 40% of every composition.',
          'Use natural textures in backgrounds whenever possible (raw unlacquered oak, stone, linen).',
          'Solar Brass is never applied to more than 10% of an eye-level view to preserve quiet luxury.',
        ],
      },
      typography: {
        headerFont: {
          family: 'Playfair Display',
          weights: ['600', '700'],
          category: 'serif',
          pairingRationale: 'High-contrast transitional serif with graceful terminals that reflect architectural classical symmetry and natural light refractions.',
          previewText: 'Spaces designed to breathe with the living earth.',
        },
        bodyFont: {
          family: 'Outfit',
          weights: ['300', '400', '500'],
          category: 'sans-serif',
          pairingRationale: 'Airy, geometric sans-serif that echoes clean Scandinavian and Japanese spatial openness with outstanding clarity.',
          previewText: 'Integrating cross-laminated timber with passive thermal envelopes to achieve true net-positive energy consumption across all seasons.',
        },
        typeScale: [
          { level: 'Display 1', size: '54px', lineHeight: '1.15', weight: '700', fontTarget: 'header' },
          { level: 'Heading 1', size: '38px', lineHeight: '1.25', weight: '700', fontTarget: 'header' },
          { level: 'Heading 2', size: '28px', lineHeight: '1.3', weight: '600', fontTarget: 'header' },
          { level: 'Heading 3', size: '20px', lineHeight: '1.4', weight: '600', fontTarget: 'header' },
          { level: 'Body Large', size: '17px', lineHeight: '1.7', weight: '400', fontTarget: 'body' },
          { level: 'Body Regular', size: '15px', lineHeight: '1.65', weight: '300', fontTarget: 'body' },
          { level: 'Caption', size: '12px', lineHeight: '1.4', weight: '500', fontTarget: 'body' },
        ],
        cssSnippet: `@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500&family=Playfair+Display:wght@600;700&display=swap');

:root {
  --font-header: 'Playfair Display', serif;
  --font-body: 'Outfit', sans-serif;
  --brand-dominant: #1C382B;
  --brand-secondary: #8DAA9D;
  --brand-accent: #D4AF37;
  --brand-neutral-dark: #111827;
  --brand-neutral-light: #F4F7F4;
}`,
      },
      imageryGuidelines: {
        artDirection: 'High-end architectural photography. Monolithic rammed earth, floor-to-ceiling glass pavilions overlooking misty moss forests, golden morning rays cutting through vertical cedar slats, tranquil water reflections, and tactile linen furnishings.',
        moodKeywords: ['Biophilic sanctuary', 'Cross-laminated timber', 'Dappled sunlight', 'Living wall', 'Moss courtyard'],
        lightingAndComposition: 'Soft diffused natural daylight, architectural one-point perspective, tranquil negative space, balanced ambient warm lighting.',
        generatedAssets: [],
      },
    } as BrandBible,
  },
];
