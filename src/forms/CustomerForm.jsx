import React from "react";
import { request } from "@/request";
import { Button, Form, Input, Select, Space } from "antd";
const { Option } = Select;
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import useFetch from "@/hooks/useFetch";
import { API_BASE_URL } from "@/config/serverApiConfig";

const url = API_BASE_URL;
export default function CustomerForm({ isUpdateForm = false }) {
  const [panCardImg, setPanCardImg] = useState();
  const [adharCardImg, setAdharCardImg] = useState();
  const [vendorImg, setVendorImg] = useState();
  const [gstImg, setGstImg] = useState();
  const [chequeImg, setChequeImg] = useState();
  const [PostOffice, setPostOffice] = useState([]);
  const [ifscCode, setIfscCode] = useState({});
  const { result, isLoading, isSuccess } = useFetch(() =>
    request.list("product", {})
  );

  useEffect(() => {}, [panCardImg, adharCardImg, vendorImg, gstImg, chequeImg]);

  const uploadImage = (e, img) => {
    var data = new FormData();
    data.append("file", e.target.files[0]);
    console.log(e)
    request
      .post("/files/upload", data)
      .then((res) => {
        console.log(res)
        const path = res.result.path
          .replaceAll('\\', "/")
          .replace("public", "");
        setImages(img, path);
        console.log(path);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePincode = (e) => {
    if (e.target.value >= 6) {
      axios
        .get(`https://api.postalpincode.in/pincode/${e.target.value}`)
        .then((res) => {
          if (
            res.data.data.PostOffice !== null &&
            res.data.data.PostOffice !== undefined
          ) {
            setPostOffice({
              District: res.data.data.PostOffice[0].District,
              State: res.data.data.PostOffice[0].State,
            });
          }
          console.log(res.data.data.PostOffice[0]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    {
      PostOffice.map((item) => {
        const { State, District } = item;
        return (
          <>
            <div key={State}>{District}</div>
          </>
        );
      });
    }
  };
  const [selectedServices, setSelectedServices] = useState([]);

  const handleSelectChange = (values) => {
    setSelectedServices(values);
  };

  const handleCustomServiceChange = (value) => {
    if (!selectedServices.includes(value) && value !== "") {
      setSelectedServices([...selectedServices, value]);
    }
  };

  const options = [
    { _id: 1, productName: "Design" },
    { _id: 2, productName: "Audit" },
    { _id: 3, productName: "R&M" },
    { _id: 4, productName: "Project" },
  ];
  const handleIfsc = (e) => {
    if (e.target.value.length >= 11) {
      axios
        .get(`https://ifsc.razorpay.com/${e.target.value}`)
        .then((res) => {
          if (res.data !== null && res.data !== undefined) {
            setIfscCode({
              BANK: res.data.BANK,
              BRANCH: res.data.BRANCH,
            });
          }
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const setImages = (img, path) => {
    console.log(`Image server path->>${url}${path}`);
    switch (img) {
      case "adhar":
        setAdharCardImg(`${url}${path}`);
        break;
      case "pan":
        setPanCardImg(`${url}${path}`);
        break;
      case "gst":
        setGstImg(`${url}${path}`);
        break;
      case "cheque":
        setChequeImg(`${url}${path}`);
        break;
      default:
        setVendorImg(`${url}${path}`);
        break;
    }
  };

  return (
    <>
      <h1 style={{ fontSize: "20px", textAlign: "center", color: "seagreen" }}>
        Company Details
      </h1>
      <Form.Item
        label="Service"
        name="service"
        rules={[
          {
            required: true,
            message: "Please input your Vendor Service!",
          },
        ]}
      >
        <Select
          mode="tags"
          placeholder="---Select or add custom service---"
          optionLabelProp="label"
        >
          {result &&
            result.length > 0 &&
            result.map((service) => {
              const name = service.productName;
              return (
                <Option key={service._id} value={name} label={name}>
                  <Space>{name}</Space>
                </Option>
              );
            })}
        </Select>
      </Form.Item>
      <Form.Item
        label="Vendor First Name"
        name="vendorname"
        rules={[
          {
            required: true,
            message: "Please input your FirstName!",
          },
        ]}
        style={{
          paddingRight: "5px",
        }}
      >
        <Input type="text" />
      </Form.Item>
      <Form.Item
        label="Vendor Last Name"
        name="surname"
        rules={[
          {
            required: true,
            message: "Please input your vendor Lastname!",
          },
        ]}
        style={{
          paddingLeft: "5px",
        }}
      >
        <Input type="text" />
      </Form.Item>
      <Form.Item
        label="Departments"
        name="departments"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          mode="tags"
          placeholder="---Select or add custom service---"
          optionLabelProp="label"
          value={selectedServices}
          onChange={handleSelectChange}
          
        >
          {options.map((service) => {
            const name = service.productName;
            return (
              <Option key={service._id} value={name} label={name}>
                <Space>{name}</Space>
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item
        label="Phone"
        name="phone"
        rules={[
          {
            required: true,
            message: "Please input your phone number!",
          },
        ]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item label=" Alternative Phone No." name="alternatephone">
        <Input type="number" />
      </Form.Item>
      <Form.Item
        label="E-mail"
        name="email"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Please input your E-mail!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <h1 style={{ fontSize: "20px", textAlign: "center", color: "seagreen" }}>
        Bank Details
      </h1>
      <Form.Item
        label=" Account Holder Name "
        name="holdername"
        rules={[
          {
            required: true,
            message: "Please input account holder name!",
          },
        ]}
      >
        <Input type="text" />
      </Form.Item>
      <Form.Item
        label=" Account No. "
        name="account"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item label="Name of The Bank" name="bankname">
        <div
          style={{
            marginLeft: "6px",
            border: " 1px solid grey",
            padding: "10px",
          }}
        >
          {ifscCode.BANK}
        </div>
      </Form.Item>
      <Form.Item label="Branch Name " name="branchname">
        <div
          style={{
            marginLeft: "6px",
            border: " 1px solid grey",
            padding: "10px",
          }}
        >
          <p disabled>{ifscCode.BRANCH}</p>
        </div>
      </Form.Item>
      <Form.Item
        label=" IFSC Code "
        name="code"
        rules={[
          {
            required: true,
            message: "Please input your area code!",
          },
        ]}
      >
        <Input type="text" onChange={(e) => handleIfsc(e)} />
      </Form.Item>
      <Form.Item
        label="Location Service State"
        name="state"
        style={{
          display: "inline-block",
          width: "calc(50%)",
          paddingRight: "7px",
        }}
      >
        <div
          style={{
            marginLeft: "6px",
            border: " 1px solid grey",
            padding: "10px",
          }}
        >
          <p disabled>{PostOffice.State}</p>
        </div>
      </Form.Item>

      <Form.Item
        label="Location Service District"
        name="district"
        style={{
          display: "inline-block",
          width: "calc(50%)",
          paddingLeft: "5px",
        }}
      >
        <div
          style={{
            marginLeft: "6px",
            border: " 1px solid grey",
            padding: "10px",
          }}
        >
          <p disabled>{PostOffice.District}</p>
        </div>
      </Form.Item>
      <Form.Item
        label="Pincode"
        name="pincode"
        rules={[
          {
            required: true,
            message: "Please input your area Pincode!",
          },
        ]}
      >
        <Input type="number" onChange={(e) => handlePincode(e)} />
      </Form.Item>

      <Form.Item
        label="Adhaar No."
        name="adhaarnumber"
        rules={[
          {
            required: true,
            max:16,
            message: "Maximum digits 16!",
          },
        ]}
        style={{
          display: "inline-block",
          width: "calc(50%)",
          paddingRight: "5px",
        }}
      >
        <Input type="number" />
      </Form.Item>
      {adharCardImg === undefined ? (
        <Form.Item
          label=" Upload Adhaar card"
          name="adhaarphoto"
          rules={[
            {
              required: true,
              message: "Please Upload your Adhaar card photo!",
            },
          ]}
          style={{
            display: "inline-block",
            width: "calc(50%)",
            paddingLeft: "5px",
          }}
        >
          <Input type="file" onChange={(e) => uploadImage(e, "adhar")} />
        </Form.Item>
      ) : null}
      <div
          style={{
            height: 50,
            width: 100,
            backgroundImage: "url(" + adharCardImg + ")",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        ></div>

      <Form.Item
        label="Pan No."
        name="pannumber"
        rules={[
          {
            required: true,
            message: "Please type your Pan number!",
          },
        ]}
        style={{
          display: "inline-block",
          width: "calc(50%)",
          paddingRight: "5px",
        }}
      >
        <Input type="text" />
      </Form.Item>

      {panCardImg === undefined ? (
        <Form.Item
          label=" Upload Pan card"
          name="uploadpan"
          rules={[
            {
              required: true,
              message: "Please Upload your Pan card photo!",
            },
          ]}
          style={{
            display: "inline-block",
            width: "calc(50%)",
            paddingLeft: "5px",
          }}
        >
          <Input type="file" onChange={(e) => uploadImage(e, "pan")} />
        </Form.Item>
      ) : null}

      
      {gstImg === undefined ? (
        <Form.Item label=" GST Certificate" name="gstupload">
          <Input type="file" onChange={(e) => uploadImage(e, "gst")} />
        </Form.Item>
      ) : null}
      <div
        style={{
          height: 50,
          width: 100,
          backgroundImage: "url(" + gstImg + ")",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      ></div>
      {vendorImg === undefined ? (
        <Form.Item
          label=" Vendor Photo Attachment"
          name="vendorupload"
          rules={[
            {
              required: true,
              message: "Please attach vendor photo!",
            },
          ]}
        >
          <Input type="file" onChange={(e) => uploadImage(e, "vendor")} />
        </Form.Item>
      ) : null}
      <div
        style={{
          height: 50,
          width: 100,
          backgroundImage: "url(" + vendorImg + ")",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      ></div>

      {chequeImg === undefined ? (
        <Form.Item
          label=" Cancelled Cheque or Passbook "
          name="chequeupload"
          rules={[
            {
              required: true,
              message: "Please Upload your Cancelled Cheque or Passbookn !",
            },
          ]}
        >
          <Input type="file" onChange={(e) => uploadImage(e, "cheque")} />
        </Form.Item>
      ) : null}
      <div
        style={{
          height: 50,
          width: 100,
          backgroundImage: "url(" + chequeImg + ")",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      ></div>

     
      
    </>
  );
}
