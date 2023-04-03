import React, { useState } from 'react';
import Modal from './modal';
import '../style/dropdown.css'
import arrow from "../assets/arrow.svg"

type MenuItem = {
  label: string;
  value: string;
};

type DropdownProps = {
  title: string;
  items: MenuItem[];
  defaultLabel: string;
  onSelect: (selectedItem: MenuItem) => void;
};

const Dropdown: React.FC<DropdownProps> = ({ title, items, defaultLabel, onSelect }) => {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleItemClick = (item: MenuItem) => {
    setSelectedItem(item);
    onSelect(item);
    setIsOpen(false);
  };

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="dropdown" style={{cursor: 'pointer'}}>
      <p>{title}</p>
      <div className="dropdown-toggle" onClick={toggleOpen}>
        {selectedItem ? selectedItem.label : defaultLabel}
        <img src={arrow} />
      </div>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        children={
          <ul className="dropdown-menu">
            {items.map((item) => (
              <li key={item.value} onClick={() => handleItemClick(item)}>
                {item.label}
              </li>
            ))}
          </ul>
        }
      />
    </div>
  );
};

export default Dropdown;
