import React, { useState } from "react";

interface DateSelectorProps {
  title: string;
  onDateChange: (date: Date) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({ title, onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(event.target.value);
    setSelectedDate(date);
    onDateChange(date);
  };

  const formatDate = (date: Date | null) => {
    if (!date) {
      return "";
    }
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, "0");
    const day = `${date.getDate()}`.padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div>
      <p>{title}</p>
      <input
        type="date"
        value={formatDate(selectedDate)}
        onChange={handleDateChange}
      />
    </div>
    
  );
};

export default DateSelector;
