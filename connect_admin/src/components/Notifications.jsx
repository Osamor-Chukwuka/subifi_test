import React, { useEffect, useState } from 'react';
import "../styles/styles.css";
import cancelIcon from '../../src/assets/cancelButton.png'
import logo from '../../src/assets/creedFixLogo.png'
import { CallNotifications } from '../api-call/api';
export const Notification = ({ handleNotifications }) => {
    // states
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [expanded, setExpanded] = useState({});

    // Function to toggle the expanded state for a notification
    const toggleExpanded = (index) => {
        setExpanded((prevState) => ({
            ...prevState,
            [index]: !prevState[index],
        }));
    };

    // call notfications
    const getNotifications = async () => {
        setLoading(true)
        try {
            const { response, jsonResponse, error } = await CallNotifications();
            if (error) {
                setError(error)
                setLoading(false)
                return;
            }

            if (response.ok) {
                setNotifications(jsonResponse.data)
                setLoading(false)
            } else {
                setError(jsonResponse.apierror ? jsonResponse.apierror.message : jsonResponse.title)
                setLoading(false)
                return;
            }

        } catch (error) {
            console.log(error);
            setError(error.message)
            setLoading(false)
        }

    }

    // calculate time in minutes ago
    function minutesAgo(timeString) {
        const inputTime = new Date(timeString);
        const currentTime = new Date();

        const diffInMilliseconds = currentTime - inputTime;

        // Convert milliseconds to minutes, hours, days, and months
        const minutes = Math.floor(diffInMilliseconds / (1000 * 60));
        const hours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
        const days = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
        const months = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24 * 30.44)); // Approximate month length

        // Determine the appropriate time difference
        if (minutes < 60) {
            return `${minutes} minute(s) ago`;
        } else if (hours < 24) {
            return `${hours} hour(s) ago`;
        } else if (days < 30) {
            return `${days} day(s) ago`;
        } else {
            return `${months} month(s) ago`;
        }
    }

    useEffect(() => {
        getNotifications()
    }, [])


    const handleShowNotifications = () => {
        handleNotifications();
    }
    return (
        <div className='h-full'>
            <div className="bg-white shadow-gray-400 shadow-lg py-5 border max-w-96 h-96 overflow-y-auto no-scrollbar">
                <div className="flex justify-between items-center px-7">
                    <p className="text-[#454545] text-[20px]">Notifications</p>
                    <div className='w-[32px] h-[32px]'>
                        <img onClick={handleShowNotifications} className='cursor-pointer' src={cancelIcon} alt="cancel button" />
                    </div>
                </div>

                {/* <div className='my-3 px-7'>
                    <p className='font-semibold text-[#015693] text-[14px]'>Unread(2)</p>
                </div> */}

                {/* Unread notifications UI */}
                {/* <div className=''>
                    {messages.map((element, index) => (
                        <div className='bg-[#E9F5FF] mb-2'>
                            <div className='flex items-center space-x-2 p-3 w-full'>
                                <div className='w-[40px] h-[40px]'>
                                    <img className='rounded-2xl' src={element.image} alt="" />
                                </div>
                                <div className='flex flex-col w-full'>
                                    <p className='font-semibold text-[#4F4F4F] text-[14px]'>{element.name}</p>
                                    <div className="flex items-end">
                                        <p className='max-w-60 text-[12px]'>{element.description} <span className='font-bold text-[#015693] cursor-pointer'>see more</span></p>
                                        <p className='font-semibold text-[#454545] text-[13px]'>{element.time}</p>
                                    </div>
                                   
                                </div>
                                
                            </div>



                        </div>
                    ))}
                </div> */}

                {/* Ealier */}
                {/* <div className='my-3 px-7'>
                    <p className='font-semibold text-[#4F4F4F] text-[14px]'>Earlier</p>
                </div> */}

                <div className=''>
                    {loading ?
                        <div className='flex justify-center items-center'>
                            <div className='loader'></div>
                        </div>
                        :
                        notifications.length > 0 ?
                            notifications.map((element, index) => {
                                const isExpanded = expanded[index];
                                const maxLength = 50; // Set max length for truncation
                                const truncatedBody = element.body.length > maxLength
                                    ? `${element.body.slice(0, maxLength)}...`
                                    : element.body;

                                return (
                                    <div key={index} className='mb-2'>
                                        <div className='flex items-center space-x-2 p-3 w-full'>
                                            <div className='w-[40px] h-[40px]'>
                                                <img className='rounded-2xl' src={logo} alt="" />
                                            </div>
                                            <div className='flex flex-col w-full'>
                                                <p className='font-semibold text-[#4F4F4F] text-[14px]'>{element.title}</p>
                                                <div className="flex items-end">
                                                    <p className='max-w-60 text-[12px]'>                                                    {isExpanded ? element.body : truncatedBody}
                                                        {element.body.length > maxLength && (
                                                            <span
                                                                className="font-bold text-[#015693] cursor-pointer"
                                                                onClick={() => toggleExpanded(index)}
                                                            >
                                                                {isExpanded ? ' see less' : ' see more'}
                                                            </span>
                                                        )}
                                                    </p>
                                                    <p className='font-semibold text-[#454545] text-[13px]'>{minutesAgo(element.dateCreated)}</p>
                                                </div>
                                                {/* <p className=''>nk</p> */}
                                            </div>
                                            {/* <div className='flex flex-col justify-end border'>
                                        <p>life</p>
                                    </div> */}
                                        </div>



                                    </div>
                                )

                            })
                            :
                            error == null ?
                                <div className='flex justify-center'>
                                    <p className='text-small text-center'>No notifications</p>
                                </div>
                                : ''
                    }
                    {error && (
                        <p className='text-red-500 text-sm text-center'>{error}</p>
                    )}
                </div>

                {/* <p className='px-7 font-bold text-[#015693] text-[14px] text-end cursor-pointer'>See all notifications</p> */}
            </div>
        </div>
    )
}