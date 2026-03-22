/** @type {import('next').NextConfig} */
const isGitHubPages = process.env.GITHUB_PAGES === "true";

const nextConfig = {
  ...(isGitHubPages && {
    output: "export",
    basePath: "/pata-ug",
  }),
  images: {
    unoptimized: true,
    ...(isGitHubPages && { loader: "custom", loaderFile: "./image-loader.js" }),
  },
};

export default nextConfig;
