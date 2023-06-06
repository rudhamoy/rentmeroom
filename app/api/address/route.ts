
import { NextResponse } from "next/server"
import { createAddress } from "../../../services/models/addressModel"


export async function POST(request: Request) {
    const body = await request.json()
    const address = await createAddress({...body})
    return NextResponse.json({ address })
}