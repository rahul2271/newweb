/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "images.pexels.com",
      "images.unsplash.com",
      "source.unsplash.com",
      "plus.unsplash.com",
      "api.uifaces.co",
      "randomuser.me",
      "avatars.githubusercontent.com",
      "upload.wikimedia.org",
      "cdn.shopify.com",
      "d1.awsstatic.com",
      "pagedone.io",
      "cdn.pixabay.com",
      "miro.medium.com",
      "www.investopedia.com",
      "img.freepik.com",
      "firebasestorage.googleapis.com",
    ],
  },

  // ✅ Redirect from www to non-www for SEO consistency
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.rctechsolutions.com" }],
        destination: "https://www.rctechsolutions.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
