import React, { useState, useEffect } from 'react';
import {
  Type,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  Sliders,
  AlignLeft
} from 'lucide-react';
import { BrandBible } from '../types/brand';
import { buildGoogleFontsUrl } from '../utils/brandMath';

interface TypographySectionProps {
  bible: BrandBible;
}

export const TypographySection: React.FC<TypographySectionProps> = ({ bible }) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [customHeadline, setCustomHeadline] = useState(
    bible.typography.headerFont.previewText || 'Every morning is an architectural ceremony.'
  );
  const [customBody, setCustomBody] = useState(
    bible.typography.bodyFont.previewText ||
      'Direct-trade beans slowly harvested in volcanic valleys, roasted for clarity and deep cognitive flow.'
  );
  const [fontSizeScale, setFontSizeScale] = useState<number>(100); // 100%

  const headerFont = bible.typography.headerFont;
  const bodyFont = bible.typography.bodyFont;
  const typeScale = bible.typography.typeScale;

  // Dynamically inject Google Font stylesheet into document head
  useEffect(() => {
    const fontUrl = buildGoogleFontsUrl(headerFont.family, bodyFont.family);
    const linkId = 'brand-bible-dynamic-fonts';
    let link = document.getElementById(linkId) as HTMLLinkElement | null;

    if (!link) {
      link = document.createElement('link');
      link.id = linkId;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
    link.href = fontUrl;
  }, [headerFont.family, bodyFont.family]);

  const copyEmbedCode = () => {
    const embed = `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="${buildGoogleFontsUrl(headerFont.family, bodyFont.family)}" rel="stylesheet">`;
    navigator.clipboard.writeText(embed);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section className="mb-14">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
        <div>
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-amber-400">
            03 • Typographic Architecture
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            Google Font Pairing &amp; Type Scale
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-xl">
            Curated typographic harmony balancing expressive display charisma with effortless long-form legibility.
          </p>
        </div>

        {/* Copy Embed Link Button */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={copyEmbedCode}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700/80 hover:bg-slate-800 text-xs font-medium text-slate-200 transition-colors"
            aria-label="Copy Google Fonts HTML link embed code"
          >
            {copiedCode ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Copied &lt;link&gt;</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>Copy Google Font &lt;link&gt;</span>
              </>
            )}
          </button>

          <a
            href={`https://fonts.google.com/specimen/${encodeURIComponent(headerFont.family)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700/80 hover:bg-slate-800 text-xs font-medium text-slate-300 transition-colors"
            title="View on Google Fonts"
          >
            <span>Google Fonts</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
        </div>
      </div>

      {/* Font Pairing Cards (Header & Body) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Header Font Specimen Card */}
        <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-500/10 text-amber-300 border border-amber-500/20">
                Primary Display &amp; Header
              </span>
              <span className="text-xs font-mono text-slate-400 capitalize">
                Category: {headerFont.category}
              </span>
            </div>

            <div className="flex items-baseline justify-between mb-2">
              <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                {headerFont.family}
              </h3>
              <div className="text-xs font-mono text-slate-400">
                Weights: {headerFont.weights.join(', ')}
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-6">
              {headerFont.pairingRationale}
            </p>

            {/* Live Specimen Preview */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800/80 mb-4 min-h-[110px] flex items-center">
              <p
                className="text-2xl sm:text-3xl text-slate-100 font-bold leading-tight"
                style={{
                  fontFamily: `'${headerFont.family}', serif, sans-serif`,
                  fontSize: `${(28 * fontSizeScale) / 100}px`,
                }}
              >
                {customHeadline || 'The quick brown fox jumps over the lazy dog.'}
              </p>
            </div>
          </div>

          {/* Interactive Tester input */}
          <div className="pt-2">
            <label className="block text-[11px] font-mono text-slate-400 mb-1 flex items-center gap-1">
              <AlignLeft className="w-3 h-3 text-amber-400" />
              Test Headline Text:
            </label>
            <input
              type="text"
              value={customHeadline}
              onChange={(e) => setCustomHeadline(e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
              placeholder="Type to preview in header font..."
            />
          </div>
        </div>

        {/* Body Font Specimen Card */}
        <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                Interface &amp; Body Copy
              </span>
              <span className="text-xs font-mono text-slate-400 capitalize">
                Category: {bodyFont.category}
              </span>
            </div>

            <div className="flex items-baseline justify-between mb-2">
              <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                {bodyFont.family}
              </h3>
              <div className="text-xs font-mono text-slate-400">
                Weights: {bodyFont.weights.join(', ')}
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-6">
              {bodyFont.pairingRationale}
            </p>

            {/* Live Specimen Preview */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800/80 mb-4 min-h-[110px] flex items-center">
              <p
                className="text-sm sm:text-base text-slate-300 leading-relaxed"
                style={{
                  fontFamily: `'${bodyFont.family}', sans-serif`,
                  fontSize: `${(15 * fontSizeScale) / 100}px`,
                }}
              >
                {customBody ||
                  'Direct-trade beans slowly harvested in volcanic valleys, roasted for clarity and deep cognitive flow.'}
              </p>
            </div>
          </div>

          {/* Interactive Tester input */}
          <div className="pt-2">
            <label className="block text-[11px] font-mono text-slate-400 mb-1 flex items-center gap-1">
              <AlignLeft className="w-3 h-3 text-indigo-400" />
              Test Body Paragraph:
            </label>
            <input
              type="text"
              value={customBody}
              onChange={(e) => setCustomBody(e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-indigo-400"
              placeholder="Type to preview in body font..."
            />
          </div>
        </div>
      </div>

      {/* Type Scale Hierarchy Table */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-3 border-b border-slate-800">
          <div>
            <h4 className="text-sm font-semibold text-white">Typographic Hierarchy &amp; Scale</h4>
            <p className="text-xs text-slate-400">
              Standardized vertical rhythm steps for multi-platform consistency.
            </p>
          </div>

          {/* Font Scale Adjuster */}
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Sliders className="w-3.5 h-3.5 text-slate-400" />
            <span>Scale: {fontSizeScale}%</span>
            <input
              type="range"
              min="75"
              max="150"
              value={fontSizeScale}
              onChange={(e) => setFontSizeScale(Number(e.target.value))}
              className="w-24 accent-amber-400 cursor-pointer"
              aria-label="Preview font scale slider"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono">
                <th className="py-2.5 px-3">Level</th>
                <th className="py-2.5 px-3">Size / Line-Height</th>
                <th className="py-2.5 px-3">Weight</th>
                <th className="py-2.5 px-3">Target Font</th>
                <th className="py-2.5 px-3 w-1/2">Live Rendered Specimen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {typeScale.map((step, idx) => {
                const isHeader = step.fontTarget === 'header';
                const fontFam = isHeader ? headerFont.family : bodyFont.family;

                return (
                  <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 px-3 font-semibold text-white">{step.level}</td>
                    <td className="py-3 px-3 font-mono text-slate-300">
                      {step.size} / {step.lineHeight}
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-400">{step.weight}</td>
                    <td className="py-3 px-3 font-medium text-slate-300">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                          isHeader
                            ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                            : 'bg-indigo-500/10 text-indigo-300 border border-indigo-500/20'
                        }`}
                      >
                        {fontFam}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-100 truncate">
                      <span
                        style={{
                          fontFamily: `'${fontFam}', sans-serif`,
                          fontSize: step.size,
                          lineHeight: step.lineHeight,
                          fontWeight: step.weight,
                        }}
                      >
                        {bible.brandName} — {step.level}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
