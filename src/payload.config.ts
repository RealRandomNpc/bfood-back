import path from "path";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { slateEditor } from "@payloadcms/richtext-slate";
import { buildConfig } from "payload/config";
import { Icon } from "./components/graphics/Icon";
import { Logo } from "./components/graphics/Logo";

import CMSUsers from "./collections/CMSUsers";
import Products from "./collections/Products";
import Categories from "./collections/Categories";
import Media from "./collections/Media";
import { cloudStorage } from "@payloadcms/plugin-cloud-storage";
import { s3Adapter } from "@payloadcms/plugin-cloud-storage/s3";
import Footer from "./globals/Footer";
import IndexPage from "./globals/IndexPage";
import Tags from "./collections/Tags";
import Cart from "./globals/Cart";
import ProductOptions from "./collections/ProductOptions";
import PaymentPage from "./globals/PaymentPage";
// import { s3Storage } from "@payloadcms/storage-s3";

export default buildConfig({
  cors: [process.env.NEXT_DEPLOY_URL],
  csrf: [process.env.NEXT_DEPLOY_URL],
  rateLimit: {
    trustProxy: true,
  },
  serverURL: process.env.PAYLOAD_DEPLOY_URL,
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
    webpack: (config) => {
      return {
        ...config,
        resolve: {
          ...config.resolve,
          alias: {
            ...config.resolve.alias,
            "@": __dirname,
          },
        },
      };
    },
  },
  editor: slateEditor({}),
  collections: [CMSUsers, Products, Categories, Media, Tags, ProductOptions],
  globals: [Footer, IndexPage, Cart, PaymentPage],
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
  },
  plugins: [
    cloudStorage({
      collections: {
        // Enable cloud storage for Media collection
        media: {
          // Create the S3 adapter
          adapter: s3Adapter({
            config: {
              endpoint: process.env.S3_ENDPOINT,
              credentials: {
                accessKeyId: process.env.S3_ACCESS_KEY_ID,
                secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
              },
              region: process.env.S3_REGION,
              forcePathStyle: true,
            },
            bucket: process.env.S3_BUCKET,
          }),
        },
      },
    }),
  ],
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
});
