import react from 'react';
import { details } from '../screens/config.js'
import { HandleCatchBlockError } from "./handle-catch-block-errors.js";


//LOGIN
export const LoginApi = async (email, password) => {
    const requestBody = {
        "emailAddress": email,
        "password": password
    }
    try {
        const apiUrl = `http://${details.baseUrl}/user/authenticate`;
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)

        })

        const jsonResponse = await response.json();
        return { response, jsonResponse }
    } catch (error) {
        const errorMessage = HandleCatchBlockError(error);
        return { error: errorMessage };
    }
}


// NOTIFICATIONS

// Get Notifications
export const CallNotifications = async () => {
    try {
        const apiUrl = `http://${details.baseUrl}/administration/notification`;
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${details.Authorization}`
            }
        })

        const jsonResponse = await response.json();
        return { response, jsonResponse }

    } catch (error) {
        const errorMessage = HandleCatchBlockError(error);
        return { error: errorMessage };
    }
}


// ASSIGNMENTS

// Get list of assignments
export const AssignmentApiCall = async (currentPage, pageSize, searchTerm) => {
    try {
        const apiUrl = `http://${details.baseUrl}/administration/assignments?page=${currentPage}&pageSize=${pageSize}&searchTerm=${searchTerm}`;
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${details.Authorization}`
            }
        })

        const jsonResponse = await response.json();
        console.log(jsonResponse)

        return { response, jsonResponse }

    } catch (error) {
        const errorMessage = HandleCatchBlockError(error);
        return { error: errorMessage };
    }
}


// Get Assignment Details
export const AssignmentDetailsApiCall = async (id) => {
    try {
        const apiUrl = `http://${details.baseUrl}/administration/assignments/${id}`;
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${details.Authorization}`
            }
        })

        const jsonResponse = await response.json();
        return { response, jsonResponse }

    } catch (error) {
        const errorMessage = HandleCatchBlockError(error);
        return { error: errorMessage };
    }
}

// Update Assignment Status
export const UpdateAssignmentStatusApiCall = async (id, status) => {

    try {
        const apiUrl = `http://${details.baseUrl}/administration/assignments/${id}/status`;
        const response = await fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${details.Authorization}`
            },
            body: status
        })

        const jsonResponse = await response.json();
        return { response, jsonResponse }

    } catch (error) {
        const errorMessage = HandleCatchBlockError(error);
        return { error: errorMessage };
    }
}



// DISPUTES

// get disputes
export const getDisputesApi = async (id) => {
    try {
        const apiUrl = `http://${details.baseUrl}/administration/disputes/${id}`;
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${details.Authorization}`
            }
        })

        const jsonResponse = await response.json();
        return { response, jsonResponse }

    } catch (error) {
        const errorMessage = HandleCatchBlockError(error);
        return { error: errorMessage };
    }
}

// put disputes
export const putDisputeApi = async (id, resolution) => {
    try {
        const apiUrl = `http://${details.baseUrl}/administration/disputes/${id}?resolution=${resolution}`;
        const response = await fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${details.Authorization}`
            }
        })

        const jsonResponse = await response.json();
        return { response, jsonResponse }

    } catch (error) {
        const errorMessage = HandleCatchBlockError(error);
        return { error: errorMessage };
    }
}



// SUBSCRIPTIONS

//get subscriptions
export const GetSubscription = async () => {
    try {
        const apiUrl = `http://${details.baseUrl}/subscription/plan-group`;
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${details.Authorization}`
            }
        })

        const jsonResponse = await response.json();
        return { response, jsonResponse }
    } catch (error) {
        const errorMessage = HandleCatchBlockError(error);
        return { error: errorMessage };
    }
}

// put subscription
export const PutSubscription = async (subscriptionId, planName, planDescription, postingLimit, planPrice, planPeriod, fileName, planAvailability) => {
    console.log(subscriptionId, planName, planDescription, postingLimit, planPrice, planPeriod, fileName)
    const requestBody = {
        "name": planName,
        "description": planDescription,
        "iconUrl": fileName,
        "postingLimit": postingLimit,
        "period": planPeriod.toUpperCase(),
        "amount": planPrice,
        "status": planAvailability
    }
    try {
        const apiUrl = `http://${details.baseUrl}/subscription/plans/${subscriptionId}`;
        const response = await fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${details.Authorization}`
            },
            body: JSON.stringify(requestBody)
        })

        const jsonResponse = await response.json();
        return { response, jsonResponse }

    } catch (error) {
        const errorMessage = HandleCatchBlockError(error);
        return { error: errorMessage };
    }
}


// LOOKUPS

// Get Industries
export const CallIndustries = async () => {
    try {
        const apiUrl = `http://${details.baseUrl}/administration/lookup/industry`;
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${details.Authorization}`
            }
        })

        const jsonResponse = await response.json();
        return { response, jsonResponse }


    } catch (error) {
        const errorMessage = HandleCatchBlockError(error);
        return { error: errorMessage };
    }
}

// Get Jobs
export const CallJobs = async (id) => {
    try {
        const apiUrl = `http://${details.baseUrl}/administration/lookup/job-title?industryId=${id}`;
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${details.Authorization}`
            }
        })

        const jsonResponse = await response.json();
        return { response, jsonResponse }


    } catch (error) {
        const errorMessage = HandleCatchBlockError(error);
        return { error: errorMessage };
    }
}

//Get countries
export const CallCountries = async () => {
    try {
        const apiUrl = `http://${details.baseUrl}/lookup/countries`;
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })

        const jsonResponse = await response.json();
        return { response, jsonResponse }


    } catch (error) {
        const errorMessage = HandleCatchBlockError(error);
        return { error: errorMessage };
    }
}


//Get counties
export const CallCounties = async (countryId) => {
    try {
        const apiUrl = `http://${details.baseUrl}/lookup/counties?countryId=${countryId}`;
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })

        const jsonResponse = await response.json();
        return { response, jsonResponse }


    } catch (error) {
        const errorMessage = HandleCatchBlockError(error);
        return { error: errorMessage };
    }
}


//Get cities
export const CallCities = async (countyId) => {
    try {
        const apiUrl = `http://${details.baseUrl}/lookup/cities?countyId=${countyId}`;
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })

        const jsonResponse = await response.json();
        return { response, jsonResponse }


    } catch (error) {
        const errorMessage = HandleCatchBlockError(error);
        return { error: errorMessage };
    }
}



// Get Notice Period
export const CallNoticePeriod = async () => {
    try {
        const apiUrl = `http://${details.baseUrl}/administration/lookup/notice-period`;
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${details.Authorization}`
            }
        })

        const jsonResponse = await response.json();
        return { response, jsonResponse }


    } catch (error) {
        const errorMessage = HandleCatchBlockError(error);
        return { error: errorMessage };
    }
}

// Get Right to Work API
export const CallRightToWork = async () => {
    try {
        const apiUrl = `http://${details.baseUrl}/administration/lookup/right-to-work`;
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${details.Authorization}`
            }
        })

        const jsonResponse = await response.json();
        return { response, jsonResponse }


    } catch (error) {
        const errorMessage = HandleCatchBlockError(error);
        return { error: errorMessage };
    }
}

// GetQualifications API
export const CallQualifications = async (industryId) => {
    try {
        const apiUrl = `http://${details.baseUrl}/lookup/qualifications?industryId=${industryId}`;
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })

        const jsonResponse = await response.json();
        return { response, jsonResponse }


    } catch (error) {
        const errorMessage = HandleCatchBlockError(error);
        return { error: errorMessage };
    }
}

// Get Skills API
export const CallSkills = async (industryId) => {
    try {
        const apiUrl = `http://${details.baseUrl}/administration/lookup/skill?industryId=${industryId}`;
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${details.Authorization}`
            }
        })

        const jsonResponse = await response.json();
        return { response, jsonResponse }


    } catch (error) {
        const errorMessage = HandleCatchBlockError(error);
        return { error: errorMessage };
    }
}


// Get pay frequencies
export const CallPayFrequencies = async () => {
    try {
        const apiUrl = `http://${details.baseUrl}/lookup/pay-frequencies`;
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })

        const jsonResponse = await response.json();
        return { response, jsonResponse }


    } catch (error) {
        const errorMessage = HandleCatchBlockError(error);
        return { error: errorMessage };
    }
}


// Get work options
export const CallWorkOptions = async () => {
    try {
        const apiUrl = `http://${details.baseUrl}/lookup/workplace-types`;
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })

        const jsonResponse = await response.json();
        return { response, jsonResponse }


    } catch (error) {
        const errorMessage = HandleCatchBlockError(error);
        return { error: errorMessage };
    }
}

// Get identity documents
export const CallIdentityDocuments = async () => {
    try {
        const apiUrl = `http://${details.baseUrl}/administration/lookup/identity-document`;
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${details.Authorization}`
            }
        })

        const jsonResponse = await response.json();
        return { response, jsonResponse }


    } catch (error) {
        const errorMessage = HandleCatchBlockError(error);
        return { error: errorMessage };
    }
}

// Get assignment status
export const CallAssignmentStatus = async () => {
    try {
        const apiUrl = `http://${details.baseUrl}/administration/lookup/assignment-status`;
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${details.Authorization}`
            }
        })

        const jsonResponse = await response.json();
        return { response, jsonResponse }


    } catch (error) {
        const errorMessage = HandleCatchBlockError(error);
        return { error: errorMessage };
    }
}

// Get assignment durations
export const CallAssignmentDurations = async () => {
    try {
        const apiUrl = `http://${details.baseUrl}/lookup/assignment-durations`;
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${details.Authorization}`
            }
        })

        const jsonResponse = await response.json();
        return { response, jsonResponse }


    } catch (error) {
        const errorMessage = HandleCatchBlockError(error);
        return { error: errorMessage };
    }
}

// Get distance to travel
export const CallDistanceToTravel = async () => {
    try {
        const apiUrl = `http://${details.baseUrl}/administration/lookup/distance-to-travel`;
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${details.Authorization}`
            }
        })

        const jsonResponse = await response.json();
        return { response, jsonResponse }


    } catch (error) {
        const errorMessage = HandleCatchBlockError(error);
        return { error: errorMessage };
    }
}




// ADD LOOKUPS

// Add Industry
export const AddIndustry = async (name) => {
    try {
        const apiUrl = `http://${details.baseUrl}/administration/lookup/industry?name=${name}`;
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${details.Authorization}`
            }
        })

        const jsonResponse = await response.json();
        return { response, jsonResponse }


    } catch (error) {
        const errorMessage = HandleCatchBlockError(error);
        return { error: errorMessage };
    }
}

// Add Job-title
export const AddJobTitle = async (industryId, name) => {
    try {
        const apiUrl = `http://${details.baseUrl}/administration/lookup/job-title?industryId=${industryId}&name=${name}`;
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${details.Authorization}`
            }
        })

        const jsonResponse = await response.json();
        return { response, jsonResponse }


    } catch (error) {
        const errorMessage = HandleCatchBlockError(error);
        return { error: errorMessage };
    }
}

// Add notice-period
export const AddNoticePeriod = async (name) => {
    try {
        const apiUrl = `http://${details.baseUrl}/administration/lookup/notice-period?name=${name}`;
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${details.Authorization}`
            }
        })

        const jsonResponse = await response.json();
        return { response, jsonResponse }


    } catch (error) {
        const errorMessage = HandleCatchBlockError(error);
        return { error: errorMessage };
    }
}

// Add skill
export const AddSkill = async (industryId, name) => {
    try {
        const apiUrl = `http://${details.baseUrl}/administration/lookup/skill?industryId=${industryId}&name=${name}`;
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${details.Authorization}`
            }
        })

        const jsonResponse = await response.json();
        return { response, jsonResponse }


    } catch (error) {
        const errorMessage = HandleCatchBlockError(error);
        return { error: errorMessage };
    }
}

// Add qualification
export const AddQualification = async (industryId, name) => {
    try {
        const apiUrl = `http://${details.baseUrl}/administration/lookup/qualification?industryId=${industryId}&name=${name}`;
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${details.Authorization}`
            }
        })

        const jsonResponse = await response.json();
        return { response, jsonResponse }


    } catch (error) {
        const errorMessage = HandleCatchBlockError(error);
        return { error: errorMessage };
    }
}

// Add distance to travel
export const AddDistanceToTravel = async (value) => {
    try {
        const apiUrl = `http://${details.baseUrl}/administration/lookup/distance-to-travel?value=${value}`;
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${details.Authorization}`
            }
        })

        const jsonResponse = await response.json();
        return { response, jsonResponse }


    } catch (error) {
        const errorMessage = HandleCatchBlockError(error);
        return { error: errorMessage };
    }
}

// Add identity document
export const AddIdentityDocument = async (value) => {
    try {
        const apiUrl = `http://${details.baseUrl}/administration/lookup/identity-document?name=${value}`;
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${details.Authorization}`
            }
        })

        const jsonResponse = await response.json();
        return { response, jsonResponse }


    } catch (error) {
        const errorMessage = HandleCatchBlockError(error);
        return { error: errorMessage };
    }
}

// Add right to work
export const AddRightToWork = async (name, rank) => {
    try {
        const apiUrl = `http://${details.baseUrl}/administration/lookup/right-to-work?name=${name}&rank=${rank}`;
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${details.Authorization}`
            }
        })

        const jsonResponse = await response.json();
        return { response, jsonResponse }


    } catch (error) {
        const errorMessage = HandleCatchBlockError(error);
        return { error: errorMessage };
    }
}


// DELETE LOOKUPS

// Delete Industry
export const DeleteIndustry = async (id) => {
    try {
        const apiUrl = `http://${details.baseUrl}/administration/lookup/industry/${id}`;
        const response = await fetch(apiUrl, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${details.Authorization}`
            }
        })

        const jsonResponse = await response.json();
        console.log(jsonResponse)
        return { response, jsonResponse }


    } catch (error) {
        const errorMessage = HandleCatchBlockError(error);
        return { error: errorMessage };
    }
}

// Delete Job
export const DeleteJob = async (id) => {
    try {
        const apiUrl = `http://${details.baseUrl}/administration/lookup/job-title/${id}`;
        const response = await fetch(apiUrl, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${details.Authorization}`
            }
        })

        const jsonResponse = await response.json();
        console.log(jsonResponse)
        return { response, jsonResponse }


    } catch (error) {
        const errorMessage = HandleCatchBlockError(error);
        return { error: errorMessage };
    }
}

// Delete Qualification
export const DeleteQual = async (id) => {
    try {
        const apiUrl = `http://${details.baseUrl}/administration/lookup/qualification/${id}`;
        const response = await fetch(apiUrl, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${details.Authorization}`
            }
        })

        const jsonResponse = await response.json();
        console.log(jsonResponse)
        return { response, jsonResponse }


    } catch (error) {
        const errorMessage = HandleCatchBlockError(error);
        return { error: errorMessage };
    }
}

// Delete notice period
export const DeleteNoticePeriod = async (id) => {
    try {
        const apiUrl = `http://${details.baseUrl}/administration/lookup/notice-period/${id}`;
        const response = await fetch(apiUrl, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${details.Authorization}`
            }
        })

        const jsonResponse = await response.json();
        console.log(jsonResponse)
        return { response, jsonResponse }


    } catch (error) {
        const errorMessage = HandleCatchBlockError(error);
        return { error: errorMessage };
    }
}

// Delete skills
export const DeleteSkills = async (id) => {
    try {
        const apiUrl = `http://${details.baseUrl}/administration/lookup/skill/${id}`;
        const response = await fetch(apiUrl, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${details.Authorization}`
            }
        })

        const jsonResponse = await response.json();
        console.log(jsonResponse)
        return { response, jsonResponse }


    } catch (error) {
        const errorMessage = HandleCatchBlockError(error);
        return { error: errorMessage };
    }
}

// Delete distance to travel
export const DeleteDistanceToTravel = async (id) => {
    try {
        const apiUrl = `http://${details.baseUrl}/administration/lookup/distance-to-travel/${id}`;
        const response = await fetch(apiUrl, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${details.Authorization}`
            }
        })

        const jsonResponse = await response.json();
        console.log(jsonResponse)
        return { response, jsonResponse }


    } catch (error) {
        const errorMessage = HandleCatchBlockError(error);
        return { error: errorMessage };
    }
}

// Delete identity document
export const DeleteIdentityDocument = async (id) => {
    try {
        const apiUrl = `http://${details.baseUrl}/administration/lookup/identity-document/${id}`;
        const response = await fetch(apiUrl, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${details.Authorization}`
            }
        })

        const jsonResponse = await response.json();
        console.log(jsonResponse)
        return { response, jsonResponse }


    } catch (error) {
        const errorMessage = HandleCatchBlockError(error);
        return { error: errorMessage };
    }
}

// Delete right to work
export const DeleteRightToWork = async (id) => {
    try {
        const apiUrl = `http://${details.baseUrl}/administration/lookup/right-to-work/${id}`;
        const response = await fetch(apiUrl, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${details.Authorization}`
            }
        })

        const jsonResponse = await response.json();
        console.log(jsonResponse)
        return { response, jsonResponse }


    } catch (error) {
        const errorMessage = HandleCatchBlockError(error);
        return { error: errorMessage };
    }
}


// Edit LOOKUPS

// Edit skill
export const EditSkill = async (id, industryId, name) => {
    try {
        const apiUrl = `http://${details.baseUrl}/administration/lookup/skill/${id}?industryId=${industryId}&name=${name}`;
        const response = await fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${details.Authorization}`
            }
        })

        const jsonResponse = await response.json();
        return { response, jsonResponse }


    } catch (error) {
        const errorMessage = HandleCatchBlockError(error);
        return { error: errorMessage };
    }
}

// Edit right to work
export const EditRightToWork = async (id, name, rank) => {
    try {
        const apiUrl = `http://${details.baseUrl}/administration/lookup/right-to-work/${id}?name=${name}&rank=${rank}`;
        const response = await fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${details.Authorization}`
            }
        })

        const jsonResponse = await response.json();
        return { response, jsonResponse }


    } catch (error) {
        const errorMessage = HandleCatchBlockError(error);
        return { error: errorMessage };
    }
}

// Edit qualifications
export const EditQualification = async (id, industryId, name) => {
    try {
        const apiUrl = `http://${details.baseUrl}/administration/lookup/qualification/${id}?industryId=${industryId}&name=${name}`;
        const response = await fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${details.Authorization}`
            }
        })

        const jsonResponse = await response.json();
        return { response, jsonResponse }


    } catch (error) {
        const errorMessage = HandleCatchBlockError(error);
        return { error: errorMessage };
    }
}

// Edit notice period
export const EditNoticePeriod = async (id, name) => {
    try {
        const apiUrl = `http://${details.baseUrl}/administration/lookup/notice-period/${id}?name=${name}`;
        const response = await fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${details.Authorization}`
            }
        })

        const jsonResponse = await response.json();
        return { response, jsonResponse }


    } catch (error) {
        const errorMessage = HandleCatchBlockError(error);
        return { error: errorMessage };
    }
}

// Edit job title
export const EditJobTitle = async (id, industryId, name) => {
    try {
        const apiUrl = `http://${details.baseUrl}/administration/lookup/job-title/${id}?industryId=${industryId}&name=${name}`;
        const response = await fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${details.Authorization}`
            }
        })

        const jsonResponse = await response.json();
        return { response, jsonResponse }


    } catch (error) {
        const errorMessage = HandleCatchBlockError(error);
        return { error: errorMessage };
    }
}

// Edit industry
export const EditIndustry = async (id, name) => {
    try {
        const apiUrl = `http://${details.baseUrl}/administration/lookup/industry/${id}?name=${name}`;
        const response = await fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${details.Authorization}`
            }
        })

        const jsonResponse = await response.json();
        return { response, jsonResponse }


    } catch (error) {
        const errorMessage = HandleCatchBlockError(error);
        return { error: errorMessage };
    }
}

// Edit identity document
export const EditIdentityDocument = async (id, name) => {
    try {
        const apiUrl = `http://${details.baseUrl}/administration/lookup/identity-document/${id}?name=${name}`;
        const response = await fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${details.Authorization}`
            }
        })

        const jsonResponse = await response.json();
        return { response, jsonResponse }


    } catch (error) {
        const errorMessage = HandleCatchBlockError(error);
        return { error: errorMessage };
    }
}




//CHARTS

// get client chart data
export const ClientChartApiCall = async (startDate, endDate) => {
    try {
        const apiUrl = `http://${details.baseUrl}/administration/dashboard/charts/client?startDate=${startDate}&endDate=${endDate}`
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${details.Authorization}`
            }
        })
        const jsonResponse = await response.json();
        return { response, jsonResponse }

    } catch (error) {
        const errorMessage = HandleCatchBlockError(error);
        return { error: errorMessage };
    }
}


//assignment chart
export const AssignmentChartApiCall = async (startDate, endDate) => {
    try {
        const apiUrl = `http://${details.baseUrl}/administration/dashboard/charts/assignment?startDate=${startDate}&endDate=${endDate}`
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${details.Authorization}`
            }
        })
        const jsonResponse = await response.json();
        return { response, jsonResponse }

    } catch (error) {
        const errorMessage = HandleCatchBlockError(error);
        return { error: errorMessage };
    }
}


//candidate chart
export const CandidateChartApiCall = async (startDate, endDate) => {
    try {
        const apiUrl = `http://${details.baseUrl}/administration/dashboard/charts/candidate?startDate=${startDate}&endDate=${endDate}`
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${details.Authorization}`
            }
        })
        const jsonResponse = await response.json();
        return { response, jsonResponse }

    } catch (error) {
        const errorMessage = HandleCatchBlockError(error);
        return { error: errorMessage };
    }
}



//Job created chart
export const JobCreatedChartApiCall = async (startDate, endDate) => {
    try {
        const apiUrl = `http://${details.baseUrl}/administration/dashboard/charts/job?startDate=${startDate}&endDate=${endDate}`
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${details.Authorization}`
            }
        })
        const jsonResponse = await response.json();
        return { response, jsonResponse }

    } catch (error) {
        const errorMessage = HandleCatchBlockError(error);
        return { error: errorMessage };
    }
}