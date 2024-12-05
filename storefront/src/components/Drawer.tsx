// External components
import * as React from "react"
import { twJoin, twMerge } from "tailwind-merge"

// Components
import { Icon } from "@/components/Icon"

export interface DrawerProps extends React.ComponentPropsWithoutRef<"div"> {
  isOpened?: boolean
  onCloseClick?: () => void
  onBackdropClick?: () => void
}

export const Drawer: React.FC<DrawerProps> = ({
  children,
  isOpened,
  onCloseClick,
  onBackdropClick,
  ...rest
}) => {
  return (
    <>
      <div
        {...rest}
        className={twMerge(
          "flex-col items-center bg-black top-0 left-0 z-50 fixed justify-self-center w-full max-h-screen h-screen max-w-75",
          isOpened
            ? "opacity-100 visible translate-x-0"
            : "opacity-0 invisible -translate-x-full"
        )}
        style={{
          transition: isOpened
            ? "transform 500ms, opacity 200ms, visibility 100ms"
            : "transform 300ms, opacity 200ms, visibility 100ms",
        }}
      >
        <button className="absolute top-6 right-8" onClick={onCloseClick}>
          <Icon name="close" className="w-6 text-white" />
        </button>
        <div className="w-full overflow-y-scroll h-full">{children}</div>
      </div>
      <div
        onClick={onBackdropClick}
        className={twJoin(
          "w-full h-full fixed top-0 right-0 z-40 bg-black duration-300",
          isOpened ? "visible opacity-10" : "invisible opacity-0"
        )}
      />
    </>
  )
}
