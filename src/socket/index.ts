import { io } from 'socket.io-client'

const token = localStorage.getItem('tradible') ? JSON.parse(localStorage.getItem('tradible') || '')?.token : ''
const URL = `https://api.tradible.io?token=${token}`
const socket = io(URL, { autoConnect: false })

export default socket
