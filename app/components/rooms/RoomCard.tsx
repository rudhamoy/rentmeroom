
import Link from 'next/link'
import styles from './rooms.module.css'
import Image from 'next/image';

interface RoomCardProps {
  room: {
    _id: string,
    title: string,
    pricePerMonth: string,
    roomCategory: string,
    tenants: string
  }
}

const RoomCard: React.FC<RoomCardProps> = ({room}) => {
  return (
    <div className={styles.roomCard__container}>
        {/* left - Image  */}
        <div className={styles.roomCard__imageContainer}>

        </div>
        {/* right - detail  */}
        <div className={styles.roomCard__detailsContainer}>
          <Link href={`/rooms/list/${room._id}`}>{room.title}</Link>
          <p>{room.pricePerMonth}</p>
        </div>
    </div>
  )
}

export default RoomCard