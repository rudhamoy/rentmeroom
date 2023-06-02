import { NextResponse } from "next/server";
import clientPromise from "../../../../lib/mongo/mongoDB";
import getCurrentUser from "@/actions/getCurrentUser";
import { ObjectId } from "mongodb";

export async function GET() {
    const currentUser = await getCurrentUser()

    const client = await clientPromise
    const db = await client.db()

    const rooms = await db.collection('rooms')
    // new ObjectId('6470e0a2337255814f86d25a')
    const getOwnerRooms = await rooms.find({userId: currentUser._id}).toArray((error, documents) => {
        if (error) {
          console.error('Error retrieving documents:', error);
          return;
        }
              console.log('Retrieved documents:', documents);
      });

    return NextResponse.json(getOwnerRooms)
}