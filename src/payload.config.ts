import path from "path";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { slateEditor } from "@payloadcms/richtext-slate";
import { buildConfig } from "payload/config";
import { Icon } from "./graphics/Icon";
import { Logo } from "./graphics/Logo";

import CMSUsers from "./collections/CMSUsers";
import Products from "./collections/Products";
import Categories from "./collections/Categories";
// import { s3Storage } from "@payloadcms/storage-s3";

export default buildConfig({
  admin: {
    user: CMSUsers.slug,
    bundler: webpackBundler(),
    // Add your own logo and icon here
    components: {
      graphics: {
        Icon,
        Logo,
      },
    },
    // Add your own meta data here
    meta: {
      favicon: "/assets/favicon.svg",
      ogImage: "/assets/ogImage.png",
      titleSuffix: "Bfood",
    },
  },
  editor: slateEditor({}),
  collections: [CMSUsers, Products, Categories],
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
  },
  plugins: [
    // s3Storage({
    //   collections: {
    //     media: {
    //       prefix: "media",
    //     },
    //   },
    //   bucket: process.env.S3_BUCKET,
    //   config: {
    //     forcePathStyle: true,
    //     credentials: {
    //       accessKeyId: process.env.S3_ACCESS_KEY_ID,
    //       secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    //     },
    //     region: process.env.S3_REGION,
    //     endpoint: process.env.S3_ENDPOINT,
    //   },
    // }),
  ],
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
});
