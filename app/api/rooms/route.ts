import getCurrentUser from "@/actions/getCurrentUser"
import { NextResponse } from "next/server"
import { createRoom } from "../../../services/controllers/roomControllers"
import { roomModel } from "../../../services/models/roomModel"
import { addressModel } from "../../../services/models/addressModel"

// create room
export async function POST(request: Request) {
    const currentUser = await getCurrentUser()

    const body = await request.json()
    let userId = currentUser._id
    body.userId = userId.toString() //conver ObjectId to plain string - 

    const room = await createRoom({ ...body })
    return NextResponse.json(room)
}

// get all rooms --- specially to get the list of new room
export async function GET() {
    
    const allRooms = await roomModel.find().exec();

    /**
     * get all rooms via room model and populate address data
     * to make it easy to show address
     */
    const populatedAddress = [];

    for (const room of allRooms) { //populate address data on every room via iterating over every room
      const address = await addressModel.findById(room.address).exec();
      const roomWithAddress = {
        ...room.toObject(), // to change the mongoose documents to an object otherwise use the commented one
        // ...room._doc,
        address: address
      };
      populatedAddress.push(roomWithAddress);
    }

    return NextResponse.json(populatedAddress);
    
}
