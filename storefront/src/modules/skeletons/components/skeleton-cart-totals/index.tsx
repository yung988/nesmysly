// Components
import { Skeleton } from "@/components/ui/Skeleton"

const SkeletonCartTotals = ({ header = true }) => {
  return (
    <div>
      <div className="flex flex-col gap-4">
        {header && <Skeleton className="w-32 h-4" />}
        <div className="flex justify-between">
          <Skeleton className="w-25 h-6" />
          <Skeleton className="w-25 h-6" />
        </div>
        <div className="flex justify-between">
          <Skeleton className="w-20 h-6" />
          <Skeleton className="w-25 h-6" />
        </div>
        <div className="flex justify-between">
          <Skeleton className="w-15 h-6" />
          <Skeleton className="w-25 h-6" />
        </div>
      </div>
      <hr className="my-6" />
      <div className="flex justify-between mb-12">
        <Skeleton className="w-20 h-9" />
        <Skeleton className="w-30 h-9" />
      </div>
      <div className="flex justify-between gap-2">
        <Skeleton className="w-50 h-12" />
        <Skeleton className="w-22 h-12" />
      </div>
    </div>
  )
}

export default SkeletonCartTotals
