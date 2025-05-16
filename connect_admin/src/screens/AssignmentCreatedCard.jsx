import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addDays, set } from 'date-fns';
import { AssignmentChartApiCall } from '../api-call/api';


const AssignmentCreatedCard = () => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [sum, setSum] = useState(0);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  // get assignment chart data
  const getAssignmentChart = async (startDate = null, endDate = null) => {
    let currentDate;
    let monthAgo;

    if (startDate == null && endDate == null) {
      currentDate = new Date();
      monthAgo = new Date();
      monthAgo.setDate(currentDate.getDate() - 30);
    } else {
      currentDate = endDate;
      monthAgo = startDate
    }
    setDateRange([monthAgo, currentDate])
    console.log(monthAgo, currentDate)

    // Format dates to 'YYYY-MM-DDTHH:mm:ss'
    const formattedStartDate = monthAgo.toISOString().split('T')[0]; // YYYY-MM-DD
    const formattedEndDate = currentDate.toISOString().split('T')[0]; // YYYY-MM-DD

    const startDateTime = `${formattedStartDate}T00:00:00`; // 'YYYY-MM-DDTHH:mm:ss'
    const endDateTime = `${formattedEndDate}T23:59:59`; // 'YYYY-MM-DDTHH:mm:ss'

    try {
      const { response, jsonResponse, error } = await AssignmentChartApiCall(startDateTime, endDateTime);

      if (error) {
        setError(error)
        return;
      }

      if (response.ok) {
        setSum(jsonResponse.data.sum)
        setData(jsonResponse.data.values)
        return;
      } else {
        setError(jsonResponse.apierror ? jsonResponse.apierror.message : jsonResponse.title + ' ' + '(' + jsonResponse.status + ')')
        return;
      }
    } catch (error) {
      setError(error.message)
      return;
    }
  }

  //handle date change
  const handleDateChange = (update) => {
    setDateRange(update);
    if (update[0] != null && update[1] != null) {
      getAssignmentChart(update[0], update[1])
    } else if (update[0] == null && update[1] == null) {
      getAssignmentChart()
    }
  };

  useEffect(() => {
    getAssignmentChart()
  }, [])


  return (
    <div className="bg-white shadow-md p-6 rounded-lg">
      <h2 className="mb-4 font-bold text-slate-700 text-lg">Assignment Created</h2>
      <div className="mb-2 chartDate">
        <DatePicker
          selectsRange
          startDate={startDate}
          endDate={endDate}
          onChange={(update) => handleDateChange(update)}
          // minDate={new Date()}
          placeholderText="Select a date range"
        />
      </div>
      <div className="flex justify-between items-center mb-4">
        <p className='w-32 text-gray-500'>Total Assignment created</p>
        <p className="items-center text-green-500">
          <p className='font-semibold text-2xl chartDate'>{sum}</p>
          {/* <p className="text-xs">5.00% ⬆</p> */}
        </p>
      </div>
      <ResponsiveContainer width="100%" height={250}>

        {error ?
          <div className='flex flex-col justify-center items-center h-full'>
            <p className='text-red-500 text-sm'>{error}</p>
          </div>
          :
          <BarChart data={data} >
            <CartesianGrid strokeDasharray="" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#0079D0" barSize={30} radius={5} />
          </BarChart>
        }

      </ResponsiveContainer>
    </div>
  );
};

export default AssignmentCreatedCard;