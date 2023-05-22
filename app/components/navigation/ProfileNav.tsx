'use client'
import React, { useState, useRef } from 'react'
import styles from './navigation.module.css'
import Image from 'next/image'
import ModalPortal from '../utils/ModalPortal'
import { useOutsideClick } from '../utils/hooks/useOutsideClick'

interface ProfileNavProps {
  image: string,
  name: string,
  email: string,
}

const ProfileNav: React.FC<ProfileNavProps> = ({ image, name, email }) => {
  const [showModal, setShowModal] = useState(false)

  const ref = useOutsideClick(() => setShowModal(false))

  return (
    <div className={styles.profileNav__Container}>
      <Image src={image} alt={name} width={30} height={30} className={styles.profileNav__image} onClick={() => setShowModal(!showModal)} />
      <div style={{ position: "relative" }} ref={ref}>
        {showModal && (
          <ModalPortal>
            <p>{email}</p>
            <p>{name}</p>
            <p>My Profile</p>
            <button>Logout</button>
          </ModalPortal>
        )}
      </div>
    </div>
  )
}

export default ProfileNav