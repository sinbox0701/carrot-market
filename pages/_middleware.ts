import type { NextRequest, NextFetchEvent } from "next/server";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
    console.log(req.ua);
    //req.ua 유저의 환경 검색 가능
}