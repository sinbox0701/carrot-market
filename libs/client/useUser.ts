import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((response) => response.json());
//fetcher useSWR 처음인자로 받은 URL(=Key)에서 response값을 받아옴
// URL이 KEY인 이유 --> url:{data} 이런식으로 데이터가 넘어오기때문
/*
super_cache = {
    "/api/users/me":{
        ok:true,    
        profile:{id:9, ...}
    }
}
 */

export default function useUser(){
    const { data, error } = useSWR("/api/users/me",fetcher);
    const router = useRouter();
    return router.replace("/enter");// push와의 차 --> Go Back이 안댐
    
    return data;
}