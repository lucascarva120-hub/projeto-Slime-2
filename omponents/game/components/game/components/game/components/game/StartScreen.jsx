import { motion } from 'framer-motion';

export default function StartScreen({ onStart }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center z-50 bg-gradient-to-b from-indigo-900 via-purple-900 to-indigo-950">
      {/* Stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 1 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
          />
        ))}
      </div>

      {/* Lurry Character */}
      <motion.div
        className="relative mb-6"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-32 h-28 bg-gradient-to-b from-pink-400 to-pink-500 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] relative shadow-lg shadow-pink-500/40">
          {/* Eyes */}
          <div className="absolute top-8 left-7 w-5 h-6 bg-white rounded-full flex items-center justify-center">
            <div className="w-3 h-3.5 bg-gray-800 rounded-full relative top-0.5">
              <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 bg-white rounded-full" />
            </div>
          </div>
          <div className="absolute top-8 right-7 w-5 h-6 bg-white rounded-full flex items-center justify-center">
            <div className="w-3 h-3.5 bg-gray-800 rounded-full relative top-0.5">
              <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 bg-white rounded-full" />
            </div>
          </div>
          {/* Mouth */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-8 h-3 border-b-2 border-pink-700 rounded-b-full" />
          {/* Cheeks */}
          <div className="absolute top-14 left-3 w-4 h-2.5 bg-pink-300 rounded-full opacity-70" />
          <div className="absolute top-14 right-3 w-4 h-2.5 bg-pink-300 rounded-full opacity-70" />
        </div>
      </motion.div>

      {/* Title */}
      <motion.h1
        className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-300 to-pink-400 mb-2 tracking-tight"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        style={{ textShadow: '0 0 40px rgba(236, 72, 153, 0.3)' }}
      >
        LURRY
      </motion.h1>

      <motion.p
        className="text-pink-200/80 text-lg mb-10 tracking-widest uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Slime Adventure
      </motion.p>

      {/* Play Button */}
      <motion.button
        onClick={onStart}
        className="px-12 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-xl rounded-2xl shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 transition-shadow"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        ▶ JOGAR
      </motion.button>

      {/* Controls Info */}
      <motion.div
        className="mt-8 flex gap-6 text-pink-200/60 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <span>← → Mover</span>
        <span>ESPAÇO Pular</span>
        <span>📱 Toque para controlar</span>
      </motion.div>
    </div>
  );
}
