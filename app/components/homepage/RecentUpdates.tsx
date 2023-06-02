"use client"
import { useState } from 'react'
import { data } from '@/assets/customData'
import RoomCard from '../rooms/RoomCard'
import styles from './home.module.css'
import FilterButton from './FilterButton';

const RecentUpdates = () => {
    const [switchView, setSwitchView] = useState('listView')

    const length = 12;
    const myArray = Array.from({ length }, (_, index) => index + 1);

    return (
        <>
            <FilterButton setSwitchView={setSwitchView} switchView={switchView} />
            <div 
            className={styles.recentUpdates__container}
            style={{flexDirection: `${switchView !== 'listView' ? "column" : "row"}`}}
            >
                {/* {myArray.splice(0, 4).map((i, index) => (
                    <RoomCard key={index} />
                ))} */}
            </div>
            <div className={styles.recentUpdates__loadMore}>
                <button>Load More</button>
            </div>
        </>
    )
}

export default RecentUpdates