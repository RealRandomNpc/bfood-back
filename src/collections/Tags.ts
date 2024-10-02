import { CollectionConfig } from "payload/types";
import { anyone } from "./access/anyone";
import { admins } from "./access/admins";

const Tags: CollectionConfig = {
  slug: "tags",
  access: {
    read: anyone,
    create: admins,
    update: admins,
    delete: admins,
  },
  labels: {
    singular: "Tag",
    plural: "Tags",
  },
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      label: "Name",
      type: "text",
      required: true,
      unique: true,
    },
  ],
};

export default Tags;
