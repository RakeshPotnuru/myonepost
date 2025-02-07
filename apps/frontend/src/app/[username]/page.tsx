import { notFound } from "next/navigation";

import Footer from "@/components/common/layouts/footer";
import MyPage from "@/components/modules/my-page";
import { Center } from "@/components/ui/center";

export default function YourPage({
  params,
}: Readonly<{
  params: { username: `@${string}` };
}>) {
  const { username } = params;

  const decodedUsername = decodeURIComponent(username);

  if (!decodedUsername.startsWith("@")) {
    return notFound();
  }

  return (
    <>
      <MyPage username={decodedUsername.slice(1)} />
      <Center>
        <Footer />
      </Center>
    </>
  );
}
