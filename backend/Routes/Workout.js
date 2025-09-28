import { Router } from "express";
import { create, getAll, getOne, remove, update } from "../Controllers/WorkoutCn.js";
const workoutRouter = Router();
workoutRouter.route('/').get(getAll).post(create);
workoutRouter.route('/:id').get(getOne).patch(update).delete(remove);
export default workoutRouter;
/**
 * @swagger
 * tags:
 *   name: Workouts
 *   description: Workout management API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ExerciseRef:
 *       type: object
 *       required:
 *         - exerciseId
 *         - sets
 *         - restTime
 *       properties:
 *         exerciseId:
 *           type: string
 *           description: MongoDB ObjectId of the exercise
 *           example: 650f3b9d8f3e2c001c9e4e77
 *         sets:
 *           type: number
 *           description: Number of sets for the exercise
 *           example: 4
 *         weight:
 *           type: number
 *           description: Optional weight used (kg)
 *           example: 20
 *         restTime:
 *           type: number
 *           description: Rest time in seconds between sets
 *           example: 90
 *
 *     Workout:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - duration
 *         - userId
 *       properties:
 *         id:
 *           type: string
 *           description: MongoDB ObjectId of the workout
 *           example: 650f3b9d8f3e2c001c9e4a99
 *         title:
 *           type: string
 *           description: Title of the workout
 *           example: Push Day
 *         description:
 *           type: string
 *           description: Short description of the workout
 *           example: A workout focusing on chest, shoulders, and triceps
 *         duration:
 *           type: number
 *           description: Duration of the workout in minutes
 *           example: 75
 *         userId:
 *           type: string
 *           description: MongoDB ObjectId of the user
 *           example: 650f3b9d8f3e2c001c9e4a12
 *         exercises:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ExerciseRef'
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/workouts:
 *   get:
 *     summary: Get all workouts of the logged-in user
 *     tags: [Workouts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: duration[gte]
 *         schema:
 *           type: number
 *         description: Filter by minimum duration
 *       - in: query
 *         name: duration[lte]
 *         schema:
 *           type: number
 *         description: Filter by maximum duration
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Sort fields (e.g. `-createdAt,duration`)
 *       - in: query
 *         name: fields
 *         schema:
 *           type: string
 *         description: Select specific fields (e.g. `title,duration`)
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
 *     responses:
 *       200:
 *         description: List of workouts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 results:
 *                   type: integer
 *                   description: Number of workouts returned
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Workout'
 *
 *   post:
 *     summary: Create a new workout
 *     tags: [Workouts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Workout'
 *     responses:
 *       201:
 *         description: Workout created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Workout'
 *
 * /api/workouts/{id}:
 *   get:
 *     summary: Get a workout by ID (only if it belongs to the logged-in user)
 *     tags: [Workouts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Workout ID
 *     responses:
 *       200:
 *         description: Workout details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Workout'
 *
 *   patch:
 *     summary: Update a workout by ID (only owner can update)
 *     tags: [Workouts]
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
 *             $ref: '#/components/schemas/Workout'
 *     responses:
 *       200:
 *         description: Workout updated successfully
 *
 *   delete:
 *     summary: Delete a workout by ID (only owner can delete)
 *     tags: [Workouts]
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
 *         description: Workout deleted successfully
 */
