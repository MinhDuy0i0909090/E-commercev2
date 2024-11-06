const cloudinary = require("cloudinary").v2;
const multer = require("multer");

cloudinary.config({
  cloud_name: "dy6mtc2ap",
  api_key: "758761626261267",
  api_secret: "qod4e9VECja96s6xWwFHE0ZaVFE",
});
const storage = new multer.memoryStorage();

async function imageUploadUtil(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });

  return result;
}

const upload = multer({ storage });

module.exports = { imageUploadUtil, upload };
