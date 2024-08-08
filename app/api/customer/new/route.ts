import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
import Customer from "@/models/customer";

export const POST = async (req: NextRequest) => {
    const { name, phoneNumber, carModel } = await req.json();

    try {
        await connectToDB();
        const newCustomer = new Customer({
            name, phoneNumber, carModel,
        })

        await newCustomer.save();

        return NextResponse.json(newCustomer, {status: 201});
    } catch (error) {
        return NextResponse.json({message: 'Failed to create Customer'}, {status: 500});
    }
}