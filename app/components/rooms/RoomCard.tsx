'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from './rooms.module.css'
import { BsThreeDots, BsBookmarks } from 'react-icons/bs'
import { MdLocationOn } from 'react-icons/md'
import { HiHome } from 'react-icons/hi'
import { MdPeopleAlt, MdCurrencyRupee } from 'react-icons/md'
import axios from 'axios'
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { createPortal } from 'react-dom'
import Modal from '../utils/Modal'
import CreateBooking from '../booking/CreateBooking'

interface RoomCardProps {
  room: {
    _id: string,
    title: string,
    pricePerMonth: string,
    roomCategory: string,
    tenants: string,
    images: []
  }
}

const RoomCard: React.FC<RoomCardProps> = ({ room }) => {

  const [showAction, setShowAction] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const pathname = usePathname()

  const { data } = useSession()

  // helper function to show modal - edit/delete modal
  function onClickHandler() {
    setShowAction(!showAction)
  }

  // delete
  async function deleteHandler(roomId: string) {
    const res = await axios.delete(`/api/rooms/${roomId}`)
  }

  // bookmark
  const bookmarkHandler = async () => {
    const res = await axios.post('/api/bookmark', { roomID: room._id })
    if (res.data.message === 'deleted') {
      setBookmarked(false)
    } else {
      setBookmarked(true)
    }

  }

  // check if this room is already bookmarked
  const checkBookmark = async () => {
    const bookmark = await axios.post('/api/bookmark/exist', { roomID: room._id })
    setBookmarked(bookmark.data.exist)
  }

  useEffect(() => {
    checkBookmark()
  }, [data])

  return (
    <>

<div className={styles.roomCard__container}>
      {/* left - Image  */}
      <div className={styles.roomCard__imageContainer}>
        <img src={room.images[0]} alt="rentmeroom_images" className={styles.roomCard__image} />
      </div>
      {/* right - detail  */}
      <div className={styles.roomCard__detailsContainer}>

        {/* 
          * show bookmark icon to every page
          * show three dot menu to owner room list page
         */}
        {pathname === "/rooms/list" ? (
          <BsThreeDots onClick={onClickHandler} style={{ position: "absolute", right: 2, top: 1, cursor: "pointer" }} />
        ) : pathname === "/profile" ? (
          <p style={{ position: "absolute", right: 1, top: 0, fontSize: ".65rem", padding: ".2rem", background: "yellow" }}>un-occupied</p>
        ) : (
          // bookmakr
          <BsBookmarks 
          onClick={bookmarkHandler}
          style={{ 
            position: "absolute",
            backgroundColor: `${bookmarked === true ? "black" : "lightgray"}`,
            borderRadius: "50%",
            padding: ".4rem",
            right: 0, top: 0, 
            cursor: "pointer", 
            color: `${bookmarked === true ? "lightgray" : "black"}`,
            fontSize: ".8rem"
          }}
          />
        )
        }

        {/* 
          show this modal when owner click to three dots menu
         */}
        {showAction && (
          <div className={styles.roomCard__actionModal} style={{ top: 20 }}>
            <button>Edit</button>
            <button onClick={() => deleteHandler(room._id)}>Delete</button>
          </div>
        )}

        <div style={{ marginTop: '1.2rem' }}>
          <Link href={`/rooms/list/${room._id}`} className={styles.roomCard__title}>{room.title}</Link>

          {/* details container */}
          <div>
            {/* price */}
            <div style={{ display: "flex", gap: ".5rem", alignItems: "center", marginTop: ".35rem" }}>
              <MdCurrencyRupee />
              <p style={{ fontSize: ".75rem" }}>{room.pricePerMonth}</p>
            </div>
            {/* location */}
            <div style={{ display: "flex", gap: ".5rem", alignItems: "center", marginTop: ".35rem" }}>
              <MdLocationOn />
              <p style={{ fontSize: ".75rem" }}>{room?.address?.address}</p>
            </div>
            {/* room category */}
            <div style={{ display: "flex", gap: ".5rem", alignItems: "center", marginTop: ".35rem" }}>
              <HiHome />
              <p style={{ fontSize: ".75rem" }}>{room?.roomCategory}</p>
            </div>

            {/* tenants */}
            <div style={{ display: "flex", gap: ".5rem", alignItems: "center", marginTop: ".35rem" }}>
              <MdPeopleAlt />
              <p style={{ fontSize: ".75rem" }}>{room?.tenants}</p>
            </div>

          </div>

          {pathname === '/bookings' && (
            <button onClick={() => setShowModal(true)} className={styles.bookButton}>Book/Visit</button>
          )}
        </div>
      </div>
    </div>

      {showModal === true && createPortal(
        <Modal>
          <CreateBooking setShowModal={setShowModal} room={room} />
        </Modal>,
        document.body
      )}
    </>
  )
}

export default RoomCard