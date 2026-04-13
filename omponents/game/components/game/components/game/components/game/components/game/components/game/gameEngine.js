// ====== CONSTANTS ======
const GRAVITY = 0.6;
const PLAYER_SPEED = 4;
const JUMP_FORCE = -13;
const TILE = 40;

// ====== LEVEL GENERATION ======
export function generateLevel(canvasW, canvasH) {
  const groundY = canvasH - TILE;
  const platforms = [];
  const enemies = [];
  const chests = [];

  // Ground
  const groundSegments = [
    { x: 0, w: canvasW * 0.35 },
    { x: canvasW * 0.4, w: canvasW * 0.25 },
    { x: canvasW * 0.7, w: canvasW * 0.6 },
    { x: canvasW * 1.4, w: canvasW * 0.5 },
    { x: canvasW * 2.0, w: canvasW * 0.7 },
    { x: canvasW * 2.8, w: canvasW * 0.5 },
    { x: canvasW * 3.4, w: canvasW * 1.0 },
  ];

  groundSegments.forEach(seg => {
    platforms.push({ x: seg.x, y: groundY, w: seg.w, h: TILE, type: 'ground' });
  });

  // Floating platforms
  const floatingPlatforms = [
    { x: 200, y: groundY - 120, w: 140 },
    { x: 420, y: groundY - 200, w: 100 },
    { x: 650, y: groundY - 150, w: 160 },
    { x: 900, y: groundY - 100, w: 120 },
    { x: 1100, y: groundY - 180, w: 100 },
    { x: 1350, y: groundY - 130, w: 140 },
    { x: 1600, y: groundY - 200, w: 120 },
    { x: 1850, y: groundY - 100, w: 160 },
    { x: 2100, y: groundY - 170, w: 100 },
    { x: 2350, y: groundY - 120, w: 140 },
    { x: 2600, y: groundY - 190, w: 120 },
    { x: 2900, y: groundY - 140, w: 160 },
    { x: 3200, y: groundY - 110, w: 120 },
 
