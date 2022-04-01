import type { NextPage } from "next";

const ChatDetail: NextPage = () => {
    return (
        <div className="px-4 py-10 pb-16 space-y-4">
            <div className="flex items-start space-x-2">
                <div className="w-8 h-8 rounded-full bg-slate-500" />
                <div className="w-1/2 text-sm text-gray-700 p-2 border border-gray-300 rounded-md">Hi how much are you selling them for?</div>
            </div>
            <div className="flex flex-row-reverse items-start space-x-2 space-x-reverse">
                <div className="w-8 h-8 rounded-full bg-slate-500" />
                <div className="w-1/2 text-sm text-gray-700 p-2 border border-gray-300 rounded-md">I want ￦20,000</div>
            </div>
            <div className="flex items-start space-x-2">
                <div className="w-8 h-8 rounded-full bg-slate-500" />
                <div className="w-1/2 text-sm text-gray-700 p-2 border border-gray-300 rounded-md">미쳤어</div>
            </div>
            <div className="fixed py-2 bg-white w-full bottom-0 inset-x-0">
                <div className="flex relative items-center">
                    <input type="text" className="shadow-sm pr-12 rounded-full w-full border-gray-300 focus:ring-orange-500 focus:outline-none focus:border-orange-500" />
                    <div className="absolute inset-y-0 flex py-1.5 pr-1.5 right-0">
                        <span className="flex focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 items-center bg-orange-500 rounded-full px-3 hover:bg-orange-600 cursor-pointer text-sm text-white">&rarr;</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatDetail;