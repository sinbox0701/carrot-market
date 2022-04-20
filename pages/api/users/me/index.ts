import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(
    req:NextApiRequest,
    res:NextApiResponse<ResponseType>
){
    if(req.method === "GET"){
        const profile = await client.user.findUnique({
            where:{
                id: req.session.user?.id
            }
        });
        res.json({
            ok:true,
            profile
        })
    }
    if(req.method === "POST"){
        const {
            session: {user},
            body: {email,phone,name}
        } = req;
        const currentUser = await client.user.findUnique({
            where:{
                id:user?.id
            }
        });
        if(email && email !==currentUser?.email){
            const alredyExists = Boolean(await client.user.findUnique({
                where:{
                    email
                },
                select:{
                    id:true
                }
            }));
            if(alredyExists){
                return res.json({
                    ok:false,
                    error:"Email Already Taken."
                })
            }
            console.log(email);
            await client.user.update({
                where: {
                    id: user?.id,
                },
                data: {
                    email,
                },
            });
            res.json({ ok: true });
        }
        if(phone && phone !==currentUser?.phone){
            const alredyExists = Boolean(await client.user.findUnique({
                where:{
                    phone
                },
                select:{
                    id:true
                }
            }));
            if(alredyExists){
                return res.json({
                    ok:false,
                    error:"Phone Already Use."
                })
            }
            await client.user.update({
                where: {
                    id: user?.id,
                },
                data: {
                    phone,
                },
            });
            res.json({ ok: true });
        }
        if(name){
            await client.user.update({
                where: {
                    id: user?.id,
                },
                data: {
                    name,
                },
            });
        }
        res.json({ ok: true });
    }
};

export default withApiSession(withHandler({ methods: ["GET","POST"], handler}))