import { GlobalConfig } from "payload/types";

const Footer: GlobalConfig = {
  slug: "footer",
  fields: [
    {
      name: "links",
      label: "Footer Links",
      type: "array",
      fields: [
        {
          name: "label",
          label: "Label",
          type: "text",
        },
        {
          name: "link",
          label: "Link",
          type: "text",
        },
      ],
    },
  ],
};

export default Footer;
