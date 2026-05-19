import nextTranslate from "next-translate-plugin";

const nextConfig = {
  reactStrictMode: true,

  turbopack: {},

  typescript: {
    ignoreBuildErrors: true,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

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
};

export default nextTranslate(nextConfig);
