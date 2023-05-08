import React from 'react';

interface Props {
  id: string;
  title: string;
  value: string;
  type?: string;
  onChangeValue: (text: string) => void;
}

const CustomInput: React.FC<Props> = ({ id, title, value, onChangeValue, type }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeValue(event.target.value);
  };

  return (
    <div>
      <p>{title}</p>
      <input id={`customInput_${id}`} aria-label="text" type={type??'text'} value={value} onChange={handleInputChange} />
    </div>
  );
};

export default CustomInput;