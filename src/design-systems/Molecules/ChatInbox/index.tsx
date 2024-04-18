import Image from 'next/image'
import useChatSend, { useChatHistoryById } from 'hooks/Api/useChat'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import React, { FC, useContext, useEffect, useMemo, useRef } from 'react'
import { AuthContext } from 'contexts/AuthContext'
import Spinner from 'design-systems/Atoms/Spinner'
import socket from 'socket'
import { useSearchParams } from 'next/navigation'
import { useQuery } from 'react-query'
import authApiInstance from 'api-services/AuthAPIServices'
import Typography from 'design-systems/Atoms/Typography'
import { IoMdArrowRoundBack } from 'react-icons/io'
import Link from 'next/link'

interface FormValues {
  textInput: string
}

const SendChatCard = ({ text, img, name }: { text: string; img: string; name: string }) => {
  return (
    <div className="mb-4 flex cursor-pointer items-center justify-end">
      <div className="max-w-96 flex gap-3 rounded-lg bg-indigo-500 p-3 text-white">{text}</div>
      <div className="ml-2 flex h-9 w-9 items-center justify-center rounded-full bg-neutral-700  dark:bg-neutral-light-700 ">
        {!img && <span className="text-sm uppercase text-neutral-400 dark:text-white">{name ? name[0] : ''}</span>}
        {img && <Image width={60} height={60} src={img} alt="My Avatar" className="h-8 w-8 rounded-full" />}
      </div>
    </div>
  )
}
const ReceiverChatCard = ({ text, img, name }: { text: string; img: string; name: string }) => {
  return (
    <div className="mb-4 flex cursor-pointer">
      {!img && (
        <div className="mr-2 flex h-9 w-9  items-center justify-center overflow-hidden rounded-full">
          <div className="flex h-full w-full items-center justify-center border-black bg-neutral-700 dark:bg-neutral-light-700">
            {!img && <span className="text-sm uppercase text-neutral-400 dark:text-white">{name ? name[0] : ''}</span>}
          </div>
        </div>
      )}
      {img && (
        <div className="mr-2 flex h-9 w-9  items-center justify-center rounded-full ">
          <Image width={60} height={60} src={img} alt="User Avatar" className="h-8 w-8 rounded-full" />
        </div>
      )}
      <div className="max-w-96 flex  gap-3 rounded-lg bg-neutral-700 p-3  dark:bg-neutral-light-500 dark:text-neutral-light-100">
        {text}
      </div>
    </div>
  )
}
export const ChatInbox: FC = () => {
  const { isLoadingChat, getChatAsync, portChatAsync, isLoadingPortChatAsync } = useChatSend()
  const { state } = useContext(AuthContext)
  const divRef = useRef<HTMLDivElement>(null)

  // Function to scroll down
  const scrollDown = () => {
    if (divRef.current) {
      divRef.current.scrollTop = divRef.current.scrollHeight
    }
  }

  const { values, get } = useSearchParams()
  const id = useMemo(() => get('userId'), [values])
  const {
    chatHistoryDataByIdFormatted,
    refetchChatHistoryById,
    isLoadingChatHistoryById,
    setChatHistoryDataByIdFormatted,
  } = useChatHistoryById(id)

  const { data: senderData, isLoading } = useQuery(
    ['senderData'],
    () =>
      authApiInstance.getSingleUserProfile({
        userId: id || '0',
        type: 'portfolio',
        pageSize: 10,
        pageNumber: 1,
      }),
    { enabled: true }
  )

  const formik = useFormik({
    initialValues: {
      textInput: '',
    },

    validationSchema: Yup.object({
      textInput: Yup.string().required('Required'),
    }),

    onSubmit: async values => {
      portChatAsync({
        to: id,
        message: values.textInput,
      })

      socket.emit('send-message', {
        to: Number(id),
        message: values.textInput,
      })

      setChatHistoryDataByIdFormatted(prevState => [
        ...prevState,
        {
          fromSelf: true,
          message: values.textInput,
          toDetail: {
            id: senderData?.data?.userDetails?.id,
            displayName: senderData?.data?.userDetails?.displayName,
            thumbnail: senderData?.data?.userDetails.thumbnail,
            bannerImage: null,
          },
          fromDetail: {
            id: state?.data?.user?.id,
            displayName: state?.data?.user?.displayName,
            thumbnail: state?.data?.user?.thumbnail,
            bannerImage: null,
          },
        },
      ])
      formik.setValues({
        textInput: '',
      })
    },
  })

  scrollDown()

  useEffect(() => {
    if (senderData?.data?.userDetails) {
      socket.on('message-received', data => {
        setChatHistoryDataByIdFormatted(prevState => [
          ...prevState,
          {
            fromSelf: false,
            message: data,
            fromDetail: {
              id: senderData?.data?.userDetails?.id,
              displayName: senderData?.data?.userDetails?.displayName,
              thumbnail: senderData?.data?.userDetails.thumbnail,
              bannerImage: null,
            },
            toDetail: {
              id: state?.data?.user?.id,
              displayName: state?.data?.user?.id,
              thumbnail: state?.data?.user?.thumbnail,
              bannerImage: null,
            },
          },
        ])
      })
    }
    return () => {
      socket.off('message-received')
    }
  }, [senderData])

  useEffect(() => {
    scrollDown()
  }, [chatHistoryDataByIdFormatted])

  return (
    <div className=" relative w-full flex-1  dark:bg-neutral-light-800">
      <Link href={'/chat'} className="my-2">
        <IoMdArrowRoundBack className="text-custom-light-300" size={30} />
      </Link>
      <form className={'relative h-full w-full'} onSubmit={formik.handleSubmit}>
        {!isLoadingChatHistoryById ? (
          chatHistoryDataByIdFormatted.length !== 0 ? (
            <div ref={divRef} className=" chat-scroll pb-30 h-[529px] overflow-y-auto p-4">
              {chatHistoryDataByIdFormatted.map((item, key) => {
                if (item.fromSelf) {
                  return (
                    <>
                      <SendChatCard
                        key={key}
                        img={item?.fromDetail?.thumbnail}
                        text={item?.message}
                        name={item?.fromDetail?.displayName}
                      />
                    </>
                  )
                } else {
                  return (
                    <ReceiverChatCard
                      key={key}
                      img={item?.fromDetail?.thumbnail}
                      text={item?.message}
                      name={item?.fromDetail?.displayName}
                    />
                  )
                }
              })}
            </div>
          ) : (
            <div className={'flex h-[529px] w-full items-center justify-center'}>
              <Typography size={'h5'}>No Chat Found</Typography>
            </div>
          )
        ) : (
          <Spinner className="m-auto h-10 w-10 stroke-neutral-100 dark:stroke-neutral-800" />
        )}
        <div className=" bottom-0 left-0 right-0 w-full  border-b border-t  border-gray-300 bg-white p-4 dark:border-neutral-light-600 dark:bg-neutral-light-900 ">
          <div className="flex items-center">
            <input
              type="text"
              name="textInput"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.textInput}
              placeholder="Type a message..."
              className="w-full rounded-md border border-gray-400 p-2 focus:border-blue-500 focus:outline-none"
            />
            <button
              disabled={isLoadingPortChatAsync}
              type="submit"
              className="ml-2 rounded-md bg-indigo-500 px-4 py-2 text-white"
            >
              {isLoadingPortChatAsync ? 'Sending...' : 'Send'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
