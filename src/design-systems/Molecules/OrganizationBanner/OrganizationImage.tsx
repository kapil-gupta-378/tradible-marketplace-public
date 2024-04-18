'use client'
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import Image from 'design-systems/Atoms/Image'
import { StaticImageData, StaticImport } from 'next/dist/shared/lib/get-img-props'
import { toast } from 'react-toastify'

import { ProfileProps } from './interface'

import Typography from 'design-systems/Atoms/Typography'
import Button from 'design-systems/Atoms/Button'
import { useUserProfile } from 'hooks/Api/useUserProfile'
import { useImageUpload } from 'hooks/useImageUpload'
import Spinner from 'design-systems/Atoms/Spinner'
import { useOrganizationContext } from 'contexts/OrganizationContext'

export const OrganizationImage: React.FC<ProfileProps> = ({ src = '', className }) => {
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
  const [file, setFile] = useState<string | StaticImageData>(OrganizationFormik.values.thumbnail as string)

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
          toast.success('Successfully updated organization image')
          OrganizationFormik.setFieldValue('thumbnail', res)
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
      <div
        className={`${className} group/Profile-image profile-image z-0  h-[132px] w-[132px] translate-y-1/3 transform rounded-full bg-black `}
      >
        <div className="relative">
          {file && (
            <Image
              alt="Profile Image"
              className="w-[132px]l absolute left-0 right-0 h-[132px] rounded-full object-cover"
              height={132}
              src={file}
              width={132}
            />
          )}

          <Button
            className="z-1 invisible absolute left-0 top-0 z-10 flex h-[132px] w-[132px] items-center justify-center rounded-full bg-neutral-600 px-4 py-2 font-inter text-sm font-semibold text-white transition duration-300 group-hover/Profile-image:visible "
            color="secondary"
            onClick={handleModalToggle}
          >
            Edit profile
          </Button>
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
            Update avatar
          </Typography>
          <Typography
            className="mb-4 !font-medium text-neutral-400 dark:text-neutral-light-300 "
            size="h6"
            variant="regular"
          >
            Upload new avatar. We recommend to upload images in 400x400 resolution. Max 5 MB in JPEG, PNG or GIF format
          </Typography>
          <div className="mb-4">
            <Button className="z-5 relative  h-12 w-full  items-center !rounded-lg bg-neutral-100 px-4 py-3 font-inter text-sm font-semibold text-white transition duration-300  active:scale-95 dark:bg-white dark:text-black">
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
                    id="userImageThumbnail"
                    type="file"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeImage(e)}
                  />

                  <label
                    className="flex h-full w-full cursor-pointer items-center justify-center text-[14px] font-medium"
                    htmlFor="userImageThumbnail"
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
            className="h-12 w-full !rounded-lg border border-neutral-1000 bg-transparent text-[14px] !font-semibold text-neutral-custom-black transition duration-300 hover:border-[#16161a2e] active:scale-95 dark:border-neutral-light-600 dark:text-white dark:hover:border-neutral-light-1300"
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

export default OrganizationImage
