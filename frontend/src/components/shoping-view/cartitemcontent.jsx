import { Button, Divider, notification } from "antd";
import { Minus, Plus, Trash } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCartItem,
  updateCartQuantity,
} from "../../store/shop-slice/cart-slice";

function CartItemContent({ cartItem }) {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  function handleUpdateQuantity(getCartItem, typeofAction) {
    dispatch(
      updateCartQuantity({
        userId: user?.id,
        productId: getCartItem?.productId,
        quantity:
          typeofAction == "plus"
            ? getCartItem?.quantity + 1
            : getCartItem?.quantity - 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        notification.success({
          description: "Update the product successfully",
          
        });
      }
    });
  }
  function handleCardItemDelete(getCartItem) {
    dispatch(
      deleteCartItem({ userId: user?.id, productId: getCartItem?.productId })
    ).then((data) => {
      if (data?.payload?.success) {
        notification.success({
          description: "Delete the product successfully",
          placement: "bottomRight",
        });
      }
    });
  }
  return (
    <div>
      <div className="flex items-center space-x-4">
        <img
          src={cartItem?.image}
          alt={cartItem?.title}
          className="w-28 h-32 rounded object-cover"
        />
        <div className="flex-1">
          <h3 className="font-extrabold">{cartItem?.title}</h3>
          <div className="flex items-center gap-2 mt-1">
            <Button
              variant="outline"
              className="h-8 w-8 rounded-full "
              size="icon"
              disabled={cartItem?.quantity === 1}
              icon={<Minus className="w-4 h-4" />}
              onClick={() => handleUpdateQuantity(cartItem, "minus")}
            >
              <span className="sr-only">Decrease</span>
            </Button>
            <span className="font-semibold">{cartItem?.quantity}</span>
            <Button
              variant="outline"
              className="h-8 w-8 rounded-full"
              size="icon"
              icon={<Plus className="w-4 h-4" />}
              onClick={() => handleUpdateQuantity(cartItem, "plus")}
            >
              <span className="sr-only">Decrease</span>
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <p className="font-semibold">
            $
            {(
              (cartItem?.salePrice > 0
                ? cartItem?.salePrice
                : cartItem?.price) * cartItem?.quantity
            ).toFixed(2)}
          </p>
          <Trash
            onClick={() => handleCardItemDelete(cartItem)}
            className="cursor-pointer mt-1"
            size={20}
          />
        </div>
      </div>
      <Divider />
    </div>
  );
}

export default CartItemContent;
