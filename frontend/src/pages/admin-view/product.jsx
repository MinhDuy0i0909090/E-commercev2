import { Fragment, useEffect, useState } from "react";
import { Button, Drawer, Form, notification } from "antd";
import CommonForm from "../../components/common/form";
import { addProductFormElements } from "../../config";
import ProductImageUpload from "../../components/admin-view/image-upload";
import {
  editProduct,
  addNewProduct,
  fetchAllProducts,
  deleteProduct,
} from "../../store/admin-slice/product-slice";
import { useDispatch, useSelector } from "react-redux";
import AdminProductTile from "../../components/admin-view/product-tile";
import { Plus } from "lucide-react";

const initialData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
};

function AdminProduct() {
  const [openCreateDialog, setopenCreateDialog] = useState(false);
  const [formData, setFormData] = useState(initialData);
  const [imageFile, setimageFile] = useState(null);
  const [uploadedImageUrl, setuploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.adminProducts);

  // Khởi tạo đối tượng form của Ant Design
  const [form] = Form.useForm();

  function onSubmit() {
    if (formData.price < formData.salePrice) {
      notification.error({
        description: "Price cannot be lower than sale price.",
      });
      return;
    }
    currentEditedId != null
      ? dispatch(editProduct({ id: currentEditedId, formData })).then(
          (data) => {
            if (data?.payload?.success) {
              dispatch(fetchAllProducts());
              setFormData(initialData);
              setopenCreateDialog(false);
              setCurrentEditedId(null);
              notification.success({
                description: data?.payload?.message,
              });
            }
          }
        )
      : dispatch(addNewProduct({ ...formData, image: uploadedImageUrl })).then(
          (data) => {
            if (data?.payload?.success) {
              dispatch(fetchAllProducts());
              // Reset hình ảnh và dữ liệu form
              setimageFile(null);
              setFormData(initialData);
              setuploadedImageUrl("");
              setopenCreateDialog(false);

              // Reset các trường của form
              form.resetFields();

              notification.success({
                description: data?.payload?.message,
              });
            }
          }
        );
  }
  function handleDelete(getCurrentProductId) {
    dispatch(deleteProduct(getCurrentProductId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
        notification.success({ description: data?.payload?.message });
      }
    });
  }
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);
  function isFormValid() {
    return Object.keys(formData)
      .filter((currentKey) => currentKey !== "averageReview")
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }
  console.log(formData);
  form.setFieldsValue(formData);
  return (
    <Fragment>
      <div className="w-full">
        <div className="mb-5 w-full flex justify-end">
          <Button
            onClick={() => setopenCreateDialog(true)}
            variant="solid"
            style={{ backgroundColor: "black", color: "white" }}
          >
            Add new product <Plus />
          </Button>

          <Drawer
            title={
              currentEditedId != null ? "Edit the product" : "Add new product"
            }
            width={490}
            onClose={() => {
              setopenCreateDialog(false);
              setFormData(initialData);
              setimageFile(null);
              setuploadedImageUrl("");
              form.resetFields(); // Reset các trường form khi đóng Drawer
            }}
            open={openCreateDialog}
          >
            <ProductImageUpload
              imageFile={imageFile}
              setimageFile={setimageFile}
              uploadedImageUrl={uploadedImageUrl}
              setuploadedImageUrl={setuploadedImageUrl}
              imageLoadingState={imageLoadingState}
              setImageLoadingState={setImageLoadingState}
              isEditMode={currentEditedId !== null}
            />
            <div className="py-6 px-4">
              <CommonForm
                form={form} // Truyền đối tượng form vào
                formControls={addProductFormElements}
                formData={formData}
                setFormData={setFormData}
                buttonText={currentEditedId != null ? "Edit" : "Add"}
                onSubmit={onSubmit}
                isBtnDisabled={!isFormValid()}
              />
            </div>
          </Drawer>
        </div>
        <div className="w-full p-4 flex flex-col">
          {productList && productList.length > 0 ? (
            <AdminProductTile
              products={productList}
              setopenCreateDialog={setopenCreateDialog}
              setFormData={setFormData}
              setCurrenEditedId={setCurrentEditedId}
              handleDelete={handleDelete}
            />
          ) : null}
        </div>
      </div>
    </Fragment>
  );
}

export default AdminProduct;
