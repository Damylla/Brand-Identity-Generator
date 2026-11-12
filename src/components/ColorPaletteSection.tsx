import React, { useState } from 'react';
import {
  Palette,
  Copy,
  Check,
  ShieldCheck,
  Info,
  Code2,
  Sparkles
} from 'lucide-react';
import { BrandBible, BrandColor } from '../types/brand';
import {
  hexToRgb,
  calculateContrastRatio,
  getWcagRating,
  generateCssSnippet
} from '../utils/brandMath';

interface ColorPaletteSectionProps {
  bible: BrandBible;
}

export const ColorPaletteSection: React.FC<ColorPaletteSectionProps> = ({ bible }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const colors = bible.palette.colors;

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const generateTailwindConfig = () => {
    const colorObj = colors.reduce((acc, c) => {
      const slug = c.role.toLowerCase().replace(/\s+/g, '-');
      acc[slug] = c.hex;
      return acc;
    }, {} as Record<string, string>);

    return `// tailwind.config.js snippet
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: ${JSON.stringify(colorObj, null, 2)}
      }
    }
  }
};`;
  };

  return (
    <section className="mb-14">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
        <div>
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-amber-400">
            02 • Chromatic Architecture
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            5-Color Hex Palette &amp; System Rules
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-xl">
            Calibrated using the 60-30-10 design system rule for visual hierarchy, semantic clarity, and WCAG 2.1 accessibility.
          </p>
        </div>

        {/* Quick Copy Snippets */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() =>
              copyToClipboard(generateCssSnippet(bible), 'css-vars')
            }
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700/80 hover:bg-slate-800 text-xs font-medium text-slate-200 transition-colors"
            aria-label="Copy CSS variables"
          >
            {copiedKey === 'css-vars' ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Copied CSS</span>
              </>
            ) : (
              <>
                <Code2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Copy CSS Vars</span>
              </>
            )}
          </button>

          <button
            onClick={() =>
              copyToClipboard(generateTailwindConfig(), 'tailwind-config')
            }
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700/80 hover:bg-slate-800 text-xs font-medium text-slate-200 transition-colors"
            aria-label="Copy Tailwind configuration"
          >
            {copiedKey === 'tailwind-config' ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Copied Tailwind</span>
              </>
            ) : (
              <>
                <Palette className="w-3.5 h-3.5 text-cyan-400" />
                <span>Tailwind Config</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 60-30-10 Proportional Distribution Bar */}
      <div className="mb-6 rounded-2xl bg-slate-900/90 border border-slate-800 p-4">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
          <span className="font-mono uppercase tracking-wider text-[11px]">
            Visual Balance Hierarchy (60-30-10 System)
          </span>
          <span className="text-[11px] text-slate-400">Harmonized Surface Coverage</span>
        </div>

        <div className="w-full h-8 rounded-xl overflow-hidden flex shadow-inner border border-slate-800">
          {/* Dominant 60% */}
          <div
            style={{ backgroundColor: colors[0]?.hex || '#0f172a', width: '55%' }}
            className="h-full flex items-center justify-center text-[10px] font-mono font-bold text-white/90 drop-shadow select-none group relative cursor-pointer"
            title={`${colors[0]?.name}: Dominant 60%`}
            onClick={() => copyToClipboard(colors[0]?.hex, 'bar-0')}
          >
            Dominant 60%
          </div>
          {/* Secondary 30% */}
          <div
            style={{ backgroundColor: colors[1]?.hex || '#3b82f6', width: '30%' }}
            className="h-full flex items-center justify-center text-[10px] font-mono font-bold text-white/90 drop-shadow select-none group relative cursor-pointer"
            title={`${colors[1]?.name}: Secondary 30%`}
            onClick={() => copyToClipboard(colors[1]?.hex, 'bar-1')}
          >
            Secondary 30%
          </div>
          {/* Accent 10% */}
          <div
            style={{ backgroundColor: colors[2]?.hex || '#f59e0b', width: '15%' }}
            className="h-full flex items-center justify-center text-[10px] font-mono font-bold text-slate-950 drop-shadow select-none group relative cursor-pointer"
            title={`${colors[2]?.name}: Accent 10%`}
            onClick={() => copyToClipboard(colors[2]?.hex, 'bar-2')}
          >
            Accent 10%
          </div>
        </div>
      </div>

      {/* 5 Color Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {colors.map((color, idx) => {
          const rgb = hexToRgb(color.hex);
          const rgbStr = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
          const contrastWhite = calculateContrastRatio(color.hex, '#FFFFFF');
          const contrastDark = calculateContrastRatio(color.hex, '#0F172A');
          const ratingWhite = getWcagRating(contrastWhite);
          const ratingDark = getWcagRating(contrastDark);

          const isDarkColor = contrastWhite > contrastDark;

          return (
            <div
              key={idx}
              className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden flex flex-col justify-between hover:border-slate-700 transition-all shadow-lg"
            >
              {/* Color Swatch Header */}
              <div
                className="h-32 p-4 flex flex-col justify-between relative cursor-pointer group transition-transform"
                style={{ backgroundColor: color.hex }}
                onClick={() => copyToClipboard(color.hex, `hex-${idx}`)}
                title="Click to copy Hex code"
              >
                {/* Role Pill */}
                <div className="flex justify-between items-start">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider backdrop-blur-md shadow-sm ${
                      isDarkColor
                        ? 'bg-black/40 text-white border border-white/20'
                        : 'bg-white/70 text-slate-950 border border-black/10'
                    }`}
                  >
                    {color.role}
                  </span>

                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-medium ${
                      isDarkColor ? 'text-white/80' : 'text-slate-900/80'
                    }`}
                  >
                    {color.percentage}
                  </span>
                </div>

                {/* Hex Code overlay on hover */}
                <div
                  className={`flex items-center justify-between font-mono text-xs font-bold ${
                    isDarkColor ? 'text-white' : 'text-slate-950'
                  }`}
                >
                  <span>{color.hex}</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-[10px]">
                    {copiedKey === `hex-${idx}` ? (
                      <Check className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                    <span>{copiedKey === `hex-${idx}` ? 'Copied' : 'Copy'}</span>
                  </span>
                </div>
              </div>

              {/* Color Details Body */}
              <div className="p-4 bg-slate-900/90 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-white mb-0.5">{color.name}</h4>
                  <div className="text-[11px] font-mono text-slate-400 mb-2">{rgbStr}</div>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {color.usageNotes}
                  </p>
                </div>

                {/* WCAG Contrast Ratings */}
                <div className="pt-3 border-t border-slate-800/80 space-y-1.5 text-[11px]">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">vs White:</span>
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-slate-300">{contrastWhite}:1</span>
                      <span
                        className={`px-1.5 py-0.2 rounded text-[9px] font-mono font-bold border ${ratingWhite.colorClass}`}
                      >
                        {ratingWhite.level}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">vs Dark:</span>
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-slate-300">{contrastDark}:1</span>
                      <span
                        className={`px-1.5 py-0.2 rounded text-[9px] font-mono font-bold border ${ratingDark.colorClass}`}
                      >
                        {ratingDark.level}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Accessibility & Application Guidelines Card */}
      <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400 mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              Accessibility &amp; Contrast Audit
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {bible.palette.accessibilityNotes}
            </p>
          </div>

          <div>
            <div className="flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-indigo-400 mb-2">
              <Info className="w-3.5 h-3.5" />
              Usage &amp; Implementation Directives
            </div>
            <ul className="space-y-1">
              {bible.palette.applicationGuidelines.map((guideline, idx) => (
                <li key={idx} className="text-xs text-slate-300 flex items-start gap-1.5">
                  <span className="text-indigo-400 mt-0.5">•</span>
                  <span>{guideline}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
