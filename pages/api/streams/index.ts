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
        const {
            result:{
                uid,
                rtmps: {streamKey, url}
            }
        } = await (await fetch(`https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ID}/stream/live_inputs`,{
            method:"POST",
            headers:{
                Authorization:`Bearer ${process.env.CF_STREAMS_TOKEN}`
            },
            body: `{"meta":{"name":"${name}"},"recording":{"mode":"automatic", "timeoutSeconds":10}}`
        })).json();
        const stream = await client.stream.create({
            data:{
                name,
                price,
                description,
                cloudflareId:uid,
                cloudflareKey:streamKey,
                cloudflareUrl:url,
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