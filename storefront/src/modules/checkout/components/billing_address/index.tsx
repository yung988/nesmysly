import React, { useState, useEffect } from "react"
import CountrySelect from "../country-select"
import { HttpTypes } from "@medusajs/types"
import { Input } from "@/components/Forms"

const BillingAddress = ({ cart }: { cart: HttpTypes.StoreCart | null }) => {
  const [formData, setFormData] = useState<any>({})

  useEffect(() => {
    setFormData({
      "billing_address.first_name": cart?.billing_address?.first_name || "",
      "billing_address.last_name": cart?.billing_address?.last_name || "",
      "billing_address.address_1": cart?.billing_address?.address_1 || "",
      "billing_address.company": cart?.billing_address?.company || "",
      "billing_address.postal_code": cart?.billing_address?.postal_code || "",
      "billing_address.city": cart?.billing_address?.city || "",
      "billing_address.country_code": cart?.billing_address?.country_code || "",
      "billing_address.province": cart?.billing_address?.province || "",
      "billing_address.phone": cart?.billing_address?.phone || "",
    })
  }, [cart?.billing_address])

  const handleChange = (
    e:
      | React.ChangeEvent<
          HTMLInputElement | HTMLInputElement | HTMLSelectElement
        >
      | {
          target: { name: string; value: string }
        }
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <Input
          placeholder="First name"
          name="billing_address.first_name"
          autoComplete="given-name"
          value={formData["billing_address.first_name"] || ""}
          onChange={handleChange}
          required
          data-testid="billing-first-name-input"
          variant="outline"
        />
        <Input
          placeholder="Last name"
          name="billing_address.last_name"
          autoComplete="family-name"
          value={formData["billing_address.last_name"] || ""}
          onChange={handleChange}
          required
          data-testid="billing-last-name-input"
          variant="outline"
        />
        <Input
          placeholder="Address"
          name="billing_address.address_1"
          autoComplete="address-line1"
          value={formData["billing_address.address_1"] || ""}
          onChange={handleChange}
          required
          data-testid="billing-address-input"
          variant="outline"
        />
        <Input
          placeholder="Company"
          name="billing_address.company"
          value={formData["billing_address.company"] || ""}
          onChange={handleChange}
          autoComplete="organization"
          data-testid="billing-company-input"
          variant="outline"
        />
        <Input
          placeholder="Postal code"
          name="billing_address.postal_code"
          autoComplete="postal-code"
          value={formData["billing_address.postal_code"] || ""}
          onChange={handleChange}
          required
          data-testid="billing-postal-input"
          variant="outline"
        />
        <Input
          placeholder="City"
          name="billing_address.city"
          autoComplete="address-level2"
          value={formData["billing_address.city"] || ""}
          onChange={handleChange}
          required
          data-testid="billing-city-input"
          variant="outline"
        />
        <CountrySelect
          name="billing_address.country_code"
          autoComplete="country"
          region={cart?.region}
          selectedKey={formData["billing_address.country_code"] || null}
          onSelectionChange={(value) =>
            handleChange({
              target: {
                name: "billing_address.country_code",
                value: `${value}`,
              },
            })
          }
          isRequired
          data-testid="billing-country-select"
        />
        <Input
          placeholder="State / Province"
          name="billing_address.province"
          autoComplete="address-level1"
          value={formData["billing_address.province"] || ""}
          onChange={handleChange}
          required
          data-testid="billing-province-input"
          variant="outline"
        />
        <Input
          placeholder="Phone"
          name="billing_address.phone"
          autoComplete="tel"
          value={formData["billing_address.phone"] || ""}
          onChange={handleChange}
          data-testid="billing-phone-input"
          variant="outline"
        />
      </div>
    </>
  )
}

export default BillingAddress
