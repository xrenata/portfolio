"use client"

import { useEffect, useRef } from "react"

interface Particle {
    x: number
    y: number
    vx: number
    vy: number
    alpha: number
    baseSpeed: number
    history: {x: number, y: number}[]
}

export function WindObstacleFluid() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d", { alpha: true })
        if (!ctx) return

        let animationFrameId: number;
        let width = canvas.offsetWidth;
        let height = canvas.offsetHeight;

        let offscreenCanvas: HTMLCanvasElement;
        let offscreenCtx: CanvasRenderingContext2D | null;
        let maskData: Uint8ClampedArray | null = null;
        let textCenterY = height / 2;

        const setupOffscreen = () => {
            if (!offscreenCanvas) {
                offscreenCanvas = document.createElement("canvas");
                offscreenCtx = offscreenCanvas.getContext("2d", { willReadFrequently: true });
            }
            offscreenCanvas.width = width;
            offscreenCanvas.height = height;
        };

        const resize = () => {
            width = canvas.offsetWidth;
            height = canvas.offsetHeight;
            canvas.width = width;
            canvas.height = height;
            setupOffscreen();
            updateObstacle();
        }
        window.addEventListener("resize", resize);
        
        setTimeout(resize, 100);

        const particles: Particle[] = [];
        const PARTICLE_COUNT = 700; 
        const BAND_HEIGHT = Math.min(600, typeof window !== "undefined" ? window.innerHeight : 600); 
        const TRAIL_LENGTH = 15; 

        const updateObstacle = () => {
            const h1 = document.querySelector('h1');
            if (h1 && canvasRef.current && offscreenCtx) {
                const rect = h1.getBoundingClientRect();
                const canvasRect = canvasRef.current.getBoundingClientRect();
                
                const style = window.getComputedStyle(h1);
                
                offscreenCtx.clearRect(0, 0, width, height);
                offscreenCtx.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
                (offscreenCtx as any).letterSpacing = style.letterSpacing;

                offscreenCtx.fillStyle = "black";
                offscreenCtx.textAlign = "center";
                
                offscreenCtx.textBaseline = "middle";
                const textX = rect.left - canvasRect.left + rect.width / 2;
                const textY = rect.top - canvasRect.top + rect.height / 2;
                textCenterY = textY;

                offscreenCtx.fillText(h1.innerText, textX, textY + 10);

                maskData = offscreenCtx.getImageData(0, 0, width, height).data;
            }
        };
        const obstacleInterval = setInterval(updateObstacle, 1500);

        const spawnParticle = (p?: Partial<Particle>): Particle => {
            const base = {
                x: width + Math.random() * 200, 
                y: textCenterY + (Math.random() - 0.5) * BAND_HEIGHT,
                vx: -Math.random() * 4 - 4,
                vy: 0,
                alpha: 0,
                baseSpeed: Math.random() * 4 + 7,
                history: []
            };
            return { ...base, ...p } as Particle;
        };

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push(spawnParticle({
                x: width * Math.random(), 
            }));
        }

        let time = 0;

        const isSolid = (x: number, y: number) => {
            if (!maskData || x < 0 || x >= width || y < 0 || y >= height) return false;
            const idx = (Math.floor(y) * width + Math.floor(x)) * 4 + 3;
            return maskData[idx] > 0;
        }

        const render = () => {
            if (!ctx) return;
            time += 0.01;

            ctx.clearRect(0, 0, width, height);
            ctx.lineWidth = 1.2;
            const isDark = document.documentElement.classList.contains('dark');
            const rgbColor = isDark ? '255, 255, 255' : '0, 0, 0';

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                
                p.history.push({ x: p.x, y: p.y });
                if (p.history.length > TRAIL_LENGTH) {
                    p.history.shift();
                }

                const fadeMargin = width * 0.15; 
                if (p.x > width - fadeMargin) {
                    p.alpha = (width - p.x) / fadeMargin; 
                } else if (p.x < fadeMargin) {
                    p.alpha = Math.max(0, p.x / fadeMargin); 
                } else {
                    p.alpha = 1;
                }

                let targetVx = -p.baseSpeed;
                let targetVy = 0; 
                
                targetVy += Math.sin(p.x * 0.005 + time) * 1.5;

                const predictX = p.x + p.vx;
                const predictY = p.y + p.vy;

                if (isSolid(predictX, predictY)) {
                    targetVx = -0.5 - Math.random() * 1.5;
                    
                    if (p.y < textCenterY) {
                        targetVy = -2 - Math.random() * 3.5;
                    } else {
                        targetVy = 2 + Math.random() * 3.5;
                    }

                    p.vx = targetVx;
                    p.vy = targetVy;
                    
                    p.x += targetVx;
                    p.y += targetVy;
                } else {
                    p.vx += (targetVx - p.vx) * 0.1;
                    
                    const distanceToCenter = textCenterY - p.y;
                    targetVy += distanceToCenter * 0.008;

                    p.vy += (targetVy - p.vy) * 0.1;
                }

                const currentSpeedSq = p.vx * p.vx + p.vy * p.vy;
                const maxSpeed = 25; 
                if (currentSpeedSq > maxSpeed * maxSpeed) {
                    const ratio = maxSpeed / Math.sqrt(currentSpeedSq);
                    p.vx *= ratio;
                    p.vy *= ratio;
                }

                p.x += p.vx;
                p.y += p.vy;

                if (p.history.length > 1 && p.alpha > 0.01) {
                    ctx.beginPath();
                    ctx.moveTo(p.history[0].x, p.history[0].y);
                    for (let j = 1; j < p.history.length; j++) {
                        ctx.lineTo(p.history[j].x, p.history[j].y);
                    }
                    ctx.strokeStyle = `rgba(${rgbColor}, ${p.alpha * 0.4})`;
                    ctx.stroke();
                }

                if (p.x < -50 || p.y < -100 || p.y > height + 100) {
                    Object.assign(p, spawnParticle());
                }
            }

            animationFrameId = requestAnimationFrame(render);
        }

        render();

        return () => {
            window.removeEventListener("resize", resize);
            clearInterval(obstacleInterval);
            cancelAnimationFrame(animationFrameId);
        }
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0 pointer-events-none w-full h-full"
            style={{ opacity: 0.8 }}
        />
    )
}
