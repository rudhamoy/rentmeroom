'use client'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'

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
            <div>
                <p>Your room list</p>
                <Link href="/rooms/list">Create Room</Link>
            </div>
            <div>
                {rooms.map(room => (
                    <div style={{display: "flex", gap: 10}}>
                        <img src={room?.images[0]} alt={room?.title} height={110} width={210} />
                        <div>
                            <p>{room?.title}</p>
                            <p>{room?.pricePerMonth}</p>
                            <p>{room?.roomCategory}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default OwnerProfile