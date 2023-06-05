import { NextResponse } from "next/server";
import { createOwner } from "../../../../services/models/ownerModel";
import getCurrentUser from "@/actions/getCurrentUser"


export async function POST(request: Request) {

    const currentUser = await getCurrentUser()

    const body = await request.json()
    body.userId = currentUser._id
    const owner = await createOwner({ ...body })

    return NextResponse.json({ owner })
}