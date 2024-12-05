// External packages
import * as React from "react"

export const Trash: React.FC<React.ComponentPropsWithoutRef<"svg">> = (
  props
) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M10.75 17.75v-7.5h-1.5v7.5h1.5ZM14.75 17.75h-1.5v-7.5h1.5v7.5Z"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M7.25 5.25V4c0-.744.364-1.425.845-1.905.48-.48 1.161-.845 1.905-.845h4c.744 0 1.425.364 1.905.845.48.48.845 1.161.845 1.905v1.25h5v1.5h-2V20c0 .744-.364 1.425-.845 1.905-.48.48-1.161.845-1.905.845H7c-.744 0-1.425-.364-1.905-.845-.48-.48-.845-1.161-.845-1.905V6.75h-2v-1.5h5Zm1.5 0V4c0-.256.136-.575.405-.845.27-.27.589-.405.845-.405h4c.256 0 .575.136.845.405.27.27.405.589.405.845v1.25h-6.5Zm-3 1.5V20c0 .256.136.575.405.845.27.27.589.405.845.405h10c.256 0 .575-.136.845-.405.27-.27.405-.589.405-.845V6.75H5.75Z"
      clipRule="evenodd"
    />
  </svg>
)
