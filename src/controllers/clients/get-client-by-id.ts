import { Request, Response, NextFunction } from "express";

export const getClientById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  res.send("valele");
};
