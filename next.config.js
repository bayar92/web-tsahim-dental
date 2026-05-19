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

  // async redirects() {
  //   return [
  //     {
  //     },
  //   ];
  // },

  eslint: {},
  reactStrictMode: true,
};

export default nextTranslate(nextConfig);
