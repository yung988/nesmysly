"use client"

import { useActionState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { twJoin } from "tailwind-merge"
import { HttpTypes } from "@medusajs/types"

import { setEmail } from "@lib/data/cart"
import { Button } from "@/components/Button"
import { Input } from "@/components/Forms"
import ErrorMessage from "../error-message"
import { SubmitButton } from "../submit-button"

const Email = ({
  cart,
  customer,
  countryCode,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
  countryCode: string
}) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "email"

  const [state, formAction] = useActionState(setEmail, null)

  return (
    <>
      <div className="flex justify-between mb-8">
        <div>
          <p
            className={twJoin(
              "transition-fontWeight duration-75",
              isOpen && "font-semibold"
            )}
          >
            1. Email
          </p>
        </div>
        {!isOpen && (
          <Button
            variant="link"
            onPress={() => {
              router.push(pathname + "?step=email")
            }}
          >
            Change
          </Button>
        )}
      </div>
      {isOpen ? (
        <form action={formAction}>
          <input type="hidden" name="country_code" value={countryCode} />

          <Input
            placeholder="Email"
            name="email"
            type="email"
            title="Enter a valid email address."
            autoComplete="email"
            defaultValue={cart?.email || customer?.email}
            required
            data-testid="shipping-email-input"
            variant="outline"
          />
          <SubmitButton className="mt-6">Next</SubmitButton>
          <ErrorMessage error={state} />
        </form>
      ) : cart?.email ? (
        <ul className="flex gap-16">
          <li className="text-grayscale-500">Email</li>
          <li>{cart.email}</li>
        </ul>
      ) : null}
    </>
  )
}

export default Email
