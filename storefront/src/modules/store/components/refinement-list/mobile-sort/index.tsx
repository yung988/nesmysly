import * as React from "react"
import {
  Dialog,
  DialogTrigger,
  Label,
  Modal,
  ModalOverlay,
  RadioGroup,
} from "react-aria-components"

import { Button } from "@/components/Button"
import { UiRadio, UiRadioBox, UiRadioLabel } from "@/components/ui/Radio"
import type { SortOptions } from "../sort-products"

export const MobileSort: React.FC<{
  sortBy: SortOptions | undefined
  setQueryParams: (name: string, value: SortOptions) => void
}> = ({ sortBy, setQueryParams }) => {
  return (
    <DialogTrigger>
      <Button
        variant="outline"
        iconName="chevron-down"
        iconPosition="end"
        className="bg-white md:hidden border px-4 hover:bg-white border-grayscale-200 h-8 text-black text-xs"
      >
        Sort by
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

                  const sortBy = formData.get("sortBy")?.toString()

                  setQueryParams("sortBy", sortBy as SortOptions)

                  close()
                }}
              >
                <RadioGroup
                  className="flex flex-col mb-5"
                  name="sortBy"
                  defaultValue={sortBy}
                  aria-label="Sort by"
                >
                  <Label className="block text-md font-semibold mb-3">
                    Sort by
                  </Label>
                  <UiRadio value="created_at" className="justify-between py-3">
                    <UiRadioLabel>Latest Arrivals</UiRadioLabel>
                    <UiRadioBox />
                  </UiRadio>
                  <UiRadio value="price_asc" className="justify-between py-3">
                    <UiRadioLabel>Lowest price</UiRadioLabel>
                    <UiRadioBox />
                  </UiRadio>
                  <UiRadio value="price_desc" className="justify-between py-3">
                    <UiRadioLabel>Highest price</UiRadioLabel>
                    <UiRadioBox />
                  </UiRadio>
                </RadioGroup>
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
