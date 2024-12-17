const defaultUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://myonepost.com";

export const siteConfig = {
  title: "My One Post - Share what matters, without the noise.",
  shortTitle: "My One Post",
  description:
    "My One Post is a unique social media platform where users can share a single post and can be updated daily. Simplify your online presence by focusing on what truly matters.",
  url: defaultUrl,
  theme: {
    color: "#2563EB",
  },
  links: {
    disposableEmailChecker: "https://disposable.debounce.io/?email=",
    contact: "mailto:hello@myonepost.com",
  },
  twitter: {
    site: "@myonepost",
    creator: "@rakesh_at_tweet",
  },
  pages: {
    privacy: {
      title: "Privacy Policy",
      description: "My One Post's privacy policy",
      link: "/privacy",
    },
    tos: {
      title: "Terms of Service",
      description: "My One Post's terms of service",
      link: "/tos",
    },
    cookie: {
      title: "Cookie Policy",
      description: "My One Post's cookie policy",
      link: "/cookie",
    },
  },
};
