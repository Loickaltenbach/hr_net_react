import React from 'react';

interface Props {
  title: string;
  value: string;
  type?: string;
  onChangeValue: (text: string) => void;
}

const CustomInput: React.FC<Props> = ({ title, value, onChangeValue, type }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeValue(event.target.value);
  };

  return (
    <div>
      <p>{title}</p>
      <input id='text' aria-label="text" type={type??'text'} value={value} onChange={handleInputChange} />
    </div>
  );
};

export default CustomInput;