import React, { useState } from 'react';

interface TableColumn {
  name: string;
  key: string;
}

interface TableProps {
  data: any[];
  columns: TableColumn[];
}

const Table = ({ data, columns }: TableProps) => {
  const [sortColumn, setSortColumn] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<boolean>(true);

  const handleSort = (key: string) => {
    if (key === sortColumn) {
      setSortOrder(!sortOrder);
    } else {
      setSortColumn(key);
      setSortOrder(true);
    }
  };

  const sortedData = [...data].sort((a, b) => {
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];
    if (aValue === bValue) {
      return 0;
    }
    if (sortOrder) {
      return aValue < bValue ? -1 : 1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  return (
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key} onClick={() => handleSort(column.key)}>
              {column.name}
              {sortColumn === column.key && sortOrder && ' ▲'}
              {sortColumn === column.key && !sortOrder && ' ▼'}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row) => (
          <tr key={row}>
            {columns.map((column) => (
              <td key={column.key}>{row[column.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
