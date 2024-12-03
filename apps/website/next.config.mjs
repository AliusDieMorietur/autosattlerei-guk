import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        // destination: `${process.env.NEXT_PUBLIC_SERVER_URL}/:path*`,
        destination: `http://0.0.0.0:8080/:path*`,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
