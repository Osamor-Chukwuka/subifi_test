import React, { useEffect, useState } from 'react';
import "../styles/styles.css";
import navLogo from "../assets/navLogo.png";
import notificationIcon from "../assets/notificationIcon.png";
import subscribtionLogoBlack from "../assets/subscribtionLogoBlack.png";
import logoutIcon from "../assets/logoutIcon.png";
import lookupLogo from "../assets/lookupLogo.png";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";
import JobsCreatedCard from './JobsCreatedCard';
import AssignmentCreatedCard from './AssignmentCreatedCard';
import ClientSignUp from './ClientSignUp';
import CandidateSignUp from './CandidateSignUp';
import 'react-datepicker/dist/react-datepicker.css';
import { addDays } from 'date-fns';
import { AssignmentApiCall } from '../api-call/api';
import { Notification } from '../components/Notifications';
import { useNavigate } from 'react-router-dom';




const Dashboard = () => {
    const [navDrop, setNavDrop] = useState(false);
    const [theAssignments, setTheAssignments] = useState([])
    const [assignmentListError, setAssignmentListError] = useState('')
    const [showNotifications, setShowNotifications] = useState(false)
    const navigate = useNavigate();

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

    // Get some Assignments
    const callAssignments = async () => {
        try {
            const { response, jsonResponse, error } = await AssignmentApiCall(0, 5, '');
            if (error) {
                setAssignmentListError(error)
                return;
            }
            if (response.ok) {
                setTheAssignments(jsonResponse.data);
                console.log(jsonResponse);
            } else {
                setAssignmentListError(jsonResponse.apierror ? jsonResponse.apierror.message : jsonResponse.title + ' ' + '(' + jsonResponse.status + ')')
                return;
            }
        } catch (error) {
            setAssignmentListError(error.message);
        }
    }

    // convert date to more readdable format
    function formatDate(dateString) {
        const date = new Date(dateString);
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        const month = months[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();

        const getOrdinalSuffix = (n) => {
            const s = ["th", "st", "nd", "rd"];
            const v = n % 100;
            return n + (s[(v - 20) % 10] || s[v] || s[0]);
        };

        return `${month} ${getOrdinalSuffix(day)}, ${year}`;
    }

    // Handle redirection to assignment details
    const handleAssignmentClick = (theAssignment) => {
        const assignmentId = (theAssignment.id)
        navigate('/assignment/details', { state: { assignmentId } });
    };

    useEffect(() => {
        callAssignments();
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
                            <a onClick={navDropdown} href="">
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
                        <div className='flex pb-5 rounded-l-lg text-gray-700 align-center'>
                            <div className='ms-6 py-1 ps-9 pe-2'>
                                <img className='pt-4 subscribtionLogo' src={subscribtionLogoBlack} alt="" />
                            </div>
                            <div className='pt-4'>
                                <a href="/settings/subscription" className=''>Subscription</a>
                            </div>

                        </div>
                        <div className='flex ms-6 ps-9 pt-5'>
                            <div className='py-1 pe-2'>
                                <img className='subscribtionLogo' src={lookupLogo} alt="" />
                            </div>
                            <div>
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
                            <a onClick={handleLogout} className='cursor-pointer' href="/login">
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
                            <h2 className='font-semibold text-gray-800 text-2xl dashboardText' >Dashboard</h2>
                        </div>
                        <div>
                            <div>
                                <p className='font-semibold adminName'>{storedUser.firstName + " " + storedUser.lastName}</p>
                            </div>

                            <div className='flex notificationDiv'>
                                <div className='flex flex-col justify-between items-center space-y-[2rem]'>
                                    <img onClick={() => setShowNotifications(!showNotifications)} className='me-5 mb-7 cursor-pointer notificationIcon' src={notificationIcon} alt="" />
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

                    <div className='max-h-[90vh] overflow-y-auto contentBodyDiv no-scrollbar'>
                        <div className='flex flex-col py-8 w-full'>
                            <div className='flex justify-center gap-9'>
                                <div className='jobsCreatedCard'>
                                    <JobsCreatedCard />
                                </div>
                                <div className='assignmentCreatedCard'>
                                    <AssignmentCreatedCard />
                                </div>
                            </div>

                            <div className='flex justify-center gap-9 py-8'>
                                <div className='jobsCreatedCard'>
                                    <ClientSignUp />
                                </div>
                                <div className='assignmentCreatedCard'>
                                    <CandidateSignUp />
                                </div>
                            </div>
                        </div>

                        <div className='px-9 pb-3 miniAssignmentTable'>
                            <div className="bg-white shadow-md p-6 rounded-lg">
                                <div className="flex justify-between mb-4">
                                    <h2 className="font-semibold assignmentText">Assignments</h2>
                                    <a href='/assignments' className="px-4 py-2 rounded font-semibold viewallText">View All</a>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full table-auto">
                                        <thead>
                                            <tr className="miniAssignmentThead">
                                                <th className="px-4 py-2 text-center">S/N</th>
                                                <th className="px-4 py-2 text-center">Title</th>
                                                <th className="px-4 py-2 text-center">Client Name</th>
                                                <th className="px-4 py-2 text-center">Candidate Name</th>
                                                <th className="mx-4 py-2 text-center">Status</th>
                                                <th className="px-4 py-2 text-center">Date Created</th>
                                            </tr>
                                        </thead>
                                        <tbody className='text-gray-600'>
                                            {theAssignments.content && theAssignments.content.length > 0 ?
                                                theAssignments.content.map((element, index) => (
                                                    <tr onClick={() => handleAssignmentClick(element)} class="border-b text-center cursor-pointer">
                                                        <td class="px-4 py-2">{index + 1}</td>
                                                        <td class="px-4 py-2">{element.jobTitle}</td>
                                                        <td class="px-4 py-2">{element.companyName}</td>
                                                        <td class="px-4 py-2">{element.candidateLastName ? element.candidateLastName + ' ' + element.candidateFirstName : 'N/A'}</td>
                                                        <td class="py-2">
                                                            <span class={`${element.status == 'Completed' ? 'completed' : element.status == 'Ongoing' ? 'ongoing' : element.status == 'Live' ? 'bg-green-100 text-green-800' : element.status == 'Disputed' ? 'disputed' : ''} rounded-md  font-semibold text-sm px-6 py-1 `}>{element.status}</span>
                                                        </td>
                                                        <td class="px-4 py-2">{formatDate(element.dateCreated)}</td>
                                                    </tr>
                                                ))
                                                : <tr>
                                                    <td colSpan={6} className='py-4 text-red-500 text-center'>{assignmentListError}</td>
                                                </tr>
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Dashboard;