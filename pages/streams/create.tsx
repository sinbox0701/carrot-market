import { NextPage } from "next";
import Button from "@components/button";
import Input from "@components/input";
import Layout from "@components/layout";
import TextArea from "@components/textarea";
import { useForm } from "react-hook-form";
import { Stream } from "@prisma/client";
import useMutation from "@libs/client/useMutation";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface CreateForm {
    name: string;
    price: number;
    description: string;
}

interface CreateStreamMutation {
    ok:boolean;
    stream:Stream;
}

const Create: NextPage = () => {
    const router = useRouter();
    const { register, handleSubmit } = useForm<CreateForm>();
    const [createStream, {data, loading}] = useMutation<CreateStreamMutation>("/api/streams");
    const onValid = (data:CreateForm) => {
        if(loading) return;
        createStream(data);
    };
    
    useEffect(()=>{
        if(data?.ok){
            router.replace(`/streams/${data.stream.id}`);
        }
    },[data,router]);

    return (
        <Layout canGoBack title="Go To Live">
            <form className="px-4 py-10 space-y-5" onSubmit={handleSubmit(onValid)}>
                <Input
                    register={register("name",{required:true})} 
                    required 
                    label="Name" 
                    name="name" 
                    type="text"
                 />
                <Input
                    register={register("price",{required:true, valueAsNumber:true})}
                    required
                    label="Price"
                    name="price"
                    type="text"
                    kind="price"
                />
                <TextArea
                    register={register("description",{required:true})}
                    name="description" 
                    label="Description"
                />
                <Button text={loading ? "Loading..." : "Go live"} />
            </form>
        </Layout>
    );
};

export default Create;