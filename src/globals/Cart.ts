import { GlobalConfig } from "payload/types";
import { anyone } from "../collections/access/anyone";

const Cart: GlobalConfig = {
  slug: "cart-settings",
  label: "Cart",
  access: {
    read: anyone,
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          name: "pickup",
          label: "Pick Up",
          description: "pick up method details",
          fields: [
            {
              name: "is_active",
              type: "checkbox",
              defaultValue: true,
            },
            {
              name: "more_details",
              label: "Info Shown to the User",
              type: "text",
            },
          ],
        },
        {
          name: "delivery",
          label: "Delivery",
          description: "Delivery method details",
          fields: [
            {
              name: "is_active",
              type: "checkbox",
              defaultValue: true,
            },
            {
              name: "more_details",
              label: "Info Shown to the User",
              type: "text",
            },
          ],
        },
      ],
    },
    {
      name: "min_order",
      label: "Minimum Order",
      type: "number",
      defaultValue: 0,
    },
  ],
};

export default Cart;
