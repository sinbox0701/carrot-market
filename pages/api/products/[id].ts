import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(
    req: NextApiRequest,
    res:NextApiResponse<ResponseType>
){
    const { id } = req.query;
    //string이거나 string 배열일수가 있어 toString해줌
    const product = await client.product.findUnique({
        where:{
            id: id.toString(),
        },
        include:{
            user:{
                select:{
                    id:true,
                    name:true,
                    avatar:true
                }
            }
        }
    });
    res.json({ok:true, product});
};

export default withApiSession(withHandler({methods:["GET"],handler}));