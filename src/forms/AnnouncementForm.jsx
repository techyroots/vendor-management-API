import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import { Button, DatePicker, Form, Input, Select, Space, message } from "antd";
import { request } from "@/request";
import useFetch from "@/hooks/useFetch";

import SelectAsync from "@/components/selectasyn";
import PopupSelect from "@/components/PopupSelect";
import moment from "moment";

const { Option } = Select;
const AnnouncementForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isOpen, setIsOpen] = useState(true);

  // Form submission handler
  const handleSubmit = (e) => {
    // e.preventDefault();

    // Send the announcement data to the server or perform any necessary actions
    // ...

    // Reset the form after submission
    setTitle("");
    setContent("");
    setIsOpen(false);
    console.log(title, content, isOpen);
    window.location.reload();
  };

  const handleClose = () => {
    // Close the form when the close button is clicked
    setIsOpen(false);
    window.location.reload();
  };

  if (!isOpen) {
    // Return null if the form is closed
    return null;
  }

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item>
        <Input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Item>
      <Form.Item>
        <Input
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </Form.Item>
      <Form.Item>
        <Button type="submit" htmlType="submit">
          Create Announcement
        </Button>
        <Button type="button" onClick={handleClose}>
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AnnouncementForm;
