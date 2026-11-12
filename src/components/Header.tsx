import React from 'react';
import {
  Sparkles,
  Download,
  MessageSquare,
  RefreshCw,
  Layers,
  ChevronDown,
  Printer
} from 'lucide-react';
import { BrandBible } from '../types/brand';

interface HeaderProps {
  bible: BrandBible;
  onOpenGenerator: () => void;
  onOpenExport: () => void;
  onToggleChat: () => void;
  isChatOpen: boolean;
  onSelectPreset: (presetId: string) => void;
  presetMissions: Array<{ id: string; name: string }>;
}

export const Header: React.FC<HeaderProps> = ({
  bible,
  onOpenGenerator,
  onOpenExport,
  onToggleChat,
  isChatOpen,
  onSelectPreset,
  presetMissions,
}) => {
  const [isPresetsOpen, setIsPresetsOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Left: Brand Identity Logo & Active Identity Name */}
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-600 p-[1.5px] shadow-lg shadow-indigo-500/10">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-amber-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white tracking-tight text-base sm:text-lg">
                Brand Bible
              </span>
              <span className="text-[10px] uppercase font-mono font-bold tracking-widest px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                AI Studio
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="text-slate-300 font-medium">{bible.brandName}</span>
              <span className="text-slate-600">•</span>
              <span className="truncate max-w-[200px]">{bible.industry}</span>
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center flex-wrap gap-2 sm:gap-2.5">
          {/* Presets dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsPresetsOpen(!isPresetsOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700/80 hover:bg-slate-800 text-xs font-medium text-slate-200 transition-colors"
              aria-label="Preset brand identities"
              aria-expanded={isPresetsOpen}
            >
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              <span>Presets</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {isPresetsOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsPresetsOpen(false)}
                />
                <div className="absolute right-0 mt-1.5 w-56 rounded-xl bg-slate-900 border border-slate-700/80 shadow-2xl py-1.5 z-50 text-xs">
                  <div className="px-3 py-1 text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                    Curated Brand Bibles
                  </div>
                  {presetMissions.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        onSelectPreset(p.id);
                        setIsPresetsOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-slate-800 text-slate-200 flex items-center justify-between"
                    >
                      <span className="font-medium">{p.name}</span>
                      <span className="text-[10px] text-slate-400">Load</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* New Identity Generator Button */}
          <button
            onClick={onOpenGenerator}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-slate-950 font-semibold text-xs shadow-md shadow-amber-500/20 transition-all active:scale-[0.98]"
            aria-label="Generate new brand identity"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Generate Identity</span>
          </button>

          {/* Export Brand Bible */}
          <button
            onClick={onOpenExport}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700/80 hover:bg-slate-800 text-xs font-medium text-slate-200 transition-colors"
            aria-label="Export Brand Bible options"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Export Bible</span>
          </button>

          {/* Quick Print */}
          <button
            onClick={() => window.print()}
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg bg-slate-900 border border-slate-700/80 hover:bg-slate-800 text-xs font-medium text-slate-300 transition-colors"
            title="Print or Save as PDF"
            aria-label="Print Brand Bible"
          >
            <Printer className="w-3.5 h-3.5" />
          </button>

          {/* AI Brand Strategist Chat Toggle */}
          <button
            onClick={onToggleChat}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
              isChatOpen
                ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/30'
                : 'bg-slate-900 border-indigo-500/40 text-indigo-300 hover:bg-slate-800 hover:text-white'
            }`}
            aria-label="Toggle AI Brand Strategist chatbot"
            aria-expanded={isChatOpen}
          >
            <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
            <span>AI Strategist</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </button>
        </div>
      </div>
    </header>
  );
};
