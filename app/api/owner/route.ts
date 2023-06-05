
import { NextResponse } from "next/server"
import { ownerModel } from "../../../services/models/ownerModel"
import { ObjectId } from "mongodb"


export async function POST(request: Request) {

    const body = await request.json()
    const ownerDetails = await ownerModel.find({userId: new ObjectId(body.id)})

    return NextResponse.json({
        ownerDetails
    })
}