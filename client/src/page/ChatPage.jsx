import React, { useEffect, useState } from 'react'
import axios from 'axios'
const ChatPage = () => {

  const [chats, setChats] = useState()

  const fetchChats = async () => {
    const { data } = await axios.get('/api')
  }
  useEffect(() => {
    fetchChats()
  }, [])


  return (
    <div>
      ChatPage
    </div>
  )
}

export default ChatPage
