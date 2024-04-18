'use client'
import { ChatList } from 'design-systems/Molecules/ChatList'
import { useContext, useEffect, useMemo, useState } from 'react'
import useMediaQuery from 'hooks/useMediaQuery'
import Typography from 'design-systems/Atoms/Typography'
import withAuth from 'design-systems/Molecules/WithAuth'
import { ChatInbox } from 'design-systems/Molecules/ChatInbox'
import socket from 'socket'
import { AuthContext } from 'contexts/AuthContext'
import { useRouter, useSearchParams } from 'next/navigation'

const ChatTemplate = () => {
  const [selectChat, setSelectChat] = useState<number | string | null>()
  const isSlg = useMediaQuery('(max-width: 980px)')
  const { state } = useContext(AuthContext)
  const { values, get } = useSearchParams()
  const id = useMemo(() => get('userId'), [values])
  const route = useRouter()
  const handleSelectChat = (id: number | string) => {
    setSelectChat(id)
    route.push(`/chat?userId=${id}`)
  }

  const [usernameAlreadySelected, setUsernameAlreadySelected] = useState(false)
  const [users, setUsers] = useState<any[]>([])

  const onUsernameSelection = (username: string) => {
    setUsernameAlreadySelected(true)
    socket.auth = { username }
    socket.connect()
  }

  useEffect(() => {
    if (state?.data?.user?.firstName) {
      onUsernameSelection(state?.data?.user?.firstName)
    }

    const handleConnectError = (err: { message: string }) => {
      if (err.message === 'invalid username') {
        setUsernameAlreadySelected(false)
      }
    }
    socket.on('connect_error', handleConnectError)

    return () => {
      socket.off('connect_error', handleConnectError)
      socket.disconnect()
    }
  }, [state])

  useEffect(() => {
    setSelectChat(id)
  }, [id])

  return (
    <div className="container">
      <div className="flex h-[700px] w-full flex-col overflow-hidden pb-[65px]  ">
        <div className="flex items-center justify-center rounded-sm border-b border-gray-300  bg-neutral-600 p-4 text-white dark:border-neutral-light-600 dark:bg-neutral-light-800">
          <Typography className="text-center text-2xl font-semibold">Chats</Typography>
        </div>
        <div className="flex h-full  w-[100%] flex-row ">
          <ChatList
            users={users}
            className={`${isSlg ? (selectChat ? 'hidden' : 'w-full border-0') : ''}`}
            onClickChat={handleSelectChat}
            selectChat={selectChat}
          />
          {Boolean(id) && <ChatInbox />}
        </div>
      </div>
    </div>
  )
}

export default withAuth(ChatTemplate)
