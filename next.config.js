/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    backend_url:
      process.env.NODE_ENV === "production"
        ? "https://realstatelaravel.appstick.com.bd/"
        : "https://realstatelaravel.appstick.com.bd/",
    is_laravel_backend: 'true',
  },
  images: {
    domains: ['appstick-resources.s3.ap-southeast-1.amazonaws.com'],
    domains: ['appstick.s3.ap-southeast-1.amazonaws.com'],
  },
};

module.exports = nextConfig

//http://localhost:4200/
//https://real-state-express.vercel.app/