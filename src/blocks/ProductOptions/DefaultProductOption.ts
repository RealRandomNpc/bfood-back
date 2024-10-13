import { Block } from "payload/types";

const DefaultProductOption: Block = {
  slug: "default-product-option",
  labels: {
    singular: "Default Product Option",
    plural: "Default Product Options",
  },
  fields: [
    {
      name: "title",
      label: "Title",
      type: "text",
      required: true,
    },
    {
      name: "sub_title",
      label: "Sub Title",
      type: "text",
    },
    {
      name: "min_select",
      label: "Minimum Selected Options",
      type: "number",
      min: 0,
      defaultValue: 0,
    },
    {
      name: "max_select",
      label: "Maximum Selected Options",
      type: "number",
      min: 1,
      defaultValue: 5,
    },
    {
      name: "options_type",
      label: "Options Select Type",
      type: "radio",
      options: [
        {
          label: "Radio",
          value: "radio",
        },
        {
          label: "Single",
          value: "single",
        },
        {
          label: "Multiple",
          value: "multiple",
        },
      ],
      defaultValue: "single",
      admin: {
        layout: "horizontal",
      },
    },
    {
      name: "available_options",
      type: "array",
      fields: [
        {
          name: "name",
          type: "text",
          required: true,
        },
        {
          name: "extra_price",
          type: "number",
          defaultValue: 0,
        },
        {
          name: "img",
          label: "Product Image",
          type: "upload",
          relationTo: "media",
        },
      ],
    },
  ],
};

export default DefaultProductOption;
