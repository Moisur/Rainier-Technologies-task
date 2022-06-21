import React, { useEffect, useState } from 'react';

const AddToCard = () => {
    const [products, setProduct] = useState([])
    const [prices,setPrices]=useState([])
    useEffect(() => {
        fetch('https://fec-inventory-api.herokuapp.com/product-info')
            .then(res => res.json())
            .then(data => {
                setProduct(data)
            })
    },[])


   const ProductPrices=(id)=>{
    fetch(`https://fec-inventory-api.herokuapp.com/inventory-info?product_id=${id}`)
    .then(res => res.json())
    .then(data => {
        setPrices(data)
    })

   }
    return (
        <div>
            <h1>This is add items {products.length}</h1>
            <div>
                <div className='grid grid-cols-2'>
                    {
                        products.map(product =><div
                            key={product.id}
                            >
                            <h1> {product.name}</h1>
                            <button onClick={()=>ProductPrices(product.id)} className='btn bg-amber-300'>Add me</button>
                        </div>)
                    }
                </div>
            </div>
        </div>
    );
};

export default AddToCard;