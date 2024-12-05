"use client"

// External packages
import * as React from "react"
import { twJoin, twMerge } from "tailwind-merge"
import * as ReactAria from "react-aria-components"
import Link, { LinkProps } from "next/link"

// Components
import { Icon, IconNames } from "@/components/Icon"

export type ButtonOwnProps = {
  isFullWidth?: boolean
  iconName?: IconNames
  iconPosition?: "start" | "end"
  isVisuallyDisabled?: boolean
  isLoading?: boolean
  loadingText?: string
  size?: "sm" | "md"
  spinnerPosition?: "start" | "end"
  variant?: "ghost" | "outline" | "solid" | "link" | "unstyled"
}

export const getButtonClassNames = ({
  isFullWidth,
  iconName,
  iconPosition,
  isVisuallyDisabled,
  isLoading,
  loadingText,
  size,
  spinnerPosition,
  variant,
}: ButtonOwnProps): string => {
  return twJoin(
    "inline-flex items-center focus-visible:outline-none rounded-xs justify-center transition-colors",

    // isFullWidth
    Boolean(isFullWidth) && "w-full",

    // iconPosition
    // spinnerPosition
    (iconPosition === "end" || spinnerPosition === "end") && "flex-row-reverse",

    // Disabled
    (isVisuallyDisabled || isLoading) && "cursor-not-allowed",
    isVisuallyDisabled &&
      (variant === "ghost" || variant === "link" || variant == "unstyled") &&
      "text-grayscale-200",
    isVisuallyDisabled &&
      variant === "outline" &&
      "border-grayscale-200 text-grayscale-200",
    isVisuallyDisabled && variant === "solid" && "!bg-grayscale-200",

    // isLoading
    // iconName
    ((Boolean(isLoading) && Boolean(loadingText)) || Boolean(iconName)) &&
      "gap-2",

    // size
    size === "sm" && "px-4 h-8 text-xs",
    size === "md" && "px-6 h-12",

    // variant
    ((variant === "ghost" || variant == "unstyled") && "text-black h-auto") ||
      (variant === "outline" &&
        "text-black hover:text-grayscale-500 hover:border-grayscale-500 border border-black") ||
      (variant === "solid" && "bg-black hover:bg-grayscale-500 text-white") ||
      (variant === "link" &&
        "text-black h-auto border-b border-current px-0 rounded-none")
  )
}

export type ButtonProps = React.ComponentPropsWithoutRef<"button"> &
  ButtonOwnProps &
  ReactAria.ButtonProps

export const Button: React.FC<ButtonProps> = ({
  isFullWidth,
  isVisuallyDisabled,
  iconName,
  iconPosition = "start",
  isLoading,
  loadingText,
  size = "md",
  spinnerPosition = "start",
  variant = "solid",
  type = "button",
  className,
  children,
  ...rest
}) => (
  <ReactAria.Button
    {...rest}
    type={type}
    className={twMerge(
      getButtonClassNames({
        isFullWidth,
        isVisuallyDisabled,
        iconName,
        iconPosition,
        isLoading,
        loadingText,
        size,
        spinnerPosition,
        variant,
      }),
      className
    )}
  >
    {Boolean(isLoading) && <Icon name="loader" className="animate-spin" />}
    {iconName && !Boolean(isLoading) && <Icon name={iconName} />}
    {Boolean(isLoading)
      ? Boolean(loadingText)
        ? loadingText
        : null
      : children}
  </ReactAria.Button>
)

export const ButtonAnchor: React.FC<
  React.ComponentPropsWithoutRef<"a"> & ButtonOwnProps
> = ({
  isFullWidth,
  isVisuallyDisabled,
  iconName,
  iconPosition = "start",
  isLoading,
  loadingText,
  size = "md",
  spinnerPosition = "start",
  variant = "solid",
  className,
  children,
  ...rest
}) => (
  <a
    {...rest}
    className={twMerge(
      getButtonClassNames({
        isFullWidth,
        isVisuallyDisabled,
        iconName,
        iconPosition,
        isLoading,
        loadingText,
        size,
        spinnerPosition,
        variant,
      }),
      className
    )}
  >
    {Boolean(isLoading) && <Icon name="loader" className="animate-spin" />}
    {iconName && !Boolean(isLoading) && <Icon name={iconName} />}
    {Boolean(isLoading)
      ? Boolean(loadingText)
        ? loadingText
        : null
      : children}
  </a>
)

export const ButtonLink: React.FC<
  Omit<LinkProps, "passHref"> &
    ButtonOwnProps & {
      className?: string
      children?: React.ReactNode
    }
> = ({
  isFullWidth,
  isVisuallyDisabled,
  iconName,
  iconPosition = "start",
  isLoading,
  loadingText,
  size = "md",
  spinnerPosition = "start",
  variant = "solid",
  className,
  children,
  ...rest
}) => (
  <Link
    {...rest}
    className={twMerge(
      getButtonClassNames({
        isFullWidth,
        isVisuallyDisabled,
        iconName,
        iconPosition,
        isLoading,
        loadingText,
        size,
        spinnerPosition,
        variant,
      }),
      className
    )}
  >
    {Boolean(isLoading) && <Icon name="loader" className="animate-spin" />}
    {iconName && !Boolean(isLoading) && <Icon name={iconName} />}
    {Boolean(isLoading)
      ? Boolean(loadingText)
        ? loadingText
        : null
      : children}
  </Link>
)
