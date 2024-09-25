import { CollectionConfig } from 'payload/types'
import { anyone } from './access/anyone'
import adminsAndUser from './access/adminsAndUser'

const Products: CollectionConfig = {
  slug: 'products',
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
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'price',
      type: 'number',
      required: true
    },
    {
      name: 'img_alt',
      type: 'text'
    }
  ],
  upload: {
    staticURL: '/productImages',
    staticDir:'media/productImages',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 256,
        height: 256,
        position: 'centre',
      },
      {
        name: 'square',
        width: 512,
        height: 512,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
  },
}

export default Products