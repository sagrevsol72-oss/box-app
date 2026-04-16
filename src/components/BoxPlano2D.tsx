import React from "react";

interface BoxPlano2DProps {
  largo: number;
  ancho: number;
  alto: number;
  logoTexto?: string;
  logoImage?: string | null;
}

export function BoxPlano2D({
  largo,
  ancho,
  alto,
  logoTexto,
  logoImage,
}: BoxPlano2DProps) {
  const S = 4;

  // Dimensiones escaladas
  const L = largo * S;
  const W = ancho * S;
  const H = alto * S;

  // Glue flap estándar (ajústalo si quieres)
  const glue = 30;

  // Flaps estándar RSC
  const flap = W / 2;

  // Posiciones X (SOLO 4 PANELES)
  const x0 = 0;
  const x1 = glue;
  const x2 = x1 + L;
  const x3 = x2 + W;
  const x4 = x3 + L;
  const x5 = x4 + W;

  const totalW = x5;
  const totalH = H + flap * 2;

  const pad = 20;

  const svgW = totalW + pad * 2;
  const svgH = totalH + pad * 2;

  // Área de impresión en primer panel L
  const printX = pad + x1 + L * 0.15;
  const printY = pad + flap + H * 0.15;
  const printW = L * 0.7;
  const printH = H * 0.7;

  return (
    <svg
      viewBox={`0 0 ${svgW} ${svgH}`}
      width={Math.min(svgW, 700)}
      height={Math.min(svgH, 350)}
      style={{ width: "100%", height: "auto" }}
    >
      <rect width={svgW} height={svgH} fill="#FAFAF8" />

      {/* CUERPO PRINCIPAL */}
      <rect
        x={pad + x1}
        y={pad + flap}
        width={L + W + L + W}
        height={H}
        fill="#D4A574"
        stroke="#8B6340"
        strokeWidth={2}
      />

      {/* GLUE FLAP */}
      <rect
        x={pad}
        y={pad + flap}
        width={glue}
        height={H}
        fill="#E8C9A0"
        stroke="#8B6340"
        strokeWidth={1.5}
      />

      {/* FLAPS SUPERIORES */}
      {[x1, x2, x3, x4].map((x, i) => {
        const w = i % 2 === 0 ? L : W;
        return (
          <rect
            key={`top${i}`}
            x={pad + x}
            y={pad}
            width={w}
            height={flap}
            fill="#D4A574"
            stroke="#8B6340"
            strokeWidth={1.5}
          />
        );
      })}

      {/* FLAPS INFERIORES */}
      {[x1, x2, x3, x4].map((x, i) => {
        const w = i % 2 === 0 ? L : W;
        return (
          <rect
            key={`bot${i}`}
            x={pad + x}
            y={pad + flap + H}
            width={w}
            height={flap}
            fill="#D4A574"
            stroke="#8B6340"
            strokeWidth={1.5}
          />
        );
      })}

      {/* LÍNEAS DE DOBLEZ VERTICALES */}
      {[x1, x2, x3, x4].map((x, i) => (
        <line
          key={`v${i}`}
          x1={pad + x}
          y1={pad}
          x2={pad + x}
          y2={pad + totalH}
          stroke="#5C3D1E"
          strokeWidth={1}
          strokeDasharray="5,5"
        />
      ))}

      {/* LÍNEAS DE DOBLEZ HORIZONTALES */}
      <line
        x1={pad}
        y1={pad + flap}
        x2={pad + totalW}
        y2={pad + flap}
        stroke="#5C3D1E"
        strokeWidth={1}
        strokeDasharray="5,5"
      />
      <line
        x1={pad}
        y1={pad + flap + H}
        x2={pad + totalW}
        y2={pad + flap + H}
        stroke="#5C3D1E"
        strokeWidth={1}
        strokeDasharray="5,5"
      />

      {/* ÁREA DE IMPRESIÓN */}
      <rect
        x={printX}
        y={printY}
        width={printW}
        height={printH}
        fill="rgba(255,107,0,0.1)"
        stroke="#FF6B00"
        strokeWidth={1.5}
        strokeDasharray="6,3"
      />

      {logoTexto ? (
        <text
          x={printX + printW / 2}
          y={printY + printH / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={Math.max(10, L * 0.07)}
          fill="#FF6B00"
          fontWeight="600"
        >
          {logoTexto}
        </text>
      ) : (
        <text
          x={printX + printW / 2}
          y={printY + printH / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={Math.max(8, L * 0.05)}
          fill="#FF6B00"
          fontWeight="600"
        >
          ZONA DE IMPRESIÓN
        </text>
      )}

      {/* MEDIDAS */}
      <text
        x={pad + x1 + L / 2}
        y={pad + flap + H / 2}
        textAnchor="middle"
        fontSize={10}
        fill="#5C3D1E"
        fontWeight="600"
      >
        {largo} cm
      </text>

      <text
        x={pad + x2 + W / 2}
        y={pad + flap + H / 2}
        textAnchor="middle"
        fontSize={10}
        fill="#5C3D1E"
        fontWeight="600"
      >
        {ancho} cm
      </text>

      {/* TÍTULO */}
      <text
        x={pad + totalW / 2}
        y={pad + totalH + 15}
        textAnchor="middle"
        fontSize={12}
        fill="#333"
        fontWeight="700"
      >
        PLANO RSC — {largo} × {ancho} × {alto} cm
      </text>

      {/* FOOTER */}
      <text
        x={pad + totalW / 2}
        y={pad + totalH + 28}
        textAnchor="middle"
        fontSize={9}
        fill="#888"
      >
        Caja Regular Ranurada (FEFCO 0201)
      </text>
    </svg>
  );
}