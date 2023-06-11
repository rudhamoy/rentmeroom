import axios from "axios"
import { ownerModel } from "../../services/models/ownerModel"
import { Tenant } from "../../services/models/tenant"
import { addressModel } from "../../services/models/addressModel";

export default async function getUserWithType(userId: string) {
  try {
    let user = null
    const tenantUser = await Tenant.findOne({ userId: userId });
    const ownerUser = await ownerModel.findOne({ userId: userId });

    // check if user is a tenant & return user as tenant
    if (tenantUser !== null) {
      user = { ...tenantUser?.toObject(), role: "tenant" }
      return user
    }
    // if user is owner & return user as owner 
    if (ownerUser !== null) {
      const address = await addressModel.findById(ownerUser.address[0]).exec();
      user = {
        ...ownerUser.toObject(),
        address: [address],
        role: "owner"
      };
      return user
    }

    return user

  } catch (error: any) {
    return null
  }
}

export const checkExistOwner = async (id: string) => {
  const res = await axios.post('http://localhost:3000/api/owner', { id })
  return res.data
}

