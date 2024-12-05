"use client"

// External packages
import { Popover, Select } from "react-aria-components"

// Components
import {
  UiSelectButton,
  UiSelectIcon,
  UiSelectListBox,
  UiSelectListBoxItem,
  UiSelectValue,
} from "@/components/ui/Select"

export type SortOptions = "price_asc" | "price_desc" | "created_at"

type SortProductsProps = {
  sortBy: SortOptions | undefined
  setQueryParams: (name: string, value: SortOptions) => void
}

const SortProducts = ({ sortBy, setQueryParams }: SortProductsProps) => {
  const handleChange = (value: SortOptions) => {
    setQueryParams("sortBy", value)
  }

  return (
    <Select
      placeholder="Sort by"
      selectedKey={sortBy || "sortBy"}
      onSelectionChange={(key) => {
        handleChange(key as SortOptions)
      }}
      className="max-md:hidden"
      aria-label="Sort by"
    >
      <UiSelectButton>
        <UiSelectValue />
        <UiSelectIcon />
      </UiSelectButton>
      <Popover className="w-60" crossOffset={-126}>
        <UiSelectListBox>
          <UiSelectListBoxItem id="created_at">
            Latest Arrivals
          </UiSelectListBoxItem>
          <UiSelectListBoxItem id="price_asc">Lowest price</UiSelectListBoxItem>
          <UiSelectListBoxItem id="price_desc">
            Highest price
          </UiSelectListBoxItem>
        </UiSelectListBox>
      </Popover>
    </Select>
  )
}

export default SortProducts
