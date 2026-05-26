import {
  agregarMiembro,
  crearGrupo,
  registrarGasto,
  verGasto,
  calcularBalance,
  obtenerTokenGrupo,
  unirseGrupo,
  verGrupos,
  verMiembrosGrupo,
  saldarDeuda,
} from "../controllers/groups.controller.js";
import express from "express";

import { middlewareAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/creargrupo", middlewareAuth, crearGrupo);
router.post("/:groupId/members", middlewareAuth, agregarMiembro);
router.post("/:groupId/registrargasto", middlewareAuth, registrarGasto);
router.post("/join/:inviteToken", middlewareAuth, unirseGrupo);

router.patch(
  "/:groupId/settlements/:settlementId",
  middlewareAuth,
  saldarDeuda,
);

router.get("/:groupId/vergastos", middlewareAuth, verGasto);
router.get("/:groupId/balance", middlewareAuth, calcularBalance);
router.get("/:groupId/invite", middlewareAuth, obtenerTokenGrupo);
router.get("/vergrupos", middlewareAuth, verGrupos);
router.get("/groupdetail/:groupId", middlewareAuth, verMiembrosGrupo);
export default router;
