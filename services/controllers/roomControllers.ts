import { ObjectId } from "mongodb";
import { roomModel } from "../models/roomModel";
import { addressModel } from "../models/addressModel";

// create room
export async function createRoom(data: any) {
    const doc = new roomModel({
        title: data.title,
        pricePerMonth: data.pricePerMonth,
        description: data.description,
        address: data.address,
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

// get a single room - room details
export async function roomDetails(roomId: string) {
    const room = await roomModel.findById({ _id: roomId }).populate({path: "address", model: addressModel})
    return room
}

export async function updateRoom(roomId: string, data: any) {
    let roomById = await roomModel.findById({ _id: roomId })

    const updatedRoom = await roomModel.findByIdAndUpdate(roomById, data)

    return updatedRoom
}


// fetch the list of owner's room
export async function ownerRooms(userId: any) {
    const rooms = await roomModel.find({ userId: new ObjectId(userId) }).populate({ path: 'address', model: addressModel })
    return rooms
}

export async function deleteRoom(roomId: string) {
    const deletedRoom = await roomModel.deleteOne({ _id: roomId })
    return deletedRoom
}

