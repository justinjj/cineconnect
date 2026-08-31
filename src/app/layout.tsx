import type { Metadata } from "next";

import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import AppHeader from "../components/layout/AppHeader";
import ConfigureAmplifyClientSide from "../components/ConfigureAmplifyClientSide";
import Providers from "./providers";
import { ComparisonProvider } from "./context/ComparisonContext";
import ComparisonSelector from "@/components/comparison/ComparisonSelector";

export const metadata: Metadata = {
  title: "CineConnect",
  description: "Discover connections between movies and actors",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <ComparisonProvider>
            <ConfigureAmplifyClientSide />
            <AppHeader />
            {children}
            <ComparisonSelector />
          </ComparisonProvider>
        </Providers>
      </body>
    </html>
  );
}