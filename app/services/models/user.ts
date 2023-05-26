
// import conn from "@/services/connection/database";
// import { Schema } from "mongoose";


// type IUser = {
//     name: String,
//     email: String,
//     avatar?: String,
//     userType?: String,
// }


// const userSchema = new Schema({
//     name: { type: String },
//     email: { type: String },
//     // password: { type: String },
//     avatar: {type: String},
//     userType: { type: String, default: "tenant" }
// })



// const userModel = conn.model<IUser>('User', userSchema);

// export default async function createUser(data: any) {
//     const doc = new userModel({ name: data.name, email: data.email, avatar: data.avatar });
//     const response = await doc.save();
//     return response;
// }