import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(
    req: NextApiRequest,
    res:NextApiResponse<ResponseType>
){
    const {
        query: {id},
        session: {user}
    } = req;
    const stream = await client.stream.findUnique({
        where:{
            id:id.toString()
        },
        include:{
            messages:{
                select:{
                    id:true,
                    message:true,
                    user:{
                        select:{
                            avatar:true,
                            id:true
                        }
                    }
                }
            }
        }
    });
    //select을 사용하면 보고싶은것을 특정할수 있음
    const isOwner = stream?.userId === user?.id;
    if(stream && !isOwner){
        stream.cloudflareKey = "xxxxx";
        stream.cloudflareUrl = "xxxxx";
    }
    if(!stream){
        res.status(404).json({ok:false, error:"Not found Live"});
    }

    res.json({
        ok:true,
        stream
    });
};

export default withApiSession(withHandler({methods:["GET"],handler}));