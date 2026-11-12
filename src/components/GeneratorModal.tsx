import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Target,
  Compass,
  Layers,
  Wand2,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { BrandBible } from '../types/brand';

interface GeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBibleGenerated: (bible: BrandBible) => void;
  presets: Array<{
    id: string;
    name: string;
    industry: string;
    mission: string;
    archetype: string;
    keywords: string[];
    bible: BrandBible;
  }>;
}

export const GeneratorModal: React.FC<GeneratorModalProps> = ({
  isOpen,
  onClose,
  onBibleGenerated,
  presets,
}) => {
  const [mission, setMission] = useState('');
  const [brandNameHint, setBrandNameHint] = useState('');
  const [industry, setIndustry] = useState('Technology & SaaS');
  const [archetype, setArchetype] = useState('The Creator');
  const [mood, setMood] = useState('Minimalist, architectural, sophisticated, modern');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSelectPreset = (p: (typeof presets)[0]) => {
    setMission(p.mission);
    setBrandNameHint(p.name);
    setIndustry(p.industry);
    setArchetype(p.archetype.split('&')[0].trim());
    setMood(p.keywords.join(', '));
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mission.trim()) {
      setErrorMsg('Please describe your company mission to generate the Brand Bible.');
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);

    try {
      const response = await fetch('/api/brand/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mission,
          industry,
          archetype,
          mood,
          brandNameHint: brandNameHint.trim() || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate Brand Bible.');
      }

      onBibleGenerated(data.brandBible);
      onClose();
    } catch (err: any) {
      console.error('Generation error:', err);
      setErrorMsg(
        err.message ||
          'Failed to generate identity. If your GEMINI_API_KEY is not set, you can also load any of the pre-curated Brand Bibles instantly.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
      <div
        className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-800 bg-slate-950/70 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-500 p-[1.5px]">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-amber-400" />
              </div>
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">
                Generate Brand Bible
              </h2>
              <p className="text-xs text-slate-400">
                Transform your mission into an executive identity system in seconds.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            aria-label="Close generator modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleGenerate} className="p-6 space-y-5">
          {/* Preset mission chips */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              Quick Mission Presets (Click to autofill):
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {presets.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handleSelectPreset(p)}
                  className="p-2.5 rounded-xl bg-slate-950/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-left transition-all"
                >
                  <div className="text-xs font-semibold text-slate-200">{p.name}</div>
                  <div className="text-[10px] text-slate-400 truncate">{p.industry}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Company Mission Textarea (Core prompt requirement) */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-amber-400" />
              Company Mission Statement <span className="text-rose-400">*</span>:
            </label>
            <textarea
              required
              rows={4}
              value={mission}
              onChange={(e) => setMission(e.target.value)}
              placeholder="e.g. We craft ethically sourced, micro-batch specialty coffees engineered to inspire deep focus and mindful morning rituals for makers, thinkers, and craftspeople..."
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-amber-400 leading-relaxed font-sans"
            />
          </div>

          {/* Optional Brand Name & Industry */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                Brand Name (Optional):
              </label>
              <input
                type="text"
                value={brandNameHint}
                onChange={(e) => setBrandNameHint(e.target.value)}
                placeholder="Leave blank to let AI invent one"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                Industry Sector:
              </label>
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
              >
                <option value="Technology & SaaS">Technology &amp; SaaS</option>
                <option value="Specialty Food & Hospitality">Specialty Food &amp; Hospitality</option>
                <option value="Sustainable Architecture & Design">Sustainable Architecture &amp; Design</option>
                <option value="Fintech & Cryptography">Fintech &amp; Cryptography</option>
                <option value="Health, Wellness & Longevity">Health, Wellness &amp; Longevity</option>
                <option value="Fashion, Luxury & Goods">Fashion, Luxury &amp; Goods</option>
                <option value="Climate, Energy & Mobility">Climate, Energy &amp; Mobility</option>
              </select>
            </div>
          </div>

          {/* Archetype & Aesthetic Mood */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1">
                <Compass className="w-3 h-3 text-indigo-400" />
                Brand Archetype:
              </label>
              <select
                value={archetype}
                onChange={(e) => setArchetype(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
              >
                <option value="The Creator">The Creator (Visionary, Artistic, Craft)</option>
                <option value="The Sage">The Sage (Wisdom, Expertise, Intelligence)</option>
                <option value="The Hero">The Hero (Determination, Mastery, Courage)</option>
                <option value="The Magician">The Magician (Transformation, Wonder, Tech)</option>
                <option value="The Outlaw">The Outlaw (Disruptor, Radical, Independent)</option>
                <option value="The Caregiver">The Caregiver (Nurturing, Altruistic, Warm)</option>
                <option value="The Explorer">The Explorer (Freedom, Discovery, Pioneering)</option>
                <option value="The Ruler">The Ruler (Prestige, Control, Sovereign)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                Aesthetic Vibe / Keywords:
              </label>
              <input
                type="text"
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                placeholder="e.g. Minimalist, tactile, warm, organic"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Footer Actions */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-800">
            <span className="text-[11px] font-mono text-slate-400">
              Generates SVG logos, 60-30-10 palette, and Google Fonts
            </span>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                aria-label="Generate complete Brand Bible"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                    <span>Architecting Brand Bible...</span>
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4" />
                    <span>Generate Brand Bible</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
