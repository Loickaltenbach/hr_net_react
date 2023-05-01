import React, { useEffect, useState } from "react";
import "../style/dropdown.css";
import arrow from "../assets/arrow.svg";

type MenuItem = {
  label: string;
  value: string;
};

type DropdownProps = {
  title: string;
  items: MenuItem[];
  defaultLabel: string;
  selectedItem: MenuItem | null;
  setSelectedItem: (item: MenuItem) => void;
  onSelect: (item: MenuItem) => void;
};

const Dropdown: React.FC<DropdownProps> = ({
  title,
  items,
  defaultLabel,
  selectedItem,
  setSelectedItem,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    console.log('', items);
  }, []);

  const handleItemClick = (item: MenuItem) => {
    setSelectedItem(item);
    onSelect(item);
    setIsOpen(false);
  };

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="dropdown" style={{ cursor: "pointer" }}>
      <p>{title}</p>
      <div className="dropdown-toggle" onClick={toggleOpen}>
        {selectedItem ? selectedItem.label : defaultLabel}
        <img height={20} width={20} alt="arrow" src={arrow} />
      </div>
      {isOpen && (
        <ul className="dropdown-menu">
          {items.map((item) => (
            <p key={item.value} onClick={() => handleItemClick(item)}>
              {item.label}
            </p>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
