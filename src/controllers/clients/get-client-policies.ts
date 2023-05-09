import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";

import { Client, Policy } from "../../orm/entities";
import { CustomError } from "../../utils";

export const getClientPolicies = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const clientName = req.query.clientName;
  const clientRepository = getRepository(Client);
  const policyRepository = getRepository(Policy);

  try {
    const client = await clientRepository.findOne({
      where: { name: clientName },
      select: ["id", "name", "email"],
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
    const policies = await policyRepository.find({
      where: { client: { id: client.id } },
    });
    client.policies = policies;
    res.customSuccess(200, "Client Policies.", client);
  } catch (err) {
    const customError = new CustomError(300, "General", "Error", null, err);
    return next(customError);
  }
};
