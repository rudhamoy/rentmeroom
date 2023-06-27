'use client'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'
import RoomCard from '../rooms/RoomCard'

interface OwnerProfileProps {
    userId: string
}

const OwnerProfile: React.FC<OwnerProfileProps> = ({ userId }) => {

    const [rooms, setRooms] = useState([])

    const getOwnerRoomsList = async () => {
        const res = await axios.post('/api/rooms/owner', { id: userId })
        setRooms(res.data)
        return res.data
    }

    useEffect(() => {
        getOwnerRoomsList()
    }, [])

    return (
        <div>
            <div style={{display: "flex", justifyContent: "space-between", marginBottom: "2rem"}}>
                <p>Your room list</p>
                <Link href="/rooms/list">Create Room</Link>
            </div>
            <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 15}}>
                {rooms.map(room => (
                    <RoomCard key={room._id} room={room} />
                ))}
            </div>
        </div>
    )
}

export default OwnerProfile