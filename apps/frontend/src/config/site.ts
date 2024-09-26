let defaultUrl;
if (process.env.NEXT_PUBLIC_SITE_ENV === "production") {
  defaultUrl = "https://myonepost.com";
} else if (process.env.NEXT_PUBLIC_SITE_ENV === "staging") {
  defaultUrl = "https://stg.myonepost.com";
} else {
  defaultUrl = "http://localhost:3000";
}

export const siteConfig = {
  title: "My One Post - Share what matters, without the noise.",
  description:
    "Share that one thing you want to share with the world. Because sharing too much creates unnecessary noise.",
  url: defaultUrl,
  theme: {
    color: "#EB5757",
  },
  links: {},
  twitter: {
    site: "@myonepost",
    creator: "@rakesh_at_tweet",
  },
  pages: {},
};
