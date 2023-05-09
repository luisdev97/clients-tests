import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";

import { Client } from "../../orm/entities/Client/Client.entity";
import { CustomError } from "../../utils/response/custom-error/custom-error";

export const getClientByName = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const clientName = req.query.clientName as string;
  const clientRepository = getRepository(Client);
  try {
    const client = await clientRepository.findOne({
      where: { name: clientName },
    });
    if (!client) {
      const customError = new CustomError(
        404,
        "General",
        `Client with name:${clientName} not found.`,
        ["Client not found."]
      );
      return next(customError);
    }
    res.customSuccess(200, "Client found.", client);
  } catch (err) {
    const customError = new CustomError(
      400,
      "Raw",
      `Can't retrieve client.`,
      null,
      err
    );
    return next(customError);
  }
};
