
import CreateRoom from '@/components/rooms/CreateRoom'
import styles from '../room.module.css'

const RoomListPage = () => {
  return (
    <div className={styles.roomlist__container}>
      <CreateRoom />
      <div className={styles.roomlist__lists}>
          <div>
            <p style={{textAlign: "center", color: "GrayText"}}>You don't have any room listed yet</p>
          </div>
      </div>
    </div>
  )
}

export default RoomListPage