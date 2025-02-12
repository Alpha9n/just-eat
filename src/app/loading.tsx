import { Loader } from "lucide-react";

const Loading = () => {
    return (
        <div className="flex flex-col gap-5 w-full h-full justify-center items-center px-0 py-5">
            <p className="text-xl font-bold">Loading</p>
            <Loader className="animate-spin size-10 text-amber-600" />
        </div>
    );
};

export default Loading;
