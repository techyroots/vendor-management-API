import React from "react";

import AdminCrudModule from "@/modules/AdminCrudModule";
import AdminForm from "@/forms/AdminForm";
import { request } from "@/request";
import useFetch from "@/hooks/useFetch";

export default function Admin() {
  const entity = "admin";
  const searchConfig = {
    displayLabels: ["name", "surname"],
    searchFields: "email,name,surname",
    outputValue: "_id",
  };
  const adminList = useFetch(() => {
    return request.list("admin");
  }).result;
  console.log(adminList);

  const panelTitle = "Admin Panel";
  const dataTableTitle = "Admin Lists";
  const entityDisplayLabels = ["email"];

  const readColumns = [
    { title: "Name", dataIndex: "name" },
    { title: "Surname", dataIndex: "surname" },
    { title: "Email", dataIndex: "email" },
    { title: "Role", dataIndex: "rolename" },
    { title: "Department", dataIndex: "departments" },
    { title: "Manager", dataIndex: "manager" },
    { title: "Managing", dataIndex: "manage" }
  ];

  const dataTableColumns = [
    { title: "Name", dataIndex: "name" },
    { title: "Surname", dataIndex: "surname" },
    { title: "Email", dataIndex: "email" },
    { title: "Role", dataIndex: "rolename" },
  ];
  const ADD_NEW_ENTITY = "Add new admin";
  const DATATABLE_TITLE = "Admins List";
  const ENTITY_NAME = "admin";
  const CREATE_ENTITY = "Create admin";
  const UPDATE_ENTITY = "Update admin";

  const config = {
    entity,
    panelTitle,
    dataTableTitle,
    ENTITY_NAME,
    CREATE_ENTITY,
    ADD_NEW_ENTITY,
    UPDATE_ENTITY,
    DATATABLE_TITLE,
    readColumns,
    dataTableColumns,
    searchConfig,
    entityDisplayLabels,
  };
  return (
    <AdminCrudModule
      createForm={<AdminForm />}
      updateForm={<AdminForm isUpdateForm={true} />}
      config={config}
    />
   
  );
}
