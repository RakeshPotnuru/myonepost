import Link from "next/link";

import { PostType } from "@1post/shared";
import { format } from "date-fns";

import { Icons } from "@/assets/icons";
import { Center } from "@/components/ui/center";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/reusables/avatar";
import { Button } from "@/components/ui/reusables/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/reusables/card";
import usePageStore from "@/lib/store/page";
import useUserStore from "@/lib/store/user";

import AudioContent from "../home/feed/post-card/audio-content";
import ImageContent from "../home/feed/post-card/image-content";
import TextContent from "../home/feed/post-card/text-content";
import VideoContent from "../home/feed/post-card/video-content";

export default function PageBody() {
  const { page } = usePageStore();
  const { user } = useUserStore();

  if (!page) {
    return <div>User not found</div>;
  }

  if (!page?.post && !user) {
    return (
      <Center className="flex flex-col gap-4">
        <p className="text-muted-foreground">
          This user does not exist or set their profile private.
        </p>
        <Link href={"/"} passHref>
          <Button variant={"outline"} className="w-max">
            Login to view
          </Button>
        </Link>
      </Center>
    );
  }

  let postComponent;

  const { post, ...author } = page;

  if (!post) {
    postComponent =
      user?.username === page.username ? (
        <Center className="flex flex-col gap-2 p-4">
          <p>You haven&apos;t created your post yet.</p>
          <Link href={"/"} passHref>
            <Button variant={"outline"} className="w-max">
              Create your post
            </Button>
          </Link>
        </Center>
      ) : (
        <Center className="p-4">
          <p>User hasn&apos;t posted yet.</p>
        </Center>
      );
  }

  switch (post?.post_type) {
    case PostType.TEXT: {
      postComponent = <TextContent text={post.text ?? ""} />;
      break;
    }
    case PostType.IMAGE: {
      postComponent = (
        <ImageContent
          author={author}
          media_url={post.media_url}
          media_caption={post.media_caption}
        />
      );
      break;
    }
    case PostType.VIDEO: {
      postComponent = (
        <VideoContent
          author={author}
          id={post.id}
          media_url={post.media_url}
          media_caption={post.media_caption}
        />
      );
      break;
    }
    case PostType.AUDIO: {
      postComponent = (
        <AudioContent
          author={author}
          id={post.id}
          media_url={post.media_url}
          media_caption={post.media_caption}
        />
      );
      break;
    }
    default: {
      break;
    }
  }
  console.log(user, page);

  return (
    <Card className="border-none text-start shadow-none">
      {postComponent}
      <p className="mt-2">{post?.media_caption}</p>
      <CardHeader className="flex flex-row justify-between px-0">
        <div className="flex flex-row items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={page.avatar_url} />
            <AvatarFallback>{page.username[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            {page.display_name && <CardTitle>{page.display_name}</CardTitle>}
            <CardDescription>@{page.username}</CardDescription>
          </div>
        </div>
        {user?.username === page.username && (
          <div>
            <Button variant={"secondary"}>Edit profile</Button>{" "}
            <Button variant={"destructive"}>Delete Post</Button>
          </div>
        )}
      </CardHeader>
      {page.bio && (
        <CardContent className="px-0">
          <p>{page.bio}</p>
        </CardContent>
      )}
      <CardFooter className="px-0">
        <div className="flex flex-row items-center gap-4">
          <div className="flex flex-row items-center gap-2 text-sm text-muted-foreground">
            <Icons.Calendar />
            <time dateTime={page.created_at.toString()}>
              Joined {format(page.created_at, "MMM, yyyy")}
            </time>
          </div>
          {page.url && (
            <Link href={page.url} target="_blank" passHref>
              <Button variant={"link"} size={"link"}>
                <Icons.Link className="mr-2" />
                {getDomain(page.url)}
              </Button>
            </Link>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}

function getDomain(url: string): string | null {
  const match = new RegExp(
    /^(?:https?:\/\/)?(?:[^\n@]+@)?(?:www\.)?([^\n/:?]+)/im,
  ).exec(url);
  return match ? match[1] : null;
}
