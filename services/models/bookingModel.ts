
import { Schema, Types } from "mongoose";
import conn from "../database_connection";


interface IBooking {
    userID: Types.ObjectId;
    roomID: Types.ObjectId;
}


const bookingSchema = new Schema<IBooking>({
    userID: { type: Schema.Types.ObjectId, required: true, ref: "users" },
    roomID: { type: Schema.Types.ObjectId, required: true, ref: "rooms" }
}, { timestamps: true });


export const BookingModel = conn.model<IBooking>('Booking', bookingSchema);