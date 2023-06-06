
import { Schema, Types, Model } from "mongoose";
import conn from "../database_connection";


export interface ITenant {
    userId: Types.ObjectId;
    firstName: string;
    lastName: string;
    mobile?: number;
    tenantType?: string;
    prefferedPrice?: number;
    prefferedLocaton?: string;
}





const tenantShema = new Schema<ITenant>({
    userId: { type: Schema.Types.ObjectId, ref: 'users', required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    mobile: { type: Number },
    tenantType: { type: String },
    prefferedPrice: { type: Number },
}, { timestamps: true });




export const Tenant = conn.model<ITenant>('Tenant', tenantShema);

