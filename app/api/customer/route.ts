import Customer from "@/models/customer";
import { connectToDB } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    try {
        await connectToDB();

        const customers = await Customer.find({});

        return NextResponse.json(customers, {status: 200});
    } catch (error) {
        return NextResponse.json('Failed to fetch customers', {status: 200});
    }
}