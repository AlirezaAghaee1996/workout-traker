import { Router } from "express";
import {  getOne, update } from "../Controllers/UserCn.js";
import IsLogin from "../Middlewares/IsLogin.js";
const userRouter = Router();
userRouter.route('/:id').get(IsLogin, getOne).patch(IsLogin, update)
export default userRouter;
/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: User profile management APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - phoneNumber
 *       properties:
 *         id:
 *           type: string
 *           description: MongoDB ObjectId of the user
 *           example: 650f3b9d8f3e2c001c9e4a12
 *         fullName:
 *           type: string
 *           description: Full name of the user
 *           example: Ali Reza Aghaei
 *         phoneNumber:
 *           type: string
 *           description: User phone number (Iran format)
 *           example: "+989123456789"
 *         password:
 *           type: string
 *           description: Hashed password
 *           example: "$2a$10$eXamPleHasHedPassWord"
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get logged-in user profile
 *     description: >
 *       Fetch a single user profile.  
 *       Supports **filter, sort, field selection, pagination** using query params (powered by vanta-api).  
 *       Example: `/api/users/{id}?fields=fullName,phoneNumber`
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *       - in: query
 *         name: filter
 *         schema:
 *           type: string
 *         description: Apply filters (e.g. fullName=Ali)
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Sort by fields (e.g. -createdAt,fullName)
 *       - in: query
 *         name: fields
 *         schema:
 *           type: string
 *         description: Select only specific fields (e.g. fullName,phoneNumber)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: User data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *
 *   patch:
 *     summary: Update user profile
 *     description: >
 *       Update `fullName` and/or `password` for the logged-in user.  
 *       Password must contain at least **8 characters, 1 uppercase, 1 lowercase, and 1 number**.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: "Ali Reza Aghaei"
 *               password:
 *                 type: string
 *                 example: "StrongPass123"
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User updated successfully
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid password format
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
