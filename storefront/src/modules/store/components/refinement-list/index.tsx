"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"

import { Layout, LayoutColumn } from "@/components/Layout"
import SortProducts, { SortOptions } from "./sort-products"
import { CollectionFilter } from "./collection-filter"
import { CategoryFilter } from "./category-filter"
import { TypeFilter } from "./type-filter"
import { MobileFilters } from "./mobile-filters"
import { MobileSort } from "./mobile-sort"

type RefinementListProps = {
  title?: string
  collections?: Record<string, string>
  collection?: string[]
  categories?: Record<string, string>
  category?: string[]
  types?: Record<string, string>
  type?: string[]
  sortBy: SortOptions | undefined
  "data-testid"?: string
}

const RefinementList = ({
  title = "Shop",
  collections,
  collection,
  categories,
  category,
  types,
  type,
  sortBy,
  "data-testid": dataTestId,
}: RefinementListProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const setQueryParams = useCallback(
    (name: string, value: string | string[]) => {
      const query = new URLSearchParams(searchParams)

      if (Array.isArray(value)) {
        query.delete(name)
        value.forEach((v) => query.append(name, v))
      } else {
        query.set(name, value)
      }

      router.push(`${pathname}?${query.toString()}`, { scroll: false })
    },
    [pathname, router, searchParams]
  )

  const setMultipleQueryParams = useCallback(
    (params: Record<string, string | string[]>) => {
      const query = new URLSearchParams(searchParams)

      Object.entries(params).forEach(([name, value]) => {
        if (Array.isArray(value)) {
          query.delete(name)
          value.forEach((v) => query.append(name, v))
        } else {
          query.set(name, value)
        }
      })

      router.push(`${pathname}?${query.toString()}`, { scroll: false })
    },
    [searchParams, pathname, router]
  )

  return (
    <Layout className="mb-4 md:mb-6">
      <LayoutColumn>
        <h2 className="text-lg md:text-2xl mb-6" id="products">
          {title}
        </h2>
        <div className="flex justify-between gap-10">
          <MobileFilters
            collections={collections}
            collection={collection}
            categories={categories}
            category={category}
            types={types}
            type={type}
            setMultipleQueryParams={setMultipleQueryParams}
          />
          <MobileSort sortBy={sortBy} setQueryParams={setQueryParams} />
          <div className="flex justify-between gap-6 max-md:hidden">
            {typeof collections !== "undefined" && (
              <CollectionFilter
                collections={collections}
                collection={collection}
                setQueryParams={setQueryParams}
              />
            )}
            {typeof categories !== "undefined" && (
              <CategoryFilter
                categories={categories}
                category={category}
                setQueryParams={setQueryParams}
              />
            )}
            {typeof types !== "undefined" && (
              <TypeFilter
                types={types}
                type={type}
                setQueryParams={setQueryParams}
              />
            )}
          </div>
          <SortProducts
            sortBy={sortBy}
            setQueryParams={setQueryParams}
            data-testid={dataTestId}
          />
        </div>
      </LayoutColumn>
    </Layout>
  )
}

export default RefinementList
