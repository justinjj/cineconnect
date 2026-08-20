import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";

import AppHeader from "../components/layout/AppHeader";
import ConfigureAmplifyClientSide from "../components/ConfigureAmplifyClientSide";

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
        <AppRouterCacheProvider>
          <ConfigureAmplifyClientSide />
          
          <AppHeader />
          {children}
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}