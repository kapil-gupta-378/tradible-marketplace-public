'use client'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'
import { useRouter } from 'next/navigation'

import Input from 'design-systems/Atoms/Input'
import MenuDropdownFilter from 'design-systems/Molecules/Dropdown/MenuDropdownFilter'
import { useSellerContext } from 'contexts/SellerListContext'
import SwitchButton from 'design-systems/Atoms/SwitchButton'
import Button from 'design-systems/Atoms/Button'

export const ListPricingTemplate: React.FC = () => {
  const { formik } = useSellerContext()
  const router = useRouter()

  const inputClassName = [
    `px-3.5 py-3 dark:focus::border-neutral-light-600 fark:focus-within:border-neutral-light-600 flex items-center gap-1 !rounded-lg border border-transparent !bg-neutral-800 transition-colors duration-300 ease-in-out focus-within:border-neutral-500 focus-within:!bg-neutral-light-300 focus-within:bg-white hover:border-neutral-600 dark:!bg-neutral-light-700 dark:focus-within:!bg-transparent dark:hover:border-neutral-light-600 w-full`,
  ].join(' ')
  return (
    <div className="flex flex-col gap-8 lg:flex-row">
      <div className="w-full text-left">
        <>
          <MenuDropdownFilter
            buttonClass="w-full justify-between py-3 !h-auto"
            className="mb-5 w-full"
            filterBy={'fixed'}
            heading="Sell Type"
            isMobileViewOn={false}
            options={[
              { label: 'Fixed', value: 'fixed' },
              { label: 'Auction', value: 'auction' },
            ]}
            placeholder={formik.values.isAuction ? 'auction' : 'fixed'}
            onFilterChange={value => {
              formik.setFieldValue('isAuction', value === 'auction' ? true : false)
              formik.setFieldValue('isBuy', value === 'auction' ? false : true)
            }}
          />

          {!formik.values?.isAuction ? (
            <></>
          ) : (
            <>
              <div className="flex flex-col items-start justify-center gap-2 lmd:flex-row">
                <Input
                  className="mb-5 w-full flex-1"
                  error={
                    formik.errors.auctionStartDate && formik.touched.auctionStartDate
                      ? formik.errors.auctionStartDate
                      : ''
                  }
                  inputClassName={inputClassName}
                  label="Auction Start Time"
                  labelClassName="!mb-0"
                  min={new Date().toISOString().slice(0, 16)}
                  name="auctionStartDate"
                  type="datetime-local"
                  value={formik.values.auctionStartDate}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />

                <Input
                  className="mb-5 w-full flex-1"
                  error={
                    formik.errors.auctionEndDate && formik.touched.auctionEndDate ? formik.errors.auctionEndDate : ''
                  }
                  inputClassName={inputClassName}
                  label="Auction End Time"
                  labelClassName="!mb-0"
                  min={formik.values.auctionStartDate}
                  name="auctionEndDate"
                  type="datetime-local"
                  value={formik.values.auctionEndDate}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />

                <Input
                  className="mb-5"
                  error={formik.errors.bidFixedPrice && formik.touched.bidFixedPrice ? formik.errors.bidFixedPrice : ''}
                  inputClassName={inputClassName}
                  label="Bid fixed Price"
                  labelClassName="!mb-0"
                  name="bidFixedPrice"
                  type="number"
                  value={formik.values.bidFixedPrice}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
              </div>
            </>
          )}

          <Input
            className="mb-5"
            error={formik.errors.price && formik.touched.price ? formik.errors.price : ''}
            inputClassName={inputClassName}
            label="Price"
            labelClassName="!mb-0"
            name="price"
            type="number"
            value={formik.values.price}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />

          <Input
            className="mb-5"
            error={formik.errors.quantity && formik.touched.quantity ? formik.errors.quantity : ''}
            inputClassName={inputClassName}
            label="Quantity"
            labelClassName="!mb-0"
            name="quantity"
            type="number"
            value={formik.values.quantity}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />

          <SwitchButton
            check={Boolean(formik.values.isGraded)}
            handleChange={e => formik.setFieldValue('isGraded', e.target.checked)}
            label="Is Graded"
          />

          {formik.values.isGraded ? (
            <Input
              className="mb-5"
              error={formik.errors.gradeCode && formik.touched.gradeCode ? formik.errors.gradeCode : ''}
              inputClassName={inputClassName}
              label="Grade Code"
              labelClassName="!mb-0"
              name="gradeCode"
              type="text"
              value={formik.values.gradeCode}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
          ) : (
            <></>
          )}

          <SwitchButton
            check={Boolean(formik.values.isPublish)}
            handleChange={e => formik.setFieldValue('isPublish', e.target.checked)}
            label="Is Publish"
          />

          <SwitchButton
            check={Boolean(formik.values.isFeatured)}
            handleChange={e => formik.setFieldValue('isFeatured', e.target.checked)}
            label="Is Featured"
          />

          <SwitchButton
            check={formik.values.isPresale}
            handleChange={e => formik.setFieldValue('isPresale', e.target.checked)}
            label="Is PreSale"
          />

          {formik.values.isPresale && (
            <>
              <Input
                className="mb-5"
                error={formik.errors.presaleDate && formik.touched.presaleDate ? formik.errors.presaleDate : ''}
                inputClassName={inputClassName}
                label="Pre Sate Date"
                labelClassName="!mb-0"
                min={new Date().toISOString().slice(0, 16)}
                name="presaleDate"
                type="datetime-local"
                value={formik.values.presaleDate}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
            </>
          )}

          <div className="flex items-center justify-start gap-2">
            <Button
              className="mt-5"
              onClick={() => {
                formik.validateForm().then(() => {
                  router.push('/list/details')
                })
              }}
            >
              <BsArrowLeft /> Prev
            </Button>

            <Button
              className="mt-5"
              type="button"
              onClick={() => {
                formik.validateForm().then(e => {
                  const formField = ['auctionEndDate', 'auctionStartDate', 'price', 'quantity', 'bidFixedPrice']
                  const isError = formField.some(item => Object.keys(e).includes(item))

                  Object.keys(e).forEach(item => {
                    if (item !== 'shippingCost') {
                      formik.setFieldTouched(item, true)
                    }
                  })

                  if (!isError) {
                    router.push('/list/delivery')
                  }
                })
              }}
            >
              Next <BsArrowRight />
            </Button>
          </div>
        </>
      </div>
      <div className="md:w-2/4"></div>
    </div>
  )
}
export default ListPricingTemplate
