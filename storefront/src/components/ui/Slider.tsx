// External packages
import {
  SliderOutput,
  SliderOutputProps,
  SliderThumb,
  SliderThumbProps,
  SliderTrack,
  SliderTrackProps,
} from "react-aria-components"
import { twMerge } from "tailwind-merge"

export const UiSliderTrack: React.FC<SliderTrackProps> = ({
  className,
  ...props
}) => (
  <SliderTrack
    {...props}
    className={twMerge("h-px bg-black", className as string)}
  />
)

export const UiSliderThumb: React.FC<SliderThumbProps> = ({
  className,
  ...props
}) => (
  <SliderThumb
    {...props}
    className={twMerge(
      "w-4 h-4 border border-black bg-white rounded-full cursor-pointer",
      className as string
    )}
  />
)

export const UiSliderOutput: React.FC<SliderOutputProps> = ({
  className,
  ...props
}) => (
  <SliderOutput
    {...props}
    className={twMerge("flex justify-between mt-5", className as string)}
  />
)

export const UiSliderOutputValue: React.FC<
  React.ComponentPropsWithoutRef<"span">
> = ({ className, ...props }) => (
  <span {...props} className={twMerge("text-xs", className as string)} />
)
