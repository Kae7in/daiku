import "./globals.css";
import { Inter } from "next/font/google";
import { NavBar } from "./navbar/navbar";

export const metadata = {
  title: "daiku",
  description: "The UI tool",
};

const fontInter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fontInter.className}>
      <body className="bg-black text-gray-100">
        <NavBar />
        {children}
      </body>
    </html>
  );
}
