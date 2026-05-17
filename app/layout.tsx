import type { Metadata } from "next";
import { Geist, Geist_Mono , Bebas_Neue, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: "400",
});
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Samarth Chawla - Portfolio",

  description:
    "Samarth Chawla - Full Stack Developer interested in building scalable web applications and learning new technologies.",

  keywords: [
    "Samarth Chawla",
    "Full Stack Developer",
    "Next.js Developer",
    "React Developer",
    "Web Developer Portfolio",
  ],

    icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" },
      { url: "/favicon.ico", sizes: "192x192", type: "image/x-icon" },
      { url: "/favicon.ico", sizes: "512x512", type: "image/x-icon" },
    ],

    apple: [
      { url: "/favicon.ico", sizes: "180x180", type: "image/x-icon" },
    ],

    shortcut: ["/favicon.ico"],
  },


  openGraph: {
    title: "Samarth Chawla - Portfolio",

    description:
      "Full-Stack Developer building scalable web applications, API-driven systems & modern digital experiences.",

    url: "https://www.samarthworks.in",

    siteName: "Samarth Chawla",

    images: [
      {
        url: "https://www.samarthworks.in/og-image.png",
        width: 1200,
        height: 630,
        alt: "Samarth Chawla Portfolio",
      },
    ],

    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: "Samarth Chawla - Portfolio",

    description:
      "Full-Stack Developer building scalable web applications, API-driven systems & modern digital experiences.",

    images: ["https://www.samarthworks.in/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${geistSans.variable} ${geistMono.variable} ${bebasNeue.variable} h-full antialiased`}
    >
      <body className="min-h-full font-sans">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
