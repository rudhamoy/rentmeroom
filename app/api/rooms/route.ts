import getCurrentUser from "@/actions/getCurrentUser"
import { NextResponse } from "next/server"
import { createRoom } from "../../../services/controllers/roomControllers"


export async function POST(request: Request) {

    const currentUser = await getCurrentUser()

    const body = await request.json()
    body.userId = currentUser._id
    const room = await createRoom({ ...body })

    return NextResponse.json({ room })
}

