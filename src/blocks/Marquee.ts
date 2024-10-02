import { Block } from "payload/types";

const Marquee: Block = {
  slug: "marquee",
  labels: {
    singular: "Marquee",
    plural: "Marquee",
  },
  fields: [
    {
      name: "text",
      label: "Marquee Text",
      type: "text",
    },
    {
      name: "autoFill",
      label: "Auto Fill",
      type: "checkbox",
      defaultValue: true,
    },
    {
      name: "speed",
      label: "Speed",
      type: "number",
      defaultValue: 25,
    },
  ],
};

export default Marquee;
