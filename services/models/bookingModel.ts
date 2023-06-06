
import { Schema, Types } from "mongoose";
import conn from "../database_connection";


interface IBooking {
    userID: Types.ObjectId;
    roomID: Types.ObjectId;
}


const bookingSchema = new Schema<IBooking>({
    userID: { type: Schema.Types.ObjectId, required: true },
    roomID: { type: Schema.Types.ObjectId, required: true }
}, { timestamps: true });

bookingSchema.index({ userID: 1, roomID: 1 }, { unique: true });


export const BookingModel = conn.model<IBooking>('Booking', bookingSchema);