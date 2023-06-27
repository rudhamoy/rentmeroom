
import axios from 'axios'
import RoomCard from '../rooms/RoomCard'
import styles from './home.module.css'
import FilterButton from '../filter/FilterButton';
import Link from 'next/link';

async function getRooms() {
    const res = await axios.get('http://localhost:3000/api/rooms')
    return res.data
}

const RecentUpdates = async () => {
    const newRooms = await getRooms()

    const numberOfRooms = newRooms?.length || 0

    return (
        <>
            <FilterButton />
            <div className={styles.recentUpdates__title}>
                <hr style={{ width: "5%" }} />
                <p>New rooms</p>
                <hr />
            </div>
            <div
                className={styles.recentUpdates__container}
            >
                {newRooms.rooms.map((room, index) => (
                    <RoomCard key={index} room={room} />
                ))}

                {/* 
                  this add extra element when there's is ODD number of room listed but hides when EVEN number of room is listed 
                  REASON:- to align the last element to the left instead of positioning to  the center
                  */}
                {Math.floor((numberOfRooms % 2)) !== 0 && (
                    <div style={{ height: "12.5rem", width: "32rem", padding: "0.2rem" }}></div>
                )}
            </div>
            <div className={styles.recentUpdates__loadMore}>
                <Link href="/search" className={styles.recentUpdates__loadMoreButton}>View More</Link>
            </div>
        </>
    )
}

export default RecentUpdates