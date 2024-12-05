"use server"

import { cache } from "react"
import { sdk } from "@lib/config"
import medusaError from "@lib/util/medusa-error"
import { enrichLineItems } from "@lib/util/enrich-line-items"
import { getAuthHeaders } from "./cookies"

export const retrieveOrder = cache(async function (id: unknown) {
  if (typeof id !== "string") {
    throw new Error("Invalid order id")
  }

  const order = await sdk.store.order
    .retrieve(
      id,
      { fields: "*payment_collections.payments" },
      { next: { tags: ["order"] }, ...(await getAuthHeaders()) }
    )
    .then(({ order }) => order)
    .catch((err) => medusaError(err))

  if (order.items?.length && order.region_id) {
    order.items = await enrichLineItems(order.items, order.region_id)
  }

  return order
})

export const listOrders = cache(async function (
  limit: number = 10,
  offset: number = 0
) {
  if (
    typeof limit !== "number" ||
    typeof offset !== "number" ||
    limit < 1 ||
    offset < 0 ||
    limit > 100 ||
    !Number.isSafeInteger(offset)
  ) {
    throw new Error("Invalid input data")
  }

  return sdk.store.order
    .list(
      { limit, offset },
      { next: { tags: ["order"] }, ...(await getAuthHeaders()) }
    )
    .then(({ orders }) => orders)
    .catch((err) => medusaError(err))
})
