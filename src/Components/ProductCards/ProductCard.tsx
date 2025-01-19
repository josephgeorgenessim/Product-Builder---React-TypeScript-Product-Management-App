import { numberWithCommas, txtSlicer } from "../../Function/Function";
import { IProduct } from "../../InterFaces/InterFace";
import CircleColor from "../CircleColor/CircleColor";
import Image from "../ImageComponent/Image";
import Button from "../Ui/Button";
interface Iprops {
    product: IProduct;
    open_edit: (value: boolean) => void;
    seteditProduct: (product: IProduct) => void;
    setproductls_ind: (value: number) => void;
    index: number;
    setisOpen_Remove: (value: boolean) => void;
}


const ProductCard = ({ product, setisOpen_Remove, seteditProduct, open_edit, index, setproductls_ind }: Iprops) => {
    const { title, imageURL, description, price, colors, category, ...rest } = product;
    /* Handler */
    const onEdit = () => {
        open_edit(true);
        seteditProduct(product);
        setproductls_ind(index);
    }
    const on_remove = () => {
        setisOpen_Remove(true);
        seteditProduct(product);
        setproductls_ind(index);
    }
    return (
        <>
            <div className="max-w-sm md:max-w-lg mx-auto  md:mx-0 flex flex-col border p-5 rounded-md space-y-3 ">
                <Image url={imageURL} alt="picture" className="rounded-md h-52 w-full:object-cover " />
                <h2 className="text-2xl  h-[6vh]">{txtSlicer(title)} </h2>
                <p className="h-[6vh]">{txtSlicer(description)}</p>
                <div className='flex flex-row space-x-2 items-center h-[3vh] '>
                    {colors ? colors.map(color => <CircleColor color={color} key={color} />) : null}
                </div>
                <div className="flex items-center justify-between">
                    <p>{numberWithCommas(price)} $</p>
                    <div className="flex items-center space-x-5">
                        <p>{category?.name}</p>
                        <img className="w-10 h-10 rounded-full object-cover" src={category?.imageURL} alt={category?.name} />
                    </div>
                </div>
                <div className="flex items-center space-x-2  ">
                    <Button className="bg-blue-500 hover:bg-blue-600 " onClick={onEdit}>Edit</Button>
                    <Button className=" bg-red-500 hover:bg-red-600" onClick={on_remove} >remove</Button>
                </div>
            </div>
        </>
    )
}
export default ProductCard;