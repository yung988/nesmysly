"use client"

// External packages
import * as React from "react"
import { twJoin, twMerge } from "tailwind-merge"
import * as Aria from "react-aria-components"

// Components
import { Icon } from "@/components/Icon"

export const getFormFieldClassNames = ({
  variant,
  uiSize,
  isVisuallyDisabled,
  isSuccess,
  hasError,
}: InputOwnProps): string => {
  return twJoin(
    // Base
    "peer block w-full rounded-xs transition-colors transition-padding focus-within:outline-none bg-white px-4 placeholder:invisible",

    // Variant
    variant === "outline" &&
      "border border-grayscale-200 hover:border-grayscale-500 focus:border-grayscale-500 bg-transparent",

    // Size
    uiSize === "sm" &&
      "h-9 text-xs focus:pt-3.5 [&:not(:placeholder-shown)]:pt-3.5",
    uiSize === "md" && "h-12 focus:pt-3 [&:not(:placeholder-shown)]:pt-3",
    uiSize === "lg" && "h-14 focus:pt-4 [&:not(:placeholder-shown)]:pt-4",

    // Disabled
    isVisuallyDisabled &&
      "cursor-not-allowed bg-grayscale-50 text-grayscale-400",

    // Success
    isSuccess && "border-green-500 pr-7",

    // Error
    hasError && "border-red-primary focus:border-red-900 hover:border-red-900"
  )
}

/**
 * Label
 */
type InputLabelOwnProps = {
  isRequired?: boolean
}

export const InputLabel: React.FC<
  React.ComponentPropsWithRef<"label"> & InputLabelOwnProps
> = ({ isRequired, children, className, ...rest }) => (
  <Aria.Label
    {...rest}
    className={twMerge("mb-1 block font-semibold", className)}
  >
    {children}
    {isRequired && <span className="ml-0.5 text-orange-700">*</span>}
  </Aria.Label>
)

/**
 * SubLabel
 */
type InputSubLabelOwnProps = {
  type: "success" | "error"
}

export const InputSubLabel: React.FC<
  React.ComponentPropsWithRef<"p"> & InputSubLabelOwnProps
> = ({ type, children, className, ...rest }) => (
  <Aria.Text
    {...rest}
    className={twMerge(
      "mt-2 text-xs",
      type === "success" && "text-green-700",
      type === "error" && "text-red-primary",
      className
    )}
  >
    {children}
  </Aria.Text>
)

/**
 * Input
 */
export type InputOwnProps = {
  variant?: "solid" | "outline"
  uiSize?: "sm" | "md" | "lg"
  isVisuallyDisabled?: boolean
  isSuccess?: boolean
  hasError?: boolean
  errorMessage?: string
  wrapperClassName?: string
}

export const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input"> & InputOwnProps
>(
  (
    {
      variant,
      uiSize = "lg",
      isVisuallyDisabled,
      isSuccess,
      hasError,
      errorMessage,
      wrapperClassName,
      placeholder,
      className,
      ...rest
    },
    ref
  ) => (
    <div className={twMerge("relative", wrapperClassName)}>
      <Aria.Input
        {...rest}
        ref={ref}
        className={twMerge(
          getFormFieldClassNames({
            variant,
            uiSize,
            isVisuallyDisabled,
            isSuccess,
            hasError,
          }),
          className
        )}
        placeholder={placeholder}
      />
      {placeholder && (
        <span
          className={twJoin(
            "absolute -translate-y-1/2 peer-placeholder-shown:top-1/2 left-4 peer-focus:text-xs peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:translate-y-0 peer-focus:translate-y-0 text-grayscale-500 pointer-events-none transition-all",
            uiSize === "lg" &&
              "peer-focus:top-2.5 peer-[:not(:placeholder-shown)]:top-2.5",
            uiSize === "md" &&
              "peer-focus:top-1 peer-[:not(:placeholder-shown)]:top-1",
            uiSize === "sm" &&
              "peer-focus:top-1 peer-[:not(:placeholder-shown)]:top-1 text-xs peer-focus:text-[10px] peer-[:not(:placeholder-shown)]:text-[10px]"
          )}
        >
          {placeholder}
        </span>
      )}
      {isSuccess && (
        <Icon
          name="check"
          className="absolute right-0 top-1/2 mr-4 -translate-y-1/2 text-green-500 w-6 h-auto"
        />
      )}
      {hasError && errorMessage && (
        <InputSubLabel type="error">{errorMessage}</InputSubLabel>
      )}
    </div>
  )
)

Input.displayName = "Input"
