import { serve } from "bun";

serve({
  port: 3000,
  async fetch(req) {
    const url = new URL(req.url);
    let path = url.pathname;

    if (path === "/") {
      path = "/index.html";
    }

    const filePath = `dist${path}`;
    const file = Bun.file(filePath);

    if (!(await file.exists())) {
      return new Response(Bun.file("dist/index.html"));
    }

    return new Response(file);
  },
});

console.log("Server running at http://localhost:3000");
