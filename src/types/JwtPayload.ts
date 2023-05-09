import { Role } from "../orm/entities/Client/types";

export type JwtPayload = {
  id: string;
  name: string;
  email: string;
  role: Role;
};
