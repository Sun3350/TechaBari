import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css"
const inter = Raleway({ subsets: ["latin"] });
import HeadBar from "./component/HeadBar";
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
       <HeadBar/>
        {children}
        </body>
    </html>
  );
}
