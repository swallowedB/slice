import { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "sonner";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Slice",
  description:
    "오늘의 할 일을 작은 조각으로 나누어 가볍게 완성해가는 Todo 서비스",
  icons: {
    icon: "/favicon.svg",
  },
};

const pretendard = localFont({
  src: [
    {
      path: "../../public/fonts/PretendardVariable.woff2",
      style: "normal",
      weight: "100 900",
    },
  ],
  display: "swap",
  variable: "--font-pretendard",
});

export default function Rootlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ko"
      className={pretendard.variable}>
      <body>
        <Providers>{children}</Providers>
        <Toaster
          position="bottom-center"
          offset="160px"
          mobileOffset="120px"
          duration={3000}
        />
      </body>
    </html>
  );
}
