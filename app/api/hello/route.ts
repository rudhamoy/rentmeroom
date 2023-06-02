import { NextResponse } from "next/server";
import createUser from "@/services/models/user";

export async function GET(request: Request) {
    try {
        let user = await createUser({ name: "Testing name", email: "testing@test.com", password: "Hey Password" });
        return NextResponse.json(user);
    } catch (err) {
        return new Response(JSON.stringify(await err), { status: 400 });
    }
}