import { forwardRef } from "react";
import { Info } from "lucide-react";

const TextInput = forwardRef(
    ({
            type,
            label,
            requiredLabel,
            tooltipContent,
            onChange = () => {},
            ...props
        },
        ref
    ) => {
        const inputPlaceholderClassName =
            "text-zinc-900 w-full h-full px-3 sm:px-4 rounded-[4px] border-0 text-[14px] font-normal font-roboto leading-normal tracking-wide ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500";

        if (type === "full-single-text-input") {
            return ( <
                div className = "self-stretch w-full h-fit flex flex-col justify-start items-start" >
                <
                div className = "text-zinc-700 text-[14px] font-[500] leading-[20px] tracking-[0%] font-dm-sans mb-[9px]" > { label } { requiredLabel ? "*" : "" } <
                /div>

                <
                div className = "self-stretch w-full h-fit border-collapse" >
                <
                div className = "w-full h-10 sm:h-12 md:h-14 flex justify-center items-start" >
                <
                input ref = { ref }
                required = { requiredLabel }
                className = { inputPlaceholderClassName }
                onChange = { onChange } {...props }
                /> < /
                div > <
                /div> < /
                div >
            );
        }

        if (type === "full-single-text-input-with-tooltip") {
            return ( <
                div className = "self-stretch w-full h-fit flex flex-col justify-start items-start" >
                <
                div className = "flex items-center gap-2 text-zinc-700 text-[14px] font-[500] leading-[20px] tracking-[0%] font-dm-sans mb-[9px]" >
                <
                span > { label } { requiredLabel ? "*" : "" } <
                /span>

                <
                div className = "relative group shrink-0" >
                <
                Info size = { 14 }
                color = "#000000" / >

                <
                div className = "absolute left-0 sm:left-full top-full sm:top-1/2 mt-2 sm:mt-0 sm:ml-2 sm:-translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-[#D9D9D9] text-black text-[12px] font-[500] px-3 py-1 rounded-[10px] whitespace-normal sm:whitespace-nowrap z-10 w-[220px] sm:w-fit font-dm-sans" > { tooltipContent } <
                /div> < /
                div > <
                /div>

                <
                div className = "self-stretch w-full h-fit border-collapse" >
                <
                div className = "w-full h-10 sm:h-12 md:h-14 flex justify-center items-start" >
                <
                input ref = { ref }
                required = { requiredLabel }
                className = { inputPlaceholderClassName }
                onChange = { onChange } {...props }
                /> < /
                div > <
                /div> < /
                div >
            );
        }

        return null;
    }
);

TextInput.displayName = "TextInput";

export default TextInput;