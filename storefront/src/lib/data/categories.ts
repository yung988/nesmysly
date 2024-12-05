import { sdk } from "@lib/config"
import { HttpTypes } from "@medusajs/types"
import { cache } from "react"

export const listCategories = cache(async function () {
  return sdk.store.category
    .list({ fields: "+category_children" }, { next: { tags: ["categories"] } })
    .then(({ product_categories }) => product_categories)
})

export const getCategoriesList = cache(async function (
  offset: number = 0,
  limit: number = 100,
  fields?: (keyof HttpTypes.StoreProductCategory)[]
) {
  return sdk.store.category.list(
    {
      limit,
      offset,
      fields: fields ? fields.join(",") : undefined,
    },
    { next: { tags: ["categories"] } }
  )
})

export const getCategoryByHandle = cache(async function (
  categoryHandle: string[]
) {
  return sdk.store.category.list(
    { handle: categoryHandle },
    { next: { tags: ["categories"] } }
  )
})
