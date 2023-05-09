//Get the list of policies linked to a user name -> Can be accessed by users with role "admin";
import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";

import { Client, Policy } from "../../orm/entities";
import { CustomError } from "../../utils";

export const getPoliceClient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const policyId = req.params.policyId as string;
  const policyRepository = getRepository(Policy);
  const clientRepository = getRepository(Client);

  try {
    const policy = await policyRepository.findOne(policyId, {
      select: [
        "id",
        "inceptionDate",
        "amountInsured",
        "installmentPayment",
        "clientId",
      ],
    });

    if (!policy) {
      const customError = new CustomError(
        404,
        "General",
        `Policy with id:${policyId} not found.`,
        ["Policy not found."]
      );
      return next(customError);
    }
    const client = await clientRepository.findOne({
      where: { id: policy.clientId },
      select: ["id", "name", "email"],
    });
    policy.client = client;
    res.customSuccess(200, "Police associated client.", policy);
  } catch (err) {
    const customError = new CustomError(400, "General", "Error", null, err);
    return next(customError);
  }
};
