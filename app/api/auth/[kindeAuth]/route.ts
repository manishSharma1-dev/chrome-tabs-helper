import { handleAuth } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: { params: any }) {
    const endpoint = params.kindeAuth;
    return await handleAuth(request, endpoint);
}

export async function POST(request: NextRequest, { params }: { params: any }) {
    const endpoint = params.kindeAuth;
    return await handleAuth(request, endpoint);
}