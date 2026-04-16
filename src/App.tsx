import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { CotizacionesPage } from "./pages/CotizacionesPage";
import { NuevaCotizacionPage } from "./pages/NuevaCotizacionPage";
import { OrdenesPage } from "./pages/OrdenesPage";
import { InventarioPage } from "./pages/InventarioPage";
import { BoxVisualizerPage } from "./pages/BoxVisualizerPage";
import { Menu } from "lucide-react";
import "./styles.css";

type Page = "cotizaciones" | "nueva-cotizacion" | "ordenes" | "inventario" | "visualizador";

interface BoxData {
  largo: number;
  ancho: number;
  alto: number;
  ect: number;
  logoTexto: string;
  logoImage: string | null;
}

export default function App() {
  const [page, setPage] = useState<Page>("cotizaciones");
  const [selectedCotizacionId, setSelectedCotizacionId] = useState<number | null>(null);
  const [previewData, setPreviewData] = useState<{
    largo: number; ancho: number; alto: number; ect: number; logoTexto: string; logoImage: string | null;
  } | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F7F7F7]">
      {/* Mobile hamburger */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed top-4 left-4 z-50 bg-white shadow-md rounded-xl p-2 md:hidden"
      >
        <Menu size={20} className="text-gray-700" />
      </button>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/30 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <div className={`fixed inset-y-0 left-0 z-50 transform transition-transform md:relative md:transform-none ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        <Sidebar currentPage={page} onNavigate={(p) => { setPage(p); setSidebarOpen(false); }} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>

      <main className="flex-1 ml-0 p-4 md:p-8">
        {page === "cotizaciones" && (
          <CotizacionesPage
            onNueva={() => setPage("nueva-cotizacion")}
            onVerCotizacion={(id) => { setSelectedCotizacionId(id); setPage("visualizador"); }}
          />
        )}
        {page === "nueva-cotizacion" && (
          <NuevaCotizacionPage
            onGuardado={() => setPage("cotizaciones")}
            onVer3D={(data) => { setPreviewData(data); setPage("visualizador"); }}
          />
        )}
        {page === "ordenes" && <OrdenesPage />}
        {page === "inventario" && <InventarioPage />}
        {page === "visualizador" && (
          <BoxVisualizerPage
            cotizacionId={selectedCotizacionId}
            previewData={previewData}
            onBack={() => setPage("cotizaciones")}
          />
        )}
      </main>
    </div>
  );
}
