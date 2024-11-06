import { Button, Card, Carousel, Typography, Modal, notification } from "antd";
import bannerOne from "../../assets/banner-1.webp";
import bannerTwo from "../../assets/banner-2.webp";
import bannerThree from "../../assets/banner-3.webp";
import {
  Airplay,
  BabyIcon,
  CloudLightning,
  Flower2,
  Heater,
  Images,
  Shirt,
  ShirtIcon,
  ShoppingBasket,
  UmbrellaIcon,
  WashingMachine,
  WatchIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "../../store/shop-slice/product-slice";
import ShoppingProductTile from "../../components/shoping-view/product-tile";
import { addToCart, fetchCartItems } from "../../store/shop-slice/cart-slice";
import ProductDetail from "../../components/shoping-view/product-detail";

const { Title } = Typography;

const categoriesWithIcon = [
  { id: "men", label: "Men", icon: ShirtIcon },
  { id: "women", label: "Women", icon: Flower2 },
  { id: "kids", label: "Kids", icon: BabyIcon },
  { id: "accessories", label: "Accessories", icon: WatchIcon },
  { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
];

const brandsWithIcon = [
  { id: "nike", label: "Nike", icon: Shirt },
  { id: "adidas", label: "Adidas", icon: WashingMachine },
  { id: "puma", label: "Puma", icon: ShoppingBasket },
  { id: "levi", label: "Levi's", icon: Airplay },
  { id: "zara", label: "Zara", icon: Images },
  { id: "h&m", label: "H&M", icon: Heater },
];

const featureImageList = [
  { image: bannerOne },
  { image: bannerTwo },
  { image: bannerThree },
];

function ShoppingHome() {
  
  const { productList, productDetails } = useSelector(
    (state) => state.shoppingProducts
  );
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddToCart(getCurrentProductId) {
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        notification.success({
          description: "Product is added to cart",
        });
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) setIsModalOpen(true);
  }, [productDetails]);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[600px] overflow-hidden">
        <Carousel autoplay>
          {featureImageList.map((slide, index) => (
            <img
              src={slide.image}
              key={index}
              className="w-full h-full object-cover"
              alt={`banner-${index + 1}`}
            />
          ))}
        </Carousel>
      </div>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <Title level={2} className="text-center mb-8">
            Shop by category
          </Title>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categoriesWithIcon.map((categoryItem) => (
              <Card
                key={categoryItem.id}
                hoverable
                onClick={() =>
                  handleNavigateToListingPage(categoryItem, "category")
                }
                className="flex flex-col items-center justify-center p-6 cursor-pointer"
              >
                <categoryItem.icon className="w-12 h-12 mb-4 text-primary" />
                <span className="font-bold">{categoryItem.label}</span>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <Title level={2} className="text-center mb-8">
            Shop by Brand
          </Title>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {brandsWithIcon.map((brandItem) => (
              <Card
                key={brandItem.id}
                hoverable
                onClick={() => handleNavigateToListingPage(brandItem, "brand")}
                className="flex flex-col items-center justify-center p-6 cursor-pointer"
              >
                <brandItem.icon className="w-12 h-12 mb-4 text-primary" />
                <span className="font-bold">{brandItem.label}</span>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <Title level={2} className="text-center mb-8">
            Feature Products
          </Title>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList && productList.length > 0
              ? productList
                  .slice(0, 10)
                  .map((productItem) => (
                    <ShoppingProductTile
                      key={productItem.id}
                      handleGetProductDetails={handleGetProductDetails}
                      product={productItem}
                      handleAddToCart={handleAddToCart}
                    />
                  ))
              : null}
          </div>
        </div>
      </section>

      <ProductDetail
        open={isModalOpen}
        onOk={handleOk}
        setIsModalOpen={handleCancel}
        product={productDetails}
      />
    </div>
  );
}

export default ShoppingHome;
