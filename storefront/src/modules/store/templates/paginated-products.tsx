import { getProductsListWithSort } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import { HttpTypes } from "@medusajs/types"
import ProductPreview from "@modules/products/components/product-preview"
import { Pagination } from "@modules/store/components/pagination"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import { Layout, LayoutColumn } from "@/components/Layout"

const PRODUCT_LIMIT = 12

export default async function PaginatedProducts({
  sortBy,
  page,
  collectionId,
  categoryId,
  typeId,
  productsIds,
  countryCode,
}: {
  sortBy?: SortOptions
  page: number
  collectionId?: string | string[]
  categoryId?: string | string[]
  typeId?: string | string[]
  productsIds?: string[]
  countryCode: string
}) {
  const queryParams: HttpTypes.StoreProductParams = {
    limit: PRODUCT_LIMIT,
  }

  if (collectionId) {
    queryParams["collection_id"] = Array.isArray(collectionId)
      ? collectionId
      : [collectionId]
  }

  if (categoryId) {
    queryParams["category_id"] = Array.isArray(categoryId)
      ? categoryId
      : [categoryId]
  }

  if (typeId) {
    queryParams["type_id"] = Array.isArray(typeId) ? typeId : [typeId]
  }

  if (productsIds) {
    queryParams["id"] = productsIds
  }

  if (sortBy === "created_at") {
    queryParams["order"] = "created_at"
  }

  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  let {
    response: { products, count },
  } = await getProductsListWithSort({
    page,
    queryParams,
    sortBy,
    countryCode,
  })

  const totalPages = Math.ceil(count / PRODUCT_LIMIT)

  return (
    <>
      <Layout className="gap-y-10 md:gap-y-16 mb-16 md:mb-20">
        {products.map((p) => {
          return (
            <LayoutColumn key={p.id} className="md:!col-span-4 !col-span-6">
              <ProductPreview product={p} region={region} />
            </LayoutColumn>
          )
        })}
      </Layout>
      {totalPages > 1 && (
        <Pagination
          data-testid="product-pagination"
          page={page}
          totalPages={totalPages}
        />
      )}
    </>
  )
}
