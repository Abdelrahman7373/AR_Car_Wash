import Customer from "@/models/customer";
import { connectToDB } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";


interface Params {
    id: string;
}


export const GET = async (req: NextRequest, {params}: {params: Params}) => {
    try {
        await connectToDB();

        const customer = await Customer.findById(params.id);
        if(!customer) return NextResponse.json('Customer not found', {status: 404});

        return NextResponse.json(customer, {status: 200});
    } catch (error) {
        return NextResponse.json('Failed to fetch customers', {status: 200});
    }
};

export const PATCH = async (req: NextRequest, {params}: {params: Params}) => {
    const { name, phoneNumber, carModel } = await req.json();

    try {
        await connectToDB();

        const existingCustomer = await Customer.findById(params.id);
        if(!existingCustomer) return NextResponse.json('Customer not found', {status: 404});

        existingCustomer.name = name;
        existingCustomer.phoneNumber = phoneNumber;
        existingCustomer.carModel = carModel;

        await existingCustomer.save();

        return NextResponse.json(existingCustomer, {status: 200});
    } catch (error) {
        return NextResponse.json('Failed to edit customer', {status: 500});
    }
};

export const DELETE = async (req: NextRequest, {params}: {params: Params}) => {
    try {
        await connectToDB();

        await Customer.findByIdAndDelete(params.id);

        return NextResponse.json('Customer Deleted Successfully', {status: 200});
    } catch (error) {
        return NextResponse.json('Failed to delete customer', {status: 500});
    }
};