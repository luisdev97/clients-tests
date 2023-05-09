import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";

import { Client as ClientEntity } from "../../orm/entities/Client/Client.entity";
import { CustomError } from "../../utils/response/custom-error/custom-error";

export const getClientById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  const clientRepository = getRepository(ClientEntity);
  try {
    const client = await clientRepository.findOne(id);
    if (!client) {
      const customError = new CustomError(
        404,
        "General",
        `Client with id:${id} not found.`,
        ["Client not found."]
      );
      return next(customError);
    }
    res.customSuccess(200, "Client found.", client);
  } catch (err) {
    const customError = new CustomError(400, "Raw", "Error", null, err);
    return next(customError);
  }
};
