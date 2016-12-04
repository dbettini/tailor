/**
 * @swagger
 * /courses:
 *   get:
 *     summary: get all existing courses
 *     tags:
 *     - course
 *     produces:
 *     - application/json
 *     responses:
 *       200:
 *         description: array of course objects
 *         schema:
 *           type: array
 *           items:
 *             $ref: "#/definitions/CourseOutput"
 *   post:
 *     summary: create a new course
 *     tags:
 *     - course
 *     consumes:
 *     - application/json
 *     produces:
 *     - application/json
 *     parameters:
 *     - in: body
 *       name: body
 *       required: true
 *       schema:
 *         $ref: "#/definitions/CourseInput"
 *     responses:
 *       201:
 *         description: newly-created course
 *         schema:
 *           $ref: "#/definitions/CourseOutput"
 *       400:
 *          description: request body contains invalid values
 * /courses/{courseKey}:
 *   get:
 *     summary: get one specific course
 *     tags:
 *     - course
 *     produces:
 *     - application/json
 *     parameters:
 *     - name: courseKey
 *       in: path
 *       description: course identifier
 *       required: true
 *       type: string
 *     responses:
 *       200:
 *         description: single course
 *         schema:
 *           $ref: "#/definitions/CourseOutput"
 *       404:
 *         description: course with the given key does not exist
 *   patch:
 *     summary: partially change an existing course
 *     tags:
 *     - course
 *     consumes:
 *     - application/json
 *     produces:
 *     - application/json
 *     parameters:
 *     - name: courseKey
 *       in: path
 *       description: course identifier
 *       required: true
 *       type: string
 *     - name: body
 *       in: body
 *       required: true
 *       schema:
 *         $ref: "#/definitions/CourseInput"
 *     responses:
 *       200:
 *         description: updated course
 *         schema:
 *           $ref: "#/definitions/CourseOutput"
 *       404:
 *         description: course with the given key does not exist
 *   put:
 *     summary: replace an existing course with another one
 *     tags:
 *     - course
 *     consumes:
 *     - application/json
 *     produces:
 *     - application/json
 *     parameters:
 *     - name: courseKey
 *       in: path
 *       description: course identifier
 *       required: true
 *       type: string
 *     - name: body
 *       in: body
 *       required: true
 *       schema:
 *         $ref: "#/definitions/CourseInput"
 *     responses:
 *       200:
 *         description: course with changes applied
 *         schema:
 *           $ref: "#/definitions/CourseOutput"
 *       400:
 *          description: request body contains invalid values
 *       404:
 *         description: course with the given key does not exist
 *   delete:
 *     summary: permanently remove an existing course
 *     tags:
 *     - course
 *     produces:
 *     - application/json
 *     parameters:
 *     - name: courseKey
 *       in: path
 *       description: course identifier
 *       required: true
 *       type: string
 *     responses:
 *       200:
 *         description: course object which was just removed
 *         schema:
 *           $ref: "#/definitions/CourseOutput"
 *       404:
 *         description: course with the given key does not exist
 */