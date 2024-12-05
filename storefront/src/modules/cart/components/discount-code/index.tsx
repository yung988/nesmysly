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
    <div className="flex gap-2 mt-10">
      <Input
        name="code"
        autoFocus={false}
        value={promotionCode}
        onChange={(e) => setPromotionCode(e.target.value)}
        uiSize="md"
        placeholder="Discount code"
        variant="outline"
        wrapperClassName="flex flex-1"
      />
      <Button onPress={addPromotionCode}>Apply</Button>
    </div>
  )
}

export default DiscountCode
