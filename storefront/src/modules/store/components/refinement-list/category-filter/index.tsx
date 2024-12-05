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

export const CategoryFilter: React.FC<{
  categories: Record<string, string>
  category?: string[]
  setQueryParams: (name: string, value: string[]) => void
}> = ({ category, categories, setQueryParams }) => (
  <DialogTrigger>
    <UiSelectButton className="w-35">
      <span>Category</span>
      <UiSelectIcon />
    </UiSelectButton>
    <Popover className="w-64" crossOffset={58}>
      <UiSelectDialog>
        <CheckboxGroup
          value={category ?? []}
          onChange={(value) => {
            setQueryParams("category", value)
          }}
        >
          {Object.entries(categories).map(([key, value]) => (
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
