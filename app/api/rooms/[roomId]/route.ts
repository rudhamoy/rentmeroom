import { NextResponse } from "next/server";
import { deleteRoom, roomDetails, updateRoom } from "../../../../services/controllers/roomControllers";

export async function GET(request: Request, {params} : {params: { roomId: string}}) {

    const {roomId} = params

    const room = await roomDetails(roomId)

    return NextResponse.json(room)
}

export async function PUT(request: Request, {params} : {params: { roomId: string}}) {
    const body = await request.json()
    const room = await updateRoom(params.roomId, body)
    return NextResponse.json(room)
  }

export async function DELETE(request: Request, { params } : { params : { roomId : string}}) {
    const { roomId } = params
    const deletedRoom = await deleteRoom(roomId)
     return NextResponse.json({
        deletedRoom
     })
}