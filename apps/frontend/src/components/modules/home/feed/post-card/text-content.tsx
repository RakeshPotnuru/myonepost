import { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/reusables/button";

interface TextContentProps {
  text: string;
}

const shortenText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
};

const detectLinks = (text: string) => {
  const urlRegex = /(https?:\/\/\S+)/g;
  const parts = text.split(urlRegex);
  const matches: string[] = text.match(urlRegex) || [];

  return parts.map((part, i) => {
    if (matches.includes(part)) {
      return (
        <Link
          key={`link-${i + 1}`}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          {part}
        </Link>
      );
    }
    return part;
  });
};

export default function TextContent({ text }: Readonly<TextContentProps>) {
  const [isFullText, setIsFullText] = useState(false);

  const content = isFullText ? text : shortenText(text, 280);
  const processedContent = detectLinks(content);

  return (
    <p>
      {processedContent}
      {text.length > 280 && (
        <Button
          onClick={() => setIsFullText(!isFullText)}
          variant="link"
          size="link"
        >
          {isFullText ? "Read less" : "Read more"}
        </Button>
      )}
    </p>
  );
}
