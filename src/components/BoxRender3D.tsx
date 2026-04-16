import { useState } from "react";

interface Props {
  largo: number;
  ancho: number;
  alto: number;
  logoImage?: string | null;
}

export function BoxRender3D({ largo, ancho, alto, logoImage }: Props) {
  const [rot, setRot] = useState({ x: -20, y: 30 });
  const S = 3;
  const L = largo * S;
  const W = ancho * S;
  const H = alto * S;

  const flapAngle = 65;
  const faceBase: React.CSSProperties = {
    position: "absolute",
    border: "1px solid #8B6340",
    backgroundColor: "#D4A574",
    backfaceVisibility: "inherit",
  };

  const topFlapStyle = (width: number, height: number): React.CSSProperties => ({
    position: "absolute",
    width: width,
    height: height,
    top: -height,
    left: 0,
    backgroundColor: "#E5C08A",
    border: "1px solid #8B6340",
    transformOrigin: "bottom",
  });

  return (
    <div style={{ height: 450, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", background: "#f9f9f9", perspective: 1200 }}>
      <div style={{ width: L, height: H, transformStyle: "preserve-3d", transform: `rotateX(${rot.x}deg) rotateY(${rot.y}deg)`, transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)" }}>
        {/* FRONT FACE + TOP FLAP */}
        <div style={{ ...faceBase, width: L, height: H, transform: `translateZ(${W / 2}px)`, display: "flex", justifyContent: "center", alignItems: "center" }}>
          {logoImage && <img src={logoImage} style={{ width: "80%", height: "80%", objectFit: "contain" }} alt="Logo" />}
          <div style={{ ...topFlapStyle(L, W / 2), transform: `rotateX(${flapAngle}deg)` }} />
        </div>

        {/* BACK FACE + TOP FLAP */}
        <div style={{ ...faceBase, width: L, height: H, transform: `rotateY(180deg) translateZ(${W / 2}px)`, backgroundColor: "#C99A64" }}>
          <div style={{ ...topFlapStyle(L, W / 2), transform: `rotateX(${flapAngle}deg)` }} />
        </div>

        {/* LEFT FACE + TOP FLAP */}
        <div style={{ ...faceBase, width: W, height: H, left: (L - W) / 2, transform: `rotateY(-90deg) translateZ(${L / 2}px)`, backgroundColor: "#BC8F5F" }}>
          <div style={{ ...topFlapStyle(W, L / 2), transform: `rotateX(${flapAngle}deg)` }} />
        </div>

        {/* RIGHT FACE + TOP FLAP */}
        <div style={{ ...faceBase, width: W, height: H, left: (L - W) / 2, transform: `rotateY(90deg) translateZ(${L / 2}px)`, backgroundColor: "#BC8F5F" }}>
          <div style={{ ...topFlapStyle(W, L / 2), transform: `rotateX(${flapAngle}deg)` }} />
        </div>

        {/* BOTTOM */}
        <div style={{ ...faceBase, width: L, height: W, top: (H - W) / 2, transform: `rotateX(-90deg) translateZ(${H / 2}px)`, backgroundColor: "#8B6340" }} />
      </div>

      <button onClick={() => setRot(r => ({ ...r, y: r.y + 45 }))} style={{ marginTop: 60, padding: "12px 24px", fontSize: "18px", backgroundColor: "#8B6340", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
        Girar Caja
      </button>
    </div>
  );
}