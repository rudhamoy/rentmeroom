
import axios from 'axios'

async function getRoomDetails(slug: string) {
  const res = await axios.get(`http://localhost:3000/api/rooms/${slug}`)
  return res.data
}

const RoomDetailPage = async ({params} : {params: { roomId : string}}) => {

  const data = await getRoomDetails(params.roomId)
  console.log(data)
   
  return (
    <div>RoomDetailPage</div>
  )
}

export default RoomDetailPage