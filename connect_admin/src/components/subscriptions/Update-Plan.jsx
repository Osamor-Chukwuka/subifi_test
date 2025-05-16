import React, { useState, useEffect } from 'react';
import "../../styles/styles.css";
import 'react-datepicker/dist/react-datepicker.css';
import { numberValidator } from '../FormValidators.jsx';
import { PutSubscription } from '../../api-call/api';
import { details } from '../../screens/config.js';

const UpdatePlan = ({ subscription }) => {
    const [planName, setPlanName] = useState('');
    const [planDescription, setPlanDescription] = useState('');
    const [postingLimit, setPostingLimit] = useState('');
    const [planPrice, setPlanPrice] = useState('');
    const [planPeriod, setPlanPeriod] = useState('');
    const [fileName, setFileName] = useState('');
    const [planAvailability, setPlanAvailability] = useState('');
    // message states
    const [successMessage, setSuccessMessage] = useState(false)
    // Error States
    const [postingLimitError, setPostingLimitError] = useState(false)
    const [planPriceError, setPlanPriceError] = useState(false)
    const [apiError, setApiError] = useState(false)
    // loading state
    const [loading, setLoading] = useState(false)

    // handle Icon change
    const handleIconChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileName(file);
        } else {
            setFileName('');
        }
    };

    //handle image upload
    const handleImageUpload = async (e) => {
        e.preventDefault();
        setLoading(true)

        if (!fileName) {
            console.log("No file selected");
            handleSubmit(subscription.iconUrl)
            return;
        }


        const data = new FormData();
        data.append("file", fileName);
        data.append("upload_preset", details.uploadPreset);
        data.append("folder", details.uploadFolder);
        


        try {
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${details.CloudName}/upload`,
                {
                    method: "POST",
                    body: data,
                }
            );
            const file = await response.json();
            const imageUrl = file.secure_url;

            if (file.secure_url) {
                handleSubmit(imageUrl);
            } else {
                console.log(file)
                setApiError(file.error.message)
                setTimeout(() => {
                    setApiError(null)
                }, 4000);
                setLoading(false)
            }
        } catch (error) {
            setApiError("Upload failed", error);
            setTimeout(() => {
                setApiError(null)
            }, 4000);
            setLoading(false)
        }
    }

    // Handle Submit 
    const handleSubmit = async (imageUrl = null) => {
        // e.preventDefault()
        try {
            setLoading(true)

            setPlanPriceError(false)
            setPostingLimitError(false)
            setSuccessMessage(false)
            setApiError(false)

            // check for regex
            const planPriceValidationResult = numberValidator(planPrice)
            const postingLimitValidationResult = numberValidator(postingLimit)
            if (postingLimit != '' && postingLimitValidationResult) {
                setPostingLimitError('Posting Limit must be a number');
                setLoading(false)
                setTimeout(() => {
                    setPostingLimitError(false)
                }, 2000);
                return;
            }
            if (planPrice != '' && planPriceValidationResult) {
                setPlanPriceError('Plan amount must be a number');
                setLoading(false)
                setTimeout(() => {
                    setPlanPriceError(false)
                }, 2000);
                return;
            }

            // Check for empty fields and assign them the default values
            const finalPlanName = planName || subscription.name;
            const finalPlanDescription = planDescription || subscription.description;
            const finalPostingLimit = postingLimit || subscription.subscriptionPlans[0].postingLimit;
            const finalPlanPrice = planPrice || subscription.subscriptionPlans[0].amount;
            const finalPlanPeriod = planPeriod || subscription.subscriptionPlans[0].period;
            const finalFileName =  imageUrl || subscription.iconUrl;
            const finalPlanAvailability = planAvailability || subscription.subscriptionPlans[0].status;


            const { response, jsonResponse, error } = await PutSubscription(subscription.id, finalPlanName, finalPlanDescription, finalPostingLimit, finalPlanPrice, finalPlanPeriod, finalFileName, finalPlanAvailability)

            if (error) {
                alert(error)
                setApiError(error)
                setTimeout(() => {
                    setApiError(null)
                }, 3000);
                setLoading(false)
                return;
            }

            if (response.ok) {
                setSuccessMessage('Subscription Updated Successfully')
                window.location.reload();
                return
            }
            else {
                setApiError(jsonResponse.apierror ? jsonResponse.apierror.message : jsonResponse.title)
                setTimeout(() => {
                    setApiError(null)
                }, 3000);
                setLoading(false)
                return;
            }
        } catch (error) {
            setApiError(error.message)
            setTimeout(() => {
                setApiError(null)
            }, 3000);
            setLoading(false)
            return

        }
    }


    return (
        <div>
            <div className='me-9 mt-8 rounded-lg w-72 h-full'>
                <div className='bg-white my-3 px-3 border'>
                    <div className=''>
                        <h2 className='py-3 border-b-2 font-semibold text-slate-700 text-xl'>Update Plan</h2>
                    </div>



                    <div id='' className='py-3'>
                        <form action="" onSubmit={handleImageUpload}>
                            <div className='pb-3'>
                                <label For="planName" className='font-semibold text-slate-600 text-sm'>Plan Name</label>
                                <input onChange={(e) => setPlanName(e.target.value)} type="text" name="planName" id="planName" className='p-2 border border-gray-300 rounded-md w-full placeholder:text-sm' placeholder={subscription.name} />
                            </div>

                            <div className='py-3'>
                                <label For="planDescription" className='font-semibold text-slate-600 text-sm'>Plan Description</label>
                                <input onChange={(e) => setPlanDescription(e.target.value)} type="text" name="planDescription" id="planDescription" className='p-2 border border-gray-300 rounded-md w-full placeholder:text-sm' placeholder={subscription.description} />
                            </div>



                            <div className='py-3'>
                                <label For="planfeature" className='font-semibold text-slate-600 text-sm'>Plan Feature</label>
                                <textarea type="text" name="planfeature" id="planfeature" className='p-2 border border-gray-300 rounded-md w-full placeholder:w-48 placeholder:text-sm' placeholder='Unlimited assignment post per quarter' />
                            </div>

                            <div className='py-3'>
                                <label For="postingLimit" className='font-semibold text-slate-600 text-sm'>Posting Limit</label>
                                <input onChange={(e) => setPostingLimit(e.target.value)} type="text" name="postingLimit" id="postingLimit" className='p-2 border border-gray-300 rounded-md w-full placeholder:text-sm' placeholder={subscription.subscriptionPlans[0].postingLimit} />
                                <p className='text-red-500 text-xs text-center'>{postingLimitError}</p>
                            </div>

                            <div className='py-3'>
                                <label For="planAmount" className='font-semibold text-slate-600 text-sm'>Plan Amount</label>
                                <div className='flex w-full'>
                                    <input onChange={(e) => setPlanPrice(e.target.value)} type="text" name="planAmount" id="planAmount" className='me-4 p-2 border border-gray-300 rounded-md w-32 placeholder:text-sm' placeholder={'£' + subscription.subscriptionPlans[0].amount} />
                                    <input onChange={(e) => setPlanPeriod(e.target.value)} type="text" name="planAmountQuaterly" id="planAmountQuaterly" className='p-2 border border-gray-300 rounded-md w-32 placeholder:text-sm' placeholder={subscription.subscriptionPlans[0].period} />
                                </div>
                                <p className='text-red-500 text-xs text-center'>{planPriceError}</p>

                            </div>

                            <div className='py-3'>
                                <label For="planAmount" className='font-semibold text-slate-600 text-sm'>Plan Availability</label>
                                <div className='flex w-full'>
                                    <select onChange={(e) => setPlanAvailability(e.target.value)} className='p-2 border border-gray-300 rounded-md outline-none w-full text-sm'>
                                        <option value={subscription.subscriptionPlans[0].status}>Select Availability</option>
                                        <option value={'Available'}>Available</option>
                                        <option value={'Unavailable'}>Unavailable</option>
                                    </select>
                                </div>

                            </div>

                            <div className='py-3'>
                                <p className='pb-1 font-semibold text-slate-600 text-sm'>Plan Icon</p>
                                <div className="p-2 border border-gray-300 w-full">
                                    <label For="planIcon" className='flex justify-between font-semibold'>
                                        <img className='changePlanFormerIcon' src={subscription.iconUrl} alt="" />
                                        <p className='changePlanIconText'>Change Icon</p>
                                    </label>
                                    <span className='text-sm'>{fileName.name || ''}</span>
                                    <input onChange={handleIconChange} type="file" name="planIcon" id="planIcon" className='hidden p-2 border border-gray-300 rounded-md w-full placeholder:text-sm' placeholder='Plan Description' />
                                </div>

                            </div>

                            <div className='py-1'>
                                <p className='text-red-500 text-xs text-center'>{apiError}</p>
                                <p className='text-green-500 text-xs text-center'>{successMessage}</p>
                            </div>

                            <div className='pt-9'>
                                <button type="submit" disabled={loading} className={`py-2 rounded-md w-full text-sm text-white bg-[#015693] disabled:cursor-not-allowed disabled:bg-gray-300`}>Save Changes</button>
                            </div>
                        </form>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default UpdatePlan;