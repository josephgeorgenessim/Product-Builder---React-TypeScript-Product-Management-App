interface Iprops {
    msg: string;
    
}

const ErrorMsg = ({ msg }: Iprops) => {
    return (
        <>
            <span className={`  block  text-red-700 text-sm`}>{msg}</span>
        </>
    )
}
export default ErrorMsg;