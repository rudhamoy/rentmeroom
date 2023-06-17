"use client"
import { useState, useEffect } from 'react'
import axios from 'axios'
import RoomCard from '../rooms/RoomCard'
import styles from './home.module.css'
import FilterButton from '../filter/FilterButton';

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

    const numberOfRooms = newRooms?.length || 0

    return (
        <>
            <FilterButton />
            <div className={styles.recentUpdates__title}>
                <hr style={{width: "5%"}} />
                <p>New rooms</p>
                <hr />
            </div>
            <div 
            className={styles.recentUpdates__container}
            >
                {newRooms.map((room, index) => (
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
                <button>Load More</button>
            </div>
        </>
    )
}

export default RecentUpdates