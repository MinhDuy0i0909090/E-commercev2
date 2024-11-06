import React, { useState, useMemo } from "react";
import { Modal, Button, Divider, notification, Input, Avatar } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "../../store/shop-slice/cart-slice";

import { addReview, getReviews } from "../../store/shop-slice/review-slice";
import { setProductDetails } from "../../store/shop-slice/product-slice";
import StarRatingComponent from "../common/start-rating";

const ProductDetail = ({ open, setIsModalOpen, product }) => {
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { reviews } = useSelector((state) => state.shopReview);

  const averageReview = useMemo(
    () =>
      reviews?.length
        ? reviews.reduce((sum, { reviewValue }) => sum + reviewValue, 0) /
          reviews.length
        : 0,
    [reviews]
  );

  const handleAddToCart = (productId) => {
    if (!user?.id) {
      notification.error({
        description: "Please log in to add items to the cart.",
        placement: "bottomRight",
      });
      return;
    }
    dispatch(addToCart({ userId: user.id, productId, quantity: 1 })).then(
      (data) => {
        if (data?.payload?.success) {
          dispatch(fetchCartItems(user.id));
          notification.success({
            description: data.payload.message,
            placement: "bottomRight",
          });
        } else {
          notification.error({
            description: "Failed to add item to cart. Try again later.",
            placement: "bottomRight",
          });
        }
      }
    );
  };

  const handleAddReview = () => {
    dispatch(
      addReview({
        productId: product?._id,
        userId: user?.id,
        userName: user?.userName,
        reviewMessage: reviewMsg,
        reviewValue: rating,
      })
    ).then((data) => {
      if (data.payload.success) {
        setRating(0);
        setReviewMsg("");
        dispatch(getReviews(product?._id));
        notification.success({
          description: data.payload.message,
          placement: "bottomRight",
        });
      } else {
        notification.error({
          description: "Could not submit review. Try again later.",
          placement: "bottomRight",
        });
      }
    });
  };

  const handleDialogClose = () => {
    setIsModalOpen();
    dispatch(setProductDetails(null));
    setRating(0);
    setReviewMsg("");
  };

  const handleRatingChange = (newRating) => setRating(newRating);

  return (
    <Modal
      style={{ top: 20 }}
      open={open}
      onCancel={handleDialogClose}
      footer={null}
      className="custom-modal"
      width="65vw"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-3 md:p-8 sm:p-10 xs:p-10">
        {/* Product Image Section */}
        <div className="relative overflow-hidden rounded-lg shadow-lg ">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-full object-cover rounded-md"
          />
        </div>

        {/* Product Details Section */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            {product?.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mt-5">
            {product?.description}
          </p>

          {/* Price and Sale Price */}
          <div className="flex items-center justify-between mt-4">
            <p
              className={`text-3xl font-bold ${
                product?.salePrice > 0
                  ? "text-red-500 line-through"
                  : "text-green-600"
              }`}
            >
              ${product?.price}
            </p>
            {product?.salePrice > 0 && (
              <p className="text-xl md:text-3xl font-bold text-green-600">
                ${product?.salePrice}
              </p>
            )}
          </div>

          {/* Ratings */}
          <div className="flex items-center gap-2 mt-2">
            <StarRatingComponent rating={averageReview} />
            <span className="text-muted-foreground">
              ({averageReview.toFixed(2)})
            </span>
          </div>

          {/* Add to Cart Button */}
          <div className="mt-5 mb-5">
            {product?.totalStock === 0 ? (
              <Button className="w-full opacity-60 cursor-not-allowed">
                Out of Stock
              </Button>
            ) : (
              <Button
                type="primary"
                className="w-full"
                onClick={() => handleAddToCart(product._id)}
              >
                Add to Cart
              </Button>
            )}
          </div>

          {/* Separator */}
          <Divider />

          {/* Reviews Section */}
          <div className="max-h-[300px] overflow-auto mt-5">
            <h2 className="text-xl font-bold mb-4">Reviews</h2>
            <div className="grid gap-6">
              {reviews?.length ? (
                reviews.map((reviewItem) => (
                  <div className="flex gap-4" key={reviewItem.id}>
                    <Avatar className="w-10 h-10 border">
                      {reviewItem?.userName[0].toUpperCase()}
                    </Avatar>
                    <div className="grid gap-1">
                      <h3 className="font-bold">{reviewItem?.userName}</h3>
                      <StarRatingComponent rating={reviewItem?.reviewValue} />
                      <p className="text-muted-foreground">
                        {reviewItem.reviewMessage}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <h1>No Reviews</h1>
              )}
            </div>

            <div className="mt-10 flex-col flex gap-2">
              <span>Write a review</span>
              <StarRatingComponent
                rating={rating}
                handleRatingChange={handleRatingChange}
              />
              <Input
                placeholder="Write a review..."
                onChange={(event) => setReviewMsg(event.target.value)}
              />
              <Button
                type="primary"
                onClick={handleAddReview}
                disabled={!reviewMsg.trim()}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProductDetail;
