/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/.well-known/farcaster.json",
        destination: "https://api.farcaster.xyz/miniapps/hosted-manifest/019cbf6b-1623-bba2-28dd-2e1482b1b853",
        permanent: false,
      },
    ];
  },
};
module.exports = nextConfig;
