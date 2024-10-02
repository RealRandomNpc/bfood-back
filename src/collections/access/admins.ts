import type { Access } from 'payload/config'

import { checkRole } from './checkRole'

export const admins: Access = ({ req: { user } }) =>
  checkRole(["admin", "super-admin"], user);
