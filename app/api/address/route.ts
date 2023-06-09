
import { NextResponse } from "next/server"
import { createAddress } from "../../../services/controllers/addressController"
import getCurrentUser from "@/actions/getCurrentUser"

export async function POST(request: Request) {
    const currentUser = await getCurrentUser()

    const body = await request.json()
    body.userId = currentUser._id
    
    const address = await createAddress({...body})
    return NextResponse.json({ address })
}
