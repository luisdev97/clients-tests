import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";

import { Client, Role } from "../../orm/entities";
import { JwtPayload } from "../../types/JwtPayload";
import { CustomError, createJwtToken } from "../../utils";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  const userRepository = getRepository(Client);
  try {
    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      const customError = new CustomError(404, "General", "Not Found", [
        "There is no client with this email",
      ]);
      return next(customError);
    }

    if (!user.checkIfPasswordMatch(password)) {
      const customError = new CustomError(401, "General", "Unauthorized", [
        "Incorrect password",
      ]);
      return next(customError);
    }

    const jwtPayload: JwtPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role as Role,
    };

    try {
      const token = createJwtToken(jwtPayload);
      res.customSuccess(200, "Token successfully created.", `Bearer ${token}`);
    } catch (err) {
      console.log(err);
      const customError = new CustomError(
        400,
        "Raw",
        "Token can't be created",
        null,
        err
      );
      return next(customError);
    }
  } catch (err) {
    const customError = new CustomError(400, "Raw", "Error", null, err);
    return next(customError);
  }
};
