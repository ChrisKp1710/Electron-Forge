import React from "react";

export interface TableProps {
  data: any[];
}

export const Table: React.FC<TableProps> = ({ data }) => {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
          </tr>
        </thead>
      </table>
    </>
  );
};
