"use client";

import React, { FC, ReactNode } from 'react';
import { Button } from "@/components/ui/button";
import { Block, blockIcons, NotebookInput } from "./ui";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type CommonProps = {
  cuaderno: Record<string, string>;
  updateCuaderno: (id: string, value: string) => void;
  NotebookInput: FC<any>;
};

type MissionProps = CommonProps & {
  Checkpoint: ReactNode;
  Animation?: FC<any>;
};

const Em = ({ children }:{children:ReactNode}) => <em className="text-primary font-semibold not-italic">{children}</em>;

const GuideLegend = () => (
  <Block type="contexto" title="Cómo leer esta guía">
    <ul className="space-y-3">
      {Object.entries(blockIcons).map(([key, icon]) => (
        <li key={key} className="flex items-center gap-4">
          <span className="bg-primary/10 p-2 rounded-full text-primary">{icon}</span>
          <span className="font-headline font-bold capitalize">{key}</span>
          <span className="text-muted-foreground">— {
            {
              contexto: "la situación que da sentido al problema",
              geogebra: "los pasos exactos a seguir",
              verifica: "preguntas que debés responder antes de avanzar",
              concepto: "la formalización, aparece después de que lo descubriste",
              momento: "cuando todo hace clic",
              dialogo: "consultale para profundizar o aclarar",
              trampa: "errores clásicos que el Doctor Vector sembraría",
              checkpoint: "llamá al Agente Instructor antes de continuar",
            }[key as keyof typeof blockIcons]
          }</span>
        </li>
      ))}
    </ul>
  </Block>
);

export const IntroContent = ({ onStart }: { onStart: () => void }) => (
  <div className="text-center animate-fade-in-up">
    <h2 className="font-headline text-5xl md:text-7xl font-bold text-primary tracking-tighter">OPERACIÓN DELTA</h2>
    <p className="text-xl text-muted-foreground mt-4">Una guía de trabajo sobre razón de cambio y derivadas</p>
    <p className="mt-2 text-sm text-muted-foreground/80">Cálculo I · ~100 minutos · GeoGebra + DialogoX</p>
    
    <blockquote className="mt-12 text-lg italic max-w-3xl mx-auto border-l-4 border-primary/50 pl-6">
      &quot;Alguien robó la fórmula que describe cómo se mueve cualquier objeto en el universo. No sabemos quién. No sabemos cuándo. Solo sabemos que vos tenés los datos. Seis misiones. Seis fragmentos. Una fórmula.&quot;
    </blockquote>
    
    <Button size="lg" onClick={onStart} className="mt-12 animate-pulse-strong shadow-lg shadow-primary/20">
      INICIAR MISIÓN
    </Button>

    <div className="mt-16 text-left">
      <GuideLegend />
    </div>
  </div>
);

export const Mission1Content: FC<MissionProps> = ({ cuaderno, updateCuaderno, NotebookInput, Checkpoint, Animation }) => (
  <div>
    <h2 className="font-headline text-4xl text-primary mb-2">MISIÓN 1 · La velocidad constante</h2>
    <p className="text-lg text-muted-foreground">La clave está en la recta</p>

    <Block type="contexto" title="Contexto">
      <p>Una máquina lanzadora empuja la pelota hacia arriba a velocidad perfectamente constante. Jafeth registra la altura cada segundo. Los datos llegaron cifrados, pero los descifraste:</p>
      <Table>
        <TableHeader><TableRow><TableHead className="text-center">t (s)</TableHead><TableHead className="text-center">h (m)</TableHead></TableRow></TableHeader>
        <TableBody>
            <TableRow><TableCell className="text-center">0</TableCell><TableCell className="text-center">0</TableCell></TableRow>
            <TableRow><TableCell className="text-center">1</TableCell><TableCell className="text-center">3</TableCell></TableRow>
            <TableRow><TableCell className="text-center">2</TableCell><TableCell className="text-center">6</TableCell></TableRow>
            <TableRow><TableCell className="text-center">3</TableCell><TableCell className="text-center">9</TableCell></TableRow>
            <TableRow><TableCell className="text-center">4</TableCell><TableCell className="text-center">12</TableCell></TableRow>
        </TableBody>
      </Table>
      <p>¿Cuántos metros sube entre t=0 y t=1? <NotebookInput id="m1_q1" value={cuaderno.m1_q1} onChange={updateCuaderno} /></p>
      <p>¿Y entre t=2 y t=3? <NotebookInput id="m1_q2" value={cuaderno.m1_q2} onChange={updateCuaderno} /> ¿Es el mismo valor? <NotebookInput id="m1_q3" value={cuaderno.m1_q3} onChange={updateCuaderno} /></p>
      <p>¿Por qué creés que siempre sube la misma cantidad? <NotebookInput id="m1_q4" value={cuaderno.m1_q4} onChange={updateCuaderno} className="w-full"/></p>
    </Block>
    
    <Block type="geogebra" title="GeoGebra — Graficar los puntos y la función">
        <p>1. Abrí GeoGebra → Calculadora Gráfica (<code className="font-code">geogebra.org/calculator</code>)</p>
        <p>2. Ingresá los puntos: <code className="font-code">A=(0,0)</code> · <code className="font-code">B=(1,3)</code> · <code className="font-code">C=(2,6)</code> · <code className="font-code">D=(3,9)</code> · <code className="font-code">E=(4,12)</code></p>
        <p>3. Escribí: <code className="font-code">f(t) = 3 * t</code> — ¿pasa por todos los puntos?</p>
        <p>4. Probá también <code className="font-code">f(t) = 2*t</code> y <code className="font-code">f(t) = 5*t</code> — ¿siguen pasando?</p>
    </Block>
    
    {Animation && <Animation />}

    <Block type="momento" title="Construyendo la idea de pendiente">
      <p>Ahora construyamos juntos la idea de pendiente. Tomá los puntos B=(1,3) y D=(3,9):</p>
      <p><strong>Paso 1</strong> — ¿Cuánto cambió la altura? <code className="font-code">9 − 3 = <NotebookInput id="m1_delta_h1" value={cuaderno.m1_delta_h1} onChange={updateCuaderno} /></code> metros &nbsp;→&nbsp; a esto lo llamamos <strong>Δh</strong> (&quot;delta h&quot;)</p>
      <p><strong>Paso 2</strong> — ¿Cuánto cambió el tiempo? <code className="font-code">3 − 1 = <NotebookInput id="m1_delta_t1" value={cuaderno.m1_delta_t1} onChange={updateCuaderno} /></code> segundos &nbsp;→&nbsp; a esto lo llamamos <strong>Δt</strong> (&quot;delta t&quot;)</p>
      <p><strong>Paso 3</strong> — ¿Cuántos metros sube <em>por cada</em> segundo? <code className="font-code">Δh ÷ Δt = <NotebookInput id="m1_div1_1" value={cuaderno.m1_div1_1} onChange={updateCuaderno} /> ÷ <NotebookInput id="m1_div1_2" value={cuaderno.m1_div1_2} onChange={updateCuaderno} /> = <NotebookInput id="m1_res1" value={cuaderno.m1_res1} onChange={updateCuaderno} /> m/s</code></p>
      <p><strong>Paso 4</strong> — Repetí con A=(0,0) y E=(4,12): <code className="font-code">Δh = <NotebookInput id="m1_delta_h2" value={cuaderno.m1_delta_h2} onChange={updateCuaderno} /> · Δt = <NotebookInput id="m1_delta_t2" value={cuaderno.m1_delta_t2} onChange={updateCuaderno} /> · Δh÷Δt = <NotebookInput id="m1_res2" value={cuaderno.m1_res2} onChange={updateCuaderno} /></code></p>
      <p>¿Obtuviste el mismo resultado? <NotebookInput id="m1_q5" value={cuaderno.m1_q5} onChange={updateCuaderno} /> ¿Qué te dice eso?</p>
    </Block>

    <Block type="momento" title="Lo que acabás de calcular se llama PENDIENTE">
        <p>No es una fórmula que te dieron. Es el cociente que construiste vos paso a paso.</p>
        <blockquote className="border-l-4 border-primary/50 pl-4 italic">
            <strong className='font-code text-lg'>pendiente = Δh / Δt = (h₂ − h₁) / (t₂ − t₁)</strong>
        </blockquote>
        <p>En una función lineal, la pendiente es siempre la misma sin importar qué puntos usés. Y esa pendiente <Em>es</Em> una razón de cambio: cuánto cambia h por cada unidad de t.</p>
    </Block>

    <Block type="concepto" title="Concepto — Pendiente = Razón de cambio">
        <pre className="bg-muted p-4 rounded-md"><code className="font-code">pendiente = (h₂ − h₁) / (t₂ − t₁) = Δh / Δt</code></pre>
        <p>Unidad: metros ÷ segundos = <strong>m/s</strong>. Es una velocidad. En el caso de Jafeth: la pelota sube 3 m/s. Siempre.</p>
    </Block>
    
    <Block type="dialogo" title='DialogoX'>
        <p><em>&quot;¿Qué es la pendiente de una recta? Explicame con un ejemplo de la vida real, no con fórmulas.&quot;</em></p>
        <p>Anotá lo más importante que te explicó:</p>
        <textarea id="m1_dialogo" value={cuaderno.m1_dialogo} onChange={(e) => updateCuaderno('m1_dialogo', e.target.value)} className="w-full bg-input p-2 rounded-md" rows={3}></textarea>
    </Block>
    
    <Block type="verifica" title="Verificá antes de seguir">
        <p>1. ¿Qué representa la pendiente en este problema? ¿Qué unidad tiene? <NotebookInput id="m1_v1" value={cuaderno.m1_v1} onChange={updateCuaderno} className="w-full"/></p>
        <p>2. Si la función fuera <code className="font-code">f(t) = 7t</code>, ¿cuál sería la pendiente sin calcular? ¿Por qué? <NotebookInput id="m1_v2" value={cuaderno.m1_v2} onChange={updateCuaderno} className="w-full"/></p>
        <p>3. ¿Podés tener pendiente negativa? ¿Qué significaría físicamente? <NotebookInput id="m1_v3" value={cuaderno.m1_v3} onChange={updateCuaderno} className="w-full"/></p>
    </Block>

    {Checkpoint}
  </div>
);

export const Mission2Content: FC<MissionProps> = ({ cuaderno, updateCuaderno, NotebookInput, Checkpoint, Animation }) => (
    <div>
      <h2 className="font-headline text-4xl text-primary mb-2">MISIÓN 2 · La velocidad que cambia</h2>
      <p className="text-lg text-muted-foreground">Cuidado con el promedio</p>
  
      <Block type="contexto" title="Contexto">
        <p>Esta vez Jafeth lanza la pelota de verdad. La velocidad ya no es constante. Los nuevos datos llegaron y algo no cuadra — el Doctor Vector manipuló uno de los promedios para que parezca que la pelota no se movió. Tu misión: encontrarlo.</p>
        <Table>
          <TableHeader><TableRow><TableHead className="text-center">t (s)</TableHead><TableHead className="text-center">h (m)</TableHead></TableRow></TableHeader>
          <TableBody>
              <TableRow><TableCell className="text-center">0</TableCell><TableCell className="text-center">0</TableCell></TableRow>
              <TableRow><TableCell className="text-center">1</TableCell><TableCell className="text-center">8</TableCell></TableRow>
              <TableRow><TableCell className="text-center">2</TableCell><TableCell className="text-center">12</TableCell></TableRow>
              <TableRow><TableCell className="text-center">3</TableCell><TableCell className="text-center">12</TableCell></TableRow>
              <TableRow><TableCell className="text-center">4</TableCell><TableCell className="text-center">8</TableCell></TableRow>
              <TableRow><TableCell className="text-center">5</TableCell><TableCell className="text-center">0</TableCell></TableRow>
          </TableBody>
        </Table>
      </Block>
  
      <Block type="geogebra" title="GeoGebra — Graficar y conectar los puntos">
        <p>1. Borrá todo</p>
        <p>2. Ingresá: <code className="font-code">A=(0,0)</code> · <code className="font-code">B=(1,8)</code> · <code className="font-code">C=(2,12)</code> · <code className="font-code">D=(3,12)</code> · <code className="font-code">E=(4,8)</code> · <code className="font-code">F=(5,0)</code></p>
        <p>3. Conectalos: <code className="font-code">Segmento(A,B)</code> · <code className="font-code">Segmento(B,C)</code> · ...</p>
        <p>¿Están en línea recta? <NotebookInput id="m2_q1" value={cuaderno.m2_q1} onChange={updateCuaderno} /> Describí la forma: <NotebookInput id="m2_q2" value={cuaderno.m2_q2} onChange={updateCuaderno} className="w-full" /></p>
      </Block>
      
      {Animation && <Animation />}

      <Block type="momento" title="Calculá la pendiente de cada tramo">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader><TableRow>
                <TableHead>Tramo</TableHead><TableHead>t₁</TableHead><TableHead>t₂</TableHead><TableHead>h(t₁)</TableHead><TableHead>h(t₂)</TableHead><TableHead>Δh</TableHead><TableHead>Δt</TableHead><TableHead>m=Δh/Δt</TableHead>
            </TableRow></TableHeader>
            <TableBody>
                <TableRow><TableCell>A→B</TableCell><TableCell>0</TableCell><TableCell>1</TableCell><TableCell>0</TableCell><TableCell>8</TableCell><TableCell><NotebookInput id="m2_t1_dh" value={cuaderno.m2_t1_dh} onChange={updateCuaderno} /></TableCell><TableCell><NotebookInput id="m2_t1_dt" value={cuaderno.m2_t1_dt} onChange={updateCuaderno} /></TableCell><TableCell><NotebookInput id="m2_t1_m" value={cuaderno.m2_t1_m} onChange={updateCuaderno} /></TableCell></TableRow>
                <TableRow><TableCell>B→C</TableCell><TableCell>1</TableCell><TableCell>2</TableCell><TableCell>8</TableCell><TableCell>12</TableCell><TableCell><NotebookInput id="m2_t2_dh" value={cuaderno.m2_t2_dh} onChange={updateCuaderno} /></TableCell><TableCell><NotebookInput id="m2_t2_dt" value={cuaderno.m2_t2_dt} onChange={updateCuaderno} /></TableCell><TableCell><NotebookInput id="m2_t2_m" value={cuaderno.m2_t2_m} onChange={updateCuaderno} /></TableCell></TableRow>
                <TableRow><TableCell>C→D</TableCell><TableCell>2</TableCell><TableCell>3</TableCell><TableCell>12</TableCell><TableCell>12</TableCell><TableCell><NotebookInput id="m2_t3_dh" value={cuaderno.m2_t3_dh} onChange={updateCuaderno} /></TableCell><TableCell><NotebookInput id="m2_t3_dt" value={cuaderno.m2_t3_dt} onChange={updateCuaderno} /></TableCell><TableCell><NotebookInput id="m2_t3_m" value={cuaderno.m2_t3_m} onChange={updateCuaderno} /></TableCell></TableRow>
                <TableRow><TableCell>D→E</TableCell><TableCell>3</TableCell><TableCell>4</TableCell><TableCell>12</TableCell><TableCell>8</TableCell><TableCell><NotebookInput id="m2_t4_dh" value={cuaderno.m2_t4_dh} onChange={updateCuaderno} /></TableCell><TableCell><NotebookInput id="m2_t4_dt" value={cuaderno.m2_t4_dt} onChange={updateCuaderno} /></TableCell><TableCell><NotebookInput id="m2_t4_m" value={cuaderno.m2_t4_m} onChange={updateCuaderno} /></TableCell></TableRow>
                <TableRow><TableCell>E→F</TableCell><TableCell>4</TableCell><TableCell>5</TableCell><TableCell>8</TableCell><TableCell>0</TableCell><TableCell><NotebookInput id="m2_t5_dh" value={cuaderno.m2_t5_dh} onChange={updateCuaderno} /></TableCell><TableCell><NotebookInput id="m2_t5_dt" value={cuaderno.m2_t5_dt} onChange={updateCuaderno} /></TableCell><TableCell><NotebookInput id="m2_t5_m" value={cuaderno.m2_t5_m} onChange={updateCuaderno} /></TableCell></TableRow>
            </TableBody>
          </Table>
        </div>
      </Block>

      <Block type="verifica" title="Verificá">
        <p>1. ¿En qué tramo iba más rápido la pelota? <NotebookInput id="m2_v1" value={cuaderno.m2_v1} onChange={updateCuaderno} /></p>
        <p>2. El tramo C→D tiene pendiente 0 m/s. ¿La pelota se detuvo? Explicá. <NotebookInput id="m2_v2" value={cuaderno.m2_v2} onChange={updateCuaderno} className="w-full" /></p>
        <p>3. ¿Qué indica el signo negativo en D→E y E→F? <NotebookInput id="m2_v3" value={cuaderno.m2_v3} onChange={updateCuaderno} className="w-full" /></p>
      </Block>

      <Block type="trampa" title="La trampa del Doctor Vector">
        <p>Ahora calculá los tres promedios:</p>
        <p><strong>Promedio 1 — Solo la subida (A → C):</strong> <code className="font-code">Δh = <NotebookInput id="m2_p1_dh" value={cuaderno.m2_p1_dh} onChange={updateCuaderno} /> · Δt = <NotebookInput id="m2_p1_dt" value={cuaderno.m2_p1_dt} onChange={updateCuaderno} /> · m = <NotebookInput id="m2_p1_m" value={cuaderno.m2_p1_m} onChange={updateCuaderno} /></code>. ¿Qué te dice ese número? <NotebookInput id="m2_q_p1" value={cuaderno.m2_q_p1} onChange={updateCuaderno} className="w-full" /></p>
        <p><strong>Promedio 2 — Solo la bajada (C → F):</strong> <code className="font-code">Δh = <NotebookInput id="m2_p2_dh" value={cuaderno.m2_p2_dh} onChange={updateCuaderno} /> · Δt = <NotebookInput id="m2_p2_dt" value={cuaderno.m2_p2_dt} onChange={updateCuaderno} /> · m = <NotebookInput id="m2_p2_m" value={cuaderno.m2_p2_m} onChange={updateCuaderno} /></code>. ¿Qué te dice ese número? <NotebookInput id="m2_q_p2" value={cuaderno.m2_q_p2} onChange={updateCuaderno} className="w-full" /></p>
        <p><strong>Promedio 3 — El recorrido completo (A → F):</strong> <code className="font-code">Δh = <NotebookInput id="m2_p3_dh" value={cuaderno.m2_p3_dh} onChange={updateCuaderno} /> · Δt = <NotebookInput id="m2_p3_dt" value={cuaderno.m2_p3_dt} onChange={updateCuaderno} /> · m = <NotebookInput id="m2_p3_m" value={cuaderno.m2_p3_m} onChange={updateCuaderno} /></code>. ¿Te parece correcto? ¿Por qué sí o no? <NotebookInput id="m2_q_p3" value={cuaderno.m2_q_p3} onChange={updateCuaderno} className="w-full" /></p>
        <p className="mt-4">El Promedio 3 da <strong>0 m/s</strong>. Pero la pelota sí se movió. El promedio total mezcla la subida con la bajada y se cancelan. Es un número matemáticamente correcto que describe <em>mal</em> la realidad.</p>
        <p>La razón de cambio promedio <Em>depende de qué intervalo elegís</Em>. Siempre preguntá: ¿entre cuáles puntos?</p>
      </Block>
      
      <Block type="concepto" title="Concepto — Razón de cambio promedio">
          <pre className="bg-muted p-4 rounded-md"><code className="font-code">m = [h(b) − h(a)] / (b − a) = Δh / Δt</code></pre>
          <p>Esta es la pendiente de la <Em>recta secante</Em> entre (a, h(a)) y (b, h(b)).</p>
          <p>Signo: + sube · − baja · 0 = misma altura de inicio y fin.</p>
      </Block>

      <Block type="dialogo" title="DialogoX">
          <p><em>&quot;¿Por qué la razón de cambio promedio puede ser cero aunque la función sí cambió? Dame un ejemplo de la vida real.&quot;</em></p>
          <p>Anotá lo más importante:</p>
          <textarea id="m2_dialogo" value={cuaderno.m2_dialogo} onChange={(e) => updateCuaderno('m2_dialogo', e.target.value)} className="w-full bg-input p-2 rounded-md" rows={3}></textarea>
      </Block>

      <Block type="verifica" title="Verificá tus ideas">
          <p>1. ¿Por qué los tres promedios dieron resultados distintos si eran los mismos datos? <NotebookInput id="m2_v4" value={cuaderno.m2_v4} onChange={updateCuaderno} className="w-full" /></p>
          <p>2. ¿Cuál de los tres describe mejor el vuelo completo? <NotebookInput id="m2_v5" value={cuaderno.m2_v5} onChange={updateCuaderno} className="w-full" /></p>
          <p>3. Si alguien te dice &quot;la velocidad promedio fue 0&quot;, ¿qué le respondés? <NotebookInput id="m2_v6" value={cuaderno.m2_v6} onChange={updateCuaderno} className="w-full" /></p>
      </Block>

      {Checkpoint}
    </div>
);

export const Mission3Content: FC<MissionProps> = ({ cuaderno, updateCuaderno, NotebookInput, Checkpoint, Animation }) => (
    <div>
        <h2 className="font-headline text-4xl text-primary mb-2">MISIÓN 3 · La curva real</h2>
        <p className="text-lg text-muted-foreground">La recta que cruza dos puntos</p>

        <Block type="contexto" title="Contexto">
            <p>El profesor de física intercepta el mensaje de Jafeth. &quot;Los segmentos son una simplificación. La función real del lanzamiento es <code className="font-code text-primary">h(t) = −5t² + 20t</code>. Es una parábola.&quot; Ahora hay un problema nuevo: ¿cómo calculás la pendiente de algo que no es una línea recta?</p>
        </Block>

        <Block type="geogebra" title="GeoGebra — La parábola real">
            <p>1. Borrá todo</p>
            <p>2. Escribí: <code className="font-code">h(t) = -5 * t^2 + 20 * t</code></p>
            <p>3. Ajustá la vista: t ∈ [0,5] · h ∈ [0,22]</p>
            <p>¿A qué tiempo t parece estar el máximo? <NotebookInput id="m3_q1" value={cuaderno.m3_q1} onChange={updateCuaderno} /> ¿Cuánto vale h ahí? <NotebookInput id="m3_q2" value={cuaderno.m3_q2} onChange={updateCuaderno} /></p>
            <p>¿Se te ocurre alguna idea de cómo medir &quot;qué tan inclinada&quot; está la curva en un punto? <NotebookInput id="m3_q_idea" value={cuaderno.m3_q_idea} onChange={updateCuaderno} className="w-full" /></p>
        </Block>
        
        <p className="my-8 text-center text-lg italic text-muted-foreground max-w-2xl mx-auto">La estrategia: si tomamos dos puntos de la curva <Em>muy cercanos</Em> y trazamos una recta entre ellos, el pedacito de curva que queda entre ellos parece casi una línea recta. A esa recta se la llama <Em>recta secante</Em>.</p>

        <Block type="geogebra" title="GeoGebra — Construir la recta secante">
            <pre className="bg-muted p-4 rounded-md"><code className="font-code text-sm">
{`a = 1
delta = 2
P1 = (a, h(a))
P2 = (a + delta, h(a + delta))
secante = Línea(P1, P2)
m_sec = (h(a + delta) - h(a)) / delta`}
            </code></pre>
            <p className="mt-2">Creá un slider para <code className="font-code">a</code> de 0 a 4, y uno para <code className="font-code">delta</code> de 0.01 a 2.5.</p>
            <p>Con a=1 y delta=2: ¿cuánto vale m_sec? <NotebookInput id="m3_q3" value={cuaderno.m3_q3} onChange={updateCuaderno} /> ¿Qué representa? <NotebookInput id="m3_q4" value={cuaderno.m3_q4} onChange={updateCuaderno} className="w-full" /></p>
        </Block>
        
        <Block type="momento" title="Achicando el intervalo">
            <p>Dejá a=1 fijo (h(1)=15). Achicá delta lentamente y completá la tabla.</p>
            <div className="overflow-x-auto">
            <Table>
              <TableHeader><TableRow><TableHead>delta</TableHead><TableHead>t₂</TableHead><TableHead>h(t₁)</TableHead><TableHead>h(t₂)</TableHead><TableHead>m_sec</TableHead></TableRow></TableHeader>
              <TableBody>
                {[ '2.0', '1.0', '0.5', '0.2', '0.1', '0.01' ].map(d => (
                    <TableRow key={d}><TableCell>{d}</TableCell>
                    <TableCell><NotebookInput id={`m3_t_${d}_t2`} value={cuaderno[`m3_t_${d}_t2`]} onChange={updateCuaderno} /></TableCell>
                    <TableCell>15</TableCell>
                    <TableCell><NotebookInput id={`m3_t_${d}_h2`} value={cuaderno[`m3_t_${d}_h2`]} onChange={updateCuaderno} /></TableCell>
                    <TableCell><NotebookInput id={`m3_t_${d}_m`} value={cuaderno[`m3_t_${d}_m`]} onChange={updateCuaderno} /></TableCell>
                    </TableRow>
                ))}
              </TableBody>
            </Table>
            </div>
        </Block>

        <Block type="verifica" title="Verificá">
            <p>1. ¿Qué le pasa a m_sec cuando delta se hace más pequeño? <NotebookInput id="m3_v1" value={cuaderno.m3_v1} onChange={updateCuaderno} className="w-full" /></p>
            <p>2. ¿Hacia qué número apunta m_sec cuando delta → 0? <NotebookInput id="m3_v2" value={cuaderno.m3_v2} onChange={updateCuaderno} /></p>
            <p>3. ¿Por qué no podemos poner delta = 0 exactamente? <NotebookInput id="m3_v3" value={cuaderno.m3_v3} onChange={updateCuaderno} className="w-full" /></p>
        </Block>

        <Block type="concepto" title="Concepto — Recta secante = Razón de cambio promedio sobre la curva">
            <pre className="bg-muted p-4 rounded-md"><code className="font-code">m_sec = [h(t₁ + Δt) − h(t₁)] / Δt</code></pre>
            <p>No importa que la función sea curva: entre dos puntos siempre podemos trazar una recta. Su pendiente es el mejor estimado de la velocidad promedio en ese intervalo.</p>
        </Block>

        {Checkpoint}
    </div>
);

export const Mission4Content: FC<MissionProps> = ({ cuaderno, updateCuaderno, NotebookInput, Checkpoint, Animation }) => (
    <div>
        <h2 className="font-headline text-4xl text-primary mb-2">MISIÓN 4 · El momento exacto</h2>
        <p className="text-lg text-muted-foreground">La secante se vuelve tangente</p>

        <Block type="contexto" title="Contexto">
            <p>Jafeth mueve el slider de delta. La recta secante gira lentamente, como si quisiera detenerse en una posición final. Como si hubiera una recta <Em>límite</Em> hacia la cual todo converge. Algo está por revelarse.</p>
        </Block>
        
        <Block type="geogebra" title="GeoGebra — Ver la transformación">
            <p>Sobre la misma construcción, agregá: <code className="font-code">tangente = Tangente(a, h)</code></p>
            <p>1. Poné delta = 2. Observá la diferencia entre secante y tangente.</p>
            <p>2. Achicá delta: 2 → 1 → 0.5 → 0.1 → 0.01</p>
            <p>3. ¿A qué se va pareciendo la secante? <NotebookInput id="m4_q_secante" value={cuaderno.m4_q_secante} onChange={updateCuaderno} className="w-full"/></p>
            <p>Describí con tus palabras qué le pasa a la secante cuando delta → 0:</p>
            <textarea id="m4_q_desc_secante" value={cuaderno.m4_q_desc_secante} onChange={(e) => updateCuaderno('m4_q_desc_secante', e.target.value)} className="w-full bg-input p-2 rounded-md" rows={2}></textarea>
        </Block>

        {Animation && <Animation />}
        
        <Block type="geogebra" title="GeoGebra — La pendiente de la tangente">
            <pre className="bg-muted p-4 rounded-md"><code className="font-code">m_tan = Derivada(h, a)</code></pre>
            <p className="mt-2">Mové el slider <code className="font-code">a</code> y completá:</p>
            <Table>
                <TableHeader><TableRow><TableHead>a</TableHead><TableHead>m_tan</TableHead><TableHead>¿Qué significa físicamente?</TableHead></TableRow></TableHeader>
                <TableBody>
                    {[0, 1, 2, 3, 4].map(val => (
                        <TableRow key={val}>
                            <TableCell>{val}</TableCell>
                            <TableCell><NotebookInput id={`m4_t_${val}_mtan`} value={cuaderno[`m4_t_${val}_mtan`]} onChange={updateCuaderno} /></TableCell>
                            <TableCell><NotebookInput id={`m4_t_${val}_desc`} value={cuaderno[`m4_t_${val}_desc`]} onChange={updateCuaderno} className="w-full" /></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Block>
        
        <Block type="trampa" title="El momento especial: a = 2">
            <p>Cuando a=2, m_tan = <NotebookInput id="m4_q1" value={cuaderno.m4_q1} onChange={updateCuaderno} />. La tangente es perfectamente horizontal. Velocidad: 0 m/s.</p>
            <p>En ese instante la pelota no sube ni baja — está en pausa antes de caer. Esto siempre ocurre en los máximos y mínimos de una función.</p>
        </Block>

        <Block type="momento" title="La secante SE CONVIERTE en la tangente">
            <ul className="list-disc list-inside space-y-2">
                <li>Secante → razón de cambio <Em>PROMEDIO</Em> entre dos puntos</li>
                <li>Tangente → razón de cambio <Em>INSTANTÁNEA</Em> en un punto exacto</li>
                <li>Cuando Δt → 0: la secante se convierte en la tangente</li>
            </ul>
        </Block>
        
        <Block type="dialogo" title="DialogoX">
            <p><em>&quot;¿Cuál es la diferencia entre una recta secante y una recta tangente? ¿Cómo se relacionan cuando Δt → 0?&quot;</em></p>
            <p>Anotá lo más importante:</p>
            <textarea id="m4_dialogo" value={cuaderno.m4_dialogo} onChange={(e) => updateCuaderno('m4_dialogo', e.target.value)} className="w-full bg-input p-2 rounded-md" rows={3}></textarea>
        </Block>

        <Block type="verifica" title="Verificá la idea clave">
            <p>1. ¿En qué momentos la velocidad es positiva? ¿En cuáles negativa? <NotebookInput id="m4_v1" value={cuaderno.m4_v1} onChange={updateCuaderno} className="w-full" /></p>
            <p>2. ¿Por qué no podemos calcular la pendiente exacta poniendo Δt = 0 directamente? <NotebookInput id="m4_v2" value={cuaderno.m4_v2} onChange={updateCuaderno} className="w-full" /></p>
            <p>3. Completá: &quot;La secante mide ___. La tangente mide ___. Cuando Δt→0, la secante se convierte en ___.&quot; <NotebookInput id="m4_v3" value={cuaderno.m4_v3} onChange={updateCuaderno} className="w-full" /></p>
        </Block>
        
        {Checkpoint}
    </div>
);

export const Mission5Content: FC<MissionProps> = ({ cuaderno, updateCuaderno, NotebookInput, Checkpoint }) => (
    <div>
        <h2 className="font-headline text-4xl text-primary mb-2">MISIÓN 5 · El patrón oculto</h2>
        <p className="text-lg text-muted-foreground">Descubrí la fórmula</p>

        <Block type="contexto" title="Contexto">
            <p>Jafeth mira la tabla de valores de m_tan durante un minuto en silencio. Los vuelve a mirar. Y de repente: &quot;Yo conozco estos números.&quot;</p>
        </Block>

        <Block type="momento" title="Encontrá el patrón">
            <p>Para cada valor de t, calculá m_tan en GeoGebra (poniendo <code className="font-code">a</code> igual a ese valor):</p>
            <Table>
                <TableHeader><TableRow><TableHead>t</TableHead><TableHead>m_tan = h'(t)</TableHead><TableHead>¿Qué operación conecta t con h'(t)?</TableHead></TableRow></TableHeader>
                <TableBody>
                    <TableRow><TableCell>0</TableCell><TableCell><NotebookInput id="m5_t_0" value={cuaderno.m5_t_0} onChange={updateCuaderno} /></TableCell><TableCell><NotebookInput id="m5_t_0_op" value={cuaderno.m5_t_0_op} onChange={updateCuaderno} className="w-full"/></TableCell></TableRow>
                    <TableRow><TableCell>1</TableCell><TableCell><NotebookInput id="m5_t_1" value={cuaderno.m5_t_1} onChange={updateCuaderno} /></TableCell><TableCell><NotebookInput id="m5_t_1_op" value={cuaderno.m5_t_1_op} onChange={updateCuaderno} className="w-full"/></TableCell></TableRow>
                    <TableRow><TableCell>2</TableCell><TableCell><NotebookInput id="m5_t_2" value={cuaderno.m5_t_2} onChange={updateCuaderno} /></TableCell><TableCell><NotebookInput id="m5_t_2_op" value={cuaderno.m5_t_2_op} onChange={updateCuaderno} className="w-full"/></TableCell></TableRow>
                    <TableRow><TableCell>3</TableCell><TableCell><NotebookInput id="m5_t_3" value={cuaderno.m5_t_3} onChange={updateCuaderno} /></TableCell><TableCell><NotebookInput id="m5_t_3_op" value={cuaderno.m5_t_3_op} onChange={updateCuaderno} className="w-full"/></TableCell></TableRow>
                    <TableRow><TableCell>4</TableCell><TableCell><NotebookInput id="m5_t_4" value={cuaderno.m5_t_4} onChange={updateCuaderno} /></TableCell><TableCell><NotebookInput id="m5_t_4_op" value={cuaderno.m5_t_4_op} onChange={updateCuaderno} className="w-full"/></TableCell></TableRow>
                </TableBody>
            </Table>
            <p className="mt-4">Seguí estos pasos para encontrar el patrón:</p>
            <ul className="list-disc list-inside font-code text-muted-foreground">
                <li>Probá: <code className="font-code">0 × (−10) + 20 = <NotebookInput id="m5_p1" value={cuaderno.m5_p1} onChange={updateCuaderno} /></code> ¿Da 20?</li>
                <li>Probá: <code className="font-code">1 × (−10) + 20 = <NotebookInput id="m5_p2" value={cuaderno.m5_p2} onChange={updateCuaderno} /></code> ¿Da 10?</li>
                <li>Probá: <code className="font-code">2 × (−10) + 20 = <NotebookInput id="m5_p3" value={cuaderno.m5_p3} onChange={updateCuaderno} /></code> ¿Da 0?</li>
                <li>Probá: <code className="font-code">3 × (−10) + 20 = <NotebookInput id="m5_p4" value={cuaderno.m5_p4} onChange={updateCuaderno} /></code> ¿Da -10?</li>
            </ul>
            <p className='mt-2'>Si el patrón es <code className="font-code">h'(t) = t × (___) + ___</code>, entonces:</p>
            <p className="mt-4">Mi conjetura: <strong className="text-primary font-code text-lg">h'(t) = <NotebookInput id="m5_conjetura" value={cuaderno.m5_conjetura} onChange={updateCuaderno} className="w-48"/></strong></p>
        </Block>

        <Block type="geogebra" title="Verificar la conjetura">
            <pre className="bg-muted p-4 rounded-md"><code className="font-code">g(t) = Derivada(h)</code></pre>
            <p className="mt-2">¿Qué fórmula mostró GeoGebra para g(t)? <NotebookInput id="m5_geo" value={cuaderno.m5_geo} onChange={updateCuaderno} className="w-48"/> ¿Coincide con tu conjetura? <NotebookInput id="m5_coincide" value={cuaderno.m5_coincide} onChange={updateCuaderno} /></p>
        </Block>

        <Block type="momento" title="¡Descubriste la función derivada!">
            <p>La derivada de <code className="font-code">h(t) = −5t² + 20t</code> es <code className="font-code">h'(t) = −10t + 20</code>.</p>
            <p>h(t) tenía un t². La derivada &quot;bajó&quot; el exponente. Eso no es accidente.</p>
            <blockquote className="border-l-4 border-primary/50 pl-4 italic">Regla general: si <code className="font-code">f(t) = a·tⁿ</code>, entonces <code className="font-code">f'(t) = n·a·tⁿ⁻¹</code></blockquote>
            <ul className="list-disc list-inside mt-2">
                <li><code className="font-code">−5t² → 2 × (−5) × t¹ = −10t</code></li>
                <li><code className="font-code">+20t → 1 × 20 × t⁰ = 20</code></li>
            </ul>
        </Block>
        
        <Block type="dialogo" title="DialogoX">
            <p><em>&quot;Encontré que la derivada de h(t) = -5t² + 20t es h'(t) = -10t + 20. ¿Por qué? ¿Hay una regla general?&quot;</em></p>
            <p>Anotá lo más importante:</p>
            <textarea id="m5_dialogo" value={cuaderno.m5_dialogo} onChange={(e) => updateCuaderno('m5_dialogo', e.target.value)} className="w-full bg-input p-2 rounded-md" rows={3}></textarea>
        </Block>

        <Block type="verifica" title="Verificá tu nueva herramienta">
            <p>1. ¿Por qué la derivada g(t) es una línea recta si h(t) era una parábola? <NotebookInput id="m5_v1" value={cuaderno.m5_v1} onChange={updateCuaderno} className="w-full" /></p>
            <p>2. Usá `h'(t) = −10t + 20` para calcular la velocidad en t=1.5. ¿Cuánto da? <NotebookInput id="m5_v2" value={cuaderno.m5_v2} onChange={updateCuaderno} /></p>
            <p>3. ¿En qué instante exacto la velocidad es cero? Despejá `h'(t) = 0`. <NotebookInput id="m5_v3" value={cuaderno.m5_v3} onChange={updateCuaderno} /></p>
        </Block>
        
        {Checkpoint}
    </div>
);

export const Mission6Content: FC<MissionProps> = ({ cuaderno, updateCuaderno, NotebookInput, Checkpoint }) => (
    <div>
        <h2 className="font-headline text-4xl text-primary mb-2">MISIÓN 6 · La fórmula final</h2>
        <p className="text-lg text-muted-foreground">Ponerle nombre a lo que descubriste</p>

        <Block type="contexto" title="Contexto">
            <p>Jafeth abre el libro de cálculo. Lee la definición de derivada. Y sonríe: &quot;Yo ya hice esto. Solo que ahora sé cómo se llama.&quot;</p>
        </Block>

        <Block type="concepto" title="Definición formal de derivada">
            <pre className="bg-muted p-4 rounded-md text-center"><code className="font-code text-lg">
              h'(t) = lím [h(t + Δt) − h(t)] / Δt     cuando Δt → 0
            </code></pre>
            <ul className="list-disc list-inside mt-4 space-y-2">
                <li><strong>Geométricamente:</strong> pendiente de la recta tangente en el punto (t, h(t))</li>
                <li><strong>Físicamente:</strong> velocidad exacta — razón de cambio instantánea — en el instante t</li>
            </ul>
        </Block>

        <Block type="momento" title="Conectá todo">
            <Table>
                 <TableHeader><TableRow><TableHead>Frase</TableHead><TableHead>Tu respuesta</TableHead></TableRow></TableHeader>
                <TableBody>
                    <TableRow><TableCell>La recta secante mide la razón de cambio ___</TableCell><TableCell><NotebookInput id="m6_c1" value={cuaderno.m6_c1} onChange={updateCuaderno} className="w-full"/></TableCell></TableRow>
                    <TableRow><TableCell>La recta tangente mide la razón de cambio ___</TableCell><TableCell><NotebookInput id="m6_c2" value={cuaderno.m6_c2} onChange={updateCuaderno} className="w-full"/></TableCell></TableRow>
                    <TableRow><TableCell>Cuando Δt→0, la recta ___ se convierte en la recta ___</TableCell><TableCell><NotebookInput id="m6_c3" value={cuaderno.m6_c3} onChange={updateCuaderno} className="w-full"/></TableCell></TableRow>
                    <TableRow><TableCell>La pendiente de la tangente se llama ___</TableCell><TableCell><NotebookInput id="m6_c4" value={cuaderno.m6_c4} onChange={updateCuaderno} className="w-full"/></TableCell></TableRow>
                    <TableRow><TableCell>Cuando h'(t) &gt; 0, la pelota está ___</TableCell><TableCell><NotebookInput id="m6_c5" value={cuaderno.m6_c5} onChange={updateCuaderno} className="w-full"/></TableCell></TableRow>
                    <TableRow><TableCell>Cuando h'(t) &lt; 0, la pelota está ___</TableCell><TableCell><NotebookInput id="m6_c6" value={cuaderno.m6_c6} onChange={updateCuaderno} className="w-full"/></TableCell></TableRow>
                    <TableRow><TableCell>Cuando h'(t) = 0, la pelota está en ___</TableCell><TableCell><NotebookInput id="m6_c7" value={cuaderno.m6_c7} onChange={updateCuaderno} className="w-full"/></TableCell></TableRow>
                </TableBody>
            </Table>
        </Block>

        <Block type="geogebra" title="GeoGebra — Ver h(t) y h'(t) juntas">
            <p>Asegurate de tener activas `h(t)` y `g(t) = Derivada(h)`.</p>
            <ul className="list-disc list-inside space-y-2">
                <li>Cuando h(t) sube → ¿g(t) es positiva o negativa? <NotebookInput id="m6_g1" value={cuaderno.m6_g1} onChange={updateCuaderno} /></li>
                <li>¿Dónde cruza g(t) el eje horizontal? ¿Qué pasa con h(t) exactamente ahí? <NotebookInput id="m6_g2" value={cuaderno.m6_g2} onChange={updateCuaderno} className="w-full"/></li>
            </ul>
            <p>Describí la relación entre ambas gráficas:</p>
            <textarea id="m6_g3" value={cuaderno.m6_g3} onChange={(e) => updateCuaderno('m6_g3', e.target.value)} className="w-full bg-input p-2 rounded-md" rows={2}></textarea>
        </Block>

        <Block type="dialogo" title="DialogoX">
            <p><em>&quot;Ya terminé de estudiar la derivada. ¿Podés hacerme 3 preguntas cortas para verificar si de verdad entendí?&quot;</em></p>
            <p>Respondé las preguntas de DialogoX aquí:</p>
            <textarea id="m6_dialogo" value={cuaderno.m6_dialogo} onChange={(e) => updateCuaderno('m6_dialogo', e.target.value)} className="w-full bg-input p-2 rounded-md" rows={3}></textarea>
        </Block>

        {Checkpoint}
    </div>
);

export const CompletedContent: FC<CommonProps & {Animation: FC<any>, codes: string[]}> = ({ cuaderno, updateCuaderno, NotebookInput, Animation, codes }) => (
    <div className="text-center">
        <h2 className="font-headline text-5xl font-bold text-primary">🏆 OPERACIÓN DELTA — COMPLETADA</h2>
        
        <Animation codes={codes} />
        
        <div className="mt-8 text-lg font-code">
            <p>La fórmula recuperada: <strong className='text-primary'>h'(t) = −10t + 20</strong></p>
            <p className='mt-4'>Agente Instructor confirma misión: _______________________</p>
        </div>


        <div className="max-w-2xl mx-auto space-y-8 mt-12 text-left">
            <div>
                <Label htmlFor="final_q1" className="text-lg">Con tus propias palabras: ¿qué es la derivada?</Label>
                <textarea id="final_q1" value={cuaderno.final_q1} onChange={(e) => updateCuaderno('final_q1', e.target.value)} className="w-full bg-input p-2 rounded-md mt-2" rows={3}></textarea>
            </div>
            <div>
                <Label htmlFor="final_q2" className="text-lg">¿Cuál fue el momento donde algo &quot;hizo clic&quot;?</Label>
                <textarea id="final_q2" value={cuaderno.final_q2} onChange={(e) => updateCuaderno('final_q2', e.target.value)} className="w-full bg-input p-2 rounded-md mt-2" rows={3}></textarea>
            </div>
             <div>
                <Label htmlFor="final_q3" className="text-lg">¿Qué pregunta te quedó sin responder?</Label>
                <textarea id="final_q3" value={cuaderno.final_q3} onChange={(e) => updateCuaderno('final_q3', e.target.value)} className="w-full bg-input p-2 rounded-md mt-2" rows={3}></textarea>
            </div>
        </div>

        <Block type="momento" title="Autoevaluación">
            <Table>
                <TableHeader><TableRow><TableHead>Concepto</TableHead><TableHead className="text-center">✓</TableHead><TableHead className="text-center">~</TableHead><TableHead className="text-center">✗</TableHead></TableRow></TableHeader>
                <TableBody>
                    {[
                        "Pendiente de función lineal", "Pendiente = razón de cambio", "Razón de cambio promedio",
                        "El 'promedio trampa'", "Función por tramos como aproximación", "Secante → tangente cuando Δt→0",
                        "Razón de cambio instantánea", "Definición formal de derivada", "Función derivada h'(t)",
                        "Signo de h'(t) y comportamiento de h(t)"
                    ].map(concept => (
                        <TableRow key={concept}>
                            <TableCell>{concept}</TableCell>
                            {[ 'ok', 'so', 'no' ].map(val => (
                                <TableCell key={val} className="text-center">
                                    <Checkbox id={`eval_${concept}_${val}`} onCheckedChange={(checked) => {
                                      if(checked) {
                                        updateCuaderno(`eval_${concept}`, val)
                                      }
                                    }}
                                    checked={cuaderno[`eval_${concept}`] === val}
                                    />
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Block>
    </div>
);
