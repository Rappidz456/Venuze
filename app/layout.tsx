import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { AppProviders } from "@/components/providers/app-providers";
import { ErrorBoundary } from "@/components/providers/error-boundary";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Venuze — Find the perfect venue",
    template: "%s · Venuze",
  },
  description:
    "Search and book private party rooms, corporate halls, studios, and celebration venues in New York, London, and Dubai.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable} suppressHydrationWarning>
      <body className={`${poppins.className} antialiased`}>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <AppProviders>
          <ErrorBoundary>{children}</ErrorBoundary>
        </AppProviders>
      </body>
    </html>
  );
}
