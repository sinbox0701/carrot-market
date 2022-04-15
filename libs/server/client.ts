import { PrismaClient } from "@prisma/client";

declare global {
    var client: PrismaClient | undefined;
}

const client = global.client || new PrismaClient();

if(process.env.NODE_ENV === "development") global.client = client;

export default client;

// 처음 실행이 될때는 new PrismaClient를 통해 객체가 새로 만들어지고 그 이후에는 저장해논 객체 사용
// db에 접근이 많아지면 안좋음