
import Profile from '@/components/profile/Profile'
import styles from './profile.module.css'
import getCurrentUser from '@/actions/getCurrentUser'
import getUserWithType from '@/actions/userActions'

const ProfilePage = async () => {
    const currentUser = await getCurrentUser()
    const userId = currentUser._id.toString()
    
    const userType = await getUserWithType(userId)

  return (
    <div className={styles.profile__container}>
        <div>
            <img src={currentUser.image} alt={currentUser.name} />
            <p>Name: {currentUser.name}</p>
            <p>Email: {currentUser.email}</p>
        </div>
        <Profile />
    </div>
  )
}

export default ProfilePage