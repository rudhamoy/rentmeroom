
import { Schema } from "mongoose";
import conn from "../database_connection";



type IUser = {
    name: String,
    email: String,
    password: String,
    userType?: String,

}


const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String },
    userType: { type: String },
})



const userModel = conn.model<IUser>('Users', userSchema);

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


