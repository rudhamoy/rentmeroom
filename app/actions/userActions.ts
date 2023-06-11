import axios from "axios"
import { ownerModel } from "../../services/models/ownerModel"
import { Tenant } from "../../services/models/tenant"

export default async function getUserWithType(userId: string) {
    try {
        let user = null
        const tenantUser = await Tenant.findOne({ userId: userId });
        const ownerUser = await ownerModel.findOne({ userId: userId });

        if(tenantUser !== null) {
          user = {...tenantUser?.toObject(), role: "tenant"}
          return user
        } 
        if (ownerUser !== null) {
          user = { ...ownerUser?.toObject(), role: "owner"}
          return user
        }

        return user
        
    } catch (error: any) {
        return null
    }
}

export const checkExistOwner = async (id: string) => {
    const res = await axios.post('http://localhost:3000/api/owner', {id})
    return res.data
}

