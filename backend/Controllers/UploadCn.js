import { catchAsync, HandleERROR } from "vanta-api";
import fs from 'fs'
import { __dirname } from "../app.js";
export const uploadFile = catchAsync(async(req, res, next) => {
  const file = req?.file;
  if (!file) {
    return next(new HandleERROR("No file uploaded", 400));
  }
  res
    .status(200)
    .json({
      message: "File uploaded successfully",
      data: file.filename,
      success: true,
    });
});

export const uploadFiles = catchAsync(async (req, res, next) => {
  const files = req?.files;
  if (!files || files.length === 0) {
    return next(new HandleERROR("No files uploaded", 400));
  }
  const data = files?.map((file) => file.filename);
  res.status(200).json({
    message: "Files uploaded successfully",
    data,
    success: true,
  });
})

export const deleteFile = catchAsync(async(req, res, next) => {
    const { filename } = req.body;
    const deletedPath = `${__dirname}/Public/${filename.split('/').at(-1)}`;
    if (fs.existsSync(deletedPath)){
        fs.unlinkSync(deletedPath);
        return res.status(200).json({
            message: "File deleted successfully",
            success: true,
        });
    }
    return res.status(404).json({
        message: "File not found",
        success: false,
    });
});
