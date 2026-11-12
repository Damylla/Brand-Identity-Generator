import React from 'react';
import { Target, Compass, Sparkles, CheckCircle2, XCircle, ShieldCheck } from 'lucide-react';
import { BrandBible } from '../types/brand';

interface BrandOverviewHeroProps {
  bible: BrandBible;
}

export const BrandOverviewHero: React.FC<BrandOverviewHeroProps> = ({ bible }) => {
  return (
    <section className="mb-14">
      {/* Brand Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800 p-6 sm:p-10 shadow-2xl">
        {/* Subtle decorative glow */}
        <div
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ backgroundColor: bible.palette.colors[2]?.hex || '#6366f1' }}
        />
        <div
          className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full blur-3xl opacity-15 pointer-events-none"
          style={{ backgroundColor: bible.palette.colors[0]?.hex || '#e07a5f' }}
        />

        <div className="relative z-10 max-w-4xl">
          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-medium tracking-wide bg-amber-500/10 text-amber-300 border border-amber-500/20 flex items-center gap-1.5">
              <Compass className="w-3 h-3" />
              {bible.archetype}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-medium tracking-wide bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 flex items-center gap-1.5">
              <Target className="w-3 h-3" />
              {bible.industry}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono text-slate-400 bg-slate-800/80 border border-slate-700/60">
              Official Brand Bible v1.0
            </span>
          </div>

          {/* Brand Name & Tagline */}
          <h1
            className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-3"
            style={{ fontFamily: `'${bible.typography.headerFont.family}', serif, sans-serif` }}
          >
            {bible.brandName}
          </h1>
          <p className="text-xl sm:text-2xl text-slate-300 font-light italic mb-8 max-w-2xl leading-relaxed">
            "{bible.tagline}"
          </p>

          {/* Mission & Positioning Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-5 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-amber-400 mb-2">
                <Target className="w-3.5 h-3.5" />
                Company Mission
              </div>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
                {bible.mission}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-5 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-indigo-400 mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                Market Positioning
              </div>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
                {bible.positioning}
              </p>
            </div>
          </div>

          {/* 3 Brand Values Pillars */}
          <div className="mb-8">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
              Core Value Pillars
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {bible.brandValues.map((val, idx) => (
                <div
                  key={idx}
                  className="rounded-xl bg-slate-950/60 border border-slate-800/80 p-4 hover:border-slate-700 transition-colors"
                >
                  <div className="text-xs font-mono text-amber-400/80 mb-1">0{idx + 1}</div>
                  <h4 className="text-sm font-semibold text-white mb-1.5">{val.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{val.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Voice & Tone Architecture */}
          <div className="rounded-2xl bg-slate-950/60 border border-slate-800/80 p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Voice &amp; Tone Spectrum
                </span>
                <h3 className="text-sm font-semibold text-white mt-0.5">
                  Brand Persona &amp; Cadence
                </h3>
              </div>

              {/* Attributes Chips */}
              <div className="flex flex-wrap gap-1.5">
                {bible.voiceAndTone.attributes.map((attr, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700"
                  >
                    {attr}
                  </span>
                ))}
              </div>
            </div>

            {/* Sliders: Formality & Energy */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 pb-4 border-b border-slate-800/60">
              <div>
                <div className="flex justify-between text-xs text-slate-400 mb-1.5">
                  <span>Casual &amp; Conversational</span>
                  <span className="font-mono text-slate-300">
                    Formality {bible.voiceAndTone.formality}%
                  </span>
                  <span>Formal &amp; Academic</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-teal-400 to-indigo-500"
                    style={{ width: `${bible.voiceAndTone.formality}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-400 mb-1.5">
                  <span>Grounded &amp; Zen</span>
                  <span className="font-mono text-slate-300">
                    Energy {bible.voiceAndTone.energy}%
                  </span>
                  <span>Dynamic &amp; Electric</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-amber-400 to-rose-500"
                    style={{ width: `${bible.voiceAndTone.energy}%` }}
                  />
                </div>
              </div>
            </div>

            {/* DOs & DON'Ts comparison */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 pt-1">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 mb-2">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  What We Sound Like (DO)
                </div>
                <ul className="space-y-1.5">
                  {bible.voiceAndTone.dos.map((item, idx) => (
                    <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                      <span className="text-emerald-500 mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-400 mb-2">
                  <XCircle className="w-3.5 h-3.5" />
                  What We Avoid (DON'T)
                </div>
                <ul className="space-y-1.5">
                  {bible.voiceAndTone.donts.map((item, idx) => (
                    <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                      <span className="text-rose-500 mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
