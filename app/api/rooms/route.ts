import getCurrentUser from "@/actions/getCurrentUser"
import { NextResponse } from "next/server"
import { createRoom } from "../../../services/controllers/roomControllers"
import { roomModel } from "../../../services/models/roomModel"
import { addressModel } from "../../../services/models/addressModel"

// create room
export async function POST(request: Request) {
  const currentUser = await getCurrentUser()

  const body = await request.json()
  let userId = currentUser._id
  body.userId = userId.toString() //conver ObjectId to plain string - 

  const room = await createRoom({ ...body })
  return NextResponse.json(room)
}

// get all rooms --- specially to get the list of new room
export async function GET(request: Request) {

  const { searchParams } = new URL(request.url)
  // console.log(searchParams)

  let limitParams = searchParams.get('limit');
  const limit = parseInt(limitParams) || 5;

  let roomCategory = searchParams.get('roomCategory') || "All"
  const roomCategoryOptions =["1R", "1RK", "1BHK", "2R", "2RK", "2BHK", "3BHK"];
  
  let tenants = searchParams.get("tenants") || "All"
  const tenantsOptions =["All", "Students", "Family", "Girls", "Boys", "Bachelor"]

  // if select all - render all room type else render only selected room type from query
  // if more than one query  in room type, add it to the array  with comma separated in array via split method
  roomCategory === "All" ? (roomCategory = [...roomCategoryOptions]) : (roomCategory = searchParams.get('roomCategory').split(','));

  tenants === "All" ? (tenants = [...tenantsOptions]) : (tenants = searchParams.get('tenants').split(','));

  const allRooms = await roomModel.find().where('roomCategory').in([...roomCategory]).limit(limit).exec();

  /**
   * get all rooms via room model and populate address data
   * to make it easy to show address
   */
  const populatedAddress = [];

  for (const room of allRooms) { //populate address data on every room via iterating over every room
    const address = await addressModel.findById(room.address).exec();
    const roomWithAddress = {
      ...room.toObject(), // to change the mongoose documents to an object otherwise use the commented one
      // ...room._doc,
      address: address
    };
    populatedAddress.push(roomWithAddress);
  }

  const total = await roomModel.countDocuments()

  return NextResponse.json({
    total,
    limit,
    rooms: populatedAddress
  });

}
