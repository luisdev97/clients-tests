import { Router } from "express";

import { getClientById } from "../../controllers/clients";
import { getClientByName } from "../../controllers/clients/get-client-by-name";

const router = Router();

router.get("/:id", getClientById);
router.get("/", getClientByName);

export default router;
