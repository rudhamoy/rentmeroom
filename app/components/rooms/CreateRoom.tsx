'use client'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import { MdAdd } from 'react-icons/md'
import styles from './rooms.module.css'
import Modal from '../utils/Modal'
import CreateRoomForm from './CreateRoomForm'

const CreateRoom = () => {
    const [showModal, setShowModal] = useState(false)
    
    return (
        <>
            <div className={styles.createRoom__container}>
                <div>
                    <p>Start listing your home with us</p>
                    <button onClick={() => setShowModal(true)} style={{cursor: "pointer" }}><MdAdd style={{ color: "white"}} /> Create Room</button>
                </div>
            </div>
            {showModal === true && createPortal(
                <Modal>
                    <CreateRoomForm setShowModal={setShowModal} />
                </Modal>,
                document.body
            )}
        </>
    )
}

export default CreateRoom