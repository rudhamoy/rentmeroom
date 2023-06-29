import { NextResponse } from "next/server";
import { Bookmark } from "../../../../services/models/bookmarkModel";
import getCurrentUser from "@/actions/getCurrentUser";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const currentUser = await getCurrentUser();
        
        const bookmarkExisted = await Bookmark.findOne({userID: currentUser._id, roomID: body.roomID})

        if(bookmarkExisted) {
            return NextResponse.json({"exist": true})
        }
        
        return NextResponse.json({"exist": false})
        
    } catch (error) {
        console.log(error)
    }
  
}