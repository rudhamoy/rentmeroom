
import { BookingModel } from '../models/bookingModel';


export async function createBooking(data: any) {
    const response = await BookingModel.create({ userID: data.userID, roomID: data.roomID })
    return response;
}

export async function getBooking(data: any) {
    const response = await BookingModel.find({ userID: data })
    return response
}
