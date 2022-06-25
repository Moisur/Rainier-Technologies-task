import React, { useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { toast } from 'react-toastify';

const SelectedItem = ({ prices, DeleteItems, Reset }) => {
    const [add, setAdd] = useState([])
    let count = 0;
    /* =============================  Product Amount control  ======================== */
    const Amount = (item, a) => {
        const ind = prices.indexOf(item);
        var Result = prices;
        if (a === true) {
            Result[ind].unit_price += parseInt(item.unit_price / item.qty);
            Result[ind].qty += 1;

        }
        if (a === false) {
            if (item.qty >1) {
                Result[ind].unit_price -= parseInt(item.unit_price / item.qty);
                Result[ind].qty -= 1;
            }else{
                toast.error('Qty is a 1 +')
                return;
            }

        }
        setAdd([...Result])
    }
/* =============================  Total prices add   ======================== */

    for (const item of prices) {
        count = count + item.unit_price
    }
    /* ========================= Modal  =========================== */
    const submit = () => {
        if (count > 0) {
            confirmAlert({
                message: <div>
                    <h1 className='text-xl font-medium text-black'> Confirm to submit </h1>
                    <div>
                            {
                                prices.map(p => <div key={p.id} className='flex justify-between items-center'>
                                    <p className="px-6 py-4">
                                        {p?.name?.slice(0, 10)}
                                    </p>
                                    <p className="px-6 py-4">
                                        {p?.qty}
                                    </p>
                                    <p className="px-6 py-4 ">
                                        $ {p?.unit_price}
                                    </p>
                                </div>)
                            }
                        </div>
                        <div className="divider"></div>
                        <h1 className='text-right font-bold text-xl '>Total:{count}</h1>
                </div>,
                buttons: [
                    {
                        label: 'confirm',
                        onClick: () => {
                            toast.success('success confirm Items ')
                        }
                    },
                    {
                        label: 'Cancel',
                        onClick: () => {
                            toast.success(' Cancel Items ')
                        }
                    }
                ]
            });
        } else {
            confirmAlert({
                title: <h1 className='text-2xl text-center'>Not Item Select</h1>,

                buttons: [
                    {
                        label: 'Cancel',
                        onClick: () => {
                            toast.success(' Cancel Items ')
                        }
                    }
                ]
            });
        }
    }

    return (
        <div className='md:fixed top-5'>
            <h1 className='text-2xl font-medium text-center mb-10'>List of Items That Have been selected</h1>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                {/* ==================  Items header ================== */}
                <table className="w-full text-sm text-left bg-slate-200 ">
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
                                Delete
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            prices.map((p, index) => <tr>
                                <th scope="row" className="px-6 py-4  ">
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
                                {/* ======================= single items delete =================== */}
                                <td className="px-6 py-4 text-right">
                                    <button onClick={() => DeleteItems(index)} className="btn btn-circle btn-outline">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
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
                 {/*========================== select all product delete and reset   =========================*/}
                <div className='flex justify-between item-center'>
                    <button onClick={() => Reset()} className="btn btn-outline btn-primary">Reset</button>
                    <h1 className='text-xl font-medium text-right'>Total Prices : $  {count}</h1>
                </div>
            </div>
            {/* ======================  product confirm  ========================*/}
            <h1 className='text-center mt-32'>
                <button onClick={submit} className="btn btn-outline btn-primary">Confirm</button>
            </h1>
        </div>
    );
};

export default SelectedItem;