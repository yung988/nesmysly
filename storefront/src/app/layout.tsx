import { Metadata } from "next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import localFont from "next/font/local"
import { getBaseURL } from "@lib/util/env"

import "../styles/globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

const monaSans = localFont({
  src: [
    {
      path: "../../public/fonts/mona-sans/Mona-Sans-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/mona-sans/Mona-Sans-RegularItalic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/mona-sans/Mona-Sans-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/mona-sans/Mona-Sans-MediumItalic.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../public/fonts/mona-sans/Mona-Sans-SemiBold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/mona-sans/Mona-Sans-SemiBoldItalic.otf",
      weight: "600",
      style: "italic",
    },
    {
      path: "../../public/fonts/mona-sans/Mona-Sans-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/mona-sans/Mona-Sans-BoldItalic.otf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../../public/fonts/mona-sans/Mona-Sans-Black.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/fonts/mona-sans/Mona-Sans-BlackItalic.otf",
      weight: "800",
      style: "italic",
    },
  ],
  variable: "--font-mona-sans",
})

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light" className="antialiased">
      <body className={`${monaSans.className}`}>
        <main className="relative">{props.children}</main>
        <SpeedInsights />
      </body>
    </html>
  )
}
