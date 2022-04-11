import type { NextPage } from "next";
import Layout from "@components/layout";
import Message from "@components/message";

const ChatDetail: NextPage = () => {
    return (
        <Layout canGoBack title="Aiden">
            <div className="px-4 py-10 pb-16 space-y-4">
                <Message message="Hi how much are you selling them for?" />
                <Message message="I want ￦20,000" reversed />
                <Message message="미쳤어" />
                <form className="fixed py-2 bg-white w-full bottom-0 inset-x-0">
                    <div className="flex relative items-center max-w-md w-full mx-auto">
                        <input type="text" className="shadow-sm pr-12 rounded-full w-full border-gray-300 focus:ring-orange-500 focus:outline-none focus:border-orange-500" />
                        <div className="absolute inset-y-0 flex py-1.5 pr-1.5 right-0">
                            <span className="flex focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 items-center bg-orange-500 rounded-full px-3 hover:bg-orange-600 cursor-pointer text-sm text-white">&rarr;</span>
                        </div>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default ChatDetail;