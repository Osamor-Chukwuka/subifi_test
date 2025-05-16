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
import { AddDistanceToTravel, CallDistanceToTravel, DeleteDistanceToTravel } from '../../api-call/api';

const DistanceToTravel = () => {
    const [distance, setDistance] = useState([]);
    const [editPopUp, setEditPopup] = useState(false);
    const [AddPopUp, setAddPopup] = useState(false);
    const [showSubMenu, setShowSubMenu] = useState(null);
    const [newItem, setNewItem] = useState(null)
    //loading states
    const [addItemLoading, setAddItemLoading] = useState(false)
    const [deleteDistanceLoading, setDeleteDistanceLoading] = useState(false)
    //error states
    const [getItemsError, setGetItemsError] = useState(null);
    const [addItemErrror, setAddItemError] = useState(null);
    const [deleteDistanceError, setDeleteDistanceError] = useState(null);



    // Get distance Api
    const GetDistanceToTravel = async () => {
        try {
            const { response, jsonResponse, error } = await CallDistanceToTravel();
            if (error) {
                setGetItemsError(error)
                return;
            }

            if (response.ok) {
                setDistance(jsonResponse.data);
            } else {
                setGetItemsError(jsonResponse.apierror ? jsonResponse.apierror.message : jsonResponse.title);
                return;
            }
        } catch (error) {
            setGetItemsError(error.message)
            return
        }
    }

    // Handle distance menu toggle
    const toggleDistanceMenu = (index) => {
        setShowSubMenu(prevIndex => (prevIndex === index ? null : index));
    };


    // handle add new distance to travel
    const handleAddDistanceToTravel = async (e) => {
        e.preventDefault()
        setAddItemLoading(true)

        try {
            const { response, jsonResponse, error } = await AddDistanceToTravel(newItem)
            console.log(jsonResponse)

            if (error) {
                setAddItemError(error)
                setTimeout(() => {
                    setAddItemError(null)
                }, 3000);
                setAddItemLoading(false)
                return;
            }

            if (response.ok) {
                setAddPopup(false);
                setAddItemLoading(false);
                setNewItem('');
                GetDistanceToTravel()
            } else {
                setAddItemError(jsonResponse.apierror ? jsonResponse.apierror.message : jsonResponse.title)
                setTimeout(() => {
                    setAddItemError(null)
                }, 3000);
                setAddItemLoading(false)
                return;
            }
        } catch (error) {
            setAddItemLoading(false)
            return
        }
    }

    // handle delete distance to travel
    const handleDeleteDistanceToTravel = async (id) => {
        setDeleteDistanceLoading(true);
        try {
            const { response, jsonResponse, error } = await DeleteDistanceToTravel(id);
            if (error) {
                setDeleteDistanceError(error)
                setTimeout(() => {
                    setDeleteDistanceError(null)
                }, 3000);
                setDeleteDistanceLoading(false)
                return;
            }
            if (response.ok) {
                setDeleteDistanceLoading(false);

                GetDistanceToTravel();
            } else {
                setDeleteDistanceError(jsonResponse.title)
                setTimeout(() => {
                    setDeleteDistanceError(null)
                }, 3000);
                setDeleteDistanceLoading(false)
                return;
            }
        } catch (error) {
            setDeleteDistanceError(error.message)
            setDeleteDistanceLoading(false)
            return
        }
    }


    useEffect(() => {
        GetDistanceToTravel();
    }, []);


    return (
        <div>
            <div className='flex justify-center mb-4'>
                <div className='bg-white mt-4 mb-5 px-3 rounded-lg lookupsContiner'>
                    <div className="flex items-center">
                        <div className="flex items-start ps-1 pt-3 w-full lookupContainerListTittleDiv">
                            <h2 className='pe-2 pb-2 w-full font-semibold text-gray-700'>12. Distance To Travel</h2>
                            {getItemsError && <div className='w-full text-red-500 text-sm text-end'>{getItemsError}</div>}
                        </div>

                        <div className='flex justify-end lookupActionIconDiv'>
                            <CiCirclePlus onClick={() => setAddPopup(!AddPopUp)} className='pt-1 font-bold text-4xl cursor-pointer addIcon' />
                        </div>
                    </div>


                    <hr className='border border-gray-300 lookupCardHr' />
                    <div className="" id='cities'>
                        <div>
                            {distance.length > 0 ?
                                distance.map((element, index) => (
                                    <div key={index} className="pt-3">
                                        <div className="flex items-center p-2 border-b border-b-gray-300 rounded w-full">
                                            <div className='flex items-center lookupContainerListTittleDiv'>
                                                <span className='ps-4 pe-3 text-sm lookupContainerListTittle'>{element.description}</span>
                                            </div>
                                            <div className='flex justify-end lookupActionIconDiv'>
                                                <CiMenuKebab onClick={() => toggleDistanceMenu(index)} className='text-black text-xl cursor-pointer' />
                                            </div>

                                            {showSubMenu === index && (
                                                <div className='relative'>
                                                    <div className='top-[-2.5rem] right-8 z-50 absolute bg-white drop-shadow-lg rounded-lg w-32 h-24'>

                                                        <div className="flex pt-3 w-full">
                                                            <CiEdit onClick={() => setEditPopup(!editPopUp)} className='ms-5 pt-1 text-2xl cursor-pointer' />
                                                            <p onClick={() => setEditPopup(!editPopUp)} className='ps-2 pt-1 text-sm cursor-pointer'>Edit</p>
                                                        </div>

                                                        {!deleteDistanceLoading ?
                                                            <div className="flex justify-center pt-3 w-full">
                                                                <CiCircleMinus onClick={() => handleDeleteDistanceToTravel(element.id)} className='pt-1 text-2xl cursor-pointer' />
                                                                <p onClick={() => handleDeleteDistanceToTravel(element.id)} className='ps-2 pt-1 text-sm cursor-pointer'>Inactivate</p>
                                                            </div>
                                                            :
                                                            <div className="flex justify-center pt-3 w-full text-gray-300">
                                                                <CiCircleMinus className='pt-1 text-2xl cursor-pointer' />
                                                                <p className='ps-2 pt-1 text-sm cursor-pointer'>Inactivate</p>
                                                            </div>
                                                        }
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
                    <form onSubmit={handleAddDistanceToTravel}>
                        <div className='flex justify-end mb-6 cursor-pointer'>
                            <IoMdClose onClick={() => setAddPopup(!AddPopUp)} className='text-white text-4xl' />
                        </div>
                        <label className='text-white' for="add">Add</label>
                        <div className='relative flex'>
                            <input value={newItem} onChange={(e) => setNewItem(e.target.value)} className='p-2 outline-none w-[80vh]' type="text" name="add" id="add" />
                            <div className="right-0 absolute inset-y-0 flex items-center">
                                {!addItemLoading ?
                                    <button type='submit' className='pe-2 font-semibold text-md saveBtn'>Add</button>
                                    :
                                    <button disabled className='pe-2 font-semibold text-gray-300 text-md'>Add</button>
                                }
                            </div>
                        </div>

                        {addItemErrror && <p className='py-2 text-red-500 text-center'>{addItemErrror}</p>}
                    </form>
                </div>
            )}


            {/*  Show Error Messages  */}
            {deleteDistanceError && (
                <div className='top-0 right-0 z-50 fixed flex justify-center items-center bg-black bg-opacity-50 w-full h-full'>
                    <div>
                        <div className='flex justify-end ms-12 mb-6 w-full cursor-pointer'>
                            <IoMdClose onClick={() => setDeleteDistanceError(null)} className='text-white text-4xl' />
                        </div>
                        <p className='bg-white p-2 rounded-sm w-full text-red-500' for="add">{deleteDistanceError} </p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default DistanceToTravel