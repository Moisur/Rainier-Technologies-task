import React, { useState } from 'react';
import { TiDeleteOutline } from "react-icons/ti";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
const SelectedItem = ({ prices }) => {
    console.log(prices)
    let count = 0;
    const [qut, setQut] = useState(1)
    for (const add of prices) {
        count = count + add.unit_price * qut
    }
    const DeleteItems = (ID) => {
        console.log("Delete", ID)
    }
    const Addition = (ID) => {
        console.log(ID)
        console.log(prices)
        // for (const add of prices) {
        //     if (add.id === ID) {
        //         setQut(qut + 1)
        //     }
        // }
    }
    /* ========================= =========================== */

    const submit = () => {
        if (count > 0) {
            confirmAlert({
                title: 'Confirm to submit',
                message: <div>
                    <div>

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
                message: 'Are you no sure .',
                buttons: [
                    {
                        label: 'No',
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
                                    {p?.note.slice(0, 6)}
                                </td>
                                <td className="px-6 py-4">
                                    <div className='flex gap-3 text-xl'>
                                        <span>-</span>
                                        <span className='bg-white  rounded px-2'>{qut}</span>
                                        <span onClick={()=>Addition(p?.id)} className='cursor-pointer'>+</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    $ {p?.unit_price * qut}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button onClick={DeleteItems(p?.id)}>
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
                <h1 className='text-xl font-medium text-right'>Total Prices : $  {count}</h1>
            </div>
            <h1 className='text-center mt-30'>
                <button onClick={submit} className="btn btn-secondary">Confirm</button>

            </h1>
        </div>
    );
};

export default SelectedItem;