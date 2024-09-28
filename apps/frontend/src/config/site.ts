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
    "My One Post is a unique social media platform where users can share a single post and can be updated daily. Simplify your online presence by focusing on what truly matters, without the noise of endless updates.",
  url: defaultUrl,
  theme: {
    color: "#2563EB",
  },
  links: {},
  twitter: {
    site: "@myonepost",
    creator: "@rakesh_at_tweet",
  },
  pages: {},
};
