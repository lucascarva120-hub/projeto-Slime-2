// ====== DRAWING FUNCTIONS ======

export function drawBackground(ctx, w, h, cameraX, groundY) {
  // Sky gradient
  const skyGrad = ctx.createLinearGradient(0, 0, 0, h);
  skyGrad.addColorStop(0, '#87CEEB');
  skyGrad.addColorStop(0.5, '#B0E0FF');
  skyGrad.addColorStop(0.8, '#E0F4FF');
  skyGrad.addColorStop(1, '#90EE90');
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, w, h);

  // Clouds (parallax)
  ctx.fillStyle = 'rgba(255,255,255,0.7)';
  const clouds = [
    { x: 100, y: 60, s: 1.2 },
    { x: 400, y: 90, s: 0.8 },
    { x: 700, y: 50, s: 1 },
    { x: 1100, y: 80, s: 1.3 },
    { x: 1500, y: 45, s: 0.9 },
    { x: 2000, y: 70, s: 1.1 },
    { x: 2500, y: 55, s: 0.7 },
    { x: 3200, y: 85, s: 1 },
  ];
  clouds.forEach(c => {
    const cx = (c.x - cameraX * 0.3) % (w + 400) - 100;
    drawCloud(ctx, cx, c.y, c.s);
  });

  // Mountains (parallax)
  ctx.fillStyle = '#a7d5a0';
  for (let i = 0; i < 10; i++) {
    const mx = i * 300 - (cameraX * 0.15) % 3000;
    drawMountain(ctx, mx, groundY + 10, 200 + (i % 3) * 50, 120 + (i % 2) * 40);
  }

  // Trees (parallax)
  for (let i = 0; i < 20; i++) {
    const tx = i * 200 - (cameraX * 0.4) % 4000;
    drawTree(ctx, tx, groundY, 30 + (i % 3) * 10);
  }
}

f
