import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import "../styles/styles.css";
import navLogo from "../assets/navLogo.png";
import { useNavigate } from 'react-router-dom';
import notificationIcon from "../assets/notificationIcon.png";
import logoutIcon from "../assets/logoutIcon.png";
import lookupLogo from "../assets/lookupLogo.png";
import subscribtionLogoBlack from "../assets/subscribtionLogoBlack.png";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addDays } from 'date-fns';
import { Link } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import { AssignmentApiCall } from '../api-call/api';
import Pagination from '../components/Pagination';
import { Notification } from '../components/Notifications';

const Assignments = () => {
    const [navDrop, setNavDrop] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false)
    const [filterMenu, setFilterMenu] = useState(false);
    const [theAssignments, setTheAssignments] = useState({ content: [], totalPages: 0 });
    const [assignmentListError, setAssignmentListError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const pageSize = 10;
    const navigate = useNavigate();

    // ... other functions (navDropdown, handleLogout, etc.) remain the same
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

    const callAssignments = useCallback(async (page, searchTerm = '') => {
        setTheAssignments({ content: [], totalPages: 0 });
        setAssignmentListError('')
        setLoading(true);
        try {
            const { response, jsonResponse, error } = await AssignmentApiCall(page, pageSize, searchTerm);

            if (error) {
                setAssignmentListError(error)
                setLoading(false);
                return;
            }

            if (response.ok) {
                setTheAssignments(jsonResponse.data);
                console.log(jsonResponse)
                setTotalPages(jsonResponse.data.totalPages);
                setCurrentPage(jsonResponse.data.pageable.pageNumber);
            } else {
                setAssignmentListError(jsonResponse.apierror ? jsonResponse.apierror.message : jsonResponse.title + ' ' + '(' + jsonResponse.status + ')')
                setLoading(false);
                return;
            }
        } catch (error) {
            setAssignmentListError(error.message)
        }
        setLoading(false);
    }, []);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        callAssignments(newPage, searchTerm);
    };

    const handleSearch = (value) => {
        setSearchTerm(value);
        setCurrentPage(0);
        callAssignments(0, value);
    };

    // Handle redirection to assignment details
    const handleRowClick = (theAssignment) => {
        const assignmentId = (theAssignment.original.id)
        console.log(assignmentId)
        navigate('/assignment/details', { state: { assignmentId } });
    };

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

    const columns = useMemo(
        () => [
            {
                Header: 'S/N',
                accessor: (row, i) => i + 1,
            },
            {
                Header: 'Title',
                accessor: 'jobTitle',
            },
            {
                Header: 'Client Name',
                accessor: 'companyName',
            },
            {
                Header: 'Candidate Name',
                accessor: (row) => {
                    const lastName = row.candidateLastName || '';
                    const firstName = row.candidateFirstName || '';
                    return (lastName || firstName) ? `${lastName} ${firstName}`.trim() : null;
                },
                Cell: ({ value }) => value || 'N/A',
            },
            {
                Header: 'Status',
                accessor: 'status',
                Cell: ({ value }) => (
                    <span className={`${value === 'Completed' ? 'completed' : value === 'Ongoing' ? 'ongoing' : value === 'Live' ? 'bg-green-100 text-green-800' : value === 'Disputed' ? 'disputed' : value === 'Draft' ? 'bg-gray-500 text-white' : ''} rounded-md font-semibold text-sm px-6 py-1`}>
                        {value}
                    </span>
                ),
            },
            {
                Header: 'Date Created',
                accessor: 'dateCreated',
                Cell: ({ value }) => formatDate(value),
            },
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable(
        {
            columns,
            data: theAssignments.content || [],
        },
        useSortBy
    );

    useEffect(() => {
        callAssignments(currentPage, searchTerm);
    }, [callAssignments, currentPage, searchTerm]);

    return (
        <div className='flex'>
            {/* Left Navigation */}
            <div className='leftNav pt-9 ps-7'>
                <img src={navLogo} alt="" className='w-24' />
                <div>
                    <p className='subifiLeftNav'>Subifi</p>
                    <p className='subifiInfoLeftNav'>info@subifi.com</p>
                </div>


                <div className='py-4'>
                    <div className='py-1 rounded-l-lg dashboardNavTextDiv'>
                        <a className='flex py-3 text-white dashboardNavText' href="/">
                            <div className='flex ps-7'>
                                <div className='pt-1 pe-2'><TbLayoutDashboardFilled className='text-lg' /></div>
                                <div>Dashboard</div>
                            </div>
                        </a>
                    </div>
                    <div className='flex pt-6 text-gray-700 ps-7'>
                        <div className='pt-1 pe-2'>
                            <a onClick={navDropdown} href="">
                                <IoSettingsOutline className='text-lg' />
                            </a>

                        </div>
                        <div>
                            <a href="" onClick={navDropdown}><p className='settingsNav'>Setting</p></a>

                        </div>
                        <div className=''>
                            <a href="" onClick={navDropdown}><RiArrowDropDownLine className='pb-6 text-6xl text-gray-400 ms-9' /></a>

                        </div>

                    </div>

                    <div id='settingDropDown'>
                        <div className='flex pb-5 rounded-l-lg text-gray-700 align-center'>
                            <div className='py-1 ms-6 pe-2 ps-9'>
                                <img className='pt-4 subscribtionLogo' src={subscribtionLogoBlack} alt="" />
                            </div>
                            <div className='pt-4'>
                                <a href="/settings/subscription" className=''>Subscription</a>
                            </div>

                        </div>
                        <div className='flex pt-5 ms-6 ps-9'>
                            <div className='py-1 pe-2'>
                                <img className='subscribtionLogo' src={lookupLogo} alt="" />
                            </div>
                            <div>
                                <a className='subifiLeftNav' href="/settings/lookups">Lookups</a>
                            </div>
                        </div>

                    </div>


                    <div className='logoutSection'>
                        <hr className='border-gray-500 me-9' />
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

            {/* Main Content */}
            <div className='w-full'>
                <div className='topNav flex flex-col w-full'>
                    {/* ... (top navigation content remains the same) ... */}
                    <div className='flex justify-between px-9 pt-9'>
                        <div className='w-full'>
                            <div className="flex items-center w-2/4">
                                <div className="relative flex w-full">
                                    <div className='w-full'>
                                        <input
                                            onChange={(e) => handleSearch(e.target.value)}
                                            type="text"
                                            className="border-gray-300 px-4 py-2 border rounded-l-md focus:ring-2 focus:ring-blue-500 w-96 placeholder:text-gray-600 focus:outline-none"
                                            placeholder="&#128269; Search                                       "
                                        />
                                        <div className="left-0 absolute inset-y-0 flex items-center pr-3">
                                            {/* <img className='ms-2 searchIcon' src={searchIcon} alt="" /> */}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div>
                            <div>
                                <p className='font-semibold adminName'>{storedUser.firstName + " " + storedUser.lastName}</p>
                            </div>

                            <div className='flex notificationDiv'>
                                <div className='flex flex-col justify-between items-center space-y-[2rem]'>
                                    <img onClick={() => setShowNotifications(!showNotifications)} className='cursor-pointer me-5 notificationIcon' src={notificationIcon} alt="" />
                                    {showNotifications && (
                                        <div className='z-50 absolute mt-3'>
                                            <Notification handleNotifications={handleShowNotifications} />
                                        </div>
                                    )}
                                </div>
                                <div className='pb-2 w-64 text-center text-sm ps-4'><p className='break-all'>{storedUser.emailAddress}</p></div>
                            </div>
                        </div>
                    </div>
                    <div className='px-9 py-5 contentBodyDiv'>
                        <div className="overflow-x-auto">
                            <div className='bg-white rounded-lg'>
                                <h2 className='py-4 font-semibold text-2xl text-gray-700 dashboardText ps-4'>Assignments</h2>
                                {loading ? (
                                    <div className='flex justify-center'>
                                        <div class="loader"></div>
                                    </div>
                                ) : (
                                    <table {...getTableProps()} className="w-full table-auto">
                                        <thead>
                                            {headerGroups.map(headerGroup => (
                                                <tr {...headerGroup.getHeaderGroupProps()} className="miniAssignmentThead">
                                                    {headerGroup.headers.map(column => (
                                                        <th {...column.getHeaderProps(column.getSortByToggleProps())} className="px-4 py-2 text-left">
                                                            {column.render('Header')}
                                                            <span>
                                                                {column.isSorted
                                                                    ? column.isSortedDesc
                                                                        ? ' 🔽'
                                                                        : ' 🔼'
                                                                    : ''}
                                                            </span>
                                                        </th>
                                                    ))}
                                                </tr>
                                            ))}
                                        </thead>
                                        <tbody {...getTableBodyProps()} className='text-gray-600'>
                                            {rows.map((row, i) => {
                                                prepareRow(row)
                                                return (
                                                    <tr {...row.getRowProps()} onClick={() => handleRowClick(row)} className="cursor-pointer">
                                                        {row.cells.map(cell => {
                                                            return <td {...cell.getCellProps()} className="px-4 py-6">{cell.render('Cell')}</td>
                                                        })}
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                )}
                                <p className='text-center text-red-500'>{assignmentListError}</p>

                                {/* Pagination */}
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={handlePageChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Assignments;