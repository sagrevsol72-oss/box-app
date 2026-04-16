import React from "react";
import { getBoxModel } from "@/lib/boxModel";

interface Props {
  largo: number;
  ancho: number;
  alto: number;
  logoTexto?: string;
}

export function BoxPlano2D({ largo, ancho, alto, logoTexto }: Props) {
  const S = 4;
  const model = getBoxModel(largo, ancho, alto);
  const [L1, W1, L2, W2] = model.panels.map(v => v * S);
  const flap = model.flap * S;
  const glue = model.glue;
  const x1 = glue;
  const x2 = x1 + L1;
  const x3 = x2 + W1;
  const x4 = x3 + L2;
  const x5 = x4 + W2;
  const totalW = x5;
  const totalH = alto * S + flap * 2;
  const pad = 20;
  const svgW = totalW + pad * 2;
  const svgH = totalH + pad * 2;

  return (
    <svg viewBox={`0 0 ${svgW} ${svgH}`} style={{ width: "100%", height: "auto" }}>
      <rect width={svgW} height={svgH} fill="#FAFAF8" />

      {/* CUERPO */}
      <rect
        x={pad + x1}
        y={pad + flap}
        width={L1 + W1 + L2 + W2}
        height={alto * S}
        fill="#D4A574"
        stroke="#8B6340"
        strokeWidth={2}
      />

      {/* GLUE */}
      <rect x={pad} y={pad + flap} width={glue} height={alto * S} fill="#E8C9A0" stroke="#8B6340" />

      {/* FLAPS SUPERIORES */}
      {[x1, x2, x3, x4].map((x, i) => {
        const w = i % 2 === 0 ? L1 : W1;
        return <rect key={`top${i}`} x={pad + x} y={pad} width={w} height={flap} fill="#D4A574" stroke="#8B6340" />;
      })}

      {/* FLAPS INFERIORES */}
      {[x1, x2, x3, x4].map((x, i) => {
        const w = i % 2 === 0 ? L1 : W1;
        return <rect key={`bot${i}`} x={pad + x} y={pad + flap + alto * S} width={w} height={flap} fill="#D4A574" stroke="#8B6340" />;
      })}

      {/* LÍNEAS DE DOBLEZ VERTICALES */}
      {[x1, x2, x3, x4].map((x, i) => (
        <line key={`v${i}`} x1={pad + x} y1={pad} x2={pad + x} y2={pad + totalH} stroke="#5C3D1E" strokeDasharray="5,5" />
      ))}

      {/* LÍNEAS HORIZONTALES */}
      <line x1={pad} y1={pad + flap} x2={pad + totalW} y2={pad + flap} stroke="#5C3D1E" strokeDasharray="5,5" />
      <line x1={pad} y1={pad + flap + alto * S} x2={pad + totalW} y2={pad + flap + alto * S} stroke="#5C3D1E" strokeDasharray="5,5" />

      {/* TEXTO */}
      <text x={pad + totalW / 2} y={pad + totalH + 15} textAnchor="middle" fontSize={12} fill="#333">
        RSC {largo} × {ancho} × {alto} cm
      </text>

      {logoTexto && (
        <text x={pad + x1 + L1 / 2} y={pad + flap + (alto * S) / 2} textAnchor="middle" fontSize={14} fill="#FF6B00">
          {logoTexto}
        </text>
      )}
    </svg>
  );
}