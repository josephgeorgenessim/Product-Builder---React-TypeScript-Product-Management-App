import { HTMLAttributes } from "react";

interface Iprops extends HTMLAttributes<HTMLSpanElement> {
    color: string;
}
const CircleColor = ({ color, ...rest }: Iprops) => {
    return (
        <span className={`block w-5 h-5 ml-1 rounded-full cursor-pointer`} style={{ background: color }} {...rest}></span>
    )
}
export default CircleColor;