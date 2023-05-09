import { Router } from "express";

import {
  getClientById,
  getClientByName,
  getClientPolicies,
} from "../../controllers";
import { checkJwt, checkRole } from "../../middleware";

const router = Router();
const isTestEnvironment = process.env.NODE_ENV == "test";

router.get(
  "/",
  isTestEnvironment ? [] : [checkJwt, checkRole(["user", "admin"], true)],
  getClientByName
);

router.get(
  "/policies",
  isTestEnvironment ? [] : [checkJwt, checkRole(["admin"], true)],
  getClientPolicies
);

router.get(
  "/:id",
  isTestEnvironment ? [] : [checkJwt, checkRole(["user", "admin"], true)],
  getClientById
);

export default router;
