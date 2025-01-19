import { ChangeEvent, FormEvent, useState } from 'react'
import ProductCard from './Components/ProductCards/ProductCard'
import Model from './Components/Ui/Model'
import { categories, colors, formInputsList, productList } from './Data/Data'
import Button from './Components/Ui/Button'
import Input from './Components/Ui/Input'
import { ProductValidation } from './Validation'
import ErrorMsg from './Components/ErrorMsg/ErrorMsg'
import CircleColor from './Components/CircleColor/CircleColor'
import { v4 as uuid } from 'uuid';
import Select from './Components/Ui/Select'
import { IProduct } from './InterFaces/InterFace'
import { ProductNameTypes } from './Type/Type'
import toast, { Toaster } from 'react-hot-toast';


const defaultProduct: IProduct = {
  title: '',
  description: '',
  price: "",
  imageURL: '',
  colors: [],
  category: {
    name: "",
    imageURL: "",
  }
};
const App = () => {
  /*----function remove item --- */
  const remove_item = () =>{
    setisOpen_Remove(true);
    const filtered = productls.filter( product => product.id !== editProduct.id)

    setProductls(filtered)
  } 
  /*---- End function remove item --- */ 

  /* -----State-----*/
  const [editProduct, seteditProduct] = useState(defaultProduct)
  const [selected, setSelected] = useState(categories[0])
  const [productls, setProductls] = useState(productList)
  const [productls_ind, setproductls_ind] = useState<number>(0)
  const [product, setProduct] = useState<IProduct>(defaultProduct)
  const [isOpen, setIsOpen] = useState(false)
  const [isOpen_edit, setIsOpen_edit] = useState(false)
  const [isOpen_Remove, setisOpen_Remove] = useState(false)
  const [Error, setError] = useState({
    title: '',
    description: '',
    price: "",
    imageURL: '',
  })
  const [tempColor, setTempColor] = useState<string[]>([])

  /* -----End State-----*/


  /* ------ Handler --------*/

  function open_modal() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
    setError({
      title: '',
      description: '',
      price: '',
      imageURL: '',
    });
    setProduct(defaultProduct)
  }
  function open_Edit_modal() {
    setIsOpen_edit(true)
  }
  function open_Remove_modal() {
    setIsOpen_edit(true)
  }

  function close_Edit_modal() {
    setIsOpen_edit(false)
    setError({
      title: '',
      description: '',
      price: '',
      imageURL: '',
    });
    setProduct(defaultProduct)
  }
  function close_Remove_modal() {
    setisOpen_Remove(false)
  }

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProduct({
      ...product,
      [name]: value,
    })
    setError({
      ...Error,
      [name]: ""
    })

  }
  const onChangeHandler_edit = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    seteditProduct({
      ...editProduct,
      [name]: value,
    })
    setError({
      ...Error,
      [name]: ""
    })

  }

  const OnsubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let { description, imageURL, price, title } = product;
    const error = ProductValidation({ title, description, imageURL, price: price })

    // Validation 
    const hasErrorMsg = Object.values(error).some(Value => Value === "") && Object.values(error).every(value => value === "");
    if (!hasErrorMsg) {
      return setError(error);
    }
    setProductls(prev => [{ ...product, id: uuid(), colors: tempColor, category: selected }, ...prev]);
    setProduct(defaultProduct);
    setTempColor([]);
    setIsOpen(false);

  }


  /*-------Submit Edit ----------------- */
  const OnsubmitEditHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let { description, imageURL, price, title } = editProduct;
    const error = ProductValidation({ title, description, imageURL, price: price })

    // Validation 
    const hasErrorMsg = Object.values(error).some(Value => Value === "") && Object.values(error).every(value => value === "");
    if (!hasErrorMsg) {
      return setError(error);
      console.log("error")
    }
    const update_product = [...productls];
    update_product[productls_ind] = { ...editProduct, colors: Array.from(new Set([...tempColor, ...editProduct.colors])) };
    setProductls(update_product);
    setTempColor([]);
    setIsOpen_edit(false);
    toast.success('Done Edit');

  }

   /*-------End Submit Edit ----------------- */


  const OnsubmitRemoveHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setisOpen_Remove(false);
    toast.success('Done Remove');

  }
 

  /* ------ End Handler --------*/


  /* ------ Render Card --------*/
  const RenderProduct = productls.map((product, index) => <ProductCard key={product.id} product={product} seteditProduct={seteditProduct} open_edit={setIsOpen_edit} index={index} setproductls_ind={setproductls_ind} setisOpen_Remove={setisOpen_Remove} />)
  /* ------ End Render Card --------*/


  /* ------Render Form Add Product --------*/
  const RenderFormInputList = formInputsList.map(input =>
    <div className='flex flex-col  space-y-3' key={input.id}>
      <label className='' htmlFor={input.id}>{input.label}</label>
      <Input type='text' name={input.name} id={input.id} value={product[input.name]} onChange={onChangeHandler} />
      {Error[input.name] ? <ErrorMsg msg={Error[input.name]} /> : null}
    </div>
  )
  /* ------End Render Form Add Product --------*/

  /*-----Render Color */
  const RenderColor = colors.map(color => (
    <CircleColor
      color={color}
      key={color}
      onClick={() => {
        if (editProduct.colors.includes(color)) {
          // Remove the color from editProduct.colors if it is already present
          seteditProduct(prev => ({
            ...prev,
            colors: prev.colors.filter(c => c !== color)
          }));
        } else {
          // Add the color to editProduct.colors if it is not present
          seteditProduct(prev => ({
            ...prev,
            colors: [...prev.colors, color]
          }));
        }
      }}
    />
  ));




  /*-----End Render Color */

  /* ------Render Form Edit Product --------*/
  const RenderFormInputList_Edit = (id: string, label: string, name: ProductNameTypes) => {
    return (
      <div className='flex flex-col  space-y-3' key={
        id
      } >
        <label className='' htmlFor={id}>
          {label}
        </label>
        <Input type='text' name={name} id={id} value={editProduct[name]} onChange={onChangeHandler_edit} />
        {Error[name] ? <ErrorMsg msg={Error[name]} /> : null}
      </div >
    )
  }
  /* ------End Render Form Edit Product --------*/



  return (
    <main className='container'>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <div className='p-5 ssm:flex ssm:justify-center lg:justify-end'>
        <Button width='w-auto' className="  md:w-full lg:w-fit bg-blue-600" onClick={open_modal} >Add Product</Button>
      </div>
      {/*---Add Product  */}
      <Model close={close} open_modal={open_modal} isOpen={isOpen} >
        <form onSubmit={OnsubmitHandler} className='flex flex-col justify-center space-y-4 w-full py-3 px-2'>
          <h2 className='text-2xl'>Add New Product</h2>
          {RenderFormInputList}
          <Select selected={selected} setSelected={setSelected} />
          <div className='flex flex-row space-x-2  items-end'>
            {colors ? colors.map(color => <CircleColor color={color} key={color} onClick={() => {
              if (tempColor.includes(color)) {
                setTempColor(preve => preve.filter(item => item !== color))
                return
              }
              setTempColor((preve) => [...preve, color])
            }
            } />) : null}
          </div>

          <div className=' m-0 flex flex-row   space-y-2  items-end flex-wrap'>
            {tempColor ? tempColor.map(color =>
              <span className={`justify-end py-1 rounded px-2 text-white  space-y-2 mr-1`} style={{ backgroundColor: color }} key={color}>{color}</span>
            ) : null}
          </div>

          <div className='flex  flex-row space-x-3 '>
            <Button width='w-full' className=" bg-blue-500 hover:bg-blue-600 " type='submit'>Add</Button>
            <Button width='w-full' className=" bg-gray-500 hover:bg-gray-600" onClick={close} type="button">Cancel</Button>
          </div>
        </form>

      </Model>
      {/*---End  Add Product  */}
      {/*---Edit Product  */}
      <Model close={close_Edit_modal} open_modal={open_Edit_modal} isOpen={isOpen_edit} >
        <form onSubmit={OnsubmitEditHandler} className='flex flex-col justify-center space-y-4 w-full py-3 px-2'>
          <h2 className='text-2xl'>Edit On My Product</h2>
          {RenderFormInputList_Edit("title", "Product title", "title")}
          {RenderFormInputList_Edit("Description", "Product Description", "description")}
          {RenderFormInputList_Edit("Image", "Product Image URL", "imageURL")}
          {RenderFormInputList_Edit("ProductPrice", "Product Price", "price")}
          <Select selected={editProduct.category} setSelected={value => seteditProduct({ ...editProduct, category: value })} />

          <div className=' m-0 flex flex-row   space-y-2  items-end flex-wrap'>{RenderColor}</div>
          <div className='m-0 flex flex-row  space-y-2 items-end flex-wrap'>
            {editProduct.colors.map(color => (
              <span
                className={`justify-end py-1 ml-1 rounded px-2 text-white`}
                style={{ backgroundColor: color }}
                key={color}
              >
                {color}
              </span>

            ))}
          </div>
          <div className='flex  flex-row space-x-3 '>

            <Button width='w-full' className=" bg-blue-500 hover:bg-blue-600 " type='submit'>Submit</Button>
            <Button width='w-full' className=" bg-gray-500 hover:bg-gray-600" onClick={close_Edit_modal} type="button">Cancel</Button>
          </div>
        </form>

      </Model>
      {/*---End  Edit Product  */}
      {/*---Remove Product  */}
      <Model close={close_Remove_modal} open_modal={open_Remove_modal} isOpen={isOpen_Remove} >
        <form onSubmit={OnsubmitRemoveHandler} className='flex flex-col justify-center space-y-4 w-full py-3 px-2 backdrop-blur-sm'>
          <h2 className='text-2xl'>Remove Product</h2>
          <p>Are u Sure To remove item ?</p>
          <div className='flex  flex-row space-x-3 '>

            <Button width='w-full' className=" bg-red-400 hover:bg-red-600 " type='submit' onClick={remove_item}>Confirm</Button>
            <Button width='w-full' className=" bg-gray-400 hover:bg-gray-600" onClick={close_Remove_modal} type="button">Cancel</Button>
          </div>
        </form>

      </Model>
      {/*---End Remove Product  */}
      {/*---Render Product  */}
      <div className='p-5 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3	xl:grid-cols-4 gap-4  '>{RenderProduct}</div>
      {/*---End Render Product  */}
    </main>
  )
}

export default App
