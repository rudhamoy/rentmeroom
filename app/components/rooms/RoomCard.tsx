'use client'
import Link from 'next/link'
import styles from './rooms.module.css'
import Image from 'next/image';
import { BsThreeDots } from 'react-icons/bs'
import { useState } from 'react'
import axios from 'axios'

interface RoomCardProps {
  room: {
    _id: string,
    title: string,
    pricePerMonth: string,
    roomCategory: string,
    tenants: string
  }
}

const RoomCard: React.FC<RoomCardProps> = ({ room }) => {

  const [showAction, setShowAction] = useState(false)

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

      </div>
      {/* right - detail  */}
      <div className={styles.roomCard__detailsContainer}>
        <BsThreeDots onClick={onClickHandler} style={{ position: "absolute", right: 2, top: 1, cursor: "pointer" }} />

        {showAction && (
          <div className={styles.roomCard__actionModal} style={{top: 20}}>
            <button>Edit</button>
            <button onClick={() => deleteHandler(room._id)}>Delete</button>
          </div>
        )}

        <div style={{marginTop: '0.9rem'}}>
          <Link href={`/rooms/list/${room._id}`}>{room.title}</Link>
          <p>{room.pricePerMonth}</p>
        </div>
      </div>
    </div>
  )
}

export default RoomCard