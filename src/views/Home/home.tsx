// src/views/Home/home.tsx
import { Form } from "../../components/Form/form";
import { Table } from "../../components/Table/table";
import React from "react";

export const Home: React.FC = () => {
  return (
    <div>
      <Form />
      <div>
        <Table data={[]} />
      </div>
    </div>
  );
};
