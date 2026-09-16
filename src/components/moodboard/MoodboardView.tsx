import React, { useState, useEffect } from 'react';
import { Scene, MoodboardItem } from '../../types/scene';
import { LayoutGrid, RotateCcw, Plus, X, ArrowLeft, ArrowRight, Move, Sparkles, Pin } from 'lucide-react';

interface MoodboardViewProps {
  scene: Scene;
  onToast: (msg: string) => void;
}

export const MoodboardView: React.FC<MoodboardViewProps> = ({ scene, onToast }) => {
  // Generate initial moodboard cards from scene data
  const generateInitialCards = (s: Scene): MoodboardItem[] => [
    {
      id: 'palette',
      title: 'Harmonic Palette',
      category: 'color',
      data: s.colors,
      description: 'Primary, secondary, and atmospheric color anchors.',
    },
    {
      id: 'hero-visual',
      title: 'Key Visual Frame',
      category: 'image',
      imageUrl: s.heroImage,
      description: s.tagline,
      customWidth: 'wide',
    },
    {
      id: 'typography',
      title: 'Type Specimen',
      category: 'typography',
      data: s.typography,
      description: `${s.typography.displayFont} + ${s.typography.bodyFont}`,
    },
    {
      id: 'interior-ref',
      title: 'Spatial Architecture',
      category: 'interior',
      imageUrl: s.interior.visualTiles[0]?.url || s.heroImage,
      description: s.interior.architecture,
    },
    {
      id: 'lighting',
      title: 'Volumetric Light',
      category: 'lighting',
      data: s.lighting,
      description: `${s.lighting.source} (${s.lighting.colorTemperature})`,
    },
    {
      id: 'outfit-ref',
      title: 'Sartorial Form',
      category: 'outfit',
      imageUrl: s.outfit.visualTiles[0]?.url || s.heroImage,
      description: s.outfit.silhouette,
    },
    {
      id: 'keywords',
      title: 'Mood Matrix',
      category: 'quote',
      data: s.keywords,
      description: `Era: ${s.era} · Environment: ${s.environmentType}`,
    },
  ];

  const [cards, setCards] = useState<MoodboardItem[]>(() => generateInitialCards(scene));
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [boardLayout, setBoardLayout] = useState<'grid' | 'pinboard'>('pinboard');

  // Sync if scene changes
  useEffect(() => {
    setCards(generateInitialCards(scene));
  }, [scene.id]);

  const handleReset = () => {
    setCards(generateInitialCards(scene));
    onToast('Moodboard reset to original curation.');
  };

  const handleRemove = (id: string) => {
    setCards((prev) => prev.filter((c) => c.id !== id));
    onToast('Item removed from moodboard.');
  };

  const handleMove = (index: number, direction: 'left' | 'right') => {
    const targetIndex = direction === 'left' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= cards.length) return;

    setCards((prev) => {
      const copy = [...prev];
      const temp = copy[index];
      copy[index] = copy[targetIndex];
      copy[targetIndex] = temp;
      return copy;
    });
  };

  // Drag & Drop for Desktop
  const onDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const onDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    setCards((prev) => {
      const copy = [...prev];
      const item = copy.splice(draggedIndex, 1)[0];
      copy.splice(index, 0, item);
      return copy;
    });
    setDraggedIndex(index);
  };

  const onDragEnd = () => {
    setDraggedIndex(null);
  };

  // Available references to re-add
  const availableExtras = [
    {
      id: `extra-env-${Date.now()}`,
      title: 'Atmospheric Setting',
      category: 'environment' as const,
      description: scene.environment.weather,
      imageUrl: scene.visualReferences[0]?.url || scene.heroImage,
    },
    {
      id: `extra-sound-${Date.now()}`,
      title: 'Soundscape Notes',
      category: 'quote' as const,
      description: `${scene.music.genre} (${scene.music.bpmRange}) - ${scene.music.instruments}`,
    },
    {
      id: `extra-quote-${Date.now()}`,
      title: 'Cinematic Logline',
      category: 'quote' as const,
      description: `“${scene.description}”`,
    },
  ];

  const handleAddCard = (item: MoodboardItem) => {
    setCards((prev) => [...prev, item]);
    setShowAddModal(false);
    onToast(`Added "${item.title}" to moodboard.`);
  };

  return (
    <div className="space-y-6 pt-6">
      {/* Moodboard Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-cinema-900/60 border border-white/10">
        <div>
          <div className="flex items-center gap-2 text-cinema-gold text-xs font-mono uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            Designer's Atelier
          </div>
          <h3 className="font-cinematic text-xl font-bold text-white tracking-wide">
            Interactive Visual Moodboard
          </h3>
          <p className="text-xs text-cinema-400 font-light mt-0.5">
            Rearrange, curate, or customize reference cards for this aesthetic.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Layout Toggle */}
          <div className="flex items-center bg-cinema-850 p-1 rounded-xl border border-white/10">
            <button
              onClick={() => setBoardLayout('pinboard')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                boardLayout === 'pinboard'
                  ? 'bg-cinema-800 text-cinema-gold font-bold shadow'
                  : 'text-cinema-400 hover:text-white'
              }`}
            >
              <Pin className="w-3.5 h-3.5" />
              Pinboard
            </button>
            <button
              onClick={() => setBoardLayout('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                boardLayout === 'grid'
                  ? 'bg-cinema-800 text-cinema-gold font-bold shadow'
                  : 'text-cinema-400 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              Editorial Grid
            </button>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono bg-cinema-800 hover:bg-cinema-700 text-white border border-white/10 transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-cinema-neon" />
            Add Reference
          </button>

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono text-cinema-400 hover:text-white hover:bg-cinema-800 border border-white/10 transition-colors"
            title="Reset to default moodboard"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>
      </div>

      {/* Moodboard Cards Board */}
      <div
        className={`transition-all duration-300 ${
          boardLayout === 'pinboard'
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 sm:p-8 rounded-3xl bg-[#0B0C10] border border-white/10 shadow-inner'
            : 'grid grid-cols-1 md:grid-cols-3 gap-5'
        }`}
      >
        {cards.map((card, idx) => (
          <div
            key={card.id}
            draggable
            onDragStart={() => onDragStart(idx)}
            onDragOver={(e) => onDragOver(e, idx)}
            onDragEnd={onDragEnd}
            className={`group relative rounded-2xl overflow-hidden bg-cinema-900/90 border border-white/10 hover:border-cinema-gold/50 shadow-xl transition-all duration-300 flex flex-col justify-between ${
              card.customWidth === 'wide' ? 'md:col-span-2' : ''
            } ${
              boardLayout === 'pinboard'
                ? idx % 2 === 0
                  ? 'hover:rotate-0 rotate-[-0.5deg]'
                  : 'hover:rotate-0 rotate-[0.5deg]'
                : ''
            }`}
          >
            {/* Top Tape Accent on Pinboard */}
            {boardLayout === 'pinboard' && (
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-4 bg-cinema-gold/30 backdrop-blur-md rounded-sm border border-cinema-gold/40 z-20 pointer-events-none shadow" />
            )}

            {/* Card Action Controls */}
            <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-20 bg-black/70 backdrop-blur-md p-1 rounded-lg border border-white/10">
              <button
                onClick={() => handleMove(idx, 'left')}
                disabled={idx === 0}
                className="p-1 text-cinema-300 hover:text-white disabled:opacity-30"
                title="Move Left / Up"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleMove(idx, 'right')}
                disabled={idx === cards.length - 1}
                className="p-1 text-cinema-300 hover:text-white disabled:opacity-30"
                title="Move Right / Down"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleRemove(card.id)}
                className="p-1 text-cinema-rose hover:text-white hover:bg-cinema-rose/40 rounded transition-colors"
                title="Remove Card"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Content Based on Card Type */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between text-[11px] font-mono text-cinema-400 uppercase tracking-wider">
                <span>{card.title}</span>
                <span className="cursor-grab active:cursor-grabbing text-cinema-500 hover:text-cinema-gold">
                  <Move className="w-3.5 h-3.5" />
                </span>
              </div>

              {/* Palette Card */}
              {card.category === 'color' && (
                <div className="space-y-3">
                  <div className="h-14 rounded-xl overflow-hidden flex border border-white/10 shadow">
                    {scene.colors.map((c, i) => (
                      <div
                        key={i}
                        className="flex-1 h-full"
                        style={{ backgroundColor: c.hex }}
                        title={`${c.name}: ${c.hex}`}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-cinema-400">
                    <span>{scene.colors[0]?.name}</span>
                    <span>{scene.colors[1]?.name}</span>
                  </div>
                </div>
              )}

              {/* Image Card */}
              {(card.category === 'image' || card.imageUrl) && (
                <div className="aspect-[16/10] rounded-xl overflow-hidden bg-cinema-950 border border-white/5 relative">
                  <img
                    src={card.imageUrl}
                    alt={card.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cinema-950/70 via-transparent to-transparent" />
                </div>
              )}

              {/* Typography Specimen Card */}
              {card.category === 'typography' && (
                <div className="p-4 rounded-xl bg-cinema-950 border border-white/5 space-y-2">
                  <div
                    className="text-white text-lg font-bold tracking-wide"
                    style={{ fontFamily: scene.typography.displayFontFamily }}
                  >
                    {scene.title.toUpperCase()}
                  </div>
                  <div
                    className="text-cinema-300 text-xs line-clamp-2"
                    style={{ fontFamily: scene.typography.bodyFontFamily }}
                  >
                    {scene.typography.exampleBody}
                  </div>
                </div>
              )}

              {/* Lighting Spec Card */}
              {card.category === 'lighting' && (
                <div
                  className="p-4 rounded-xl border border-white/10 relative overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${scene.lighting.ambientHex1}20 0%, ${scene.lighting.ambientHex2}20 100%)`,
                  }}
                >
                  <div className="text-xs font-cinematic font-bold text-white">
                    {scene.lighting.source}
                  </div>
                  <div className="text-[11px] font-mono text-cinema-300 mt-1">
                    {scene.lighting.colorTemperature}
                  </div>
                </div>
              )}

              {/* Quotes / Keywords Card */}
              {card.category === 'quote' && (
                <div className="p-4 rounded-xl bg-cinema-950/60 border border-white/5 space-y-2">
                  <div className="flex flex-wrap gap-1.5">
                    {scene.keywords.map((kw, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-cinema-800 text-cinema-300 border border-white/5"
                      >
                        #{kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <p className="text-xs text-cinema-300 font-light line-clamp-2">
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Add Reference Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-cinema-900 border border-white/15 rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h4 className="font-cinematic text-lg font-bold text-white">
                Add Scene Asset to Moodboard
              </h4>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 text-cinema-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              {availableExtras.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleAddCard(item)}
                  className="p-3.5 rounded-xl bg-cinema-850 hover:bg-cinema-800 border border-white/10 hover:border-cinema-gold/40 transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div className="space-y-0.5">
                    <span className="font-cinematic text-sm font-bold text-white group-hover:text-cinema-gold transition-colors block">
                      {item.title}
                    </span>
                    <p className="text-xs text-cinema-400 font-light line-clamp-1">
                      {item.description}
                    </p>
                  </div>
                  <Plus className="w-4 h-4 text-cinema-gold group-hover:scale-125 transition-transform" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
