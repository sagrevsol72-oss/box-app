import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Upload, Eye, Download, FileText } from "lucide-react";
import { BoxPlano2D } from "../components/BoxPlano2D";
import { BoxRender3D } from "../components/BoxRender3D";

const ectOptions = [19, 21, 23, 26, 29, 32, 36, 40, 44, 48, 55, 65];

interface NuevaCotizacionPageProps {
  onGuardado: () => void;
  onVer3D: (data: { largo: number; ancho: number; alto: number; ect: number; logoTexto: string; logoImage: string | null }) => void;
}

export function NuevaCotizacionPage({ onGuardado, onVer3D }: NuevaCotizacionPageProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [form, setForm] = useState({
    cliente: "",
    area: "",
    tipoCaja: "estandar",
    largo: 30,
    ancho: 30,
    alto: 20,
    ect: 32,
    cantidad: 100,
    fechaEntrega: "",
    logoTexto: "",
    notas: "",
  });
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const cotizacionId = 999; // mock id for preview

  return (
    <div className="max-w-5xl">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onGuardado} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Nueva Cotización</h2>
          <p className="text-gray-500 text-sm mt-1">Paso {step} de 3 — {
            step === 1 ? "Datos del producto" : step === 2 ? "Diseño y especificaciones" : "Revisar y guardar"
          }</p>
        </div>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-2 mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${step >= s ? "bg-[#FF6B00] text-white" : "bg-gray-200 text-gray-500"}`}>
              {s}
            </div>
            {s < 3 && <div className={`w-16 h-0.5 ${step > s ? "bg-[#FF6B00]" : "bg-gray-200"}`} />}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className="bg-white rounded-2xl border border-gray-200 p-4 md:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cliente interno</label>
              <input
                type="text"
                value={form.cliente}
                onChange={(e) => setForm({ ...form, cliente: e.target.value })}
                placeholder="Nombre del cliente"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/20 focus:border-[#FF6B00]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Área / Proyecto</label>
              <input
                type="text"
                value={form.area}
                onChange={(e) => setForm({ ...form, area: e.target.value })}
                placeholder="Ej. Ventas, Almacén"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/20 focus:border-[#FF6B00]"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 md:gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Largo (cm)</label>
              <input
                type="number"
                value={form.largo}
                onChange={(e) => setForm({ ...form, largo: Number(e.target.value) })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/20 focus:border-[#FF6B00]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ancho (cm)</label>
              <input
                type="number"
                value={form.ancho}
                onChange={(e) => setForm({ ...form, ancho: Number(e.target.value) })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/20 focus:border-[#FF6B00]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Alto (cm)</label>
              <input
                type="number"
                value={form.alto}
                onChange={(e) => setForm({ ...form, alto: Number(e.target.value) })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/20 focus:border-[#FF6B00]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Resistencia ECT (lbs/pulg)</label>
              <select
                value={form.ect}
                onChange={(e) => setForm({ ...form, ect: Number(e.target.value) })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/20 focus:border-[#FF6B00]"
              >
                {ectOptions.map((e) => (
                  <option key={e} value={e}>{e} {e === 19 ? "(sin garantía)" : ""}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cantidad (piezas)</label>
              <input
                type="number"
                value={form.cantidad}
                onChange={(e) => setForm({ ...form, cantidad: Number(e.target.value) })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/20 focus:border-[#FF6B00]"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Fecha de entrega deseada</label>
            <input
              type="date"
              value={form.fechaEntrega}
              onChange={(e) => setForm({ ...form, fechaEntrega: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/20 focus:border-[#FF6B00]"
            />
          </div>

          <div className="flex justify-end">
            <button onClick={() => setStep(2)} className="bg-[#FF6B00] hover:bg-[#E56100] text-white font-semibold py-3 px-8 rounded-xl transition-colors">
              Siguiente →
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="bg-white rounded-2xl border border-gray-200 p-4 md:p-8 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Texto o logo para impresión</label>
                <input
                  type="text"
                  value={form.logoTexto}
                  onChange={(e) => setForm({ ...form, logoTexto: e.target.value })}
                  placeholder="Ej. Logo Punto Karton"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/20 focus:border-[#FF6B00] mb-3"
                />
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-[#FF6B00]/40 transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="hidden"
                    id="logo-upload"
                  />
                  <label htmlFor="logo-upload" className="cursor-pointer">
                    <Upload size={24} className="mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">Subir imagen de logo (PNG, SVG)</p>
                    <p className="text-xs text-gray-400 mt-1">o arrástrala aquí</p>
                  </label>
                </div>
                {logoPreview && (
                  <div className="mt-3 p-3 bg-gray-50 rounded-xl flex items-center gap-3">
                    <img src={logoPreview} alt="Logo preview" className="w-12 h-12 object-contain" />
                    <span className="text-sm text-gray-600">{logoFile?.name}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notas adicionales</label>
                <textarea
                  value={form.notas}
                  onChange={(e) => setForm({ ...form, notas: e.target.value })}
                  placeholder="Indicaciones especiales..."
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/20 focus:border-[#FF6B00] resize-none"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Vista previa</h3>
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className="text-sm text-[#FF6B00] hover:text-[#E56100] font-medium flex items-center gap-1"
                >
                  <Eye size={16} />
                  {showPreview ? "Ocultar" : "Mostrar"} preview
                </button>
              </div>

              {showPreview && (
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  <div className="bg-gray-100 p-4">
                    <BoxPlano2D
                      largo={form.largo}
                      ancho={form.ancho}
                      alto={form.alto}
                      logoTexto={form.logoTexto}
                      logoImage={logoPreview}
                    />
                  </div>
                  <div className="p-4 text-center">
                    <p className="text-xs text-gray-500 mb-2">Plano 2D extendido</p>
                    <div className="flex justify-center gap-2">
                      <button className="text-xs text-[#FF6B00] hover:text-[#E56100] font-medium flex items-center gap-1">
                        <Download size={14} /> Descargar SVG
                      </button>
                      <button className="text-xs text-[#FF6B00] hover:text-[#E56100] font-medium flex items-center gap-1">
                        <FileText size={14} /> Descargar PDF
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <button
                onClick={() => onVer3D({ largo: form.largo, ancho: form.ancho, alto: form.alto, ect: form.ect, logoTexto: form.logoTexto, logoImage: logoPreview })}
                className="w-full border border-gray-200 rounded-xl p-4 hover:bg-gray-50 transition-colors text-left"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Vista 3D interactiva</p>
                    <p className="text-xs text-gray-500 mt-0.5">Rotar, zoom y exportar imagen</p>
                  </div>
                  <Eye size={20} className="text-gray-400" />
                </div>
              </button>
            </div>
          </div>

          <div className="flex justify-between">
            <button onClick={() => setStep(1)} className="text-gray-600 hover:text-gray-900 font-medium py-3 px-6 transition-colors">
              ← Atrás
            </button>
            <button onClick={() => setStep(3)} className="bg-[#FF6B00] hover:bg-[#E56100] text-white font-semibold py-3 px-8 rounded-xl transition-colors">
              Siguiente →
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="bg-white rounded-2xl border border-gray-200 p-8">
          <h3 className="font-semibold text-gray-900 mb-6">Resumen de la cotización</h3>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Cliente</span>
                <span className="font-medium text-gray-900">{form.cliente || "—"}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Área</span>
                <span className="font-medium text-gray-900">{form.area || "—"}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Medidas</span>
                <span className="font-medium text-gray-900">{form.largo} × {form.ancho} × {form.alto} cm</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">ECT</span>
                <span className="font-medium text-gray-900">{form.ect} lbs/pulg</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Cantidad</span>
                <span className="font-medium text-gray-900">{form.cantidad.toLocaleString()} pzas</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Fecha entrega</span>
                <span className="font-medium text-gray-900">{form.fechaEntrega || "—"}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Logo/Texto</span>
                <span className="font-medium text-gray-900">{form.logoTexto || logoFile?.name || "—"}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-8">
            <button onClick={() => setStep(2)} className="text-gray-600 hover:text-gray-900 font-medium py-3 px-6 transition-colors">
              ← Atrás
            </button>
            <div className="flex gap-3">
              <button onClick={onGuardado} className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-colors">
                Guardar como borrador
              </button>
              <button onClick={onGuardado} className="bg-[#FF6B00] hover:bg-[#E56100] text-white font-semibold py-3 px-8 rounded-xl transition-colors">
                Crear cotización ✓
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
