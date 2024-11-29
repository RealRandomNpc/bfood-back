import FullHeader from "../blocks/FullHeader";
import Marquee from "../blocks/Marquee";
import { anyone } from "../collections/access/anyone";
import { GlobalConfig } from "payload/types";

const PaymentPage: GlobalConfig = {
  slug: "payment-page",
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
  ],
};

export default PaymentPage;
