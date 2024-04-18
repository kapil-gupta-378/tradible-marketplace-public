'use client'
import Input from 'design-systems/Atoms/Input'
import MenuDropdownFilter from 'design-systems/Molecules/Dropdown/MenuDropdownFilter'
import { useSellerContext } from 'contexts/SellerListContext'
import Button from 'design-systems/Atoms/Button'
import Spinner from 'design-systems/Atoms/Spinner'
import { BsArrowLeft } from 'react-icons/bs'
import { useRouter } from 'next/navigation'

export const ListDeliveryemplate: React.FC = () => {
  const inputClassName = [
    `px-3.5 py-3 dark:focus::border-neutral-light-600 fark:focus-within:border-neutral-light-600 flex items-center gap-1 !rounded-lg border border-transparent !bg-neutral-800 transition-colors duration-300 ease-in-out focus-within:border-neutral-500 focus-within:!bg-neutral-light-300 focus-within:bg-white hover:border-neutral-600 dark:!bg-neutral-light-700 dark:focus-within:!bg-transparent dark:hover:border-neutral-light-600 w-full`,
  ].join(' ')

  const { formik, sellerItemListMutation } = useSellerContext()
  const router = useRouter()

  return (
    <div className="flex flex-col gap-8 lg:flex-row">
      <div className="w-full text-left">
        <>
          <MenuDropdownFilter
            buttonClass="w-full justify-between py-3 !h-auto"
            className="mb-5 w-full"
            filterBy={'express'}
            heading="Delivery Type"
            options={[
              { label: 'Express', value: 'express' },
              { label: 'Extended', value: 'extended' },
            ]}
            placeholder="express"
            onFilterChange={value => {
              formik.setFieldValue('deliveryType', value)
            }}
            isMobileViewOn={false}
          />
          <Input
            className="mb-5"
            inputClassName={inputClassName}
            label="Delivery fee"
            labelClassName="!mb-0"
            name="shippingCost"
            error={formik.errors.shippingCost && formik.touched.shippingCost ? formik.errors.shippingCost : ''}
            type="number"
            onBlur={formik.handleBlur}
            value={formik.values.shippingCost}
            onChange={formik.handleChange}
          />
        </>

        <div className="flex items-center justify-start gap-2">
          <Button
            className="mt-5"
            onClick={() => {
              formik.validateForm().then(() => {
                router.push('/list/pricing')
              })
            }}
          >
            <BsArrowLeft /> Prev
          </Button>
          <Button
            className="mt-5"
            disabled={sellerItemListMutation.isLoading}
            onClick={() => {
              formik.handleSubmit()
            }}
          >
            {sellerItemListMutation.isLoading ? (
              <Spinner className="h-8 w-8 stroke-white dark:!stroke-black" />
            ) : (
              'Submit'
            )}
          </Button>
        </div>
      </div>
      <div className="md:w-2/4"></div>
    </div>
  )
}
export default ListDeliveryemplate
