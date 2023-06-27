
import CreateRoom from '@/components/rooms/CreateRoom'
import styles from '../room.module.css'
import RoomCard from '@/components/rooms/RoomCard'
import { redirect } from 'next/navigation';
import getCurrentUser from '@/actions/getCurrentUser';
import CreateOwner from '@/components/owner/CreateOwner';
import { getOwnerRoomsList } from '@/actions/roomActions';
import { checkExistOwner } from '@/actions/userActions';


const RoomListPage = async () => {

  const currentUser = await getCurrentUser()
  let userObjectId = currentUser?._id
  const userId = userObjectId?.toString()  //convert mongoose object to string

  let owner
  let data
  if (!currentUser) { //check if user logged in - else redirect to login page
    redirect('/auth/signup')
  } else {
    owner = await checkExistOwner(userId)
    data = await getOwnerRoomsList(userId)
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
    
                  {/* 
                  this add extra element when there's is ODD number of room listed but hides when EVEN number of room is listed 
                  REASON:- to align the last element to the left instead of positioning to  the center
                  */}
                {/* {Math.floor((numberOfRooms % 2)) !== 0 && (
                  <div style={{ height: "12.5rem", width: "32rem", padding: "0.2rem" }}></div>
                )}
     */}
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