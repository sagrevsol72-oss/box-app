import { useState } from "react";
import { FileText, Eye, CheckCircle, XCircle, Clock, ChevronRight, Search, Filter } from "lucide-react";

interface Cotizacion {
  id: number;
  numero: string;
  cliente: string;
  area: string;
  fecha: string;
  medidas: string;
  cantidad: number;
  ect: number;
  total: number;
  estado: "pendiente" | "en_revision" | "aprobada" | "rechazada";
}

const mockCotizaciones: Cotizacion[] = [
  { id: 1, numero: "OC-2026-001", cliente: "María López", area: "Ventas", fecha: "2026-04-10", medidas: "30×30×20", cantidad: 500, ect: 32, total: 12500, estado: "aprobada" },
  { id: 2, numero: "OC-2026-002", cliente: "Carlos Pérez", area: "Almacén", fecha: "2026-04-12", medidas: "40×40×30", cantidad: 200, ect: 36, total: 8400, estado: "en_revision" },
  { id: 3, numero: "OC-2026-003", cliente: "Ana Ruiz", area: "Producción", fecha: "2026-04-14", medidas: "25×25×15", cantidad: 1000, ect: 26, total: 15000, estado: "pendiente" },
  { id: 4, numero: "OC-2026-004", cliente: "Jorge Torres", area: "Ventas", fecha: "2026-04-08", medidas: "50×40×35", cantidad: 150, ect: 44, total: 11250, estado: "rechazada" },
];

const estadoStyles: Record<string, { bg: string; text: string; icon: React.ReactNode; label: string }> = {
  pendiente: { bg: "bg-amber-50", text: "text-amber-600", icon: <Clock size={14} />, label: "Pendiente" },
  en_revision: { bg: "bg-blue-50", text: "text-blue-600", icon: <Search size={14} />, label: "En Revisión" },
  aprobada: { bg: "bg-green-50", text: "text-green-600", icon: <CheckCircle size={14} />, label: "Aprobada" },
  rechazada: { bg: "bg-red-50", text: "text-red-600", icon: <XCircle size={14} />, label: "Rechazada" },
};

interface CotizacionesPageProps {
  onNueva: () => void;
  onVerCotizacion: (id: number) => void;
}

export function CotizacionesPage({ onNueva, onVerCotizacion }: CotizacionesPageProps) {
  const [filtroEstado, setFiltroEstado] = useState<string>("todos");
  const [busqueda, setBusqueda] = useState("");

  const filtradas = mockCotizaciones.filter((c) => {
    const matchEstado = filtroEstado === "todos" || c.estado === filtroEstado;
    const matchBusqueda = c.numero.toLowerCase().includes(busqueda.toLowerCase()) || c.cliente.toLowerCase().includes(busqueda.toLowerCase());
    return matchEstado && matchBusqueda;
  });

  return (
    <div className="max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Cotizaciones</h2>
          <p className="text-gray-500 text-sm mt-1">Administra las solicitudes de cotización</p>
        </div>
        <button
          onClick={onNueva}
          className="bg-[#FF6B00] hover:bg-[#E56100] text-white font-semibold py-3 px-6 rounded-xl transition-colors"
        >
          + Nueva Cotización
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por número o cliente..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/20 focus:border-[#FF6B00]"
          />
        </div>
        <div className="flex gap-2">
          {["todos", "pendiente", "en_revision", "aprobada", "rechazada"].map((estado) => (
            <button
              key={estado}
              onClick={() => setFiltroEstado(estado)}
              className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                filtroEstado === estado ? "bg-[#FF6B00] text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {estado === "todos" ? "Todos" : estadoStyles[estado]?.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Orden</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Cliente</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Medidas</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Cantidad</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">ECT</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Total</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Estado</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtradas.map((cot) => {
              const est = estadoStyles[cot.estado];
              return (
                <tr key={cot.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <FileText size={16} className="text-gray-400" />
                      <span className="font-medium text-gray-900">{cot.numero}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">{cot.fecha}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">{cot.cliente}</p>
                    <p className="text-xs text-gray-400">{cot.area}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{cot.medidas} cm</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{cot.cantidad.toLocaleString()} pzas</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{cot.ect} lbs/pulg</td>
                  <td className="px-6 py-4 font-semibold text-gray-900">${cot.total.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${est.bg} ${est.text}`}>
                      {est.icon}
                      {est.label}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => onVerCotizacion(cot.id)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Ver detalles"
                    >
                      <Eye size={18} className="text-gray-500" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtradas.length === 0 && (
          <div className="p-12 text-center">
            <FileText size={40} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500">No se encontraron cotizaciones</p>
          </div>
        )}
      </div>
    </div>
  );
}
