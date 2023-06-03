import { ObjectId } from "mongodb";
import { roomModel } from "../models/roomModel";

export async function createRoom(data: any) {
    const doc = new roomModel({ 
        title: data.title,
        pricePerMonth: data.pricePerMonth,
        description: data.description,
        images: data.images,
        roomCategory: data.roomCategory,
        bathroomType: data.bathroomType,
        tenants: data.tenants,
        electricBill: data.electricBill,
        floor: data.floor,
        balcony: data.balcony,
        parking: data.parking,
        waterSupply: data.waterSupply,
        furnish: data.furnish,
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

export async function myRooms (userId: any) {
    const rooms = await roomModel.find({ userId: new ObjectId(userId) })
    return rooms
}

// FMPP1702394494