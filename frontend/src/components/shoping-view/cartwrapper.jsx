import { Button } from "antd/es/radio";
import CartItemContent from "./cartitemcontent";
import { useNavigate } from "react-router-dom";

function CartWrapper({ cartItems }) {
  const navigate = useNavigate();
  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  return (
    <div >
      <div className="space-y-4">
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((item) => (
            <CartItemContent key={item.id} cartItem={item} /> // Use a unique key, e.g., item.id
          ))
        ) : (
          <div>No items in your cart.</div>
        )}
      </div>
      <div className="mt-8 space-y-4">
        <div className="flex justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold">${totalCartAmount}</span>
        </div>
      </div>
      {cartItems && cartItems.length > 0 ? (
        <div>
          <Button
            className="w-full border rounded-xl flex justify-center  mt-3"
            type="primary"
            size="large"
            onClick={() => {
              navigate("/shop/checkout");
             
            }}
          >
            <span className="">Check Out</span>
          </Button>
        </div>
      ) : (
        <Button className="w-full mt-3" disabled>
          <span>Check Out</span>
        </Button>
      )}
    </div>
  );
}

export default CartWrapper;
