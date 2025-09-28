import express from "express";
import upload from "../Utils/Upload.js";
import {
  deleteFile,
  uploadFile,
  uploadFiles,
} from "../Controllers/UploadCn.js";

const uploadRouter = express.Router();
uploadRouter.route("/").post(upload.single("file"), uploadFile);
uploadRouter.route("/multi").post(upload.array("files", 10), uploadFiles);
uploadRouter.route("/:id").delete(deleteFile);

export default uploadRouter;
/**
 * @swagger
 * tags:
 *   name: Upload
 *   description: File upload and management API
 */

/**
 * @swagger
 * /api/upload:
 *   post:
 *     summary: Upload a single file
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: File to upload
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: File uploaded successfully
 *                 data:
 *                   type: string
 *                   example: "uploaded-file.jpg"
 *                 success:
 *                   type: boolean
 *                   example: true
 *
 * /api/upload/multi:
 *   post:
 *     summary: Upload multiple files
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Up to 10 files
 *     responses:
 *       200:
 *         description: Files uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Files uploaded successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: "uploaded-file1.jpg"
 *                 success:
 *                   type: boolean
 *                   example: true
 *
 * /api/upload/{id}:
 *   delete:
 *     summary: Delete a file
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Filename or file identifier
 *     responses:
 *       200:
 *         description: File deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: File deleted successfully
 *                 success:
 *                   type: boolean
 *                   example: true
 *       404:
 *         description: File not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: File not found
 *                 success:
 *                   type: boolean
 *                   example: false
 */
