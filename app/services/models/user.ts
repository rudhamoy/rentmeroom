
import { Schema } from "mongoose";
import conn from "../database_connection";





// type IUser = {
//     name: String,
//     email: String,
//     avatar?: String,
//     userType?: String,
//     mobile?: Number,

// }

// const UserSchema = new Schema({
//     name: { type: String },
//     email: { type: String },
//     avatar: { type: String },
//     userType: { type: String, default: "tenant" },
//     mobile: { type: Number },
//     favorites: [{ roomId: Schema.Types.ObjectId }],
// }, { timestamps: true })



type IUser = {
    name: String,
    email: String,
    password: String,
    userType?: String,
    favorites?: [],

}


const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String },
    userType: { type: String },
    favorites: [],
})



const userModel = conn.model<IUser>('users', userSchema);

export default async function createUser(data: any) {
    const doc = new userModel({ name: data.name, email: data.email, password: data.password });
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


