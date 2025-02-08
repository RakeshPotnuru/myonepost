import Footer from "@/components/common/layouts/footer";
import { Center } from "@/components/ui/center";

import AuthForm from "./auth-form";
import Logo from "./logo";
import { Words } from "./words";

export function AuthPage() {
  return (
    <div className="flex h-dvh flex-col">
      <Center className="mx-10 my-20 flex h-full flex-col gap-4 md:my-0 md:flex-row md:gap-2 *:md:w-full xl:mx-28 xl:gap-8 2xl:mx-60">
        <Center className="flex basis-2/3 flex-col space-y-8">
          <Logo />
          <div className="px-6 text-center">
            <h1 className="text-4xl font-black sm:text-6xl">
              Share what matters, <br /> without the <Words />
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              On My One Post, you get one post to share with the world. Keep it
              simple. Make it count. (update once a day)
            </p>
          </div>
        </Center>
        <Center className="basis-2/6 items-start md:justify-center">
          <AuthForm />
        </Center>
      </Center>
      <Center>
        <Footer />
      </Center>
    </div>
  );
}
