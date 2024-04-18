'use client'

import React, { useState } from 'react'
import { BsArrowRight, BsCheck, BsPlus } from 'react-icons/bs'
import { AiOutlineClose } from 'react-icons/ai'

import { useCheckoutContext } from 'contexts/CheckoutContext'
import Input from 'design-systems/Atoms/Input'
import Typography from 'design-systems/Atoms/Typography'
import Button from 'design-systems/Atoms/Button'
import Spinner from 'design-systems/Atoms/Spinner'
import Skeleton from 'design-systems/Atoms/Skeleton'
import { Address } from 'api-services/interface'
import { toast } from 'react-toastify'

const AddressCard: React.FC<{ index: number; item: Address }> = ({ index, item }) => {
  const { setSelectedAddress, selectedAddress, deleteAddress } = useCheckoutContext()
  const [isHover, setIsHover] = useState<boolean>(false)

  return (
    <div
      className="relative col-span-12 min-h-[120px] rounded-lg border p-4 text-left shadow-md shadow-neutral-600 dark:shadow-neutral-light-500 sm:col-span-6 lmd:col-span-4 lg:col-span-3"
      onClick={() => setSelectedAddress(index)}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <button
        className={`absolute right-[-8px] top-[-8px] ${
          isHover ? 'flex' : 'hidden'
        } h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-neutral-400 text-white dark:bg-neutral-light-100 dark:text-black `}
        disabled={deleteAddress.isLoading}
        onClick={e => {
          e.preventDefault()
          e.stopPropagation()
          deleteAddress.mutate(
            { addressId: item.id },
            {
              onSuccess: () => {
                toast.success('Successfully deleted.')
              },
              onError: () => {
                toast.error('Something went wrong.')
              },
            }
          )
        }}
      >
        {deleteAddress.isLoading ? <Spinner className="h-5 w-5 stroke-white dark:stroke-black" /> : <AiOutlineClose />}
      </button>

      <div
        className={`flex h-6 w-6 items-center justify-center rounded-full ${
          selectedAddress === index
            ? 'bg-green-500 text-white'
            : 'border border-neutral-400 bg-transparent dark:border-neutral-light-400'
        }`}
      >
        {selectedAddress === index && <BsCheck />}
      </div>
      <Typography className="mt-2" size="paragraph" variant="regular">
        {`${item.street} ${item.locationAddress} ${item.city} ${item.state} ${item.country} - ${item.zipCode}`.replaceAll(
          'null',
          ''
        )}
      </Typography>
    </div>
  )
}

const CheckoutShippingAddress: React.FC = () => {
  const inputClassName = [
    `px-3.5 py-3 dark:focus::border-neutral-light-600 fark:focus-within:border-neutral-light-600 flex items-center gap-1 !rounded-lg border border-transparent !bg-neutral-800 transition-colors duration-300 ease-in-out focus-within:border-neutral-500 focus-within:!bg-neutral-light-300 focus-within:bg-white hover:border-neutral-600 dark:!bg-neutral-light-700 dark:focus-within:!bg-transparent dark:hover:border-neutral-light-600 w-full`,
  ].join(' ')

  const {
    addressFormik,
    setActive,
    isShowAddressCard,
    setSelectedAddress,
    setIsShowAddressCard,
    selectedAddress,
    addressData,
    postAddress,
  } = useCheckoutContext()

  if (addressData.isLoading) {
    return (
      <div>
        <Spinner className="h-12 w-12 stroke-black dark:stroke-white" />
      </div>
    )
  }

  if (addressData.isFetching) {
    return (
      <div className="grid grid-cols-12 gap-4">
        {Array(addressData.data?.data.length)
          .fill(1)
          .map((_, index) => {
            return (
              <div
                className="col-span-12 min-h-[120px] rounded-lg border p-4 text-left shadow-md sm:col-span-6 lmd:col-span-4 lg:col-span-3"
                key={index}
                onClick={() => setSelectedAddress(index)}
              >
                <div
                  className={`flex h-6 w-6 items-center justify-center rounded-full border border-neutral-400 bg-transparent`}
                ></div>

                <div className="mt-5 flex flex-col gap-2">
                  <Skeleton className="h-4 w-full" isAnimatePulse />
                  <Skeleton className="h-4 w-[25%]" isAnimatePulse />
                </div>
              </div>
            )
          })}
      </div>
    )
  }

  if (isShowAddressCard) {
    return (
      <>
        <div className="grid grid-cols-12 gap-4">
          {addressData.data &&
            addressData.data?.data.map(item => {
              return <AddressCard index={item.id} item={item} key={item.id} />
            })}

          <div
            className="col-span-12 flex min-h-[120px] cursor-pointer items-center justify-center rounded-lg border-2 border-dashed sm:col-span-6 lmd:col-span-4 lg:col-span-3"
            onClick={() => setIsShowAddressCard(false)}
          >
            <BsPlus className="text-[3rem] text-neutral-400 dark:text-white" />
          </div>
        </div>

        <Button
          className="mt-5 font-semibold"
          disabled={isNaN(selectedAddress as number)}
          onClick={() => setActive('summary')}
        >
          Next <BsArrowRight />
        </Button>
      </>
    )
  }

  return (
    <form className="w-full text-left lg:w-3/4" onSubmit={addressFormik.handleSubmit}>
      <Input
        className="mb-5"
        error={
          addressFormik?.errors?.locationAddress && addressFormik?.touched?.locationAddress
            ? addressFormik?.errors?.locationAddress
            : ''
        }
        inputClassName={inputClassName}
        label="Address"
        labelClassName="!mb-0"
        name="locationAddress"
        type="text"
        value={addressFormik?.values?.locationAddress}
        onBlur={addressFormik.handleBlur}
        onChange={addressFormik.handleChange}
      />

      <Input
        className="mb-5"
        error={addressFormik?.errors?.city && addressFormik?.touched?.city ? addressFormik?.errors?.city : ''}
        inputClassName={inputClassName}
        label="City"
        labelClassName="!mb-0"
        name="city"
        type="text"
        value={addressFormik?.values?.city}
        onBlur={addressFormik.handleBlur}
        onChange={addressFormik.handleChange}
      />

      <Input
        className="mb-5"
        error={addressFormik?.errors?.state && addressFormik?.touched?.state ? addressFormik?.errors?.state : ''}
        inputClassName={inputClassName}
        label="State"
        labelClassName="!mb-0"
        name="state"
        type="text"
        value={addressFormik?.values?.state}
        onBlur={addressFormik.handleBlur}
        onChange={addressFormik.handleChange}
      />

      <Input
        className="mb-5"
        error={addressFormik?.errors?.zipCode && addressFormik?.touched?.zipCode ? addressFormik?.errors?.zipCode : ''}
        inputClassName={inputClassName}
        label="Zip Code"
        labelClassName="!mb-0"
        name="zipCode"
        type="text"
        value={addressFormik?.values?.zipCode}
        onBlur={addressFormik.handleBlur}
        onChange={addressFormik.handleChange}
      />

      <Input
        className="mb-5"
        error={addressFormik?.errors?.country && addressFormik?.touched?.country ? addressFormik?.errors?.country : ''}
        inputClassName={inputClassName}
        label="Country"
        labelClassName="!mb-0"
        name="country"
        type="text"
        value={addressFormik?.values?.country}
        onBlur={addressFormik.handleBlur}
        onChange={addressFormik.handleChange}
      />

      <Input
        className="mb-5"
        error={
          addressFormik?.errors?.phoneNumber && addressFormik?.touched?.phoneNumber
            ? addressFormik?.errors?.phoneNumber
            : ''
        }
        inputClassName={inputClassName}
        label="Phone"
        labelClassName="!mb-0"
        name="phoneNumber"
        type="text"
        value={addressFormik?.values?.phoneNumber}
        onBlur={addressFormik.handleBlur}
        onChange={addressFormik.handleChange}
      />

      <div className="flex gap-2">
        <Button disabled={postAddress.isLoading} type="submit">
          {postAddress.isLoading ? (
            <>
              <Spinner className="h-8 w-8 stroke-white dark:!stroke-white" /> Loading
            </>
          ) : (
            'Save Address'
          )}
        </Button>

        <Button className="bg-neutral-500" onClick={() => setIsShowAddressCard(true)}>
          Cancel
        </Button>
      </div>
    </form>
  )
}

export default CheckoutShippingAddress
