import { Badge, Divider, Modal } from "antd";
import React, { useState } from "react";
import CommonForm from "../common/form";
import { useSelector } from "react-redux";
const initialFormData = {
  status: "",
};
function ShoppingOrderDetailView({ open, onCancel, orderDetails }) {
  const [formData, setFormData] = useState(initialFormData);
  const { user } = useSelector((state) => state.auth);
  return (
    <Modal
      style={{ top: 6 }}
      open={open}
      onCancel={onCancel}
      footer={null}
      width={600}
      className="custom-modal"
    >
      <div className="grid  p-2">
        {/* Order Info Section */}
        <div className="grid gap-4">
          <h3 className="text-xl font-semibold">Order Information</h3>
          <div className="grid gap-2 text-gray-600">
            <div className="flex items-center justify-between">
              <p className="font-medium">Order ID</p>
              <span>{orderDetails?._id}</span>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-medium">Order Date</p>
              <span>{orderDetails?.orderDate.split("T")[0]}</span>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-medium">Order Price</p>
              <span>${orderDetails?.totalAmount}</span>
            </div>
            <div className="flex  items-center justify-between">
              <p className="font-medium">Payment method</p>
              <span>{orderDetails?.paymentMethod}</span>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-medium">Payment Status</p>
              <span>{orderDetails?.paymentStatus}</span>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-medium">Order Status</p>
              <span className="text-green-500">
                <Badge
                  count={orderDetails?.orderStatus}
                  color={
                    orderDetails?.orderStatus === "confirmed"
                      ? "green"
                      : orderDetails?.orderStatus === "rejected"
                      ? "red" // Changed color for clarity in different statuses
                      : "yellow" // Default color for other statuses
                  }
                ></Badge>
              </span>
            </div>
          </div>
        </div>
        <Divider />

        {/* Order Details Section */}
        <div className="grid gap-4">
          <h3 className="text-xl font-semibold">Order Details</h3>

          <ul className="grid gap-2">
            {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
              ? orderDetails?.cartItems.map((item) => (
                  <li
                    className="flex items-center justify-between"
                    key={item.id}
                  >
                    <span>Title: {item.title}</span>
                    <span>Quantity: {item.quantity}</span>
                    <span>Price: ${item.price}</span>
                  </li>
                ))
              : null}
          </ul>
        </div>
        <Divider />
        {/* Shipping Info Section */}
        <div className="grid gap-4">
          <h3 className="text-xl font-semibold">Shipping Information</h3>
          <div className="grid gap-2 text-gray-600">
            <div className="flex items-center justify-between">
              <p className="font-bold text-md">User Name</p>
              <span>{user.userName}</span>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-bold  text-md">Address</p>
              <span>{orderDetails?.addressInfo?.address}</span>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-bold text-md">City</p>
              <span>{orderDetails?.addressInfo?.city}</span>
            </div>{" "}
            <div className="flex items-center justify-between">
              <p className="font-bold text-md">Pin Code</p>
              <span>{orderDetails?.addressInfo?.pincode}</span>
            </div>{" "}
            <div className="flex items-center justify-between">
              <p className="font-bold text-md">Phone Number</p>
              <span>{orderDetails?.addressInfo?.phone}</span>
            </div>{" "}
            <div className="flex items-center justify-between">
              <p className="font-bold text-md">Note</p>
              <span>{orderDetails?.addressInfo?.notes}</span>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </Modal>
  );
}

export default ShoppingOrderDetailView;
