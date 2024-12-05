import { getPricesForVariant } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"

type LineItemUnitPriceProps = {
  item: HttpTypes.StoreCartLineItem | HttpTypes.StoreOrderLineItem
}

const LineItemUnitPrice = ({ item }: LineItemUnitPriceProps) => {
  const {
    original_price,
    calculated_price,
    original_price_number,
    calculated_price_number,
  } = getPricesForVariant(item.variant) ?? {}
  const hasReducedPrice = calculated_price_number < original_price_number

  return (
    <div>
      {hasReducedPrice ? (
        <>
          <p className="text-base sm:text-sm font-semibold text-red-primary">
            {calculated_price}
          </p>
          <p className="text-grayscale-500 line-through">{original_price}</p>
        </>
      ) : (
        <p className="text-base sm:text-sm font-semibold">{calculated_price}</p>
      )}
    </div>
  )
}

export default LineItemUnitPrice
