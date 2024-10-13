import { CollectionConfig } from "payload/types";
import DefaultProductOption from "../blocks/ProductOptions/DefaultProductOption";
import adminsAndUser from "./access/adminsAndUser";
import { anyone } from "./access/anyone";
import { updateRelationshipRefs } from "./hooks/updateRelationshipRefs";
import { Product, ProductsOption } from "payload/generated-types";

const ProductOptions: CollectionConfig = {
  slug: "products-options",
  labels: {
    singular: "Product Option",
    plural: "Products Option",
  },
  admin: {
    useAsTitle: "product_options_name",
  },
  access: {
    read: anyone,
    update: adminsAndUser,
    create: adminsAndUser,
    delete: adminsAndUser,
  },
  hooks: {
    afterChange: [
      updateRelationshipRefs<ProductsOption, Product>({
        relationshipId: "category-product",
        sourceFieldName: "products",
        targetFieldName: "has_product_options",
        convertToBoolean: true,
      }),
    ],
  },
  fields: [
    {
      name: "product_options_name",
      label: "Product Options Name",
      type: "text",
    },
    {
      name: "products",
      label: "Related Products",
      type: "relationship",
      relationTo: "products",
      hasMany: true,
    },
    {
      name: "product_options_blocks",
      label: "Product Options Blocks",
      type: "blocks",
      blocks: [DefaultProductOption],
    },
  ],
};

export default ProductOptions;
