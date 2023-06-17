import axios from 'axios'

const API_URL = 'http://localhost:3000/api'

export async function getRoomDetails(slug: string) {
    const res = await axios.get(`${API_URL}/rooms/${slug}`)
    return res.data
}

export const getOwnerRoomsList = async (id: string) => {
  const res = await axios.post('http://localhost:3000/api/rooms/owner', {id})
  return res.data
}

// export const getSearchRooms = () => {

// }