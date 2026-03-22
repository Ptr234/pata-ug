/** @type {import('next').NextConfig} */
const isGitHubPages = process.env.GITHUB_PAGES === "true";

const nextConfig = {
  ...(isGitHubPages && {
    output: "export",
    basePath: "/pata-ug",
    assetPrefix: "/pata-ug/",
  }),
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
