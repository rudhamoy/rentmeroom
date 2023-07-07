'use client'
import axios from 'axios'
import { useState } from 'react'
import styles from './booking.module.css'

interface CreateBookingProps {
    room: any,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateBooking:React.FC<CreateBookingProps> = ({setShowModal, room}) => {

    const [ visitTime, setVisitTime ] = useState("")
    const [ date, setDate ] = useState("")

    const bookingHandler = async () => {
        const res = await axios.post('/api/booking', {roomID: room._id})
        console.log(res.data)
    }

    const createVisit = async () => {
        const res = await axios.post('/api/visit', {roomID: room._id, date, visitTime})
        console.log(res.data)
    }

    return (
        <div style={{position: "relative", height: "100vh", width: "100vw"}}>
            <button style={{position: "absolute", right: "49%", top: 10, zIndex: "999", }} onClick={() => setShowModal(false)}>X</button>
            <div className={styles.createBooking__container}>
                <div className={styles.createBooking}>
                    <p>{room.title}</p>
                    <p style={{ marginTop: ".35rem" }}>₹ {room.pricePerMonth}</p>
                    <p style={{ marginTop: ".35rem" }}>{room?.address?.address}</p>
                    <button onClick={bookingHandler}>Confirm</button>
                </div>
                <div>
                    <input type="date" value={date} onChange={e => setDate(e.target.value)} />
                    <input type="time" value={visitTime} onChange={e => setVisitTime(e.target.value)} />
                    <button onClick={createVisit}>Visit</button>
                </div>
            </div>
        </div>
    )
}

export default CreateBooking