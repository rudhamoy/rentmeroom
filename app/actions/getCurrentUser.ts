import { authOptions } from "@/api/auth/[...nextauth]/route";
import clientPromise from '../../lib/mongo/mongoDB'
import { getServerSession } from "next-auth/next";

export default async function getCurrentUser() {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user?.email) {
            return null
        }
        let client = await clientPromise
        const db = await client.db()
        const users = db.collection('users')
        const currentUser = await users.findOne({ email: session.user.email });

        if (!currentUser) {
            return null
        }

        return currentUser
    } catch (error: any) {
        return null
    }
}