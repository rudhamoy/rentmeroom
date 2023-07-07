
import Link from 'next/link'
import styles from './profile.module.css'
import getCurrentUser from '@/actions/getCurrentUser'
import OwnerProfile from '@/components/profile/OwnerProfile'
import TenantProfile from '@/components/profile/TenantProfile'

const ProfilePage = async () => {
    const currentUser = await getCurrentUser()

    /**
     * check if user is owner or tenant
     * if tenant --> UIContent = <TenantProfile /> else UIContent = <OwnerProfile />
     * this will render in ui depending on the type of user
     */
    let UIContent
    if (currentUser?.role === "owner") {
        UIContent = <OwnerProfile userId={currentUser?._id} />
    } else {
        UIContent = <TenantProfile />
    }

    return (
        <div className={styles.profile__container}>
            {/* profile */}
            <div>
                <img src={currentUser?.image} alt={currentUser?.name} className={styles.profile__image} />
                {currentUser ? (
                    <div>
                        <p style={{ marginTop: ".6rem", fontWeight: "bold" }} >{currentUser?.firstName} {currentUser?.lastName}</p>
                    </div>
                ) : (

                    <p style={{ marginTop: ".6rem" }}>{currentUser?.name}</p>
                )}
                <p style={{ marginTop: ".6rem" }}>Email: {currentUser?.email}</p>
                <p style={{ marginTop: ".6rem" }}>Mobile: {currentUser?.mobile}</p>
                {/* {userType && (
                    <>
                        <p style={{ marginTop: ".6rem" }}>Mobile: {userType?.mobile}</p>
                        <p style={{ marginTop: ".6rem" }}>Address: {userType?.address[0]?.address}</p>
                        <p style={{ marginTop: ".6rem" }}>PinCode: {userType?.address[0]?.pincode}</p>
                    </>
                )} */}
            </div>

            <hr />

            {/* aCtivities */}
            {!currentUser?.hasOwnProperty('role') ? (
                <div>
                   <p>Complete your profile</p>
                </div>
            ) : (
                <div>
                    {UIContent}
                </div>
            )}
        </div>
    )
}

export default ProfilePage