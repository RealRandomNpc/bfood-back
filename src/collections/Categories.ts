import { CollectionConfig } from 'payload/types'
import { anyone } from './access/anyone'
import adminsAndUser from './access/adminsAndUser'

const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: anyone,
    update: adminsAndUser,
    create: adminsAndUser,
    delete: adminsAndUser
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'products',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true
    }
  ],
}

export default Categories