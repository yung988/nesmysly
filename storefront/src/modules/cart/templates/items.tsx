import { HttpTypes } from "@medusajs/types"

import Item from "@modules/cart/components/item"

type ItemsTemplateProps = {
  items?: HttpTypes.StoreCartLineItem[]
}

const ItemsTemplate = ({ items }: ItemsTemplateProps) => {
  return (
    <div>
      <div className="lg:h-22 pb-12 lg:pb-0 border-b border-b-grayscale-100">
        <h1 className="md:text-2xl text-lg leading-none">Your shopping cart</h1>
      </div>
      <div>
        {items
          ? items
              .sort((a, b) => {
                return (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1
              })
              .map((item) => {
                return <Item key={item.id} item={item} />
              })
          : null}
      </div>
    </div>
  )
}

export default ItemsTemplate
