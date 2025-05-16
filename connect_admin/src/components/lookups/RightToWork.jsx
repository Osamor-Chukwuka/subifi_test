import React, { useCallback, useEffect, useState } from 'react';
import { addDays } from 'date-fns';
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { CiMenuKebab } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";
import subscribtionLogoBlack from "../../assets/subscribtionLogoBlack.png";
import { PiPlusCircleLight } from "react-icons/pi";
import { CiEdit } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { details } from '../../screens/config'
import { AddRightToWork, CallRightToWork, DeleteRightToWork, EditRightToWork } from '../../api-call/api';

export const RightToWork = () => {
    const [right, setRights] = useState([])
    const [editPopUp, setEditPopup] = useState(false);
    const [AddPopUp, setAddPopup] = useState(false);
    const [showSubMenu, setShowSubMenu] = useState(null);
    const [newItem, setNewItem] = useState(null)
    const [rank, setRank] = useState(null)
    const [selectedWork, setSelectedWork] = useState(null)

    //loading states
    const [addItemLoading, setAddItemLoading] = useState(false)
    const [deleteRightLoading, setDeleteRightLoading] = useState(false)
    //error states
    const [getItemsError, setGetItemsError] = useState(null);
    const [addItemErrror, setAddItemError] = useState(null);
    const [deleteRightError, setDeleteRightError] = useState(null);

    // get right to work Api
    const getRightToWork = useCallback(async () => {
        try {
            const {response, jsonResponse, error} = await CallRightToWork()
            if (error) {
                setGetItemsError(error)
                return;
            }
            if (response.ok) {
                setRights(jsonResponse.data);
                return
            } else {
                setGetItemsError(jsonResponse.apierror ? jsonResponse.apierror.message : jsonResponse.title)
                return;
            }
        } catch (error) {
            setGetItemsError(error.message)
            console.log(error)
        }
    }, [])

    // Handle right to work menu toggle
    const toggleRightMenu = (index) => {
        setShowSubMenu(prevIndex => (prevIndex === index ? null : index));
    };

    // handle add new right to work
    const handleAddRightToWork = async (e) => {
        e.preventDefault()
        setAddItemLoading(true)

        try {
            const { response, jsonResponse, error } = await AddRightToWork(newItem, rank)
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
                setRank('');
                getRightToWork();
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

    // handle edit right to work
    const handleEditRightToWork = async (e) => {
        e.preventDefault()
        setAddItemLoading(true)

        try {
            const { response, jsonResponse, error } = await EditRightToWork(selectedWork.id, newItem, rank)
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
                setEditPopup(false);
                setAddItemLoading(false);
                setNewItem('');
                setRank('');
                getRightToWork();
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

    // handle delete right to work
    const handleDeleteRightToWork = async (id) => {
        setDeleteRightLoading(true);
        try {
            const { response, jsonResponse, error } = await DeleteRightToWork(id);
            if (error) {
                setDeleteRightError(error)
                setTimeout(() => {
                    setDeleteRightError(null)
                }, 3000);
                setDeleteRightLoading(false)
                return;
            }
            if (response.ok) {
                setDeleteRightLoading(false);

                getRightToWork();
            } else {
                setDeleteRightError(jsonResponse.title)
                setTimeout(() => {
                    setDeleteRightError(null)
                }, 3000);
                setDeleteRightLoading(false)
                return;
            }
        } catch (error) {
            setDeleteRightError(error.message)
            setDeleteRightLoading(false)
            return
        }
    }



    useEffect(() => {
        getRightToWork()
    }, [getRightToWork])


    return (
        <div>
            <div className='flex justify-center mb-4'>
                <div className='bg-white mt-4 mb-5 px-3 rounded-lg lookupsContiner'>
                    <div className="flex items-center">
                        <div className="flex items-start ps-1 pt-3 w-full lookupContainerListTittleDiv">
                            <h2 className='pe-2 pb-2 w-full font-semibold text-gray-700'>8. Right to Work</h2>
                            {getItemsError && <div className='w-full text-red-500 text-sm text-end'>{getItemsError}</div>}
                        </div>

                        <div className='flex justify-end lookupActionIconDiv'>
                            <CiCirclePlus onClick={() => setAddPopup(!AddPopUp)} className='pt-1 font-bold text-4xl cursor-pointer addIcon' />
                        </div>
                    </div>


                    <hr className='border border-gray-300 lookupCardHr' />


                    <div className="" id='cities'>

                        <div>

                            {right.length > 0 ?
                                right.map((element, index) => (
                                    <div className="pt-3">
                                        <div className="flex items-center p-2 border-b border-b-gray-300 rounded w-full">
                                            <div className='flex items-center lookupContainerListTittleDiv'>
                                                <span className='ps-4 pe-3 text-sm lookupContainerListTittle'>{index + 1}</span>
                                                <span className='ps-4 pe-3 text-sm lookupContainerListTittle'>{element.name}</span>
                                            </div>
                                            <div className='flex justify-end lookupActionIconDiv'>
                                                <CiMenuKebab onClick={() => toggleRightMenu(index)} className='text-black text-xl cursor-pointer' />
                                            </div>

                                            {showSubMenu === index && (
                                                <div className='relative'>
                                                    <div className='top-[-2.5rem] right-8 z-50 absolute bg-white drop-shadow-lg rounded-lg w-32 h-24'>

                                                        <div className="flex pt-3 w-full">
                                                            <CiEdit onClick={() => { setEditPopup(!editPopUp), setSelectedWork(element) }} className='ms-5 pt-1 text-2xl cursor-pointer' />
                                                            <p onClick={() => { setEditPopup(!editPopUp), setSelectedWork({ element, rank: index + 1 }) }} className='ps-2 pt-1 text-sm cursor-pointer'>Edit</p>
                                                        </div>

                                                        {!deleteRightLoading ?
                                                            <div className="flex justify-center pt-3 w-full">
                                                                <CiCircleMinus onClick={() => handleDeleteRightToWork(element.id)} className='pt-1 text-2xl cursor-pointer' />
                                                                <p onClick={() => handleDeleteRightToWork(element.id)} className='ps-2 pt-1 text-sm cursor-pointer'>Inactivate</p>
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
                                :
                                null
                            }



                        </div>


                    </div>
                </div>
            </div>


            {/*  EDIT FIELDS  */}
            {editPopUp && (
                <div className='top-0 right-0 z-50 fixed flex justify-center items-center bg-black bg-opacity-50 w-full h-full'>
                    <form onSubmit={handleEditRightToWork} className='space-y-4' action="">
                        <div className='flex justify-end mb-6 cursor-pointer'>
                            <IoMdClose onClick={() => setEditPopup(!editPopUp)} className='text-white text-4xl' />
                        </div>
                        <div>
                            <label className='mb-3 text-white' for="add">Edit</label>
                            <div className='mt-4'>
                                <input value={newItem} onChange={(e) => setNewItem(e.target.value)} className='p-2 rounded-md outline-none w-[80vh]' type="text" placeholder={selectedWork.element.name} name="edit" id="edit" />
                            </div>
                        </div>
                        <div className=''>
                            <div className=''>
                                <input value={rank} onChange={(e) => setRank(e.target.value)} className='p-2 rounded-md outline-none w-[80vh]' type="number" placeholder={selectedWork.rank} name="edit" id="edit" />
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-center items-center">
                                {!addItemLoading ?
                                    <button type='submit' className='bg-[#015693] rounded-md w-20 h-8 font-semibold text-md text-white'>Edit</button>
                                    :
                                    <button disabled className='bg-[#015693] rounded-md w-20 h-8 font-semibold text-md text-white'>Edit</button>
                                }
                            </div>

                        </div>

                        {addItemErrror && <p className='py-2 text-red-500 text-center'>{addItemErrror}</p>}

                    </form>
                </div>
            )}


            {/*  ADD FIELDS  */}
            {AddPopUp && (
                <div className='top-0 right-0 z-50 fixed flex justify-center items-center bg-black bg-opacity-50 w-full h-full'>
                    <form onSubmit={handleAddRightToWork} className='space-y-4'>
                        <div className='flex justify-end mb-6 cursor-pointer'>
                            <IoMdClose onClick={() => setAddPopup(!AddPopUp)} className='text-white text-4xl' />
                        </div>
                        <div>
                            <label className='mb-3 text-white' for="add">Add</label>
                            <div className='mt-4'>
                                <input value={newItem} onChange={(e) => setNewItem(e.target.value)} className='p-2 rounded-md outline-none w-[80vh]' type="text" placeholder='Name' name="add" id="add" />
                            </div>
                        </div>
                        <div>
                            <div className=''>
                                <input value={rank} onChange={(e) => setRank(e.target.value)} className='p-2 rounded-md outline-none w-[80vh]' type="number" placeholder='rank' name="add" id="add" />
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-center items-center">
                                {!addItemLoading ?
                                    <button type='submit' className='bg-[#015693] rounded-md w-20 h-8 font-semibold text-md text-white'>Add</button>
                                    :
                                    <button disabled className='bg-[#015693] rounded-md w-20 h-8 font-semibold text-md text-white'>Add</button>
                                }
                            </div>

                        </div>

                        {addItemErrror && <p className='py-2 text-red-500 text-center'>{addItemErrror}</p>}


                    </form>
                </div>
            )}

            {/*  Show Error Messages  */}
            {deleteRightError && (
                <div className='top-0 right-0 z-50 fixed flex justify-center items-center bg-black bg-opacity-50 w-full h-full'>
                    <div>
                        <div className='flex justify-end ms-12 mb-6 w-full cursor-pointer'>
                            <IoMdClose onClick={() => setDeleteRightError(null)} className='text-white text-4xl' />
                        </div>
                        <p className='bg-white p-2 rounded-sm w-full text-red-500' for="add">{deleteRightError} </p>
                    </div>
                </div>
            )}
        </div>
    )
}