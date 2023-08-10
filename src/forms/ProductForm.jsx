import React from "react";
import { Form, Input } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import { UploadProps } from 'antd';
import { Button, message, Upload, Select ,Space} from 'antd';
import { useEffect } from "react";
import { useState } from "react";
const options = [
  { _id: 1, productName: "Design" },
  { _id: 2, productName: "Audit" },
  { _id: 3, productName: "R&M" },
  { _id: 4, productName: "Project" },
];

export default function ProductForm({ isUpdateForm = false }) {
  const [vendorPrice, setVenderPrice] = useState(0);
  const [clientPrice, setClientPrice] = useState(0);
  const [grossmargin, setGrossMargin] = useState(0);

  useEffect(() => { grossMarginCalculation(clientPrice, vendorPrice) }, [grossmargin, clientPrice, vendorPrice]);

  const onVenderPriceChange = (v) => {
    setVenderPrice(v);
  }

  const onClientPriceChange = (q) => {
    console.log(q)
    setClientPrice(q);
  }

  const grossMarginCalculation = (cPrice, vPrice) => {
    if(cPrice!==0 && vPrice!==0 && cPrice!=="" && vPrice!==""){
      if (cPrice === vPrice) {
        setGrossMargin(0 + '%');
      } else {
        const per = Math.floor(((cPrice - vPrice) / vPrice) * 100);
        setGrossMargin(per + '%');
      }
    }else{
      setGrossMargin("");
    }
    
  }
  const [selectedServices, setSelectedServices] = useState([]);

  const handleSelectChange = (values) => {
    setSelectedServices(values);
  };

  const handleCustomServiceChange = (value) => {
    if (!selectedServices.includes(value) && value !== "") {
      setSelectedServices([...selectedServices, value]);
    }
  };

  return (
    <>
      <Form.Item
        label="Service Name"
        name="productName"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input type="text" />
      </Form.Item>
      <Form.Item
        label="Description"
        name="description"
        rules={[
          {
            required: true,
          },
        ]}
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
        label="Unit"
        name="unit"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <select style={{
          width: "100%",
          borderWidth: 1,
          borderColor: 'lightgrey',
          height: 34,
        }}
          placeholder="---Select---"
        >
          <option value="Runningfeet">Running Feet</option>
          <option value="Runningmeter">Running Meter</option>
          <option value="squarefeet">Square Feet</option>
          <option value="squaremeter">Square Meter</option>
          <option value="kilogram">Kilogram</option>
          <option value="nos">Nos</option>
          <option value="lumsum">Lumsum</option>
        </select>
      </Form.Item>

      <Form.Item
        label="Client HQ Name"
        name="client"
      >
        <Input type="text" />
      </Form.Item>

      <Form.Item
        label="Client Price"
        name="price"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input type="number"
          value={clientPrice}
          onChange={(e) => onClientPriceChange(e.target.value)}
        />
      </Form.Item>

      <Form.Item
        label=" VendorPrice"
        name="vendorPrice"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input type="number"
          value={vendorPrice}
          onChange={(e) => onVenderPriceChange(e.target.value)}
        />
      </Form.Item>

      <label>Gross Margin</label>
      <div style={{
        borderWidth: 1,
        borderColor: 'lightgrey',
        borderStyle: 'solid',
        width: '100%',
        height: 29,
        paddingLeft: 10,
        marginBottom: 19,
      }}>
        <p>{grossmargin}</p>
      </div>
      <Form.Item
        label="Attachment if any"
        name="upload"
      >
        <Input type="File" />
      </Form.Item>
    </>
  );
}
