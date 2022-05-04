import React, { useState, useEffect } from "react";
import CustomTable from "../../components/Table";
import Axios from "axios";
import {
  AllDonationItemsWrapper,
  ButtonTableWrapper,
} from "./alldonations.style";
import { dummy } from "../../components/Table/dummydata";
import Button from "../../components/Button";
import { Modal } from "antd";
import AddDonationForm from "../AddDonation";
import { ALL_ENDPOINT, BASE_URL } from "../../constants";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const AllDonationItems = () => {
  const [allItems, setAllItems] = useState();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const antIcon = <LoadingOutlined style={{ fontSize: 60 }} spin />;

  useEffect(() => {
    getData();
  }, [showModal]);

  const getData = async () => {
    Axios.get(BASE_URL + ALL_ENDPOINT)
      .then((res) => {
        setAllItems(
          res.data.map((row) => ({
            name: row.name,
            reference: row.reference.text,
            price: row?.price?.amount,
            status: row.status.name,
            location: row.location.name,
            theme: row.theme.name,
          }))
        );
      })
      .catch((err) => {
        alert("something went wrong", err);
      });
    setLoading(false);
  };

  const handleOk = () => {
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <>
      <AllDonationItemsWrapper>
        <Button onClick={() => setShowModal(true)}>ADD ITEM</Button>
        {loading ? (
          <Spin indicator={antIcon} />
        ) : (
          <CustomTable data={allItems} />
        )}{" "}
      </AllDonationItemsWrapper>

      <Modal
        footer={null}
        visible={showModal}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose
      >
        <AddDonationForm setShowModal={setShowModal} />
      </Modal>
    </>
  );
};

export default AllDonationItems;
