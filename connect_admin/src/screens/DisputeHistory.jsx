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
import { useNavigate, useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Notification } from '../components/Notifications';
import { getDisputesApi } from '../api-call/api';

export default function DisputeHistory() {
    // states
    const [navDrop, setNavDrop] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false)
    const [loading, setLoading] = useState(false)
    const [dispute, setDispute] = useState([]);
    const [disputeError, setDisputeError] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();
    const { assignmentId } = location.state || {};

    // Get dispute history
    const callGetDisputesApi = async () => {
        setLoading(true)
        try {
            const {response, jsonResponse, error} = await getDisputesApi(assignmentId);

            if (error) {
                setDisputeError(error)
                setLoading(false)
                return;
            }

            if (response.ok) {
                console.log(jsonResponse);
                setDispute(jsonResponse.data);
                setLoading(false)
            } else {
                setDisputeError(jsonResponse.apierror ? jsonResponse.apierror.message : jsonResponse.title + ' ' + '(' + jsonResponse.status + ')')
                setLoading(false)
                return;
            }
        } catch (error) {
            setDisputeError(error.message)
            setLoading(false)
            return;
        }
    }

    // navigate to dispute details page
    const handleNavigateToDisputePage = () => {
        navigate(`/dispute`, { state: { assignmentId } });
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

    useEffect(() => {
        callGetDisputesApi();
    }, []);


    return (
        <div className="flex">
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

            <div className="w-full">
                <div className='topNav flex flex-col w-full'>
                    <div className='flex justify-between px-9 pt-9'>
                        <div className=''>
                            <h2 className='font-semibold text-gray-800 text-2xl dashboardText' >Dispute History</h2>
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

                    {loading ?
                        <div className='flex justify-center'>
                            <div className='loader'></div>
                        </div>

                        :
                        dispute.length > 0 ?
                            <div className="p-12 overflow-x-auto contentBodyDivLookup">
                                <table className="border w-full table-auto">
                                    <thead className="bg-white font-light text-[#757575] text-sm">
                                        <tr className="border-b-4">
                                            <th className="py-2 ps-2 max-w-[200px] text-start break-words">Assignment title</th>
                                            <th className="max-w-[200px] text-start break-words">Company Name</th>
                                            <th className="max-w-[200px] text-start break-words">Candidate Name</th>
                                            <th className="max-w-[200px] text-start break-words">Start date</th>
                                            <th className="max-w-[200px] text-start break-words">End date</th>
                                            <th className="max-w-[200px] text-start break-words">Dispute Reason</th>
                                            <th className="max-w-[200px] text-start break-words">Dispute Resolution</th>
                                            <th className="max-w-[200px] text-start break-words">Dispute Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className=''>
                                        {dispute.map((dis, index) => (
                                            <tr key={index} onClick={dis.disputeStatusId.toLowerCase() == 'open' ? () => handleNavigateToDisputePage() : null} className="bg-white border-b-4 w-16 font-light text-[#757575] text-sm cursor-pointer">
                                                <td className="py-2 ps-2 max-w-[200px] break-words">{dis.assignment.jobTitle}</td>
                                                <td className="max-w-[200px] break-words">{dis.assignment.companyName}</td>
                                                <td className="max-w-[200px] break-words">{dis.assignment.candidateFirstName + ' ' + dis.assignment.candidateLastName}</td>
                                                <td className="max-w-[200px] break-words">{dis.assignment.startDate}</td>
                                                <td className="max-w-[200px] break-words">{dis.assignment.endDate}</td>
                                                <td className="pe-2 max-w-[200px] break-words">{dis.disputeReason}</td>
                                                <td className="pe-2 max-w-[200px] break-words">{dis.resolution ? dis.resolution :'N/A'}</td>
                                                <td className={` max-w-[200px] text-center  break-words ${dis.disputeStatusId.toLowerCase() == 'reviewing' ? 'bg-green-100 text-green-400' : dis.disputeStatusId.toLowerCase() == 'open' ? 'bg-red-100 text-red-400' : ''}`}>{dis.disputeStatusId}</td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </table>
                            </div>
                            : null
                    }

                </div>
                {disputeError && (
                    <p className='pt-16 text-red-500 text-center'>{disputeError}</p>
                )}
            </div>
        </div>
    )
}