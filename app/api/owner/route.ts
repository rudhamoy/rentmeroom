
import { NextResponse } from "next/server"
import { ownerModel } from "../../../services/models/ownerModel"
import clientPromise from "../../../lib/mongo/mongoDB"


export async function POST(request: Request) {
    const body = await request.json()
    const ownerDetails = await ownerModel.find({userId: body.id})
    return NextResponse.json({
        ownerDetails
    })
}

export async function PUT(request: Request) {
    // const currentUser: any = await getCurrentUser();
    try {
        let body = await request.json();
        
        let client = await clientPromise
        const db = await client.db()
        const updatedUser = await db.collection('users').updateOne(
          { email: body.email }, 
          {
          $set: {
            firstName: body.firstName,
            lastName: body.lastName,
            mobile: body.mobile,
            role: body.role
          }
        })

        return NextResponse.json(updatedUser)

    } catch (error: any) {
        return null
    }
}