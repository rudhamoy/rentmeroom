import { Schema } from "mongoose";
import conn from "../database_connection";

const OwnerModel = new Schema({
    firstName: {
        type: String,
        required: [true, 'Please enter your first name'],
        minLength: [3, 'first name cannot be lass than 3 characters']
    },
    lastName: {
        type: String,
        required: [true, 'Please enter your first name'],
        minLength: [3, 'last name cannot be lass than 3 characters']
    },
    mobile: {
        type: String,
        required: [true, 'Please enter your mobile name'],
        minLength: [10, 'Mobile number cannot be less than 10 digits']
    },
   address: {
        type: String,
        required: [true, 'Please enter your address']
    },
    pincode: {
        type: Number,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    }
}, {
    timestamps: true
})

export const ownerModel = conn.model('owners', OwnerModel);


export async function createOwner(data: any) {
    const doc = new ownerModel({ 
        firstName: data.firstName,
        lastName: data.lastName,
        mobile: data.mobile,
        address: data.address,
        pincode: data.pincode,
        userId: data.userId,
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