export const mockCotizacion = {
  id: 1,
  numero: "OC-2026-001",
  cliente: "María López",
  area: "Ventas",
  largo: 30,
  ancho: 30,
  alto: 20,
  ect: 32,
  cantidad: 500,
  logoTexto: "",
  logoImage: "/logo.jpg",
};

export const mockCotizaciones = [
  { ...mockCotizacion, id: 1, numero: "OC-2026-001", cliente: "María López", cantidad: 500 },
  { id: 2, numero: "OC-2026-002", cliente: "Carlos Pérez", area: "Compras", largo: 45, ancho: 35, alto: 25, ect: 36, cantidad: 200, logoTexto: "", logoImage: "/logo.jpg" },
  { id: 3, numero: "OC-2026-003", cliente: "Ana Ruiz", area: "Almacén", largo: 60, ancho: 40, alto: 30, ect: 40, cantidad: 1000, logoTexto: "", logoImage: "/logo.jpg" },
  { id: 4, numero: "OC-2026-004", cliente: "Jorge Torres", area: "Ventas", largo: 25, ancho: 25, alto: 15, ect: 29, cantidad: 150, logoTexto: "", logoImage: "/logo.jpg" },
];
