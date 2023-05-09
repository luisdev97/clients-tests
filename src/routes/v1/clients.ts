import { Router } from "express";

import { getClientById } from "controllers/clients";

const router = Router();

router.get("/:id", getClientById);
export default router;
