import { useState } from "react";
import { LayoutGrid, AlertTriangle, Plus, Search, ArrowUpDown } from "lucide-react";

interface InventarioItem {
  id: number;
  codigo: string;
  nombre: string;
  categoria: string;
  stock: number;
  stockMin: number;
  unidad: string;
  ubicacion: string;
}

const mockInventario: InventarioItem[] = [
  { id: 1, codigo: "CAJ-001", nombre: "Caja 20×20", categoria: "Cajas", stock: 500, stockMin: 100, unidad: "pzas", ubicacion: "Almacén A" },
  { id: 2, codigo: "CAJ-002", nombre: "Caja 30×30", categoria: "Cajas", stock: 80, stockMin: 100, unidad: "pzas", ubicacion: "Almacén A" },
  { id: 3, codigo: "CAJ-003", nombre: "Caja 40×40", categoria: "Cajas", stock: 200, stockMin: 50, unidad: "pzas", ubicacion: "Almacén B" },
  { id: 4, codigo: "LAM-001", nombre: "Lámina corrugada 1.5mm", categoria: "Materia Prima", stock: 45, stockMin: 20, unidad: "pzas", ubicacion: "Planta" },
  { id: 5, codigo: "LAM-002", nombre: "Lámina corrugada 2mm", categoria: "Materia Prima", stock: 12, stockMin: 20, unidad: "pzas", ubicacion: "Planta" },
];

export function InventarioPage() {
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("todos");
  const [mostrarSoloBajo, setMostrarSoloBajo] = useState(false);

  const categorias = ["todos", ...Array.from(new Set(mockInventario.map((i) => i.categoria)))];

  const filtradas = mockInventario.filter((item) => {
    const matchBusqueda = item.nombre.toLowerCase().includes(busqueda.toLowerCase()) || item.codigo.toLowerCase().includes(busqueda.toLowerCase());
    const matchCategoria = categoria === "todos" || item.categoria === categoria;
    const matchBajo = !mostrarSoloBajo || item.stock < item.stockMin;
    return matchBusqueda && matchCategoria && matchBajo;
  });

  const itemsBajos = mockInventario.filter((i) => i.stock < i.stockMin);

  return (
    <div className="max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Inventario</h2>
          <p className="text-gray-500 text-sm mt-1">Control de stock y alertas</p>
        </div>
        <button className="bg-[#FF6B00] hover:bg-[#E56100] text-white font-semibold py-3 px-6 rounded-xl transition-colors flex items-center gap-2">
          <Plus size={18} /> Agregar item
        </button>
      </div>

      {/* Alert cards */}
      {itemsBajos.length > 0 && (
        <div className="mb-6 bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center gap-3">
          <AlertTriangle size={20} className="text-amber-600" />
          <p className="text-sm text-amber-800">
            <span className="font-semibold">{itemsBajos.length} producto{itemsBajos.length > 1 ? "s" : ""} con stock bajo:</span>{" "}
            {itemsBajos.map((i) => i.nombre).join(", ")}
          </p>
        </div>
      )}

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por código o nombre..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/20 focus:border-[#FF6B00]"
          />
        </div>
        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          className="px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/20"
        >
          {categorias.map((cat) => (
            <option key={cat} value={cat}>{cat === "todos" ? "Todas las categorías" : cat}</option>
          ))}
        </select>
        <button
          onClick={() => setMostrarSoloBajo(!mostrarSoloBajo)}
          className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
            mostrarSoloBajo ? "bg-amber-100 text-amber-700 border border-amber-200" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
          }`}
        >
          <AlertTriangle size={16} className="inline mr-1" />
          Stock bajo
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Código</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Producto</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Categoría</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Stock</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Stock Mín</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Ubicación</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtradas.map((item) => {
              const bajo = item.stock < item.stockMin;
              return (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-900">{item.codigo}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{item.nombre}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{item.categoria}</td>
                  <td className="px-6 py-4">
                    <span className={`font-semibold ${bajo ? "text-amber-600" : "text-gray-900"}`}>
                      {item.stock.toLocaleString()}
                    </span>
                    <span className="text-gray-400 text-xs ml-1">{item.unidad}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{item.stockMin}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{item.ubicacion}</td>
                  <td className="px-6 py-4">
                    {bajo ? (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-50 text-amber-600 rounded-full text-xs font-medium">
                        <AlertTriangle size={12} /> Bajo
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 text-green-600 rounded-full text-xs font-medium">
                        OK
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtradas.length === 0 && (
          <div className="p-12 text-center">
            <LayoutGrid size={40} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500">No se encontraron items</p>
          </div>
        )}
      </div>
    </div>
  );
}
