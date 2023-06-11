
import Image from 'next/image'
import styles from '../../room.module.css'
import { getRoomDetails } from '@/actions/roomActions'
import SingleRoomMap from '@/components/utils/maps/SingleRoomMap'

const RoomDetailPage = async ({ params }: { params: { roomId: string } }) => {

  const data = await getRoomDetails(params.roomId)

  return (
    <div className={styles.roomDetail__container}>
      {/* image */}
      <div>
        <Image src={data?.images[0]} alt={data?.title} width={700} height={400} />
      </div>

      {/* details */}
      <div className={styles.roomDetails__detailsContainer}>
        <p>{data?.title}</p>
        <p>{data?.pricePerMonth}</p>

        <div>
          <p>Room: <span>{data?.roomCategory}</span></p>
          <p>Furnish: <span>{data?.furnish}</span></p>
          <p>Room for: <span>{data?.tenants}</span></p>
          <p>Floor: <span>{data?.floor}</span></p>
          <p>Bathroom/Washroom: <span>{data?.bathroomType}</span></p>
          <p>Electric Bill Payment by: <span>{data?.electricBill === true ? "Self" : "Owner"}</span></p>
          <p>Parking available: <span>{data?.parking === true ? "Yes" : "N/A"}</span></p>
        </div>

        <button>Add to Bookmark</button>

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