interface Iprops{
    url : string;
    alt : string;
    className : string;
}

const Image = ({url , alt , className} : Iprops ) =>{
    return(
        <>
            <img src={url} alt={alt} className={className} />
        </>
    )
}
export default Image;