"use client";

import Link from "next/link";

import { Center } from "@/components/ui/center";
import { Button } from "@/components/ui/reusables/button";

import { useGetUserPost } from "../common/api/page";
import { useGetMe } from "../home/api/user";

interface ProfilePageProps {
  username: string;
}

export default function ProfilePage({ username }: Readonly<ProfilePageProps>) {
  return (
    <Center>
      <div className="flex w-1/2 flex-col space-y-4 text-center">
        <p>myonepost</p>

        <ProfileInfo username={username} />

        <Link href={"/"} passHref>
          <Button>Explore more posts</Button>
        </Link>
      </div>
    </Center>
  );
}

interface ProfileInfoProps {
  username: string;
}

function ProfileInfo({ username }: Readonly<ProfileInfoProps>) {
  const { data: profile, isFetching: isPostFetching } =
    useGetUserPost(username);
  const { data: currentUser, isFetching: isCurrentUserFetching } = useGetMe();

  if (isPostFetching || isCurrentUserFetching) {
    return <div>Loading...</div>;
  }

  if (!profile?.Post[0] && !currentUser) {
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

  if (!profile || !currentUser) {
    return <div>User not found</div>;
  }

  // const post = profile.Post[0] as Tables<"Post"> | null;
  // console.log(post);

  // let postComponent;

  // if (!post) {
  //   postComponent =
  //     currentUser.username === username ? (
  //       <Center className="flex flex-col gap-2 p-4">
  //         <p>You haven&apos;t created your post yet.</p>
  //         <Create />
  //       </Center>
  //     ) : (
  //       <Center className="p-4">
  //         <p>User hasn&apos;t posted yet.</p>
  //       </Center>
  //     );
  // }

  // switch (post?.postType) {
  //   case "TEXT": {
  //     postComponent = <TextContent text={post.text ?? ""} />;
  //     break;
  //   }
  //   case "IMAGE": {
  //     postComponent = <ImageContent />;
  //     break;
  //   }
  //   case "VIDEO": {
  //     postComponent = <VideoContent />;
  //     break;
  //   }
  //   case "AUDIO": {
  //     postComponent = <AudioContent />;
  //     break;
  //   }
  //   default: {
  //     break;
  //   }
  // }

  // return (
  //   <Card className="text-start">
  //     {post?.isFlagged && (
  //       <Alert variant="destructive">
  //         <Icons.Flag className="h-4 w-4" />
  //         <AlertTitle>Your post has been flagged</AlertTitle>
  //         <AlertDescription>
  //           {post.flagReason ?? "Currently under review"}
  //         </AlertDescription>
  //       </Alert>
  //     )}
  //     {postComponent}
  //     <CardHeader className="flex flex-row justify-between">
  //       <div className="flex flex-row items-center gap-2">
  //         <Avatar className="h-8 w-8">
  //           <AvatarImage src={profile.avatarUrl ?? ""} />
  //           <AvatarFallback>{profile.username[0].toUpperCase()}</AvatarFallback>
  //         </Avatar>
  //         <div>
  //           {profile.displayName && (
  //             <CardTitle>{profile.displayName}</CardTitle>
  //           )}
  //           <CardDescription>@{profile.username}</CardDescription>
  //         </div>
  //       </div>
  //       {currentUser && currentUser.username === username && (
  //         <div>
  //           <Button variant={"secondary"}>Edit users</Button>{" "}
  //           {post && <Button variant={"destructive"}>Delete Post</Button>}
  //         </div>
  //       )}
  //     </CardHeader>
  //     {profile.bio && (
  //       <CardContent>
  //         <p>{profile.bio}</p>
  //       </CardContent>
  //     )}
  //     <CardFooter className="flex flex-col items-start space-y-4">
  //       <div className="flex flex-row items-center gap-4">
  //         {profile.link && (
  //           <Link href={profile.link} target="_blank" passHref>
  //             <Button variant={"link"} size={"link"}>
  //               <Icons.Link className="mr-2" />{" "}
  //               {profile.link.replace(/^\w+:\/\//, "")}
  //             </Button>
  //           </Link>
  //         )}
  //         <div className="flex flex-row items-center gap-2 text-sm text-muted-foreground">
  //           <Icons.Calendar />
  //           <time dateTime={profile.createdAt.toString()}>
  //             Joined {format(profile.createdAt, "MMMM, yyyy")}
  //           </time>
  //         </div>
  //       </div>
  //     </CardFooter>
  //   </Card>
  // );
  return <div></div>;
}
