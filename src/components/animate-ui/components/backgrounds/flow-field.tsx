'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

type FlowFieldProps = {
  particleCount?: number;
  speed?: number;
  fieldScale?: number;
  lineWidth?: number;
  trailFade?: number;
  mouseRadius?: number;
  mouseStrength?: number;
} & React.ComponentProps<'div'>;

type Particle = {
  x: number;
  y: number;
  px: number;
  py: number;
  life: number;
  maxLife: number;
  speed: number;
};

function FlowFieldBackground({
  particleCount = 700,
  speed = 1.6,
  fieldScale = 0.0022,
  lineWidth = 1,
  trailFade = 0.06,
  mouseRadius = 160,
  mouseStrength = 2.2,
  className,
  ...props
}: FlowFieldProps) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const animRef = React.useRef<number | null>(null);
  const particlesRef = React.useRef<Particle[]>([]);
  const mouseRef = React.useRef<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });
  const timeRef = React.useRef(0);
  const dprRef = React.useRef(1);
  const sizeRef = React.useRef({ width: 800, height: 600 });
  const colorsRef = React.useRef({ particle: '255,255,255', fade: '10,10,10' });

  const readColors = React.useCallback(() => {
    const isDark = document.documentElement.classList.contains('dark');
    colorsRef.current = isDark
      ? { particle: '255,255,255', fade: '10,10,10' }
      : { particle: '20,20,20', fade: '255,255,255' };
  }, []);

  const spawn = React.useCallback((w: number, h: number): Particle => {
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      px: 0,
      py: 0,
      life: 0,
      maxLife: 120 + Math.random() * 260,
      speed: 0.6 + Math.random() * 0.8,
    };
  }, []);

  const initParticles = React.useCallback(
    (w: number, h: number) => {
      const count = Math.min(
        particleCount,
        Math.round((w * h) / 1600),
      );
      particlesRef.current = Array.from({ length: count }).map(() => {
        const p = spawn(w, h);
        p.px = p.x;
        p.py = p.y;
        p.life = Math.random() * p.maxLife;
        return p;
      });
    },
    [particleCount, spawn],
  );

  const resize = React.useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const rect = container.getBoundingClientRect();
    const dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));
    dprRef.current = dpr;
    canvas.width = Math.max(1, Math.floor(rect.width * dpr));
    canvas.height = Math.max(1, Math.floor(rect.height * dpr));
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    sizeRef.current = { width: rect.width, height: rect.height };
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    initParticles(rect.width, rect.height);
    readColors();
  }, [initParticles, readColors]);

  const fieldAngle = React.useCallback(
    (x: number, y: number, t: number) => {
      const s = fieldScale;
      const wave =
        Math.sin(y * s * 2.2 + t * 0.3) * 0.55 +
        Math.sin(x * s + t * 0.18) * 0.3 +
        Math.cos((x + y) * s * 0.7 - t * 0.12) * 0.3;
      return Math.PI + wave;
    },
    [fieldScale],
  );

  const step = React.useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width: w, height: h } = sizeRef.current;
    const dpr = dprRef.current;
    const t = (timeRef.current += 0.016);
    const mouse = mouseRef.current;
    const { particle, fade } = colorsRef.current;

    ctx.fillStyle = `rgba(${fade}, ${trailFade})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.lineWidth = lineWidth * dpr;
    ctx.lineCap = 'round';
    ctx.strokeStyle = `rgba(${particle}, 0.8)`;
    ctx.beginPath();

    for (const p of particlesRef.current) {
      p.px = p.x;
      p.py = p.y;

      let angle = fieldAngle(p.x, p.y, t);

      if (mouse.active) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < mouseRadius && dist > 0.001) {
          const force = (mouseRadius - dist) / mouseRadius;
          const swirl = Math.atan2(dy, dx) + Math.PI * 0.5;
          angle = angle * (1 - force) + swirl * force;
          p.x += (dx / dist) * force * mouseStrength;
          p.y += (dy / dist) * force * mouseStrength;
        }
      }

      p.x += Math.cos(angle) * speed * p.speed;
      p.y += Math.sin(angle) * speed * p.speed;
      p.life++;

      if (p.x < -5 || p.x > w + 5 || p.y < -5 || p.y > h + 5) {
        const n = spawn(w, h);
        p.x = w + Math.random() * 40;
        p.y = Math.random() * h;
        p.px = p.x;
        p.py = p.y;
        p.life = 0;
        p.maxLife = n.maxLife;
        p.speed = n.speed;
        continue;
      }

      ctx.moveTo(p.px * dpr, p.py * dpr);
      ctx.lineTo(p.x * dpr, p.y * dpr);
    }

    ctx.stroke();

    animRef.current = requestAnimationFrame(step);
  }, [
    fieldAngle,
    lineWidth,
    trailFade,
    speed,
    spawn,
    mouseRadius,
    mouseStrength,
  ]);

  const handleMove = React.useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const point = 'touches' in e ? e.touches[0] : e;
      if (!point) return;
      mouseRef.current = {
        x: point.clientX - rect.left,
        y: point.clientY - rect.top,
        active: true,
      };
    },
    [],
  );

  const handleLeave = React.useCallback(() => {
    mouseRef.current.active = false;
  }, []);

  React.useEffect(() => {
    resize();
    const container = containerRef.current;
    const ro =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(resize)
        : null;
    if (container && ro) ro.observe(container);
    const onResize = () => resize();
    window.addEventListener('resize', onResize);

    const mo = new MutationObserver(readColors);
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => {
      window.removeEventListener('resize', onResize);
      if (ro && container) ro.disconnect();
      mo.disconnect();
    };
  }, [resize, readColors]);

  React.useEffect(() => {
    animRef.current = requestAnimationFrame(step);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      animRef.current = null;
    };
  }, [step]);

  return (
    <div
      ref={containerRef}
      data-slot="flow-field-background"
      className={cn('relative size-full overflow-hidden', className)}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onTouchMove={handleMove}
      onTouchEnd={handleLeave}
      {...props}
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}

export { FlowFieldBackground, type FlowFieldProps };
