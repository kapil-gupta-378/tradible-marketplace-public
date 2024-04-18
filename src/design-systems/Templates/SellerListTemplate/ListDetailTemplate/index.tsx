'use client'
import { ChangeEvent, useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import { toast } from 'react-toastify'
import { BsArrowRight } from 'react-icons/bs'

import ListDetailImage from './ListDetailImage'

import Input from 'design-systems/Atoms/Input'
import Typography from 'design-systems/Atoms/Typography'
import { SellerListCard } from 'api-services/interface'
import { useSellerContext } from 'contexts/SellerListContext'
import Button from 'design-systems/Atoms/Button'
import { useImageUpload } from 'hooks/useImageUpload'
import Spinner from 'design-systems/Atoms/Spinner'
import { useRouter } from 'next/navigation'

export const ListDetailsTemplate: React.FC = () => {
  const inputClassName = [
    `px-3.5 py-3 dark:focus::border-neutral-light-600 fark:focus-within:border-neutral-light-600 flex items-center gap-1 !rounded-lg border border-transparent !bg-neutral-800 transition-colors duration-300 ease-in-out focus-within:border-neutral-500 focus-within:!bg-neutral-light-300 focus-within:bg-white hover:border-neutral-600 dark:!bg-neutral-light-700 dark:focus-within:!bg-transparent dark:hover:border-neutral-light-600 w-full`,
  ].join(' ')

  const { selectedData } = useSellerContext()
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [renderModal, setRenderModal] = useState<boolean>(false)
  const router = useRouter()

  const {
    values: listDetailInfo,
    handleChange: handleChangeSearch,
    setValues,
  } = useFormik<SellerListCard>({
    initialValues: {} as SellerListCard,
    onSubmit: values => {
      values
    },
  })

  useEffect(() => {
    setValues(selectedData)
  }, [selectedData])

  return (
    <div className="flex flex-col gap-8 lg:flex-row">
      <div className="w-full text-left">
        <>
          <Input
            className="mb-5"
            disabled
            inputClassName={inputClassName}
            label="Name"
            labelClassName="!mb-0"
            name=""
            type="text"
            value={listDetailInfo?.title}
            onChange={handleChangeSearch}
          />
          <Input
            className="mb-5"
            disabled
            inputClassName={inputClassName}
            label="Card number"
            labelClassName="!mb-0"
            name=""
            type="text"
            value={listDetailInfo?.cardNumber}
            onChange={handleChangeSearch}
          />
          <Input
            className="mb-5"
            disabled
            inputClassName={inputClassName}
            label="Stage"
            labelClassName="!mb-0"
            name=""
            type="text"
            value={listDetailInfo.stage}
            onChange={handleChangeSearch}
          />
          <Input
            className="mb-5"
            disabled
            inputClassName={inputClassName}
            label="Super Type"
            labelClassName="!mb-0"
            name=""
            type="text"
            value={listDetailInfo?.superType}
            onChange={handleChangeSearch}
          />
          <Input
            className="mb-5"
            disabled
            inputClassName={inputClassName}
            label="Set Name"
            labelClassName="!mb-0"
            name=""
            type="text"
            value={listDetailInfo?.setName || ''}
            onChange={handleChangeSearch}
          />
          {/* <Input
            className="mb-5"
            inputClassName={inputClassName}
            label="Grade"
            labelClassName="!mb-0"
            name="grade"
            type="text"
            value={listDetailInfo?.cardType}
            onChange={handleChangeSearch}
          />
          <Input
            className="mb-5"
            inputClassName={inputClassName}
            label="Condition"
            labelClassName="!mb-0"
            name="condition"
            type="text"
            value={listDetailInfo?.hp}
            onChange={handleChangeSearch}
          /> 
          <Input
            className="mb-5"
            inputClassName={inputClassName}
            label="Game"
            labelClassName="!mb-0"
            name="game"
            type="text"
            value={listDetailInfo?.stage}
            onChange={handleChangeSearch}
          /> */}

          <Input
            className="mb-5"
            disabled
            inputClassName={inputClassName}
            label="Rarity"
            labelClassName="!mb-0"
            name=""
            type="text"
            value={listDetailInfo.rarity}
            onChange={handleChangeSearch}
          />

          {/* <Input
            className="mb-5"
            inputClassName={inputClassName}
            label="Description"
            labelClassName="!mb-0"
            name=""
            type="text"
            value={''}
            onChange={handleChangeSearch}
          /> */}

          <div>
            <Typography className={`!font-medium text-[#000] dark:text-neutral-light-100`} size="h6" variant="regular">
              Description
            </Typography>
            <textarea
              className={`${inputClassName} focus:outline-none`}
              disabled
              id="textarea"
              name=""
              rows={3}
              value={
                typeof listDetailInfo.description === 'string'
                  ? listDetailInfo.description
                  : Array.isArray(listDetailInfo.description)
                  ? listDetailInfo.description.map(item => item.text).join(' ')
                  : ''
              }
              onChange={handleChangeSearch}
            />
          </div>

          <Button
            className="mt-5"
            onClick={() => {
              if (Object.keys(selectedData).length) {
                router.push('/list/pricing')
              } else {
                toast.warn('Please select a item to list.')
              }
            }}
          >
            Next <BsArrowRight />
          </Button>
        </>
      </div>
      <div className="flex flex-col items-center justify-start text-left md:w-2/4">
        <div className="mb-3 flex w-full justify-between">
          <div>
            <Typography
              className={`mb-0 !font-medium text-[#000] dark:text-neutral-light-100`}
              size="h6"
              variant="regular"
            >
              Images
            </Typography>
          </div>
          {Object.keys(selectedData).length > 0 && (
            <div>
              <Button
                onClick={() => {
                  setOpenModal(prev => !prev)
                  setRenderModal(true)
                }}
              >
                Add Images
              </Button>
            </div>
          )}
        </div>
        {renderModal && <ImageUploader show={openModal} onClick={() => setOpenModal(prev => !prev)} />}

        {Object.keys(selectedData).length ? (
          <ListDetailImage />
        ) : (
          <div className="h-[26rem] w-full rounded-lg bg-secondary-400"></div>
        )}
      </div>
    </div>
  )
}

const ImageUploader = ({ onClick, show = false }: { onClick: () => void; show: boolean }) => {
  const [file, setFile] = useState<StaticImport | string>()
  const [error, setError] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const uploadImage = useImageUpload()
  const { formik } = useSellerContext()

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]

    if (selectedFile) {
      if (selectedFile.size >= 5 * 1024 * 1024) {
        setError('Cover must have file with size under 5mb')
        return
      }
      setError('')
      setFile(URL.createObjectURL(selectedFile))
      setIsLoading(true)
      uploadImage(selectedFile).then(res => {
        onClick()
        formik.setFieldValue('images', [...formik.values.images, res])
        setIsLoading(false)
        toast.success('Uploaded Image Successfully.')
      })
    }
  }

  return (
    <div
      aria-labelledby="modal-title"
      aria-modal="true"
      className="relative z-[100]"
      role="dialog"
      onClick={
        !isLoading
          ? () => onClick()
          : () => {
              return
            }
      }
    >
      <div
        className={`fixed inset-0 bg-neutral-200 bg-opacity-75 transition-opacity ${
          show ? 'animate-fade-in-zoomIn' : 'animate-fade-in-zoomIn-reverse'
        }`}
      ></div>

      <div
        className={`fixed inset-0 z-10 flex w-screen items-center justify-center overflow-y-auto ${
          show ? 'animate-fade-in-up' : 'animate-fade-in-up-reverse'
        }`}
      >
        <div className="mx-auto flex w-full justify-center sm:max-w-lg">
          <div className="flex w-full flex-col items-center justify-center bg-white dark:bg-dark sm:w-3/4 sm:rounded-lg sm:shadow-xl">
            <div className="mb-10 mt-10 text-center">
              <Typography className="mb-2 text-2xl font-semibold dark:text-white">Upload your Images</Typography>
              <p className="text-xs text-gray-500">File should be of format .png, .jpg or .jpeg</p>
            </div>
            {isLoading ? (
              <div className="relative mb-10 flex h-36 w-4/5 max-w-xs items-center justify-center rounded-lg bg-gray-100 shadow-inner dark:bg-gray-700">
                <Spinner className="h-8 w-8 stroke-black dark:!stroke-white" />
              </div>
            ) : (
              <>
                <form className="relative mb-10 w-4/5 max-w-xs">
                  <input
                    accept=".jpg, .jpeg, .png"
                    className="hidden"
                    id="file-upload"
                    type="file"
                    onChange={e => handleChangeImage(e)}
                  />
                  <label
                    className="z-20 flex h-36 w-full cursor-pointer flex-col-reverse items-center justify-center rounded-lg bg-gray-100 shadow-inner dark:bg-gray-700"
                    htmlFor="file-upload"
                  >
                    <p className="text-xs z-10 text-center font-light text-gray-500">Drag & Drop your files here</p>
                    <svg
                      className="z-10 h-8 w-8 text-indigo-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"></path>
                    </svg>
                  </label>
                </form>
              </>
            )}

            {error ? (
              <Typography
                className={`mb-2 !font-medium text-red-500 dark:text-neutral-light-100`}
                size="h6"
                variant="regular"
              >
                {error}{' '}
              </Typography>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListDetailsTemplate
