// 'use client'
import Link from 'next/link'
import styles from './navigation.module.css'
import { GiHamburgerMenu } from 'react-icons/gi'
import { MdFacebook } from 'react-icons/md'
import { BsInstagram } from 'react-icons/bs'
import { AiTwotoneHome } from 'react-icons/ai'
// import { useSession } from 'next-auth/react'
import ProfileMenu from './ProfileMenu'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/api/auth/[...nextauth]/route'


const Header = async () => {
  // const { data } = useSession()
  const session = await getServerSession(authOptions)
 
  return (
    <div className={styles.header__container}>
      <div>
        <GiHamburgerMenu style={{ cursor: "pointer" }} />
      </div>

      <div className={styles.header__middleContent}>
        <div>
          <AiTwotoneHome />
          <Link href="/" style={{ color: "black", textDecoration: "none" }}>Rentmeroom</Link>
        </div>
        <div>
          <MdFacebook style={{ fontSize: "1.5rem", marginRight: "10px" }} />
          <BsInstagram style={{ fontSize: "1.4rem", marginRight: "10px" }} />
        </div>
      </div>

        {session?.user ? (
          <div>
            <Link href="/rooms/list">Room list</Link>
            <ProfileMenu image={`${session?.user.image}`} name={`${session?.user.name}`} email={`${session?.user.email}`} />
          </div>
        ) : (
          <div>
            <button><Link href={'/auth/signin'} style={{ color: "black", textDecoration: "none" }} >Login</Link></button>
            <button>
              <Link href={'/auth/signup'} style={{ color: "white", textDecoration: "none" }} >Sing up</Link>
            </button>

          </div>
        )}

    </div>
  )
}

export default Header