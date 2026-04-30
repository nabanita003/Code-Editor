const express = require('express');
const router = express.Router();

const projectController = require('../controllers/projectController'); // rename your file accordingly

// Routes
router.post('/create', projectController.createProj);
router.post('/save', projectController.saveProject);
router.post('/all', projectController.getProjects);
router.post('/single', projectController.getProject);
router.post('/delete', projectController.deleteProject);
router.post('/edit', projectController.editProject);

module.exports = router;