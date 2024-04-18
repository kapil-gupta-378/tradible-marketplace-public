'use client'
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import Image from 'design-systems/Atoms/Image'
import { StaticImageData } from 'next/dist/shared/lib/get-img-props'
import { toast } from 'react-toastify'

import { ProfileProps } from './interface'

import Typography from 'design-systems/Atoms/Typography'
import Button from 'design-systems/Atoms/Button'
import { useUserProfile } from 'hooks/Api/useUserProfile'
import { useImageUpload } from 'hooks/useImageUpload'
import Spinner from 'design-systems/Atoms/Spinner'
import { useOrganizationContext } from 'contexts/OrganizationContext'

export const OrganizationCover: React.FC<ProfileProps> = ({ src = '', className }) => {
  const [render, setRender] = useState<boolean>(false)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [isUpload, setIsUpload] = useState<boolean>(false)
  const modalRef = useRef<HTMLDivElement>(null)
  const { userUpdateMutation } = useUserProfile()
  const uploadImage = useImageUpload()
  useEffect(() => {
    setFile(src)
  }, [src])

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen)
    setError('')
    setRender(true)
  }

  const { OrganizationFormik } = useOrganizationContext()
  const [file, setFile] = useState<string | StaticImageData>(OrganizationFormik?.values?.banner as string)

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]

    if (selectedFile) {
      if (selectedFile.size >= 5 * 1024 * 1024) {
        setError('Cover must have file with size under 5mb')
        return
      }
      setError('')
      setFile(URL.createObjectURL(selectedFile))
      setIsUpload(true)
      uploadImage(selectedFile)
        .then(res => {
          toast.success('Successfully updated Profile image')
          OrganizationFormik.setFieldValue('banner', res)
          setIsUpload(false)
          setIsModalOpen(false)
        })
        .catch(() => {
          toast.error('Something went wrong')
          setIsUpload(false)
          setIsModalOpen(false)
        })
    }
  }

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (!isUpload && modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setIsModalOpen(false)
      }
    }

    if (isModalOpen) {
      document.addEventListener('mousedown', handleOutsideClick)
    } else {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [isModalOpen, isUpload])

  return (
    <>
      <div className="dark:transparent md:h- relative mb-[44px] rounded-lg bg-neutral-1200">
        <div
          className={`group/Profile-cover profile-cover relative h-[200px] w-full overflow-hidden rounded-lg bg-neutral-1200 dark:bg-[#272A2D] smd:h-[300px] ${className} `}
        >
          {file && (
            <Image alt="Profile Cover" className="h-full w-full object-cover" height={1500} src={file} width={1500} />
          )}

          <div>
            <Button
              className="z-5 invisible absolute right-6 top-6 w-fit -translate-y-full transform items-center rounded-md bg-neutral-100 px-4  py-3 font-inter text-[14px]  text-sm font-bold text-white transition duration-300 active:scale-95 group-hover/Profile-cover:visible group-hover/Profile-cover:translate-y-0 dark:bg-white dark:text-black"
              onClick={handleModalToggle}
            >
              Edit cover
            </Button>
          </div>
        </div>
      </div>
      <div
        className={`fixed left-0 top-0 z-[101] flex  h-screen w-screen items-center justify-center bg-neutral-200  ${
          render ? (isModalOpen ? 'animate-fade-in-up' : 'animate-fade-in-up-reverse') : 'hidden'
        }`}
      >
        <div
          className="w-full rounded-[14px] border border-neutral-700 bg-neutral-light-100 p-8 text-left shadow-[0_6px_16px_rgba(27,32,50,0.1)] backdrop-blur-[20px] dark:border-neutral-light-600 dark:bg-custom-light-900 smd:w-[380px]"
          ref={modalRef}
        >
          <Typography className="mb-4" size="h4" variant="regular">
            Update cover
          </Typography>
          <Typography
            className="mb-4 !font-medium text-neutral-400 dark:text-neutral-light-300 "
            size="h6"
            variant="regular"
          >
            Upload new cover. We recommend to upload images in 1440x260 resolution. Max 5 MB in JPEG format
          </Typography>

          <div className="mb-4">
            <Button className="z-5 relative  h-12 w-full  items-center !rounded-lg bg-neutral-100 !p-0 font-inter text-sm font-semibold text-white transition duration-300  active:scale-95 dark:bg-white dark:text-black">
              {userUpdateMutation.isLoading || isUpload ? (
                <>
                  <Spinner className="dark!:stroke-black stroke-white" />
                </>
              ) : (
                <>
                  <input
                    accept=".jpg, .jpeg, .png"
                    className="absolute left-0 right-0 top-0 h-9 w-full rounded-lg !opacity-0"
                    hidden
                    id="userImage"
                    type="file"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeImage(e)}
                  />

                  <label
                    className="flex h-full w-full cursor-pointer items-center justify-center text-[14px] font-medium"
                    htmlFor="userImage"
                  >
                    Select file
                  </label>
                </>
              )}
            </Button>
            {error && (
              <Typography className="mt-2 !font-medium !text-red-100" size="paragraph" variant="regular">
                {error}
              </Typography>
            )}
          </div>
          <Button
            className="w-full border border-neutral-1000 bg-transparent text-[14px] !font-semibold text-neutral-custom-black transition duration-300 hover:border-[#16161a2e] active:scale-95 dark:border-neutral-light-600 dark:text-white dark:hover:border-neutral-light-1300"
            color="secondary"
            disabled={isUpload}
            onClick={handleModalToggle}
          >
            Cancel
          </Button>
        </div>
      </div>
    </>
  )
}

export default OrganizationCover
