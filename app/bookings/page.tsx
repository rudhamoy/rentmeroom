'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import RoomCard from '@/components/rooms/RoomCard'

const BookingPage = () => {

  const [ bookmarkList, setBookmarkList ] = useState([])

  async function myBookmarkList () {
    const res = await axios.get('/api/bookmark')
    setBookmarkList(res.data)
    console.log(res.data)
  }

  useEffect(() => {
    myBookmarkList()
  }, [])

  console.log(bookmarkList)

  return (
    <div style={{margin: "10rem 2.5rem"}}>
      {
        bookmarkList?.map((room) => (
          <RoomCard key={room._id} room={room} />
        ))
      }
    </div>
  )
}

export default BookingPage