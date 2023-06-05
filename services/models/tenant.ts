
import { Schema, Types, Model } from "mongoose";
import conn from "../database_connection";


export interface ITenant {
    userId: Types.ObjectId;
    firstName: string;
    lastName: string;
    mobile: number;
    tenantType?: string;
    prefferedPrice?: number;
    prefferedLocaton?: string;
    // favouriteProperty?: Types.DocumentArray<Rooom>; we will implement it later
}

interface ITenantMethods {
    fullName(): string;
}

type TenantModel = Model<ITenant, {}, ITenantMethods>;

const tenantShema = new Schema<ITenant, TenantModel, ITenantMethods>({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    mobile: { type: Number, required: true },
    tenantType: { type: String, required: true },
    prefferedPrice: { type: Number, required: false },
}, { timestamps: true });


tenantShema.method('fullName', function () {
    return this.firstName + ' ' + this.lastName;
});


export const Tenant = conn.model<ITenant>('Tenant', tenantShema);

export const createTenant = async (data: ITenant) => {
    const doc = new Tenant({ userId: data.userId, firstName: data.firstName, lastName: data.lastName, mobile: data.mobile, tenantType: data.tenantType, prefferedLocaton: data.prefferedLocaton, prefferedPrice: data.prefferedPrice });
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