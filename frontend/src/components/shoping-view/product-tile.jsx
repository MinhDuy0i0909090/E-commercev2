import { Badge, Button, Card } from "antd";
import React from "react";
import { brandOptionsMap, categoryOptionsMap } from "../../config";
import { ArrowRight, Settings } from "lucide-react";

function ShoppingProductTile({
  product,
  handleGetProductDetails,
  handleGetCart,
}) {
  return (
    <Card
      actions={[
        <div className="flex justify-center" key={product._id}>
          {product.totalStock === 0 ? (
            <Button className="w-full" disabled>
              Out Of Stock
            </Button>
          ) : (
            <Button
              className="w-9/12 flex flex-row gap-2"
              type="primary"
              size="large"
              onClick={() => handleGetCart(product._id)}
            >
              <span className="text-base font-semibold ">Add to card</span>
            </Button>
          )}
        </div>,
      ]}
      cover={
        <div
          className=" flex-grow cursor-pointer"
          onClick={() => handleGetProductDetails(product?._id)}
        >
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-[300px]  transition-transform duration-300 group-hover:scale-105"
            style={{ objectFit: "cover" }} // Ensure the image is not cropped
          />
          {product.totalStock === 0 ? (
            <Badge
              count="Out Of Stock"
              style={{ backgroundColor: "#f5222d" }}
              className="absolute top-2 left-2"
            />
          ) : product.totalStock < 10 ? (
            <Badge
              count={`Only ${product.totalStock} left`}
              style={{ backgroundColor: "#faad14" }}
              className="absolute top-3 left-2"
            />
          ) : product.salePrice > 0 && product.salePrice < product.price ? (
            <Badge
              count="Sale"
              style={{ backgroundColor: "#f5222d" }}
              className="absolute top-2 left-2"
            />
          ) : null}
        </div>
      }
      className="w-full max-w-sm mx-auto rounded-lg shadow-md transition-shadow duration-300 hover:shadow-lg overflow-hidden h-[550px] group"
    >
      <div onClick={() => handleGetProductDetails(product?._id)}>
        <div className="mt-3 flex flex-col h-full cursor-pointer">
          <h2 className="text-md font-bold mb-2 ">
            {" "}
            {/* Add line clamp for titles */}
            {product.title}
          </h2>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-gray-600">
              {categoryOptionsMap[product.category]}
            </span>
            <span className="text-sm text-gray-600">
              {brandOptionsMap[product.brand]}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                product.salePrice > 0
                  ? "line-through text-gray-500"
                  : "text-gray-800"
              } text-lg font-semibold`}
            >
              ${product.price}
            </span>
            {product.salePrice > 0 && (
              <span className="text-lg font-semibold text-red-600">
                ${product.salePrice}
              </span>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

export default ShoppingProductTile;
