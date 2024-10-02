import { CollectionConfig } from "payload/types";
import { anyone } from "./access/anyone";

const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: anyone,
  },
  upload: {
    imageSizes: [
      {
        name: "thumbnail",
        width: 256,
        height: 256,
        position: "centre",
      },
    ],
    adminThumbnail: "thumbnail",
  },
  fields: [
    {
      name: "alt",
      type: "text",
    },
  ],
};

export default Media;
