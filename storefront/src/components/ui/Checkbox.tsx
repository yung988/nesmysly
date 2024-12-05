// External packages
import { Checkbox, CheckboxProps } from "react-aria-components"
import { twMerge } from "tailwind-merge"

// Components
import { Icon, IconNames, IconProps } from "@/components/Icon"

export const UiCheckbox: React.FC<CheckboxProps> = ({
  className,
  ...props
}) => (
  <Checkbox
    {...props}
    className={twMerge(
      "flex gap-2 group cursor-pointer items-center",
      className as string
    )}
  />
)

export const UiCheckboxBox: React.FC<React.ComponentPropsWithoutRef<"div">> = ({
  className,
  ...props
}) => (
  <div
    {...props}
    className={twMerge(
      "border border-grayscale-200 w-4 h-4 flex items-center justify-center group-data-[selected=true]:bg-black group-data-[selected=true]:border-black",
      className
    )}
  />
)

export const UiCheckboxIcon: React.FC<
  Omit<IconProps, "name"> & { name?: IconNames }
> = ({ name = "check", className, ...props }) => (
  <Icon
    {...props}
    name={name}
    className={twMerge(
      "w-3 h-3 group-data-[selected=false]:opacity-0 group-data-[selected=true]:opacity-1 text-white",
      className
    )}
  />
)

export const UiCheckboxLabel: React.FC<
  React.ComponentPropsWithoutRef<"span">
> = ({ className, ...props }) => (
  <span
    {...props}
    className={twMerge("group-data-[selected=true]:font-semibold", className)}
  />
)
