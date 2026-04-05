import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/component/Providers"
import Sidebar from "@/component/Sidebar";
import { Box } from "@mui/material";

export const metadata: Metadata = {
  title: "Magpie Dashboard",
  description: "Dashboard for managing your Magpie application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Box sx={{ display: 'flex' }}>
            <Sidebar />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              {children}
            </Box>
          </Box>
        </Providers>
      </body>
    </html>
  );
}