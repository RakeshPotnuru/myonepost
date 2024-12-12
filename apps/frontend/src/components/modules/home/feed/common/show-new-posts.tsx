import { Center } from "@/components/ui/center";
import { Button } from "@/components/ui/reusables/button";

interface IShowNewPostsProps {
  postsLength: number;
  onClick: () => void;
}

export default function ShowNewPosts({
  postsLength,
  onClick,
}: IShowNewPostsProps) {
  return (
    postsLength > 0 && (
      <Center>
        <Button onClick={onClick} variant={"ghost"}>
          Show {postsLength} new post{postsLength > 1 ? "s" : ""}
        </Button>
      </Center>
    )
  );
}
