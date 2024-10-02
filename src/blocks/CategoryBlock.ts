import { Block } from "payload/types";

const CategoryBlock: Block = {
  slug: "category-block",
  labels: {
    singular: "Category",
    plural: "Categories",
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
  ],
};

export default CategoryBlock;
