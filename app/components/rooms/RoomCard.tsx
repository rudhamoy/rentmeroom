'use client'
import Link from 'next/link'
import styles from './rooms.module.css'
import Image from 'next/image';
import { BsThreeDots, BsBookmarks } from 'react-icons/bs'
import { MdLocationOn } from 'react-icons/md'
import { HiHome } from 'react-icons/hi'
import { MdPeopleAlt } from 'react-icons/md'
import { useState } from 'react'
import axios from 'axios'
import { usePathname } from 'next/navigation';

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
        <img src={room.images[0]} alt="rentmeroom_images" className={styles.roomCard__image}  />
      </div>
      {/* right - detail  */}
      <div className={styles.roomCard__detailsContainer}>
        
        {pathname === "/rooms/list" ? (
          <BsThreeDots onClick={onClickHandler} style={{ position: "absolute", right: 2, top: 1, cursor: "pointer" }} />
        ) : (
          <BsBookmarks style={{ position: "absolute", right: 1, top: 1, cursor: "pointer" }} />
        )}

        {showAction && (
          <div className={styles.roomCard__actionModal} style={{top: 20}}>
            <button>Edit</button>
            <button onClick={() => deleteHandler(room._id)}>Delete</button>
          </div>
        )}

        <div style={{marginTop: '1rem'}}>
          <Link href={`/rooms/list/${room._id}`} className={styles.roomCard__title}>{room.title}</Link>
          <p>₹ {room.pricePerMonth}</p>

          <div>
            <div style={{display: "flex", gap: ".5rem", alignItems: "center"}}>
              <MdLocationOn />
              <p>{room?.address?.address}</p>
            </div>
            <div style={{display: "flex", gap: ".5rem", alignItems: "center"}}>
              <HiHome />
              <p>{room?.roomCategory}</p>
            </div>
            <div style={{display: "flex", gap: ".5rem", alignItems: "center"}}>
              <MdPeopleAlt />
              <p>{room?.tenants}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RoomCard