import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "SunfireSensei-job-portal/user/avatars",
    transformation: [{ crop: "limit", height: 500, width: 500 }],
  },
});

export const upload = multer({ storage });
