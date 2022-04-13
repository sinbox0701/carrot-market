import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withIronSessionApiRoute } from "iron-session/next";

declare module "iron-session" {
    interface IronSessionData {
        user?: {
            id: string;
        }
    }
}//사용하는 모든 구간에서 선언

async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>
) {
    const { token } = req.body;
    const exists = await client.token.findUnique({
        where:{
            payload:token
        }
    });

    if(!exists) return res.status(404).end();

    req.session.user = {//정의 필요
        id: exists.userId
    };
    await req.session.save();

    res.status(200).end();
};

export default withIronSessionApiRoute(withHandler("POST", handler),{
    cookieName:"carrotsession",
    password:process.env.COOKIE_PASS!
});//사용하는 모든 구간에서 선언

//--> Cleaninfg Code