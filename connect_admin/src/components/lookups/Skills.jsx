import React, { useCallback, useEffect, useState } from 'react';
import { addDays } from 'date-fns';
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { CiMenuKebab } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";
import { PiPlusCircleLight } from "react-icons/pi";
import { CiEdit } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { AddSkill, CallIndustries, CallSkills, DeleteSkills, EditSkill } from '../../api-call/api';

export const Skills = () => {
    const [editPopUp, setEditPopup] = useState(false);
    const [AddPopUp, setAddPopup] = useState(false);
    const [showSubMenuContainer, setShowSubMenuContainer] = useState(null);
    const [showInnerSubMenuContainer, setShowInnerSubMenuContainer] = useState(null);
    const [industries, setIndustries] = useState([]);
    const [theSkills, setTheSkills] = useState([]);
    const [openIndex, setOpenIndex] = useState(null);
    const [selectedIndustry, setSelectedIndustry] = useState(null);
    const [newItem, setNewItem] = useState('');
    const [selectedSkill, setSelectedSkill] = useState(null)
    //loading states
    const [addItemLoading, setAddItemLoading] = useState(false);
    const [deleteSkillLoading, setDeleteSkillLoading] = useState(false);
    //error states
    const [getItemsError, setGetItemsError] = useState(null);
    const [addItemErrror, setAddItemError] = useState('ersss');
    const [deleteSkillError, setDeleteSkillError] = useState(null);

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

    // Get Skills API
    const getSkills = async (IndustryId) => {
        try {
            const { response, jsonResponse, error } = await CallSkills(IndustryId);
            if (error) {
                setGetItemsError(error)
                return;
            }
            if (response.ok) {
                setTheSkills(jsonResponse.data);
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

    // handle add skill
    const handleAddSkill = async (e) => {
        e.preventDefault();
        setAddItemLoading(true);
        try {
            const { response, jsonResponse, error } = await AddSkill(selectedIndustry.id, newItem);
            if (error) {
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
                getSkills(selectedIndustry.id);
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

    //handle edit skill
    const handleEditSkill = async (e) => {
        e.preventDefault();
        setAddItemLoading(true);
        try {
            const { response, jsonResponse, error } = await EditSkill(selectedSkill.skill.id, selectedSkill.industry, newItem);
            if (error) {
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
                setEditPopup(false);
                setAddItemLoading(false);
                setNewItem('');
                getSkills(selectedSkill.industry);
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

    // handle delete skills
    const handleDeleteSkills = async (id) => {
        setDeleteSkillLoading(true);
        try {
            const { response, jsonResponse, error } = await DeleteSkills(id);
            if (error) {
                setDeleteSkillError(error)
                setTimeout(() => {
                    setDeleteSkillError(null)
                }, 3000);
                setDeleteSkillLoading(false)
                return;
            }
            if (response.ok) {
                setShowSubMenuContainer(null);
                setDeleteSkillLoading(false);

                getIndustries();
            } else {
                setDeleteSkillError(jsonResponse.title)
                setTimeout(() => {
                    setDeleteSkillError(null)
                }, 3000);
                setDeleteSkillLoading(false)
                return;
            }
        } catch (error) {
            setDeleteSkillError(error.message)
            setDeleteSkillLoading(false)
            return
        }
    }

    // Handle Industries dropdown toggle
    const toggleVisibility = (index, id) => {
        setShowInnerSubMenuContainer(null)
        if (openIndex === index) {
            // If the same industry is clicked, close it
            setOpenIndex(null);
            setTheSkills([]);
        } else {
            // Fetch Skills for the new industry
            getSkills(id);
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
                        <h2 className='ps-1 pt-4 pb-2 w-full font-semibold text-gray-700'>4. Skills</h2>
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
                                        {theSkills.map((elementt, indexx) => (
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
                                                                <CiEdit onClick={() => { setEditPopup(!editPopUp), setSelectedSkill(elementt) }} className='ms-5 pt-1 text-2xl cursor-pointer' />
                                                                <p onClick={() => { setEditPopup(!editPopUp), setSelectedSkill({ skill: elementt, industry: element.id }) }} className='ps-2 pt-1 text-sm cursor-pointer'>Edit</p>
                                                            </div>

                                                            {!deleteSkillLoading ?
                                                                <div className="flex justify-center pt-3 w-full">
                                                                    <CiCircleMinus onClick={() => handleDeleteSkills(elementt.id)} className='pt-1 text-2xl cursor-pointer' />
                                                                    <p onClick={() => handleDeleteSkills(elementt.id)} className='ps-2 pt-1 text-sm cursor-pointer'>Inactivate</p>
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
                        <label className='text-white' for="edit">Edit</label>
                        <div className='relative flex'>

                            <input placeholder={selectedSkill.skill.name} required value={newItem} onChange={(e) => setNewItem(e.target.value)} className='p-2 outline-none w-[80vh]' type="text" name="add" id="edit" />
                            <div className="right-0 absolute inset-y-0 flex items-center">
                                {!addItemLoading ?
                                    <button onClick={(e) => handleEditSkill(e)} className='pe-2 font-semibold text-md saveBtn'>Save</button>
                                    :
                                    <button disabled className='pe-2 font-semibold text-gray-300 text-md'>Save</button>
                                }
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
                            <IoMdClose onClick={() => setAddPopup(false)} className='text-white text-4xl' />
                        </div>
                        <label className='text-white' for="add">Add</label>
                        <div className='relative flex'>
                            <input value={newItem} onChange={(e) => setNewItem(e.target.value)} className='p-2 outline-none w-[80vh]' type="text" name="add" id="edit" />
                            <div className="right-0 absolute inset-y-0 flex items-center">
                                {!addItemLoading ?
                                    <button onClick={(e) => handleAddSkill(e)} className='pe-2 font-semibold text-md saveBtn'>Add</button>
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
            {deleteSkillError && (
                <div className='top-0 right-0 z-50 fixed flex justify-center items-center bg-black bg-opacity-50 w-full h-full'>
                    <div>
                        <div className='flex justify-end ms-12 mb-6 w-full cursor-pointer'>
                            <IoMdClose onClick={() => setDeleteSkillError(null)} className='text-white text-4xl' />
                        </div>
                        <p className='bg-white p-2 rounded-sm w-full text-red-500' for="add">{deleteSkillError} </p>
                    </div>
                </div>
            )}

        </div>
    )
}