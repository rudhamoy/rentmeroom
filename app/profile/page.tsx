
import Link from 'next/link'
import styles from './profile.module.css'
import getCurrentUser from '@/actions/getCurrentUser'
import getUserWithType from '@/actions/userActions'
import OwnerProfile from '@/components/profile/OwnerProfile'
import TenantProfile from '@/components/profile/TenantProfile'

const ProfilePage = async () => {
    const currentUser = await getCurrentUser()
    const userId = currentUser._id.toString()
    
    const userType = await getUserWithType(userId);

    /**
     * check if user is owner or tenant
     * if tenant UIContent = <TenantProfile /> else UIContent = <OwnerProfile />
     * this is will render in ui depending on the type of user
     */
    let UIContent
    if(userType?.role === "owner") {
        UIContent = <OwnerProfile userId={userId} />
    } else {
        UIContent = <TenantProfile />
    }

  return (
    <div className={styles.profile__container}>
        <div>
            <img src={currentUser.image} alt={currentUser.name} />
            <p>Name: {currentUser.name}</p>
            <p>Email: {currentUser.email}</p>
            {userType && (
                <>
                <p>Mobile: {userType.mobile}</p>
                <p>Address: {userType.address[0].address}</p>
                <p>PinCode: {userType.address[0].pincode}</p>
                </>
            )}
        </div>
        <hr />
        {userType === null ? (
             <div>
             <Link href="/rooms/list">List your property</Link>
             <button>Search rent house</button>
         </div>
        ): (
            <div>
                {UIContent}
            </div>
        )} 
    </div>
  )
}

export default ProfilePage