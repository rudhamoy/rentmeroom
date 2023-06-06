import { addressModel } from "../models/addressModel";
import { ObjectId } from 'mongodb'

export async function createAddress(data: any) {
    const doc = new addressModel({ 
        pincode: data.pincode,
        address: data.address,
        coordinates: data.coordinates,
        landMarks: data.landMarks,
        userId: data.userId
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

export async function getAllOwnerAddress(userId: string) {
    const addresses = await addressModel.find({userId: new ObjectId(userId)})
    return addresses
}