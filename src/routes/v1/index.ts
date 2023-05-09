import { Router } from "express";

import authRoutes from "./auth";
import clientsRoutes from "./clients";
import policiesRoutes from "./policies";

const router = Router();

router.use("/auth", authRoutes);
router.use("/clients", clientsRoutes);
router.use("/policies", policiesRoutes);

export default router;
