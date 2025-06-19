import Customer from "@/models/customer";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (req: Request) => {
  const requestedFrom = req.headers.get("x-requested-from");

  if (requestedFrom !== "my-frontend") {
    return NextResponse.json({ message: "Forbidden to access this content" }, { status: 403 });
  }

  try {
    await connectToDB();
    const customers = await Customer.find({});

    const response = NextResponse.json(customers, { status: 200 });
    response.headers.set("Cache-Control", "no-store");
    return response;
  } catch (error) {
    return NextResponse.json("Failed to fetch customers", { status: 500 });
  }
};
