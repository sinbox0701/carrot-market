import type { NextRequest, NextFetchEvent } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
    if(req.ua?.isBot){
        return new Response("Plz don't be a bot. Be human.", { status: 403 })
    }
    // if (!req.url.includes("/api")) {
    //     if (!req.url.includes("/enter") && !req.cookies.carrotsession) {
    //         //console.log(req.cookies)로 쿠키이름 확인 --> carrotsession
    //         return NextResponse.redirect(`${req.nextUrl.origin}/enter`);
    //     }
    // }
}