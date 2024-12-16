const cspHeader = `
  default-src 'self';
  media-src 'self' blob: data: *.mux.com;
  connect-src 'self' ${process.env.NEXT_PUBLIC_API_URL} ${process.env.NEXT_PUBLIC_SUPABASE_URL} ${process.env.NEXT_PUBLIC_SUPABASE_WSS} ${process.env.NEXT_PUBLIC_POSTHOG_HOST} https://disposable.debounce.io *.mux.com https://storage.googleapis.com;
  script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.gstatic.com https://challenges.cloudflare.com https://us-assets.i.posthog.com;
  frame-src 'self' https://challenges.cloudflare.com;
  style-src 'self' 'unsafe-inline';
  img-src * blob: data:;
  font-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  block-all-mixed-content;
  upgrade-insecure-requests;
`;

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        hostname: "res.cloudinary.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: cspHeader.replace(/\n/g, ""),
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "same-origin",
          },
          {
            key: "Permissions-Policy",
            value: "geolocation=(), microphone=(), camera=()",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
