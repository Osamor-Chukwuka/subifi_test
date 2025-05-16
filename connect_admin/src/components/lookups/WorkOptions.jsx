import React, { useCallback, useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { CiMenuKebab } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";
import { PiPlusCircleLight } from "react-icons/pi";
import { CiEdit } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { details } from '../../screens/config'
import { CallWorkOptions } from '../../api-call/api';

const WorkOptionsLookup = () => {
    const [workOptions, setWorkOptions] = useState([]);
    const [editPopUp, setEditPopup] = useState(false);
    const [AddPopUp, setAddPopup] = useState(false);
    const [openIndex, setOpenIndex] = useState(null);
    const [showSubMenu, setShowSubMenu] = useState(null);
    //error states
    const [getItemsError, setGetItemsError] = useState(null);

    // Get work options Api
    const GetWorkOptions = async () => {
        try {
            const {response, jsonResponse, error} = await CallWorkOptions();

            if (error) {
                setGetItemsError(error)
                return;
            }

            if (response.ok) {
                setWorkOptions(jsonResponse.data);
                return
            } else {
                setGetItemsError(jsonResponse.apierror ? jsonResponse.apierror.message : jsonResponse.title)
                return;
            }

        } catch (error) {
            setGetItemsError(error.message)
            console.log(error)
        }
    }

    // Handle work-options menu toggle
    const toggleWorkOptionsMenu = (index) => {
        setShowSubMenu(prevIndex => (prevIndex === index ? null : index));
    };


    useEffect(() => {
        GetWorkOptions()
    }, []);


    return (
        <div>
            <div className='flex justify-center mb-4'>
                <div className='bg-white mt-4 mb-5 px-3 rounded-lg lookupsContiner'>
                    <div className="flex items-center">
                        <div className="flex items-start ps-1 pt-3 w-full lookupContainerListTittleDiv">
                            <h2 className='pe-2 pb-2 w-full font-semibold text-gray-700'>6. Work Options</h2>
                            {getItemsError && <div className='w-full text-red-500 text-sm text-end'>{getItemsError}</div>}
                        </div>

                        {/* <div className='flex justify-end lookupActionIconDiv'>
                            <CiCirclePlus onClick={() => setAddPopup(!AddPopUp)} className='pt-1 font-bold text-4xl cursor-pointer addIcon' />
                        </div> */}
                    </div>


                    <hr className='border border-gray-300 lookupCardHr' />


                    <div className="" id='cities'>

                        <div>
                            {workOptions.length > 0 ?
                                workOptions.map((element, index) => (
                                    <div className="pt-1">
                                        <div className="flex items-center p-2 border-b border-b-gray-300 rounded w-full">
                                            <div className='flex items-center lookupContainerListTittleDiv'>
                                                <span className='ps-4 pe-3 text-sm lookupContainerListTittle'>{element.name}</span>
                                            </div>
                                            {/* <div className='flex justify-end lookupActionIconDiv'>
                                                <CiMenuKebab onClick={() => toggleWorkOptionsMenu(index)} className='text-black text-xl cursor-pointer' />
                                            </div> */}

                                            {showSubMenu === index && (
                                                <div className='relative'>
                                                    <div className='top-[-2.5rem] right-8 z-50 absolute bg-white drop-shadow-lg rounded-lg w-32 h-24'>

                                                        <div className="flex pt-3 w-full">
                                                            <CiEdit onClick={() => setEditPopup(!editPopUp)} className='ms-5 pt-1 text-2xl cursor-pointer' />
                                                            <p onClick={() => setEditPopup(!editPopUp)} className='ps-2 pt-1 text-sm cursor-pointer'>Edit</p>
                                                        </div>

                                                        <div className="flex justify-center pt-3 w-full">
                                                            <CiCircleMinus className='pt-1 text-2xl cursor-pointer' />
                                                            <p className='ps-2 pt-1 text-sm cursor-pointer'>Inactivate</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))

                                : ''
                            }



                        </div>


                    </div>
                </div>
            </div>

            {/*  EDIT FIELDS  */}
            {editPopUp && (
                <div className='top-0 right-0 z-50 fixed flex justify-center items-center bg-black bg-opacity-50 w-full h-full'>
                    <form action="">
                        <div className='flex justify-end mb-6 cursor-pointer'>
                            <IoMdClose onClick={() => setEditPopup(!editPopUp)} className='text-white text-4xl' />
                        </div>
                        <label className='text-white' for="edit">Edit</label>
                        <div className='relative flex'>
                            <input className='p-2 w-[80vh]' type="text" name="edit" id="edit" />
                            <div className="right-0 absolute inset-y-0 flex items-center">
                                <button className='pe-2 font-semibold text-md saveBtn'>Save</button>
                            </div>
                        </div>

                    </form>
                </div>
            )}


            {/*  ADD FIELDS  */}
            {AddPopUp && (
                <div className='top-0 right-0 z-50 fixed flex justify-center items-center bg-black bg-opacity-50 w-full h-full'>
                    <form action="">
                        <div className='flex justify-end mb-6 cursor-pointer'>
                            <IoMdClose onClick={() => setAddPopup(!AddPopUp)} className='text-white text-4xl' />
                        </div>
                        <label className='text-white' for="add">Add</label>
                        <div className='relative flex'>
                            <input className='p-2 w-[80vh]' type="text" name="add" id="edit" />
                            <div className="right-0 absolute inset-y-0 flex items-center">
                                <button className='pe-2 font-semibold text-md saveBtn'>Add</button>
                            </div>
                        </div>

                    </form>
                </div>
            )}
        </div>
    )
}

export default WorkOptionsLookup;