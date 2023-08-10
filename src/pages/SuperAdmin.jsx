// import React, { useEffect, useState } from "react";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   ArcElement,
//   Tooltip,
//   Legend,
//   BarElement,
//   LinearScale,
//   Title,
// } from "chart.js";
// ChartJS.register(ArcElement, Tooltip, Legend);
// // import { LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
// import { Bar } from "react-chartjs-2";
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );
// import { Layout, Row, Col, Card, Menu } from "antd";

// import { Pie } from "react-chartjs-2";
// import { useNavigate } from "react-router-dom";
// import Navigation from "../components/navigation";

// const { Meta } = Card;
// const { SubMenu } = Menu;
// const { Content, Sider } = Layout;
// import axios from 'axios';


// var myHeaders = new Headers();
// myHeaders.append("Content-Type", "application/json");
// myHeaders.append("Access-Control-Request-Headers", "*");
// myHeaders.append("api-key", "DCaDTWpB0flE5TV8RNyOXZUmHQgucMmXzjtQPlpkojcnhPGHC0eCiW1zBrvUpSfC");

// var raw = JSON.stringify({
//   "dataSource": "Cluster0",
//   "database": "vmanagement",
//   "collection": "jobs"
// });

// var requestOptions = {
//   method: 'POST',
//   headers: myHeaders,
//   body: raw,
//   redirect: 'follow'
// };

// fetch("https://ap-south-1.aws.data.mongodb-api.com/app/data-rwlml/endpoint/data/v1/action/find", requestOptions)
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));

// const SuperAdmin = () => {

  

//   const data1 = {
//     labels: ["Jobs Closed", "Jobs Pending", "Dead Jobs"],
//     datasets: [
//       {
//         data: [3, 5, 1],
//         backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
//         hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
//       },
//     ],
//   };

//   const data2 = {
//     labels: ["Invoice Received", "Payment Received", "Invoice Pending"],
//     datasets: [
//       {
//         data: [2, 1, 2],
//         backgroundColor: ["#2ECC71", "#9B59B6", "#FFA500"],
//         hoverBackgroundColor: ["#2ECC71", "#9B59B6", "#FFA500"],
//       },
//     ],
//   };
//    const data3 = {
//     labels: ['Client A', 'Client B', 'Client C', 'Client D'],
//     datasets: [
//       {
//         label: 'Sales',
//         data: [5, 8, 6, 9],
//         backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#2ECC71'],
//         hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#2ECC71'],
//       },
//     ],
//   };

//   const data4 = {
//     labels: ['Vendor X', 'Vendor Y', 'Vendor Z'],
//     datasets: [
//       {
//         label: 'Sales',
//         data: [3, 4, 2],
//         backgroundColor: ['#FF6361', '#FFCD6B', '#6B5BFF'],
//       hoverBackgroundColor: ['#FF6361', '#FFCD6B', '#6B5BFF'],
//       },
//     ],
//   };

//   const data5 = {
//     labels: ['Jaipur', 'New Delhi', 'Lucknow', 'Bhopal'],
//     datasets: [
//       {
//         label: 'Sales',
//         data: [10, 7, 5, 8],
//         backgroundColor: ['#2ECC71', '#9B59B6', '#FFA500', '#FF6384'],
//         hoverBackgroundColor: ['#2ECC71', '#9B59B6', '#FFA500', '#FF6384'],
//       },
//     ],
//   };

//   return (
//     <Layout style={{ minHeight: "100vh" }}>
//       <Navigation/>
//       <Layout>
//         <Content>
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               minHeight: "100vh",
//             }}
//           >
//             <div style={{ padding: "20px", maxWidth: "800px" }}>
//               <h1 style={{ textAlign: "center" }}>Superadmin SuperAdmin</h1>
//               <Row gutter={[16, 16]} justify="center">
//                 <Col xs={24} sm={12}>
//                   <Card style={{ textAlign: "center" }}>
//                     <Meta title="Jobs" />
//                     <div style={{ height: "300px" }}>
//                       <Pie data={data1} />
//                     </div>
//                   </Card>
//                 </Col>
//                 <Col xs={24} sm={12}>
//                   <Card style={{ textAlign: "center" }}>
//                     <Meta title="Sales" />
//                     <div style={{ height: "300px" }}>
//                       <Pie data={data2} />
//                     </div>
//                   </Card>
//                 </Col>
//                 <Col xs={24}>
//                 <Card style={{ textAlign: 'center' }}>
//                   <Meta title="Client Sales" />
//                   <div style={{ height: '300px' }}>
//                     <Bar
//                       data={data3}
//                       options={{
//                         scales: {
//                           y: {
//                             beginAtZero: true,
//                           },
//                         },
//                       }}
//                     />
//                   </div>
//                 </Card>
//               </Col>
//               <Col xs={24}>
//                 <Card style={{ textAlign: 'center' }}>
//                   <Meta title="Vendor Sales" />
//                   <div style={{ height: '300px' }}>
//                     <Bar
//                       data={data4}
//                       options={{
//                         scales: {
//                           y: {
//                             beginAtZero: true,
//                           },
//                         },
//                       }}
//                     />
//                   </div>
//                 </Card>
//               </Col>
//               <Col xs={24}>
//                 <Card style={{ textAlign: 'center' }}>
//                   <Meta title="Region Sales" />
//                   <div style={{ height: '300px' }}>
//                     <Bar
//                       data={data5}
//                       options={{
//                         scales: {
//                           y: {
//                             beginAtZero: true,
//                           },
//                         },
//                       }}
//                     />
//                   </div>
//                 </Card>
//               </Col>
//               </Row>
//             </div>
//           </div>
//         </Content>
//       </Layout>
//     </Layout>
//   );
// };

// export default SuperAdmin;
