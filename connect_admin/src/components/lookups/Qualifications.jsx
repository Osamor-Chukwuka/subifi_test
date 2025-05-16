import React, { useCallback, useEffect, useState } from 'react';
import { addDays, set } from 'date-fns';
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
import { AddQualification, CallIndustries, CallQualifications, DeleteQual, EditQualification } from '../../api-call/api';

export const Qualifications = () => {
    const [editPopUp, setEditPopup] = useState(false);
    const [AddPopUp, setAddPopup] = useState(false);
    const [showSubMenuContainer, setShowSubMenuContainer] = useState(null);
    const [showInnerSubMenuContainer, setShowInnerSubMenuContainer] = useState(null);
    const [industries, setIndustries] = useState([]);
    const [qual, setQual] = useState([]);
    const [openIndex, setOpenIndex] = useState(null);
    const [selectedIndustry, setSelectedIndustry] = useState(null);
    const [newItem, setNewItem] = useState('');
    const [selectedQual, setSelectedQual] = useState(null)
    //loading states
    const [addItemLoading, setAddItemLoading] = useState(false);
    const [deleteQualLoading, setDeleteQualLoading] = useState(false);
    //error states
    const [getItemsError, setGetItemsError] = useState(null);
    const [addItemErrror, setAddItemError] = useState(null);
    const [deleteQualError, setDeleteQualError] = useState(null);

    // Get Industries
    const getIndustries = useCallback(async () => {
        try {
            const { response, jsonResponse, error } = await CallIndustries()
            if (error) {
                setGetItemsError(error)
                return;
            }
            if (response.ok) {
                setIndustries(jsonResponse.data);
                return
            } else {
                setGetItemsError(jsonResponse.apierror ? jsonResponse.apierror.message : jsonResponse.title)
                return;
            }
        } catch (error) {
            setGetItemsError(error.message)
            console.log(error);
        }
    }, [])

    // Get Qualification API
    const GetQualifications = async (IndustryId) => {
        try {
            const {response, jsonResponse, error} = await CallQualifications(IndustryId);
            if (error) {
                setGetItemsError(error)
                return;
            }
            if (response.ok) {
                setQual(jsonResponse.data);
                return
            } else {
                setGetItemsError(jsonResponse.apierror ? jsonResponse.apierror.message : jsonResponse.title)
                return;
            }
        } catch (error) {
            setGetItemsError(error.message)
            console.log(error);

        }
    }

    // handle add qualification
    const handleAddQual = async (e) => {
        e.preventDefault();
        setAddItemLoading(true);
        try {
            const { response, jsonResponse, error } = await AddQualification(selectedIndustry.id, newItem);
            if (error) {
                alert(error)
                setAddItemError(error)
                setTimeout(() => {
                    setAddItemError(null)
                }, 3000);
                setAddItemLoading(false)
                setNewItem('');
                return;
            }
            if (response.ok) {
                setAddPopup(false);
                setAddItemLoading(false);
                setNewItem('');
                GetQualifications(selectedIndustry.id);
            } else {
                console.log(jsonResponse)
                setAddItemError(jsonResponse.apierror ? jsonResponse.apierror.message : jsonResponse.title)
                setTimeout(() => {
                    setAddItemError(null)
                }, 3000);
                setAddItemLoading(false)
                setNewItem('');
                return;
            }
        } catch (error) {
            setAddItemLoading(false)
            setNewItem('');
            return
        }
    }

    // handle edit qualification
    const handleEditQual = async (e) => {
        e.preventDefault();
        setAddItemLoading(true);
        try {
            const { response, jsonResponse, error } = await EditQualification(selectedQual.qual.id, selectedQual.industry, newItem);
            if (error) {
                alert(error)
                setAddItemError(error)
                setTimeout(() => {
                    setAddItemError(null)
                }, 3000);
                setAddItemLoading(false)
                setNewItem('');
                return;
            }
            if (response.ok) {
                setEditPopup(false);
                setAddItemLoading(false);
                setNewItem('');
                GetQualifications(selectedQual.industry);
            } else {
                console.log(jsonResponse)
                setAddItemError(jsonResponse.apierror ? jsonResponse.apierror.message : jsonResponse.title)
                setTimeout(() => {
                    setAddItemError(null)
                }, 3000);
                setAddItemLoading(false)
                setNewItem('');
                return;
            }
        } catch (error) {
            setAddItemLoading(false)
            setNewItem('');
            return
        }
    }

    // handle delete qualifications
    const handleDeleteQual = async (id) => {
        setDeleteQualLoading(true);
        try {
            const { response, jsonResponse, error } = await DeleteQual(id);
            if (error) {
                setDeleteQualError(error)
                setTimeout(() => {
                    setDeleteQualError(null)
                }, 3000);
                setDeleteQualLoading(false)
                return;
            }
            if (response.ok) {
                setShowSubMenuContainer(null);
                setDeleteQualLoading(false);

                getIndustries();
            } else {
                setDeleteQualError(jsonResponse.title)
                setTimeout(() => {
                    setDeleteQualError(null)
                }, 3000);
                setDeleteQualLoading(false)
                return;
            }
        } catch (error) {
            setDeleteQualError(error.message)
            setDeleteQualLoading(false)
            return
        }
    }

    // Handle Industries dropdown toggle
    const toggleVisibility = (index, id) => {
        setShowInnerSubMenuContainer(null)
        if (openIndex === index) {
            // If the same industry is clicked, close it
            setOpenIndex(null);
            setQual([]);
        } else {
            // Fetch qualifications for the new industry
            // const fetchedJobs = await JobsAPi(id);
            GetQualifications(id);
            setOpenIndex(index);
            // setJobs(fetchedJobs);
        }

    };

    // Handle Industry sub menu toggle
    const toggleIndustryVisibility = (index) => {
        setShowInnerSubMenuContainer(null)
        setShowSubMenuContainer(prevIndex => (prevIndex === index ? null : index));
    };

    // Handle qualifications sub menu toggle
    const toggleQualificationsVisibility = (index) => {
        setShowSubMenuContainer(null)
        setShowInnerSubMenuContainer(prevIndex => (prevIndex === index ? null : index));
    };

    useEffect(() => {
        getIndustries();
    }, [getIndustries])


    return (
        <div>
            <div className='flex justify-center'>
                <div className='bg-white mt-4 mb-5 px-3 rounded-lg lookupsContiner'>
                    <div className='flex items-center w-full'>
                        <h2 className='ps-1 pt-4 pb-2 w-full font-semibold text-gray-700'>3. Qualifications</h2>
                        {getItemsError && <div className='w-full text-red-500 text-sm text-end'>{getItemsError}</div>}

                    </div>

                    <hr className='border border-gray-300 lookupCardHr' />


                    <div className="">

                        {industries.map((element, index) => (
                            <div className="mb-2 pt-3">
                                <div className="relative flex items-center bg-blue-100 p-2 rounded w-full cursor-pointer" >
                                    <div className='flex items-center lookupContainerListTittleDiv' onClick={() => toggleVisibility(index, element.id)}>
                                        <span className='pe-3 font-semibold lookupContainerListTittle'>{element.name}</span>
                                        {openIndex === index ? (<FaChevronUp className="text-gray-500 lookupContainerListExpandIcon" />) : (<FaChevronDown className="text-gray-500 lookupContainerListExpandIcon" />)}
                                    </div>
                                    <div className='flex justify-end lookupActionIconDiv'>
                                        <CiMenuKebab onClick={() => toggleIndustryVisibility(index)} className='text-black text-xl' />
                                    </div>

                                    {showSubMenuContainer === index && (
                                        <div className=''>
                                            <div className='top-[-1.3rem] right-8 z-50 absolute bg-white drop-shadow-lg ms-7 rounded-lg w-32 h-12'>
                                                <div className="flex justify-center pt-2 w-full">
                                                    <PiPlusCircleLight onClick={() => setAddPopup(!AddPopUp)} className='pt-1 text-2xl' />
                                                    <p onClick={() => { setAddPopup('add'), setSelectedIndustry({ id: element.id, index }) }} className='ps-2 pt-1 text-sm'>Add New</p>
                                                </div>

                                                {/* <div className="flex pt-3 w-full">
                                                    <CiEdit onClick={() => setEditPopup(!editPopUp)} className='ms-5 pt-1 text-2xl' />
                                                    <p onClick={() => setEditPopup(!editPopUp)} className='ps-2 pt-1 text-sm'>Edit</p>
                                                </div>

                                                <div className="flex justify-center pt-3 w-full">
                                                    <CiCircleMinus className='pt-1 text-2xl' />
                                                    <p className='ps-2 pt-1 text-sm'>Inactivate</p>
                                                </div> */}
                                            </div>
                                        </div>)
                                    }

                                </div>
                                {openIndex === index && (
                                    <div id={index} className="relative pl-4">
                                        {qual.map((elementt, indexx) => (
                                            <div>
                                                <div className='flex justify-between border-b broder-b-4'>
                                                    <div className="p-2 text-gray-600">{elementt.name}</div>
                                                    <div onClick={() => toggleQualificationsVisibility(indexx)} className='pe-2 pt-2 cursor-pointer'>
                                                        <CiMenuKebab className='text-gray-500 text-xl' />
                                                    </div>
                                                </div>

                                                {showInnerSubMenuContainer === indexx && (
                                                    <div className='relative'>
                                                        <div className='top-[-2.5rem] right-8 z-50 absolute bg-white drop-shadow-lg rounded-lg w-32 h-24'>

                                                            <div className="flex pt-3 w-full">
                                                                <CiEdit onClick={() => { setEditPopup(!editPopUp), setSelectedQual({ qual: elementt, industry: element.id }) }} className='ms-5 pt-1 text-2xl cursor-pointer' />
                                                                <p onClick={() => { setEditPopup(!editPopUp), setSelectedQual({ qual: elementt, industry: element.id }) }} className='ps-2 pt-1 text-sm cursor-pointer'>Edit</p>
                                                            </div>

                                                            {!deleteQualLoading ?
                                                                <div className="flex justify-center pt-3 w-full">
                                                                    <CiCircleMinus onClick={() => handleDeleteQual(elementt.id)} className='pt-1 text-2xl cursor-pointer' />
                                                                    <p onClick={() => handleDeleteQual(elementt.id)} className='ps-2 pt-1 text-sm cursor-pointer'>Inactivate</p>
                                                                </div>
                                                                :
                                                                <div className="flex justify-center pt-3 w-full text-gray-300">
                                                                    <CiCircleMinus onClick={() => handleDeleteQual(elementt.id)} className='pt-1 text-2xl cursor-pointer' />
                                                                    <p onClick={() => handleDeleteQual(elementt.id)} className='ps-2 pt-1 text-sm cursor-pointer'>Inactivate</p>
                                                                </div>
                                                            }
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                        ))}

                                    </div>
                                )}
                            </div>
                        ))}

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
                        <label className='text-white' for="add">Edit</label>
                        <div className='relative flex'>
                            <input value={newItem} onChange={(e) => setNewItem(e.target.value)} className='p-2 outline-none w-[80vh]' placeholder={selectedQual.qual.name} type="text" name="add" id="edit" />
                            <div className="right-0 absolute inset-y-0 flex items-center">
                                {!addItemLoading ?
                                    <button onClick={(e) => handleEditQual(e)} className='pe-2 font-semibold text-md saveBtn'>Edit</button>
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
                    <form action="">
                        <div className='flex justify-end mb-6 cursor-pointer'>
                            <IoMdClose onClick={() => setAddPopup(false)} className='text-white text-4xl' />
                        </div>
                        <label className='text-white' for="add">Add</label>
                        <div className='relative flex'>
                            <input value={newItem} onChange={(e) => setNewItem(e.target.value)} className='p-2 outline-none w-[80vh]' type="text" name="add" id="edit" />
                            <div className="right-0 absolute inset-y-0 flex items-center">
                                {!addItemLoading ?
                                    <button onClick={(e) => handleAddQual(e)} className='pe-2 font-semibold text-md saveBtn'>Add</button>
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
            {deleteQualError && (
                <div className='top-0 right-0 z-50 fixed flex justify-center items-center bg-black bg-opacity-50 w-full h-full'>
                    <div>
                        <div className='flex justify-end ms-12 mb-6 w-full cursor-pointer'>
                            <IoMdClose onClick={() => setDeleteQualError(null)} className='text-white text-4xl' />
                        </div>
                        <p className='bg-white p-2 rounded-sm w-full text-red-500' for="add">{deleteQualError} </p>
                    </div>
                </div>
            )}
        </div>
    )
}