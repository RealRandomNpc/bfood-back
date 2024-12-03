import type { Payload } from 'payload'

export const seed = async (payload: Payload): Promise<void> => {
  await payload.create({
    collection: "cms-users",
    data: {
      email: "demo@payloadcms.com",
      password: process.env.PAYLOAD_ADMIN_PASSWORD,
      roles: ["admin", "super-admin"],
    },
  });
}
