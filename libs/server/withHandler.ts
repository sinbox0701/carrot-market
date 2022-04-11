import { NextApiRequest, NextApiResponse } from "next";

export default function withHandler(
    method:"GET"|"POST"|"DELETE", 
    fn: (req:NextApiRequest, res:NextApiResponse) => void
){
    return async function(req:NextApiRequest, res:NextApiResponse){
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

//handler function 작성
//withHandler에서 handler function을 받아옴
//withHandler는 껍데기에 불과함
//api route를 통해 접근하지 못하세 막아놓는것
