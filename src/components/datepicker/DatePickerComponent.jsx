import React, { useState, useContext } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './datepicker.css'
import { MachineContext } from '../../hooks/ContextAPI/MachineContext';

function DatePickerComponent({ isStartDate }) {
    const [selectedDate, setSelectedDate] = useState(null);

    const { startDate, setStartDate, endDate, setEndDate } = useContext(MachineContext);


     const handleDateChange = (date) => {
    if (isStartDate) {
      setStartDate(date); // Update start date
    } else {
      setEndDate(date); // Update end date
    }
  };

  // const handleDateChange = (date) => {
  //   setSelectedDate(date);
  // };

  return (
     <div>
      <DatePicker
        // selected={selectedDate}
        // onChange={handleDateChange}
        // dateFormat="yyyy-MM-dd"
        // placeholderText="Select a date"
        // className="custom-datepicker"

        selected={isStartDate ? startDate : endDate}
        onChange={handleDateChange}
        dateFormat="yyyy-MM-dd"
        placeholderText="Select a date"
        className="custom-datepicker"

      />
    </div>
  )
}

export default DatePickerComponent