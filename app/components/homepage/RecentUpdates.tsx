"use client"
import { useState, useEffect } from 'react'
import axios from 'axios'
import RoomCard from '../rooms/RoomCard'
import styles from './home.module.css'
import FilterButton from './FilterButton';

const RecentUpdates = () => {
    const [switchView, setSwitchView] = useState('listView');
    const [newRooms, setNewRooms ] = useState([])

    // fetch room list
    async function getNewRooms() {
        const res = await axios.get('/api/rooms')
        setNewRooms(res.data.rooms)
        console.log(res.data)
    }

    useEffect(() => {
        getNewRooms()
    }, [])

    const length = 12;
    const myArray = Array.from({ length }, (_, index) => index + 1);

    return (
        <>
            <FilterButton setSwitchView={setSwitchView} switchView={switchView} />
            <div 
            className={styles.recentUpdates__container}
            style={{flexDirection: `${switchView !== 'listView' ? "column" : "row"}`}}
            >
                {newRooms.map((room, index) => (
                    <RoomCard key={index} room={room} />
                ))}
            </div>
            <div className={styles.recentUpdates__loadMore}>
                <button>Load More</button>
            </div>
        </>
    )
}

export default RecentUpdates