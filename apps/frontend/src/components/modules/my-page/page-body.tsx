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
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/reusables/dialog";
import { Separator } from "@/components/ui/reusables/separator";
import usePageStore from "@/lib/store/page";
import useUserStore from "@/lib/store/user";
import { getBrowserLocale } from "@/utils/get-locale";
import { pluralize } from "@/utils/plural";

import AudioContent from "../home/feed/post-card/audio-content";
import ImageContent from "../home/feed/post-card/image-content";
import TextContent from "../home/feed/post-card/text-content";
import VideoContent from "../home/feed/post-card/video-content";
import { CreatePostBlock } from "../home/sidebar/create";
import Archive from "./archive";
import DeletePost from "./delete-post";
import EditProfile from "./edit-profile";
import PostStatusAlert from "./post-status-alert";
import Subscribe from "./subscribe";

export default function PageBody() {
  const { page } = usePageStore();
  const { user } = useUserStore();

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

  if (!page) {
    return <div>User not found</div>;
  }

  let postComponent;

  const { post, ...author } = page;

  if (!post) {
    postComponent =
      user?.username === page.username ? (
        <Center className="flex flex-col gap-2 p-4">
          <p>You haven&apos;t created your post yet.</p>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant={"outline"} className="w-max">
                Create your post
              </Button>
            </DialogTrigger>
            <DialogContent
              onOpenAutoFocus={(e) => e.preventDefault()}
              aria-describedby="undefined"
            >
              <CreatePostBlock className="border-none" />
            </DialogContent>
          </Dialog>
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
          className="rounded-xl"
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
          className="rounded-xl"
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
          className="rounded-xl"
        />
      );
      break;
    }
    default: {
      break;
    }
  }

  return (
    <Card className="border-none text-start shadow-none">
      <PostStatusAlert />
      {postComponent}
      <p className="mt-2">{post?.media_caption}</p>
      <CardHeader className="flex justify-between gap-2 px-0 sm:flex-row sm:gap-0">
        <div className="flex flex-row items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={page.avatar_url ?? ""} />
            <AvatarFallback>{page.username[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            {page.display_name && <CardTitle>{page.display_name}</CardTitle>}
            <CardDescription>@{page.username}</CardDescription>
          </div>
        </div>
        {user?.username === page.username && (
          <div className="grid grid-cols-2 gap-2">
            <EditProfile /> <DeletePost />
          </div>
        )}
        <Subscribe />
      </CardHeader>
      {page.bio && (
        <CardContent className="px-0">
          <p>{page.bio}</p>
        </CardContent>
      )}
      <CardFooter className="px-0">
        <div className="flex flex-row items-center gap-2 sm:gap-4">
          <div className="flex flex-row items-center gap-2 text-sm text-muted-foreground">
            <Icons.Calendar />
            <time dateTime={page.created_at.toString()}>
              Joined {format(page.created_at, "MMM, yyyy")}
            </time>
          </div>
          <p className="text-sm text-muted-foreground">
            {Intl.NumberFormat(getBrowserLocale(), {
              notation: "compact",
              maximumFractionDigits: 1,
            }).format(page.subscriber_count)}{" "}
            {pluralize("Subscriber", page.subscriber_count)}
          </p>
          {page.url && (
            <Link
              href={page.url}
              target="_blank"
              rel="noopener noreferrer"
              passHref
            >
              <Button variant={"link"} size={"link"}>
                <Icons.Link className="mr-2" />
                {getDomain(page.url)}
              </Button>
            </Link>
          )}
        </div>
      </CardFooter>
      <Separator className="mb-6" />
      <Archive username={page.username} author={author} />
    </Card>
  );
}

function getDomain(url: string) {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.hostname;
  } catch {
    return null;
  }
}
