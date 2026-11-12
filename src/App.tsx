import React, { useState } from 'react';
import { PRESET_MISSIONS } from './utils/presets';
import { BrandBible, GeneratedBrandAsset } from './types/brand';
import { Header } from './components/Header';
import { BrandOverviewHero } from './components/BrandOverviewHero';
import { LogoSection } from './components/LogoSection';
import { ColorPaletteSection } from './components/ColorPaletteSection';
import { TypographySection } from './components/TypographySection';
import { BrandStudioSection } from './components/BrandStudioSection';
import { BrandChatDrawer } from './components/BrandChatDrawer';
import { GeneratorModal } from './components/GeneratorModal';
import { ExportModal } from './components/ExportModal';
import { Sparkles, MessageSquare } from 'lucide-react';

export default function App() {
  const [bible, setBible] = useState<BrandBible>(PRESET_MISSIONS[0].bible);
  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleSelectPreset = (presetId: string) => {
    const found = PRESET_MISSIONS.find((p) => p.id === presetId);
    if (found) {
      setBible(found.bible);
    }
  };

  const handleBibleGenerated = (newBible: BrandBible) => {
    setBible(newBible);
  };

  const handleAddGeneratedAsset = (asset: GeneratedBrandAsset) => {
    setBible((prev) => ({
      ...prev,
      imageryGuidelines: {
        ...prev.imageryGuidelines,
        generatedAssets: [asset, ...(prev.imageryGuidelines.generatedAssets || [])],
      },
    }));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950">
      {/* Header */}
      <Header
        bible={bible}
        onOpenGenerator={() => setIsGeneratorOpen(true)}
        onOpenExport={() => setIsExportOpen(true)}
        onToggleChat={() => setIsChatOpen(!isChatOpen)}
        isChatOpen={isChatOpen}
        onSelectPreset={handleSelectPreset}
        presetMissions={PRESET_MISSIONS.map((p) => ({ id: p.id, name: p.name }))}
      />

      {/* Main Dashboard Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 py-8 sm:py-10">
        {/* Brand Overview & Mission Hero */}
        <BrandOverviewHero bible={bible} />

        {/* 01: Logo Architecture & Secondary Marks */}
        <LogoSection bible={bible} />

        {/* 02: 5-Color Hex Palette & Usage System */}
        <ColorPaletteSection bible={bible} />

        {/* 03: Typography Architecture & Google Font Pairings */}
        <TypographySection bible={bible} />

        {/* 04: Brand Visual Studio (gemini-3-pro-image-preview with 1K, 2K, 4K) */}
        <BrandStudioSection
          bible={bible}
          onAddGeneratedAsset={handleAddGeneratedAsset}
        />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/60 py-8 px-4 sm:px-8 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-300">Brand Bible</span>
            <span>•</span>
            <span>Comprehensive Corporate Identity Generator</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsGeneratorOpen(true)}
              className="text-amber-400 hover:text-amber-300 transition-colors"
            >
              Generate New Identity
            </button>
            <button
              onClick={() => setIsExportOpen(true)}
              className="hover:text-slate-200 transition-colors"
            >
              Export System
            </button>
            <button
              onClick={() => setIsChatOpen(true)}
              className="hover:text-slate-200 transition-colors"
            >
              AI Strategist
            </button>
          </div>
        </div>
      </footer>

      {/* Floating AI Strategist trigger button */}
      <button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-6 right-6 z-40 p-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-amber-600 hover:from-indigo-500 hover:to-amber-500 text-white shadow-2xl shadow-indigo-600/40 flex items-center gap-2 font-medium text-xs transition-all hover:scale-105 active:scale-95"
        aria-label="Open AI Brand Strategist chat"
      >
        <MessageSquare className="w-4 h-4" />
        <span className="hidden sm:inline">Ask Brand Strategist</span>
      </button>

      {/* Generator Modal */}
      <GeneratorModal
        isOpen={isGeneratorOpen}
        onClose={() => setIsGeneratorOpen(false)}
        onBibleGenerated={handleBibleGenerated}
        presets={PRESET_MISSIONS}
      />

      {/* Export Modal */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        bible={bible}
      />

      {/* Multi-turn Gemini Brand Strategist Chat Drawer */}
      <BrandChatDrawer
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        bible={bible}
      />
    </div>
  );
}
