'use client'
import { useState, useEffect } from 'react'
import axios from 'axios'

import styles from './rooms.module.css'
import ToggleButton from './ToggleButton';
import ImageInput, { uploadPhotos } from './ImageInput';

interface CreateRoomFormProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
}

const CreateRoomForm: React.FC<CreateRoomFormProps> = ({ setShowModal }) => {

  const [images, setImages] = useState();

  const [title, setTitle] = useState("")
  const [price, setPrice] = useState<number>(0)
  const [description, setDescription] = useState("Some description here")
  const [roomCategory, setRoomCategory] = useState('1RK')
  const [tenants, setTenants] = useState('All')
  const [floor, setFloor] = useState('Ground Floor');

  const [bathroom, setBathroom] = useState(false)
  const [electricBill, setElectricBill] = useState(false);
  const [balcony, setBalcony] = useState(false)
  const [parking, setParking] = useState(false)
  const [waterSupply, setWaterSupply] = useState(false);
  const [furnish, setFurnish] = useState('Unfurnished')
  const [address, setAddress] = useState('')

  const [addressList, setAddressList] = useState([])

  const [loading, setLoading] = useState(false)
  const [steps, setSteps] = useState(1)

  async function getOwnerAddress() {
    const res = await axios.post('/api/address/owner')
    setAddressList(res.data)
    return res.data
  }

  useEffect(() => {
    getOwnerAddress()
  }, [])

  console.log(addressList)

  const postContent = {
    title,
    pricePerMonth: price,
    description,
    address,
    roomCategory,
    tenants,
    floor,
    bathroomType: bathroom === false ? "Shared" : "Attached",
    electricBill,
    balcony,
    parking,
    waterSupply,
    furnish,
    images
  }

  const submitHandler = async () => {
    let allImageUrl = await uploadPhotos()
    postContent.images = allImageUrl;
    axios.post('/api/rooms', postContent)
  }

  function updateStepsHandler() {
    if (steps < 3) {
      setSteps(() => steps + 1)
    }
  }

  function prevStepsHandler() {
    if (steps > 1) {
      setSteps(() => steps - 1)
    }
  }

  return (
    <div className={styles.createRoomForm__container}>

      {/* Steps indicator */}


      {/* STEP ONE - ROOM DETAILS */}
      {steps === 1 && (
        <div className={styles.creatRoomForm__stepOne}>
          <input placeholder='Title' onChange={e => setTitle(e.target.value)} />
          <input placeholder='Price' type='number' onChange={e => setPrice(e.target.value)} />
          <textarea cols={50} rows={5}></textarea>
          <select onChange={e => setRoomCategory(e.target.value)}>
            {["1R", "1RK", "1BHK", "2R", "2RK", "2BHK", "3BHK"].map(room => (
              <option key={room} value={room}>{room}</option>
            ))}
          </select>
          <select onChange={e => setTenants(e.target.value)}>
            {["All", "Students", "Family", "Girls", "Boys", "Bachelor"].map(tenant => (
              <option key={tenant} value={tenant}>{tenant}</option>
            ))}
          </select>
          <select onChange={e => setFloor(e.target.value)} defaultValue="Ground Floor">
            {['Ground Floor', 'First Floor', 'Second Floor', 'Third Floor', 'Fouth Floor', 'Fifth Floor'].map(floor => (
              <option key={floor} value={floor}>{floor}</option>
            ))}
          </select>
        </div>
      )}
      {/* STEP TWO - ROOM UTILITY */}
      {steps === 2 && (
        <div>
          <ToggleButton placeholder="Bathroom type" setter={setBathroom} value={bathroom} switchATitle="Shared" switchBTitle="Attached" />
          <ToggleButton placeholder="Electric bill" setter={setElectricBill} value={electricBill} switchATitle="Self" switchBTitle="Owner" />
          <ToggleButton placeholder="Balcony" setter={setBalcony} value={balcony} switchATitle="No" switchBTitle="Yes" />
          <ToggleButton placeholder="Parking" setter={setParking} value={parking} switchATitle="No" switchBTitle="Yes" />
          <ToggleButton placeholder="Water System" setter={setWaterSupply} value={waterSupply} switchATitle="Water Tank" switchBTitle="Water Supply" />
          <select onChange={e => setFurnish(e.target.value)}>
          {['Unfurnished', 'Semi-furnished', 'Furnished'].map(item => (
            <option key={item} value={item}>{item}</option>
          ))}
          </select>
        </div>
      )}
      {/* STEP THREE - UPLOAD IMAGE */}
      {steps === 3 && (
        <div>
          <select onChange={(e) => setAddress(e.target.value)}>
            {addressList.map((place) => (
              <>
              <option value="select">Select address</option>
              <option key={place?._id} value={place?._id}>{place?.address}</option>
              </>
            ))}
          </select>
          <ImageInput />
        </div>
      )}
      <div className={styles.createRoomForm__buttons}>
        <button onClick={() => setShowModal(false)}>Cancel</button>
        <div>
          <button onClick={prevStepsHandler}>Prev</button>
          <button onClick={steps === 3 ? submitHandler : updateStepsHandler}>{steps === 3 ? "Submit" : "Next"}</button>
        </div>
      </div>
    </div>
  )
}

export default CreateRoomForm