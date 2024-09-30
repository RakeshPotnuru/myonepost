import Link from "next/link";

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

import ImageContent from "../home/feed/post-card/image-content";

export default function ProfilePage() {
  return (
    <Center>
      <div className="flex w-1/2 flex-col space-y-4 text-center">
        <p>myonepost</p>
        <ProfileInfo />
        <Link href={"/"} passHref>
          <Button>Explore more posts</Button>
        </Link>
      </div>
    </Center>
  );
}

function ProfileInfo() {
  return (
    <Card className="text-start">
      <ImageContent />
      <CardHeader className="flex flex-row justify-between">
        <div className="flex flex-row items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://github.com/rakeshpotnuru.png" />
            <AvatarFallback>RP</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>Display Name</CardTitle>
            <CardDescription>@username</CardDescription>
          </div>
        </div>
        <Button variant={"secondary"}>Edit Profile</Button>
      </CardHeader>
      <CardContent>
        <p>my bio is 60 characters long</p>
      </CardContent>
      <CardFooter className="flex flex-col items-start space-y-4">
        <div className="flex flex-row items-center gap-4">
          <Link href={"https://itsrakesh.com"} target="_blank" passHref>
            <Button variant={"link"} size={"link"}>
              <Icons.Link className="mr-2" /> itsrakesh.com
            </Button>
          </Link>
          <div className="flex flex-row items-center gap-2 text-sm text-muted-foreground">
            <Icons.Calendar />
            <time dateTime={new Date().toString()}>
              Joined {format(new Date(), "MMMM, yyyy")}
            </time>
          </div>
        </div>
        <div>
          <div className="flex flex-col rounded-lg bg-secondary p-10 text-sm text-secondary-foreground">
            <span className="text-2xl">12k</span>
            <span>Profile Views</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
