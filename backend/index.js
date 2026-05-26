import dotenv from "dotenv";
import express from "express";
import auth from "./src/routes/auth.routes.js";
import groups from "./src/routes/groups.routes.js";
import { middlewareError } from "./src/middleware/err.middleware.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL }));

app.use(express.json());
app.use("/api/auth", auth);
app.use("/api/groups", groups);

app.use(middlewareError);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Servidor escuchando ${process.env.PORT || 3000}`);
});
