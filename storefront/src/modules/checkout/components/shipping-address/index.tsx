import { HttpTypes } from "@medusajs/types"
// import { mapKeys } from "lodash"
import React, { useEffect, useMemo, useState } from "react"

import { Input } from "@/components/Forms"
import { Checkbox } from "@/components/Checkbox"
// import AddressSelect from "../address-select"
import CountrySelect from "../country-select"

const ShippingAddress = ({
  customer,
  cart,
  checked,
  onChange,
}: {
  customer: HttpTypes.StoreCustomer | null
  cart: HttpTypes.StoreCart | null
  checked: boolean
  onChange: () => void
}) => {
  const [formData, setFormData] = useState<Record<string, any>>({})

  const countriesInRegion = useMemo(
    () => cart?.region?.countries?.map((c) => c.iso_2),
    [cart?.region]
  )

  // check if customer has saved addresses that are in the current region
  const addressesInRegion = useMemo(
    () =>
      customer?.addresses.filter(
        (a) => a.country_code && countriesInRegion?.includes(a.country_code)
      ),
    [customer?.addresses, countriesInRegion]
  )

  const setFormAddress = (address?: HttpTypes.StoreCartAddress) => {
    address &&
      setFormData((prevState: Record<string, any>) => ({
        ...prevState,
        "shipping_address.first_name": address?.first_name || "",
        "shipping_address.last_name": address?.last_name || "",
        "shipping_address.address_1": address?.address_1 || "",
        "shipping_address.company": address?.company || "",
        "shipping_address.postal_code": address?.postal_code || "",
        "shipping_address.city": address?.city || "",
        "shipping_address.country_code": address?.country_code || "",
        "shipping_address.province": address?.province || "",
        "shipping_address.phone": address?.phone || "",
      }))
  }

  useEffect(() => {
    // Ensure cart is not null and has a shipping_address before setting form data
    if (cart && cart.shipping_address) {
      setFormAddress(cart?.shipping_address)
    }
  }, [cart])

  const handleChange = (
    e:
      | React.ChangeEvent<
          HTMLInputElement | HTMLInputElement | HTMLSelectElement
        >
      | { target: { name: string; value: string } }
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <>
      {/* TODO: allow user to select existing address when logged in */}
      {/* {customer && (addressesInRegion?.length || 0) > 0 && (
        <Container className="mb-6 flex flex-col gap-y-4 p-5">
          <p className="text-small-regular">
            {`Hi ${customer.first_name}, do you want to use one of your saved addresses?`}
          </p>
          <AddressSelect
            addresses={customer.addresses}
            addressInput={
              mapKeys(formData, (_, key) =>
                key.replace("shipping_address.", "")
              ) as HttpTypes.StoreCartAddress
            }
            onSelect={setFormAddress}
          />
        </Container>
      )} */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <Input
          placeholder="First name"
          name="shipping_address.first_name"
          autoComplete="given-name"
          value={formData["shipping_address.first_name"] || ""}
          onChange={handleChange}
          required
          data-testid="shipping-first-name-input"
          variant="outline"
        />
        <Input
          placeholder="Last name"
          name="shipping_address.last_name"
          autoComplete="family-name"
          value={formData["shipping_address.last_name"] || ""}
          onChange={handleChange}
          required
          data-testid="shipping-last-name-input"
          variant="outline"
        />
        <Input
          placeholder="Address"
          name="shipping_address.address_1"
          autoComplete="address-line1"
          value={formData["shipping_address.address_1"] || ""}
          onChange={handleChange}
          required
          data-testid="shipping-address-input"
          variant="outline"
        />
        <Input
          placeholder="Company"
          name="shipping_address.company"
          value={formData["shipping_address.company"] || ""}
          onChange={handleChange}
          autoComplete="organization"
          data-testid="shipping-company-input"
          variant="outline"
        />
        <Input
          placeholder="Postal code"
          name="shipping_address.postal_code"
          autoComplete="postal-code"
          value={formData["shipping_address.postal_code"] || ""}
          onChange={handleChange}
          required
          data-testid="shipping-postal-code-input"
          variant="outline"
        />
        <Input
          placeholder="City"
          name="shipping_address.city"
          autoComplete="address-level2"
          value={formData["shipping_address.city"] || ""}
          onChange={handleChange}
          required
          data-testid="shipping-city-input"
          variant="outline"
        />
        <CountrySelect
          name="shipping_address.country_code"
          autoComplete="country"
          region={cart?.region}
          selectedKey={formData["shipping_address.country_code"] || null}
          onSelectionChange={(value) => {
            handleChange({
              target: {
                name: "shipping_address.country_code",
                value: `${value}`,
              },
            })
          }}
          isRequired
          data-testid="shipping-country-select"
        />
        <Input
          placeholder="State / Province"
          name="shipping_address.province"
          autoComplete="address-level1"
          value={formData["shipping_address.province"] || ""}
          onChange={handleChange}
          required
          data-testid="shipping-province-input"
          variant="outline"
        />
        <Input
          placeholder="Phone"
          name="shipping_address.phone"
          autoComplete="tel"
          value={formData["shipping_address.phone"] || ""}
          onChange={handleChange}
          data-testid="shipping-phone-input"
          variant="outline"
        />
      </div>
      <div className="my-4">
        <Checkbox
          label="Billing address same as shipping address"
          name="same_as_billing"
          isSelected={checked}
          onChange={onChange}
          data-testid="billing-address-checkbox"
        />
      </div>
    </>
  )
}

export default ShippingAddress
