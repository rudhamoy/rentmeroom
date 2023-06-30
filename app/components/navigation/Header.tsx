
import Link from 'next/link'
import styles from './navigation.module.css'
import { GiHamburgerMenu } from 'react-icons/gi'
import { MdFacebook } from 'react-icons/md'
import { BsInstagram } from 'react-icons/bs'
import { AiTwotoneHome } from 'react-icons/ai'
import { RiNotificationLine } from 'react-icons/ri'
import ProfileMenu from './ProfileMenu'
import getCurrentUser from '@/actions/getCurrentUser'

const Header = async () => {
  const currentUser = await getCurrentUser()
  
  return (
    <div className={styles.header__container}>
      <div className={styles.header__leftContainer}>
        <GiHamburgerMenu style={{ cursor: "pointer" }} />
      </div>

      <div className={styles.header__middleContainer}>
        <div>
          <AiTwotoneHome />
          <Link href="/" style={{ color: "black", textDecoration: "none" }}>Rentmeroom</Link>
        </div>
        <div className={styles.header__middleMenu} >
          {/**
           * if user is owner - show list your prperty
           * if user is tenant - show book a rent
           * if user is not log in - show both
           */}
          {(currentUser?.role === "owner") ? (
            <Link href={'/rooms/list'} style={{ color: "black", textDecoration: "none", marginRight: "1rem" }} >List your property</Link>
          )
            :
            (currentUser?.role === "tenant") ? (
              <Link href={'/bookings'} style={{ color: "black", textDecoration: "none", marginRight: "1rem" }} >Book a rent</Link>
            )
              :
              (
                <>
                  <Link href={'/bookings'} style={{ color: "black", textDecoration: "none", marginRight: "1rem" }} >Book a rent</Link>
                  <Link href={'/rooms/list'} style={{ color: "black", textDecoration: "none", marginRight: "1rem" }} >List your property</Link>
                </>
              )
          }

          <MdFacebook style={{ fontSize: "1.5rem", marginRight: "10px" }} />
          <BsInstagram style={{ fontSize: "1.4rem", marginRight: "10px" }} />
        </div>
      </div>

      {currentUser ? (
        <div className={styles.header__rightContainer}>
          {/* <Link href="/rooms/list">Room list</Link> */}
          <RiNotificationLine style={{ fontSize: "1.7rem" }} />
          <ProfileMenu image={`${currentUser?.image}`} name={`${currentUser?.name}`} email={`${currentUser?.email}`} />
        </div>
      ) : (
        <div className={styles.header__rightContainer}>
          <Link href={'/auth/signin'} style={{ color: "black", textDecoration: "none" }} >Login</Link>
          <button>
            <Link href={'/auth/signup'} style={{ color: "white", textDecoration: "none" }} >Sing up</Link>
          </button>

        </div>
      )}

    </div>
  )
}

export default Header