import { CollectionConfig } from 'payload/types'
import { protectRoles } from './hooks/protectRoles'
import { anyone } from './access/anyone'
import adminsAndUser from './access/adminsAndUser'
import { admins } from './access/admins'
import { checkRole } from './access/checkRole'
import { loginAfterCreate } from './hooks/loginAfterCreate'

const EXPIRATION_TIME = 60 * 60 * 24 * 30;

const CMSUsers: CollectionConfig = {
  slug: "cms-users",
  auth: true,
  access: {
    read: adminsAndUser,
    create: anyone,
    update: adminsAndUser,
    delete: admins,
    admin: ({ req: { user } }) => checkRole(["admin"], user),
  },
  admin: {
    useAsTitle: "email",
  },
  hooks: {
    afterChange: [loginAfterCreate],
  },
  fields: [
    {
      name: "firstName",
      type: "text",
    },
    {
      name: "lastName",
      type: "text",
    },
    {
      name: "email",
      type: "email",
      required: true,
      unique: true,
    },
    {
      name: "roles",
      type: "select",
      hasMany: true,
      saveToJWT: true,
      hooks: {
        beforeChange: [protectRoles],
      },
      options: [
        {
          label: "Super Admin",
          value: "super-admin",
        },
        {
          label: "Admin",
          value: "admin",
        },
        {
          label: "User",
          value: "user",
        },
      ],
    },
  ],
};

export default CMSUsers
