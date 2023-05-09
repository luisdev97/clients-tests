import { Router } from "express";

import { login } from "controllers/";
import { validatorLogin } from "middleware";

const router = Router();

router.post("/login", [validatorLogin], login);

export default router;
