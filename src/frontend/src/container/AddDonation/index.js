import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, InputNumber } from "antd";
import Axios from "axios";
import {
  ALL_ENDPOINT,
  BASE_URL,
  LOCATION_ENDPOINT,
  STATUS_ENDPOINT,
  THEME_ENDPOINT,
} from "../../constants";

const { Option } = Select;

const AddDonationForm = ({ setShowModal }) => {
  const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] = useState("optional");
  const [location, setLocations] = useState();
  const [theme, setThemes] = useState();
  const [nameCheck, setNameCheck] = useState();
  const onRequiredTypeChange = ({ requiredMarkValue }) => {
    setRequiredMarkType(requiredMarkValue);
  };

  useEffect(() => {
    getNames();
    getLocations();
    getThemes();
  }, []);

  const getNames = async () => {
    await Axios.get(BASE_URL + ALL_ENDPOINT)
      .then((res) => {
        setNameCheck(
          res.data.map((row) => {
            return row.name;
          })
        );
      })
      .catch((err) => {
        alert("something wrong with response");
      });
  };
  const getLocations = async () => {
    await Axios.get(BASE_URL + LOCATION_ENDPOINT)
      .then((res) => {
        setLocations(res.data);
      })
      .catch((err) => {
        alert("Something wrong with response");
      });
  };
  const getThemes = async () => {
    await Axios.get(BASE_URL + THEME_ENDPOINT)
      .then((res) => {
        setThemes(res.data);
      })
      .catch((err) => {
        alert("Something wrong with response");
      });
  };

  const onFinish = async (e) => {
    if (e.price === undefined) {
      if (nameCheck.includes(e.name)) {
        alert("please select a unique name");
      } else {
        await Axios.post(BASE_URL, {
          name: e.name,
          location: e.location,
          theme: e.theme,
        }).catch((err) => {
          alert("failed to post", err);
        });
        setShowModal(false);
      }
    } else {
      if (nameCheck.includes(e.name)) {
        alert("name should be unique");
      } else {
        await Axios.post(BASE_URL, {
          name: e.name,
          location: e.location,
          theme: e.theme,
          price: {
            currencyCode: "GBP",
            amount: e.price,
          },
        }).catch((err) => {
          alert("failed to post", err);
        });
        setShowModal(false);
      }
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        requiredMarkValue: requiredMark,
      }}
      onValuesChange={onRequiredTypeChange}
      requiredMark={requiredMark}
      onFinish={onFinish}
      onFinishFailed={(error) => {
        console.log({ error });
      }}
    >
      <Form.Item
        label="Name"
        name="name"
        required
        tooltip="This is a required field"
        rules={[
          {
            required: true,
            message: "Please enter your name",
          },
          { whitespace: true },
          { min: 1 },
        ]}
        hasFeedback
      >
        <Input required maxLength={200} placeholder="Add Name" />
      </Form.Item>
      <Form.Item
        label="Select Location"
        required
        tooltip="This is a required field"
        name="location"
        rules={[
          {
            required: true,
            message: "Please Select A Location",
          },
        ]}
      >
        <Select required placeholder="Select A Location">
          {location &&
            location?.map((data, key) => {
              return (
                <Option key={key} value={data?.id}>
                  {data.name}
                </Option>
              );
            })}
        </Select>
      </Form.Item>
      <Form.Item
        label="Select Theme"
        required
        tooltip="This is a required field"
        name="theme"
        rules={[
          {
            required: true,
            message: "Please Select A Theme",
          },
        ]}
      >
        <Select required placeholder="Select A Theme">
          {theme &&
            theme?.map((data, key) => {
              return (
                <Option key={key} value={data?.id}>
                  {data.name}
                </Option>
              );
            })}
        </Select>
      </Form.Item>

      <Form.Item
        name="price"
        label="Price"
        tooltip="Enter price in £ can not be 0"
      >
        <InputNumber placeholder="Add Price" min={1} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddDonationForm;
