"use client"

// External packages
import { CheckboxGroup, DialogTrigger, Popover } from "react-aria-components"

// Components
import {
  UiSelectButton,
  UiSelectDialog,
  UiSelectIcon,
} from "@/components/ui/Select"
import {
  UiCheckbox,
  UiCheckboxBox,
  UiCheckboxIcon,
  UiCheckboxLabel,
} from "@/components/ui/Checkbox"

export const CollectionFilter: React.FC<{
  collections: Record<string, string>
  collection?: string[]
  setQueryParams: (name: string, value: string[]) => void
}> = ({ collection, collections, setQueryParams }) => (
  <DialogTrigger>
    <UiSelectButton className="w-35">
      <span>Collection</span>
      <UiSelectIcon />
    </UiSelectButton>
    <Popover className="w-64" crossOffset={58}>
      <UiSelectDialog>
        <CheckboxGroup
          value={collection ?? []}
          onChange={(value) => {
            setQueryParams("collection", value)
          }}
        >
          {Object.entries(collections).map(([key, value]) => (
            <UiCheckbox value={key} className="py-3 px-4" key={key}>
              <UiCheckboxBox>
                <UiCheckboxIcon />
              </UiCheckboxBox>
              <UiCheckboxLabel>{value}</UiCheckboxLabel>
            </UiCheckbox>
          ))}
        </CheckboxGroup>
      </UiSelectDialog>
    </Popover>
  </DialogTrigger>
)
