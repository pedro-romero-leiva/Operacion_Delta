"use client";

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

// --- Canvas Helper Functions ---
const drawAxes = (ctx: CanvasRenderingContext2D, width: number, height: number, xRange: [number, number], yRange: [number, number]) => {
    ctx.strokeStyle = 'hsl(var(--muted-foreground))';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.stroke();
};

const mapCoords = (x: number, y: number, width: number, height: number, xRange: [number, number], yRange: [number, number]): [number, number] => {
    const xScale = width / (xRange[1] - xRange[0]);
    const yScale = height / (yRange[1] - yRange[0]);
    const x_canvas = (x - xRange[0]) * xScale;
    const y_canvas = height - (y - yRange[0]) * yScale;
    return [x_canvas, y_canvas];
};

// --- Slope Animation (Mission 1) ---
export const SlopeAnimation = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const width = canvas.width;
        const height = canvas.height;
        const xRange: [number, number] = [-1, 5];
        const yRange: [number, number] = [-2, 14];
        
        const style = getComputedStyle(canvas);
        const primaryColor = style.getPropertyValue('--primary');
        const accentColor = style.getPropertyValue('--chart-2');
        const destructiveColor = style.getPropertyValue('--chart-4');
        const foregroundColor = style.getPropertyValue('--foreground');

        const B = { x: 1, y: 3 };
        const D = { x: 3, y: 9 };

        const [Bx, By] = mapCoords(B.x, B.y, width, height, xRange, yRange);
        const [Dx, Dy] = mapCoords(D.x, D.y, width, height, xRange, yRange);
        const [x_intersect, y_intersect] = mapCoords(D.x, B.y, width, height, xRange, yRange);

        let step = 0;
        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            
            // Draw function f(t) = 3t
            ctx.strokeStyle = `hsl(${primaryColor})`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            const [startX, startY] = mapCoords(0, 0, width, height, xRange, yRange);
            const [endX, endY] = mapCoords(4, 12, width, height, xRange, yRange);
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.stroke();
            
            // Draw points B and D
            ctx.fillStyle = `hsl(${foregroundColor})`;
            ctx.strokeStyle = `hsl(${primaryColor})`;
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(Bx, By, 5, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(Dx, Dy, 5, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();

            // Animate lines
            ctx.setLineDash([5, 5]);
            
            // Vertical line (Δh)
            const vProgress = Math.min(1, step / 100);
            ctx.strokeStyle = `hsl(${accentColor})`;
            ctx.beginPath();
            ctx.moveTo(x_intersect, y_intersect);
            ctx.lineTo(x_intersect, y_intersect - (y_intersect-Dy) * vProgress);
            ctx.stroke();

            // Horizontal line (Δt)
            const hProgress = Math.min(1, Math.max(0, step-50) / 100);
            ctx.strokeStyle = `hsl(${destructiveColor})`;
            ctx.beginPath();
            ctx.moveTo(Bx, By);
            ctx.lineTo(Bx + (x_intersect-Bx)*hProgress, By);
            ctx.stroke();

            ctx.setLineDash([]);
            
            // Add text
            ctx.font = '14px "Source Code Pro"';
            if (vProgress === 1) {
                ctx.fillStyle = `hsl(${accentColor})`;
                ctx.fillText('Δh = 6', x_intersect + 10, Dy + (By - Dy)/2);
            }
            if(hProgress === 1){
                ctx.fillStyle = `hsl(${destructiveColor})`;
                ctx.fillText('Δt = 2', Bx + (Dx - Bx)/2 - 10, By + 20);
            }

            if(step > 200) {
                 ctx.fillStyle = `hsl(${primaryColor})`;
                 ctx.font = 'bold 16px "Source Code Pro"';
                 ctx.fillText('Δh/Δt = 3 m/s', width/2 - 50, 20);
            }

            step += 2;
            if (step < 300) requestAnimationFrame(animate);
        };
        animate();
    }, []);

    return <div className="p-4 bg-muted/30 rounded-lg"><canvas ref={canvasRef} width="600" height="300" className="bg-card/50 rounded-md w-full" /></div>;
};


// --- Average Animation (Mission 2) ---
export const AverageAnimation = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [showAvg, setShowAvg] = useState(0);

    const points = [{x:0,y:0}, {x:1,y:8}, {x:2,y:12}, {x:3,y:12}, {x:4,y:8}, {x:5,y:0}];

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        const width = canvas.width;
        const height = canvas.height;
        const xRange: [number, number] = [-0.5, 5.5];
        const yRange: [number, number] = [-2, 14];
        
        const style = getComputedStyle(canvas);
        const primaryColor = `hsl(${style.getPropertyValue('--primary')})`;
        const foregroundColor = `hsl(${style.getPropertyValue('--foreground')})`;
        const mutedColor = `hsl(${style.getPropertyValue('--muted-foreground')})`;
        const accentColor = `hsl(${style.getPropertyValue('--chart-1')})`;
        const chart2Color = `hsl(${style.getPropertyValue('--chart-2')})`;
        const chart4Color = `hsl(${style.getPropertyValue('--chart-4')})`;


        ctx.clearRect(0, 0, width, height);

        // Draw zigzag
        ctx.strokeStyle = mutedColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        points.forEach((p, i) => {
            const [px, py] = mapCoords(p.x, p.y, width, height, xRange, yRange);
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
        });
        ctx.stroke();

        // Draw points
        ctx.fillStyle = foregroundColor;
        ctx.strokeStyle = primaryColor;
        ctx.lineWidth = 3;
        points.forEach(p => {
            const [px, py] = mapCoords(p.x, p.y, width, height, xRange, yRange);
            ctx.beginPath();
            ctx.arc(px, py, 4, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();
        });

        const drawSecant = (p1_idx: number, p2_idx: number, color: string, label: string) => {
            const p1 = points[p1_idx];
            const p2 = points[p2_idx];
            const [p1x, p1y] = mapCoords(p1.x, p1.y, width, height, xRange, yRange);
            const [p2x, p2y] = mapCoords(p2.x, p2.y, width, height, xRange, yRange);
            ctx.strokeStyle = color;
            ctx.lineWidth = 3;
            ctx.setLineDash([8, 8]);
            ctx.beginPath();
            ctx.moveTo(p1x, p1y);
            ctx.lineTo(p2x, p2y);
            ctx.stroke();
            ctx.setLineDash([]);
            ctx.fillStyle = color;
            ctx.font = 'bold 14px "Source Code Pro"';
            ctx.fillText(label, (p1x+p2x)/2, (p1y+p2y)/2 - 10);
        }

        if(showAvg >= 1) drawSecant(0, 2, accentColor, 'Promedio 1 (A→C)');
        if(showAvg >= 2) drawSecant(2, 5, chart2Color, 'Promedio 2 (C→F)');
        if(showAvg >= 3) drawSecant(0, 5, chart4Color, 'Promedio 3 (A→F)');
        
    }, [showAvg, points]);

    return (
        <div className="flex flex-col items-center p-4 bg-muted/30 rounded-lg">
            <canvas ref={canvasRef} width="600" height="300" className="bg-card/50 rounded-md w-full" />
            <div className="flex flex-wrap gap-2 mt-4">
                <Button variant={showAvg >= 1 ? "default" : "outline"} onClick={() => setShowAvg(1)}>Promedio 1</Button>
                <Button variant={showAvg >= 2 ? "default" : "outline"} onClick={() => setShowAvg(2)} disabled={showAvg < 1}>Promedio 2</Button>
                <Button variant={showAvg >= 3 ? "default" : "outline"} onClick={() => setShowAvg(3)} disabled={showAvg < 2}>Promedio 3</Button>
                <Button variant="ghost" onClick={() => setShowAvg(0)}>Limpiar</Button>
            </div>
        </div>
    );
};


// --- Secant to Tangent Animation (Mission 4) ---
export const SecantToTangentAnimation = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [delta, setDelta] = useState(2);
    const [a, setA] = useState(1);

    const h = (t: number) => -5 * t * t + 20 * t;
    const h_prime = (t: number) => -10 * t + 20;

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        const width = canvas.width;
        const height = canvas.height;
        const xRange: [number, number] = [-0.5, 4.5];
        const yRange: [number, number] = [-5, 25];

        const style = getComputedStyle(canvas);
        const primaryColor = `hsl(${style.getPropertyValue('--primary')})`;
        const foregroundColor = `hsl(${style.getPropertyValue('--foreground')})`;
        const mutedColor = `hsl(${style.getPropertyValue('--muted-foreground')})`;
        const accentColor = `hsl(${style.getPropertyValue('--chart-2')})`;


        ctx.clearRect(0, 0, width, height);

        // Draw parabola h(t)
        ctx.strokeStyle = mutedColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let t_val = 0; t_val <= 4; t_val += 0.05) {
            const [x, y] = mapCoords(t_val, h(t_val), width, height, xRange, yRange);
            if (t_val === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.stroke();

        const P1 = { x: a, y: h(a) };
        const P2 = { x: a + delta, y: h(a + delta) };

        // Draw Tangent line
        ctx.strokeStyle = primaryColor;
        ctx.lineWidth = 2;
        const tan_slope = h_prime(a);
        const tan_y_intercept = P1.y - tan_slope * P1.x;
        const [tan_startX, tan_startY] = mapCoords(-1, tan_slope * -1 + tan_y_intercept, width, height, xRange, yRange);
        const [tan_endX, tan_endY] = mapCoords(5, tan_slope * 5 + tan_y_intercept, width, height, xRange, yRange);
        ctx.beginPath();
        ctx.moveTo(tan_startX, tan_startY);
        ctx.lineTo(tan_endX, tan_endY);
        ctx.stroke();

        // Draw Secant line
        ctx.strokeStyle = accentColor;
        ctx.lineWidth = 2;
        ctx.setLineDash([8, 4]);
        const sec_slope = (P2.y - P1.y) / delta;
        const sec_y_intercept = P1.y - sec_slope * P1.x;
        const [sec_startX, sec_startY] = mapCoords(-1, sec_y_intercept - sec_slope, width, height, xRange, yRange);
        const [sec_endX, sec_endY] = mapCoords(5, sec_slope * 5 + sec_y_intercept, width, height, xRange, yRange);
        ctx.beginPath();
        ctx.moveTo(sec_startX, sec_startY);
        ctx.lineTo(sec_endX, sec_endY);
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Draw points
        const [P1x, P1y] = mapCoords(P1.x, P1.y, width, height, xRange, yRange);
        const [P2x, P2y] = mapCoords(P2.x, P2.y, width, height, xRange, yRange);
        
        ctx.fillStyle = foregroundColor;
        ctx.strokeStyle = primaryColor;
        ctx.lineWidth = 3;
        ctx.beginPath(); ctx.arc(P1x, P1y, 5, 0, 2*Math.PI); ctx.fill(); ctx.stroke();
        
        ctx.strokeStyle = accentColor;
        ctx.beginPath(); ctx.arc(P2x, P2y, 5, 0, 2*Math.PI); ctx.fill(); ctx.stroke();

    }, [a, delta, h, h_prime]);

    useEffect(() => {
        draw();
    }, [draw]);

    return (
        <div className="flex flex-col items-center p-4 bg-muted/30 rounded-lg">
            <canvas ref={canvasRef} width="600" height="300" className="bg-card/50 rounded-md w-full" />
            <div className="w-full max-w-md space-y-6 mt-6 p-4 rounded-md border border-border">
                <div className="grid gap-2">
                    <label className="text-sm font-medium flex justify-between">Instante <code className="font-code text-primary">a = {a.toFixed(2)}</code></label>
                    <Slider value={[a]} onValueChange={(v) => setA(v[0])} max={4} step={0.05} />
                </div>
                <div className="grid gap-2">
                     <label className="text-sm font-medium flex justify-between">Intervalo <code className="font-code text-primary">Δt = {delta.toFixed(2)}</code></label>
                    <Slider value={[delta]} onValueChange={(v) => setDelta(v[0])} max={2.5} min={0.01} step={0.01} />
                </div>
                 <div className="text-center text-sm text-muted-foreground">
                    <p>Secante (violeta) se aproxima a Tangente (cyan) cuando <code className="font-code">Δt → 0</code></p>
                </div>
            </div>
        </div>
    )
}

// --- Final Unlock Animation (Completed) ---
export const FinalUnlockAnimation = ({ codes }: { codes: string[] }) => {
    const [revealed, setRevealed] = useState<number[]>([]);
    const [decrypted, setDecrypted] = useState(false);
    const formulaRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const revealInterval = setInterval(() => {
            setRevealed(prev => {
                if (prev.length < codes.length) {
                    return [...prev, prev.length];
                }
                clearInterval(revealInterval);
                setTimeout(() => setDecrypted(true), 500);
                return prev;
            });
        }, 350);
        return () => clearInterval(revealInterval);
    }, [codes.length]);

    useEffect(() => {
        if (decrypted && formulaRef.current) {
            const el = formulaRef.current;
            const final = "h'(t) = −10t + 20";
            let i = 0;
            el.textContent = "";
            const decryptInterval = setInterval(() => {
                el.textContent = final.substring(0, i+1) + Array(final.length - i - 1).fill(0).map(()=> "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789*&^%$#@!".charAt(Math.floor(Math.random() * 41))).join('');
                i++;
                if (i >= final.length) {
                    el.textContent = final;
                    clearInterval(decryptInterval);
                }
            }, 50);
            return () => clearInterval(decryptInterval);
        }
    }, [decrypted]);

    return (
        <div className="my-12 p-6 bg-card/50 rounded-lg border-2 border-dashed border-primary/30 backdrop-blur-sm">
            <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4 font-code text-primary text-sm md:text-xl">
                {codes.map((code, index) => (
                    <React.Fragment key={index}>
                        <div className={cn("transition-all duration-500 ease-out", revealed.includes(index) ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-2 scale-90")}>
                            <Badge className="p-2 md:p-3 border-primary text-primary text-base">{code}</Badge>
                        </div>
                        {index < codes.length - 1 && <span className={cn("transition-opacity duration-300 text-muted-foreground", revealed.includes(index) ? "opacity-50" : "opacity-0")}>-</span>}
                    </React.Fragment>
                ))}
            </div>
            <div className="mt-8 text-center">
                <p className="text-muted-foreground">LA FÓRMULA RECUPERADA:</p>
                <div className="text-2xl md:text-4xl font-bold font-code text-primary mt-2 h-12" aria-live="polite">
                    <span ref={formulaRef}></span>
                </div>
            </div>
        </div>
    )
}
