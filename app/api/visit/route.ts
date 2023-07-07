import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import { visitModel } from "../../../services/models/visitModel";


// ------------ CREATE VISIT-----------------
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
        
        if(currentUser !== null && currentUser.role !== 'owner') {
            const response = await visitModel.create({ 
                userID: currentUser._id, 
                roomID: body.roomID, 
                date: body.date, 
                visitTime: body.visitTime 
            })
            return NextResponse.json({
                'message': "visit created",
                response
            });
        }
        
    } catch (error) {
        console.log(error)
    }
}