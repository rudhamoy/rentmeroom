'use client'
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { HiPencil } from 'react-icons/hi'
import ToggleButton from './ToggleButton';
import axios from 'axios'

interface RoomDetailProps {
  data: {
    _id: string,
    title: string;
    pricePerMonth: number;
    roomCategory: string;
    furnish: string;
    tenants: string;
    floor: string;
    bathroomType: string;
    electricBill: boolean;
    parking: boolean;
    userId: string
  },
  userId: string
}

const RoomDetail: React.FC<RoomDetailProps> = ({ data, userId }) => {
  const [editable, setEditable] = useState(false)
  const [showEdit, setShowEdit] = useState(true)
  const [title, setTitle] = useState("")
  const [roomCategory, setRoomCategory] = useState('')
  const [parking, setParking] = useState(false)


  useEffect(() => {
    if (userId === data.userId) {
      setEditable(true)
    }
    setTitle(data.title)
    setRoomCategory(data.roomCategory)
    setParking(data.parking)
  }, [])

  const updateHandler = async () => {
    let roomId = data?._id
    await axios.put(`/api/rooms/${roomId}`, {title, roomCategory, parking})
  }

  return (
    <>
      <input 
      value={title} 
      disabled={showEdit} 
      onChange={(e) => setTitle(e.target.value)} 
      style={{
        border: 'none', 
        borderBottom: `${showEdit === false ? ".1px solid grey" : "none"}`
      }}
      />
      <input value={data?.pricePerMonth} />

      <div>
        <p>Room:</p>
        <select
        disabled={showEdit}
        value={roomCategory} 
        defaultValue={roomCategory} 
        onChange={e => setRoomCategory(e.target.value)}
        style={{
          border: 'none', 
          borderBottom: `${showEdit === false ? ".1px solid grey" : "none"}`,
          appearance: `${showEdit === false ? "auto" : "none"}`,
        }}
        >
            {["1R", "1RK", "1BHK", "2R", "2RK", "2BHK", "3BHK"].map(room => (
              <option key={room} value={room}>{room}</option>
            ))}
          </select>
        <p>Furnish: <span>{data?.furnish}</span></p>
        <p>Room for: <span>{data?.tenants}</span></p>
        <p>Floor: <span>{data?.floor}</span></p>
        <p>Bathroom/Washroom: <span>{data?.bathroomType}</span></p>
        <p>Electric Bill Payment by: <span>{data?.electricBill === true ? "Self" : "Owner"}</span></p>
        <p>Parking available: <span>{parking === true ? "Yes" : "N/A"}</span></p>
        {showEdit === false && (

        <ToggleButton placeholder="" setter={setParking} value={parking} switchATitle="No" switchBTitle="Yes" />
        )}
      </div>

      <button>Add to Bookmark</button>

      {editable && createPortal(
        <div 
        style={{
          position: "fixed",
          bottom: 15,
          left: 0,
          right: 0,
          // backgroundColor: "green",
          display: "flex",
          justifyContent: "center"
        }}>
          {showEdit === false ? (
            <div>
              <button onClick={() => setShowEdit(true)}>Cancel</button>
              <button onClick={updateHandler}>Update</button>
            </div>
          ): (
            <button onClick={() => setShowEdit(false)}>Edit</button>
          )}
        </div>,
        document.body
      )}
    </>
  )
}

export default RoomDetail