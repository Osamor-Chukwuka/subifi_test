import React, { useState, useEffect } from 'react';
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
import { FaRegEnvelope } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { LuPhoneCall } from "react-icons/lu";
import starRating from "../assets/starRating.png";
import { useNavigate, useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Notification } from '../components/Notifications';
import { AssignmentDetailsApiCall, UpdateAssignmentStatusApiCall } from '../api-call/api';
import Rating from '../components/rating';



const AssignmentDetails = () => {
    const [navDrop, setNavDrop] = useState(false);
    const [updateStausMenu, setUpdateStausMenu] = useState(false)
    const [showNotifications, setShowNotifications] = useState(false)
    const [assignment, setAssignment] = useState({});
    const [loading, setLoading] = useState(false)
    const [assignmentDetailsError, setAssignmentDetailsError] = useState('');
    const [updateAssignmentError, setUpdateAssignmentError] = useState(false)

    const navigate = useNavigate();
    const location = useLocation();
    const { assignmentId } = location.state || {};

    const callAssignmentDetails = async () => {
        setLoading(true)
        try {
            const { response, jsonResponse, error } = await AssignmentDetailsApiCall(assignmentId);
            if (error) {
                setAssignmentDetailsError(error)
                setLoading(false)
                return;
            }

            if (response.ok) {
                setAssignment(jsonResponse.data)
                setLoading(false)
                return
            } else {
                setAssignmentDetailsError(jsonResponse.apierror ? jsonResponse.apierror.message : jsonResponse.title + ' ' + '(' + jsonResponse.status + ')')
                setLoading(false)
                return;
            }
        } catch (error) {
            setAssignmentDetailsError(error.message)
            setLoading(false)
            return;
        }
    }


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

    const handleShowNotifications = () => {
        setShowNotifications(false)
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

    const handleUpdateAssignmentStatus = async (id, status) => {
        setLoading(true)
        try {
            const { response, jsonResponse, error } = await UpdateAssignmentStatusApiCall(id, status);

            if (error) {
                setLoading(false)
                setUpdateAssignmentError(error)
                setTimeout(() => {
                    setUpdateAssignmentError(false)
                }, 3000);
                return;
            }

            if (response.ok) {
                window.location.reload();
                setLoading(false)
                return
            } else {
                setLoading(false)
                setUpdateAssignmentError(jsonResponse.apierror ? jsonResponse.apierror.message : jsonResponse.title)
                setTimeout(() => {
                    setUpdateAssignmentError(false)
                }, 3000);
                return;
            }

        } catch (error) {
            setLoading(false)
            setUpdateAssignmentError(error.message)
            setTimeout(() => {
                setUpdateAssignmentError(false)
            }, 3000);
        }
    }

    // handle redirect to dispute page
    const handleRedirectToDisputePage = (e) => {
        e.preventDefault();
        navigate('/dispute', { state: { assignmentId } });
    }

    const handleRedirectToDisputeHistory = (e) => {
        e.preventDefault();
        navigate('/dispute-history', { state: { assignmentId } });
    }

    useEffect(() => {
        if (!assignmentId) {
            navigate('/assignments')
        }
        callAssignmentDetails(assignmentId);
    }, [])





    return (
        <div className='flex'>
            {/* {console.log(assignmentId)} */}
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
                            <h2 className='font-semibold text-gray-800 text-2xl dashboardText' >Assignment Details</h2>
                        </div>
                        <div>
                            <div>
                                <p className='font-semibold adminName'>{storedUser.firstName + " " + storedUser.lastName}</p>
                            </div>

                            <div className='flex notificationDiv'>
                                <div className='flex flex-col justify-between items-center space-y-[2rem]'>
                                    <img onClick={() => setShowNotifications(!showNotifications)} className='me-5 cursor-pointer notificationIcon' src={notificationIcon} alt="" />
                                    {showNotifications && (
                                        <div className='z-50 absolute mt-3'>
                                            <Notification handleNotifications={handleShowNotifications} />
                                        </div>
                                    )}
                                </div>
                                <div className='ps-4 pb-2 w-64 text-sm text-center'><p className='break-all'>{storedUser.emailAddress}</p></div>
                            </div>
                        </div>
                    </div>

                    <div className='contentBodyDivLookup'>
                        {loading ?
                            <div className='flex justify-center'>
                                <div className="loader"></div>
                            </div>
                            :
                            assignment != {} && assignment.company ?
                                <div className='ms-1 ps-9 w-[94%] contentBodyDivAssignmentDetails'>
                                    <h2 className='pt-4 pb-2 text-gray-600 text-sm dashboardText' >Assignment Tittle: <span className='font-semibold text-xl'>{assignment.jobTitle}</span></h2>
                                    <div className='flex justify-between'>
                                        <p className='font-semibold text-sm assignmentDate'>{assignment.preferredStartDate ? convertDateToWords(assignment.preferredStartDate) : 'N/A'} - N/A</p>

                                        <div>
                                            <p className='font-semibold text-gray-600 text-sm'>Status: <span className={`text-xs  font-bold px-4  p-2 rounded-sm  ${assignment.assignmentStatus == "Live" ? 'text-green-400 bg-green-100' : ''} ${assignment.assignmentStatus == "Disputed" ? 'text-red-400 bg-red-100' : ''}  ${assignment.assignmentStatus == "Completed" ? 'text-purple-400 bg-purple-100' : ''} ${assignment.assignmentStatus == "Ongoing" ? 'text-orange-400 bg-orange-100' : ''} ${assignment.assignmentStatus == "Draft" ? 'bg-gray-500 text-white' : ''}`} >
                                                {assignment.assignmentStatus}
                                            </span></p>
                                        </div>

                                        <div className='flex'>
                                            <div className='relative'>
                                                <button onClick={() => setUpdateStausMenu(!updateStausMenu)} className={`border cursor-pointer px-3 text-sm rounded-md   flex ${assignment.assignmentStatus == "Live" || assignment.assignmentStatus == "Completed" || assignment.assignmentStatus == "Draft" ? 'bg-[#888888] disabled text-white' : 'text-[#015693] hover:bg-[#015693] hover:text-white  border-[#015693]'}`}>
                                                    <p className='ps-3 pt-2'>Update Status</p>
                                                    <RiArrowDropDownLine className='font-extralight text-4xl' />
                                                </button>

                                                {updateStausMenu && assignment.assignmentStatus != "Live" && assignment.assignmentStatus != "Completed" && assignment.assignmentStatus != "Draft" && assignment.assignmentStatus != "Disputed" && (
                                                    <div className='rounded-lg'>
                                                        <div className={`${loading ? 'bg-white shadow-xl shadow-gray-400' : 'bg-[#015693]'} text-white ms-7 w-[92%] absolute right-1 top-12 rounded-lg `}>
                                                            {loading ?
                                                                <div className='flex justify-center'>
                                                                    <div className="loader"></div>
                                                                </div>
                                                                :
                                                                <div>
                                                                    <div className="pt-2 w-full">
                                                                        <p className='ps-2 pe-3 pt-1 pb-1 font-semibold text-sm text-end'>Update Status to</p>
                                                                    </div>
                                                                    <div className="flex justify-end p-4 pt-2 w-full">
                                                                        {assignment.assignmentStatus != 'Disputed' ?
                                                                            <p onClick={() => handleUpdateAssignmentStatus(assignment.id, 'Completed')} className='bg-purple-100 px-2 pt-1 pb-1 rounded-md text-purple-400 text-xs text-center cursor-pointer'>Completed</p>
                                                                            : null
                                                                            // <p onClick={() => handleUpdateAssignmentStatus(assignment.id, 'Ongoing')} className='bg-orange-100 px-2 pt-1 pb-1 rounded-md text-orange-400 text-xs text-center cursor-pointer'>Ongoing</p>
                                                                        }
                                                                    </div>

                                                                    <div>
                                                                        {updateAssignmentError && (
                                                                            <p className='bg-white shadow-2xl shadow-gray-900 m-2 p-1 rounded-sm text-red-500 text-xs'>{updateAssignmentError}</p>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            }

                                                        </div>
                                                    </div>
                                                )}

                                            </div>




                                            {assignment.assignmentStatus == "Disputed" && (
                                                <a onClick={(e) => handleRedirectToDisputePage(e)}>
                                                    <button className='flex hover:bg-[#015693] ms-5 p-2 px-9 border border-[#015693] rounded-md text-[#015693] hover:text-white text-sm'>See Dispute</button>
                                                </a>
                                            )}

                                            <a onClick={(e) => handleRedirectToDisputeHistory(e)}>
                                                <button className='flex hover:bg-[#015693] ms-5 p-2 px-9 border border-[#015693] rounded-md text-[#015693] hover:text-white text-sm'>See Dispute History</button>
                                            </a>



                                        </div>
                                    </div>

                                    <div className="flex justify-between pt-4">
                                        <div className='bg-white rounded-lg w-[45%]'>
                                            <div className='p-6'>
                                                <p className='font-semibold text-gray-600 text-2xl'>Client</p>

                                                <div className='flex'>
                                                    <div className='pt-4'>
                                                        <img className='clientLogo' src={assignment.company.logoUrl} alt="" />
                                                    </div>

                                                    <div className='flex flex-col justify-center ps-4'>
                                                        <p className='font-semibold text-gray-700'>{assignment.company.name}</p>
                                                        <p className='flex py-3 text-gray-500 text-sm'><FaRegEnvelope className='mt-1 text-md' /> <span className='ps-1'>{assignment.company.emailAddress}</span> </p>
                                                        <p className='flex text-gray-500 text-sm'> <IoLocationOutline className='mt-1 font-bold text-lg' /> <span className='ps-1 pt-1'>{assignment.city}</span> </p>
                                                    </div>
                                                </div>

                                                <div className='ps-6 pt-3 text-gray-600 text-sm'>
                                                    <ul className='list-disc'>
                                                        <li>Company Name: <span className='font-semibold'>{assignment.company.name}</span></li>
                                                        <li className='py-5'>Company Industry: <span className='font-semibold'>{assignment.company.industry.name}</span></li>
                                                        <li>Website URL: <span className='font-semibold text-[#015693]'>{assignment.company.websiteUrl}</span></li>
                                                        <li className='py-5'>Office Number: <span className='font-semibold'>{assignment.company.phoneNumber}</span></li>
                                                        <li className=''>VAT Number: <span className='font-semibold'></span>{assignment.company.vatNumber}</li>
                                                        <li className='py-4'>Company Registeration Number: <span className='font-semibold'>{assignment.company.registrationNumber}</span></li>
                                                        <li className=''>Company Address: <span className='font-semibold'>{assignment.company.address}</span></li>
                                                    </ul>
                                                </div>

                                            </div>

                                        </div>


                                        <div className='bg-white rounded-lg w-[48%]'>
                                            <div className='p-6'>
                                                <p className='font-semibold text-gray-600 text-2xl'>Candidate</p>

                                                {assignment.assignmentStatus != "Live" && assignment.assignmentStatus != "Draft" ?
                                                    assignment.candidate && (
                                                        <div>
                                                            <p className='pt-4 font-semibold text-gray-600'>{assignment.candidate.firstName + ' ' + assignment.candidate.middleName + ' ' + assignment.candidate.lastName}</p>

                                                            <div className='flex justify-between pt-2'>
                                                                <div className=''>
                                                                    <p className='text-gray-600 text-sm'>{assignment.candidate.jobTitles.map((title, index) => (
                                                                        <span>{title.name + ' '}</span>
                                                                    ))}</p>

                                                                    <div className='pt-3 text-sm'>
                                                                        <p className='flex ms-1 pt-3 text-gray-500'><LuPhoneCall className='mt-1 text-lg' /> <span className='ps-1'>{assignment.candidate.phoneNumber}</span> </p>
                                                                        <p className='flex ms-1 py-1 text-gray-500'><FaRegEnvelope className='mt-1 text-lg' /> <span className='ps-1'>{assignment.candidate.emailAddress}</span> </p>
                                                                        <p className='flex ms-1 text-gray-500'> <IoLocationOutline className='mt-1 font-bold text-lg' /> <span className='ps-1 pt-1'>{assignment.candidate.city.name + ', ' + assignment.candidate.county.name}</span> </p>

                                                                        <div className='ps-2 pt-2'>
                                                                            <p className='pt-2 font-semibold text-gray-600'>Qualifications</p>
                                                                            <div className='ps-6 pt-1 text-gray-600'>
                                                                                <ul className='list-disc'>
                                                                                    {assignment.candidate.qualifications.map((qual, index) => (
                                                                                        <li key={index}>{qual.name}</li>
                                                                                    ))}
                                                                                </ul>
                                                                            </div>


                                                                            <p className='pt-5 font-semibold text-gray-600'>Experience</p>
                                                                            <div className='ps-6 pt-1 text-gray-600'>
                                                                                <ul className='space-y-1 grid grid-cols-3 list-disc'>
                                                                                    {assignment.candidate.skills.map((skill, index) => (
                                                                                        <li key={index} className=''>{skill.name}</li>
                                                                                    ))}
                                                                                </ul>
                                                                            </div>

                                                                        </div>

                                                                    </div>
                                                                </div>
                                                                <div className='flex flex-col justify-between items-end'>
                                                                    <div>
                                                                        {console.log(assignment)}
                                                                        <p className='font-semibold text-[#015693] text-xl text-end'>{'£' + assignment.candidate.rate + '/' + assignment.candidate.payFrequency.name}</p>
                                                                        <div>
                                                                            {/* <img className='mt-1 starRating' src={starRating} alt="" /> */}
                                                                            <Rating rating={assignment.candidate.rating} />
                                                                        </div>
                                                                    </div>

                                                                    <div className='flex flex-col text-gray-600 text-sm'>
                                                                        <p>Distance willing to travel:</p>
                                                                        <p className='font-semibold'>{assignment.candidate.distanceWillingToTravel + 'm'}</p>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                    : <div className='flex flex-col justify-center py-[9rem]'>
                                                        <p className='text-center'>No Candidate</p>
                                                    </div>

                                                }



                                            </div>

                                        </div>
                                    </div>

                                    <div className='bg-white mt-7 mb-7 rounded-lg'>
                                        <div className='p-5'>
                                            <h2 className='font-semibold text-gray-600 text-2xl' >Assignment Details</h2>

                                            <div className='pt-4 text-gray-600 text-sm'>
                                                <p className='whitespace-pre-wrap'>{assignment.jobDetails}</p>
                                            </div>

                                        </div>

                                    </div>

                                </div>
                                :
                                ''
                        }
                        {assignmentDetailsError && (
                            <div className='flex justify-center pt-5'>
                                <p className="text-red-500 text-sm text-center">{assignmentDetailsError}</p>
                            </div>
                        )}


                    </div>
                </div>
            </div>
        </div>
    )
}

export default AssignmentDetails