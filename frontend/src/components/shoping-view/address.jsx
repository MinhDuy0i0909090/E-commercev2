import { useEffect, useState } from "react";
import { Card, Typography, Space, message, Form, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";

import CommonForm from "../common/form";
import AddressCard from "./address-card";
import { addressFormControls } from "../../config";
import {
  addNewAddress,
  deleteAddress,
  editaAddress,
  fetchAllAddresses,
} from "../../store/shop-slice/address-slice";

const { Title } = Typography;

const initialAddressFormData = {
  address: "",
  city: "",
  phone: "",
  pincode: "",
  notes: "",
};

function Address({ setCurrentSelectedAddress, selectedId }) {
  const [formData, setFormData] = useState(initialAddressFormData);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shopAddress);
  const [form] = Form.useForm();

  // Fetch addresses on component mount
  useEffect(() => {
    dispatch(fetchAllAddresses(user?.id));
  }, [dispatch, user?.id]);

  // Manage add/edit of addresses
  function handleManageAddress() {
    if (addressList.length >= 3 && currentEditedId === null) {
      message.error("You can add a maximum of 3 addresses");
      return;
    }

    currentEditedId != null
      ? dispatch(
          editaAddress({
            userId: user?.id,
            addressId: currentEditedId,
            formData,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllAddresses(user?.id));
            setFormData(initialAddressFormData);
            setCurrentEditedId(null);
            notification.success({
              description: "Updated address successfully",
            });
          }
        })
      : dispatch(
          addNewAddress({
            ...formData,
            userId: user?.id,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllAddresses(user?.id));
            setFormData(initialAddressFormData);
            form.resetFields();
            notification.success({
              description: "Address added successfully",
            });
          }
        });
  }

  // Handle address deletion
  function handleDeleteAddress(currentAddress) {
    dispatch(
      deleteAddress({ userId: user?.id, addressId: currentAddress._id })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllAddresses(user?.id));
        message.success("Address deleted successfully");
      }
    });
  }

  // Handle address editing
  function handleEditAddress(getcurrentAddress) {
    setCurrentEditedId(getcurrentAddress?._id);
    setFormData({
      ...formData,
      address: getcurrentAddress?.address,
      city: getcurrentAddress?.city,
      phone: getcurrentAddress?.phone,
      pincode: getcurrentAddress?.pincode,
      notes: getcurrentAddress?.notes,
    });
  }

  form.setFieldsValue(formData);

  return (
    <div className="">
      <Card style={{ maxWidth: 1000 }}>
        <div className="mb-5 grid  gap-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 sx:grid-cols-1 ">
          {addressList && addressList.length > 0 ? (
            addressList.map((address) => (
              <AddressCard
                key={address._id}
                selectedId={selectedId}
                handleDeleteAddress={handleDeleteAddress}
                addressInfo={address}
                handleEditAddress={handleEditAddress}
                setCurrentSelectedAddress={setCurrentSelectedAddress}
              />
            ))
          ) : (
            <Typography.Text>No addresses available.</Typography.Text>
          )}
        </div>
        <Space direction="vertical" style={{ width: "100%" }}>
          <Title level={4} style={{ textAlign: "center" }}>
            {currentEditedId ? "Edit Address" : "Add New Address"}
          </Title>
          <div
            className="w-full"
            style={{ maxWidth: "600px", margin: "0 auto" }}
          >
            <CommonForm
              formControls={addressFormControls}
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId !== null ? "Edit" : "Add"}
              onSubmit={handleManageAddress}
              form={form}
              size={600}
            />
          </div>
        </Space>
      </Card>
    </div>
  );
}

export default Address;
