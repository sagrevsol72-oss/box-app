import { useState } from "react";
import { Truck, CheckCircle, Clock, Scissors, Package, ArrowRight, ChevronRight } from "lucide-react";

interface Orden {
  id: number;
  numero: string;
  cotizacion: string;
  cliente: string;
  fecha: string;
  cantidad: number;
  estado: "pendiente" | "corrugado" | "cortado" | "ensamblado" | "entregado";
  progreso: number;
}

const mockOrdenes: Orden[] = [
  { id: 1, numero: "OP-2026-001", cotizacion: "OC-2026-001", cliente: "María López", fecha: "2026-04-10", cantidad: 500, estado: "ensamblado", progreso: 75 },
  { id: 2, numero: "OP-2026-002", cotizacion: "OC-2026-002", cliente: "Carlos Pérez", fecha: "2026-04-12", cantidad: 200, estado: "corrugado", progreso: 25 },
  { id: 3, numero: "OP-2026-003", cotizacion: "OC-2026-003", cliente: "Ana Ruiz", fecha: "2026-04-14", cantidad: 1000, estado: "cortado", progreso: 50 },
];

const estadoConfig: Record<string, { icon: React.ReactNode; label: string; color: string; bg: string }> = {
  pendiente: { icon: <Clock size={14} />, label: "Pendiente", color: "text-amber-600", bg: "bg-amber-50" },
  corrugado: { icon: <Package size={14} />, label: "Corrugado", color: "text-blue-600", bg: "bg-blue-50" },
  cortado: { icon: <Scissors size={14} />, label: "Cortado", color: "text-purple-600", bg: "bg-purple-50" },
  ensamblado: { icon: <CheckCircle size={14} />, label: "Ensamblado", color: "text-green-600", bg: "bg-green-50" },
  entregado: { icon: <Truck size={14} />, label: "Entregado", color: "text-gray-600", bg: "bg-gray-100" },
};

const etapas = ["pendiente", "corrugado", "cortado", "ensamblado", "entregado"];

export function OrdenesPage() {
  const [selectedOrden, setSelectedOrden] = useState<Orden | null>(null);

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Órdenes de Producción</h2>
        <p className="text-gray-500 text-sm mt-1">Seguimiento de órdenes activas</p>
      </div>

      <div className="grid gap-4">
        {mockOrdenes.map((orden) => {
          const est = estadoConfig[orden.estado];
          const estadoIdx = etapas.indexOf(orden.estado);

          return (
            <div
              key={orden.id}
              onClick={() => setSelectedOrden(orden)}
              className="bg-white rounded-2xl border border-gray-200 p-6 hover:border-[#FF6B00]/30 hover:shadow-sm transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#FF6B00]/10 rounded-xl flex items-center justify-center">
                    <Truck size={18} className="text-[#FF6B00]" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{orden.numero}</p>
                    <p className="text-xs text-gray-400">{orden.cotizacion} · {orden.cliente}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${est.bg} ${est.color}`}>
                    {est.icon}
                    {est.label}
                  </span>
                  <ChevronRight size={18} className="text-gray-400" />
                </div>
              </div>

              {/* Progress bar */}
              <div className="flex items-center gap-1 mb-3">
                {etapas.map((etapa, idx) => (
                  <div key={etapa} className="flex items-center flex-1">
                    <div className={`h-1.5 flex-1 rounded-full ${idx <= estadoIdx ? "bg-[#FF6B00]" : "bg-gray-200"}`} />
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{orden.cantidad.toLocaleString()} pzas</span>
                <span>{orden.fecha}</span>
              </div>
            </div>
          );
        })}
      </div>

      {mockOrdenes.length === 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
          <Truck size={40} className="mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500">No hay órdenes de producción activas</p>
        </div>
      )}
    </div>
  );
}
