import { useMemo } from "react"

import { HttpTypes } from "@medusajs/types"
import { Popover, Select, SelectProps } from "react-aria-components"
import {
  UiSelectButton,
  UiSelectIcon,
  UiSelectListBox,
  UiSelectListBoxItem,
  UiSelectValue,
} from "@/components/ui/Select"

const CountrySelect: React.FC<
  SelectProps<
    Exclude<HttpTypes.StoreRegion["countries"], undefined>[number]
  > & {
    region?: HttpTypes.StoreRegion
  }
> = ({ placeholder = "Country", region, ...props }) => {
  const countryOptions = useMemo(() => {
    if (!region) {
      return []
    }

    return region.countries?.map((country) => ({
      value: country.iso_2,
      label: country.display_name,
    }))
  }, [region])

  return (
    <Select aria-label="Select country" {...props} placeholder={placeholder}>
      <UiSelectButton className="!h-14">
        <UiSelectValue />
        <UiSelectIcon />
      </UiSelectButton>
      <Popover className="w-[--trigger-width]">
        <UiSelectListBox>
          {countryOptions?.map(({ value, label }, index) => (
            <UiSelectListBoxItem key={index} id={value}>
              {label}
            </UiSelectListBoxItem>
          ))}
        </UiSelectListBox>
      </Popover>
    </Select>
  )
}

CountrySelect.displayName = "CountrySelect"

export default CountrySelect
