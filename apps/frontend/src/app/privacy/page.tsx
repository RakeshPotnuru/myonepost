import Footer from "@/components/common/layouts/footer";
import { Center } from "@/components/ui/center";

export default function PrivacyPolicy() {
  return (
    <>
      <div className="flex flex-col items-center py-8">
        <div className="w-full max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-center text-3xl font-bold">Privacy Policy</h1>
          <div className="mt-8 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold">1. Introduction</h2>
              <p className="mt-2 text-muted-foreground">
                My One Post (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) is
                committed to protecting your privacy. This Privacy Policy
                explains how we collect, use, and share your personal
                information when you use our platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold">
                2. Information We Collect
              </h2>
              <p className="mt-2 text-muted-foreground">
                We collect the following types of information:
              </p>
              <ul className="mt-2 list-inside list-disc text-muted-foreground">
                <li>
                  <strong>Personal Information:</strong> Information such as
                  your name, email address, and username when you create an
                  account.
                </li>
                <li>
                  <strong>Content:</strong> Information related to the posts,
                  comments, and media you share on the platform.
                </li>
                <li>
                  <strong>Usage Data:</strong> Information about how you use the
                  platform, including interactions, likes, and comments.
                </li>
                <li>
                  <strong>Cookies:</strong> We may use cookies to enhance user
                  experience and collect analytics.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold">
                3. How We Use Your Information
              </h2>
              <p className="mt-2 text-muted-foreground">
                We use the information we collect for the following purposes:
              </p>
              <ul className="mt-2 list-inside list-disc text-muted-foreground">
                <li>
                  To provide and maintain our platform&apos;s core features and
                  functionality.
                </li>
                <li>
                  To personalize your experience and improve our services.
                </li>
                <li>
                  To communicate with you regarding updates, changes, or
                  support.
                </li>
                <li>
                  To enforce our Terms of Service and other platform policies.
                </li>
                <li>
                  To analyze user behavior for internal research and platform
                  enhancements.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold">
                4. Sharing Your Information
              </h2>
              <p className="mt-2 text-muted-foreground">
                We do not sell your personal information. We may share your
                information in the following circumstances:
              </p>
              <ul className="mt-2 list-inside list-disc text-muted-foreground">
                <li>
                  With service providers who help us operate our platform.
                </li>
                <li>When required by law or to protect our legal rights.</li>
                <li>To prevent harm or illegal activities on the platform.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold">5. Data Security</h2>
              <p className="mt-2 text-muted-foreground">
                We take appropriate security measures to protect your data.
                However, no method of transmission over the internet or
                electronic storage is 100% secure, and we cannot guarantee
                absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold">6. Your Rights</h2>
              <p className="mt-2 text-muted-foreground">
                Depending on your location, you may have certain rights
                regarding your personal information, including the right to
                access, correct, or delete your data. To exercise these rights,
                please contact us at privacy@myonepost.com.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold">
                7. Changes to This Policy
              </h2>
              <p className="mt-2 text-muted-foreground">
                We may update this Privacy Policy from time to time. Any changes
                will be posted on this page, and we will notify users by email
                if there are significant changes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold">8. Contact Us</h2>
              <p className="mt-2 text-muted-foreground">
                If you have any questions about this Privacy Policy, please
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
