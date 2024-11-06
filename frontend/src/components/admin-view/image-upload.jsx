import { Button, Input, Skeleton, Upload } from "antd";

import axios from "axios";
import { CloudUploadIcon, FileIcon, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

function ProductImageUpload({
  imageFile,
  setimageFile,
  uploadedImageUrl,
  setuploadedImageUrl,
  isEditMode,
  setImageLoadingState,
  imageLoadingState,
  
}) {
  const handleImageFileChange = (info) => {
    const file = info.fileList[0]?.originFileObj; // Lấy file từ Ant Design Upload
    if (file) {
      setimageFile(file);
    }
  };
  const handleRemoveImage = () => {
    setimageFile(null); // Xóa ảnh đã chọn
  };
  async function uploadImageToCloudinary() {
    setImageLoadingState(true);
    const data = new FormData();
    data.append("my_file", imageFile);
    const response = await axios.post(
      "http://localhost:5000/api/admin/products/upload-image",
      data
    );
    console.log(response, "response");

    if (response?.data?.success) {
      setuploadedImageUrl(response.data.result.url);
      setImageLoadingState(false);
    }
  }

  useEffect(() => {
    if (imageFile !== null) uploadImageToCloudinary();
  }, [imageFile]);

  return (
    <div className='w-full mt-4'>
      <p className="text-lg font-semibold mb-2">Upload Image</p>
      {!imageFile ? (
        <Upload.Dragger
          name="file"
          multiple={false}
          beforeUpload={() => false} // Ngăn auto-upload để xử lý file thủ công
          onChange={handleImageFileChange}
          showUploadList={false} // Ngăn hiển thị list file mặc định của antd
          disabled={isEditMode}
          style={{ 
            opacity: isEditMode ? 0 : 0.5,
            border: "1px dashed #d9d9d9",
            padding: "20px",
            textAlign: "center",
            height: "128px",
            cursor: isEditMode ? "not-allowed" : "pointer",
          }}
        >
          <div className={`${isEditMode ? "cursor-not-allowed": ""} flex flex-col items-center justify-center h-32 `}>
            <CloudUploadIcon
              style={{
                color: "#8c8c8c",
                marginBottom: "8px",
              }}
              size={48}
            />
            <p>Drag & drop or click to upload image</p>
          </div>
        </Upload.Dragger>
      ) : imageLoadingState ? (
        <div className="flex items-center">
          <Skeleton.Input active size="small" style={{ width: 450 }} />
        </div>
      ) : (
        <div className="flex items-center justify-between p-4 border">
          <div className="flex items-center ">
            <FileIcon style={{ fontSize: "24px", marginRight: "8px" }} />
          </div>
          <p className="text-sm font-medium">{imageFile.name}</p>
          <Button
            type="text"
            onClick={handleRemoveImage}
            icon={<Trash2 />}
          ></Button>
        </div>
      )}
    </div>
  );
}

export default ProductImageUpload;
