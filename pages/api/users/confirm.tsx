import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>
) {
    const { token } = req.body;
    const foundedToken = await client.token.findUnique({
        where:{
            payload:token
        }
    });

    if(!foundedToken) return res.status(404).end();

    req.session.user = {//정의 필요
        id: foundedToken.userId
    };
    await req.session.save();
    await client.token.deleteMany({
        where:{
            userId: foundedToken.userId
        }
    })

    res.json({ok:true});
};

export default withApiSession(withHandler({ method: "POST", handler, isPrivate: false }));