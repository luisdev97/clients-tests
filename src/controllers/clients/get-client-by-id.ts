import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";

import { Client as ClientEntity } from "../../orm/entities/Client/Client.entity";

export const getClientById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  const clientRepository = getRepository(ClientEntity);
  const client = await clientRepository.findOne(id);
  res.customSuccess(200, "Client found.", client);
};
