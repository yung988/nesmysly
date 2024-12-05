import { Suspense } from "react"
import { HttpTypes } from "@medusajs/types"
import Image from "next/image"

import { collectionMetadataCustomFieldsSchema } from "@lib/util/collections"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import { Layout, LayoutColumn } from "@/components/Layout"
import { getCategoriesList } from "@lib/data/categories"
import { getProductTypesList } from "@lib/data/product-types"

export default async function CollectionTemplate({
  sortBy,
  collection,
  category,
  type,
  page,
  countryCode,
}: {
  sortBy?: SortOptions
  collection: HttpTypes.StoreCollection
  category?: string[]
  type?: string[]
  page?: string
  countryCode: string
}) {
  const pageNumber = page ? parseInt(page) : 1

  const categories = await getCategoriesList(0, 100, ["id", "name", "handle"])
  const types = await getProductTypesList(0, 100, ["id", "value"])

  const collectionDetails = collectionMetadataCustomFieldsSchema.safeParse(
    collection.metadata ?? {}
  )

  return (
    <>
      <div className="max-md:pt-18 relative aspect-[2/1] md:h-screen w-full max-w-full mb-8 md:mb-16">
        <Image
          src={
            collectionDetails.data?.collection_page_image?.url ||
            "/images/content/living-room4.png"
          }
          fill
          alt={collection.title + " image"}
          className="object-cover z-0"
        />
      </div>
      {collectionDetails.success &&
        ((typeof collectionDetails.data.collection_page_heading === "string" &&
          collectionDetails.data.collection_page_heading.length > 0) ||
          (typeof collectionDetails.data.collection_page_content === "string" &&
            collectionDetails.data.collection_page_content.length > 0)) && (
          <Layout className="mb-26 md:mb-36">
            {collectionDetails.data.collection_page_heading && (
              <LayoutColumn start={1} end={{ base: 13, lg: 7 }}>
                <h3 className="text-lg max-md:mb-6 md:text-2xl">
                  {collectionDetails.data.collection_page_heading}
                </h3>
              </LayoutColumn>
            )}
            {collectionDetails.data.collection_page_content && (
              <LayoutColumn start={{ base: 1, lg: 8 }} end={13}>
                <div className="md:text-md md:mt-18 flex flex-col gap-6 md:gap-8">
                  {collectionDetails.data.collection_page_content
                    .split("\n")
                    .map((p) => p.trim())
                    .filter(Boolean)
                    .map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                </div>
              </LayoutColumn>
            )}
          </Layout>
        )}
      <RefinementList
        sortBy={sortBy}
        title={collection.title}
        categories={Object.fromEntries(
          categories.product_categories.map((c) => [c.handle, c.name])
        )}
        category={category}
        types={Object.fromEntries(
          types.productTypes.map((t) => [t.value, t.value])
        )}
        type={type}
      />
      <Suspense fallback={<SkeletonProductGrid />}>
        <PaginatedProducts
          sortBy={sortBy}
          page={pageNumber}
          collectionId={collection.id}
          countryCode={countryCode}
          categoryId={
            !category
              ? undefined
              : categories.product_categories
                  .filter((c) => category.includes(c.handle))
                  .map((c) => c.id)
          }
          typeId={
            !type
              ? undefined
              : types.productTypes
                  .filter((t) => type.includes(t.value))
                  .map((t) => t.id)
          }
        />
      </Suspense>
      <div className="pb-26 md:pb-36" />
    </>
  )
}
