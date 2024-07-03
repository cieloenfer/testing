// routes/user.routes.js

const express = require('express');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Endpoints for managing users
 */

/**
 * @swagger
 * /api/users/premium/{uid}:
 *   put:
 *     summary: Change a user's role to premium
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User role updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User role updated to premium"
 *       400:
 *         description: Bad request, invalid user ID or missing parameters
 *       403:
 *         description: Forbidden, only admins can change user roles
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.put('/premium/:uid', authMiddleware.isAdmin, userController.changeUserRole);

module.exports = router;

