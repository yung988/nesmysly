// External components
import { twMerge } from "tailwind-merge"

export const Skeleton: React.FC<React.ComponentPropsWithoutRef<"div">> = ({
  className,
  ...rest
}) => (
  <div
    {...rest}
    className={twMerge(
      "relative overflow-hidden rounded-2xs shrink-0 before:absolute before:-translate-x-full before:inset-0 before:content-[''] before:animate-shine before:w-full before:h-full bg-[#f5f6f7] before:bg-[linear-gradient(90deg,rgba(245,246,247,1)_0%,rgba(238,238,238,1)_50%,rgba(245,246,247,1)_100%)]",
      className
    )}
  ></div>
)
