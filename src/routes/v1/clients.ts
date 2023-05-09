import { Router } from "express";

import { getClientById, getClientByName } from "../../controllers";
import { checkJwt, checkRole } from "../../middleware";

const router = Router();
const isTestEnvironment = process.env.NODE_ENV == "test";

router.get(
  "/:id",
  isTestEnvironment ? [] : [checkJwt, checkRole(["user", "admin"], true)],
  getClientById
);
router.get(
  "/",
  isTestEnvironment ? [] : [checkJwt, checkRole(["user", "admin"], true)],
  getClientByName
);

export default router;
