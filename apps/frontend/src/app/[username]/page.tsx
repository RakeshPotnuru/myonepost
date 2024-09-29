import { Fragment } from "react";
import { notFound } from "next/navigation";

import Footer from "@/components/common/layouts/footer";
import ProfilePage from "@/components/modules/profile";
import { Center } from "@/components/ui/center";

export default function Profile({
  params,
}: Readonly<{
  params: { username: `@${string}` };
}>) {
  const { username } = params;

  if (!decodeURIComponent(username).startsWith("@")) {
    return notFound();
  }

  return (
    <Fragment>
      <ProfilePage />
      <Center>
        <div className="fixed bottom-0">
          <Footer />
        </div>
      </Center>
    </Fragment>
  );
}
