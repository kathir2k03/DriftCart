const express = require('express')
const { registerUser, loginUser, logoutUser, forgotPassword, resetPassword, getUserProfile, changePassword, updateProfile, getAllUsers, updateUser, deleteUser, getUser } = require('../controllers/authController')
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/authenticate')
const router = express.Router()
const upload = require('../middleware/multer')

// Users Auth API
router.route('/register').post(upload.single('avatar'),registerUser)
router.route('/login').post(loginUser)
router.route('/logout').get(logoutUser)
router.route('/password/forgot').get(forgotPassword)
router.route('/password/reset/:token').post(resetPassword)
router.route('/password/change').put(isAuthenticatedUser, changePassword)

// My Profile
router.route('/myprofile').get(isAuthenticatedUser,getUserProfile)
router.route('/myprofile/update').put(isAuthenticatedUser, updateProfile)


//admin Routes
router.route('/admin/users').get(isAuthenticatedUser, authorizeRoles('admin'), getAllUsers)
router.route('/admin/user/:id').get(isAuthenticatedUser, authorizeRoles('admin'), getUser)
router.route('/admin/user/:id').put(isAuthenticatedUser, authorizeRoles('admin'), updateUser)
router.route('/admin/user/:id').delete(isAuthenticatedUser, authorizeRoles('admin'), deleteUser)

module.exports = router
