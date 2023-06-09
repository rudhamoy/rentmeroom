
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { getAllOwnerAddress } from "../../../../services/controllers/addressController";
import getCurrentUser from "@/actions/getCurrentUser";

export async function POST(request: Request) {
    const currentUser = await getCurrentUser()
    const allOwnerAddress = await getAllOwnerAddress(currentUser._id)
    return NextResponse.json(allOwnerAddress)
}