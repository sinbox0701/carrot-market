import { NextApiRequest, NextApiResponse } from "next";

export interface ResponseType {
    ok: boolean;
    [key:string]: any;
};
//Return할 데이터 타입

export default function withHandler(
    method:"GET"|"POST"|"DELETE", 
    fn: (req:NextApiRequest, res:NextApiResponse) => void
){
    return async function(req:NextApiRequest, res:NextApiResponse):Promise<any>{
        if(req.method !== method){
            return res.status(405).end();
            //Method Not Allowed: 허용되지 않은 메서드 사용
        }
        try{
            await fn(req, res);
        }catch(error){
            console.log(error);
            return res.status(500).json({error});
            //Internal Server Error: 서버가 처리 방법을 모르는 상황이 발생
        }
    }
}
