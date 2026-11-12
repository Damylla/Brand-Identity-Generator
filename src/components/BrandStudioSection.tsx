import React, { useState } from 'react';
import {
  Image as ImageIcon,
  Sparkles,
  Download,
  Maximize2,
  Layers,
  Cpu,
  Ratio,
  Wand2,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { BrandBible, GeneratedBrandAsset } from '../types/brand';

interface BrandStudioSectionProps {
  bible: BrandBible;
  onAddGeneratedAsset: (asset: GeneratedBrandAsset) => void;
}

export const BrandStudioSection: React.FC<BrandStudioSectionProps> = ({
  bible,
  onAddGeneratedAsset,
}) => {
  const [selectedSize, setSelectedSize] = useState<'1K' | '2K' | '4K'>('2K');
  const [selectedRatio, setSelectedRatio] = useState<'1:1' | '16:9' | '4:3' | '9:16'>('16:9');
  const [prompt, setPrompt] = useState(
    `A high-end editorial product packaging mockup for "${bible.brandName}" specialty products, featuring luxury matte paperboard, clean embossed typography, warm studio lighting, palette accents in ${bible.palette.colors[2]?.hex || '#E07A5F'}, minimalist aesthetics, photorealistic 8k detail.`
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [selectedAssetForZoom, setSelectedAssetForZoom] = useState<GeneratedBrandAsset | null>(null);

  const presets = [
    {
      title: 'Packaging Mockup',
      prompt: `Premium minimalist packaging box mockup for "${bible.brandName}" with subtle embossed foil logo, placed on a smooth stone surface with natural morning shadows, color accents of ${bible.palette.colors[0]?.hex || '#3D405B'} and ${bible.palette.colors[2]?.hex || '#E07A5F'}, ultra-realistic commercial product photography.`,
      ratio: '4:3' as const,
    },
    {
      title: '3D Metallic Signage',
      prompt: `Architectural brushed brass 3D dimensional logo signage for "${bible.brandName}" mounted on a textured lime-washed concrete wall in a sunlit flagship studio, elegant dramatic side lighting, high depth of field, architectural photography.`,
      ratio: '16:9' as const,
    },
    {
      title: 'Editorial Brand Hero',
      prompt: `Artistic editorial hero image representing the mission of "${bible.brandName}": ${bible.mission}. Warm atmospheric ambient lighting, authentic tactile materials, rich composition reflecting ${bible.imageryGuidelines.moodKeywords.join(', ')}.`,
      ratio: '16:9' as const,
    },
    {
      title: 'Apparel & Merch',
      prompt: `High quality heavyweight cotton canvas tote bag and embroidered workwear jacket with minimal "${bible.brandName}" emblem patch, shot in an airy creative workshop, natural soft daylight, authentic lifestyle photography.`,
      ratio: '1:1' as const,
    },
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setErrorMsg(null);

    try {
      const response = await fetch('/api/image/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          size: selectedSize,
          aspectRatio: selectedRatio,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate image.');
      }

      const newAsset: GeneratedBrandAsset = {
        id: `asset-${Date.now()}`,
        title: `${bible.brandName} Asset`,
        prompt,
        size: data.size || selectedSize,
        aspectRatio: data.aspectRatio || selectedRatio,
        imageUrl: data.imageUrl,
        timestamp: Date.now(),
      };

      onAddGeneratedAsset(newAsset);
    } catch (err: any) {
      console.error('Error generating image:', err);
      setErrorMsg(err.message || 'Image generation failed. Please check your API key in Secrets.');
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadImage = (url: string, filename: string) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const assets = bible.imageryGuidelines.generatedAssets || [];

  return (
    <section className="mb-14">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
        <div>
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-amber-400">
            04 • Visual Brand Studio
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            High-Resolution Brand Assets &amp; Photography
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-xl">
            Generate photorealistic brand collateral, packaging mockups, and dimensional signage powered by Gemini 3 Pro with resolution controls.
          </p>
        </div>

        {/* Engine Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono self-start sm:self-auto">
          <Cpu className="w-3.5 h-3.5 text-indigo-400" />
          <span>Model: gemini-3-pro-image-preview</span>
        </div>
      </div>

      {/* Art Direction Foundation Banner */}
      <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div>
            <span className="font-mono uppercase tracking-wider text-slate-400 block mb-1">
              Art Direction DNA
            </span>
            <p className="text-slate-200 leading-relaxed font-normal">
              {bible.imageryGuidelines.artDirection}
            </p>
          </div>
          <div>
            <span className="font-mono uppercase tracking-wider text-slate-400 block mb-1">
              Lighting &amp; Composition
            </span>
            <p className="text-slate-300 leading-relaxed">
              {bible.imageryGuidelines.lightingAndComposition}
            </p>
          </div>
          <div>
            <span className="font-mono uppercase tracking-wider text-slate-400 block mb-1">
              Atmospheric Keywords
            </span>
            <div className="flex flex-wrap gap-1 mt-1">
              {bible.imageryGuidelines.moodKeywords.map((kw, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700/80 font-mono text-[10px]"
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Studio Generator Controls Card */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-xl mb-8">
        <div className="flex flex-col gap-5">
          {/* Preset Prompts Selector */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Collateral Presets:
            </label>
            <div className="flex flex-wrap gap-2">
              {presets.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setPrompt(p.prompt);
                    setSelectedRatio(p.ratio);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700/80 text-xs font-medium text-slate-200 transition-colors"
                >
                  {p.title}
                </button>
              ))}
            </div>
          </div>

          {/* Prompt Textarea */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
              Generation Prompt (Describing Collateral, Lighting &amp; Composition):
            </label>
            <textarea
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors font-mono"
              placeholder="Describe your brand collateral or photography..."
            />
          </div>

          {/* Controls: Size Affordance (1K, 2K, 4K) & Aspect Ratio */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 items-center">
            {/* Resolution Selector (1K, 2K, 4K) */}
            <div className="lg:col-span-6">
              <span className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1">
                <Cpu className="w-3 h-3 text-amber-400" />
                Image Resolution Affordance:
              </span>
              <div className="grid grid-cols-3 gap-2">
                {(['1K', '2K', '4K'] as const).map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 px-3 rounded-xl border text-xs font-mono font-bold transition-all flex flex-col items-center justify-center ${
                      selectedSize === size
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-md shadow-amber-500/10'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    <span>{size}</span>
                    <span className="text-[9px] font-normal opacity-70">
                      {size === '1K' ? '1024px' : size === '2K' ? '2048px' : '4096px'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Aspect Ratio Selector */}
            <div className="lg:col-span-6">
              <span className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1">
                <Ratio className="w-3 h-3 text-indigo-400" />
                Aspect Ratio:
              </span>
              <div className="grid grid-cols-4 gap-2">
                {(['1:1', '16:9', '4:3', '9:16'] as const).map((ratio) => (
                  <button
                    key={ratio}
                    type="button"
                    onClick={() => setSelectedRatio(ratio)}
                    className={`py-2 px-2 rounded-xl border text-xs font-mono font-medium transition-all text-center ${
                      selectedRatio === ratio
                        ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/50 shadow-md shadow-indigo-500/10'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    {ratio}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Error Banner */}
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Action Trigger */}
          <div className="flex justify-end pt-2">
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 disabled:opacity-50 transition-all active:scale-[0.98]"
              aria-label="Generate high-resolution brand asset"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                  <span>Synthesizing {selectedSize} Brand Visual...</span>
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4" />
                  <span>Generate {selectedSize} Brand Visual</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Generated Assets Gallery */}
      <div>
        <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <ImageIcon className="w-3.5 h-3.5 text-slate-400" />
            Generated Collateral Gallery ({assets.length} assets)
          </span>
          {assets.length > 0 && (
            <span className="text-slate-400 text-[11px]">Click asset to inspect &amp; download</span>
          )}
        </div>

        {assets.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-800 p-10 text-center bg-slate-950/40">
            <ImageIcon className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <h4 className="text-sm font-semibold text-slate-300">No brand visuals generated yet</h4>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              Select one of the presets above and click "Generate {selectedSize} Brand Visual" to create mockups with gemini-3-pro-image-preview.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {assets.map((asset) => (
              <div
                key={asset.id}
                className="group rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-md hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                {/* Image Container */}
                <div
                  className="relative overflow-hidden bg-slate-950 cursor-pointer aspect-video"
                  onClick={() => setSelectedAssetForZoom(asset)}
                >
                  <img
                    src={asset.imageUrl}
                    alt={asset.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-black/60 backdrop-blur-md text-amber-300 border border-amber-500/30">
                      {asset.size}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-black/60 backdrop-blur-md text-slate-300 border border-slate-700/60">
                      {asset.aspectRatio}
                    </span>
                  </div>

                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="p-2 rounded-full bg-white/20 backdrop-blur-md text-white">
                      <Maximize2 className="w-4 h-4" />
                    </span>
                  </div>
                </div>

                {/* Info & Download Bar */}
                <div className="p-4 bg-slate-900/90 flex items-center justify-between gap-2">
                  <div className="truncate">
                    <h5 className="text-xs font-semibold text-white truncate">
                      {asset.title}
                    </h5>
                    <p className="text-[10px] font-mono text-slate-400 truncate max-w-[200px]">
                      {asset.prompt}
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      downloadImage(
                        asset.imageUrl,
                        `${bible.brandName.toLowerCase()}-${asset.size}-asset`
                      )
                    }
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors shrink-0"
                    title={`Download ${asset.size} Image`}
                    aria-label={`Download ${asset.title}`}
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Zoom Modal */}
      {selectedAssetForZoom && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={() => setSelectedAssetForZoom(null)}
        >
          <div
            className="max-w-4xl w-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative max-h-[70vh] bg-black flex items-center justify-center overflow-hidden">
              <img
                src={selectedAssetForZoom.imageUrl}
                alt={selectedAssetForZoom.title}
                className="max-h-[70vh] w-auto object-contain"
              />
            </div>
            <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/10 text-amber-300 border border-amber-500/20">
                    {selectedAssetForZoom.size} Master Resolution
                  </span>
                  <span className="text-xs text-slate-400">
                    {selectedAssetForZoom.aspectRatio} Aspect Ratio
                  </span>
                </div>
                <p className="text-xs text-slate-300 font-mono">
                  {selectedAssetForZoom.prompt}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    downloadImage(
                      selectedAssetForZoom.imageUrl,
                      `${bible.brandName.toLowerCase()}-${selectedAssetForZoom.size}-asset`
                    )
                  }
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download {selectedAssetForZoom.size} PNG</span>
                </button>
                <button
                  onClick={() => setSelectedAssetForZoom(null)}
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
