// import React, { useEffect } from "react";
// import dayjs from "dayjs";
// import { useDispatch, useSelector } from "react-redux";
// import { crud } from "@/redux/crud/actions";
// import { useCrudContext } from "@/context/crud";
// import { selectUpdatedItem } from "@/redux/crud/selectors";

// import { Button, Form } from "antd";
// import Loading from "@/components/Loading";

// const permissions = JSON.parse(localStorage.getItem("auth")).permissions;

// export default function UpdateForm({ config, formElements }) {
//   let { entity } = config;
//   const dispatch = useDispatch();
//   const { current, isLoading, isSuccess } = useSelector(selectUpdatedItem);

//   const { state, crudContextAction } = useCrudContext();
//   const { panel, collapsedBox, readBox } = crudContextAction;

//   const [form] = Form.useForm();

//   const onSubmit = (fieldsValue) => {
//     if (fieldsValue) {
//       const initials = `${fieldsValue.title.charAt(
//         0
//       )}${fieldsValue.client.charAt(0)}`; // Replace "field1" and "field2" with the actual fields you want to use
//       const randomNumber = generateRandomNumber(); // Call the utility function to generate a random number
//       const uniqueId = `${initials}${randomNumber}`;

//       // Add the unique ID to the fieldsValue object
//       fieldsValue = {
//         ...fieldsValue,
//         uniqueId,
//       };

//       if (fieldsValue.birthday) {
//         fieldsValue = {
//           ...fieldsValue,
//           birthday: fieldsValue["birthday"].format("DD/MM/YYYY"),
//         };
//       }
//       if (fieldsValue.date) {
//         fieldsValue = {
//           ...fieldsValue,
//           birthday: fieldsValue["date"].format("DD/MM/YYYY"),
//         };
//       }
//     }

//     const id = current._id;
//     dispatch(crud.update(entity, id, fieldsValue));
//   };
//   useEffect(() => {
//     if (current) {
//       if (current.birthday) {
//         current.birthday = dayjs(current.birthday);
//       }
//       if (current.date) {
//         current.date = dayjs(current.date);
//       }
//       form.setFieldsValue(current);
//     }
//   }, [current]);

//   useEffect(() => {
//     if (isSuccess) {
//       readBox.open();
//       collapsedBox.open();
//       panel.open();
//       form.resetFields();
//       dispatch(crud.resetAction("update"));
//       dispatch(crud.list(entity));
//     }
//   }, [isSuccess]);

//   const { isEditBoxOpen } = state;

//   const show = isEditBoxOpen
//     ? { display: "block", opacity: 1 }
//     : { display: "none", opacity: 0 };
//   return (
//     <div style={show}>
//       <Loading isLoading={isLoading}>
//         {permissions == "superadmin" ||
//         permissions["update"].includes(
//           entity == "product" ? "service" : entity
//         ) ? (
//           <Form form={form} layout="vertical" onFinish={onSubmit}>
//             {formElements}
//             <Form.Item>
//               <Button type="primary" htmlType="submit">
//                 Submit
//               </Button>
//             </Form.Item>
//           </Form>
//         ) : (
//           <>
//             You don't have authorization to update{" "}
//             {entity == "product" ? "services" : { entity }}
//           </>
//         )}
//       </Loading>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { crud } from "@/redux/crud/actions";
import { useCrudContext } from "@/context/crud";
import { selectUpdatedItem } from "@/redux/crud/selectors";
import { Button, Form } from "antd";
import Loading from "@/components/Loading";

const permissions = JSON.parse(localStorage.getItem('auth')).permissions;

export default function UpdateForm({ config, formElements }) {
  let { entity } = config;
  const dispatch = useDispatch();
  const { current, isLoading, isSuccess } = useSelector(selectUpdatedItem);

  const { state, crudContextAction } = useCrudContext();
  const { panel, collapsedBox, readBox } = crudContextAction;

  const [form] = Form.useForm();
  const [uniqueId, setUniqueId] = useState('');

  const onSubmit = async (fieldsValue) => {
    if (fieldsValue) {
      // Generate unique ID based on field values
      const initials = `${fieldsValue.field1.charAt(0)}${fieldsValue.field2.charAt(0)}`;
      const randomNumber = Math.floor(Math.random() * 10000);
      const generatedUniqueId = `${initials}${randomNumber}`;

      fieldsValue = {
        ...fieldsValue,
        uniqueId: generatedUniqueId,
      };

      const id = current._id;
      await dispatch(crud.update(entity, id, fieldsValue));
    }
  };

  useEffect(() => {
    if (isSuccess) {
      readBox.open();
      collapsedBox.open();
      panel.open();
      form.resetFields();
      dispatch(crud.resetAction("update"));
      dispatch(crud.list(entity));
    }
  }, [isSuccess]);

  useEffect(() => {
    if (current) {
      if (current.birthday) {
        current.birthday = dayjs(current.birthday);
      }
      if (current.date) {
        current.date = dayjs(current.date);
      }
      form.setFieldsValue(current);

      if (current.uniqueId) {
        setUniqueId(current.uniqueId);
      }
    }
  }, [current]);

  const { isEditBoxOpen } = state;
  const show = isEditBoxOpen
    ? { display: "block", opacity: 1 }
    : { display: "none", opacity: 0 };

  const handleStorageLogic = () => {
    // Perform the storage logic here, e.g., dispatch an action or make an API request
    console.log("Storing unique ID:", uniqueId);
  };

  return (
    <div style={show}>
      <Loading isLoading={isLoading}>
        {(permissions === 'superadmin' || permissions['update'].includes(entity === 'product' ? 'service' : entity)) ?
          (
            <Form form={form} layout="vertical" onFinish={onSubmit}>
              {formElements}
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          ) :
          (
            <>
              You don't have authorization to update {(entity === 'product') ? 'services' : entity}
            </>
          )
        }
      </Loading>
    </div>
  );
}
