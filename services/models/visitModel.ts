
import { Schema, Types } from "mongoose";
import conn from "../database_connection";


interface IVisit {
    userID: Types.ObjectId;
    roomID: Types.ObjectId;
    date: string,
    visitTime: string
}


const visitSchema = new Schema<IVisit>({
    userID: { type: Schema.Types.ObjectId, required: true, ref: "users" },
    roomID: { type: Schema.Types.ObjectId, required: true, ref: "rooms" },
    date: {type: String, required: true},
    visitTime: {type: String, required: true},

}, { timestamps: true });


export const visitModel = conn.model<IVisit>('visits', visitSchema);