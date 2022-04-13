import { withIronSessionApiRoute } from "iron-session/next";

declare module "iron-session" {
    interface IronSessionData {
        user?: {
            id: string;
        }
    }
};

const cookieOptions = {
    cookieName:"carrotsession",
    password:process.env.COOKIE_PASS!
};

export function withApiSession(fn:any){
    return withIronSessionApiRoute(fn,cookieOptions);
}