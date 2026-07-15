import express from "express";
import { apiRouter } from "../server/routes";

const app = express();

// Set up large limits for JSON base64 payloads
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
  console.error("Unhandled error encountered in Vercel function:", err);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || "An unexpected error occurred on the server"
  });
});

export default app;
