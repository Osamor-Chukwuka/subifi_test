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
import { AddIdentityDocument, CallIdentityDocuments, DeleteIdentityDocument, EditIdentityDocument } from '../../api-call/api';

const IdentityDocuments = () => {
    const [documents, setDocuments] = useState([]);
    const [editPopUp, setEditPopup] = useState(false);
    const [AddPopUp, setAddPopup] = useState(false);
    const [openIndex, setOpenIndex] = useState(null);
    const [showSubMenu, setShowSubMenu] = useState(null);
    const [newItem, setNewItem] = useState(null)
    const [selectedDocument, setSelectedDocument] = useState(null)

    //loading states
    const [addItemLoading, setAddItemLoading] = useState(false)
    const [deleteDocumentLoading, setDeleteDocumentLoading] = useState(false)
    //error states
    const [getItemsError, setGetItemsError] = useState(null);
    const [addItemErrror, setAddItemError] = useState(null);
    const [deleteDocumentError, setDeleteDocumentError] = useState(null);


    // Get identity documents Api
    const GetIdentityDocuments = async () => {
        try {
            const {response, jsonResponse, error} = await CallIdentityDocuments();

            if (error) {
                setGetItemsError(error)
                return;
            }

            if (response.ok) {
                setDocuments(jsonResponse.data);
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

    // Handle identity documents menu toggle
    const toggleDocumentsMenu = (index) => {
        setShowSubMenu(prevIndex => (prevIndex === index ? null : index));
    };

    // handle add new identity document
    const handleAddIdentityDocument = async (e) => {
        e.preventDefault()
        setAddItemLoading(true)

        try {
            const { response, jsonResponse, error } = await AddIdentityDocument(newItem)
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
                GetIdentityDocuments();
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

    // handle edit identity document
    const handleEditIdentityDocument = async (e) => {
        e.preventDefault()
        setAddItemLoading(true)

        try {
            const { response, jsonResponse, error } = await EditIdentityDocument(selectedDocument.id, newItem)
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
                GetIdentityDocuments();
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



    // handle delete identity document
    const handleDeleteIdentityDocument = async (id) => {
        setDeleteDocumentLoading(true);
        try {
            const { response, jsonResponse, error } = await DeleteIdentityDocument(id);
            if (error) {
                setDeleteDocumentError(error)
                setTimeout(() => {
                    setDeleteDocumentError(null)
                }, 3000);
                setDeleteDocumentLoading(false)
                return;
            }
            if (response.ok) {
                setDeleteDocumentLoading(false);

                GetIdentityDocuments();
            } else {
                setDeleteDocumentError(jsonResponse.title)
                setTimeout(() => {
                    setDeleteDocumentError(null)
                }, 3000);
                setDeleteDocumentLoading(false)
                return;
            }
        } catch (error) {
            setDeleteDocumentError(error.message)
            setDeleteDocumentLoading(false)
            return
        }
    }


    useEffect(() => {
        GetIdentityDocuments()
    }, []);


    return (
        <div>
            <div className='flex justify-center mb-4'>
                <div className='bg-white mt-4 mb-5 px-3 rounded-lg lookupsContiner'>
                    <div className="flex items-center">
                        <div className="flex items-start ps-1 pt-3 w-full lookupContainerListTittleDiv">
                            <h2 className='pe-2 pb-2 w-full font-semibold text-gray-700'>9. Identity Document</h2>
                            {getItemsError && <div className='w-full text-red-500 text-sm text-end'>{getItemsError}</div>}
                        </div>

                        <div className='flex justify-end lookupActionIconDiv'>
                            <CiCirclePlus onClick={() => setAddPopup(!AddPopUp)} className='pt-1 font-bold text-4xl cursor-pointer addIcon' />
                        </div>
                    </div>


                    <hr className='border border-gray-300 lookupCardHr' />
                    <div className="" id='cities'>
                        <div>
                            {documents.length > 0 ?
                                documents.map((element, index) => (
                                    <div key={index} className="pt-3">
                                        <div className="flex items-center p-2 border-b border-b-gray-300 rounded w-full">
                                            <div className='flex items-center lookupContainerListTittleDiv'>
                                                <span className='ps-4 pe-3 text-sm lookupContainerListTittle'>{element.name}</span>
                                            </div>
                                            <div className='flex justify-end lookupActionIconDiv'>
                                                <CiMenuKebab onClick={() => toggleDocumentsMenu(index)} className='text-black text-xl cursor-pointer' />
                                            </div>

                                            {showSubMenu === index && (
                                                <div className='relative'>
                                                    <div className='top-[-2.5rem] right-8 z-50 absolute bg-white drop-shadow-lg rounded-lg w-32 h-24'>

                                                        <div className="flex pt-3 w-full">
                                                            <CiEdit onClick={() => { setEditPopup(!editPopUp), setSelectedDocument(element) }} className='ms-5 pt-1 text-2xl cursor-pointer' />
                                                            <p onClick={() => { setEditPopup(!editPopUp), setSelectedDocument(element) }} className='ps-2 pt-1 text-sm cursor-pointer'>Edit</p>
                                                        </div>

                                                        {!deleteDocumentLoading ?
                                                            <div className="flex justify-center pt-3 w-full">
                                                                <CiCircleMinus onClick={() => handleDeleteIdentityDocument(element.id)} className='pt-1 text-2xl cursor-pointer' />
                                                                <p onClick={() => handleDeleteIdentityDocument(element.id)} className='ps-2 pt-1 text-sm cursor-pointer'>Inactivate</p>
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
                    <form action="" onSubmit={handleEditIdentityDocument}>
                        <div className='flex justify-end mb-6 cursor-pointer'>
                            <IoMdClose onClick={() => setEditPopup(!editPopUp)} className='text-white text-4xl' />
                        </div>
                        <label className='text-white' for="add">Edit</label>
                        <div className='relative flex'>
                            <input placeholder={selectedDocument.name} value={newItem} onChange={(e) => setNewItem(e.target.value)} className='p-2 outline-none w-[80vh]' type="text" name="add" id="add" />
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
                    <form onSubmit={handleAddIdentityDocument}>
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
            {deleteDocumentError && (
                <div className='top-0 right-0 z-50 fixed flex justify-center items-center bg-black bg-opacity-50 w-full h-full'>
                    <div>
                        <div className='flex justify-end ms-12 mb-6 w-full cursor-pointer'>
                            <IoMdClose onClick={() => setDeleteDocumentError(null)} className='text-white text-4xl' />
                        </div>
                        <p className='bg-white p-2 rounded-sm w-full text-red-500' for="add">{deleteDocumentError} </p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default IdentityDocuments