import CategoryBlock from "../blocks/CategoryBlock";
import FullHeader from "../blocks/FullHeader";
import Marquee from "../blocks/Marquee";
import { anyone } from "../collections/access/anyone";
import { GlobalConfig } from "payload/types";

const IndexPage: GlobalConfig = {
  slug: "index-page",
  access: {
    read: anyone,
  },
  fields: [
    {
      name: "beforeProducts",
      label: "Before Products",
      type: "blocks",
      blocks: [Marquee, FullHeader],
    },
    {
      name: "afterSearchPromoted",
      label: "After Search Promoted",
      type: "blocks",
      blocks: [CategoryBlock],
    },
  ],
};

export default IndexPage;
