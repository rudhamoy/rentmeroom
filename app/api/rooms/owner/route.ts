import { NextResponse } from "next/server";
import { ownerRooms } from "../../../../services/controllers/roomControllers";

export async function POST(request: Request) {
  const body = await request.json()
  const allOwnerRooms = await ownerRooms(body._id)
  return NextResponse.json(allOwnerRooms)
}