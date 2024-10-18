"use client";

import { useState } from "react";

import { Button } from "@/components/ui/reusables/button";
import { shortenText } from "@/utils/text-shortener";

interface TextContentProps {
  text: string;
}

export default function TextContent({ text }: Readonly<TextContentProps>) {
  const [isFullText, setIsFullText] = useState(false);

  return (
    <p>
      {isFullText ? text : shortenText(text, 280)}{" "}
      {text.length > 280 && (
        <Button
          onClick={() => setIsFullText(!isFullText)}
          variant={"link"}
          size={"link"}
        >
          {isFullText ? "Read less" : "Read more"}
        </Button>
      )}
    </p>
  );
}
