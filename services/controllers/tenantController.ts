import { ITenant, Tenant } from '../models/tenant';



export const createTenant = async (data: ITenant) => {
    const doc = new Tenant({ userId: data.userId, firstName: data.firstName, lastName: data.lastName, mobile: data.mobile, tenantType: data.tenantType, prefferedLocaton: data.prefferedLocaton, prefferedPrice: data.prefferedPrice });
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