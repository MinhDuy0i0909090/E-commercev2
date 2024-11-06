import { Card, Button, Typography } from "antd";

const { Text } = Typography;

function AddressCard({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
  setCurrentSelectedAddress,
  selectedId,
}) {
  return (
    <Card
      onClick={
        setCurrentSelectedAddress
          ? () => setCurrentSelectedAddress(addressInfo)
          : null
      }
      className={`cursor-pointer ${
        selectedId?._id === addressInfo?._id
          ? "ant-card-bordered border-[2px] border-red-900"
          : "ant-card-bordered"
      }`}
      bordered
      hoverable
      style={{ width: 270 }}
    >
      <div className=" p-1 grid gap-2">
        <div>
          <Text strong>Address: </Text>
          <Text>{addressInfo?.address}</Text>
        </div>
        <div>
          <Text strong>City: </Text>
          <Text>{addressInfo?.city}</Text>
        </div>
        <div>
          <Text strong>Pincode: </Text>
          <Text>{addressInfo?.pincode}</Text>
        </div>
        <div>
          <Text strong>Phone: </Text>
          <Text>{addressInfo?.phone}</Text>
        </div>
        <div>
          <Text strong>Notes: </Text>
          <Text>{addressInfo?.notes}</Text>
        </div>
      </div>
      <div className="p-2 flex justify-between">
        <Button onClick={() => handleEditAddress(addressInfo)}>Edit</Button>
        <Button type="primary" onClick={() => handleDeleteAddress(addressInfo)}>
          Delete
        </Button>
      </div>
    </Card>
  );
}

export default AddressCard;
