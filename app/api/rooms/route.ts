import getCurrentUser from "@/actions/getCurrentUser"
import { NextResponse } from "next/server"
import { createRoom, getAllRooms } from "../../../services/controllers/roomControllers"
import { roomModel } from "../../../services/models/roomModel"
import { addressModel } from "../../../services/models/addressModel"

export async function POST(request: Request) {

    const currentUser = await getCurrentUser()

    const body = await request.json()
    let userId = currentUser._id
    body.userId = userId.toString()
    const room = await createRoom({ ...body })
    return NextResponse.json(room)
}


export async function GET() {
    
    const allRooms = await roomModel.find().exec();
    const populatedAddress = [];

    for (const room of allRooms) {
      const address = await addressModel.findById(room.address).exec();
      const roomWithAddress = {
        ...room.toObject(),
        address: address
      };
      populatedAddress.push(roomWithAddress);
    }

    return NextResponse.json(populatedAddress);
    
}
