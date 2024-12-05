import { Button } from "@/components/Button"
import {
  UiCheckbox,
  UiCheckboxBox,
  UiCheckboxIcon,
  UiCheckboxLabel,
} from "@/components/ui/Checkbox"
import * as React from "react"
import {
  CheckboxGroup,
  Dialog,
  DialogTrigger,
  Label,
  Modal,
  ModalOverlay,
} from "react-aria-components"

export const MobileFilters: React.FC<{
  collections?: Record<string, string>
  collection?: string[]
  categories?: Record<string, string>
  category?: string[]
  types?: Record<string, string>
  type?: string[]
  setMultipleQueryParams: (params: Record<string, string | string[]>) => void
}> = ({
  collections,
  collection,
  categories,
  category,
  types,
  type,
  setMultipleQueryParams,
}) => {
  return (
    <DialogTrigger>
      <Button
        iconName="plus"
        iconPosition="end"
        className="bg-white md:hidden border px-4 hover:bg-white border-grayscale-200 h-8 text-black text-xs"
      >
        Filter
      </Button>
      <ModalOverlay
        isDismissable
        className="fixed top-0 left-0 w-full h-full bg-black-10%"
      >
        <Modal className="bg-white absolute bottom-0 left-0 w-full max-h-full overflow-y-scroll p-6 pb-21">
          <Dialog className="focus-visible:outline-none">
            {({ close }) => (
              <form
                onSubmit={(event) => {
                  const formData = new FormData(event.currentTarget)

                  const collection = formData
                    .getAll("collection")
                    .map((value) => value.toString())
                  const category = formData
                    .getAll("category")
                    .map((value) => value.toString())
                  const type = formData
                    .getAll("type")
                    .map((value) => value.toString())

                  setMultipleQueryParams({
                    collection,
                    category,
                    type,
                  })

                  close()
                }}
              >
                {collections && Object.keys(collections).length > 0 && (
                  <CheckboxGroup
                    className="flex flex-col"
                    name="collection"
                    defaultValue={collection ?? []}
                  >
                    <Label className="block text-md font-semibold mb-3">
                      Collections
                    </Label>
                    {Object.entries(collections).map(([key, value]) => (
                      <UiCheckbox
                        key={key}
                        value={key}
                        className="justify-between py-3"
                      >
                        <UiCheckboxLabel>{value}</UiCheckboxLabel>
                        <UiCheckboxBox>
                          <UiCheckboxIcon />
                        </UiCheckboxBox>
                      </UiCheckbox>
                    ))}
                  </CheckboxGroup>
                )}
                {collections &&
                  Object.keys(collections).length > 0 &&
                  ((categories && Object.keys(categories).length > 0) ||
                    (types && Object.keys(types).length > 0)) && (
                    <hr className="my-6" />
                  )}
                {categories && Object.keys(categories).length > 0 && (
                  <CheckboxGroup
                    className="flex flex-col"
                    name="category"
                    defaultValue={category ?? []}
                  >
                    <Label className="block text-md font-semibold mb-3">
                      Categories
                    </Label>
                    {Object.entries(categories).map(([key, value]) => (
                      <UiCheckbox
                        key={key}
                        value={key}
                        className="justify-between py-3"
                      >
                        <UiCheckboxLabel>{value}</UiCheckboxLabel>
                        <UiCheckboxBox>
                          <UiCheckboxIcon />
                        </UiCheckboxBox>
                      </UiCheckbox>
                    ))}
                  </CheckboxGroup>
                )}
                {categories &&
                  Object.keys(categories).length > 0 &&
                  types &&
                  Object.keys(types).length > 0 && <hr className="my-6" />}
                {types && Object.keys(types).length > 0 && (
                  <CheckboxGroup
                    className="flex flex-col"
                    name="type"
                    defaultValue={type ?? []}
                  >
                    <Label className="block text-md font-semibold mb-3">
                      Types
                    </Label>
                    {Object.entries(types).map(([key, value]) => (
                      <UiCheckbox
                        key={key}
                        value={key}
                        className="justify-between py-3"
                      >
                        <UiCheckboxLabel>{value}</UiCheckboxLabel>
                        <UiCheckboxBox>
                          <UiCheckboxIcon />
                        </UiCheckboxBox>
                      </UiCheckbox>
                    ))}
                  </CheckboxGroup>
                )}
                <footer className="flex items-center h-21 fixed bottom-0 left-0 w-full bg-white px-6 border-t border-grayscale-100">
                  <Button type="submit" isFullWidth>
                    Show results
                  </Button>
                </footer>
              </form>
            )}
          </Dialog>
        </Modal>
      </ModalOverlay>
    </DialogTrigger>
  )
}
