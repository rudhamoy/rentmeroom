
import { Schema, Types } from "mongoose";
import conn from "../database_connection";

const bookmarkSchema = new Schema({
    userID: { type: Schema.Types.ObjectId, required: true, ref: "users" },
    roomID: { type: Schema.Types.ObjectId, required: true, ref: "rooms" }
}, { timestamps: true });


export const Bookmark = conn.model('bookmarks', bookmarkSchema);