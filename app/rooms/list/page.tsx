
import CreateRoom from '@/components/rooms/CreateRoom'
import styles from '../room.module.css'
import RoomCard from '@/components/rooms/RoomCard'
import { getServerSession } from "next-auth/next";
import { redirect } from 'next/navigation';
import { authOptions } from '@/api/auth/[...nextauth]/route';
import getCurrentUser from '@/actions/getCurrentUser';
import axios from 'axios'
import CreateOwner from '@/components/owner/CreateOwner';

const getRoomsData = async (user) => {
  const res = await axios.post('http://localhost:3000/api/rooms/owner', user)
  return res.data
}

const checkExistOwner = async (id: string) => {
  const res = await axios.post('http://localhost:3000/api/owner', {id})
  return res.data
}

const RoomListPage = async () => {

  const currentUser = await getCurrentUser()
  const session = await getServerSession(authOptions)

  let owner
  let data
  if (!session?.user) {
    redirect('/')
  } else {
    owner = await checkExistOwner(currentUser._id)
    data = await getRoomsData(currentUser)
  }

  const numberOfRooms = data?.length || 0

  return (
    <>
      <div className={styles.roomlist__container}>
        {owner.ownerDetails.length < 1 ? <CreateOwner />
        : (
          <>
          <CreateRoom />
          <div className={styles.roomlist__lists}>
            <div>
              <div>
                {data ? data?.map((room) => (
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
          </>
        )}      
      </div>
    </>

  )
}

export default RoomListPage