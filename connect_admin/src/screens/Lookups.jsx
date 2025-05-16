import React, { useEffect, useState } from 'react';
import "../styles/styles.css";
import navLogo from "../assets/navLogo.png";
import notificationIcon from "../assets/notificationIcon.png";
import logoutIcon from "../assets/logoutIcon.png";
import lookupLogoWhite from "../assets/lookupLogoWhite.png";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { RiArrowDropUpLine } from "react-icons/ri";
import 'react-datepicker/dist/react-datepicker.css';
import subscribtionLogoBlack from "../assets/subscribtionLogoBlack.png";
import { LocationLookup } from '../components/lookups/Location-lookup.jsx';
import { Notification } from '../components/Notifications';
import NoticePeriod from '../components/lookups/NoticePeriod.jsx';
import { RightToWork } from '../components/lookups/RightToWork.jsx';
import { Qualifications } from '../components/lookups/Qualifications.jsx';
import { Skills } from '../components/lookups/Skills.jsx';
import IndustryLookup from '../components/lookups/Industry.jsx';
import PayFrequenciesLookup from '../components/lookups/PayFrequencies.jsx';
import WorkOptionsLookup from '../components/lookups/WorkOptions.jsx';
import IdentityDocuments from '../components/lookups/IdentityDocuments.jsx';
import AssignmentStatus from '../components/lookups/AssignmentStatus.jsx';
import AssignmentDurations from '../components/lookups/AssignmentDurations.jsx';
import DistanceToTravel from '../components/lookups/DistanceToTravel.jsx';

// import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/solid';


const Lookups = () => {
    const [navDrop, setNavDrop] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false)
    const [workOptions, setWorkOptions] = useState([])

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



    return (
        <div className='flex'>
            <div className='leftNav ps-7 pt-9'>
                <img src={navLogo} alt="" className='w-24' />
                <div>
                    <p className='subifiLeftNav'>Subifi</p>
                    <p className='subifiInfoLeftNav'>info@subifi.com</p>
                </div>


                <div className='py-4'>
                    <div className='py-1 rounded-l-lg'>
                        <a className='flex py-3 text-gray-700' href="/">
                            <div className='flex ps-7'>
                                <div className='pe-2 pt-1'><LuLayoutDashboard className='text-lg' /></div>
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
                            <a href=""><p className='settingsNav'>Setting</p></a>

                        </div>
                        <div className=''>
                            <a href="" ><RiArrowDropUpLine className='ms-9 pb-6 text-gray-400 text-6xl' /></a>

                        </div>

                    </div>

                    <div id=''>
                        <div className='flex pb-5 rounded-l-lg align-center'>
                            <div className='ms-6 py-1 ps-9 pe-2'>
                                <img className='pt-4 subscribtionLogo' src={subscribtionLogoBlack} alt="" />
                            </div>
                            <div className='pt-4'>
                                <a href="/settings/subscription" className=''>Subscription</a>
                            </div>

                        </div>
                        <div className='flex ms-6 ps-9 pt-5 pb-2 rounded-l-lg dashboardNavTextDiv'>
                            <div className='py-1 pe-2'>
                                <img className='subscribtionLogo' src={lookupLogoWhite} alt="" />
                            </div>
                            <div className='pb-2'>
                                <a className='text-white subifiLeftNav' href="/settings/lookups">Lookups</a>
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
                            <h2 className='font-semibold text-gray-800 text-2xl dashboardText' >Settings</h2>
                        </div>
                        <div>
                            <div>
                                <p className='font-semibold adminName'>{storedUser.firstName + " " + storedUser.lastName}</p>
                            </div>

                            <div className='flex notificationDiv'>
                                <div className='flex flex-col justify-between items-center space-y-[2rem]'>
                                    <img onClick={() => setShowNotifications(!showNotifications)} className='me-4 cursor-pointer notificationIcon' src={notificationIcon} alt="" />
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

                        <h2 className='ms-1 ps-9 pt-4 font-semibold text-gray-700 text-2xl dashboardText' >Lookups</h2>

                        <div className='mt-4 max-h-[90vh] overflow-y-auto no-scrollbar'>
                            {/* INDUSTRIES AND JOB TITLES */}
                            <div>
                                <IndustryLookup />
                            </div>

                            {/* CITIES */}
                            <LocationLookup />

                            {/* Qualifications */}
                            <div>
                                <Qualifications />
                            </div>

                            {/* Skills */}
                            <div>
                                <Skills />
                            </div>

                            {/* Pay Frequencies */}
                            <div>
                                <PayFrequenciesLookup />
                            </div>

                            {/* Work Options */}
                            <div>
                                <WorkOptionsLookup />
                            </div>

                            {/* Notice period */}
                            <div>
                                <NoticePeriod />
                            </div>

                            {/* Right To Work */}
                            <div>
                                <RightToWork />
                            </div>

                            {/* Identity Documents */}
                            <div>
                                <IdentityDocuments />
                            </div>

                            {/* Assignment Status */}
                            <div>
                                <AssignmentStatus />
                            </div>

                            {/* Assignment Durations */}
                            <div>
                                <AssignmentDurations />
                            </div>

                            {/* Distance To Travel */}
                            <div>
                                <DistanceToTravel />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Lookups;