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
  onSelect: any;
};

const Dropdown: React.FC<DropdownProps> = ({
  title,
  items,
  defaultLabel,
  onSelect,
}) => {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    console.log('', items);
  }, [items]);

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
        <img src={arrow} />
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
