import React, { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { addDays } from 'date-fns';
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { CiMenuKebab } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";
import subscribtionLogoBlack from "../../assets/subscribtionLogoBlack.png";
import { PiPlusCircleLight } from "react-icons/pi";
import { CiEdit } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { details } from '../../screens/config'
import { CallCities, CallCounties, CallCountries } from '../../api-call/api';

export const LocationLookup = () => {
    const [isOpenCities, setIsOpenCities] = useState(false);
    const [openCountryIndex, setOpenCountryIndex] = useState(null);
    const [openCountyIndex, setOpenCountyIndex] = useState(null);
    const [countries, setCountries] = useState([])
    const [counties, setCounties] = useState([])
    const [cities, setCities] = useState([])
    //error states
    const [getItemsError, setGetItemsError] = useState(null);

    // Call Get Countries API
    const getCountries = async () => {
        try {
            const { response, jsonResponse, error } = await CallCountries();
            if (error) {
                setGetItemsError(error)
                return;
            }
            if (response.ok) {
                setCountries(jsonResponse.data);
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

    // Call Get Counties API
    const getCounties = async (countryId) => {
        try {
            const { response, jsonResponse, error } = await CallCounties(countryId);
            if (error) {
                setGetItemsError(error)
                return;
            }
            if (response.ok) {
                setCounties(jsonResponse.data);
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

    // Call Get Cities API
    const getCities = async (countyId) => {
        try {
            const {response, jsonResponse, error} = await CallCities(countyId);
            if (error) {
                setGetItemsError(error)
                return;
            }
            if (response.ok) {
                setCities(jsonResponse.data);
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


    const toggleCountry = (index, countryId) => {
        setOpenCountryIndex(prevIndex => prevIndex === index ? null : index);
        // Fetch County
        getCounties(countryId)
    };

    const toggleCounty = (index, countyId) => {
        setOpenCountyIndex(prevIndex => prevIndex === index ? null : index);
        // Fetch Cities
        getCities(countyId)
    };

    useEffect(() => {
        getCountries();
    }, [])


    return (
        <div>
            {/* START CITIES */}
            <div className='flex justify-center mb-4'>
                <div className='bg-white mt-4 mb-5 px-3 rounded-lg lookupsContiner'>
                    <div className="flex items-center">
                        <div className="flex items-center ps-1 pt-3 cursor-pointer lookupContainerListTittleDiv" onClick={() => setIsOpenCities(!isOpenCities)}>
                            <h2 className='pe-2 pb-2 font-semibold text-gray-700'>2. Locations</h2>
                            {isOpenCities ? (<FaChevronUp className="pb-1 text-gray-500 text-xl lookupContainerListExpandIcon" />) : (<FaChevronDown className="pb-1 text-gray-500 text-xl lookupContainerListExpandIcon" />)}
                        </div>
                        {getItemsError && <div className='w-full text-red-500 text-sm text-end'>{getItemsError}</div>}

                        {/* <div className='flex justify-end lookupActionIconDiv'>
                            <CiCirclePlus className='pt-1 font-bold text-4xl addIcon' />
                        </div> */}
                    </div>


                    <hr className='border border-gray-300 lookupCardHr' />


                    <div className="" id='cities'>
                        {isOpenCities ?
                            <div>
                                {countries.length > 0 ?
                                    countries.map((country, index) => (
                                        <div className="py-2 border-gray-200 border-b">
                                            <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleCountry(index, country.id)}>
                                                <span className="text-md">{country.name}</span>
                                                <div className="flex items-center">
                                                    {/* <CiMenuKebab className="mr-2 w-4 h-4 text-gray-400" /> */}
                                                    {openCountryIndex === index ? <FaChevronUp className="pb-1 text-gray-500 text-xl lookupContainerListExpandIcon" /> : <FaChevronDown className="pb-1 text-gray-500 text-xl lookupContainerListExpandIcon" />}
                                                </div>
                                            </div>
                                            {openCountryIndex === index && (
                                                <div className="bg-gray-50 mt-2 p-2 rounded">
                                                    {counties.map((county, indexx) => (
                                                        <div className='py-2 border-gray-200 border-b'>
                                                            <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleCounty(indexx, county.id)}>
                                                                <span className="text-sm">{county.name}</span>
                                                                <div className="flex items-center">
                                                                    {/* <CiMenuKebab className="mr-2 w-4 h-4 text-gray-400" /> */}
                                                                    {openCountyIndex === indexx ? <FaChevronUp className="pb-1 text-gray-500 text-md lookupContainerListExpandIcon" /> : <FaChevronDown className="pb-1 text-gray-500 text-md lookupContainerListExpandIcon" />}
                                                                </div>
                                                            </div>
                                                            {openCountyIndex === indexx && (
                                                                <div className="bg-white mt-2 p-2 rounded">
                                                                    {cities.map((city, indexxx) => (
                                                                        <div className='px-5 py-2 border-gray-200 border-b'>
                                                                            <div className="flex justify-between items-center">
                                                                                <span className="text-xs">{city.name}</span>
                                                                                {/* <div className=" ">
                                                                                    <CiMenuKebab className="mr-2 w-4 h-4 text-gray-400" />
                                                                                </div> */}
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))
                                    : <p className='text-red-500 text-center'>No Country Found</p>
                                }
                            </div>
                            : null
                        }

                    </div>
                </div>
            </div>
            {/* END CITIES */}
        </div>
    )
}