'use client'
import React, { useState, useRef } from 'react'
import styles from './navigation.module.css'
import Image from 'next/image'
import ModalPortal from '../utils/ModalPortal'
import { useOutsideClick } from '../utils/hooks/useOutsideClick'
import { signOut } from 'next-auth/react'

interface ProfileNavProps {
  image: string,
  name: string,
  email: string,
}

const ProfileMenu: React.FC<ProfileNavProps> = ({ image, name, email }) => {
  const [showModal, setShowModal] = useState(false)

  const ref = useOutsideClick(() => setShowModal(false)) // hooks to close modal when click outside of modal box

  return (
    <div className={styles.profileNav__Container}>
      <Image src={image} alt={name} width={30} height={30} className={styles.profileNav__image} onClick={() => setShowModal(!showModal)} />
      <div style={{ position: "relative" }} ref={ref}>
        {showModal && (
          <ModalPortal>
            <p>{email}</p>
            <p>{name}</p>
            <p>My Profile</p>
            <button onClick={() => signOut()}>Logout</button>
          </ModalPortal>
        )}
      </div>
    </div>
  )
}

export default ProfileMenu