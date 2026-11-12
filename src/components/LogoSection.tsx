import React, { useState } from 'react';
import {
  Maximize2,
  Copy,
  Check,
  Download,
  Sun,
  Moon,
  Grid,
  Shield,
  Layers,
  Sparkles
} from 'lucide-react';
import { BrandBible, SecondaryMark } from '../types/brand';

interface LogoSectionProps {
  bible: BrandBible;
}

export const LogoSection: React.FC<LogoSectionProps> = ({ bible }) => {
  const [primaryBg, setPrimaryBg] = useState<'dark' | 'light' | 'brand'>('dark');
  const [showGrid, setShowGrid] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const downloadSvg = (svgContent: string, filename: string) => {
    const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const primaryLogo = bible.logos.primary;
  const secondaryMarks = bible.logos.secondaryMarks;

  return (
    <section className="mb-14">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
        <div>
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-amber-400">
            01 • Mark Architecture
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            Primary Logo &amp; Secondary Marks
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-xl">
            A versatile system of vector marks designed for responsive scale, from 16px favicons to building signage.
          </p>
        </div>

        {/* Backdrop & Grid Controls for Primary Logo */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 self-start sm:self-auto">
          <button
            onClick={() => setPrimaryBg('dark')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1 transition-colors ${
              primaryBg === 'dark' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
            }`}
            title="Dark Background"
          >
            <Moon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Dark</span>
          </button>
          <button
            onClick={() => setPrimaryBg('light')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1 transition-colors ${
              primaryBg === 'light' ? 'bg-slate-200 text-slate-900' : 'text-slate-400 hover:text-white'
            }`}
            title="Light Background"
          >
            <Sun className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Light</span>
          </button>
          <button
            onClick={() => setShowGrid(!showGrid)}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1 transition-colors ${
              showGrid ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
            title="Toggle Clearspace Grid"
          >
            <Grid className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Grid</span>
          </button>
        </div>
      </div>

      {/* Primary Logo Showcase Card */}
      <div className="rounded-3xl bg-slate-900/90 border border-slate-800 overflow-hidden shadow-xl mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Main Logo Canvas */}
          <div
            className={`lg:col-span-8 p-8 sm:p-14 flex items-center justify-center min-h-[300px] relative transition-colors duration-300 ${
              primaryBg === 'dark'
                ? 'bg-slate-950 text-white'
                : 'bg-neutral-50 text-slate-900'
            }`}
          >
            {/* Grid overlay */}
            {showGrid && (
              <div
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                  backgroundImage: `linear-gradient(to right, #6366f1 1px, transparent 1px), linear-gradient(to bottom, #6366f1 1px, transparent 1px)`,
                  backgroundSize: '20px 20px',
                }}
              />
            )}

            {/* Clearspace boundary indicator */}
            {showGrid && (
              <div className="absolute inset-8 border border-dashed border-indigo-400/40 rounded-2xl pointer-events-none flex items-start justify-end p-2">
                <span className="text-[10px] font-mono text-indigo-400 bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-500/30">
                  CLEARSPACE BOUNDARY: {primaryLogo.clearspace}
                </span>
              </div>
            )}

            {/* Rendered SVG */}
            <div
              className="w-full max-w-md max-h-48 flex items-center justify-center drop-shadow-md select-none"
              dangerouslySetInnerHTML={{ __html: primaryLogo.svgContent }}
            />
          </div>

          {/* Logo Specs & Details Sidebar */}
          <div className="lg:col-span-4 p-6 sm:p-8 bg-slate-900 border-t lg:border-t-0 lg:border-l border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  Primary Brand Mark
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Master Signature Lockup</h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-5">
                {primaryLogo.concept}
              </p>

              <div className="space-y-3 py-3 border-y border-slate-800/80 text-xs mb-5">
                <div>
                  <span className="text-slate-400 block text-[11px] font-mono">
                    Clearspace Protocol:
                  </span>
                  <span className="text-slate-200 font-medium">{primaryLogo.clearspace}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px] font-mono">
                    Minimum Digital / Print Scale:
                  </span>
                  <span className="text-slate-200 font-medium">{primaryLogo.minSize}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() =>
                  copyToClipboard(primaryLogo.svgContent, 'primary-logo')
                }
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 transition-colors"
                aria-label="Copy primary logo SVG code"
              >
                {copiedId === 'primary-logo' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied SVG</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    <span>Copy SVG</span>
                  </>
                )}
              </button>

              <button
                onClick={() =>
                  downloadSvg(
                    primaryLogo.svgContent,
                    `${bible.brandName.toLowerCase()}-primary-logo`
                  )
                }
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white shadow-md shadow-indigo-600/20 transition-colors"
                aria-label="Download primary logo SVG file"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download SVG</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Marks Grid (4 Marks) */}
      <div className="mb-2">
        <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
          <Layers className="w-3.5 h-3.5 text-slate-400" />
          Secondary &amp; Application Marks (4 Variations)
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {secondaryMarks.map((mark, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden flex flex-col justify-between hover:border-slate-700 transition-all shadow-md group"
            >
              {/* Mark Canvas Preview */}
              <div
                className={`p-6 flex items-center justify-center min-h-[170px] transition-colors relative ${
                  mark.type === 'monochrome'
                    ? 'bg-slate-100 text-slate-900'
                    : 'bg-slate-950 text-white'
                }`}
              >
                <div
                  className="w-full h-full max-h-28 flex items-center justify-center select-none"
                  dangerouslySetInnerHTML={{ __html: mark.svgContent }}
                />
                <span className="absolute top-2.5 right-2.5 px-1.5 py-0.5 rounded text-[9px] font-mono uppercase font-semibold bg-slate-900/80 text-slate-300 border border-slate-800 backdrop-blur-sm">
                  {mark.type}
                </span>
              </div>

              {/* Mark Information */}
              <div className="p-4 bg-slate-900/90 border-t border-slate-800/80 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-white mb-1">{mark.name}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {mark.description}
                  </p>
                </div>

                {/* Mark Actions */}
                <div className="flex items-center gap-2 pt-2 border-t border-slate-800/60">
                  <button
                    onClick={() =>
                      copyToClipboard(mark.svgContent, `mark-${idx}`)
                    }
                    className="flex-1 py-1.5 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-medium text-slate-300 flex items-center justify-center gap-1 transition-colors"
                    aria-label={`Copy SVG code for ${mark.name}`}
                  >
                    {copiedId === `mark-${idx}` ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-slate-400" />
                        <span>SVG Code</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() =>
                      downloadSvg(
                        mark.svgContent,
                        `${bible.brandName.toLowerCase()}-${mark.type}-mark`
                      )
                    }
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                    title="Download SVG file"
                    aria-label={`Download ${mark.name} as SVG`}
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
