"use client"

import { useCallback, useContext, useEffect, useMemo, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import ErrorMessage from "@modules/checkout/components/error-message"
import { CreditCard } from "@medusajs/icons"
import { CardElement } from "@stripe/react-stripe-js"
import { StripeCardElementOptions } from "@stripe/stripe-js"
import { RadioGroup } from "react-aria-components"
import { twJoin } from "tailwind-merge"

import { isStripe as isStripeFunc, paymentInfoMap } from "@lib/constants"
import { initiatePaymentSession } from "@lib/data/cart"
import PaymentContainer from "@modules/checkout/components/payment-container"
import { StripeContext } from "@modules/checkout/components/payment-wrapper"
import { Button } from "@/components/Button"

const Payment = ({
  cart,
  availablePaymentMethods,
}: {
  cart: any
  availablePaymentMethods: any[]
}) => {
  const activeSession = cart.payment_collection?.payment_sessions?.find(
    (paymentSession: any) => paymentSession.status === "pending"
  )

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [cardBrand, setCardBrand] = useState<string | null>(null)
  const [cardComplete, setCardComplete] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    activeSession?.provider_id ?? ""
  )

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "payment"

  const isStripe = isStripeFunc(activeSession?.provider_id)
  const stripeReady = useContext(StripeContext)

  const paidByGiftcard =
    cart?.gift_cards && cart?.gift_cards?.length > 0 && cart?.total === 0

  const paymentReady =
    (activeSession && cart?.shipping_methods.length !== 0) || paidByGiftcard

  const useOptions: StripeCardElementOptions = useMemo(() => {
    return {
      style: {
        base: {
          fontFamily: "Inter, sans-serif",
          color: "#424270",
          "::placeholder": {
            color: "rgb(107 114 128)",
          },
        },
      },
      classes: {
        base: "pt-3 pb-1 block w-full h-11 px-4 mt-0 bg-ui-bg-field border rounded-md appearance-none focus:outline-none focus:ring-0 focus:shadow-borders-interactive-with-active border-ui-border-base hover:bg-ui-bg-field-hover transition-all duration-300 ease-in-out",
      },
    }
  }, [])

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const handleEdit = () => {
    router.push(pathname + "?" + createQueryString("step", "payment"), {
      scroll: false,
    })
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      const shouldInputCard =
        isStripeFunc(selectedPaymentMethod) && !activeSession

      if (!activeSession) {
        await initiatePaymentSession(selectedPaymentMethod)
      }

      if (!shouldInputCard) {
        return router.push(
          pathname + "?" + createQueryString("step", "review"),
          {
            scroll: false,
          }
        )
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    setError(null)
  }, [isOpen])

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
            4. Payment
          </p>
        </div>
        {!isOpen && paymentReady && (
          <Button variant="link" onPress={handleEdit}>
            Change
          </Button>
        )}
      </div>
      <div className={isOpen ? "block" : "hidden"}>
        {!paidByGiftcard && availablePaymentMethods?.length && (
          <>
            <RadioGroup
              value={selectedPaymentMethod}
              onChange={setSelectedPaymentMethod}
              aria-label="Payment methods"
            >
              {availablePaymentMethods
                .sort((a, b) => {
                  return a.provider_id > b.provider_id ? 1 : -1
                })
                .map((paymentMethod) => {
                  return (
                    <PaymentContainer
                      paymentInfoMap={paymentInfoMap}
                      paymentProviderId={paymentMethod.id}
                      key={paymentMethod.id}
                    />
                  )
                })}
            </RadioGroup>
            {isStripe && stripeReady && (
              <div className="mt-5">
                <p className=" mb-1">Enter your card details:</p>

                <CardElement
                  options={useOptions as StripeCardElementOptions}
                  onChange={(e) => {
                    setCardBrand(
                      e.brand &&
                        e.brand.charAt(0).toUpperCase() + e.brand.slice(1)
                    )
                    setError(e.error?.message || null)
                    setCardComplete(e.complete)
                  }}
                />
              </div>
            )}
          </>
        )}

        {paidByGiftcard && (
          <div className="flex gap-10">
            <div className="text-grayscale-500">Payment method</div>
            <div>Gift card</div>
          </div>
        )}

        <ErrorMessage
          error={error}
          data-testid="payment-method-error-message"
        />

        <Button
          className="mt-6"
          onPress={handleSubmit}
          isLoading={isLoading}
          disabled={
            (isStripe && !cardComplete) ||
            (!selectedPaymentMethod && !paidByGiftcard)
          }
          data-testid="submit-payment-button"
        >
          {!activeSession && isStripeFunc(selectedPaymentMethod)
            ? " Enter card details"
            : "Continue to review"}
        </Button>
      </div>

      <div className={isOpen ? "hidden" : "block"}>
        {cart && paymentReady && activeSession ? (
          <div className="flex flex-col gap-4">
            <div className="flex gap-10">
              <div className="text-grayscale-500">Payment method</div>
              <div>
                {paymentInfoMap[selectedPaymentMethod]?.title ||
                  selectedPaymentMethod}
              </div>
            </div>
            <div className="flex gap-10">
              <div className="text-grayscale-500">Payment details</div>
              {isStripeFunc(selectedPaymentMethod) && cardBrand ? (
                <div className="flex items-center gap-2">
                  {paymentInfoMap[selectedPaymentMethod]?.icon || (
                    <CreditCard />
                  )}
                  <p>{cardBrand}</p>
                </div>
              ) : (
                <div>
                  <p>Please enter card details</p>
                </div>
              )}
            </div>
          </div>
        ) : paidByGiftcard ? (
          <div className="flex gap-10">
            <div className="text-grayscale-500">Payment method</div>
            <div>Gift card</div>
          </div>
        ) : null}
      </div>
    </>
  )
}

export default Payment
