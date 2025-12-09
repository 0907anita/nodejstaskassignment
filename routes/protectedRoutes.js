const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const authorizeRoles = require('../middleware/rbac');
const userController = require('../controllers/userController');

router.use(authMiddleware);


router.get('/user-data', authorizeRoles('user', 'manager', 'admin'), (req, res) => {
    res.json({ message: 'This is basic user content', user: req.user });
});


router.get('/manager-data', authorizeRoles('manager', 'admin'), (req, res) => {
    res.json({ message: 'This is manager content', user: req.user });
});


router.get('/admin-data', authorizeRoles('admin'), (req, res) => {
    res.json({ message: 'This is admin content', user: req.user });
});

router.get('/users', authorizeRoles('admin'), userController.getAllUsers);
router.put('/users/:userId/role', authorizeRoles('admin'), userController.updateUserRole);

module.exports = router;
