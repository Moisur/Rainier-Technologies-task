import { useEffect, useState } from "react";
import SelectedItem from "./Componets/RightSite/SelectedItem/SelectedItem";
import Spinner from "./Componets/Spinner/Spinner";
import { ImCross } from "react-icons/im";
function App() {
  const [products, setProduct] = useState([])
  const [prices, setPrices] = useState([])
  const [SpinnerLod, setSpinnerLod] = useState(true)
  useEffect(() => {
    fetch('https://fec-inventory-api.herokuapp.com/product-info')
      .then(res => res.json())
      .then(data => {
        if (data) {
          setProduct(data)
          setSpinnerLod(false)
        }
      })
  }, [])

  // const handleChange = (item, d) => {
  //   const ind = prices.indexOf(item);
  //   const arr = prices;
  //   arr[ind].amount += d;

  //   if (arr[ind].amount === 0) arr[ind].amount = 1;
  //   setPrices([...arr]);
  // };










  const DeleteItems = (index) => {
    var result = prices
    result.splice(index, 1)
    setPrices([...result])
  }
  const Reset = () => {
    setPrices([])
  }
  const ProductPrices = (id, name, index) => {
    fetch(`https://fec-inventory-api.herokuapp.com/inventory-info?product_id=${id}`)
      .then(res => res.json())
      .then(data => {
        var AddProduct = [...prices, ...data]
        AddProduct[AddProduct.length - 1].name = name;
        setPrices(AddProduct)
      })
  }

  /* ===================== option================== */
  const [choice, setChoice] = useState();
  const Delete = () => {
    setChoice('')
  }

  return (
    <div className="p-5">
      <h1 className="text-2xl font-medium mb-5">Dashboard {'>'} Supply Room </h1>
      <div className="my-4 flex items-center  gap-4 ">
        <div>
          <input type="text" className="input w-52 max-w-xs border-amber-300" />
        </div>
        <select
          value={choice}
          defaultValue={"default"}
          onChange={(e) => setChoice(e.target.value)}
          className="select select-success w-32 max-w-xs"
        >
          <option value={"Text1"} disabled>Text1</option>
          <option value={"Text2"}>Text2</option>
          <option value={"Text3"}>Text3</option>
          <option value={"Text4"}>Text4</option>
          <option value={"Text5"} >Text5</option>
        </select>

        <select
          value={choice}
          defaultValue={"default"}
          onChange={(e) => setChoice(e.target.value)}
          className="select select-success w-32 max-w-xs"
        >
          <option value={"Text"} disabled>Text</option>
          <option value={"Text"}>Text</option>
          <option value={"Text"}>Text</option>
          <option value={"Text"}>Text</option>
          <option value={"Text"} >Text</option>
        </select>
        <div >
          {
            choice && <div className="w-20 flex justify-center items-center gap-4">
              <h1>{choice}</h1>
              <span onClick={() => Delete()}><ImCross /></span>
            </div>
          }

        </div>

      </div>
      <div className="flex gap-8">
        <div className="w-8/12">
          {
            SpinnerLod && <Spinner></Spinner>
          }
          <div>
            <div className='grid grid-cols-2 gap-6'>
              {
                products.map((product, index) => <div className="bg-slate-200 p-4 rounded-lg"
                  key={product.id}
                >
                  <div className="flex gap-5">
                    <div className={`w-32 h-[100px]  bg-[#f88379] rounded-md`}>
                    </div>
                    <div className="flex justify-between items-center gap-1">
                      <div className="w-7/12">
                        <h1> {product.name.slice(0, 10)}</h1>
                        <h1> {product.description.slice(0, 50)}</h1>
                      </div>
                      <div className="w-5/12">
                        <button onClick={() => ProductPrices((product?.id), (product?.name), index)} className='btn tex-sm bg-amber-300 border-0'>Add to List</button>
                      </div>
                    </div>
                  </div>
                </div>)
              }
            </div>
          </div>
        </div>
        <div className="w-4/12 ">
          <SelectedItem DeleteItems={DeleteItems} prices={prices} Reset={Reset} ></SelectedItem>
        </div>
      </div>
    </div>
  );
}

export default App;
