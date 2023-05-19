import { data } from '@/assets/customData'
import RoomCard from '../rooms/RoomCard'
import styles from './home.module.css'

const RecentUpdates = () => {
    const length = 12;
    const myArray = Array.from({ length }, (_, index) => index + 1);
    return (
        <>
            <div className={styles.recentUpdates__container}>
                {myArray.splice(0, 4).map((i, index) => (
                    <RoomCard key={index} />
                ))}
            </div>
            <div className={styles.recentUpdates__loadMore}>
                <button>Load More</button>
            </div>
        </>
    )
}

export default RecentUpdates