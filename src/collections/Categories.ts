import { CollectionConfig } from 'payload/types'
import { anyone } from './access/anyone'
import adminsAndUser from './access/adminsAndUser'
import { updateRelationshipRefs } from "./hooks/updateRelationshipRefs";
import { Category, Product } from "payload/generated-types";

const Categories: CollectionConfig = {
  slug: "categories",
  admin: {
    useAsTitle: "title",
  },
  access: {
    read: anyone,
    update: adminsAndUser,
    create: adminsAndUser,
    delete: adminsAndUser,
  },
  hooks: {
    afterChange: [
      updateRelationshipRefs<Category, Product>({
        relationshipId: "category-product",
        sourceFieldName: "products",
        targetFieldName: "category",
      }),
    ],
  },
  fields: [
    {
      name: "title",
      label: "Title",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "sub_title",
      label: "Sub title",
      type: "text",
    },
    {
      name: "products",
      type: "relationship",
      relationTo: "products",
      hasMany: true,
    },
    {
      name: "priority",
      type: "number",
      defaultValue: 0,
    },
  ],
};

export default Categories