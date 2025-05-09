module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: "cloudinary",
      providerOptions: {
        cloud_name: env("CLAUDINARY_NAME"),
        api_key: env("CLAUDINARY_API_KEY"),
        api_secret: env("CLAUDINARY_API_SECRET"),
      },
      actionOptions: {
        upload: {},
        delete: {},
      },
    },
  },
});
