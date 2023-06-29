import { NextResponse } from "next/server";
import { Bookmark } from "../../../services/models/bookmarkModel";
import getCurrentUser from "@/actions/getCurrentUser";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const currentUser = await getCurrentUser();

        if(!currentUser) {
            return NextResponse.error();
        }

        if(!currentUser.hasOwnProperty('role')) {
            return NextResponse.error();
        }
        
        // check if room is already bookmarked
        // delete if existed
        const bookmarkExisted = await Bookmark.findOne({userID: currentUser._id, roomID: body.roomID})
        if(bookmarkExisted) {
            const response = await Bookmark.deleteOne({ _id: bookmarkExisted._id })
            return NextResponse.json({
                'message': "deleted",
                response
            });
        }
        
        // if room is not bookmark yet - create a new bookamrk
        if(currentUser !== null && currentUser.role !== 'owner') {
            const response = await Bookmark.create({ userID: currentUser._id, roomID: body.roomID })
            return NextResponse.json({
                'message': "created",
                response
            });
        }
        
        return  new Error('Only tenant can bookmark room')
    } catch (error) {
        console.log(error)
    }
  
}