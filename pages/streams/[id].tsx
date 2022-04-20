import { NextPage } from "next";
import Layout from "@components/layout";
import Message from "@components/message";
import { Message as Msg, Stream as Str } from "@prisma/client";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import { useEffect } from "react";
import useUser from "@libs/client/useUser";

interface StreamMessage {
    message: string;
    id: string;
    user: {
        avatar?: string;
        id: string;
    };
};

interface StreamWithMessages extends Str {
    messages: StreamMessage[];
};

interface StreamResponse {
    ok:boolean;
    stream: StreamWithMessages;
}

interface MessageForm {
    message:string;
}

interface MessageMutation {
    ok:boolean;
    message:Msg;
}

const Stream: NextPage = () => {
    const {user} = useUser();
    const router = useRouter();
    const { register, handleSubmit, reset } = useForm<MessageForm>();
    const [sendMessage, {data:sendMessageData, loading}] = useMutation<MessageMutation>(`/api/streams/${router.query.id}/message`);
    const { data, mutate } = useSWR<StreamResponse>(router.query.id ? `/api/streams/${router.query.id}` : null);
    const onValid = (data:MessageForm) => {
        if(loading) return;
        reset();
        sendMessage(data);
    };

    useEffect(()=>{
        if (sendMessageData && sendMessageData.ok) {
            mutate();
        }
    },[sendMessageData,mutate]);

    return (
        <Layout canGoBack>
            <div className="py-10 px-4 space-y-4">
                <div className="w-full rounded-md shadow-sm bg-slate-300 aspect-video" />
                <div className="mt-5">
                    <h1 className="text-3xl font-bold text-gray-900">{data?.stream?.name}</h1>
                    <span className="text-2xl block mt-3 text-gray-900">${data?.stream?.price}</span>
                    <p className=" my-6 text-gray-700">
                        {data?.stream?.description}
                    </p>
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Live Chat</h2>
                    <div className="py-10 pb-16 h-[50vh] scrollbar-hide overflow-y-scroll px-4 space-y-4">
                       {data?.stream?.messages.map((message)=>(
                           <Message
                                key={message?.id}
                                message={message?.message}
                                reversed={message.user.id === user?.id}
                           />
                       ))}
                    </div>
                    <div className="fixed py-2 bg-white bottom-0 inset-x-0">
                        <form className="flex relative max-w-md items-center w-full mx-auto" onSubmit={handleSubmit(onValid)}>
                            <input {...register("message",{required:true})} type="text" className="shadow-sm rounded-full w-full border-gray-300 focus:ring-orange-500 focus:outline-none pr-12 focus:border-orange-500" />
                            <div className="absolute inset-y-0 flex py-1.5 pr-1.5 right-0">
                                <button className="flex focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 items-center bg-orange-500 rounded-full px-3 hover:bg-orange-600 text-sm text-white">&rarr;</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Stream;