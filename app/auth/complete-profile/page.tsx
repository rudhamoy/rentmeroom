'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"
import Modal from "@/components/utils/Modal"
import styles from '../auth.module.css'
import CreateTenant from "@/components/tenants/CreateTenant"
import CreateOwner from "@/components/owner/CreateOwner"

const CompleteProfile = () => {
    const router = useRouter()

    const [userType, setUserType] = useState('')

    return (
        <Modal bgColor="lightgrey">
            <div className={styles.completeProfile__container}>
                <h1 style={{ textAlign: "center", fontSize: "1.8rem" }}>Complete your profile</h1>

                <div className={styles.tenantType}>
                    {
                        userType !== ''
                            ? (userType === 'tenant'
                                ?
                                <CreateTenant />
                                :
                                <CreateOwner />
                            ) : (
                                <>
                                    <button onClick={() => setUserType("owner")}>I want to list my property</button>
                                    <button onClick={() => setUserType("tenant")}>I want to search rent house</button>
                                </>
                            )}
                </div>

                <button
                    onClick={() => router.push('/')}
                    style={{
                        background: "black",
                        color: "white",
                        padding: ".4rem 1.2rem",
                        border: "none",
                        cursor: "pointer",
                        borderRadius: ".2rem"
                    }}
                >skip</button>
            </div>
        </Modal>
    )
}

export default CompleteProfile