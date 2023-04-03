import React from 'react';

interface Props {
  title: string;
}

const CustomInput: React.FC<Props> = ({ title }) => {
  return (
    <div>
      <p>{title}</p>
      <input type="text" />
    </div>
  );
};

export default CustomInput;