import { Role } from "../orm/entities";

export type JwtPayload = {
  id: string;
  name: string;
  email: string;
  role: Role;
};
