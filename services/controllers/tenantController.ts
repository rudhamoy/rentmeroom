
import { Tenant } from '../models/tenant';



export const createTenant = async (data: any) => {

    try {
        const response = await Tenant.create({ userId: data.userId, firstName: data.firstName, lastName: data.lastName, mobile: data.mobile, tenantType: data.tenantType, prefferedLocaton: data.prefferedLocaton, prefferedPrice: data.prefferedPrice });
        return response;
    } catch (err: any) {
        console.log("If anyother error:", err)
        var errorFields = Object.keys(err.errors);
        var message: any = {}
        errorFields.map(item => {
            message[item] = err.errors[item];
        })
        return Promise.reject(message);
    }

}

export const getTenantByUserId = async (data: any) => {
    try {
        let doc = await Tenant.findOne({ userId: data });
        console.log("THE DOUCMET =========> ", doc)
        return doc
    } catch (err) {
        console.log(err);
        return err
    }

}