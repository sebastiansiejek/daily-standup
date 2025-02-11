import path from "path";
import express from "express";
import { fileURLToPath } from "url";
import open from "open";
import {getTimeEntriesWithJira} from "@src/services/getTimeEntriesWithJiraStatus.js";

export const server = () => {
  const app = express();
  const PORT = process.env.PORT || 3000;
  const isDev = process.env.NODE_ENV !== "production";

  app.get("/api/data", async (req, res) => {
    const data = await getTimeEntriesWithJira()

    res.json(data);
  });

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  if (!isDev) {
    const frontendPath = path.join(__dirname, "../../frontend/dist");

    app.use(express.static(frontendPath));

    app.get("*", (req, res) => {
      res.sendFile(path.join(frontendPath, "index.html"));
    });
  } else {
    console.log("🚀 Running in development mode, frontend served by Vite.");
  }

  app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);

    if (isDev) {
      open("http://localhost:5173");
    } else {
      open(`http://localhost:${PORT}`);
    }
  });
}
