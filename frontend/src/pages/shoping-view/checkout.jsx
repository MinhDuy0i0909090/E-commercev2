import { useDispatch, useSelector } from "react-redux";
import img from "../../assets/account.jpg";
import Address from "../../components/shoping-view/address";
import CartItemContent from "../../components/shoping-view/cartitemcontent";
import { Button, notification } from "antd";
import { useState } from "react";
import { createNewOrder } from "../../store/shop-slice/order-slice";
function Checkout() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const { approvalURL } = useSelector((state) => state.shopOrder);

  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const dispatch = useDispatch();
  const [isPaymentStart, setIsPaymemntStart] = useState(false);
  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  function handleInitiatePaypalPayment() {
    if (cartItems.length === 0) {
      notification.warning({
        description: "Your cart is empty. Please add items to proceed",
      });

      return;
      
    }
    if (currentSelectedAddress === null) {
      notification.warning({
        description: "Please select one address to proceed.",
      });

      return;
    }
    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((singleCartItem) => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        image: singleCartItem?.image,
        price:
          singleCartItem?.salePrice > 0
            ? singleCartItem?.salePrice
            : singleCartItem?.price,
        quantity: singleCartItem?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };
    dispatch(createNewOrder(orderData)).then((data) => {
      console.log(data, "Min");
      if (data?.payload?.success) {
        setIsPaymemntStart(true);
      } else {
        setIsPaymemntStart(false);
      }
    });
  }
  if (approvalURL) {
    window.location.href = approvalURL;
  }

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img src={img} className="h-full w-full object-cover object-center" />
      </div>
      <div className="flex flex-row gap-2 mt-8 ">
        <Address setCurrentSelectedAddress={setCurrentSelectedAddress} />
        <div className="w-4/12">
          <div className="space-y-4">
            {cartItems && cartItems.items && cartItems.items.length > 0 ? (
              cartItems.items.map((item) => (
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

          <div>
            <Button
              className="w-full border rounded-xl flex justify-center  mt-3"
              type="primary"
              size="large"
              onClick={handleInitiatePaypalPayment}
            >
              <span className="">
                {" "}
                {isPaymentStart
                  ? "Processing Paypal Payment..."
                  : "Checkout with Paypal"}
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
