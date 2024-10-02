import { CollectionConfig } from 'payload/types'
import { anyone } from './access/anyone'
import adminsAndUser from './access/adminsAndUser'
import { updateRelationshipRefs } from "./hooks/updateRelationshipRefs";
import { Category, Product } from "payload/generated-types";

const Products: CollectionConfig = {
  slug: "products",
  admin: {
    useAsTitle: "name",
  },
  access: {
    read: anyone,
    update: adminsAndUser,
    create: adminsAndUser,
    delete: adminsAndUser,
  },
  hooks: {
    afterChange: [
      updateRelationshipRefs<Product, Category>({
        relationshipId: "category-product",
        sourceFieldName: "category",
        targetFieldName: "products",
      }),
    ],
  },
  fields: [
    {
      name: "name",
      label: "Name",
      type: "text",
      required: true,
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
    },
    {
      name: "price",
      type: "number",
      required: true,
    },
    {
      name: "img",
      label: "Product Image",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "category",
      label: "Category",
      type: "relationship",
      relationTo: "categories",
    },
    {
      name: "tags",
      label: "Tags",
      type: "array",
      fields: [
        {
          name: "tag",
          label: "Tags",
          type: "relationship",
          relationTo: "tags",
        },
      ],
    },
  ],
};

export default Products