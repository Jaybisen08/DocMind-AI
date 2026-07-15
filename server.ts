import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { apiRouter } from "./server/routes";

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT || 3000);

  // Mount JSON and URL-encoded parsers with large limits for base64 file payloads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  // Register API routes
  app.use("/api", apiRouter);

  // Handle JSON parsing errors specifically
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (err instanceof SyntaxError && "status" in err && err.status === 400 && "body" in err) {
      res.status(400).json({
        success: false,
        error: "Invalid JSON payload"
      });
      return;
    }
    next(err);
  });

  // Global generic error handler
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error("Unhandled error encountered:", err);
    res.status(err.status || 500).json({
      success: false,
      error: err.message || "An unexpected error occurred on the server"
    });
  });

  // Serve Vite or static assets depending on environment
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in development mode with Vite middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in production mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`DocMind AI full-stack server running at http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Critical error starting server:", err);
});
