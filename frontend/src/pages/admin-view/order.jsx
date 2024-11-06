import { Badge, Button, Card, Table } from "antd";
import { useEffect, useState } from "react";
import AdminOrderDetail from "../../components/admin-view/order-detail";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
} from "../../store/admin-slice/order-slice";
const { Column } = Table;
function AdminOrder() {
  const { orderList, orderDetails } = useSelector((state) => state.adminOrder);
  const dispatch = useDispatch();
  const pageSize = 10;
  function handleFetchOrderDetails(getId) {
    dispatch(getOrderDetailsForAdmin(getId));
  }

  useEffect(() => {
    dispatch(getAllOrdersForAdmin());
  }, [dispatch]);

  console.log(orderDetails, "orderList");

  useEffect(() => {
    if (orderDetails !== null) setIsModalOpen(true);
  }, [orderDetails]);
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
      <AdminOrderDetail
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        orderDetails={orderDetails}
      />
    </div>
  );
}

export default AdminOrder;
