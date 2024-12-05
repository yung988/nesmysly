"use client"

// External components
import * as React from "react"

// Components
import { Button } from "@/components/Button"
import { Input } from "@/components/Forms"
import { LocalizedLink } from "@/components/LocalizedLink"

export const NewsletterForm: React.FC<{ className?: string }> = ({
  className,
}) => {
  const [isSubmitted, setIsSubmitted] = React.useState(false)

  return (
    <div className={className}>
      <h2 className="text-md md:text-lg mb-2 md:mb-1">Join our newsletter</h2>
      {isSubmitted ? (
        <p className="max-md:text-xs">
          Thank you for subscribing to our newsletter!
        </p>
      ) : (
        <>
          <p className="max-md:text-xs mb-4">
            We will also send you our discount coupons!
          </p>
          <form
            onSubmit={(event) => {
              event.preventDefault()

              setIsSubmitted(true)
            }}
          >
            <div className="flex gap-2">
              <Input
                uiSize="sm"
                name="email"
                type="email"
                placeholder="Your email"
                wrapperClassName="mb-4 flex-1"
                className="rounded-xs"
              />
              <Button type="submit" size="sm" className="h-9 text-xs">
                Subscribe
              </Button>
            </div>
          </form>
          <p className="text-xs text-grayscale-500">
            By subscribing you agree to with our{" "}
            <LocalizedLink
              href="/privacy-policy"
              variant="underline"
              className="!pb-0"
            >
              Privacy Policy
            </LocalizedLink>{" "}
            and provide consent to receive updates from our company.
          </p>
        </>
      )}
    </div>
  )
}
