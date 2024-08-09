import Customer from "@/models/customer";
import { connectToDB } from "@/utils/database";

export const GET = async () => {
    try {
        await connectToDB();

        const customers = await Customer.find({});

        
        return new Response(JSON.stringify(customers), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch all customers", { status: 500 });
    }
}
