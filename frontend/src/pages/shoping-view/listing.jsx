import {
  Button,
  Col,
  Dropdown,

  Input,
  Row,
  Pagination,
  notification,
} from "antd";
import ProductFilter from "../../components/shoping-view/shoping-filter";
import ShoppingProductTile from "../../components/shoping-view/product-tile";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "../../store/shop-slice/product-slice";
import { ArrowDownUp, Search } from "lucide-react";
import { sortOptions } from "../../config";
import ProductDetail from "../../components/shoping-view/product-detail";
import { addToCart, fetchCartItems } from "../../store/shop-slice/cart-slice";

function ShopingListing() {
  const dispatch = useDispatch();
  const { productList, productDetails } = useSelector(
    (state) => state.shoppingProducts
  );
  const { user } = useSelector((state) => state.auth);

  const [filters, setFilters] = useState(null);
  const [sort, setSort] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [pageSize, setPageSize] = useState(8); // Number of products per page
  //open Dialog details page
 

  useEffect(() => {
    if (productDetails !== null) setIsModalOpen(true);
  }, [productDetails]);
 const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    dispatch(fetchAllFilteredProducts());
  }, [dispatch]);

  const handleFilterChange = (updatedFilters) => {
    setFilters(updatedFilters);
  };

  const handleSortChange = ({ key }) => {
    setSort(key);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Handle page change for pagination
  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }
  function handleGetCart(getCurrentProductId) {
    console.log(getCurrentProductId);
    if (user?.id) {
      console.log("Invalid user ID");
    }
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
          description: data?.payload?.message,
          placement: "bottomRight",
        });
      }
    });
  }
  const sortedAndFilteredProducts = productList
    .filter((product) => {
      if (!filters) return true;
      return Object.keys(filters).every(
        (category) =>
          !filters[category] ||
          filters[category].length === 0 ||
          filters[category].includes(product[category])
      );
    })
    .filter((product) => product.title.toLowerCase().includes(searchTerm))
    .sort((a, b) => {
      if (!sort) return 0;
      const sortBy = {
        "price-lowtohigh": (a, b) => a.price - b.price,
        "price-hightolow": (a, b) => b.price - a.price,
        "title-atoz": (a, b) => a.title.localeCompare(b.title),
        "title-ztoa": (a, b) => b.title.localeCompare(a.title),
      };
      return sortBy[sort] ? sortBy[sort](a, b) : 0;
    });

  // Get current page products
  const paginatedProducts = sortedAndFilteredProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <main className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-3 p-3 md:p-6">
      <section aria-label="Product Filter">
        <ProductFilter onFilterChange={handleFilterChange} />
      </section>

      <section
        aria-label="Product Listing"
        className="bg-background w-full shadow-sm rounded-sm"
      >
        <header className="p-4 border-b flex items-center justify-between">
          <h2 className="text-xl font-bold">All Products</h2>
          <div className="flex flex-row gap-3">
            <span className="text-md text-gray-500">
              {sortedAndFilteredProducts.length} products
            </span>
            <Dropdown
              trigger={["click"]}
              menu={{
                items: sortOptions.map(({ id, label }) => ({ key: id, label })),
                onClick: handleSortChange,
              }}
            >
              <Button>
                <div className="flex items-center gap-1 font-semibold">
                  <ArrowDownUp />
                  Sort By
                </div>
              </Button>
            </Dropdown>
          </div>
        </header>

        {/* Search Bar */}
        <div className="p-3 flex justify-center ">
          <Input
            placeholder="Search products..."
            prefix={<Search width={20} height={20} />}
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ width: "600px" }}
          />
        </div>

        <div className="p-4">
          <Row gutter={[16, 16]} justify="center">
            {paginatedProducts.length > 0 ? (
              paginatedProducts.map((product) => (
                <Col key={product._id} xs={30} sm={12} md={8} lg={6}>
                  <ShoppingProductTile
                    handleGetProductDetails={handleGetProductDetails}
                    product={product}
                    handleGetCart={handleGetCart}
                  />
                </Col>
              ))
            ) : (
              <Col span={24}>
                <p className="text-center text-gray-600">
                  No products available.
                </p>
              </Col>
            )}
          </Row>
        </div>
        <div>
          <ProductDetail
            open={isModalOpen}
            onOk={handleOk}
            setIsModalOpen={handleCancel}
            product={productDetails}
          />
        </div>
        {/* Pagination Component */}
        <div className="flex justify-center my-4">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={sortedAndFilteredProducts.length}
            onChange={handlePageChange}
            showSizeChanger
            pageSizeOptions={[8, 16, 24, 32]} // Options for items per page
          />
        </div>
      </section>
    </main>
  );
}

export default ShopingListing;
