import React from "react";
import { Table } from "antd";
import { DonationColumnNames } from "./columns";
import "antd/dist/antd.css";

const CustomTable = ({ data, onChange }) => {
  return (
    <Table
      columns={DonationColumnNames}
      dataSource={data}
      onChange={onChange}
    />
  );
};

export default CustomTable;
