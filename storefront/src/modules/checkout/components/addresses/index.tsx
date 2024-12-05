"use client"

import { useActionState } from "react"
import { useToggleState } from "@medusajs/ui"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { twJoin } from "tailwind-merge"
import { HttpTypes } from "@medusajs/types"

import { setAddresses } from "@lib/data/cart"
import compareAddresses from "@lib/util/compare-addresses"
import { Button } from "@/components/Button"
import BillingAddress from "../billing_address"
import ErrorMessage from "../error-message"
import ShippingAddress from "../shipping-address"
import { SubmitButton } from "../submit-button"

const Addresses = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "delivery"

  const { state: sameAsBilling, toggle: toggleSameAsBilling } = useToggleState(
    cart?.shipping_address && cart?.billing_address
      ? compareAddresses(cart?.shipping_address, cart?.billing_address)
      : true
  )

  const [message, formAction] = useActionState(setAddresses, null)

  return (
    <>
      <div className="flex justify-between mb-8 border-t border-grayscale-200 pt-8 mt-8">
        <div>
          <p
            className={twJoin(
              "transition-fontWeight duration-75",
              isOpen && "font-semibold"
            )}
          >
            2. Delivery details
          </p>
        </div>
        {!isOpen && cart?.shipping_address && (
          <Button
            variant="link"
            onPress={() => {
              router.push(pathname + "?step=delivery")
            }}
          >
            Change
          </Button>
        )}
      </div>
      {isOpen ? (
        // TODO: replace with react-hook-form and add validation
        <form action={formAction}>
          <ShippingAddress
            customer={customer}
            checked={sameAsBilling}
            onChange={toggleSameAsBilling}
            cart={cart}
          />

          {!sameAsBilling && <BillingAddress cart={cart} />}
          <SubmitButton className="mt-6">Next</SubmitButton>
          <ErrorMessage error={message} />
        </form>
      ) : cart?.shipping_address ? (
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-16">
            <div className="text-grayscale-500">Shipping address</div>
            <div>
              {[
                cart.shipping_address.first_name,
                cart.shipping_address.last_name,
              ]
                .filter(Boolean)
                .join(" ")}
              <br />
              {[
                cart.shipping_address.address_1,
                cart.shipping_address.address_2,
              ]
                .filter(Boolean)
                .join(" ")}
              <br />
              {[cart.shipping_address.postal_code, cart.shipping_address.city]
                .filter(Boolean)
                .join(" ")}
              <br />
              {cart.shipping_address.country_code?.toUpperCase()}
              <br />
              {cart.shipping_address.phone}
            </div>
          </div>
          {sameAsBilling || cart.billing_address ? (
            <div className="flex flex-row gap-16">
              <div className="text-grayscale-500">Billing address</div>
              <div>
                {sameAsBilling ? (
                  "Same as shipping address"
                ) : (
                  <>
                    {[
                      cart.billing_address?.first_name,
                      cart.billing_address?.last_name,
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    <br />
                    {[
                      cart.billing_address?.address_1,
                      cart.billing_address?.address_2,
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    <br />
                    {[
                      cart.billing_address?.postal_code,
                      cart.billing_address?.city,
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    <br />
                    {cart.billing_address?.country_code?.toUpperCase()}
                  </>
                )}
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </>
  )
}

export default Addresses
