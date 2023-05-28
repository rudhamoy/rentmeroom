import { NextResponse } from "next/server"
import clientPromise from "../../../lib/mongo/mongoDB"

export async function GET() {
    const client = await clientPromise
    const db = await client.db()
    const users = db.collection('users')
    const allUser = await users.find()
    return NextResponse.json({
        allUser
    })
}