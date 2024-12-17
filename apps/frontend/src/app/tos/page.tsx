import type { Metadata } from "next";

import Footer from "@/components/common/layouts/footer";
import { Center } from "@/components/ui/center";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: siteConfig.pages.tos.title,
  description: siteConfig.pages.tos.description,
};

export default function TermsOfService() {
  return (
    <>
      <div className="flex flex-col items-center py-8">
        <div className="w-full max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-center text-3xl font-bold">Terms of Service</h1>
          <div className="mt-8 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold">1. Introduction</h2>
              <p className="mt-2 text-muted-foreground">
                Welcome to My One Post. By using our platform, you agree to
                comply with and be bound by these terms of service. Please
                review the following terms carefully.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold">
                2. User Responsibilities
              </h2>
              <p className="mt-2 text-muted-foreground">
                You agree to use the platform in a manner consistent with all
                applicable laws and regulations. You are solely responsible for
                your post and interactions with others.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold">3. Content Ownership</h2>
              <p className="mt-2 text-muted-foreground">
                Users retain ownership of the content they post on My One Post.
                By posting content, you grant My One Post a license to use,
                display, and distribute your content for platform operations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold">
                4. Prohibited Activities
              </h2>
              <ul className="mt-2 list-inside list-disc text-muted-foreground">
                <li>
                  Posting or sharing content with offensive or inappropriate
                  language or visuals.
                </li>
                <li>
                  Engaging in harassment, bullying, or targeted abuse towards
                  any user.
                </li>
                <li>
                  Spreading spam or unwanted, irrelevant, or repetitive content.
                </li>
                <li>Sharing false or misleading information.</li>
                <li>
                  Promoting hate speech or discrimination against individuals or
                  groups.
                </li>
                <li>
                  Posting content that depicts or encourages violence or harm.
                </li>
                <li>
                  Uploading content that violates copyright or intellectual
                  property rights.
                </li>
                <li>Sharing content that violates the privacy of others.</li>
                <li>
                  Posting or promoting content related to child exploitation in
                  any form.
                </li>
                <li>
                  Engaging in any other inappropriate behavior not explicitly
                  mentioned above.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold">5. Account Termination</h2>
              <p className="mt-2 text-muted-foreground">
                My One Post reserves the right to suspend or terminate your
                account at any time if we suspect a violation of these terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold">
                6. Limitation of Liability
              </h2>
              <p className="mt-2 text-muted-foreground">
                My One Post is not liable for any indirect, incidental, or
                consequential damages arising from your use of the platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold">
                7. Changes to the Terms
              </h2>
              <p className="mt-2 text-muted-foreground">
                We reserve the right to modify these terms at any time.
                Continued use of the platform implies acceptance of the updated
                terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold">8. Contact Us</h2>
              <p className="mt-2 text-muted-foreground">
                If you have any questions about these Terms of Service, please
                contact us at hello@myonepost.com.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Center>
        <Footer />
      </Center>
    </>
  );
}
