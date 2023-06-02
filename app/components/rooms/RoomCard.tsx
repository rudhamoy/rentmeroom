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
          <p>{room.title}</p>
          <p>{room.pricePerMonth}</p>
        </div>
    </div>
  )
}

export default RoomCard