import { Router } from "express";
import { getAll, getOne, update } from "../Controllers/UserCn.js";
import IsAdmin from "../Middlewares/IsAdmin.js";
import IsLogin from "../Middlewares/IsLogin.js";
const userRouter = Router();
userRouter.route('/').get(IsAdmin, getAll)
userRouter.route('/:id').get(IsLogin, getOne).patch(IsLogin, update)
export default userRouter;
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
 *         role:
 *           type: string
 *           enum: [user, admin, superAdmin]
 *           default: user
 *           description: Role of the user
 *           example: user
 *         favoriteProductIds:
 *           type: array
 *           items:
 *             type: string
 *             description: Product ObjectId
 *           example: ["651f3b9d8f3e2c001c9e4b44", "651f3b9d8f3e2c001c9e4b45"]
 *         boughtProductIds:
 *           type: array
 *           items:
 *             type: string
 *           example: ["651f3b9d8f3e2c001c9e4b77"]
 *         addressIds:
 *           type: array
 *           items:
 *             type: string
 *             description: Address ObjectId
 *           example: ["651f3b9d8f3e2c001c9e4c22"]
 *         cartId:
 *           type: string
 *           description: Cart ObjectId
 *           example: 651f3b9d8f3e2c001c9e4a88
 *         ratedProducts:
 *           type: array
 *           items:
 *             type: string
 *           example: ["651f3b9d8f3e2c001c9e4d33"]
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2025-09-16T10:15:30Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: 2025-09-16T12:00:00Z
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management APIs
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     description: Admins and superAdmins can fetch all users with filtering, sorting, limiting fields, and pagination.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of results per page
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Sort results (e.g. `-createdAt` or `fullName`)
 *       - in: query
 *         name: fields
 *         schema:
 *           type: string
 *         description: Select specific fields (comma-separated)
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized (only admins can access)
 */

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     description: 
 *       - Admins can fetch any user by ID.  
 *       - Normal users can only fetch their own profile.  
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: User details
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
 *     summary: Update a user
 *     description: 
 *       - Users can update their own profile (name, password).  
 *       - Only superAdmins can update roles.  
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
