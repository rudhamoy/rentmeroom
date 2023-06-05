import { NextResponse } from "next/server";
import { ownerRooms } from "../../../../services/controllers/roomControllers";

export async function POST(request: Request) {
  const body = await request.json()

    // '647a3ca14f4d5cdf19231819'
  const allOwnerRooms = await ownerRooms(body._id)
  return NextResponse.json(allOwnerRooms)
}