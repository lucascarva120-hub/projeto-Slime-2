import { ArrowLeft, ArrowRight, ArrowUp } from 'lucide-react';

export default function MobileControls({ keysRef }) {
  const handleTouchStart = (key) => (e) => {
    e.preventDefault();
    keysRef.current[key] = true;
  };

  const handleTouchEnd = (key) => (e) => {
    e.preventDefault();
    keysRef.current[key] = false;
  };

  return (
    <div className="absolute bottom-4 left-0 right-0 z-30 flex justify-between items-end px-4 md:hidden pointer-events-none">
      {/* D-Pad */}
      <div className="flex gap-2 pointer-events-auto">
        <button
          className="w-16 h-16 bg-black/40 backdrop-blur-sm rounded-2xl flex items-center justify-center active:bg-black/60 touch-none"
          onTouchStart={handleTouchStart('ArrowLeft')}
          onTouchEnd={handleTouchEnd('ArrowLeft')}
        >
          <ArrowLeft className="w-8 h-8 text-white/80" />
        </button>
        <button
          className="w-16 h-16 bg-black/40 backdrop-blur-sm rounded-2xl flex items-center justify-center active:bg-black/60 touch-none"
          onTouchStart={handleTouchStart('ArrowRight')}
          onTouchEnd={handleTouchEnd('ArrowRight')}
        >
          <ArrowRight className="w-8 h-8 text-white/80" />
        </button>
      </div>

      {/* Jump */}
      <button
        className="w-20 h-20 bg-pink-500/50 backdrop-blur-sm rounded-full flex items-center justify-center active:bg-pink-500/70 pointer-events-auto touch-none"
        onTouchStart={handleTouchStart(' ')}
        onTouchEnd={handleTouchEnd(' ')}
      >
        <ArrowUp className="w-10 h-10 text-white" />
      </button>
    </div>
  );
}
