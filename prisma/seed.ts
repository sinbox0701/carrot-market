import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();


async function main() {
    [...Array.from(Array(500).keys())].forEach(async (item) => {
        const stream = await client.stream.create({
            data:{
                name:String(item),
                description:String(item),
                price:item,
                user:{
                    connect:{
                        id:"0c772e57-5b8a-4407-8b08-76504e91383a"
                    }
                }
            }
        });
        console.log(`${item}/500`);
    }) //500개 Array 빨리 만드는법
}

main().catch(e => console.log(e)).finally(()=>client.$disconnect());