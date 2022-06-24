import React, {  useState } from 'react';
import { TiDeleteOutline } from "react-icons/ti";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
const SelectedItem = ({ prices, DeleteItems, Reset }) => {
    const [add, setAdd] = useState([])
    // const [Qut, setQut] = useState(1)
    // const [Total, setTotal] = useState(0)
    let count = 0;
    const Amount = (item, a) => {
        const ind = prices.indexOf(item);
        var Result = prices;
        if (a === true) {
            Result[ind].unit_price += item.unit_price;
            Result[ind].qty += 1;
            setAdd([...Result])
        }
        if (a === false) {
            Result[ind].unit_price -= 1;
            Result[ind].qty -= 1;
            setAdd([...Result])
        }
        // handlePrice(item)

    }
    for (const item of prices) {
        count = count + item.unit_price
    }
    /* ========================= =========================== */
    const submit = () => {
        if (count > 0) {
            confirmAlert({
                message: <div>
                    <h1 className='text-xl font-medium text-black'> Confirm to submit </h1>
                    <div>
                        <div>
                            {
                                prices.map(p => <div key={p.id} className='flex justify-between items-center'>
                                    <p className="px-6 py-4">
                                        {p?.name?.slice(0, 10)}
                                    </p>
                                    <p className="px-6 py-4 ">
                                        $ {p?.unit_price}
                                    </p>
                                </div>)
                            }
                        </div>
                        <div className="divider"></div>
                        <h1 className='text-right'>Total:{count}</h1>
                    </div>
                </div>,
                buttons: [
                    {
                        label: 'Yes',
                        onClick: () => alert('Click Yes')
                    },
                    {
                        label: 'No',
                    }
                ]
            });
        } else {
            confirmAlert({
                title: <h1 className='text-2xl text-center'>Not Item Select</h1>,

                buttons: [
                    {
                        label: 'Cancel',
                    }
                ]
            });
        }
    }



    return (
        <div className='fixed top-5'>
            <h1 className='text-2xl font-medium text-center mb-10'>List of Items That Have been selected</h1>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
                    <thead className="text-xs ">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                SL No.
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Item Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Qut
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Price
                            </th>

                            <th scope="col" className="px-6 py-3">

                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            prices.map((p, index) => <tr>
                                <th scope="row" className="px-6 py-4 font-medium ">
                                    {index + 1}
                                </th>
                                <td className="px-6 py-4">
                                    {p?.name?.slice(0, 9)}
                                </td>
                                <td className="px-6 py-4">
                                    <div className='flex gap-3 text-xl'>
                                        <span className='cursor-pointer' onClick={() => Amount(p, false)}>-</span>
                                        <span className='bg-white  rounded px-2'>{p.qty}</span>
                                        <span onClick={() => Amount(p, true)} className='cursor-pointer'>+</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    $ {p?.unit_price}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button onClick={() => DeleteItems(index)}>
                                        <TiDeleteOutline />
                                    </button>
                                </td>
                            </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
            <div className='mt-10'>
                <div className="divider"></div>
                <div className='flex justify-between item-center'>
                    <button onClick={() => Reset()} class="btn btn-outline btn-primary">Reset</button>
                    <h1 className='text-xl font-medium text-right'>Total Prices : $  {count}</h1>
                </div>
            </div>
            <h1 className='text-center mt-32'>
                <button onClick={submit} class="btn btn-outline btn-primary">Confirm</button>
            </h1>
        </div>
    );
};

export default SelectedItem;