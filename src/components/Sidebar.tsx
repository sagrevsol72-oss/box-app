import { useState } from "react";
import { Package, FileText, Truck, LayoutGrid, Eye, Menu, X } from "lucide-react";

type Page = "cotizaciones" | "nueva-cotizacion" | "ordenes" | "inventario" | "visualizador";

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  isOpen?: boolean;
  onClose?: () => void;
  isMobile?: boolean;
}

const navItems: { id: Page; label: string; icon: React.ReactNode }[] = [
  { id: "cotizaciones", label: "Cotizaciones", icon: <FileText size={20} /> },
  { id: "ordenes", label: "Órdenes de Producción", icon: <Truck size={20} /> },
  { id: "inventario", label: "Inventario", icon: <LayoutGrid size={20} /> },
];

export function Sidebar({ currentPage, onNavigate, isOpen, onClose, isMobile }: SidebarProps) {
  const [open, setOpen] = useState(false);

  const sidebar = (
    <div className={`${isMobile ? "fixed inset-0 z-50 bg-white w-full" : "sticky top-0 h-screen w-64 bg-white border-r border-gray-200"}`}>
      <div className="p-4 md:p-6 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#FF6B00] rounded-lg flex items-center justify-center">
            <Package size={18} color="white" />
          </div>
          <div>
            <h1 className="font-bold text-gray-900 text-lg leading-tight tracking-wide">BOX APP</h1>
            <p className="text-[10px] text-gray-400 tracking-wider">PUNTO KARTON</p>
          </div>
        </div>
        {isMobile && (
          <button onClick={() => setOpen(false)} className="p-2 hover:bg-gray-100 rounded-xl">
            <X size={20} className="text-gray-600" />
          </button>
        )}
      </div>

      <nav className="p-4 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => { onNavigate(item.id); setOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              currentPage === item.id
                ? "bg-[#FF6B00]/10 text-[#FF6B00]"
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>

      <div className="absolute bottom-6 left-4 right-4">
        <button
          onClick={() => { onNavigate("nueva-cotizacion"); setOpen(false); }}
          className="w-full bg-[#FF6B00] hover:bg-[#E56100] text-white font-semibold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          <span className="text-lg">+</span> Nueva Cotización
        </button>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <>
        <button
          onClick={() => setOpen(true)}
          className="fixed top-4 left-4 z-40 bg-white shadow-md rounded-xl p-2 md:hidden"
        >
          <Menu size={20} className="text-gray-700" />
        </button>
        {open && sidebar}
      </>
    );
  }

  return sidebar;
}
