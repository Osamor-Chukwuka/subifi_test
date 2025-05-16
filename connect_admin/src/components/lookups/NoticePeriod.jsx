import React, { useCallback, useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
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
import { AddNoticePeriod, CallNoticePeriod, DeleteNoticePeriod, EditNoticePeriod } from '../../api-call/api';

const NoticePeriod = () => {
    const [periods, setPeriods] = useState([])
    const [editPopUp, setEditPopup] = useState(false);
    const [AddPopUp, setAddPopup] = useState(false);
    const [showSubMenu, setShowSubMenu] = useState(null);
    const [newNoticePeriod, setNewNoticePeriod] = useState(null)
    const [selectedPeriod, setSelectedPeriod] = useState(null)
    //loading states
    const [addItemLoading, setAddItemLoading] = useState(false)
    const [deleteNoticePeriodLoading, setDeleteNoticePeriodLoading] = useState(false)
    //error states
    const [getItemsError, setGetItemsError] = useState(null);
    const [addItemErrror, setAddItemError] = useState(null);
    const [deleteNoticePeriodError, setDeleteNoticePeriodError] = useState(null);

    const getNoticePeriod = useCallback(async () => {
        try {
            const {response, jsonResponse, error} = await CallNoticePeriod()
            if (error) {
                setGetItemsError(error)
                return;
            }
            if (response.ok) {
                setPeriods(jsonResponse.data);
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

    // Handle notice period menu toggle
    const toggleNoticePeriodMenu = (index) => {
        setShowSubMenu(prevIndex => (prevIndex === index ? null : index));
    };

    // handle add new notice-period
    const handleAddNoticePeriod = async (e) => {
        e.preventDefault()
        setAddItemLoading(true)

        try {
            const { response, jsonResponse, error } = await AddNoticePeriod(newNoticePeriod)
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
                setNewNoticePeriod('');
                getNoticePeriod()
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

    // handle edit notice-period
    const handleEditNoticePeriod = async (e) => {
        e.preventDefault()
        setAddItemLoading(true)

        try {
            const { response, jsonResponse, error } = await EditNoticePeriod(selectedPeriod.id, newNoticePeriod)
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
                setNewNoticePeriod('');
                getNoticePeriod()
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

    // handle delete notice period
    const handleDeleteNoticePeriod = async (id) => {
        setDeleteNoticePeriodLoading(true);
        try {
            const { response, jsonResponse, error } = await DeleteNoticePeriod(id);
            if (error) {
                setDeleteNoticePeriodError(error)
                setTimeout(() => {
                    setDeleteNoticePeriodError(null)
                }, 3000);
                setDeleteNoticePeriodLoading(false)
                return;
            }
            if (response.ok) {
                setDeleteNoticePeriodLoading(false);

                getNoticePeriod();
            } else {
                setDeleteNoticePeriodError(jsonResponse.title)
                setTimeout(() => {
                    setDeleteNoticePeriodError(null)
                }, 3000);
                setDeleteNoticePeriodLoading(false)
                return;
            }
        } catch (error) {
            setDeleteNoticePeriodError(error.message)
            setDeleteNoticePeriodLoading(false)
            return
        }
    }

    useEffect(() => {
        getNoticePeriod()
    }, [getNoticePeriod])
    return (
        <div>
            <div className='flex justify-center mb-4'>
                <div className='bg-white mt-4 mb-5 px-3 rounded-lg lookupsContiner'>
                    <div className="flex items-center">
                        <div className="flex items-start ps-1 pt-3 w-full lookupContainerListTittleDiv">
                            <h2 className='pe-2 pb-2 w-full font-semibold text-gray-700'>7. Notice Period</h2>
                            {getItemsError && <div className='w-full text-red-500 text-sm text-end'>{getItemsError}</div>}

                        </div>

                        <div className='flex justify-end lookupActionIconDiv'>
                            <CiCirclePlus onClick={() => setAddPopup(!AddPopUp)} className='pt-1 font-bold text-4xl cursor-pointer addIcon' />
                        </div>
                    </div>


                    <hr className='border border-gray-300 lookupCardHr' />


                    <div className="" id='cities'>

                        <div>

                            {periods.length > 0 ?
                                periods.map((element, index) => (
                                    <div className="pt-3">
                                        <div className="flex items-center p-2 border-b border-b-gray-300 rounded w-full">
                                            <div className='flex items-center lookupContainerListTittleDiv'>
                                                <span className='ps-4 pe-3 text-sm lookupContainerListTittle'>{element.name}</span>
                                            </div>
                                            <div className='flex justify-end lookupActionIconDiv'>
                                                <CiMenuKebab onClick={() => toggleNoticePeriodMenu(index)} className='text-black text-xl cursor-pointer' />
                                            </div>

                                            {showSubMenu === index && (
                                                <div className='relative'>
                                                    <div className='top-[-2.5rem] right-8 z-50 absolute bg-white drop-shadow-lg rounded-lg w-32 h-24'>

                                                        <div className="flex pt-3 w-full">
                                                            <CiEdit onClick={() => { setEditPopup(!editPopUp), setSelectedPeriod(element) }} className='ms-5 pt-1 text-2xl cursor-pointer' />
                                                            <p onClick={() => { setEditPopup(!editPopUp), setSelectedPeriod(element) }} className='ps-2 pt-1 text-sm cursor-pointer'>Edit</p>
                                                        </div>

                                                        {!deleteNoticePeriodLoading ?
                                                            <div className="flex justify-center pt-3 w-full">
                                                                <CiCircleMinus onClick={() => handleDeleteNoticePeriod(element.id)} className='pt-1 text-2xl cursor-pointer' />
                                                                <p onClick={() => handleDeleteNoticePeriod(element.id)} className='ps-2 pt-1 text-sm cursor-pointer'>Inactivate</p>
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
                    <form onSubmit={handleEditNoticePeriod} action="">
                        <div className='flex justify-end mb-6 cursor-pointer'>
                            <IoMdClose onClick={() => setEditPopup(!editPopUp)} className='text-white text-4xl' />
                        </div>
                        <label className='text-white' for="add">Edit</label>
                        <div className='relative flex'>
                            <input placeholder={selectedPeriod.name} value={newNoticePeriod} onChange={(e) => setNewNoticePeriod(e.target.value)} className='p-2 outline-none w-[80vh]' type="text" name="add" id="edit" />
                            <div className="right-0 absolute inset-y-0 flex items-center">
                                {!addItemLoading ?
                                    <button type='submit' className='pe-2 font-semibold text-md saveBtn'>Edit</button>
                                    :
                                    <button disabled className='pe-2 font-semibold text-gray-300 text-md'>Edit</button>
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
                    <form onSubmit={handleAddNoticePeriod}>
                        <div className='flex justify-end mb-6 cursor-pointer'>
                            <IoMdClose onClick={() => setAddPopup(!AddPopUp)} className='text-white text-4xl' />
                        </div>
                        <label className='text-white' for="add">Add</label>
                        <div className='relative flex'>
                            <input value={newNoticePeriod} onChange={(e) => setNewNoticePeriod(e.target.value)} className='p-2 outline-none w-[80vh]' type="text" name="add" id="edit" />
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
            {deleteNoticePeriodError && (
                <div className='top-0 right-0 z-50 fixed flex justify-center items-center bg-black bg-opacity-50 w-full h-full'>
                    <div>
                        <div className='flex justify-end ms-12 mb-6 w-full cursor-pointer'>
                            <IoMdClose onClick={() => setDeleteNoticePeriodError(null)} className='text-white text-4xl' />
                        </div>
                        <p className='bg-white p-2 rounded-sm w-full text-red-500' for="add">{deleteNoticePeriodError} </p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default NoticePeriod