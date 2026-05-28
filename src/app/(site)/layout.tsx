import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { WelcomePopup } from "@/components/layout/welcome-popup";
import "../globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Dr. Sailaja's Super Speciality Eye Hospital, Horamavu",
    template: "%s · Dr. Sailaja's Eye Hospital",
  },
  description:
    "Dr. Sailaja's Super Speciality Eye Hospital in Horamavu, Bangalore — delivering expert-led, patient-first eye care with advanced diagnostics and surgical excellence.",
  metadataBase: new URL("https://sailajahospital.com"),
};

export const viewport: Viewport = {
  themeColor: "#8B6914",
  width: "device-width",
  initialScale: 1,
};

export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={cn(poppins.variable, "h-full antialiased")}>
      <body className="min-h-full bg-background font-sans text-foreground">
        {children}
        <WelcomePopup />
      </body>
    </html>
  );
}
