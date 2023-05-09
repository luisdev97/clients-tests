import { Router } from "express";

import { getPoliceClient } from "controllers";

import { checkJwt, checkRole } from "../../middleware";

const router = Router();
const isTestEnvironment = process.env.NODE_ENV == "test";

router.get(
  "/:policyId/associated-client",
  isTestEnvironment ? [] : [checkJwt, checkRole(["admin"], true)],
  getPoliceClient
);
export default router;
