import { notFound } from "next/navigation";

import Footer from "@/components/common/layouts/footer";
import ProfilePage from "@/components/modules/your-page";
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
      <ProfilePage username={decodedUsername.slice(1)} />
      <Center>
        <div className="fixed bottom-0">
          <Footer />
        </div>
      </Center>
    </>
  );
}
