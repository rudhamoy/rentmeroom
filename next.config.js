/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['lh3.googleusercontent.com', "firebasestorage.googleapis.com"]
    },
    experimental: { 
        appDir: true,
        esmExternals: "loose",
        serverComponentsExternalPackages: ["mongoose"] 
    },
    webpack(config) {
    config.experiments = { ...config.experiments, topLevelAwait: true }
    return config
  },
}

module.exports = nextConfig


