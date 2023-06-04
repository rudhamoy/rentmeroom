import { NextResponse } from "next/server";
import { deleteRoom, roomDetails } from "../../../../services/controllers/roomControllers";

export async function GET(request: Request, {params} : {params: { roomId: string}}) {

    const {roomId} = params

    const room = await roomDetails(roomId)

    return NextResponse.json(room)
}

export async function DELETE(request: Request, { params } : { params : { roomId : string}}) {
    const { roomId } = params
    const deletedRoom = await deleteRoom(roomId)
     return NextResponse.json({
        deletedRoom
     })
}