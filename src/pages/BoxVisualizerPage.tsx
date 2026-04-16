import { ArrowLeft, Download } from "lucide-react";
import { BoxPlano2D } from "../components/BoxPlano2D";
import { BoxRender3D } from "../components/BoxRender3D";
import { mockCotizacion } from "../data/mockData";

interface BoxData {
  largo: number;
  ancho: number;
  alto: number;
  ect: number;
  cantidad: number;
  logoTexto?: string;
  logoImage?: string | null;
}

interface BoxVisualizerPageProps {
  cotizacionId: number | null;
  previewData: BoxData | null;
  onBack: () => void;
}

export function BoxVisualizerPage({ cotizacionId, previewData, onBack }: BoxVisualizerPageProps) {
  const data = previewData || mockCotizacion;
  const { largo, ancho, alto, ect, logoTexto, logoImage } = data;

  return (
    <div className="max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">Vista Previa</h2>
            <p className="text-gray-500 text-sm mt-1">{largo}×{ancho}×{alto} cm · ECT {ect}</p>
          </div>
        </div>
        <button className="flex items-center gap-2 bg-[#FF6B00] hover:bg-[#E56100] text-white font-semibold py-3 px-6 rounded-xl transition-colors">
          <Download size={18} />
          Exportar
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-4 md:p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Render 3D</h3>
          <BoxRender3D
            largo={largo}
            ancho={ancho}
            alto={alto}
            ect={ect}
            logoTexto={logoTexto}
            logoImage={logoImage}
          />
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-4 md:p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Plano 2D Extendido</h3>
          <div className="bg-gray-50 rounded-xl p-4 overflow-x-auto">
            <BoxPlano2D
              largo={largo}
              ancho={ancho}
              alto={alto}
              logoTexto={logoTexto}
              logoImage={logoImage}
            />
          </div>
          <p className="text-xs text-gray-400 mt-3 text-center">Desarrollo plano — Caja Regular Ranurada</p>
        </div>
      </div>

      <div className="mt-6 bg-white rounded-2xl border border-gray-200 p-4 md:p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Especificaciones</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Largo</p>
            <p className="font-semibold text-gray-900">{largo} cm</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Ancho</p>
            <p className="font-semibold text-gray-900">{ancho} cm</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Alto</p>
            <p className="font-semibold text-gray-900">{alto} cm</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">ECT</p>
            <p className="font-semibold text-gray-900">{ect} lbs/pulg</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Logo</p>
            <p className="font-semibold text-gray-900">{logoTexto || "—"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}