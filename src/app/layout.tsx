import type { Metadata } from "next";

import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import AppHeader from "../components/layout/AppHeader";
import ConfigureAmplifyClientSide from "../components/ConfigureAmplifyClientSide";
import Providers from "./providers";

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
          <ConfigureAmplifyClientSide />
          <AppHeader />
          {children}
        </Providers>
      </body>
    </html>
  );
}