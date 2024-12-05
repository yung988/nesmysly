"use client"

import React from "react"
import { HttpTypes } from "@medusajs/types"

import { applyPromotions } from "@lib/data/cart"
import { Input } from "@/components/Forms"
import { Button } from "@/components/Button"

type DiscountCodeProps = {
  cart: HttpTypes.StoreCart & {
    promotions: HttpTypes.StorePromotion[]
  }
}

const DiscountCode: React.FC<DiscountCodeProps> = ({ cart }) => {
  const { promotions = [] } = cart
  const [promotionCode, setPromotionCode] = React.useState<string>("")

  const addPromotionCode = async () => {
    if (!promotionCode) {
      return
    }
    const codes = promotions
      .filter((p) => p.code === undefined)
      .map((p) => p.code!)
    codes.push(promotionCode)

    await applyPromotions(codes)

    setPromotionCode("")
  }

  return (
    <div className="flex max-sm:flex-col gap-x-8 gap-y-4 mb-8">
      <Input
        name="code"
        autoFocus={false}
        value={promotionCode}
        onChange={(e) => setPromotionCode(e.target.value)}
        variant="outline"
        placeholder="Discount code"
        wrapperClassName="flex-1"
        className="max-lg:h-12"
      />
      <Button onPress={addPromotionCode} className="lg:h-auto grow-0 h-12">
        Apply
      </Button>
    </div>
  )
}

export default DiscountCode
