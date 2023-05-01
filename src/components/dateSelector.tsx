import React, { useState } from "react";

interface DateSelectorProps {
  title: string;
  onDateChange: any;
}

const DateSelector: React.FC<DateSelectorProps> = ({ title, onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(event.target.value);
    setSelectedDate(date);
    onDateChange(formatDate(date));
  };

  // Format the date to YYYY-MM-DD as serializable
  const formatDate = (date: Date | null) => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return year + "-" + (month < 10 ? "0" + month : month) + "-" + (day < 10 ? "0" + day : day);
  };

  return (
    <div>
      <p>{title}</p>
      <input
        id="date"
        aria-label="Date"
        type="date"
        value={formatDate(selectedDate)}
        onChange={handleDateChange}
      />
    </div>
    
  );
};

export default DateSelector;
