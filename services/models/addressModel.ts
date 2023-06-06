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
    }
})

export const addressModel = conn.model('addresses', AddressModel)

export async function createAddress(data: any) {
    const doc = new addressModel({ 
        pincode: data.pincode,
        address: data.address,
        coordinates: data.coordinates,
        landMarks: data.landMarks
     });
    try {
        const response = await doc.save();
        return response;
    } catch (err: any) {
        var errorFields = Object.keys(err.errors);
        var message: any = {}
        errorFields.map(item => {
            message[item] = err.errors[item];
        })
        return Promise.reject(message);
    }
}