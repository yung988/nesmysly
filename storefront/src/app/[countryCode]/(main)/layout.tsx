// External
import { Metadata } from "next"

// Lib
import { getBaseURL } from "@lib/util/env"

// Components
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default async function PageLayout(props: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {props.children}
      <Footer />
    </>
  )
}
