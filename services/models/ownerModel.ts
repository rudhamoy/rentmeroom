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
   address: [
    {
        type: Schema.Types.ObjectId,
        ref: 'addresses',
    }
   ],
    userId: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    }
}, {
    timestamps: true
})

export const ownerModel = conn.model('owners', OwnerModel);
