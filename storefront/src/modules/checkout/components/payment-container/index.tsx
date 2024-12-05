import React from "react"

import { isManual } from "@lib/constants"
import { UiRadio, UiRadioBox } from "@/components/ui/Radio"
import PaymentTest from "../payment-test"

type PaymentContainerProps = {
  paymentProviderId: string
  disabled?: boolean
  paymentInfoMap: Record<string, { title: string; icon: JSX.Element }>
}

const PaymentContainer: React.FC<PaymentContainerProps> = ({
  paymentProviderId,
  paymentInfoMap,
  disabled = false,
}) => {
  const isDevelopment = process.env.NODE_ENV === "development"

  return (
    <UiRadio
      key={paymentProviderId}
      variant="outline"
      value={paymentProviderId}
      isDisabled={disabled}
      className="gap-4"
    >
      <UiRadioBox />
      <div className="group-data-[selected=true]:font-normal">
        {paymentInfoMap[paymentProviderId]?.title || paymentProviderId}

        {isManual(paymentProviderId) && isDevelopment && <PaymentTest />}
      </div>
      <span className="ml-auto group-data-[selected=true]:font-normal">
        {paymentInfoMap[paymentProviderId]?.icon}
      </span>
    </UiRadio>
  )
}

export default PaymentContainer
