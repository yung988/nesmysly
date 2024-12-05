import { Metadata } from "next"
import CartTemplate from "@modules/cart/templates"

import { retrieveCart } from "@lib/data/cart"
import { getCustomer } from "@lib/data/customer"

export const metadata: Metadata = {
  title: "Cart",
  description: "View your cart",
}

export default async function Cart() {
  const cart = await retrieveCart()
  const customer = await getCustomer()

  return <CartTemplate cart={cart} customer={customer} />
}
