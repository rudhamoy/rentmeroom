
import CreateRoom from '@/components/rooms/CreateRoom'
import styles from '../room.module.css'
import RoomCard from '@/components/rooms/RoomCard'

const getRoomsData = async () => {
  const res = await fetch('http://localhost:3000/api/rooms/owner')
  return res.json()
}

const RoomListPage = async () => {
  
  const data = await getRoomsData()
  const numberOfRooms = data?.getAllRooms.length || 0

  return (
    <div className={styles.roomlist__container}>
      <CreateRoom />
      <div className={styles.roomlist__lists}>
        <div>
          <div>
            {data ? data?.getAllRooms.map((room) => (
              <RoomCard key={room._id} room={room} />
            )) : (
              <p style={{ textAlign: "center", color: "GrayText" }}>You don't have any room listed yet</p>
            )}

            {Math.floor((numberOfRooms % 2)) !== 0 && (
              <div style={{ height: "12.5rem", width: "32rem", padding: "0.2rem" }}></div>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}

export default RoomListPage