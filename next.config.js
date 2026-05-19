import nextTranslate from "next-translate-plugin";

const nextConfig = {
  headers: async () => [
    {
      source: "/(.*)?",
      headers: [
        {
          key: "Access-Control-Allow-Origin",
          value: "*",
        },
        {
          key: "Access-Control-Allow-Methods",
          value: "GET,HEAD,PUT,PATCH,POST,DELETE",
        },
      ],
    },
  ],

  eslint: {},
  reactStrictMode: true,
};

export default nextTranslate("./i18n.cjs")(nextConfig);
