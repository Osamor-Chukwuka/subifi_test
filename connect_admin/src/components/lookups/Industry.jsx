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
import { AddIndustry, AddJobTitle, CallIndustries, CallJobs, DeleteIndustry, DeleteJob, EditIndustry, EditJobTitle } from '../../api-call/api';

const IndustryLookup = () => {
    const [showSubMenuContainer, setShowSubMenuContainer] = useState(null);
    const [editPopUp, setEditPopup] = useState(false);
    const [AddPopUp, setAddPopup] = useState(false);
    const [showInnerSubMenuContainer, setShowInnerSubMenuContainer] = useState(null);
    const [industries, setIndustries] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [openIndex, setOpenIndex] = useState(null);
    const [newItem, setNewItem] = useState('');
    const [selectedIndustry, setSelectedIndustry] = useState(null);
    const [selectedJob, setSelectedJob] = useState(null)
    const [selectedIndustryEdit, setSelectedIndustryEdit] = useState(null)
    //loading states
    const [addItemLoading, setAddItemLoading] = useState(false);
    const [deleteIndustryLoading, setDeleteIndustryLoading] = useState(false);
    const [deleteJobLoading, setDeleteJobLoading] = useState(false);
    //error states
    const [getItemsError, setGetItemsError] = useState(null);
    const [addItemErrror, setAddItemError] = useState(null);
    const [deleteIndustryError, setDeleteIndustryError] = useState(null);
    const [deleteJobError, setDeleteJobError] = useState(null);

    // Get Indutries API
    const IndustriesAPi = async () => {
        try {
            const { response, jsonResponse, error } = await CallIndustries();;
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
            console.log(error)
        }
    }


    // Get Jobs API
    const JobsAPi = async (id) => {
        try {
            const { response, jsonResponse, error } = await CallJobs(id);
            if (error) {
                setGetItemsError(error)
                return;
            }
            if (response.ok) {
                setJobs(jsonResponse.data);
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

    //  handle Add item (industry or job title)
    const handleAdd = (e, name) => {
        e.preventDefault();
        if (name == 'industry') {
            handleAddIndustry()
        } else if (name == 'job') {
            handleAddJobTitle()
        }
    }

    // handle add industry
    const handleAddIndustry = async () => {
        setAddItemLoading(true);
        try {
            const { response, jsonResponse, error } = await AddIndustry(newItem);
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
                IndustriesAPi();
            } else {
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

    // handle add job-title
    const handleAddJobTitle = async () => {
        setAddItemLoading(true);
        try {
            const { response, jsonResponse, error } = await AddJobTitle(selectedIndustry.id, newItem);
            console.log(jsonResponse)
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
                setShowSubMenuContainer(null)
                setNewItem('');
                toggleVisibility(selectedIndustry.index, selectedIndustry.id);
            } else {
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

    // handle edit job-title
    const handleEditJobTitle = async () => {
        setAddItemLoading(true);
        try {
            const { response, jsonResponse, error } = await EditJobTitle(selectedJob.job.id, selectedJob.industry, newItem);
            console.log(jsonResponse)
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
                setEditPopup(false);
                setAddItemLoading(false);
                setShowSubMenuContainer(null)
                setNewItem('');
                toggleVisibility(selectedJob.industryIndex, selectedJob.industry);
            } else {
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

    // handle edit industry
    const handleEditIndustry = async () => {
        setAddItemLoading(true);
        try {
            const { response, jsonResponse, error } = await EditIndustry(selectedIndustryEdit.industry.id, newItem);
            console.log(jsonResponse)
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
                setEditPopup(false);
                setAddItemLoading(false);
                setShowSubMenuContainer(null)
                setNewItem('');
                IndustriesAPi();
                // toggleVisibility(selectedIndustryEdit.index, selectedIndustryEdit.industry.id);
            } else {
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

    // handle delete industry
    const handleDeleteIndustry = async (id) => {
        setDeleteIndustryLoading(true);
        try {
            const { response, jsonResponse, error } = await DeleteIndustry(id);
            if (error) {
                setDeleteIndustryError(error)
                setTimeout(() => {
                    setDeleteIndustryError(null)
                }, 3000);
                setDeleteIndustryLoading(false)
                return;
            }
            if (response.ok) {
                setShowSubMenuContainer(null);
                setDeleteIndustryLoading(false);

                IndustriesAPi();
            } else {
                setDeleteIndustryError(jsonResponse.title)
                setTimeout(() => {
                    setDeleteIndustryError(null)
                }, 3000);
                setDeleteIndustryLoading(false)
                return;
            }
        } catch (error) {
            setDeleteIndustryError(error.message)
            setDeleteIndustryLoading(false)
            return
        }
    }

    // handle delete job
    const handleDeleteJob = async (id) => {
        setDeleteJobLoading(true);
        try {
            const { response, jsonResponse, error } = await DeleteJob(id);
            if (error) {
                setDeleteJobError(error)
                setTimeout(() => {
                    setDeleteJobError(null)
                }, 3000);
                setDeleteJobLoading(false)
                return;
            }
            if (response.ok) {
                setShowSubMenuContainer(null);
                setDeleteJobLoading(false);

                IndustriesAPi();
            } else {
                setDeleteJobError(jsonResponse.title)
                setTimeout(() => {
                    setDeleteJobError(null)
                }, 3000);
                setDeleteJobLoading(false)
                return;
            }
        } catch (error) {
            setDeleteJobLoading(false)
            return
        }
    }

    // Handle Industries dropdown toggle
    const toggleVisibility = (index, id) => {
        setShowInnerSubMenuContainer(null)
        if (openIndex === index) {
            // If the same industry is clicked, close it
            setOpenIndex(null);
            setJobs([]);
        } else {
            // Fetch jobs for the new industry
            // const fetchedJobs = await JobsAPi(id);
            JobsAPi(id);
            setOpenIndex(index);
            // setJobs(fetchedJobs);
        }

    };

    // Handle Industry sub menu toggle
    const toggleIndustryVisibility = (index) => {
        setShowInnerSubMenuContainer(null)
        setShowSubMenuContainer(prevIndex => (prevIndex === index ? null : index));
    };


    // Handle Jobs sub menu toggle
    const toggleJobsVisibility = (index) => {
        setShowSubMenuContainer(null)
        setShowInnerSubMenuContainer(prevIndex => (prevIndex === index ? null : index));
    };

    useEffect(() => {
        IndustriesAPi();
    }, []);


    return (
        <div>
            <div className='flex justify-center'>
                <div className='bg-white mt-4 mb-5 px-3 rounded-lg lookupsContiner'>
                    <div className='flex justify-between items-center'>
                        <h2 className='ps-1 pt-4 pb-2 w-full font-semibold text-gray-700'>1. Industries and Job titles</h2>
                        {getItemsError && <div className='w-full text-red-500 text-sm text-center'>{getItemsError}</div>}
                        <div className='flex justify-end w-full'>
                            <CiCirclePlus onClick={() => setAddPopup('industry')} className='pt-1 font-bold text-4xl cursor-pointer addIcon' />
                        </div>
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
                                            <div className='top-[-1.3rem] right-8 z-50 absolute bg-white drop-shadow-lg rounded-lg w-32 h-32'>
                                                <div className="flex justify-center pt-2 w-full">
                                                    <PiPlusCircleLight onClick={() => setAddPopup(!AddPopUp)} className='pt-1 text-2xl' />
                                                    <p onClick={() => { setAddPopup('job'), setSelectedIndustry({ id: element.id, index }) }} className='ps-2 pt-1 text-sm'>Add New</p>
                                                </div>

                                                <div className="flex pt-3 w-full">
                                                    <CiEdit onClick={() => { setEditPopup('industry'), setSelectedIndustryEdit({ industry: element }) }} className='ms-5 pt-1 text-2xl' />
                                                    <p onClick={() => { setEditPopup('industry'), setSelectedIndustryEdit({ industry: element, index: index }) }} className='ps-2 pt-1 text-sm'>Edit</p>
                                                </div>

                                                {!deleteIndustryLoading ?
                                                    <div className="flex justify-center pt-3 w-full">
                                                        <CiCircleMinus onClick={() => handleDeleteIndustry(element.id)} className='pt-1 text-2xl' />
                                                        <p onClick={() => handleDeleteIndustry(element.id)} className='ps-2 pt-1 text-sm'>Inactivate</p>
                                                    </div>
                                                    :
                                                    <div className="flex justify-center pt-3 w-full text-gray-300">
                                                        <CiCircleMinus className='pt-1 text-2xl' />
                                                        <p className='ps-2 pt-1 text-sm'>Inactivate</p>
                                                    </div>
                                                }
                                            </div>
                                        </div>)
                                    }
                                </div>
                                {openIndex === index && (
                                    <div id={index} className="relative pl-4">
                                        {jobs.map((elementt, indexx) => (
                                            <div>
                                                <div className='flex justify-between border-b broder-b-4'>
                                                    <div className="p-2 text-gray-600">{elementt.name}</div>
                                                    <div onClick={() => toggleJobsVisibility(indexx)} className='pe-2 pt-2 cursor-pointer'>
                                                        <CiMenuKebab className='text-gray-500 text-xl' />
                                                    </div>
                                                </div>

                                                {showInnerSubMenuContainer === indexx && (
                                                    <div className='relative'>
                                                        <div className='top-[-2.5rem] right-8 z-50 absolute bg-white drop-shadow-lg rounded-lg w-32 h-24'>

                                                            <div className="flex pt-3 w-full">
                                                                <CiEdit onClick={() => { setEditPopup('job'), setSelectedJob({ job: elementt, industry: element.id }) }} className='ms-5 pt-1 text-2xl cursor-pointer' />
                                                                <p onClick={() => { setEditPopup('job'), setSelectedJob({ job: elementt, industry: element.id, industryIndex: index }) }} className='ps-2 pt-1 text-sm cursor-pointer'>Edit</p>
                                                            </div>

                                                            {!deleteJobLoading ?
                                                                <div className="flex justify-center pt-3 w-full">
                                                                    <CiCircleMinus onClick={() => handleDeleteJob(elementt.id)} className='pt-1 text-2xl cursor-pointer' />
                                                                    <p onClick={() => handleDeleteJob(elementt.id)} className='ps-2 pt-1 text-sm cursor-pointer'>Inactivate</p>
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
                            <IoMdClose onClick={() => setEditPopup(false)} className='text-white text-4xl' />
                        </div>
                        <label className='text-white' for="add">Edit {AddPopUp}</label>
                        <div className='relative flex'>

                            <input placeholder={editPopUp == 'job' ? selectedJob.job.name : selectedIndustryEdit.industry.name} value={newItem} onChange={(e) => setNewItem(e.target.value)} className='p-2 outline-none w-[80vh]' type="text" name="add" id="edit" />
                            <div className="right-0 absolute inset-y-0 flex items-center">
                                {!addItemLoading ?
                                    <button onClick={(e) => editPopUp == 'job' ? handleEditJobTitle(e) : handleEditIndustry(e)} className='pe-2 font-semibold text-md saveBtn'>Edit</button>
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
                        <label className='text-white' for="add">Add {AddPopUp}</label>
                        <div className='relative flex'>
                            <input value={newItem} onChange={(e) => setNewItem(e.target.value)} className='p-2 outline-none w-[80vh]' type="text" name="add" id="edit" />
                            <div className="right-0 absolute inset-y-0 flex items-center">
                                {!addItemLoading ?
                                    <button onClick={(e) => handleAdd(e, AddPopUp)} className='pe-2 font-semibold text-md saveBtn'>Add</button>
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
            {(deleteIndustryError || deleteJobError) && (
                <div className='top-0 right-0 z-50 fixed flex justify-center items-center bg-black bg-opacity-50 w-full h-full'>
                    <div>
                        <div className='flex justify-end ms-12 mb-6 w-full cursor-pointer'>
                            <IoMdClose onClick={() => { setDeleteIndustryError(null); setDeleteJobError(null) }} className='text-white text-4xl' />
                        </div>
                        <p className='bg-white p-2 rounded-sm w-full text-red-500' for="add">{deleteIndustryError || deleteJobError} </p>
                    </div>
                </div>
            )}

        </div>
    )
}


export default IndustryLookup