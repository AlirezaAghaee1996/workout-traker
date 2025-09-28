import { Router } from "express";
import { auth, forgetPass, loginWithOtp, loginWithPassword, resendCode } from "../Controllers/AuthCn.js";
const authRouter = Router();
authRouter.route('/').post(auth);
authRouter.route('/login-password').post(loginWithPassword);
authRouter.route('/login-otp').post(loginWithOtp);
authRouter.route('/resend-code').post(resendCode);
authRouter.route('/forget-password').post(forgetPass);

export default authRouter;
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication and Authorization APIs
 */

/**
 * @swagger
 * /api/auth:
 *   post:
 *     summary: Start authentication with phone number
 *     description: Send an SMS code if the user does not exist or does not have a password.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phoneNumber
 *             properties:
 *               phoneNumber:
 *                 type: string
 *                 example: "09123456789"
 *     responses:
 *       200:
 *         description: SMS sent successfully or user already has password.
 *       400:
 *         description: Invalid phone number or SMS sending failed.
 */

/**
 * @swagger
 * /api/auth/login-password:
 *   post:
 *     summary: Login with phone number and password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phoneNumber
 *               - password
 *             properties:
 *               phoneNumber:
 *                 type: string
 *                 example: "09123456789"
 *               password:
 *                 type: string
 *                 example: "myPassword123"
 *     responses:
 *       200:
 *         description: Successful login with JWT token.
 *       400:
 *         description: Invalid credentials or missing fields.
 */

/**
 * @swagger
 * /api/auth/login-otp:
 *   post:
 *     summary: Login with OTP
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phoneNumber
 *               - code
 *             properties:
 *               phoneNumber:
 *                 type: string
 *                 example: "09123456789"
 *               code:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Successful login with JWT token.
 *       400:
 *         description: Invalid code or phone number.
 */

/**
 * @swagger
 * /api/auth/resend-code:
 *   post:
 *     summary: Resend OTP code
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phoneNumber
 *             properties:
 *               phoneNumber:
 *                 type: string
 *                 example: "09123456789"
 *     responses:
 *       200:
 *         description: SMS sent successfully.
 *       400:
 *         description: Failed to send SMS.
 */

/**
 * @swagger
 * /api/auth/forget-password:
 *   post:
 *     summary: Reset password with phone number, new password, and OTP code
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phoneNumber
 *               - password
 *               - code
 *             properties:
 *               phoneNumber:
 *                 type: string
 *                 example: "09123456789"
 *               password:
 *                 type: string
 *                 example: "newPassword123"
 *               code:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Password updated successfully.
 *       400:
 *         description: Invalid request or code.
 *       404:
 *         description: User not found.
 */
