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
 *   - name: Auth
 *     description: Authentication and Authorization APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AuthRequest:
 *       type: object
 *       required:
 *         - phoneNumber
 *       properties:
 *         phoneNumber:
 *           type: string
 *           example: "+989123456789"
 *
 *     LoginWithPasswordRequest:
 *       type: object
 *       required:
 *         - phoneNumber
 *         - password
 *       properties:
 *         phoneNumber:
 *           type: string
 *           example: "+989123456789"
 *         password:
 *           type: string
 *           example: "StrongPass123"
 *
 *     LoginWithOtpRequest:
 *       type: object
 *       required:
 *         - phoneNumber
 *         - code
 *       properties:
 *         phoneNumber:
 *           type: string
 *           example: "+989123456789"
 *         code:
 *           type: string
 *           example: "123456"
 *
 *     ResendCodeRequest:
 *       type: object
 *       required:
 *         - phoneNumber
 *       properties:
 *         phoneNumber:
 *           type: string
 *           example: "+989123456789"
 *
 *     ForgetPasswordRequest:
 *       type: object
 *       required:
 *         - phoneNumber
 *         - password
 *         - code
 *       properties:
 *         phoneNumber:
 *           type: string
 *           example: "+989123456789"
 *         password:
 *           type: string
 *           description: "Must be at least 8 chars with uppercase, lowercase, and number"
 *           example: "NewPass123"
 *         code:
 *           type: string
 *           example: "123456"
 *
 *     AuthResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "SMS sent successfully"
 *         data:
 *           type: object
 *           properties:
 *             userExist:
 *               type: boolean
 *             passwordExist:
 *               type: boolean
 *
 *     LoginResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         data:
 *           type: object
 *           properties:
 *             user:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 phoneNumber:
 *                   type: string
 *                 fullName:
 *                   type: string
 *             token:
 *               type: string
 *               description: JWT token
 *               example: "eyJhbGciOiJIUzI1NiIsInR..."
 */

/**
 * @swagger
 * /api/auth:
 *   post:
 *     summary: Request authentication (send SMS if user has no password)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthRequest'
 *     responses:
 *       200:
 *         description: Authentication initiated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: SMS sending failed
 *
 * /api/auth/login-password:
 *   post:
 *     summary: Login with phone number and password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginWithPasswordRequest'
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       400:
 *         description: Invalid credentials or password not found
 *       404:
 *         description: User not found
 *
 * /api/auth/login-otp:
 *   post:
 *     summary: Login with phone number and OTP code
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginWithOtpRequest'
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       400:
 *         description: Invalid code
 *
 * /api/auth/resend-code:
 *   post:
 *     summary: Resend OTP code
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResendCodeRequest'
 *     responses:
 *       200:
 *         description: SMS resent successfully
 *       400:
 *         description: SMS sending failed
 *
 * /api/auth/forget-password:
 *   post:
 *     summary: Reset password using OTP
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ForgetPasswordRequest'
 *     responses:
 *       200:
 *         description: Password updated successfully
 *       400:
 *         description: Invalid input or SMS verification failed
 *       404:
 *         description: User not found
 */
