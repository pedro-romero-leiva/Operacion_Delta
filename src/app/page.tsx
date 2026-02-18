"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  IntroContent,
  Mission1Content,
  Mission2Content,
  Mission3Content,
  Mission4Content,
  Mission5Content,
  Mission6Content,
  CompletedContent
} from "@/components/operacion-delta/content";
import {
  ProgressBar,
  Checkpoint,
  InstructorPanel,
  NotebookInput
} from "@/components/operacion-delta/ui";
import {
  SlopeAnimation,
  AverageAnimation,
  SecantToTangentAnimation,
  FinalUnlockAnimation,
} from "@/components/operacion-delta/animations";
import { KeySquare, BookCopy, Save } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

const missionCodes = [
  "DELTA",
  "SECANTE",
  "CURVA",
  "TANGENTE",
  "PATRON",
  "LIMITE"
];

const instructorPassword = "VECTORDERROTADO";

export default function OperacionDeltaPage() {
  const [isClient, setIsClient] = useState(false);
  const [mission, setMission] = useState(0);
  const [cuaderno, setCuaderno] = useState<Record<string, string>>({});
  const [instructorPanelOpen, setInstructorPanelOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    setIsClient(true);
    try {
      const savedCuaderno = localStorage.getItem('operacion_delta_respuestas');

      if (savedCuaderno) {
        setCuaderno(JSON.parse(savedCuaderno));
      }
    } catch (error) {
      console.error("Failed to load from localStorage", error);
    }
  }, []);

  useEffect(() => {
    if(isClient) {
      try {
        localStorage.setItem('operacion_delta_mission', mission.toString());
        localStorage.setItem('operacion_delta_respuestas', JSON.stringify(cuaderno));
      } catch (error) {
        console.error("Failed to save to localStorage", error);
      }
    }
  }, [mission, cuaderno, isClient]);

  const handleUpdateCuaderno = useCallback((id: string, value: string) => {
    setCuaderno(prev => ({ ...prev, [id]: value }));
  }, []);

  const handleCheckpoint = (code: string) => {
    if (mission > 0 && mission <= missionCodes.length && code.toUpperCase() === missionCodes[mission - 1]) {
      toast({
        title: "Código Correcto",
        description: "Fragmento desbloqueado. Accediendo a la siguiente misión...",
      });
      setMission(prev => prev + 1);
    } else {
      toast({
        variant: "destructive",
        title: "Código Incorrecto",
        description: "La operación está en riesgo. Intente de nuevo.",
      });
    }
  };
  
  const handlePasswordSubmit = () => {
    if (passwordInput.toUpperCase() === instructorPassword) {
      setPasswordDialogOpen(false);
      setInstructorPanelOpen(true);
      setPasswordInput('');
    } else {
      toast({
        variant: "destructive",
        title: "Contraseña Incorrecta",
        description: "No tenés autorización para acceder a este panel.",
      });
      setPasswordInput('');
    }
  };

  const handleSave = () => {
    try {
      localStorage.setItem('operacion_delta_respuestas', JSON.stringify(cuaderno));
      toast({
        title: "Progreso Guardado",
        description: "Tu cuaderno ha sido guardado en este dispositivo.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error al Guardar",
        description: "No se pudo guardar el progreso.",
      });
    }
  };

  const handleExport = () => {
    setExportModalOpen(true);
  };
  
  const getExportText = () => {
    let text = "OPERACIÓN DELTA - CUADERNO DEL AGENTE\n\n";
    for (let m = 1; m <= 6; m++) {
      text += `--- MISIÓN ${m} ---\n`;
      const missionKeys = Object.keys(cuaderno).filter(k => k.startsWith(`m${m}_`)).sort();
      missionKeys.forEach(key => {
        text += `${key}: ${cuaderno[key] || '(sin respuesta)'}\n`;
      });
      text += '\n';
    }
    const finalKeys = Object.keys(cuaderno).filter(k => k.startsWith(`final_`)).sort();
    if (finalKeys.length > 0) {
      text += `--- CONCLUSIONES FINALES ---\n`;
      finalKeys.forEach(key => {
        text += `${key.replace('final_','').replace('_', ' ')}: ${cuaderno[key] || '(sin respuesta)'}\n`;
      });
    }
    return text;
  };


  if (!isClient) {
    return <div className="bg-background min-h-screen"></div>;
  }

  const renderMission = () => {
    const commonProps = {
      cuaderno: cuaderno,
      updateCuaderno: handleUpdateCuaderno,
      NotebookInput: NotebookInput,
    };
    switch (mission) {
      case 0: return <IntroContent onStart={() => setMission(1)} />;
      case 1: return <Mission1Content {...commonProps} Animation={SlopeAnimation} Checkpoint={<Checkpoint missionNumber={1} onVerify={handleCheckpoint} />} />;
      case 2: return <Mission2Content {...commonProps} Animation={AverageAnimation} Checkpoint={<Checkpoint missionNumber={2} onVerify={handleCheckpoint} />} />;
      case 3: return <Mission3Content {...commonProps} Animation={SecantToTangentAnimation} Checkpoint={<Checkpoint missionNumber={3} onVerify={handleCheckpoint} />} />;
      case 4: return <Mission4Content {...commonProps} Animation={SecantToTangentAnimation} Checkpoint={<Checkpoint missionNumber={4} onVerify={handleCheckpoint} />} />;
      case 5: return <Mission5Content {...commonProps} Checkpoint={<Checkpoint missionNumber={5} onVerify={handleCheckpoint} />} />;
      case 6: return <Mission6Content {...commonProps} Checkpoint={<Checkpoint missionNumber={6} onVerify={handleCheckpoint} />} />;
      case 7: return <CompletedContent {...commonProps} Animation={FinalUnlockAnimation} codes={missionCodes} />;
      default: return <IntroContent onStart={() => setMission(1)} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-transparent text-foreground font-body">
      <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-sm border-b border-border/50">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <h1 className="text-xl md:text-2xl font-bold font-headline text-primary tracking-wider">
            OPERACIÓN DELTA
          </h1>
          <ProgressBar currentMission={mission} totalMissions={6} />
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="max-w-4xl mx-auto animate-fade-in-up" key={mission}>
          {renderMission()}
        </div>
      </main>

      <footer className="sticky bottom-0 z-40 w-full bg-background/80 backdrop-blur-sm border-t border-border/50">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Button variant="ghost" size="sm" onClick={() => setPasswordDialogOpen(true)} className="text-muted-foreground hover:text-primary transition-transform hover:scale-105 active:scale-100">
            <KeySquare className="mr-2 h-4 w-4" />
            Panel Instructor
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleSave} className="transition-transform hover:scale-105 active:scale-100">
              <Save className="mr-2 h-4 w-4" />
              Guardar Progreso
            </Button>
            <Button variant="secondary" size="sm" onClick={handleExport} className="transition-transform hover:scale-105 active:scale-100">
              <BookCopy className="mr-2 h-4 w-4" />
              Exportar Cuaderno
            </Button>
          </div>
        </div>
      </footer>
      
      <InstructorPanel
        isOpen={instructorPanelOpen}
        onClose={() => setInstructorPanelOpen(false)}
        onSelectMission={setMission}
      />

      <Dialog open={passwordDialogOpen} onOpenChange={setPasswordDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Acceso de Instructor</DialogTitle>
            <DialogDescription>
              Ingresá la contraseña para ver los códigos y respuestas.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              id="password"
              type="password"
              placeholder="Contraseña"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handlePasswordSubmit() }}
            />
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handlePasswordSubmit}>Acceder</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={exportModalOpen} onOpenChange={setExportModalOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Exportar Cuaderno</DialogTitle>
            <DialogDescription>
              Copiá este texto y guardalo en un archivo o imprimilo.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Textarea
              readOnly
              value={getExportText()}
              className="h-64 font-code text-xs bg-muted/50"
            />
          </div>
          <DialogFooter>
            <Button onClick={() => {
              navigator.clipboard.writeText(getExportText());
              toast({title: "Copiado", description: "El contenido del cuaderno se copió al portapapeles."});
            }}>Copiar al Portapapeles</Button>
            <Button variant="secondary" onClick={() => setExportModalOpen(false)}>Cerrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
