import { Access } from "payload/config";
import { checkRole } from "./checkRole";

export const superAdmins: Access = ({ req: { user } }) =>
  checkRole([ "super-admin"], user);