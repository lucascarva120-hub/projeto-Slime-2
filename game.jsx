import { useEffect, useRef, useState, useCallback } from 'react';
import GameCanvas from '../components/game/GameCanvas';
import GameHUD from '../components/game/GameHUD';
import GameOverScreen from '../components/game/GameOverScreen';
import StartScreen from '../components/game/StartScreen';

export default function Game() {
  const [gameState, setGameState] = useState('start'); // start, playing, gameover
  const [score, setScore] = useState(0);
  const [coins, setCoins] = useState(0);
  const [lives, setLives] = useState(3);
  const [activePowerUp, setActivePowerUp] = useState(null);
  const [level, setLevel] = useState(1);

  const startGame = useCallback(() => {
    setGameState('playing');
    setScore(0);
    setCoins(0);
    setLives(3);
    setActivePowerUp(null);
    setLevel(1);
  }, []);

  const handleGameOver = useCallback(() => {
    setGameState('gameover');
  }, []);

  const handleScoreUpdate = useCallback((points) => {
    setScore(prev => prev + points);
  }, []);

  const handleCoinCollect = useCallback(() => {
    setCoins(prev => prev + 1);
  }, []);

  const handleLifeLost = useCallback(() => {
    setLives(prev => {
      if (prev <= 1) {
        setTimeout(() => handleGameOver(), 100);
        return 0;
      }
      return prev - 1;
    });
  }, [handleGameOver]);

  const handlePowerUp = useCallback((type) => {
    setActivePowerUp(type);
    setTimeout(() => setActivePowerUp(null), 8000);
  }, []);

  return (
    <div className="w-full h-screen bg-gradient-to-b from-sky-400 via-sky-300 to-emerald-400 overflow-hidden relative select-none">
      {gameState === 'start' && <StartScreen onStart={startGame} />}
      
      {gameState === 'playing' && (
        <>
          <GameHUD score={score} coins={coins} lives={lives} activePowerUp={activePowerUp} level={level} />
          <GameCanvas
            onScoreUpdate={handleScoreUpdate}
            onCoinCollect={handleCoinCollect}
            onLifeLost={handleLifeLost}
            onPowerUp={handlePowerUp}
            onGameOver={handleGameOver}
            activePowerUp={activePowerUp}
            lives={lives}
            level={level}
          />
        </>
      )}

      {gameState === 'gameover' && (
        <GameOverScreen score={score} coins={coins} onRestart={startGame} />
      )}
    </div>
  );
}
