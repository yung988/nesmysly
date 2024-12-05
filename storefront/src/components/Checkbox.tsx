"use client"

// External packages
import * as React from "react"
import * as AriaCheckbox from "react-aria-components"
import { twMerge } from "tailwind-merge"

// Components
import { Icon } from "@/components/Icon"

export type CheckboxOwnProps = {
  label: React.ReactNode
  labelProps?: React.ComponentPropsWithoutRef<"p">
}
export type CheckboxProps = AriaCheckbox.CheckboxProps & CheckboxOwnProps

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  labelProps,
  className,
  ...rest
}) => (
  <AriaCheckbox.Checkbox
    {...rest}
    className={twMerge(
      "flex gap-2 items-start group text-grayscale-500 text-xs",
      className as string
    )}
  >
    <div className="h-4 w-4 group-data-[selected]:bg-black group-data-[selected]:border-black group-hover:group-data-[selected]:bg-grayscale-600 group-hover:group-data-[selected]:border-grayscale-600 text-transparent group-data-[selected]:text-white transition-colors border border-grayscale-200 group-hover:border-grayscale-600 flex justify-between items-center">
      <Icon name="check" className="w-3.5" />
    </div>
    <p {...labelProps}>{label}</p>
  </AriaCheckbox.Checkbox>
)
