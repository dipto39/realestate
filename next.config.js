/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    backend_url:
      process.env.NODE_ENV === "production"
        ? "https://realstateexpress.appstick.com.bd/"
        : "https://realstateexpress.appstick.com.bd/",
    is_laravel_backend: 'false',
  },
  images: {
    domains: ['appstick-resources.s3.ap-southeast-1.amazonaws.com'],
    domains: ['appstick.s3.ap-southeast-1.amazonaws.com'],
  },
};

module.exports = nextConfig

//http://localhost:4200/
//https://real-state-express.vercel.app/