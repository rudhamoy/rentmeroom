
import { BookingModel } from '../models/bookingModel';


export async function createBooking(data: any) {
    const response = await BookingModel.create({ userID: data.userID, roomID: data.roomID })
    return response;
}

