/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/pata-ug",
  assetPrefix: "/pata-ug/",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
