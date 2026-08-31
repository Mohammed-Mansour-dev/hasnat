import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScroll from "@/components/motion/SmoothScroll";

const almarai = localFont({
  src: [
    {
      path: "../../public/fonts/Almarai-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/Almarai-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Almarai-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/Almarai-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-almarai",
});

export const metadata = {
  title: "حسنات | أهدِ مصحفًا واترك أثرًا لا ينقطع",
  description:
    "متجر حسنات لإهداء المصاحف وتوزيعها على ضيوف الرحمن.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${almarai.variable} font-sans antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}