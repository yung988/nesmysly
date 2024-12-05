import * as React from "react"
import Image from "next/image"
import { clx } from "@medusajs/ui"
import { HttpTypes } from "@medusajs/types"

import PlaceholderImage from "@modules/common/icons/placeholder-image"

type ThumbnailProps = {
  thumbnail?: HttpTypes.StoreProduct["thumbnail"]
  images?: HttpTypes.StoreProduct["images"]
  size?: "small" | "medium" | "large" | "full" | "square" | "3/4"
  isFeatured?: boolean
  className?: string
  "data-testid"?: string
}

const Thumbnail: React.FC<ThumbnailProps> = ({
  thumbnail,
  images,
  size = "small",
  isFeatured,
  className,
  "data-testid": dataTestid,
}) => {
  const initialImage = thumbnail || images?.[0]?.url

  return (
    <div
      className={clx("relative w-full overflow-hidden", className, {
        "aspect-[11/14]": isFeatured,
        "aspect-[9/16]": !isFeatured && size !== "square" && size !== "3/4",
        "aspect-[1/1]": size === "square",
        "aspect-[3/4]": size === "3/4",
        "w-[180px]": size === "small",
        "w-[290px]": size === "medium",
        "w-[440px]": size === "large",
        "w-full": size === "full",
      })}
      data-testid={dataTestid}
    >
      <ImageOrPlaceholder image={initialImage} size={size} />
    </div>
  )
}

const ImageOrPlaceholder = ({
  image,
  size,
}: Pick<ThumbnailProps, "size"> & { image?: string }) => {
  return image ? (
    <Image
      src={image}
      alt="Thumbnail"
      className="absolute inset-0 object-cover object-center"
      draggable={false}
      quality={50}
      sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
      fill
    />
  ) : (
    <div className="w-full h-full absolute inset-0 flex items-center justify-center">
      <PlaceholderImage size={size === "small" ? 16 : 24} />
    </div>
  )
}

export default Thumbnail
