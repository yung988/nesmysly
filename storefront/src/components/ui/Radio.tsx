// External packages
import { Radio, RadioProps } from "react-aria-components"
import { twMerge } from "tailwind-merge"

type UiRadioOwnProps = {
  variant?: "ghost" | "outline"
}

export const UiRadio: React.FC<UiRadioOwnProps & RadioProps> = ({
  variant = "ghost",
  className,
  ...props
}) => (
  <Radio
    {...props}
    className={twMerge(
      "flex gap-2 group cursor-pointer items-center",
      variant === "outline" &&
        "p-4 gap-4 border border-grayscale-200 hover:border-grayscale-400 transition-colors",
      className as string
    )}
  />
)

export const UiRadioBox: React.FC<React.ComponentPropsWithoutRef<"span">> = ({
  className,
  ...props
}) => (
  <span
    {...props}
    className={twMerge(
      "border border-grayscale-200 w-4 h-4 block transition-colors rounded-full group-hover:border-grayscale-400 group-data-[selected]:border-black group-data-[selected]:border-6 group-hover:group-data-[selected]:border-grayscale-600",
      className
    )}
  />
)

export const UiRadioLabel: React.FC<React.ComponentPropsWithoutRef<"span">> = ({
  className,
  ...props
}) => (
  <span
    {...props}
    className={twMerge("group-data-[selected=true]:font-semibold", className)}
  />
)
