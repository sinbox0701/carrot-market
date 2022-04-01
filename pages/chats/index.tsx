import { NextPage } from "next";

const Chats: NextPage = () => {
    return (
        <div className="py-10 divide-y">
            {[...Array(7)].map((_,i) => (
                <div key={i} className="flex px-4 cursor-pointer py-3 items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-slate-300" />
                    <div>
                        <p className="text-gray-700">Aiden</p>
                        <p className="text-sm text-gray-500">See U tommorow in the corner at 2pm!</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Chats;