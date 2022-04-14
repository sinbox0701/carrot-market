import { NextApiRequest, NextApiResponse } from "next";

export interface ResponseType {
    ok: boolean;
    [key:string]: any;
};

interface ConfigType {
    method:"GET"|"POST"|"DELETE";
    handler: (req:NextApiRequest, res:NextApiResponse) => void;
    isPrivate?: boolean;
};

export default function withHandler({
    method,
    isPrivate = true,
    handler
}:ConfigType){
    return async function(req:NextApiRequest, res:NextApiResponse):Promise<any>{
        if(req.method !== method){
            return res.status(405).end();
            //Method Not Allowed: 허용되지 않은 메서드 사용
        }
        if(isPrivate && !req.session.user){
            return res.status(401).json({ok:false, error:"Login GO"});
        }
        try{
            await handler(req, res);
        }catch(error){
            console.log(error);
            return res.status(500).json({error});
            //Internal Server Error: 서버가 처리 방법을 모르는 상황이 발생
        }
    }
}
