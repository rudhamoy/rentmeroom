import { ownerModel } from "../models/ownerModel";
import { addressModel } from "../models/addressModel";

export async function createOwner(data: any) {
    const doc = new ownerModel({ 
        firstName: data.firstName,
        lastName: data.lastName,
        mobile: data.mobile,
        address: data.address,
        pincode: data.pincode,
        userId: data.userId,
     });
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

// export const getOwnerAddresses(userId) {

// }