import { Schema } from "mongoose";
import conn from "../database_connection";

const RoomSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Please enter room name'],
        trim: true,
        maxLength: [100, 'Room name cannot exceed 100 characters']
    },
    pricePerMonth: {
        type: Number,
        required: [true, 'Please enter room price per month'],
        maxLength: [5, 'Price cannot exceed 5 characters'],
        default: 0.0
    },
    description: {
        type: String,
    },
    // address: {
    //     type: String,
    //     required: [true, 'Please enter room address']
    // },
    // pincode: {
    //     type: Number,
    //     required: true
    // },
    images: [
        {
            type: String,
            required: true
        }
    ],
    roomCategory: {
        type: String,
        required: [true, 'Please enter room category'],
        enum: {
            values: ["1R", "1RK", "1BHK", "2R", "2RK", "2BHK", "3BHK"]
        }
    },
    bathroomType: {
        type: String,
        required: [true, 'Please select bathroom type'],
        enum: {
            values: ["Attached", "Shared"]
        }
    },
    tenants: {
        type: String,
        required: [true, 'Please enter prefered tenants'],
        enum: {
            values: ["All", "Students", "Family", "Girls", "Boys", "Bachelor"]
        }
    },
    electricBill: {
        type: Boolean,
        required: true,
        default: false
    },
    floor: {
        type: String,
        enum: {
            values: ['Ground Floor', 'First Floor', 'Second Floor', 'Third Floor', 'Fouth Floor', 'Fifth Floor']
        },
        default: 'Ground Floor'
    },
    balcony: {
        type: Boolean,
        default: false
    },
    parking: {
        type: Boolean,
        default: false
    },
    waterSupply: {
        type: Boolean,
        default: false
    },
    furnish: {
        type: String,
        enum: {
            values: ['Unfurnished', 'Semi-furnished', 'Furnished']
        },
        default: "UnFurnished"
    },
    // featured: {
    //     type: Boolean,
    //     default: false
    // },
    // status: {
    //     type: Boolean,
    //     default: false
    // },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: false
    },
    // createdAt: {
    //     type: Date,
    //     default: Date.now
    // }

}, {
    timestamps: true
})

export const roomModel = conn.model('rooms', RoomSchema);

