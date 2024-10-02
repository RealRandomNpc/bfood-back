import { Block } from "payload/types";

const FullHeader: Block = {
  slug: "full-header",
  labels: {
    singular: "Full Width Header",
    plural: "Full Width Header",
  },
  fields: [
    {
      name: "header_img",
      label: "Header Image",
      type: "upload",
      relationTo: "media",
    },
  ],
};

export default FullHeader;
