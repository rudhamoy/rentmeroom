import getCurrentUser from "@/actions/getCurrentUser"
import { NextResponse } from "next/server"
import clientPromise from "../../../lib/mongo/mongoDB";

export async function POST(request:Request) {

    const currentUser = await getCurrentUser()

    const client = await clientPromise
    const db = await client.db()
    const rooms = await db.collection('rooms')

   const body = await request.json()
   body.userId = currentUser._id
   const room = await rooms.insertOne({...body})

   return NextResponse.json({ room })
}

