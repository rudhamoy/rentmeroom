import { NextResponse } from "next/server";
import { createTenant, getTenantByUserId } from "../../../services/controllers/tenantController";
import getCurrentUser from "@/actions/getCurrentUser";



export async function POST(request: Request) {

    try {
        let reqBody = await request.json();
        let response = await createTenant({ ...reqBody });
        return new NextResponse(JSON.stringify(response));
    } catch (err) {
        return new Response(JSON.stringify(await err), { status: 400 });
    }
}


export async function GET(request: Request) {
    const currentUser: any = await getCurrentUser();
    try {
        const doc = await getTenantByUserId(currentUser._id);
        return new NextResponse(JSON.stringify(doc));
    } catch (err) {
        return new NextResponse("Tenant not found!");
    }

}