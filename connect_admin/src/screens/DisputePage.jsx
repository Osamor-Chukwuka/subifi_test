import React, { useEffect, useState } from 'react';
import "../styles/styles.css";
import navLogo from "../assets/navLogo.png";
import notificationIcon from "../assets/notificationIcon.png";
import logoutIcon from "../assets/logoutIcon.png";
import lookupLogo from "../assets/lookupLogo.png";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";
import 'react-datepicker/dist/react-datepicker.css';
import subscribtionLogoBlack from "../assets/subscribtionLogoBlack.png";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { getDisputesApi, putDisputeApi } from '../api-call/api';

const DisputePage = () => {
    const [navDrop, setNavDrop] = useState(false);
    const [disputeError, setDisputeError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [dispute, setDispute] = useState([]);
    const [resolution, setResolution] = useState('');
    const [putDisputeSuccess, setPutDisputeSuccess] = useState(null);
    const [putDisputeError, setPutDisputeError] = useState(null);
    const [disableSaveButton, setDisableSaveButton] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const { assignmentId } = location.state || {};


    const navDropdown = (e) => {
        e.preventDefault();
        if (navDrop == false) {
            setNavDrop(true);
            return document.getElementById("settingDropDown").style.display = "block";
        } else {
            setNavDrop(false);
            return document.getElementById("settingDropDown").style.display = "none";
        }
    }

    // Handle Log out
    const handleLogout = () => {
        localStorage.removeItem('user');
        window.location.href = '/login';
    }

    // check if user is logged in
    const storedUser = JSON.parse(localStorage.getItem(('user')));
    if (!storedUser) {
        window.location.href = '/login';
    }

    // Get dispute
    const callGetDisputesApi = async () => {
        setLoading(true)
        try {
            const { response, jsonResponse, error } = await getDisputesApi(assignmentId);
            if (error) {
                setDisputeError(error)
                setLoading(false)
                return;
            }
            if (response.ok) {
                setDispute(jsonResponse.data);
                console.log(jsonResponse.data)
                setLoading(false)
                return
            } else {
                setDisputeError(jsonResponse.apierror ? jsonResponse.apierror.message : jsonResponse.title)
                setLoading(false)
                return;
            }
        } catch (error) {
            console.log(error);
            setDisputeError(error.message);
            setLoading(false)
        }
    }

    // Put dispute
    const handleSubmit = async (e, id) => {
        e.preventDefault();
        setDisableSaveButton(true);
        try {
            const { response, jsonResponse, error } = await putDisputeApi(id, resolution);
            if (error) {
                setDisableSaveButton(false)
                setPutDisputeError(error)
                setTimeout(() => {
                    setPutDisputeError(null)
                }, 3000);
                return;
            }

            if (response.ok) {
                setPutDisputeSuccess('Dispute resolved successfully');
                setTimeout(() => {
                    setPutDisputeSuccess(null);
                }, 3000);
                callGetDisputesApi();
            } else {
                setDisableSaveButton(false);
                setPutDisputeError(jsonResponse.apierror ? jsonResponse.apierror.message : jsonResponse.title)
                setTimeout(() => {
                    setPutDisputeError(null)
                }, 3000);
                return;
            }

        } catch (error) {
            setDisableSaveButton(false);
            setPutDisputeError(error.message);
            setTimeout(() => {
                setPutDisputeError(null);
            }, 3000);
        }

    }

    // Convert Date to words
    const convertDateToWords = (isoString) => {
        const date = new Date(isoString);

        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };

        return date.toLocaleDateString('en-US', options);
    };

    useEffect(() => {

        callGetDisputesApi();
    }, []);


    return (
        <div className='flex'>
            <div className='leftNav ps-7 pt-9'>
                <img src={navLogo} alt="" className='w-24' />
                <div>
                    <p className='subifiLeftNav'>Subifi</p>
                    <p className='subifiInfoLeftNav'>info@subifi.com</p>
                </div>


                <div className='py-4'>
                    <div className='py-1 rounded-l-lg dashboardNavTextDiv'>
                        <a className='flex py-3 text-white dashboardNavText' href="/">
                            <div className='flex ps-7'>
                                <div className='pe-2 pt-1'><TbLayoutDashboardFilled className='text-lg' /></div>
                                <div>Dashboard</div>
                            </div>
                        </a>
                    </div>
                    <div className='flex ps-7 pt-6 text-gray-700'>
                        <div className='pe-2 pt-1'>
                            <a href="">
                                <IoSettingsOutline className='text-lg' />
                            </a>

                        </div>
                        <div>
                            <a href="" onClick={navDropdown}><p className='settingsNav'>Setting</p></a>

                        </div>
                        <div className=''>
                            <a href="" onClick={navDropdown}><RiArrowDropDownLine className='ms-9 pb-6 text-gray-400 text-6xl' /></a>

                        </div>

                    </div>

                    <div id='settingDropDown'>
                        <div className='flex pb-5 rounded-l-lg align-center'>
                            <div className='ms-6 py-1 ps-9 pe-2'>
                                <img className='pt-4 subscribtionLogo' src={subscribtionLogoBlack} alt="" />
                            </div>
                            <div className='pt-4'>
                                <a href="/settings/subscription" className=''>Subscription</a>
                            </div>

                        </div>
                        <div className='flex ms-6 ps-9 pt-5 pb-2 rounded-l-lg'>
                            <div className='py-1 pe-2'>
                                <img className='subscribtionLogo' src={lookupLogo} alt="" />
                            </div>
                            <div className='pb-2'>
                                <a className='subifiLeftNav' href="/settings/lookups">Lookups</a>
                            </div>
                        </div>

                    </div>


                    <div className='logoutSection'>
                        <hr className='me-9 border-gray-500' />
                        <div className='flex py-5 logoutSubSection'>
                            <div className='pt-1'>
                                <img onClick={handleLogout} className='cursor-pointer logoutIcon' src={logoutIcon} alt="" />
                            </div>
                            <a onClick={handleLogout} href="/login">
                                <div className='logoutText'>
                                    Log out
                                </div>
                            </a>
                        </div>
                    </div>

                </div>
            </div>

            <div className='w-full'>
                <div className='topNav flex flex-col w-full'>
                    <div className='flex justify-between px-9 pt-9'>
                        <div className=''>
                            <h2 className='font-semibold text-gray-800 text-2xl dashboardText' >Dispute Management</h2>
                        </div>
                        <div>
                            <div>
                                <p className='font-semibold adminName'>{storedUser.firstName + " " + storedUser.lastName}</p>
                            </div>

                            <div className='flex notificationDiv'>
                                <div><img className='me-5 notificationIcon' src={notificationIcon} alt="" /></div>
                                <div className='ps-4 pb-2 w-64 text-sm text-center'><p className='break-all'>{storedUser.emailAddress}</p></div>
                            </div>
                        </div>
                    </div>

                    <div className='contentBodyDivLookup'>
                        {loading && (
                            <div className='flex justify-center'>
                                <div className="loader"></div>
                            </div>
                        )}

                        {disputeError && (
                            <div className='flex justify-center'>
                                <p className='text-red-500'>{disputeError}</p>
                            </div>
                        )}

                        {dispute.length > 0 && (
                            dispute.map((element, index) =>
                                index === 0 && element.disputeStatusId == "reviewing" && (
                                    <div key={index} className='ms-1 ps-9 w-[94%] contentBodyDivAssignmentDetails'>
                                        <h2 className='pt-4 pb-2 text-gray-600 text-sm dashboardText' >Assignment Tittle: <span className='font-semibold text-xl'>{element.assignment.jobTitle}</span></h2>
                                        <div className='flex justify-between mb-5'>
                                            <p className='font-semibold text-sm assignmentDate'>{element.assignment.startDate + ' - ' + element.assignment.endDate}</p>

                                            <div>
                                                <p className='font-semibold text-gray-600 text-sm'>Status: <span className={`text-xs  font-bold px-4  p-2 rounded-sm  ${element.assignment.status == "Live" ? 'text-green-400 bg-green-100' : ''} ${element.assignment.status == "Disputed" ? 'text-red-400 bg-red-100' : ''}  ${element.assignment.status == "Completed" ? 'text-purple-400 bg-purple-100' : ''} ${element.assignment.status == "Ongoing" ? 'text-orange-400 bg-orange-100' : ''}`} >
                                                    {element.assignment.status}
                                                </span></p>
                                            </div>

                                        </div>


                                        <div className='bg-white mt-7 mb-7 rounded-lg'>
                                            <div className='p-5'>
                                                <h2 className='font-semibold text-gray-600 text-2xl' >{element.assignment.companyName + "'s Dispute"}</h2>

                                                <div className='pt-6 text-gray-600 text-sm'>
                                                    <p>{element.disputeReason}</p>
                                                </div>

                                            </div>

                                        </div>


                                        <div className='bg-white mt-7 mb-7 rounded-lg h-full'>
                                            <div className='p-5 h-full'>
                                                <h2 className='font-semibold text-gray-600 text-2xl' > {element.resolution ? 'Resolution' : 'Update Resolution'}</h2>
                                                {element.resolution && (
                                                    <div className='pt-4 text-gray-600 text-sm'>
                                                        <p>{element.resolution}</p>
                                                    </div>
                                                )}

                                                {!element.resolution && (
                                                    <div className='pt-4 h-full text-gray-600 text-sm'>
                                                        <form action="" className='' onSubmit={(e) => handleSubmit(e, element.id)}>
                                                            <div className='flex flex-col'>
                                                                <label className='pb-1 font-semibold text-gray-500 text-sm' htmlFor="resolution">Enter resolution here</label>
                                                                <textarea value={resolution} onChange={(e) => setResolution(e.target.value)} placeholder='Dispute resolution goes here' name="resolution" className='p-3 border border-gray-500 rounded' rows={6} id="resolution"></textarea>
                                                            </div>

                                                            {putDisputeError && (
                                                                <div className='flex justify-center py-3'>
                                                                    <p className='text-red-500'>{putDisputeError}</p>
                                                                </div>
                                                            )}

                                                            {putDisputeSuccess && (
                                                                <div className='flex justify-center py-3'>
                                                                    <p className='text-green-500'>{putDisputeSuccess}</p>
                                                                </div>
                                                            )}


                                                            <div className='flex justify-end'>
                                                                <button disabled={disableSaveButton} className='bg-[#015693] disabled:bg-gray-300 mt-5 px-[5%] py-2 rounded-lg text-white disabled:cursor-not-allowed'>Save</button>
                                                            </div>

                                                        </form>
                                                    </div>
                                                )}

                                            </div>

                                        </div>
                                    </div>
                                )
                            )
                        )}


                    </div>
                </div>
            </div>
        </div>
    )
}

export default DisputePage;