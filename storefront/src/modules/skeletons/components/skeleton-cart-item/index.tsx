// External components
import { Skeleton } from "@/components/ui/Skeleton"

const SkeletonCartItem = () => {
  return (
    <div className="flex gap-6 border-b border-grayscale-100 py-8 last:pb-0 last:border-b-0">
      <Skeleton className="w-25 sm:w-30 h-33 sm:h-40" />
      <div className="flex-grow flex flex-col justify-between">
        <div className="flex flex-col gap-2">
          <Skeleton className="w-30 h-4 sm:h-6" />
          <Skeleton className="w-25 h-4 sm:h-6" />
        </div>
        <Skeleton className="w-25 h-8" />
      </div>
      <div className="flex flex-col justify-between items-end">
        <Skeleton className="w-25 h-4 sm:h-6" />
      </div>
    </div>
  )
}

export default SkeletonCartItem
