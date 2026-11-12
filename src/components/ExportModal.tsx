import React, { useState } from 'react';
import {
  X,
  Download,
  FileText,
  FileCode,
  Printer,
  Copy,
  Check,
  Sparkles
} from 'lucide-react';
import { BrandBible } from '../types/brand';
import { exportBibleToMarkdown, generateCssSnippet } from '../utils/brandMath';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  bible: BrandBible;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  bible,
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const downloadFile = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadJson = () => {
    const jsonStr = JSON.stringify(bible, null, 2);
    downloadFile(
      jsonStr,
      `${bible.brandName.toLowerCase().replace(/\s+/g, '-')}-brand-bible.json`,
      'application/json'
    );
  };

  const handleDownloadMarkdown = () => {
    const md = exportBibleToMarkdown(bible);
    downloadFile(
      md,
      `${bible.brandName.toLowerCase().replace(/\s+/g, '-')}-brand-bible.md`,
      'text/markdown'
    );
  };

  const handleCopySnippet = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handlePrint = () => {
    onClose();
    setTimeout(() => window.print(), 200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
      <div
        className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-800 bg-slate-950/70 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-indigo-500 p-[1.5px]">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Download className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">
                Export Brand Bible
              </h2>
              <p className="text-xs text-slate-400">
                Download guidelines and assets in standard industry formats.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            aria-label="Close export modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Export Options */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* JSON Export */}
            <button
              onClick={handleDownloadJson}
              className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 hover:bg-slate-800/40 text-left transition-all flex flex-col justify-between group"
            >
              <div>
                <FileCode className="w-5 h-5 text-amber-400 mb-2 group-hover:scale-110 transition-transform" />
                <h4 className="text-sm font-semibold text-white">JSON Design System</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Full structured data including SVG strings, hex palettes, and specs.
                </p>
              </div>
              <span className="text-[11px] font-mono text-amber-400 mt-4 flex items-center gap-1">
                Download .json &rarr;
              </span>
            </button>

            {/* Markdown Export */}
            <button
              onClick={handleDownloadMarkdown}
              className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 hover:bg-slate-800/40 text-left transition-all flex flex-col justify-between group"
            >
              <div>
                <FileText className="w-5 h-5 text-indigo-400 mb-2 group-hover:scale-110 transition-transform" />
                <h4 className="text-sm font-semibold text-white">Markdown Brand Doc</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Formatted guidelines ready for GitHub, Notion, or internal wikis.
                </p>
              </div>
              <span className="text-[11px] font-mono text-indigo-400 mt-4 flex items-center gap-1">
                Download .md &rarr;
              </span>
            </button>

            {/* Print / PDF Export */}
            <button
              onClick={handlePrint}
              className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 hover:bg-slate-800/40 text-left transition-all flex flex-col justify-between group"
            >
              <div>
                <Printer className="w-5 h-5 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
                <h4 className="text-sm font-semibold text-white">Print / Save as PDF</h4>
                <p className="text-xs text-slate-400 mt-1">
                  High-resolution print-optimized layout with page breaks.
                </p>
              </div>
              <span className="text-[11px] font-mono text-emerald-400 mt-4 flex items-center gap-1">
                Open Print Dialogue &rarr;
              </span>
            </button>

            {/* Copy CSS Variables */}
            <button
              onClick={() => handleCopySnippet(generateCssSnippet(bible), 'css')}
              className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 hover:bg-slate-800/40 text-left transition-all flex flex-col justify-between group"
            >
              <div>
                <Sparkles className="w-5 h-5 text-rose-400 mb-2 group-hover:scale-110 transition-transform" />
                <h4 className="text-sm font-semibold text-white">CSS Design Tokens</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Ready-to-paste :root variables with fonts and hex codes.
                </p>
              </div>
              <span className="text-[11px] font-mono text-rose-400 mt-4 flex items-center gap-1">
                {copiedKey === 'css' ? 'Copied to Clipboard!' : 'Copy :root CSS &rarr;'}
              </span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
