import repeat from "@lib/util/repeat"
import SkeletonCartItem from "@modules/skeletons/components/skeleton-cart-item"
import SkeletonOrderSummary from "@modules/skeletons/components/skeleton-order-summary"

// Components
import { Layout, LayoutColumn } from "@/components/Layout"
import { Skeleton } from "@/components/ui/Skeleton"

const SkeletonCartPage = () => {
  return (
    <Layout className="pt-39 pb-36">
      <LayoutColumn
        start={1}
        end={{ base: 13, lg: 9, xl: 10 }}
        className="mb-14 lg:mb-0"
      >
        <div className="lg:h-22 pb-12 lg:pb-0 border-b border-b-grayscale-100">
          <Skeleton className="w-75 md:w-108 h-8 md:h-17" />
        </div>
        <div>
          {repeat(3).map((index) => (
            <SkeletonCartItem key={index} />
          ))}
        </div>
      </LayoutColumn>
      <LayoutColumn start={{ base: 1, lg: 9, xl: 10 }} end={13}>
        <SkeletonOrderSummary />
      </LayoutColumn>
    </Layout>
  )
}

export default SkeletonCartPage
