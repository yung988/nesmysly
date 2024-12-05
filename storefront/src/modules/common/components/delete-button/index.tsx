"use client"

import { useState } from "react"
import { deleteLineItem } from "@lib/data/cart"
import { Icon } from "@/components/Icon"

const DeleteButton = ({ id }: { id: string }) => {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async (id: string) => {
    setIsDeleting(true)
    await deleteLineItem(id).catch((err) => {
      setIsDeleting(false)
    })
  }

  return (
    <button
      type="button"
      onClick={() => handleDelete(id)}
      disabled={isDeleting}
    >
      <Icon name="trash" className="w-6 h-6" />
    </button>
  )
}

export default DeleteButton
