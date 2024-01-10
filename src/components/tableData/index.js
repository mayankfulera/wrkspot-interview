import { flexRender } from '@tanstack/react-table';
import React from 'react';
import './tableData.css';

const ReactTable = ({ table, filteredData, loading }) => {
  const isLink = (text, cell) => {
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return urlRegex.test(text);
  };
  return (
    <div>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        {loading ? (
          <div className="loading">Loading...</div>
        ) : filteredData?.length > 0 ? (
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {cell.column.id === 'flag' ||
                    cell.column.id === 'emblem' ? (
                      isLink(cell.getValue()) ? (
                        <img
                          width="20px"
                          src={cell.getValue()}
                          alt={cell.id}
                        ></img>
                      ) : (
                        <>NA</>
                      )
                    ) : (
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        ) : null}
      </table>
    </div>
  );
};

export default React.memo(ReactTable);
