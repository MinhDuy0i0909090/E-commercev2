import { Pagination, Modal } from "antd";
import { FilePenLine, Trash2 } from "lucide-react";
import React, { useState } from "react";

function AdminProductTile({
  products,
  setCurrenEditedId,
  setopenCreateDialog,
  setFormData,
  handleDelete,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deleteId, setDeleteId] = useState(null); // Lưu ID sản phẩm để xóa
  const pageSize = 5; // Số sản phẩm trên mỗi trang

  const handleChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedProducts = products.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const showDeleteConfirm = (id) => {
    setIsModalVisible(true);
    setDeleteId(id);
  };

  const handleConfirmDelete = () => {
    handleDelete(deleteId); // Gọi hàm xóa sản phẩm
    setIsModalVisible(false); // Đóng popup
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <table className="w-full table-auto text-left border-collapse border border-gray-300">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="p-4 border-b border-gray-300 text-center">Image</th>
            <th className="p-4 border-b border-gray-300 text-center">Title</th>
            <th className="p-4 border-b border-gray-300 text-center">Price</th>
            <th className="p-4 border-b border-gray-300 text-center">
              Sale Price
            </th>
            <th className="p-4 border-b border-gray-300 text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedProducts.map((product) => (
            <tr
              key={product._id}
              className="hover:bg-gray-50 transition duration-200"
            >
              <td className="p-4 text-center border-b border-gray-300">
                <img
                  src={product?.image}
                  alt={product?.title}
                  className="w-24 h-20 object-cover rounded-md"
                />
              </td>
              <td className="p-4 text-center border-b border-gray-300">
                <h2 className="font-bold text-gray-800">{product?.title=== "" ? "N/A" : product?.title }</h2>
              </td>
              <td
                className={`p-4 text-center border-b border-gray-300 ${
                  product?.salePrice > 0
                    ? "line-through text-gray-500"
                    : "text-gray-800"
                }`}
              >
                ${product?.price}
              </td>
              <td className="p-4 text-center border-b border-gray-300">
                {product?.salePrice > 0 ? (
                  <strong className="text-red-500">
                    ${product?.salePrice}
                  </strong>
                ) : (
                  "N/A"
                )}
              </td>
              <td className="p-4 text-center border-b border-gray-300">
                <button
                  onClick={() => {
                    setopenCreateDialog(true);
                    setCurrenEditedId(product._id);
                    setFormData(product);
                  }}
                  className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition duration-300 ease-in-out"
                  style={{ marginRight: "8px" }}
                >
                  <FilePenLine />
                </button>
                <button
                  onClick={() => showDeleteConfirm(product?._id)}
                  className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition duration-300 ease-in-out"
                >
                  <Trash2 />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="w-full flex justify-center mt-4">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={products.length}
          onChange={handleChange}
        />
      </div>

      {/* Modal popup confirm delete */}
      <Modal
        title="Confirm Delete"
        open={isModalVisible}
        onOk={handleConfirmDelete}
        onCancel={() => setIsModalVisible(false)}
        okText="Yes"
        cancelText="No"
      >
        <p>Are you sure you want to delete this product?</p>
      </Modal>
    </div>
  );
}

export default AdminProductTile;
