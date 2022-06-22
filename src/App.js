import { useEffect, useState } from "react";
import SelectedItem from "./Componets/RightSite/SelectedItem/SelectedItem";

function App() {
  const [products, setProduct] = useState([])
  const [prices, setPrices] = useState([])
  const [Names, setSetName] = useState([])
  useEffect(() => {
    fetch('https://fec-inventory-api.herokuapp.com/product-info')
      .then(res => res.json())
      .then(data => {
        setProduct(data)
      })
  }, [])

  const ProductPrices = (id,name) => {
    fetch(`https://fec-inventory-api.herokuapp.com/inventory-info?product_id=${id}`)
      .then(res => res.json())
      .then(data => {
        const AddProduct = [...prices, ...data]
        const AddNames = [{Names,name}]
        setPrices(AddProduct)
        setSetName(AddNames)
      })

  }
  return (
    <div className="p-5">
      <h1 className="text-2xl font-medium mb-5">Dashboard {'>'} Supply Room </h1>
      <div className="flex gap-8">
        <div className="w-8/12">
          <div>
            <div className='grid grid-cols-2 gap-6'>
              {
                products.map(product => <div className="bg-slate-200 p-4 rounded-lg"
                  key={product.id}
                >
                  <div className="flex gap-5">
                    <div className={`w-32 h-[100px]  bg-[#f88379] rounded-md`}>
                    </div>
                    <div className="flex justify-between items-center gap-1">
                      <div className="w-7/12">
                        <h1> {product.name.slice(0, 10)}</h1>
                        <h1> {product.description.slice(0,50)}</h1>
                      </div>
                      <div className="w-5/12"> 
                        <button onClick={() => ProductPrices((product.id),(product.name))} className='btn tex-sm bg-amber-300 border-0'>Add to List</button>
                      </div>
                    </div>
                  </div>
                </div>)
              }
            </div>
          </div>
        </div>
        <div className="w-4/12 ">
          <SelectedItem Name={Names} prices={prices}></SelectedItem>
        </div>
      </div>
    </div>
  );
}

export default App;
