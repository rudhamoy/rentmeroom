'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from './rooms.module.css'
import Image from 'next/image';
import { BsThreeDots, BsBookmarks } from 'react-icons/bs'
import { MdLocationOn } from 'react-icons/md'
import { HiHome } from 'react-icons/hi'
import { MdPeopleAlt, MdCurrencyRupee } from 'react-icons/md'
import axios from 'axios'
import { usePathname, useRouter } from 'next/navigation';

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
  const router = useRouter()
  const pathname = usePathname()

  // helper function to show modal - edit/delete modal
  function onClickHandler() {
    setShowAction(!showAction)
  }

  async function deleteHandler(roomId: string) {
    const res = await axios.delete(`/api/rooms/${roomId}`)
  }

  return (
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
          <BsBookmarks style={{ position: "absolute", right: 1, top: 1, cursor: "pointer" }} />
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

        <div style={{ marginTop: '1rem' }}>
          <Link href={`/rooms/list/${room._id}`} className={styles.roomCard__title}>{room.title}</Link>
          {/* price */}

          <div>
            {/* price */}
            <div style={{ display: "flex", gap: ".5rem", alignItems: "center", marginTop: ".5rem" }}>
              <MdCurrencyRupee />
              <p style={{ fontSize: ".75rem" }}>{room.pricePerMonth}</p>
            </div>
            {/* location */}
            <div style={{ display: "flex", gap: ".5rem", alignItems: "center", marginTop: ".5rem" }}>
              <MdLocationOn />
              <p style={{ fontSize: ".75rem" }}>{room?.address?.address}</p>
            </div>
            {/* room category */}
            <div style={{ display: "flex", gap: ".5rem", alignItems: "center", marginTop: ".5rem" }}>
              <HiHome />
              <p style={{ fontSize: ".75rem" }}>{room?.roomCategory}</p>
            </div>

            {/* tenants */}
            <div style={{ display: "flex", gap: ".5rem", alignItems: "center", marginTop: ".5rem" }}>
              <MdPeopleAlt />
              <p style={{ fontSize: ".75rem" }}>{room?.tenants}</p>
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}

export default RoomCard