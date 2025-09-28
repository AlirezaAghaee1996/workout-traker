import { Router } from "express";
import { create, getAll, getOne, remove, update } from "../Controllers/ExerciseCn.js";
const exerciseRouter = Router();
exerciseRouter.route('/').get(getAll).post(create);
exerciseRouter.route('/:id').get(getOne).patch(update).delete(remove);
export default exerciseRouter;
/**
 * @swagger
 * tags:
 *   name: Exercises
 *   description: API for managing exercises
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Exercise:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - videoUrl
 *         - category
 *       properties:
 *         id:
 *           type: string
 *           description: MongoDB ObjectId
 *           example: 650f1bc7e1c4a3b9e35c2d12
 *         userId:
 *           type: string
 *           description: ID of the user who owns the exercise
 *           example: 650f1bc7e1c4a3b9e35c2d10
 *         name:
 *           type: string
 *           description: Name of the exercise
 *           example: Push Up
 *         description:
 *           type: string
 *           description: Description of the exercise
 *           example: A bodyweight exercise that strengthens the chest, shoulders, and triceps.
 *         videoUrl:
 *           type: string
 *           description: URL of the exercise demonstration video
 *           example: "https://example.com/videos/pushup.mp4"
 *         category:
 *           type: string
 *           enum: [strength, cardio, flexibility]
 *           description: Category of the exercise
 *           example: strength
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/exercises:
 *   get:
 *     summary: Get all exercises of the logged-in user
 *     tags: [Exercises]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           enum: [strength, cardio, flexibility]
 *         description: Filter exercises by category
 *     responses:
 *       200:
 *         description: List of exercises
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Exercise'
 *
 *   post:
 *     summary: Create a new exercise
 *     tags: [Exercises]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Exercise'
 *     responses:
 *       201:
 *         description: Exercise created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Exercise'
 *
 * /api/exercises/{id}:
 *   get:
 *     summary: Get a single exercise by ID
 *     tags: [Exercises]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Exercise found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Exercise'
 *       404:
 *         description: Exercise not found
 *
 *   patch:
 *     summary: Update an exercise
 *     tags: [Exercises]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Exercise'
 *     responses:
 *       200:
 *         description: Exercise updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Exercise'
 *       401:
 *         description: Unauthorized
 *
 *   delete:
 *     summary: Delete an exercise
 *     tags: [Exercises]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Exercise deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Exercise not found
 */
