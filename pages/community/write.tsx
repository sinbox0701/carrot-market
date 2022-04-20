import { NextPage } from "next";
import Button from "@components/button";
import Layout from "@components/layout";
import TextArea from "@components/textarea";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import { Post } from "@prisma/client";
import { useEffect } from "react";
import { useRouter } from "next/router";
import useCoords from "@libs/client/useCoords";

interface WriteForm {
    question: string;
}

interface WriteMutation {
    ok:boolean;
    post: Post;
}

const Write: NextPage = () => {
    const {latitude, longitude} = useCoords();
    const router = useRouter();
    const { register, handleSubmit } = useForm<WriteForm>();
    const [ post, {loading, data} ] = useMutation<WriteMutation>("/api/posts");
    const onValid = (data:WriteForm) => {
        if(loading) return;
        post({...data, latitude, longitude});
    };
    useEffect(()=>{
        if(data?.ok){
            router.push(`/community/${data.post.id}`);
        }
    },[data,router]);
    return (
        <Layout canGoBack title="Write Post">
            <form className="px-4 py-10" onSubmit={handleSubmit(onValid)}>
                <TextArea 
                    register={register("question",{required:true})}
                    required
                    name="question" 
                    label="Ask a question!"
                />
                <Button text={loading ? "Loading..." : "Submit"} />
            </form>
        </Layout>
    );
};

export default Write;