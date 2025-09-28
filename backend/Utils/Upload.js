import multer from "multer";
import { __dirname } from "../app.js";
import path from "path";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = `${__dirname}/Public`;
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname.split('.')[0]}_${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

export default upload;
