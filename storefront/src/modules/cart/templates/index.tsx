import ItemsTemplate from "./items"
import Summary from "./summary"
import EmptyCartMessage from "../components/empty-cart-message"
import { HttpTypes } from "@medusajs/types"

// Components
import { Layout, LayoutColumn } from "@/components/Layout"

// TODO: Ask customer if they want to sign in or continue as guest
const CartTemplate = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) => {
  return (
    <Layout className="pt-39 pb-36">
      {cart?.items?.length ? (
        <>
          <LayoutColumn
            start={1}
            end={{ base: 13, lg: 9, xl: 10 }}
            className="mb-14 lg:mb-0"
          >
            <ItemsTemplate items={cart?.items} />
          </LayoutColumn>
          <LayoutColumn start={{ base: 1, lg: 9, xl: 10 }} end={13}>
            {cart && cart.region && <Summary cart={cart as any} />}
          </LayoutColumn>
        </>
      ) : (
        <LayoutColumn start={1} end={{ base: 13 }} className="mb-14 lg:mb-0">
          <EmptyCartMessage />
        </LayoutColumn>
      )}
    </Layout>
  )
}

export default CartTemplate
