// External components
import { Metadata } from "next"

// Components
import { Layout, LayoutColumn } from "@/components/Layout"
import { LocalizedButtonLink } from "@/components/LocalizedLink"
import { Footer } from "@/components/Footer"
import { Header } from "@/components/Header"

export const metadata: Metadata = {
  title: "404",
  description: "Something went wrong",
}

export default function NotFound() {
  return (
    <>
      <Header />
      <Layout className="pt-20 md:pt-47 md:pb-64">
        <LayoutColumn start={1} end={{ base: 13, lg: 7, xl: 8 }}>
          <h1 className="text-3xl max-lg:mb-8 text-black">
            404
            <br /> Page not found
          </h1>
        </LayoutColumn>
        <LayoutColumn start={{ base: 1, lg: 7, xl: 8 }} end={13}>
          <div className="text-md mb-8 text-black">
            <p>
              The page you are looking for doesn&apos;t exist or an error
              occurred. Go back, or head over to our home page.
            </p>
          </div>
          <LocalizedButtonLink href="/">Back to home</LocalizedButtonLink>
        </LayoutColumn>
      </Layout>
      <Footer />
    </>
  )
}
