import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(
    req: NextApiRequest,
    res:NextApiResponse<ResponseType>
){
    const {
        body: {name, price, description},
        session: {user},
        query:{page}
    } = req;
    if(req.method === "POST"){
        const stream = await client.stream.create({
            data:{
                name,
                price,
                description,
                user:{
                    connect:{
                        id:user?.id
                    }
                }
            }
        });
        res.json({
            ok:true,
            stream
        });
    }
    if(req.method === "GET") {
        const streamCount = await client.stream.count();
        const streams = await client.stream.findMany({
            take:10, //몇개 가져올건지
            skip:(+page - 1 ) * 10 // 몇개 스킵할건지(앞에 열개) 10, 20 이런식 
        });
        res.json({ ok: true, streams, pages: Math.ceil(streamCount / 10) });
    }
};

export default withApiSession(withHandler({methods:["GET","POST"],handler}));