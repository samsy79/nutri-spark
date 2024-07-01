import { foods } from "@/src/data";
import { NextResponse } from "next/server";
 export async function GET() {
    return NextResponse.json(foods);
}
