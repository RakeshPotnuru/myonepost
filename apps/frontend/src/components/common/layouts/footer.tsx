import Link from "next/link";

export default function Footer() {
  return (
    <footer className="sticky top-0 flex flex-wrap gap-4 p-6 text-sm text-muted-foreground">
      <p>&copy; {new Date().getFullYear()} My One Post</p>
      <Link href={"#"} target="_blank" className="hover:underline">
        Privacy Policy
      </Link>
      <Link href={"#"} target="_blank" className="hover:underline">
        Terms of Service
      </Link>
      <Link href={"#"} target="_blank" className="hover:underline">
        Cookie Policy
      </Link>
    </footer>
  );
}
