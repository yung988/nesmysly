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

export const TypeFilter: React.FC<{
  types: Record<string, string>
  type?: string[]
  setQueryParams: (name: string, value: string[]) => void
}> = ({ type, types, setQueryParams }) => (
  <DialogTrigger>
    <UiSelectButton className="w-35">
      <span>Type</span>
      <UiSelectIcon />
    </UiSelectButton>
    <Popover className="w-64" crossOffset={58}>
      <UiSelectDialog>
        <CheckboxGroup
          value={type ?? []}
          onChange={(value) => {
            setQueryParams("type", value)
          }}
        >
          {Object.entries(types).map(([key, value]) => (
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
