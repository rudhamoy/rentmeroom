
import { NextResponse } from "next/server"
import { createAddress } from "../../../services/controllers/addressController"
import getCurrentUser from "@/actions/getCurrentUser"
import clientPromise from "../../../lib/mongo/mongoDB"

export async function POST(request: Request) {
    const currentUser = await getCurrentUser()

    const body = await request.json()
    body.userId = currentUser._id
    
    const address = await createAddress({...body})
    return NextResponse.json({ address })
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);

        const address = searchParams.get("locality")

        const agg = [
            {
                $search: {
                  index: "search-address",
                  autocomplete: {
                    query: address,
                    path: "address",
                    tokenOrder: "sequential",
                    fuzzy: {
                        maxEdits: 2,
                    }
                  }
                }
              },
            {
                $project: {
                    "_id": 0,
                    "address": 1,
                }
            }
        ]

        let client = await clientPromise
        const addresses = await client.db("rentmeroom").collection('addresses').aggregate(agg).toArray()

        return NextResponse.json({
            addresses
        })

    } catch (error) {
        console.log(error)
    }
}
