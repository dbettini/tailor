const express = require('express');
const auth = require('passport').authenticate('jwt');
const activityRouter = require('./activity').router;
const commentRouter = require('./comment').router;
const courseRouter = require('./course').router;
const revisionRouter = require('./revision').router;
const teRouter = require('./teaching-element').router;
const userRouter = require('./user').router;

const router = express.Router();

// Public routes:
router.use('/', userRouter);

// Protected routes:
router.use('/', auth);
router.use('/', courseRouter);
router.use('/', activityRouter);
router.use('/', commentRouter);
router.use('/', teRouter);
router.use('/', revisionRouter);

module.exports = router;
