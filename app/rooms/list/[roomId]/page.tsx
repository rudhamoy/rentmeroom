
import axios from 'axios'
import styles from '../../room.module.css'

async function getRoomDetails(slug: string) {
  const res = await axios.get(`http://localhost:3000/api/rooms/${slug}`)
  return res.data
}

const RoomDetailPage = async ({params} : {params: { roomId : string}}) => {

  const data = await getRoomDetails(params.roomId)
   
  return (
    <div className={styles.roomDetail__container}>
      <div></div>
      <div>
        <p>{data.title}</p>
        <p>{data.pricePerMonth}</p>
      </div>
    </div>
  )
}

export default RoomDetailPage