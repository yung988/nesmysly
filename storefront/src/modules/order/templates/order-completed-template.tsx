import { HttpTypes } from "@medusajs/types"

import PaymentDetails from "@modules/order/components/payment-details"
import { Layout, LayoutColumn } from "@/components/Layout"
import { LocalizedButtonLink } from "@/components/LocalizedLink"

type OrderCompletedTemplateProps = {
  order: HttpTypes.StoreOrder
}

export default function OrderCompletedTemplate({
  order,
}: OrderCompletedTemplateProps) {
  return (
    <Layout className="pt-39 pb-36">
      <LayoutColumn
        start={{ base: 1, lg: 3, xl: 4 }}
        end={{ base: 13, lg: 11, xl: 10 }}
      >
        <h1 className="text-xl md:text-2xl mb-6">Thank you for your order!</h1>
        <p className="mb-4">
          We are pleased to confirm that your order has been successfully placed
          and will be processed shortly.
        </p>
        <p>
          We have sent you the receipt and order details via{" "}
          <strong>e-mail</strong>.<br />
          Your order number is <strong>#{order.display_id}</strong>.
        </p>
        <div className="flex flex-col sm:flex-row mt-16 gap-8">
          <div className="flex-grow">
            <h2 className="font-normal">Shipping adress:</h2>
            <p className="text-grayscale-500">
              {[
                order.shipping_address?.first_name,
                order.shipping_address?.last_name,
              ]
                .filter(Boolean)
                .join(" ")}
              <br />
              {[
                order.shipping_address?.address_1,
                [
                  order.shipping_address?.postal_code,
                  order.shipping_address?.city,
                ]
                  .filter(Boolean)
                  .join(" "),
                order.shipping_address?.country?.display_name,
              ]
                .filter(Boolean)
                .join(", ")}
              <br />
              {order.shipping_address?.phone}
            </p>
          </div>
          <div>
            <h2 className="font-normal">Payment:</h2>
            <PaymentDetails order={order} />
          </div>
        </div>

        <LocalizedButtonLink href="/" isFullWidth className="mt-16">
          Go back to home page
        </LocalizedButtonLink>
      </LayoutColumn>
    </Layout>
  )
}
