import Typography from 'design-systems/Atoms/Typography'
import React, { FC } from 'react'
import Button from 'design-systems/Atoms/Button'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Spinner from 'design-systems/Atoms/Spinner'
import { FeedbackModalProps } from './interface'
import Input from 'design-systems/Atoms/Input'
import usePortfolioData from 'hooks/Api/useOrderDetails'
import { useParams } from 'next/navigation'
import { toast } from 'react-toastify'

export const FeedbackModal: FC<FeedbackModalProps> = ({ closeModal, isOpenModal }) => {
  const params = useParams()
  const { portFeedbackAsync, isLoadingPortFeedback } = usePortfolioData(Number(params?.orderId))
  const handleFeedback = async () => {
    const bidParam = {
      feedbackMessage: '',
    }
    const res = await portFeedbackAsync(bidParam)
    if (res) {
      toast.success('Feedback send successfully!')
    } else {
      toast.error('Something went wrong!')
    }
  }

  const localCloseModal = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation()
    closeModal()

    setValues({
      feedback: '',
    })
    setTouched({
      feedback: false,
    })
  }

  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setValues, setTouched } = useFormik({
    initialValues: {
      feedback: '',
    },
    validationSchema: Yup.object({
      feedback: Yup.string().required(),
    }),
    onSubmit: values => {
      handleFeedback()
    },
  })

  const inputClassName = [
    `dark:focus::border-neutral-light-600 fark:focus-within:border-neutral-light-600 flex items-center gap-1 rounded-md border border-transparent bg-neutral-800 px-3 py-3 transition-colors duration-300 ease-in-out focus-within:border-neutral-500 focus-within:bg-neutral-light-300 focus-within:bg-white hover:border-neutral-600 dark:bg-neutral-light-700 dark:focus-within:bg-transparent dark:hover:border-neutral-light-600 `,
  ].join(' ')

  return (
    <>
      <div
        className={`modal fixed right-0 flex h-full items-center  justify-center overflow-hidden bg-neutral-200  lmd:right-0   ${
          isOpenModal ? (isOpenModal ? 'animate-fade-in-up' : 'animate-fade-in-up-reverse') : 'hidden'
        } top-0 z-10 h-screen w-[96%]   p-3 filter transition-all  smd:w-full`}
        // onClick={e => localCloseModal(e)}
      >
        <div className="fixed !z-0 h-[100vh] w-full  " onClick={e => localCloseModal(e)}></div>
        <div
          className={`z-50  flex w-full flex-col gap-8 rounded-md bg-white p-8   opacity-0 dark:bg-neutral-100  smd:w-[512px]  ${
            isOpenModal ? (isOpenModal ? 'animate-fade-in-up' : 'animate-fade-in-up-reverse') : 'hidden'
          }`}
        >
          <div className="flex flex-col gap-4 dark:bg-dark">
            <Typography className="text-left dark:text-white" size="h4" variant="regular">
              Share Your Feedback
            </Typography>
            <Typography size={'h6'} className="text-left !font-medium text-neutral-400">
              Share your experience of interacting with user. Your feedback helps us maintain and improve our community.
            </Typography>
          </div>

          <div className="flex flex-col gap-4">
            <Typography className="text-left font-semibold  dark:text-white " size="h6" variant="regular">
              Message
            </Typography>

            <Input
              className={`${inputClassName} w-full ${errors.feedback && touched.feedback ? '!border-red-500' : ''}`}
              placeholder="Tell us some details"
              name="feedback"
              type="text"
              value={values.feedback}
              onBlur={handleBlur}
              onChange={handleChange}
              onClick={e => {
                e.preventDefault()
                e.stopPropagation()
              }}
            />
            {errors.feedback && touched.feedback && (
              <Typography size={'paragraph'} className={'ml-[2px] mt-[-12px] text-left !text-red-500'}>
                Please enter feedback.
              </Typography>
            )}
          </div>

          <div className={'mt-8 flex flex-col gap-4'}>
            <Button
              className="h-[48px] w-full text-[14px] font-semibold"
              onClick={e => {
                handleSubmit()
                e.preventDefault()
                e.stopPropagation()
              }}
            >
              {0 ? <Spinner className="mx-5 h-5 w-5 stroke-neutral-50 dark:stroke-neutral-800" /> : 'Submit feedback'}
            </Button>
            <Button
              onClick={e => localCloseModal(e)}
              className="h-[48px] w-full text-[14px] font-semibold dark:border-gray-400 dark:text-white dark:hover:border-gray-400"
              variant="outlined"
              color="secondary"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
