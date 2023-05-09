import { Router } from "express";

import { getClientById, getClientByName } from "../../controllers";

const router = Router();

router.get("/:id", getClientById);
router.get("/", getClientByName);

export default router;
