
import conn from "@/services/mongodb/database";
import { Schema } from "mongoose";


type IUser = {
    name: String,
    email: String,
    password: String,
    userType?: String,
}


const userSchema = new Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String },
    userType: { type: String }
})



const userModel = conn.model<IUser>('User', userSchema);

export default async function createUser(data: any) {
    const doc = new userModel({ name: data.name, email: data.email, password: data.password });
    const response = await doc.save();
    return response;
}