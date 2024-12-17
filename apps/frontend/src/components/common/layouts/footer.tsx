import Link from "next/link";

import { siteConfig } from "@/config/site";

export default function Footer() {
  return (
    <footer className="sticky top-0 flex flex-wrap gap-4 p-6 text-sm text-muted-foreground">
      <p>&copy; {new Date().getFullYear()} My One Post</p>
      <Link
        href={siteConfig.pages.privacy.link}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline"
      >
        Privacy Policy
      </Link>
      <Link
        href={siteConfig.pages.tos.link}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline"
      >
        Terms of Service
      </Link>
      {/* <Link
        href={"#"}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline"
      >
        Cookie Policy
      </Link> */}
      <Link
        href={siteConfig.links.contact}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline"
      >
        Contact Us
      </Link>
    </footer>
  );
}
