import React, { ReactNode } from 'react';
import '../style/container.css';

interface ContainerProps {
  title: string;
  children: ReactNode;
}

const Container = ({ title, children }: ContainerProps) => {
  return (
    <div className="container">
      <p className='title'>{title}</p>
      <div className="content">{children}</div>
    </div>
  );
};

export default Container;