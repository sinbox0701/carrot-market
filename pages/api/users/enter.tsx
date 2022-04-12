import client from "@libs/server/client";
import withHandler from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req:NextApiRequest, res:NextApiResponse){
    const {phone, email} = req.body; //phone or email 중 하나
    const payload = phone ? { phone: +phone } : { email };
    //+phone --> "1234" -> 1234
    const user = await client.user.upsert({//upsert ==> create or update
      where: {
        ...payload,
      },
      create: {
        name: "Anonymous",
        ...payload,
      },
      update: {},
    });

    return res.status(200).end();
};

export default withHandler("POST",handler)