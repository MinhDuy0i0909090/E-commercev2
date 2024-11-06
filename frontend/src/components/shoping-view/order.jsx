import React, { useEffect, useState } from "react";
import { Badge, Button, Card, Table } from "antd";
import ShoppingOrderDetailView from "./order-detail";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersByUserId,
  getOrderDetails,
} from "../../store/shop-slice/order-slice";
const { Column } = Table;

function ShoppingOrders() {
  const { user } = useSelector((state) => state.auth);
  const { orderList, orderDetails } = useSelector((state) => state.shopOrder);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  function handleFetchOrderDetails(getId) {
    dispatch(getOrderDetails(getId));
  }
  const pageSize = 6;

  useEffect(() => {
    dispatch(getAllOrdersByUserId(user?.id));
  }, [dispatch]);

  useEffect(() => {
    if (orderDetails !== null) setIsModalOpen(true);
  }, [orderDetails]);

  
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const data =
    orderList && orderList.length > 0
      ? orderList.map((orderItem) => ({
          key: orderItem._id,
          orderId: orderItem._id,
          orderDate: orderItem?.orderDate.split("T")[0],
          orderStatus: (
            <Badge
              count={orderItem?.orderStatus}
              color={
                orderItem?.orderStatus === "confirmed"
                  ? "green"
                  : orderItem?.orderStatus === "rejected"
                  ? "red" // Changed color for clarity in different statuses
                  : "yellow" // Default color for other statuses
              }
            ></Badge>
          ),
          orderPrice: orderItem.totalAmount,
        }))
      : [];

  return (
    <div>
      <div className="flex justify-center">
        <Card
          title={<span className="text-2xl font-bold">Order History</span>}
          bordered={false}
          style={{ width: 1000 }}
        >
          <Table
            dataSource={data}
            pagination={
              orderList.length <= pageSize
                ? "disable" // Vô hiệu hóa pagination nếu không đủ trang thứ 2
                : {
                    position: "bottomRight",
                    defaultCurrent: 1,
                    pageSize: pageSize,
                    total: orderList.length,
                  }
            }
          >
            <Column title="Order ID" dataIndex="orderId" key="orderId" />
            <Column title="Order Date" dataIndex="orderDate" key="orderDate" />

            <Column
              title="Order Status"
              dataIndex="orderStatus"
              key="orderStatus"
            />
            <Column
              title="Order Price"
              dataIndex="orderPrice"
              key="orderPrice"
            />

            <Column
              title="Action"
              key="action"
              render={(text, record) => (
                <Button
                  onClick={() => handleFetchOrderDetails(record.orderId)}
                  type="primary"
                >
                  View Detail
                </Button>
              )}
            />
          </Table>
        </Card>
      </div>
      <ShoppingOrderDetailView
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        orderDetails={orderDetails}
      />
    </div>
  );
}

export default ShoppingOrders;
