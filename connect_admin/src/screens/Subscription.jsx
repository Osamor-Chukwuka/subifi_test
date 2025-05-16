import React, { useState, useEffect } from 'react';
import "../styles/styles.css";
import navLogo from "../assets/navLogo.png";
import notificationIcon from "../assets/notificationIcon.png";
import subscribtionLogo from "../assets/subscribtionLogo.png";
import logoutIcon from "../assets/logoutIcon.png";
import checkMarkIcon from "../assets/checkMarkIcon.png";
import lookupLogo from "../assets/lookupLogo.png";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { RiArrowDropUpLine } from "react-icons/ri";
import 'react-datepicker/dist/react-datepicker.css';
import UpdatePlan from '../components/subscriptions/Update-Plan.jsx';
import { Notification } from '../components/Notifications';
import { GetSubscription } from '../api-call/api';




const Subscription = () => {
    const [showNotifications, setShowNotifications] = useState(false)
    const [fileName, setFileName] = useState('');
    const [subscriptionPlans, setSubscriptionPlans] = useState([]);
    const [selectedSubscription, setSelectedSubscription] = useState(null);
    const [error, setError] = useState(null);

    const handleShowNotifications = () => {
        setShowNotifications(false)
    }

    const subscriptionPlansAPI = async () => {
        try {
            const { response, jsonResponse, error } = await GetSubscription();
            if (error) {
                setError(error)
                return;
            }

            if (response.ok) {
                setSubscriptionPlans(jsonResponse.data);
                console.log(jsonResponse.data)
            } else {
                setError(jsonResponse.apierror ? jsonResponse.apierror.message : jsonResponse.title + ' ' + '(' + jsonResponse.status + ')')
                return;
            }

        } catch (error) {
            setError(error.message)
            return;
        }
    }


    useEffect(() => {
        subscriptionPlansAPI();
    }, []);


    // function to handle clicking on the Update Button
    const handleClickUpdate = (element) => {
        setSelectedSubscription(element);
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
                        <div className='flex pb-5 rounded-l-lg text-white align-center dashboardNavTextDiv'>
                            <div className='ms-6 py-1 ps-9 pe-2'>
                                <img className='pt-4 subscribtionLogo' src={subscribtionLogo} alt="" />
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

                    <div className='h-full contentBodyDiv'>
                        <h2 className='ms-1 ps-9 pt-4 font-semibold text-gray-700 text-2xl dashboardText' >Subscriptions</h2>
                        <div className='flex justify-between gap-0 px-9'>
                            <div className='py-8 w-90'>
                                <div className=''>
                                    <div className='gap-6 grid grid-cols-2 w-full'>
                                        {subscriptionPlans.map((element, index) => (
                                            <div className='bg-white rounded-lg w-72 h-80'>
                                                <div className='py-5 text-center'>
                                                    <div className='flex justify-center'>
                                                        <img className='plansIcon' src={element.iconUrl} alt="" />
                                                    </div>

                                                    <h3 className='font-semibold subscriptionCardTitle'>{element.name}</h3>
                                                    <h2 className='py-3 font-bold text-slate-700 text-xl'>£{element.subscriptionPlans[0].amount}/{element.subscriptionPlans[0].period}</h2>
                                                    <p className='text-gray-600 text-sm'>{element.subscriptionPlans[0].status}</p>
                                                </div>
                                                <div className='flex ps-8 w-60'>
                                                    <img className='checkMarkIcon' src={checkMarkIcon} alt="" />
                                                    <p className='ps-2 text-gray-600 text-sm'>{element.description}</p>
                                                </div>
                                                <div>
                                                    <button onClick={() => handleClickUpdate(element)} className='mx-3 mt-7 py-2 rounded-md w-64 font-semibold text-sm updateButton'>Update Plan</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {error &&
                                    <div className='flex justify-center'>
                                        <p className='pt-5 text-red-500 text-sm text-center'>{error}</p>
                                    </div>
                                }
                            </div>

                            <div key={selectedSubscription}>
                                {/* Temporary update plan section */}
                                {selectedSubscription ?

                                    <div className=''>
                                        <UpdatePlan subscription={selectedSubscription} />
                                    </div>


                                    :
                                    <div className='bg-white my-8 me-9 rounded-lg w-72 updatePlanDiv'>
                                        <div className='px-3'>
                                            <div className=''>
                                                <h2 className='py-3 border-b-2 font-semibold text-slate-700 text-xl'>Update Plan</h2>
                                            </div>

                                            <div id='temporaryUpdatePlanPtagId' className='pt-3 temporaryUpdatePlanPtag'>
                                                <p className='text-sm'>Select a plan to update</p>
                                            </div >


                                        </div>
                                    </div>
                                }
                            </div>


                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Subscription;