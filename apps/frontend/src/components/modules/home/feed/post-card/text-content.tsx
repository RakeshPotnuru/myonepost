"use client";

import { useState } from "react";

import { Button } from "@/components/ui/reusables/button";
import { CardContent } from "@/components/ui/reusables/card";
import { shortenText } from "@/utils/text-shortener";

export default function TextContent() {
  const [isFullText, setIsFullText] = useState(false);

  const text =
    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a";

  return (
    <CardContent className="p-4">
      <p>
        {isFullText ? text : shortenText(text, 280)}{" "}
        <Button
          onClick={() => setIsFullText(!isFullText)}
          variant={"link"}
          size={"link"}
        >
          {isFullText ? "Read less" : "Read more"}
        </Button>
      </p>
    </CardContent>
  );
}
