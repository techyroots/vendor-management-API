import React, { useEffect, useState } from "react";
import { Form, Input, Row, Col, Card, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Layout, Button } from "antd";
import { Bar,Pie } from "react-chartjs-2";
import { DashboardLayout } from "@/layout";
import RecentTable from "@/components/RecentTable";
import useFetch from "@/hooks/useFetch";
import { request } from "@/request";
import ReactStars from "react-rating-stars-component";
import TextArea from "antd/lib/input/TextArea";
import { useDispatch } from "react-redux";
import { crud } from "@/redux/crud/actions";
const { Content } = Layout;
const {Meta} = Card;

// import Admin from "./Admin";
const permissions = JSON.parse(localStorage.getItem('auth')).permissions;
export default function Dashboard() {
  const [reminder, setReminder] = useState("");
  const [form] = Form.useForm();
  const adminList = useFetch(() => {
    return request.list("admin");
  }).result;

  let admin =
    adminList &&
    adminList.filter(
      (res) => res._id == JSON.parse(localStorage.getItem("auth")).current.id
    )[0];

  useEffect(() => {
    if (adminList) {
      admin = adminList.filter(
        (res) => res._id == JSON.parse(localStorage.getItem("auth")).current.id
      )[0];

      setReminder(admin.reminder);
    }
  }, [adminList]);

  useEffect(() => {
    reminder != null && form.setFieldsValue({ reminder: reminder });
  }, [reminder]);

  const dOptions = {
    schedule: [
      { label: "Requirement Received", value: "requirement received" },
      { label: "Site Visit Done", value: "site visit done" },
      { label: "Vendor BOQ Received", value: "vendor boq received" },
      { label: "Client BOQ Received", value: "client boq received" },
      {
        label: "Email Confimation Received",
        value: "email confirmation received",
      },
      { label: "PO Received", value: "po received" },
      { label: "Vendor Allotted", value: "vendor allotted" },
    ],
    start: [
      { label: "Team Aligned", value: "team aligned" },
      { label: "Delay From Client", value: "delay from client" },
    ],
    close: [
      { label: "Work Done", value: "work done" },
      { label: "Updated BOQ Sent", value: "updated boq sent" },
      { label: "Admin Approval", value: "admin approval" },
    ],
    audit: [
      { label: "Client Updated BOQ Sent", value: "client updated boq sent" },
      { label: "Update Approval", value: "updated po received" },
      { label: "Sent for invoicing", value: "sent for invoicing" },
    ],
    finished: [
      // {
      //   client: {
      //     label: "Invoice Received",
      //     value: "invoice recieved",
      //     value: "Payment Done",
      //     value: "payment done",
      //   },
      // },

      // {
      //   vendor: {
      //     label: "Invoice Sent",
      //     value: "invoice sent",
      //     label: "Payement Recieved",
      //     value: "payment recieved",
      //   },
      // },
      { label: "Invoice Sent", value: "invoice sent" },
      { label: "Payment Received", value: "payment received" },
      { label: "Invoice Received", value: "invoice received" },
      { label: "Payment Done", value: "payment done" },
    ],
  };

  const dispatch = useDispatch();
  const [totalJob, setJob] = useState(0);
  const [totalVendor, setVendor] = useState(0);
  const entity = "job";
  const entityVendor = "vendor";
  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [modal3, setModal3] = useState(false);
  const [modal4, setModal4] = useState(false);
  const [statusModal, setStatus] = useState(false);
  const [jobStatus, setJobStatus] = useState();
  const [isOpen, setIsOpen] = useState(false);
  // const [isFormVisible, setIsFormVisible] = useState(false);

  const [isEscVisible, setIsEscVisible] = useState(false);
  const [isFormVisible, setFormVisible] = useState(false);

  const showForm = () => {
    setFormVisible(true);
  };

  const hideForm = () => {
    setFormVisible(false);
  };
  const showEscForm = () => {
    setIsEscVisible(true);
  };

  const hideEscForm = () => {
    setIsEscVisible(false);
  };
  const handleEscLinkClick = () => {
    setIsEscVisible(true);
  };

  const handleLinkClick = () => {
    setFormVisible(true);
  };

  const toggleModal = () => {
    setModal(!modal);
  };
  const toggleModal2 = () => {
    setModal2(!modal2);
  };
  const toggleModal3 = () => {
    setModal3(!modal3);
  };
  const toggleModal4 = () => {
    setModal4(!modal4);
  };
  const toggleStatusModal=()=>{
    setStatus(!statusModal);
  }

  if (modal || modal1 || statusModal || modal2 || modal3 || modal4) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(true);

  // Form submission handler
  const handleSubmit = (e) => {
    // e.preventDefault();

    // Send the announcement data to the server or perform any necessary actions
    // ...

    // Reset the form after submission

    setTitle("");
    setContent("");
    setIsFormOpen(false);
    console.log(title, content, isOpen);
    window.location.reload();
  };
  

  const handleClose = () => {
    // Close the form when the close button is clicked
    setIsFormOpen(false);
    window.location.reload();
  };

  if (!isFormOpen) {
    // Return null if the form is closed
    return null;
  }

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
    window.location.reload();
  };

  const handleEscClose = () => {
    // Close the form when the close button is clicked
    setIsEscOpen(false);
    window.location.reload();
  };

  if (!isEscOpen) {
    // Return null if the form is closed
    return null;
  }

  const ratingChanged = (newRating) => {
    console.log(newRating);
  };

  const toggleModal1 = () => {
    setModal1(!modal1);
  };

  const fetchvendors = () => {
    return request.list(entityVendor, {});
  };

  const fetchjobs = () => {
    return request.list(entity, {});
  };

  const { result, isLoading, isSuccess } = useFetch(fetchvendors);
  const jobs = useFetch(fetchjobs);

  useEffect(() => {
    if (Array.isArray(result)) {
      setVendor(result.length);
    }
  }, [result]);

  useEffect(() => {
    if (Array.isArray(jobs.result)) {
      setJob(jobs.result.length);
    }
  }, [jobs.result]);

  const handleStatus = (current, job) => {
    setStatus((s) => !s);
    setJobStatus(job);
  };

  const render = (status, record) => {
    return (
      <Button onClick={() => handleStatus(status, record)}>
        {status.toUpperCase()}
      </Button>
    );
  };

  // const changeStatus = (val) => {
  //   const updated = { ...jobStatus, ...val };
  //   dispatch(crud.update("job", updated["_id"], updated));
  //   setStatus((s) => !s);
  //   window.location.reload();
  // };
  const changeStatus = (val) => {
    // Extract the form values
    const formValues = {
      status: val.status,
      remarks: val.remarks,
      picture: val.picture && val.picture[0], // Assuming you want to save only the first selected picture
    };
  
    // Update the jobStatus object with the form values
    const updated = { ...jobStatus, ...formValues };
  
    // Dispatch an action to update the job in the database
    dispatch(crud.update("job", updated["_id"], updated));
  
    // Update the status (if needed)
    setStatus((s) => !s);
  
    // Reload the page to reflect the changes
    window.location.reload();
  };
  const handleStatusSubmit = () => {
    // Perform any additional validation or processing before saving the form data
    // ...
  
    // Call the changeStatus function to save the form data
    changeStatus(form.getFieldsValue());
  
    // Optionally, you can perform additional actions after saving the form data
    // ...
  };
  
  const handleStatusCancel = () => {
    // Perform any necessary actions when the user cancels the form
    // ...
  };
  

  const addReminder = (val) => {
    const notes = { ...admin, ...val };
    dispatch(crud.update("admin", admin._id, notes));
    window.location.reload();
  };

  const moveToNextTable = (job) => {
    const currentTable = Object.keys(dOptions).filter((key) => {
      const values = dOptions[key].map((val) => val["value"]);
      return values.includes(job["status"]);
    })[0];
    const nextTable =
      Object.keys(dOptions)[Object.keys(dOptions).indexOf(currentTable) + 1];

    const updated = { ...job, status: dOptions[nextTable][0].value };
    dispatch(crud.update("job", updated["_id"], updated));
    setStatus((s) => !s);
    window.location.reload();
  };

  const leadColumns = [
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Job Title",
      dataIndex: "title",
    },
    {
      title: "Job Location",
      dataIndex: "district",
    },
    {
      title: "Client Name",
      dataIndex: "client",
    },
    {
      title: "vendor name",
      dataIndex: "vendorname",
    },
    {
      title: "Admin",
      dataIndex: "admin",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: render,
    },
  ];

  const productColumns = [
    {
      title: "Job Title",
      dataIndex: "title",
    },
    {
      title: "vendor name",
      dataIndex: "vendorname",
    },
    {
      title: "Client HQ Name",
      dataIndex: "client",
    },
    {
      title: "Client  HQ Phone No.",
      dataIndex: "hqphone",
    },
    {
      title: "Client HQ E-mail",
      dataIndex: "hqemail",
    },
    {
      title: "Budget",
      dataIndex: "budget",
    },

    {
      title: "Start Date",
      dataIndex: "startdate",
    },
    {
      title: "Site Name",
      dataIndex: "sitename",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: render,
    },
  ];

  const closeColumns = [
    {
      title: "Job Title",
      dataIndex: "title",
    },
    {
      title: "vendor name",
      dataIndex: "vendorname",
    },
    {
      title: " End Date",
      dataIndex: "enddate",
    },
    {
      title: " Site dox",
      dataIndex: "dox",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: render,
    },
    {
      title: "Add Job Sheet",
      dataIndex: "sheet",
    },
    {
      title: "Add Customer Review",
      dataIndex: "Review",
    },
    {
      title: "Submit Bill Pic",
      dataIndex: "dox",
    },
  ];

  const auditColumns = [
    {
      title: "Job Title",
      dataIndex: "title",
    },
    {
      title: "vendor name",
      dataIndex: "vendorname",
    },
    {
      title: "Client Site Name",
      dataIndex: "sitename",
    },
    {
      title: "Client Site Phone No.",
      dataIndex: "managerphone",
    },
    {
      title: "Client Site E-mail",
      dataIndex: "clientemail",
    },
    {
      title: " Start Date",
      dataIndex: "startdate",
    },
    {
      title: " End Date",
      dataIndex: "enddate",
    },
    // {
    //   title: "Before Pic",
    //   dataIndex: "dox",
    // },
    {
      title: "After pic",
      dataIndex: "dox",
    },
    {
      title: "Approve Work",
      dataIndex: "dox",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: render,
    },
  ];

  const finishedColumns = [
    {
      title: "Job Title",
      dataIndex: "title",
    },
    {
      title: "vendor name",
      dataIndex: "vendorname",
    },
    {
      title: " Vendor Budget",
      dataIndex: "budget",
    },
    {
      title: "Client Billing",
      dataIndex: "client billing",
    },
    {
      title: "Client Invoice  No.",
      dataIndex: "invoice no.",
    },
    {
      title: "Client Invoice Amount",
      dataIndex: "invoice amount",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: render,
    },
  ];
  const data1 = {
    labels: ["Jobs Closed", "Jobs Pending", "Dead Jobs"],
    datasets: [
      {
        data: [3, 5, 1],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  const data2 = {
    labels: ["Invoice Received", "Payment Received", "Invoice Pending"],
    datasets: [
      {
        data: [2, 1, 2],
        backgroundColor: ["#2ECC71", "#9B59B6", "#FFA500"],
        hoverBackgroundColor: ["#2ECC71", "#9B59B6", "#FFA500"],
      },
    ],
  };
   const data3 = {
    labels: ['Client A', 'Client B', 'Client C', 'Client D'],
    datasets: [
      {
        label: 'Sales',
        data: [5, 8, 6, 9],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#2ECC71'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#2ECC71'],
      },
    ],
  };

  const data4 = {
    labels: ['Vendor X', 'Vendor Y', 'Vendor Z'],
    datasets: [
      {
        label: 'Sales',
        data: [3, 4, 2],
        backgroundColor: ['#FF6361', '#FFCD6B', '#6B5BFF'],
      hoverBackgroundColor: ['#FF6361', '#FFCD6B', '#6B5BFF'],
      },
    ],
  };

  const data5 = {
    labels: ['Jaipur', 'New Delhi', 'Lucknow', 'Bhopal'],
    datasets: [
      {
        label: 'Sales',
        data: [10, 7, 5, 8],
        backgroundColor: ['#2ECC71', '#9B59B6', '#FFA500', '#FF6384'],
        hoverBackgroundColor: ['#2ECC71', '#9B59B6', '#FFA500', '#FF6384'],
      },
    ],
  };
  console.log(permissions)
  return (<>
    <DashboardLayout>
    {permissions==="superadmin"?
      // <Layout>
        // <Content>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "100vh",
            }}
          >
            <div style={{ padding: "20px", maxWidth: "800px" }}>
              <h1 style={{ textAlign: "center", fontSize: "16px", fontWeight: "700"}}>Superadmin Dashboard</h1>
              <Row gutter={[16, 16]} justify="center">
                <Col xs={24} sm={12}>
                  <Card style={{ textAlign: "center" }}>
                    <Meta title="Jobs" />
                    <div style={{ height: "320px" }}>
                      <Pie data={data1} />
                    </div>
                  </Card>
                </Col>
                <Col xs={24} sm={12}>
                  <Card style={{ textAlign: "center" }}>
                    <Meta title="Sales" />
                    <div style={{ height: "320px" }}>
                      <Pie data={data2} />
                    </div>
                  </Card>
                </Col>
                <Col xs={24}>
                  <Card style={{ textAlign: 'center' }}>
                    <Meta title="Client Sales" />
                    <div style={{ height: '350px' }}>
                      <Bar
                        data={data3}
                        options={{
                          scales: {
                            y: {
                              beginAtZero: true,
                            },
                          },
                        }}
                      />
                    </div>
                  </Card>
                </Col>
                <Col xs={24}>
                  <Card style={{ textAlign: 'center' }}>
                    <Meta title="Vendor Sales" />
                    <div style={{ height: '350px' }}>
                      <Bar
                        data={data4}
                        options={{
                          scales: {
                            y: {
                              beginAtZero: true,
                            },
                          },
                        }}
                      />
                    </div>
                  </Card>
                </Col>
                <Col xs={24}>
                  <Card style={{ textAlign: 'center' }}>
                    <Meta title="Region Sales" />
                    <div style={{ height: '350px' }}>
                      <Bar
                        data={data5}
                        options={{
                          scales: {
                            y: { beginAtZero: true },
                          },
                        }}
                      />
                    </div>
                  </Card>
                </Col>
              </Row>
            </div>
          </div>
      //   {/* </Content>
      // </Layout> */}
      :
      <>
        {/* <Admin/> */}
        {statusModal && (
          <div className="modal">
            <div
              onClick={toggleModal1}
              className="overlay"
              style={{
                background: "rgba(49,49,49,0.8)",
                width: "100vw",
                height: "100vh",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                position: "fixed",
                zIndex: "10",
              }}
            ></div>
            <div
              className="modal-content"
              style={{
                position: "fixed",
                top: "40%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                lineHeight: 1.4,
                background: "#f1f1f1",
                padding: "14px 28px",
                borderRadius: "3px",
                maxWidth: "600px",
                minWidth: "409px",
                zIndex: 11,
              }}
            >
              <Form onFinish={changeStatus}>
                <h3>Change Job Status</h3>
                <Form.Item label="Status" name="status">
                  <Select
                    defaultValue={jobStatus && jobStatus["status"]}
                    options={
                      jobStatus &&
                      Object.values(dOptions).filter((j) => {
                        return j.some((obj) => {
                          if (
                            jobStatus["status"] == "pending" &&
                            obj.value == "requirement received"
                          ) {
                            return true;
                          }
                          return obj.value == jobStatus["status"];
                        });
                      })[0]
                    }
                  ></Select>
                </Form.Item>
                <Form.Item
                  name="remarks"
                  label="Remarks"
                  rules={[{ required: true, message: "Please provide remarks" }]}
                >
                  <Input.TextArea />
                </Form.Item>

                <Form.Item
                  name="picture"
                  label="Upload Picture"
                  valuePropName="fileList"
                  getValueFromEvent={(e) => e.fileList}
                >
                  <Upload name="logo" action="/upload.do" listType="picture">
                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                  </Upload>
                </Form.Item>

                <Form.Item>
                  <Button type="primary" onClick={handleStatusSubmit}>
                    Submit
                  </Button>
                  <Button type="primary" onClick={toggleStatusModal}>
                    Cancel
                  </Button>
                  {/* <Button onClick={hideForm}>Cancel</Button> */}
                </Form.Item>
              </Form>
            </div>
          </div>
        )}

        <div className="space30"></div>
        <Row gutter={[20, 20]}>
          <Col className="gutter-row" span={6}>
            <div className="whiteBox shadow" style={{ height: "380px" }}>
              <div
                className="pad20"
                style={{ textAlign: "center", justifyContent: "center" }}
              >
                <h3 style={{ color: "#22075e", marginBottom: 30 }}>
                  Job Preview
                </h3>
                <p style={{ color: "#1DA57A", margin: "0px", fontSize: "15px" }}>
                  Total number of Pending Jobs: {totalJob}{" "}
                </p>
                <p style={{ color: "#1DA57A", margin: "0px", fontSize: "15px" }}>
                  Jobs closed Today:{" "}
                </p>
                <p style={{ color: "#1DA57A", margin: "0px", fontSize: "15px" }}>
                  Total number of esclated jobs:{" "}
                </p>
                <p style={{ color: "#1DA57A", margin: "0px", fontSize: "15px" }}>
                  New Jobs Alloted:{" "}
                </p>
              </div>
            </div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div className="whiteBox shadow" style={{ height: "380px" }}>
              <div
                className="pad20"
                style={{ textAlign: "center", justifyContent: "center" }}
              >
                <h3 style={{ color: "#22075e", marginBottom: 30 }}>
                  Quick Links
                </h3>
                <a onClick={toggleModal2} target="_blank">
                  Create Announcement
                </a>
                <br />
                <a href="/vendor" target="_blank">
                  {" "}
                  Add New Vendor
                </a>
                <br />
                <a href="/product" target="_blank">
                  {" "}
                  Add New Service
                </a>
                <br />
                <a href="/lead" target="_blank">
                  {" "}
                  Add New Job
                </a>
                <br />
                <a onClick={toggleModal3} target="_blank">
                  Create Escalation
                </a>
                <br />
                <a onClick={toggleModal1} target="_blank">
                  {" "}
                  Find a Vendor
                </a>
                <br />
                <a onClick={toggleModal1} target="_blank">
                  {" "}
                  Find a job
                </a>
                <br />
                <a onClick={toggleModal1} target="_blank">
                  {" "}
                  Find a service
                </a>
                <br />
                <a target="_blank"> Request Approval</a>
                <br />
              </div>
            </div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div className="whiteBox shadow" style={{ height: "380px" }}>
              <div
                className="pad20"
                style={{ textAlign: "center", justifyContent: "center" }}
              >
                <h3 style={{ color: "#22075e", marginBottom: 30 }}>
                  Notification
                </h3>
                {}
              </div>
            </div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div className="whiteBox shadow" style={{ height: "380px" }}>
              <div
                className="pad20"
                style={{ textAlign: "center", justifyContent: "center" }}
              >
                <h3 style={{ color: "#22075e", marginBottom: 30 }}>Reminder</h3>
                <Form onFinish={addReminder} form={form}>
                  <Form.Item name="reminder">
                    <TextArea rows={10}></TextArea>
                  </Form.Item>
                  <Button type="primary" htmlType="submit">
                    Save
                  </Button>
                </Form>
              </div>
            </div>
          </Col>
        </Row>

        <div className="space30"></div>
        <Row gutter={[24, 24]}>
          <Col className="gutter-row" span={24}>
            <div className="whiteBox shadow">
              <div className="pad20">
                <h3 style={{ color: "#22075e", marginBottom: 5 }}>
                  Pending To Schedule
                </h3>
              </div>
              <RecentTable
                entity={"job"}
                name="schedule"
                dataTableColumns={leadColumns}
                moveToNextTable={moveToNextTable}
                dOptions={dOptions}
                jobStatus={jobStatus}
              />
              <i className="bi bi-arrow-down" style={{ color: "black" }}></i>
            </div>
          </Col>
          <Col className="gutter-row" span={24}>
            <div className="whiteBox shadow">
              <div className="pad20">
                <h3 style={{ color: "#22075e", marginBottom: 5 }}>
                  Pending to start
                </h3>
              </div>
              <RecentTable
                entity={"job"}
                name="start"
                dataTableColumns={productColumns}
                moveToNextTable={moveToNextTable}
                dOptions={dOptions}
                jobStatus={jobStatus}
              />
              <i className="bi bi-arrow-down" style={{ color: "black" }}></i>
            </div>
          </Col>
          <Col className="gutter-row" span={24}>
            <div className="whiteBox shadow">
              <div className="pad20">
                <h3 style={{ color: "#22075e", marginBottom: 5 }}>
                  Pending to Close
                </h3>
              </div>
              <RecentTable
                entity={"job"}
                name="close"
                dataTableColumns={closeColumns}
                moveToNextTable={moveToNextTable}
                dOptions={dOptions}
                jobStatus={jobStatus}
              />
              <i className="bi bi-arrow-down" style={{ color: "black" }}></i>
            </div>
          </Col>
          <Col className="gutter-row" span={24}>
            <div className="whiteBox shadow">
              <div className="pad20">
                <h3 style={{ color: "#22075e", marginBottom: 5 }}>
                  Audit And checkout
                </h3>
              </div>
              <RecentTable
                entity={"job"}
                name="audit"
                dataTableColumns={auditColumns}
                moveToNextTable={moveToNextTable}
                dOptions={dOptions}
                jobStatus={jobStatus}
              />
              <i className="bi bi-arrow-down" style={{ color: "black" }}></i>
            </div>
          </Col>
          <Col className="gutter-row" span={24}>
            <div className="whiteBox shadow">
              <div className="pad20">
                <h3 style={{ color: "#22075e", marginBottom: 5 }}>
                  Finished Jobs
                </h3>
              </div>
              <RecentTable
                entity={"job"}
                name="finished"
                dataTableColumns={finishedColumns}
                moveToNextTable={moveToNextTable}
                dOptions={dOptions}
                jobStatus={jobStatus}
              />
              <i className="bi bi-arrow-down" style={{ color: "black" }}></i>
            </div>
          </Col>

          {modal && (
            <div className="modal">
              <div
                onClick={toggleModal}
                className="overlay"
                style={{
                  background: "rgba(49,49,49,0.8)",
                  width: "100vw",
                  height: "100vh",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  position: "fixed",
                }}
              ></div>
              <div
                className="modal-content"
                style={{
                  position: "absolute",
                  top: "40%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  lineHeight: 1.4,
                  background: "#f1f1f1",
                  padding: "14px 28px",
                  borderRadius: "3px",
                  maxWidth: "600px",
                  minWidth: "409px",
                  zIndex: 1,
                }}
              >
                <form role="form">
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Search Here"
                      style={{
                        margin: "10px",
                        borderRadius: "5px",
                        padding: "4px",
                        borderColor: "powderblue",
                      }}
                    ></input>
                  </div>
                  <div className="form-group">
                    <label for="name">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Enter Name"
                      style={{
                        margin: "10px",
                        padding: "4px",
                        borderRadius: "6px",
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label for="name">Services</label>
                    <input
                      type="text"
                      className="form-control"
                      id="service"
                      placeholder="Enter Service"
                      style={{
                        margin: "10px",
                        padding: "4px",
                        borderRadius: "6px",
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <ReactStars
                      count={5}
                      onChange={ratingChanged}
                      size={24}
                      activeColor="#ffd700"
                    />
                  </div>
                </form>
                <button
                  className="close-modal ant-btn ant-btn-primary"
                  type="submit"
                  style={{
                    top: "10px",
                    right: "10px",
                    padding: "5px 8px",
                  }}
                  onClick={toggleModal}
                >
                  Save
                </button>
              </div>
            </div>
          )}
          {modal1 && (
            <div className="modal">
              <div
                onClick={toggleModal1}
                className="overlay"
                style={{
                  background: "rgba(49,49,49,0.8)",
                  width: "100vw",
                  height: "100vh",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  position: "fixed",
                }}
              ></div>
              <div
                className="modal-content"
                style={{
                  position: "absolute",
                  top: "40%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  lineHeight: 1.4,
                  background: "#f1f1f1",
                  padding: "14px 28px",
                  borderRadius: "3px",
                  maxWidth: "600px",
                  minWidth: "409px",
                  zIndex: 1,
                }}
              >
                <form role="form">
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Search Here"
                      style={{
                        margin: "10px",
                        borderRadius: "5px",
                        padding: "4px",
                        borderColor: "powderblue",
                      }}
                    ></input>
                  </div>
                  <div className="form-group">
                    <label for="name">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Enter Name"
                      style={{
                        margin: "10px",
                        padding: "4px",
                        borderRadius: "6px",
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label for="name">Services</label>
                    <input
                      type="text"
                      className="form-control"
                      id="service"
                      placeholder="Enter Service"
                      style={{
                        margin: "10px",
                        padding: "4px",
                        borderRadius: "6px",
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <ReactStars
                      count={5}
                      onChange={ratingChanged}
                      size={24}
                      activeColor="#ffd700"
                    />
                    ,
                  </div>
                </form>
                <button
                  className="close-modal ant-btn ant-btn-primary"
                  type="submit"
                  style={{
                    top: "10px",
                    right: "10px",
                    padding: "5px 8px",
                  }}
                  onClick={toggleModal1}
                >
                  Save
                </button>
              </div>
            </div>
          )}
          {modal2 && (
            <div className="modal">
              <div
                onClick={toggleModal2}
                className="overlay"
                style={{
                  background: "rgba(49,49,49,0.8)",
                  width: "100vw",
                  height: "100vh",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  position: "fixed",
                }}
              ></div>
              <div
                className="modal-content"
                style={{
                  position: "absolute",
                  top: "40%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  lineHeight: 1.4,
                  background: "#f1f1f1",
                  padding: "14px 28px",
                  borderRadius: "3px",
                  maxWidth: "600px",
                  minWidth: "409px",
                  zIndex: 1,
                }}
              >
                {/* <form role="form">
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Search Here"
                      style={{
                        margin: "10px",
                        borderRadius: "5px", 
                        padding: "4px",
                        borderColor: "powderblue",
                      }}
                    ></input>
                  </div>
                  <div className="form-group">
                    <label for="name">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Enter Name"
                      style={{
                        margin: "10px",
                        padding: "4px",
                        borderRadius: "6px",
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label for="name">Services</label>
                    <input
                      type="text"
                      className="form-control"
                      id="service"
                      placeholder="Enter Service"
                      style={{
                        margin: "10px",
                        padding: "4px",
                        borderRadius: "6px",
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <ReactStars
                      count={5}
                      onChange={ratingChanged}
                      size={24}
                      activeColor="#ffd700"
                    />
                    
                  </div>
                </form> */}
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
                    <Button
                      type="submit"
                      htmlType="submit"
                      className="close-modal ant-btn ant-btn-primary"
                      style={{
                        top: "10px",
                        right: "10px",
                        padding: "5px 8px",
                      }}
                      onClick={handleSubmit}
                    >
                      Create Announcement
                    </Button>
                    <Button
                      type="button"
                      style={{
                        top: "10px",
                        right: "10px",
                        padding: "5px 8px",
                      }}
                      onClick={toggleModal2}
                    >
                      Cancel
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          )}
          {modal3 && (
            <div className="modal">
              <div
                onClick={toggleModal3}
                className="overlay"
                style={{
                  background: "rgba(49,49,49,0.8)",
                  width: "100vw",
                  height: "100vh",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  position: "fixed",
                }}
              ></div>
              <div
                className="modal-content"
                style={{
                  position: "absolute",
                  top: "40%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  lineHeight: 1.4,
                  background: "#f1f1f1",
                  padding: "14px 28px",
                  borderRadius: "3px",
                  maxWidth: "600px",
                  minWidth: "409px",
                  zIndex: 1,
                }}
              >
                <Form onFinish={handleEscSubmit}>
                  <Form.Item>
                    <Input
                      type="text"
                      placeholder="To"
                      value={to}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Input
                      placeholder="Cc"
                      value={cc}
                      onChange={(e) => setContent(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="submit"
                      htmlType="submit"
                      className="close-modal ant-btn ant-btn-primary"
                      style={{
                        top: "10px",
                        right: "10px",
                        padding: "5px 8px",
                      }}
                      onClick={handleEscSubmit}
                    >
                      Create Escalation
                    </Button>
                    <Button
                      type="button"
                      style={{
                        top: "10px",
                        right: "10px",
                        padding: "5px 8px",
                      }}
                      onClick={toggleModal3}
                    >
                      Cancel
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          )}
          {modal4 && (
            <div className="modal">
              <div
                onClick={toggleModal2}
                className="overlay"
                style={{
                  background: "rgba(49,49,49,0.8)",
                  width: "100vw",
                  height: "100vh",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  position: "fixed",
                }}
              ></div>
              <div
                className="modal-content"
                style={{
                  position: "absolute",
                  top: "40%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  lineHeight: 1.4,
                  background: "#f1f1f1",
                  padding: "14px 28px",
                  borderRadius: "3px",
                  maxWidth: "600px",
                  minWidth: "409px",
                  zIndex: 1,
                }}
              >
                <form role="form">
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Search Here"
                      style={{
                        margin: "10px",
                        borderRadius: "5px",
                        padding: "4px",
                        borderColor: "powderblue",
                      }}
                    ></input>
                  </div>
                  <div className="form-group">
                    <label for="name">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Enter Name"
                      style={{
                        margin: "10px",
                        padding: "4px",
                        borderRadius: "6px",
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label for="name">Services</label>
                    <input
                      type="text"
                      className="form-control"
                      id="service"
                      placeholder="Enter Service"
                      style={{
                        margin: "10px",
                        padding: "4px",
                        borderRadius: "6px",
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <ReactStars
                      count={5}
                      onChange={ratingChanged}
                      size={24}
                      activeColor="#ffd700"
                    />
                  </div>
                </form>
                <button
                  className="close-modal ant-btn ant-btn-primary"
                  type="submit"
                  style={{
                    top: "10px",
                    right: "10px",
                    padding: "5px 8px",
                  }}
                  onClick={toggleModal2}
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </Row>
      </>}
    </DashboardLayout>
    </>);
}
