
import { Schema, model, models } from "mongoose";

type IUser = {
    name: String,
    email: String,
    avatar?: String,
    userType?: String,
    mobile?: Number,

}

const UserSchema = new Schema({
    name: { type: String },
    email: { type: String },
    avatar: { type: String },
    userType: { type: String, default: "tenant" },
    mobile: { type: Number },
    favorites: [{ roomId: Schema.Types.ObjectId }],
}, { timestamps: true })

export default models?.User || model("User", UserSchema)
