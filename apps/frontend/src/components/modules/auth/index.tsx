import Footer from "@/components/common/layouts/footer";
import { Center } from "@/components/ui/center";

import AuthForm from "./auth-form";

export function AuthPage() {
  return (
    <div className="flex h-dvh flex-col">
      <Center className="mx-10 my-20 flex h-full flex-col gap-0 *:basis-1/2 md:my-0 md:flex-row md:gap-2 xl:mx-28 xl:gap-8 2xl:mx-60">
        <Center>
          <div className="px-6 text-center">
            <h1 className="text-4xl font-black sm:text-6xl">
              Share what matters, <br /> without the{" "}
              <span className="text-destructive line-through">noise</span>.
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              On My One Post, you get one post to share with the world. Keep it
              simple. Make it count. (update once a day)
            </p>
          </div>
        </Center>
        <Center className="items-start md:justify-center">
          <AuthForm />
        </Center>
      </Center>
      <Center>
        <Footer />
      </Center>
    </div>
  );
}
