import { useState, useRef } from "react";
import { RotateCw, ZoomIn, ZoomOut, Camera } from "lucide-react";

interface BoxRender3DProps {
  largo: number;
  ancho: number;
  alto: number;
  ect?: number;
  logoTexto?: string;
  logoImage?: string | null;
}

export function BoxRender3D({ largo, ancho, alto, ect, logoTexto, logoImage }: BoxRender3DProps) {
  const [rotation, setRotation] = useState({ x: -20, y: 30 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const scale = 7;
  const lw = largo * scale;
  const aw = ancho * scale;
  const av = alto * scale;

  const containerRef = useRef<HTMLDivElement>(null);

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setLastPos({ x: e.clientX, y: e.clientY });
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - lastPos.x;
    const dy = e.clientY - lastPos.y;
    setRotation((r) => ({ x: r.x + dy * 0.5, y: r.y + dx * 0.5 }));
    setLastPos({ x: e.clientX, y: e.clientY });
  };

  const onMouseUp = () => setIsDragging(false);

  const resetView = () => {
    setRotation({ x: -20, y: 30 });
    setZoom(1);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setZoom((z) => Math.min(3, Math.max(0.5, z - e.deltaY * 0.002)));
  };

  // Face colors
  const frontGrad = "linear-gradient(135deg, #C4956A 0%, #D4A574 50%, #C4956A 100%)";
  const sideGrad = "linear-gradient(135deg, #B8895A 0%, #C99A64 50%, #B8895A 100%)";
  const topGrad = "linear-gradient(135deg, #D9B07A 0%, #E5C08A 50%, #D9B07A 100%)";

  return (
    <div className="space-y-4">
      <div
        ref={containerRef}
        className="relative bg-gradient-to-b from-gray-100 to-gray-200 rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing select-none"
        style={{ height: 300 }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onWheel={handleWheel}
      >
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ perspective: 500, perspectiveOrigin: "50% 50%" }}
        >
          <div
            style={{
              transformStyle: "preserve-3d",
              transform: `scale(${zoom}) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
              transition: isDragging ? "none" : "transform 0.3s ease",
            }}
          >
            {/* Front face (largo x alto) */}
            <div
              className="absolute flex items-center justify-center border border-[#8B6340]"
              style={{
                width: lw,
                height: av,
                background: frontGrad,
                transform: `translateZ(${aw / 2}px)`,
                backfaceVisibility: "hidden",
                boxShadow: "inset 0 0 20px rgba(0,0,0,0.1)",
              }}
            >
              {logoTexto && (
                <span className="text-center text-[#5C3D1E] font-bold" style={{ fontSize: Math.min(lw * 0.1, av * 0.15) }}>
                  {logoTexto}
                </span>
              )}
              {logoImage && (
                <img src={logoImage} alt="Logo" className="max-w-[70%] max-h-[70%] object-contain" />
              )}
              {!logoTexto && !logoImage && (
                <span className="text-[#8B6340]/30 text-xs">Frente</span>
              )}
            </div>

            {/* Back face */}
            <div
              className="absolute flex items-center justify-center border border-[#8B6340]"
              style={{
                width: lw,
                height: av,
                background: sideGrad,
                transform: `translateZ(${-aw / 2}px) rotateY(180deg)`,
                backfaceVisibility: "hidden",
                boxShadow: "inset 0 0 15px rgba(0,0,0,0.15)",
              }}
            >
              <span className="text-[#8B6340]/30 text-xs">Atrás</span>
            </div>

            {/* Left face (ancho x alto) */}
            <div
              className="absolute flex items-center justify-center border border-[#8B6340]"
              style={{
                width: aw,
                height: av,
                background: sideGrad,
                transform: `rotateY(-90deg) translateZ(${lw / 2}px)`,
                backfaceVisibility: "hidden",
                boxShadow: "inset 0 0 15px rgba(0,0,0,0.12)",
              }}
            >
              <span className="text-[#8B6340]/30 text-xs">Lado</span>
            </div>

            {/* Right face */}
            <div
              className="absolute flex items-center justify-center border border-[#8B6340]"
              style={{
                width: aw,
                height: av,
                background: sideGrad,
                transform: `rotateY(90deg) translateZ(${lw / 2}px)`,
                backfaceVisibility: "hidden",
                boxShadow: "inset 0 0 15px rgba(0,0,0,0.12)",
              }}
            >
              <span className="text-[#8B6340]/30 text-xs">Lado</span>
            </div>

            {/* Top face (largo x ancho) - closed with two flaps meeting at center */}
            <div
              className="absolute border border-[#8B6340]"
              style={{
                width: lw,
                height: aw,
                background: topGrad,
                transform: `rotateX(90deg) translateZ(${av / 2}px)`,
                backfaceVisibility: "hidden",
                boxShadow: "inset 0 0 20px rgba(0,0,0,0.08)",
              }}
            >
              {/* Left flap seam */}
              <div
                className="absolute top-0 left-0 border-r border-dashed border-[#8B6340]/50"
                style={{ width: "50%", height: "100%" }}
              />
              {/* Logo on top */}
              {logoTexto && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[#5C3D1E]/40 font-bold" style={{ fontSize: Math.min(lw * 0.08, aw * 0.1) }}>
                    {logoTexto}
                  </span>
                </div>
              )}
              {!logoTexto && <span className="text-[#8B6340]/20 text-xs absolute top-2 left-2">Tapa</span>}
            </div>

            {/* Bottom face */}
            <div
              className="absolute border border-[#8B6340]"
              style={{
                width: lw,
                height: aw,
                background: sideGrad,
                transform: `rotateX(-90deg) translateZ(${av / 2}px)`,
                backfaceVisibility: "hidden",
                boxShadow: "inset 0 0 10px rgba(0,0,0,0.2)",
              }}
            >
              <span className="text-[#8B6340]/20 text-xs absolute bottom-2 right-2">Fondo</span>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm">
          <button onClick={resetView} className="p-1.5 hover:bg-gray-100 rounded-full transition-colors" title="Resetear vista">
            <RotateCw size={16} className="text-gray-600" />
          </button>
          <button onClick={() => setZoom((z) => Math.min(3, z + 0.2))} className="p-1.5 hover:bg-gray-100 rounded-full transition-colors" title="Acercar">
            <ZoomIn size={16} className="text-gray-600" />
          </button>
          <button onClick={() => setZoom((z) => Math.max(0.5, z - 0.2))} className="p-1.5 hover:bg-gray-100 rounded-full transition-colors" title="Alejar">
            <ZoomOut size={16} className="text-gray-600" />
          </button>
          <div className="w-px h-4 bg-gray-200" />
          <span className="text-xs text-gray-500 px-2">{largo}×{ancho}×{alto} cm</span>
        </div>

        <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-sm">
          <Camera size={14} className="text-[#FF6B00]" />
          <span className="text-xs font-medium text-gray-600">ECT {ect || 32}</span>
        </div>
      </div>

      <p className="text-center text-xs text-gray-400">Arrastra para rotar • Scroll para zoom</p>
    </div>
  );
}