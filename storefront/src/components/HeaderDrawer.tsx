"use client"

// External components
import * as React from "react"

// Components
import { Button } from "@/components/Button"
import { Icon } from "@/components/Icon"
import { Drawer } from "@/components/Drawer"
import { LocalizedLink } from "@/components/LocalizedLink"
import { RegionSwitcher } from "./RegionSwitcher"

export const HeaderDrawer: React.FC<{
  countryOptions: {
    country: string | undefined
    region: string
    label: string | undefined
  }[]
}> = ({ countryOptions }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  return (
    <>
      <Button
        variant="ghost"
        className="p-1 group-data-[light=true]:md:text-white"
        onPress={() => setIsMenuOpen(true)}
      >
        <Icon name="menu" className="w-6 h-6" wrapperClassName="w-6 h-6" />
      </Button>
      <Drawer
        isOpened={isMenuOpen}
        onCloseClick={() => setIsMenuOpen(false)}
        onBackdropClick={() => setIsMenuOpen(false)}
      >
        <div className="flex flex-col text-white h-full">
          <div className="flex items-center pb-6 mb-8 pt-5 w-full border-b border-white px-8">
            <div className="h-8" />
            {/* <Button
              variant="ghost"
              className="text-white p-1"
              onClick={() => setIsMenuOpen(true)}
            >
              <Icon name="search" className="w-6 h-6" />
            </Button>
            <Input placeholder="Search" className="h-auto bg-black px-1" /> */}
          </div>
          <div className="text-lg flex flex-col gap-8 font-medium px-8">
            <LocalizedLink href="/about" onClick={() => setIsMenuOpen(false)}>
              About
            </LocalizedLink>
            <LocalizedLink
              href="/inspiration"
              onClick={() => setIsMenuOpen(false)}
            >
              Inspiration
            </LocalizedLink>
            <LocalizedLink href="/store" onClick={() => setIsMenuOpen(false)}>
              Shop
            </LocalizedLink>
          </div>
          <RegionSwitcher
            countryOptions={countryOptions}
            className="mt-auto ml-8 mb-8"
            selectButtonClassName="bg-transparent border-0 max-md:text-base gap-2 p-1 w-auto"
            selectIconClassName="text-current w-6 h-6"
          />
        </div>
      </Drawer>
    </>
  )
}
