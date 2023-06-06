import { NextResponse } from "next/server";
import { createBooking, getBooking } from "../../../services/controllers/bookingController";
import getCurrentUser from "@/actions/getCurrentUser";


export async function GET(request: Request) {
    const currentUser = await getCurrentUser();
    const bookings = await getBooking(currentUser._id);
    return new NextResponse(JSON.stringify(bookings));
}

export async function POST(request: Request) {
    const bodyData = await request.json();
    const currentUser = await getCurrentUser();
    bodyData.userID = currentUser._id;
    const res = await createBooking({ ...bodyData })
    return new NextResponse(JSON.stringify(res));
}