import { NextResponse } from "next/server"
import clientPromise from "../../../lib/mongo/mongoDB"
import getCurrentUser from "@/actions/getCurrentUser"

export async function GET(request:Request) {
    const currentUser = await getCurrentUser()

    console.log(currentUser._id)

    return NextResponse.json({currentUser})
}