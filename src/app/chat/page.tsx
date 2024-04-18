import { Metadata } from 'next'
import ChatTemplate from '../../design-systems/Templates/ChatTemplate'

export const metadata: Metadata = {
  title: 'Chat',
  description: 'Chat Page',
}

const ChatPage: React.FC = () => {
  return <ChatTemplate />
}

export default ChatPage
