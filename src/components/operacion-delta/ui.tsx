"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from '@/lib/utils';
import {
  Dribbble,
  Cog,
  MessageSquareQuote,
  Pin,
  Lightbulb,
  MessagesSquare,
  AlertTriangle,
  Lock,
  ArrowRight,
} from 'lucide-react';

// Progress Bar
export const ProgressBar = ({ currentMission, totalMissions }: { currentMission: number; totalMissions: number }) => {
  const fragments = Array.from({ length: totalMissions });
  const unlockedCount = Math.max(0, currentMission > totalMissions ? totalMissions : currentMission -1);

  return (
    <div className="flex items-center gap-1.5" aria-label={`Progreso: ${unlockedCount} de ${totalMissions} misiones completadas`}>
      {fragments.map((_, index) => (
        <div
          key={index}
          className={cn(
            "h-2.5 w-8 md:w-12 rounded-full transition-all duration-500",
            index < unlockedCount ? "bg-primary shadow-[0_0_8px_hsl(var(--primary))] scale-110" : "bg-muted/50"
          )}
        />
      ))}
    </div>
  );
};


// Content Block
export const blockIcons = {
  contexto: <Dribbble size={20} />,
  geogebra: <Cog size={20} />,
  verifica: <MessageSquareQuote size={20} />,
  concepto: <Pin size={20} />,
  momento: <Lightbulb size={20} />,
  dialogo: <MessagesSquare size={20} />,
  trampa: <AlertTriangle size={20} />,
  checkpoint: <Lock size={20} />,
};

const blockStyles = {
    contexto: "border-sky-500/20 bg-sky-500/5",
    geogebra: "border-green-500/20 bg-green-500/5",
    verifica: "border-yellow-500/20 bg-yellow-500/5",
    concepto: "border-purple-500/20 bg-purple-500/5",
    momento: "border-amber-500/20 bg-amber-500/5",
    dialogo: "border-indigo-500/20 bg-indigo-500/5",
    trampa: "border-red-500/20 bg-red-500/5",
    checkpoint: "border-primary/30 bg-primary/5",
};

type BlockType = keyof typeof blockIcons;

export const Block = ({ type, title, children }: { type: BlockType; title: string; children: React.ReactNode }) => (
  <div className={cn("my-8 p-6 rounded-xl border-t-4 bg-card/50 backdrop-blur-sm shadow-lg transition-all hover:shadow-primary/10", blockStyles[type])}>
    <h3 className="font-headline font-bold text-xl flex items-center gap-3 mb-4 text-primary">
      <span className="bg-primary/10 p-2 rounded-full">{blockIcons[type]}</span>
      {title}
    </h3>
    <div className="prose prose-invert prose-base max-w-none text-foreground/80 space-y-4 prose-p:leading-relaxed prose-code:bg-muted prose-code:px-1.5 prose-code:py-1 prose-code:rounded prose-code:font-normal">
      {children}
    </div>
  </div>
);

// Notebook Input
export const NotebookInput = ({ id, value, onChange, className, placeholder="___" }: { id: string; value: string; onChange: (id: string, value: string) => void; className?: string; placeholder?: string }) => (
  <input
    type="text"
    id={id}
    name={id}
    value={value || ''}
    onChange={(e) => onChange(id, e.target.value)}
    placeholder={placeholder}
    className={cn(
        "inline-block w-24 bg-transparent border-b-2 border-dashed border-muted-foreground/30 focus:border-solid focus:border-primary focus:outline-none focus:ring-0 text-center text-primary font-medium text-base transition-colors",
        className
    )}
    autoComplete="off"
  />
);

// Checkpoint
export const Checkpoint = ({ missionNumber, onVerify }: { missionNumber: number; onVerify: (code: string) => void }) => {
  const [code, setCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onVerify(code);
  };

  return (
    <Block type="checkpoint" title={`CHECKPOINT ${missionNumber}`}>
      <p>Llamá al Agente Instructor para recibir el código de la misión. El futuro del universo depende de esto.</p>
      <form onSubmit={handleSubmit} className="flex items-center gap-4 mt-6">
        <Input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          placeholder="CÓDIGO SECRETO"
          className="font-code tracking-widest uppercase max-w-xs bg-input/80 text-lg h-12 text-center placeholder:text-muted-foreground/50"
          aria-label={`Código para la misión ${missionNumber}`}
        />
        <Button type="submit" size="lg" className="h-12 shadow-lg shadow-primary/20 hover:scale-105 active:scale-100 transition-transform duration-200">
          DESBLOQUEAR
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </form>
    </Block>
  );
};


// Instructor Panel
export const InstructorPanel = ({ isOpen, onClose, onSelectMission }: { isOpen: boolean; onClose: () => void; onSelectMission: (mission: number) => void; }) => {
  const codes = [
    { mission: 1, code: 'DELTA' },
    { mission: 2, code: 'SECANTE' },
    { mission: 3, code: 'CURVA' },
    { mission: 4, code: 'TANGENTE' },
    { mission: 5, code: 'PATRON' },
    { mission: 6, code: 'LIMITE' },
  ];

  const handleMissionSelect = (mission: number) => {
    onSelectMission(mission);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl text-primary flex items-center gap-3"><Lock/> PANEL DEL AGENTE INSTRUCTOR</DialogTitle>
          <DialogDescription>
            No distribuir a estudiantes. Contraseña maestra: VECTORDERROTADO
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto pr-4 space-y-6">
          <div>
            <h3 className="font-headline text-xl font-bold mb-2">Códigos y Navegación</h3>
             <div className="flex gap-2 mb-4">
                <Button variant="outline" size="sm" onClick={() => handleMissionSelect(0)}>
                    Ir a Introducción
                </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Misión</TableHead>
                  <TableHead>Código</TableHead>
                  <TableHead className="text-right">Navegar</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {codes.map(c => (
                  <TableRow key={c.mission}>
                    <TableCell>{c.mission}</TableCell>
                    <TableCell><Badge variant="outline" className="font-code text-lg border-primary/50 text-primary">{c.code}</Badge></TableCell>
                    <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => handleMissionSelect(c.mission)}>
                            Ir <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </TableCell>
                  </TableRow>
                ))}
                 <TableRow>
                    <TableCell>7</TableCell>
                    <TableCell><Badge>Completada</Badge></TableCell>
                    <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => handleMissionSelect(7)}>
                            Ir <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </TableCell>
                </TableRow>
              </TableBody>
            </Table>
             <p className="mt-4">Frase ensamblada: <strong className="text-primary font-code">DELTA − SECANTE − CURVA − TANGENTE − PATRON − LIMITE</strong></p>
            <p className="mt-1">Fórmula recuperada: <strong className="text-primary font-code">h'(t) = −10t + 20</strong></p>
          </div>

          <div>
             <h3 className="font-headline text-xl font-bold mb-2">Respuestas Correctas</h3>
             <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li><strong>Misión 1:</strong> Δh entre 0→1: 3 m. Pendiente B→D: Δh=6, Δt=2, m=3 m/s. Pendiente A→E: Δh=12, Δt=4, m=3 m/s.</li>
                <li><strong>Misión 2:</strong> Tramos: A→B (8 m/s), B→C (4 m/s), C→D (0 m/s), D→E (−4 m/s), E→F (−8 m/s). Promedios: A→C (6 m/s), C→F (−4 m/s), A→F (0 m/s).</li>
                <li><strong>Misión 3:</strong> Tabla m_sec (a=1) converge a 10. Valores: 0.0, 5.0, 7.5, 9.0, 9.5, 9.95.</li>
                <li><strong>Misión 4:</strong> Tabla m_tan: 20 (a=0), 10 (a=1), 0 (a=2), -10 (a=3), -20 (a=4).</li>
                <li><strong>Misión 5:</strong> Conjetura: h'(t) = -10t + 20. Vel en t=1.5: 5 m/s. Vel cero: t=2s.</li>
                <li><strong>Misión 6:</strong> PROMEDIO, INSTANTÁNEA, SECANTE → TANGENTE, DERIVADA, SUBIENDO, BAJANDO, PUNTO MÁS ALTO/MÍNIMO.</li>
             </ul>
          </div>
          
          <div>
            <h3 className="font-headline text-xl font-bold mb-2">Errores Comunes</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li><strong>M1:</strong> Restar al revés, no dividir entre Δt.</li>
                <li><strong>M2:</strong> Confundir pendiente 0 con "pelota detenida".</li>
                <li><strong>M3:</strong> No ver la convergencia a 10.</li>
                <li><strong>M4:</strong> Confundir m_tan=0 con "derivada no existe".</li>
                <li><strong>M5:</strong> No escribir el patrón como fórmula.</li>
                <li><strong>M6:</strong> Definición memorizada sin comprensión.</li>
            </ul>
          </div>

           <div>
            <h3 className="font-headline text-xl font-bold mb-2">Preguntas Orales Sugeridas</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>M1: "Si f(t) = 10t, ¿cuál es la pendiente sin calcular?" (10)</li>
                <li>M3: "¿Por qué no podemos poner delta=0?" (División por cero)</li>
                <li>M4: "¿Qué significa que la tangente en t=2 sea horizontal?" (Velocidad cero, punto más alto)</li>
                <li>M5: "¿En qué instante exacto la velocidad es 0?" (t=2s)</li>
                <li>M6: "¿Qué velocidad tiene la pelota en t=1.5?" (5 m/s)</li>
            </ul>
          </div>

          <div>
            <h3 className="font-headline text-xl font-bold mb-2">Tiempos y pausas</h3>
             <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>M1 ~18 min · M2 ~22 min · M3 ~20 min · M4 ~15 min · M5 ~15 min · M6 ~10 min · <strong>Total ~100 min</strong></li>
                <li>Pausas plenarias recomendadas: después de M2 y M4 (mayores rupturas conceptuales).</li>
            </ul>
          </div>

        </div>
        <DialogClose asChild>
            <Button type="button" variant="secondary" className="mt-4">Cerrar</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};
