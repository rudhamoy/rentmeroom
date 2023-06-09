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
    const room = await roomModel.findById({_id: roomId})
    return room
}

export async function getAllRooms() {
    const allRooms = roomModel.find().exec();
    allRooms.then((rooms) => {
        const populateAddressData = async (room: any) => {
            try {
                const address = await addressModel.findById(room.address);
                room.address = address;
                return room;
            } catch (error) {
                // handle error
                throw error;
            }
        };

        const populateTasks = rooms.map((room) => populateAddressData(room));
        
        return Promise.all(populateTasks)
    })
        .then((populateRoom) => {
            console.log(populateRoom);
            // return populateRoom
        })
        .catch((error) => {
            // handle error
        });
}


// fetch the list of owner's room
export async function ownerRooms(userId: any) {
    const rooms = await roomModel.find({ userId: new ObjectId(userId) })
    return rooms
}

export async function deleteRoom(roomId: string) {
    const deletedRoom = await roomModel.deleteOne({_id: roomId})
    return deletedRoom
}

