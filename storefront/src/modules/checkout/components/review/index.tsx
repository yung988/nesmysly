"use client"

import { twJoin } from "tailwind-merge"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { Button } from "@/components/Button"
import PaymentButton from "../payment-button"

const Review = ({ cart }: { cart: any }) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "review"

  const paidByGiftcard =
    cart?.gift_cards && cart?.gift_cards?.length > 0 && cart?.total === 0

  const previousStepsCompleted =
    cart.shipping_address &&
    cart.shipping_methods.length > 0 &&
    (cart.payment_collection || paidByGiftcard)

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
            5. Review
          </p>
        </div>
        {!isOpen &&
          previousStepsCompleted &&
          cart?.shipping_address &&
          cart?.billing_address &&
          cart?.email && (
            <Button
              variant="link"
              onPress={() => {
                router.push(pathname + "?step=review", { scroll: false })
              }}
            >
              View
            </Button>
          )}
      </div>
      {isOpen && previousStepsCompleted && (
        <>
          <p className="mb-4">
            By clicking the Place Order button, you confirm that you have read,
            understand and accept our Terms of Use, Terms of Sale and Returns
            Policy and acknowledge that you have read Medusa Store&apos;s
            Privacy Policy.
          </p>
          <PaymentButton
            cart={cart}
            selectPaymentMethod={() => {
              router.push(pathname + "?step=payment", { scroll: false })
            }}
          />
        </>
      )}
    </>
  )
}

export default Review
