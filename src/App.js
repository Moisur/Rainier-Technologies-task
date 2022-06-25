import { useEffect, useState } from "react";
import SelectedItem from "./Componets/RightSite/SelectedItem/SelectedItem";
import Spinner from "./Componets/Spinner/Spinner";
import { ImCross } from "react-icons/im";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const [products, setProduct] = useState([])
  const [prices, setPrices] = useState([])
  const [SpinnerLod, setSpinnerLod] = useState(true)
  // const [color,setColor]=useState(0)

  /* ================ Inventory Product Fetch ============================ */
  useEffect(() => {
    fetch('https://fec-inventory-api.herokuapp.com/product-info')
      .then(res => res.json())
      .then(data => {
        if (data) {
          setProduct(data)
          setSpinnerLod(false)
          // const colorAdd =parseInt(Math.random() * 10000)
          // setColor(colorAdd)

        }
      })
  }, [])

  /* =================== single items delete  ============================ */

  const DeleteItems = (index) => {
    var result = prices
    result.splice(index, 1)
    setPrices([...result])
  }

  /* =================== ALl  items delete || Reset  ============================ */

  const Reset = () => {
    setPrices([])
  }


  /* =================== product items single click and    ============================ */

  const ProductPrices = (id, name) => {
    fetch(`https://fec-inventory-api.herokuapp.com/inventory-info?product_id=${id}`)
      .then(res => res.json())
      .then(data => {
        var AddProduct = [...prices, ...data]
        AddProduct[AddProduct.length - 1].name = name;
        setPrices(AddProduct)
      })
  }

  /* ===================== option items click ==================== */
  const [choice, setChoice] = useState();
  const Delete = () => {
    setChoice('')
  }

  return (
    <div className="p-5">
      <h1 className="text-2xl font-medium mb-5">Dashboard {'>'} Supply Room </h1>
      {/* ========================== start option work============================= */}
      <div className="my-4 flex items-center  gap-1 md:gap-4 ">
        <div>
          <input type="text" className="input  hidden md:block w-52 max-w-xs border-primary outline-none" />
        </div>
        <select
          value={choice}
          onChange={(e) => setChoice(e.target.value)}
          className="select  w-32 max-w-xs border-primary outline-none"
        >
          <option value={"Text1"} >Text1</option>
          <option value={"Text2"}>Text2</option> 
          <option value={"Text3"}>Text3</option>
          <option value={"Text4"}>Text4</option>
          <option value={"Text5"} >Text5</option>
        </select>
        <select
          value='we'
          defaultValue={"hi "}
          contextMenu='hello '
          onChange={(e) => setChoice(e.target.value)}
          className="select  w-32 max-w-xs  border-primary outline-none"
        >
          <option value={"filter1"} >filter1</option>
          <option value={"filter2"}>filter2</option>
          <option value={"filter3"}>filter3</option>
          <option value={"filter4"}>filter4</option>
          <option value={"filter5"} >filter5</option>
        </select>
        <div >
          {/* ========================== option Selector Delete ============================= */}
          {
            choice && <div className="w-20 flex justify-center items-center gap-4 p-2 badge badge-primary badge-outline">
              <h1>{choice}</h1>
              <span className="cursor-pointer" onClick={() => Delete()}><ImCross /></span>
            </div>
          }

        </div>
      </div>
      {/* ========================== end option work============================= */}
      {/* ================================ start Product area========================= */}

      <div className=" w-full md:flex gap-8 ">
        <div className="w-full md:w-7/12 h-auto  ">
          {/* Fetch to product waiting Spinner   */}
          {
            SpinnerLod && <Spinner></Spinner>
          }
          <div>
            {/* ================ product card =========================== */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 '>
              {
                products.map((product, index) => <div className="bg-slate-200 p-4 rounded-lg "
                  key={product.id}
                >
                  <div className="flex gap-5">
                  {/* ${products?.length % 2===0?'bg-[#fdc201]':products?.length % 3===1?'bg-[#3F90FC]':'bg-[#ff7316]'} Note Working*/}
                    <div className={`w-32 h-[100px] rounded-md bg-[#c3c1c1]`}>
                    </div>
                    <div className="flex justify-between items-center gap-1">
                      <div className="w-7/12">
                        <h1 className="text-xl font-medium text-black uppercase"> {product.name.slice(0, 10)}</h1>
                        <h1 className="text-md  text-black"> {product.description.slice(0, 50)}</h1>
                      </div>
                      <div className="w-5/12">
                        <button onClick={() => ProductPrices((product?.id), (product?.name))} className="btn btn-outline btn-primary">Add List</button>
                      </div>
                    </div>
                  </div>
                </div>)
              }
            </div>
          </div>
        </div>
        {/* ============== selected Items ======================== */}
        <div className="w-full md:w-5/12 mx-auto ">
          <SelectedItem DeleteItems={DeleteItems} prices={prices} Reset={Reset} ></SelectedItem>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
