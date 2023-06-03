import { NextResponse } from "next/server";
import { roomDetails } from "../../../../services/controllers/roomControllers";

export async function GET(request: Request, {params} : {params: { roomId: string}}) {

    const {roomId} = params

    const room = await roomDetails(roomId)

    return NextResponse.json(room)
}