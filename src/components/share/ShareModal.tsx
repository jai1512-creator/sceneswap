import React, { useState } from 'react';
import { X, Share2, Copy, Check, Sparkles } from 'lucide-react';
import { Scene } from '../../types/scene';
import { getShareUrl, shareScene } from '../../utils/shareUtils';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  scene: Scene | null;
  onToast: (msg: string) => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  scene,
  onToast,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !scene) return null;

  const shareUrl = getShareUrl(scene);
  const canNativeShare = typeof navigator !== 'undefined' && !!navigator.share;

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = shareUrl;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
      }
      setCopied(true);
      onToast('Share link copied to clipboard!');
      setTimeout(() => setCopied(false), 2500);
    } catch {
      onToast('Could not copy link to clipboard.');
    }
  };

  const handleNativeShare = async () => {
    const res = await shareScene(scene);
    if (res.shared) {
      onToast('Shared successfully!');
      onClose();
    } else if (res.copied) {
      setCopied(true);
      onToast('Share link copied to clipboard!');
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="relative w-full max-w-lg bg-cinema-900 rounded-3xl border border-cinema-gold/30 shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-cinema-950/80">
          <div className="flex items-center gap-2 text-cinema-gold text-xs font-mono uppercase tracking-wider">
            <Share2 className="w-4 h-4" />
            <span>Share Aesthetic Card</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-cinema-400 hover:text-white hover:bg-cinema-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Shareable Aesthetic Card Preview */}
        <div className="p-6 space-y-6">
          <div
            id="shareable-card"
            className="rounded-2xl overflow-hidden bg-cinema-950 border border-white/15 p-5 space-y-4 shadow-xl relative"
          >
            {/* Visual Header */}
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-cinema-900">
              <img
                src={scene.heroImage}
                alt={scene.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cinema-950 via-transparent to-transparent" />
              <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                <span className="px-2 py-0.5 rounded text-[9px] font-mono uppercase tracking-widest bg-black/60 text-cinema-gold border border-cinema-gold/30">
                  {scene.era}
                </span>
                <span className="px-2 py-0.5 rounded text-[9px] font-mono uppercase tracking-widest bg-black/60 text-white border border-white/10">
                  {scene.mood}
                </span>
              </div>
            </div>

            {/* Title & Tagline */}
            <div className="space-y-1">
              <h4 className="font-cinematic text-2xl font-bold text-white tracking-wide">
                {scene.title}
              </h4>
              <p className="font-serif italic text-xs text-cinema-300">
                “{scene.tagline}”
              </p>
            </div>

            {/* 5-Color Mini Swatches */}
            <div className="space-y-1.5 pt-1">
              <div className="h-8 rounded-lg overflow-hidden flex border border-white/10">
                {scene.colors.map((c, i) => (
                  <div
                    key={i}
                    className="flex-1 h-full flex items-center justify-center text-[9px] font-mono font-bold"
                    style={{ backgroundColor: c.hex, color: c.textColor || '#FAFBFD' }}
                  >
                    {c.hex}
                  </div>
                ))}
              </div>
            </div>

            {/* Card Watermark / Colophon */}
            <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[10px] font-mono text-cinema-400">
              <span>SceneSwap · Aesthetic Discovery</span>
              <span>{scene.lightingType} Light</span>
            </div>
          </div>

          {/* Share Link Field */}
          <div className="space-y-2">
            <label className="text-xs font-mono text-cinema-400 uppercase tracking-wider block">
              Shareable Direct Link
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="flex-1 bg-cinema-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-cinema-300 font-mono focus:outline-none select-all"
              />
              <button
                onClick={handleCopyLink}
                className="px-4 py-2.5 rounded-xl bg-cinema-800 hover:bg-cinema-700 text-white text-xs font-mono uppercase tracking-wider border border-white/10 transition-colors flex items-center gap-1.5 shrink-0"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-cinema-gold" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-cinema-950/80 border-t border-white/10 flex items-center justify-end gap-3">
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-cinema-850 hover:bg-cinema-800 text-white text-xs font-mono uppercase tracking-wider border border-white/15 transition-all"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-cinema-gold" /> : <Copy className="w-3.5 h-3.5" />}
            Copy Share Link
          </button>

          {canNativeShare && (
            <button
              onClick={handleNativeShare}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-cinema-gold hover:bg-amber-400 text-cinema-950 font-bold text-xs font-mono uppercase tracking-wider transition-all shadow-md"
            >
              <Share2 className="w-3.5 h-3.5" />
              Share
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
