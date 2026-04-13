import { motion } from 'framer-motion';
import { RotateCcw, Coins } from 'lucide-react';

export default function GameOverScreen({ score, coins, onRestart }) {
  return (
    <motion.div
      className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="text-center"
        initial={{ scale: 0.5, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        {/* Sad Lurry */}
        <div className="mx-auto w-24 h-20 bg-gradient-to-b from-pink-400 to-pink-500 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] relative mb-6 opacity-60">
          <div className="absolute top-6 left-4 w-4 h-1.5 bg-gray-800 rounded-full transform -rotate-12" />
          <div className="absolute top-6 right-4 w-4 h-1.5 bg-gray-800 rounded-full transform rotate-12" />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-6 h-2 border-t-2 border-pink-700 rounded-t-full" />
        </div>

        <h2 className="text-5xl font-black text-red-400 mb-2">FIM DE JOGO</h2>
        <p className="text-white/60 text-lg mb-8">Lurry foi derrotado...</p>

        <div className="flex justify-center gap-8 mb-10">
          <div className="text-center">
            <p className="text-white/40 text-sm uppercase tracking-wider mb-1">Pontos</p>
            <p className="text-white text-3xl font-black">{score.toLocaleString()}</p>
          </div>
          <div className="text-center">
            <p className="text-white/40 text-sm uppercase tracking-wider mb-1">Moedas</p>
            <div className="flex items-center justify-center gap-2">
              <Coins className="w-6 h-6 text-yellow-400" />
              <p className="text-white text-3xl font-black">{coins}</p>
            </div>
          </div>
        </div>

        <motion.button
          onClick={onRestart}
          className="px-10 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-lg rounded-2xl shadow-lg shadow-pink-500/30 flex items-center gap-3 mx-auto"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <RotateCcw className="w-5 h-5" />
          TENTAR NOVAMENTE
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
