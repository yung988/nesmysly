"use client"

import { useState } from "react"
import { HttpTypes } from "@medusajs/types"

import { updateLineItem } from "@lib/data/cart"
import { getVariantItemsInStock } from "@lib/util/inventory"
import ErrorMessage from "@modules/checkout/components/error-message"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemUnitPrice from "@modules/common/components/line-item-unit-price"
import Thumbnail from "@modules/products/components/thumbnail"
import { NumberField } from "@/components/NumberField"
import { LocalizedLink } from "@/components/LocalizedLink"

type ItemProps = {
  item: HttpTypes.StoreCartLineItem
}

const Item = ({ item }: ItemProps) => {
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { handle } = item.variant?.product ?? {}

  const changeQuantity = async (quantity: number) => {
    setError(null)
    setUpdating(true)

    await updateLineItem({
      lineId: item.id,
      quantity,
    })
      .catch((err) => {
        setError(err.message)
      })
      .finally(() => {
        setUpdating(false)
      })
  }

  const maxQuantity = item.variant ? getVariantItemsInStock(item.variant) : 0

  return (
    <div className="border-b border-grayscale-100 py-8 last:pb-0 last:border-b-0">
      <div className="flex gap-6">
        <LocalizedLink href={`/products/${handle}`}>
          <Thumbnail
            thumbnail={item.variant?.product?.thumbnail}
            images={item.variant?.product?.images}
            size="3/4"
            className="w-25 sm:w-30"
          />
        </LocalizedLink>
        <div className="flex-grow flex flex-col justify-between">
          <div>
            <h2 className="sm:text-md text-base font-normal">
              <LocalizedLink href={`/products/${handle}`}>
                {item.product_title}
              </LocalizedLink>
            </h2>
            <p className="text-grayscale-500 text-xs sm:text-base">
              {item.variant?.title}
            </p>
          </div>
          <NumberField
            size="sm"
            minValue={1}
            maxValue={maxQuantity}
            value={item.quantity}
            onChange={(value) => changeQuantity(value)}
            isDisabled={updating}
            className="w-25"
            aria-label="Quantity"
          />
        </div>
        <div className="flex flex-col justify-between items-end text-right">
          <LineItemUnitPrice item={item} />
          <DeleteButton id={item.id} data-testid="product-delete-button" />
        </div>
      </div>
      <ErrorMessage error={error} data-testid="product-error-message" />
    </div>
  )
}

export default Item
