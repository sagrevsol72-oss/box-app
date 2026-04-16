export function getBoxModel(largo: number, ancho: number, alto: number) {
  const glue = 30;

  const panels = [largo, ancho, largo, ancho];

  const flap = ancho / 2;

  return {
    panels,
    flap,
    glue,
    totalWidth: glue + panels.reduce((a, b) => a + b, 0),
    totalHeight: alto + flap * 2,
  };
}
