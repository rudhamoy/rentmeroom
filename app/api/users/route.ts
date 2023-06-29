import { authOptions } from "@/api/auth/[...nextauth]/route";
import clientPromise from '../../../lib/mongo/mongoDB'
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

export async function GET() {
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

        return NextResponse.json(currentUser)
    } catch (error: any) {
        return null
    }
}