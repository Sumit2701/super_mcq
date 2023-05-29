/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}
module.exports = {
  env: {
      mongodburl: "mongodb+srv://sumit:sumit@cluster0.enrbqt5.mongodb.net/",
  }
};
module.exports = nextConfig
