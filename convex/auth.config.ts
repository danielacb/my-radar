export default {
  providers: [
    {
      domain: process.env.CLERK_API_URL,
      applicationID: "convex",
    },
  ],
};
