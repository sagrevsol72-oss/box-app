import { serve } from "bun";

const PORT = 54010;
const ROOT = "./dist";
const PUBLIC = "./public";

const server = serve({
  port: PORT,
  fetch(req) {
    const url = new URL(req.url);
    let path = url.pathname;

    if (path === "/" || path === "") path = "/index.html";

    // Check dist first
    let filePath = `${ROOT}${path}`;
    let file = Bun.file(filePath);
    let exists = file.exists();

    // If not in dist, check public
    if (!exists) {
      filePath = `${PUBLIC}${path}`;
      file = Bun.file(filePath);
      exists = file.exists();
    }

    if (exists) {
      return new Response(file, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, OPTIONS",
        }
      });
    }
    return new Response("Not Found", { status: 404 });
  },
});

console.log(`Server running at http://localhost:${PORT}`);