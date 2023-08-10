import React, { useState } from "react";

import * as XLSX from "xlsx";
import { Button, DatePicker, Select } from "antd";

import useFetch from "@/hooks/useFetch";
import { request } from "@/request";

// STYLING FOR REPORTS SECTION
const { Option } = Select;
const rowStyle = {
  display: "grid",
  gap: "20px",
  gridTemplateColumns: "repeat(7, 1fr)",
};

const header = {
  fontWeight: "Bold",
  fontSize: "16px",
};

const colStyle = {
  display: "flex",
  flexDirection: "column",
};

const container = {
  padding: "20px",
  maxWidth: "1200px",
  margin: "10px auto",
  position: "relative",
  height: "100vh",
  marginTop: "40px",
  background: "#fff",
};

const button = {
  background: "#FF2828",
  color: "white",
};
// const finishedJobs  = jobs whose status is finished

const Report = () => {
  const [selectedFilter, setSelectedFilter] = useState("My payment history");
  // const [selectedFilter, setSelectedFilter] = useState('My payment history');
  const [clientSearchTerm, setClientSearchTerm] = useState("");
  const [vendorSearchTerm, setVendorSearchTerm] = useState("");
  const [startDateSearchTerm, setStartDateSearchTerm] = useState(null);

  const jobs = useFetch(() => request.list("job", {})).result;

  const vendors = useFetch(() => request.list("vendor", {})).result;
  const products = useFetch(() => request.list("product", {})).result;

  const handleFilterChange = (value) => {
    setSelectedFilter(value);
    setClientSearchTerm("");
    setVendorSearchTerm("");
  };

  const downloadExcel = (data) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "DataSheet.xlsx");
  };

  return (
    <>
      <div>
        <h1
          style={{
            fontSize: "30px",
            textAlign: "center",
            margin: "10px",
            marginTop: "20px",
          }}
        >
          Reports
        </h1>
        <span style={{ fontSize: "20px", margin: "10px", marginLeft: "50px" }}>
          Filter Reports By :
        </span>
        <Select
          placeholder="Select Filter"
          onChange={handleFilterChange}
          style={{ width: 200, margin: "20px", marginLeft: "5px" }}
        >
          <Option value="My payment history"></Option>
          <Option value="Last 15 days"></Option>
          <Option value="finished jobs">Finished Jobs</Option>
          <Option value="vendors">Vendors</Option>
          <Option value="products">Product</Option>
        </Select>
        {selectedFilter === "Last 15 days" && (
          <div>
            {jobs && (
              <div style={container}>
                <div style={{ ...rowStyle, ...header }}>
                <p>DATE</p>
                  <p>TITLE</p>
                  <p>CLIENT</p>
                  <p>BUDGET</p>
                  <p>VENDOR NAME</p>
                  <p>UNIQUE ID</p>
                  <p>STATUS</p>
                </div>
                <div style={colStyle}>
                  {jobs &&
                    jobs
                      .filter(
                        (j) =>
                          j.startdate >= "2023-06-13" ||
                          j.status === "payment recieved"
                      )
                      .map((j) => {
                        return (
                          <div style={rowStyle}>
                           <p>{j["startdate"]}</p>
                            <p>{j["title"]}</p>
                            <p>{j["client"]}</p>
                            <p>{j["budget"]}</p>
                            <p>{j["vendorname"]}</p>
                            <p>{j["jobId"]}</p>
                            <p>{j["status"]}</p>
                          </div>
                        );
                      })}
                  <div
                    style={{
                      display: "flex",
                      gap: "20px",
                      marginTop: "40px",
                      marginLeft: "auto",
                    }}
                  >
                    <Button
                      style={button}
                      onClick={() =>
                        downloadExcel(
                          jobs.filter((j) => j.status === "invoice sent")
                        )
                      }
                    >
                      Download Jobs Excel Sheet
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Render download buttons for jobs data */}
            <div>{/* Implement download logic for Excel, CSV, PDF */}</div>
          </div>
        )}
        {selectedFilter === "My payment history" && (
          <div>
            <span
              style={{ fontSize: "20px", margin: "10px", marginLeft: "50px" }}
            >
              Search by Client:
            </span>
            <input
              type="text"
              value={clientSearchTerm}
              onChange={(e) => setClientSearchTerm(e.target.value)}
              style={{ margin: "10px" }}
            />
            <span
              style={{ fontSize: "20px", margin: "10px", marginLeft: "50px" }}
            >
              Search by Vendor:
            </span>

            <input
              type="text"
              value={vendorSearchTerm}
              onChange={(e) => setVendorSearchTerm(e.target.value)}
              style={{ margin: "10px" }}
            />
            <span
              style={{ fontSize: "20px", margin: "10px", marginLeft: "50px" }}
            >
              Search by Start Date:
            </span>
            <DatePicker
              value={startDateSearchTerm}
              onChange={(date) => setStartDateSearchTerm(date)}
              style={{ margin: "10px" }}
            />
            {jobs && (
              <div style={container}>
                <div style={{ ...rowStyle, ...header }}>
                <p>DATE</p>
                  <p>TITLE</p>
                  <p>CLIENT</p>
                  <p>BUDGET</p>
                  <p>VENDOR NAME</p>
                  <p>UNIQUE ID</p>
                  <p>STATUS</p> 
                </div>
                <div style={colStyle}>
                  {jobs &&
                    jobs
                      .filter(
                        (j) =>
                          j.client?.toLowerCase()
                            .includes(clientSearchTerm.toLowerCase()) &&
                          j.vendorname?.toLowerCase()
                            .includes(vendorSearchTerm.toLowerCase()) &&
                          (startDateSearchTerm === null ||
                            j.startdate ===
                              startDateSearchTerm.format("YYYY-MM-DD"))
                      )
                      .map((j) => {
                        return (
                          <div style={rowStyle}>
                           <p>{j["startdate"]}</p>
                            <p>{j["title"]}</p>
                            <p>{j["client"]}</p>
                            <p>{j["budget"]}</p>
                            <p>{j["vendorname"]}</p>
                            <p>{j["jobId"]}</p>
                            <p>{j["status"]}</p>
                          </div>
                    );
                      })}
                  <div
                    style={{
                      display: "flex",
                      gap: "20px",
                      marginTop: "40px",
                      marginLeft: "auto",
                    }}
                  >
                    <Button
                      style={button}
                      onClick={() =>
                        downloadExcel(
                          jobs.filter((j) => j.status === "invoice sent")
                        )
                      }
                    >
                      Download Jobs Excel Sheet
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Render download buttons for jobs data */}
            <div>{/* Implement download logic for Excel, CSV, PDF */}</div>
          </div>
        )}
        {selectedFilter === "finished jobs" && (
          <div>
            {jobs && (
              <div style={container}>
                <div style={{ ...rowStyle, ...header }}>
                  <p>DATE</p>
                  <p>TITLE</p>
                  <p>CLIENT</p>
                  <p>BUDGET</p>
                  <p>SALE</p>
                  <p>UNIQUE ID</p>
                  <p>STATUS</p>
                </div>
                <div style={colStyle}>
                  {jobs &&
                    jobs
                      .filter(
                        (j) =>
                          j.status === "payment done" ||
                          j.status === "payment recieved"
                      )
                      .map((j) => {
                        return (
                          <div style={rowStyle}>
                            <p>{j["startdate"]}</p>
                            <p>{j["title"]}</p>
                            <p>{j["client"]}</p>
                            <p>{j["budget"]}</p>
                            <p>{j["sale"]}</p>
                            <p>{j["jobId"]}</p>
                            <p>{j["status"]}</p>
                          </div>
                        );
                      })}
                  <div
                    style={{
                      display: "flex",
                      gap: "20px",
                      marginTop: "40px",
                      marginLeft: "auto",
                    }}
                  >
                    <Button
                      style={button}
                      onClick={() =>
                        downloadExcel(
                          jobs.filter((j) => j.status === "invoice sent")
                        )
                      }
                    >
                      Download Jobs Excel Sheet
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Render download buttons for jobs data */}
            <div>{/* Implement download logic for Excel, CSV, PDF */}</div>
          </div>
        )}

        {selectedFilter === "vendors" && (
          <div>
            {vendors && (
              <div style={container}>
                <div style={{ ...rowStyle, ...header }}>
                  <p>VENDOR NAME</p>
                  <p>CONTACT</p>
                  <p>TOTAL WORK ORDER VALUES</p>
                  <p>Service</p>
                </div>
                <div style={colStyle}>
                  {vendors &&
                    vendors.map((j) => {
                      return (
                        <div style={rowStyle}>
                          <p>{j["vendorname"]}</p>
                          <p>{j["phone"]}</p>
                          <p>{j["work"]}</p>
                          <p>{j["service"]}</p>
                        </div>
                      );
                    })}
                  <div
                    style={{
                      display: "flex",
                      gap: "20px",
                      marginTop: "40px",
                      marginLeft: "auto",
                    }}
                  >
                    <Button style={button} onClick={() => downloadExcel(jobs)}>
                      Download Jobs Excel Sheet
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Render download buttons for jobs data */}
            <div>{/* Implement download logic for Excel, CSV, PDF */}</div>
          </div>
        )}

        {selectedFilter === "products" && (
          <div>
            {products && (
              <div style={container}>
                <h1>PAYMENT HISTORY</h1>
                <div style={{ ...rowStyle, ...header }}>
                  <p>PRODUCT NAME</p>
                  <p>PRICE</p>
                  <p>VENDOR NAME</p>
                  <p>VENDOR PRICE</p>
                  <p>ADMIN</p>
                </div>
                <div style={colStyle}>
                  {products &&
                    products.map((j) => {
                      return (
                        <div style={rowStyle}>
                          <p>{j["productName"]}</p>
                          <p>{j["price"]}</p>
                          <p>{j["vendorname"]}</p>
                          <p>{j["vendorPrice"]}</p>
                          <p>{j["admin"]}</p>
                        </div>
                      );
                    })}
                  <div
                    style={{
                      display: "flex",
                      gap: "20px",
                      marginTop: "40px",
                      marginLeft: "auto",
                    }}
                  >
                    <Button style={button} onClick={() => downloadExcel(jobs)}>
                      Download Jobs Excel Sheet
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Render download buttons for jobs data */}
            <div>{/* Implement download logic for Excel, CSV, PDF */}</div>
          </div>
        )}
      </div>
    </>
  );
};

export default Report;
