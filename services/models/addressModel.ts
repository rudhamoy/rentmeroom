import { Schema } from "mongoose";
import conn from "../database_connection";

const AddressModel = new Schema({
    pincode: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    coordinates: {
        lat: {
            type: Number,
            default: 0
            // required: true
        },
        long: {
            type: Number,
            // required: true
            default: 0
        }
    },
    landMarks: {
        type: String
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
})

export const addressModel = conn.model('addresses', AddressModel)

