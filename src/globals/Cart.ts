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
              label: "Is Active",
              type: "checkbox",
              defaultValue: true,
            },
            {
              name: "more_details",
              label: "Info Shown to the User",
              type: "text",
            },
            {
              name: "service_fee",
              label: "Service Fee",
              type: "number",
              defaultValue: 0,
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
              label: "Is Active",
              type: "checkbox",
              defaultValue: true,
            },
            {
              name: "more_details",
              label: "Info Shown to the User",
              type: "text",
            },
            {
              name: "service_fee",
              label: "Service Fee",
              type: "number",
              defaultValue: 0,
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
    {
      name: 'store_address', // required
      label: "Store Address",
      type: 'group', // required
      interfaceName: 'store_details', // optional
      fields: [
        // required
        {
          name: 'city',
          type: 'text',
          required: true,
        },
        {
          name: 'street',
          type: 'text',
          required: true,
        },
        {
          name: 'house_number',
          type: 'number',
          required: true,
        },
        {
          name: 'description',
          label: 'Location Description',
          type: 'textarea',
        },
      ],
    }
  ],
};

export default Cart;
