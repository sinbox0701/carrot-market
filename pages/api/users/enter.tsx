import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import twilio from "twilio";

const twilioClient = twilio(process.env.TWILIO_SID,process.env.TWILIO_TOKEN);

async function handler(req:NextApiRequest, res:NextApiResponse<ResponseType>){
    const {phone, email} = req.body;
    const user = phone ? { phone: +phone } : email ? { email } : null;
    if(!user) return res.status(400).json({ok:false});

    const payload = Math.floor(100000 + Math.random() * 900000) + "";
    const token = await client.token.create({
        data: {
            payload,
            user: {
                connectOrCreate: {
                    where: {
                        ...user,
                    },
                    create: {
                        name: "Anonymous",
                        ...user,
                    },
                },
            },
        },
    });
    if(phone){
        await twilioClient.messages.create({
            messagingServiceSid: process.env.TWILIO_MSID,
            to: process.env.MY_PHONE!, //MY_PHONE이라는 변수가 없을수도있어 뒤에 !를 붙인다   //to: phone
            body: `Your Login Token is ${payload}.` 
        });
    }

    return res.json({
        ok:true
    });
};

export default withHandler("POST",handler)