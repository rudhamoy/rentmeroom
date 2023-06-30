import { NextResponse } from "next/server";
import { Bookmark } from "../../../../services/models/bookmarkModel";
import getCurrentUser from "@/actions/getCurrentUser";
import { ObjectId } from "mongodb";


export async function POST(request: Request) {
  const currentUser = await getCurrentUser()
  const bookmarkList = await Bookmark.find({userID: new ObjectId(currentUser._id)})
  return NextResponse.json(bookmarkList)
}