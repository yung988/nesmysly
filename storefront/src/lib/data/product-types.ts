import { sdk } from "@lib/config"
import { cache } from "react"
import { HttpTypes, PaginatedResponse } from "@medusajs/types"

export const getProductTypesList = cache(async function (
  offset: number = 0,
  limit: number = 100,
  fields?: (keyof HttpTypes.StoreProductType)[]
): Promise<{ productTypes: HttpTypes.StoreProductType[]; count: number }> {
  return sdk.client
    .fetch<
      PaginatedResponse<{
        product_types: HttpTypes.StoreProductType[]
        count: number
      }>
    >("/store/custom/product-types", {
      query: { limit, offset, fields: fields ? fields.join(",") : undefined },
      headers: { next: { tags: ["product-types"] } },
    })
    .then(({ product_types, count }) => ({
      productTypes: product_types,
      count,
    }))
})

export const getProductTypeByHandle = cache(async function (
  handle: string
): Promise<HttpTypes.StoreProductType> {
  return sdk.client
    .fetch<
      PaginatedResponse<{
        product_types: HttpTypes.StoreProductType[]
        count: number
      }>
    >("/store/custom/product-types", {
      query: { handle, limit: 1 },
      headers: { next: { tags: ["product-types"] } },
    })
    .then(({ product_types }) => product_types[0])
})
