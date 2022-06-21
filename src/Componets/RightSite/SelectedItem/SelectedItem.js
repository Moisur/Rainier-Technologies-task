import React, { useState } from 'react';
import { TiDeleteOutline } from "react-icons/ti";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
const SelectedItem = ({ prices }) => {
    let count = 0;
    const [n, sett] = useState(0)
    function handleChange(event) {
        const numberAdd = event.target.value
        sett(numberAdd)
    }

    for (const add of prices) {
        count = count + add.unit_price
    }
    const DeleteItems = (ID) => {
        console.log("Delete", ID)
    }
    /* ========================= =========================== */

    const submit = () => {
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => alert('Click Yes')
                },
                {
                    label: 'No',
                    onClick: () => alert('Click No')
                }
            ]
        });
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
                                    <input className='w-10' type="Number" onChange={handleChange} />
                                </td>
                                <td className="px-6 py-4">
                                    $ {p?.unit_price}
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
                <button onClick={submit} class="btn btn-secondary">Confirm</button>
            </h1>
        </div>
    );
};

export default SelectedItem;