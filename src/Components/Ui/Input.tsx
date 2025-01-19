import { InputHTMLAttributes } from "react";

interface Iprops extends InputHTMLAttributes<HTMLInputElement>{
    
}

const Input = ({ ...rest}: Iprops) => {
    return (
        <>
            <input className=" shadow-lg shadow-gray-300/50 border border-gray-400 rounded-md focus:outline-none focus:border-gray-200  p-2" {...rest} />
        </>
    )
}
export default Input;