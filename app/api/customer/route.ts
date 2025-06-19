import Customer from "@/models/customer";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async () => {
    try {
        await connectToDB();

        const customers = await Customer.find({});

        
        const response = NextResponse.json(customers, { status: 200 });
        response.headers.set("Cache-Control", "no-store");
        return response;
    } catch (error) {
        return NextResponse.json('Failed to fetch customers', {status: 500});
    }
}
