import { useEffect, useRef, useCallback } from 'react';
import MobileControls from './MobileControls';
import { generateLevel, createPlayer, updateGame } from './gameEngine';
import {
  drawBackground, drawPlatforms, drawPlayer,
  drawEnemies, drawChests, drawDrops, drawParticles
} from './gameRenderer';

export default function GameCanvas({
  onScoreUpdate, onCoinCollect, onLifeLost, onPowerUp, onGameOver, activePowerUp, lives
}) {
  const canvasRef = useRef(null);
  const keysRef = useRef({});
  const gameRef = useRef(null);
  const frameRef = useRef(0);
  const animRef = useRef(null);

  const initGame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const w = canvas.width;
    const h = canvas.height;
    const level = generateLevel(w, h);
    const player = createPlayer(level.groundY);

    gameRef.current = {
      player,
      platforms: level.platforms,
      enemies: level.enemies,
      chests: level.chests,
      drops: [],
      particles: [],
      groundY: level.groundY,
      cameraX: 0,
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (!gameRef.current) initGame();
    };
    resize();
    window.addEventListener('resize', resize);

    const handleKeyDown = (e) => {
      if ([' ', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
      }
      keysRef.current[e.key] = true;
    };
    const handleKeyUp = (e) => { keysRef.current[e.key] = false; };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [initGame]);

  useEffect(() => {
    if (!gameRef.current) initGame();

    const callbacks = {
      onScoreUpdate,
      onCoinCollect,
      onLifeLost,
      onPowerUp,
      onPowerUpEnd: () => onPowerUp(null),
    };

    const gameLoop = () => {
      const canvas = canvasRef.current;
      if (!canvas || !gameRef.current) return;
      const ctx = canvas.getContext('2d');
      const state = gameRef.current;
      frameRef.current++;

      // Update
      updateGame(state, keysRef.current, callbacks, activePowerUp);

      // Camera follow
      const targetCamX = state.player.x - canvas.width * 0.35;
      state.cameraX += (targetCamX - state.cameraX) * 0.08;
      if (state.cameraX < 0) state.cameraX = 0;

      // Clear & draw
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawBackground(ctx, canvas.width, canvas.height, state.cameraX, state.groundY);
      drawPlatforms(ctx, state.platforms, state.cameraX);
      drawChests(ctx, state.chests, state.cameraX, frameRef.current);
      drawDrops(ctx, state.drops, state.cameraX, frameRef.current);
      drawEnemies(ctx, state.enemies, state.cameraX, frameRef.current);
      drawPlayer(ctx, state.player, state.cameraX, frameRef.current);
      drawParticles(ctx, state.particles, state.cameraX);

      animRef.current = requestAnimationFrame(gameLoop);
    };

    animRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [activePowerUp, initGame, onScoreUpdate, onCoinCollect, onLifeLost, onPowerUp]);

  // Reset game when lives reset (new game)
  useEffect(() => {
    if (lives === 3) {
      initGame();
    }
  }, [lives, initGame]);

  return (
    <>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <MobileControls keysRef={keysRef} />
    </>
  );
}
