import React, { useState } from "react";
import { Button, Form, Input } from "antd";

const EscalationForm = () => {
  const [to, setTo] = useState("");
  const [cc, setCc] = useState("");
  const [isEscOpen, setIsEscOpen] = useState(true);

  const handleEscSubmit = (e) => {
    // Handle form submission

    // Send the Escalation data to the server or perform any necessary actions
    // ...

    // Reset the form after submission
    setTo("");
    setCc("");
    setIsEscOpen(false);
    window.location.reload()
  };

  const handleEscClose = () => {
    // Close the form when the close button is clicked
    setIsEscOpen(false);
    window.location.reload()
  };

  if (!isEscOpen) {
    // Return null if the form is closed
    return null;
  }

  return (
    <Form onFinish={handleEscSubmit}>
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
          Create Escalation
        </Button>
        <Button type="button" onClick={handleEscClose}>
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EscalationForm;
