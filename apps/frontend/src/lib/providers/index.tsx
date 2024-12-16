import { PHProvider } from "./posthog";
import ReactQueryProvider from "./react-query";
import { ThemeProvider } from "./theme";

export default function Providers({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <PHProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </ThemeProvider>
    </PHProvider>
  );
}
