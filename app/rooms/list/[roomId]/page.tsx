
import Image from 'next/image'
import styles from '../../room.module.css'
import { getRoomDetails } from '@/actions/roomActions'
import SingleRoomMap from '@/components/utils/maps/SingleRoomMap'
import getCurrentUser from '@/actions/getCurrentUser'
import RoomDetail from '@/components/rooms/RoomDetail'

const RoomDetailPage = async ({ params }: { params: { roomId: string } }) => {
  const currentUser = await getCurrentUser()
  const userId = currentUser._id.toString()

  const data = await getRoomDetails(params.roomId)

  return (
    <div className={styles.roomDetail__container}>
      {/* image */}
      <div>
        <Image src={data?.images[0]} alt={data?.title} width={700} height={400} />
      </div>

      {/* details */}
      <div className={styles.roomDetails__detailsContainer}>
        <RoomDetail data={data} userId={userId} />
        <div style={{border: ".1px solid gray", height: "300px", width: "100%"}}>
         <SingleRoomMap 
         longitude={data?.address?.coordinates?.long} 
         latitude={data?.address?.coordinates?.lat} 
         />
        </div>
      </div>
    </div>
  )
}

export default RoomDetailPage