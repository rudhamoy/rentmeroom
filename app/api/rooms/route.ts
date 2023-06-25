import getCurrentUser from "@/actions/getCurrentUser"
import { NextResponse } from "next/server"
import { createRoom } from "../../../services/controllers/roomControllers"
import { roomModel } from "../../../services/models/roomModel"
import { addressModel } from "../../../services/models/addressModel"

import APIFeatures from "../../../services/utils/apiFeatures"

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

  let page =  searchParams.get('page')

  let limitParams = searchParams.get('limit');
  const limit = parseInt(limitParams) || 4;

  let roomCategory = searchParams.get('roomCategory') || "All"
  const roomCategoryOptions = ["1R", "1RK", "1BHK", "2R", "2RK", "2BHK", "3BHK"];
  roomCategory === "All" ? (roomCategory = [...roomCategoryOptions]) : (roomCategory = searchParams.get('roomCategory').split(','));

  let tenants = searchParams.get('tenants') || "All"
  const tenantOption = ["Students", "Family", "Girls", "Boys", "Bachelor", "All"]
  tenants === "All" ? (tenants = [...tenantOption]) : (tenants = searchParams.get('tenants').split(','));

  let allQuery = {
    roomCategory,
    tenants,
    page,
  }

  const location = searchParams.get('location') || "";
  // const pincode = searchParams.get('pincode') || 0;
  const address = await addressModel.find({address: {$regex: location, $options: "i"}})


  const apiFeatures = new APIFeatures(roomModel.find(), allQuery)
  .filter()
  .priceRange([searchParams.get('min') || 2000, searchParams.get('max') || 30000])
  .address(address.map(location => location._id))
  // .limit(limit)

  let allRooms = await apiFeatures.query;
  const filteredRoomCount = allRooms.length

  apiFeatures.pagination(limit);

  allRooms = await apiFeatures.query.clone();


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

  const totalRooms = await roomModel.countDocuments()
 

  return NextResponse.json({
    limit,
    totalRooms,
    filteredRoomCount,
    rooms: populatedAddress,
  });

}
