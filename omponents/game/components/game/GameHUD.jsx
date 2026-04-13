import { Heart, Coins, Zap, Shield, ArrowUp } from 'lucide-react';

export default function GameHUD({ score, coins, lives, activePowerUp, level }) {
  const powerUpIcons = {
    speed: { icon: Zap, color: 'text-yellow-400', label: 'Velocidade' },
    jump: { icon: ArrowUp, color: 'text-cyan-400', label: 'Super Pulo' },
    shield: { icon: Shield, color: 'text-blue-400', label: 'Escudo' },
  };

  const pu = activePowerUp ? powerUpIcons[activePowerUp] : null;

  return (
    <div className="absolute top-0 left-0 right-0 z-40 p-3 md:p-4 flex items-center justify-between pointer-events-none">
      {/* Left: Lives & Score */}
      <div className="flex items-center gap-4">
        <div className="flex gap-1">
          {Array.from({ length: 3 }).map((_, i) => (
            <Heart
              key={i}
              className={`w-6 h-6 ${i < lives ? 'text-red-500 fill-red-500' : 'text-red-900/30'}`}
            />
          ))}
        </div>
        <div className="bg-black/40 backdrop-blur-sm rounded-full px-4 py-1.5 text-white font-bold text-sm">
          {score.toLocaleString()}
        </div>
      </div>

      {/* Center: Level */}
      <div className="bg-black/40 backdrop-blur-sm rounded-full px-4 py-1.5 text-white font-bold text-sm">
        Nível {level}
      </div>

      {/* Right: Coins & Power-up */}
      <div className="flex items-center gap-3">
        {pu && (
          <div className={`flex items-center gap-1 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1.5 animate-pulse`}>
            <pu.icon className={`w-4 h-4 ${pu.color}`} />
            <span className="text-white text-xs font-bold">{pu.label}</span>
          </div>
        )}
        <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-sm rounded-full px-4 py-1.5">
          <Coins className="w-4 h-4 text-yellow-400" />
          <span className="text-white font-bold text-sm">{coins}</span>
        </div>
      </div>
    </div>
  );
}
