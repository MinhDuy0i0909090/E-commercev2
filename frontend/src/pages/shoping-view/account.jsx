import { Tabs } from "antd";
import accImg from "../../assets/account.jpg";

import Address from "../../components/shoping-view/address";
import ShoppingOrders from "../../components/shoping-view/order";
import { useSelector } from "react-redux";

const { TabPane } = Tabs;

function Account() {
  const { productList } = useSelector((state) => state.shoppingProducts);

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src={accImg}
          className="h-full w-full object-cover object-center"
          alt="Account Background"
        />
      </div>
      <div className="container mx-auto grid grid-cols-1 gap-8 py-8">
        <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
          <Tabs defaultActiveKey="orders">
            <TabPane tab="Orders" key="orders">
              {/* {productList.map((product) => (
                <ShoppingOrders key={product.id} product={product} />
              ))} */}
              <ShoppingOrders />
            </TabPane>
            <TabPane tab="Address" key="address">
              <Address />
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default Account;
